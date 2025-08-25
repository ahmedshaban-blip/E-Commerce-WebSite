// Fetch all products from Firestore

import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query, // ⬅️ (جديد)
  where, // ⬅️ (جديد)
  orderBy, // ⬅️ (جديد)
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  getAuth, // ⬅️ (جديد)
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const productListContainer = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const toastContainer = document.createElement("div");
toastContainer.className = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, duration = 3000) {
  const existing = toastContainer.querySelector(".toast-message");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  const hide = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  };

  setTimeout(hide, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar");
  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
});

// ===== Products =====
let allProducts = [];
let productsUnsub = null;   // ⬅️ جديد: اشتراك الـ snapshot

async function fetchAllProducts() {
  const productsSnapshot = await getDocs(collection(db, "products"));
  allProducts = productsSnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// ⬇️ جلب منتجات الأدمن الحالي فقط (Real-time)
function listenMyProducts(uid) {
  if (productsUnsub) { productsUnsub(); productsUnsub = null; }

  const q = query(
    collection(db, "products"),
    where("ownerUid", "==", uid),     // ⬅️ المهم
    orderBy("createdAt", "desc")      // ⬅️ ترتيب (قد يطلب Index)
  );

  productsUnsub = onSnapshot(q, (snap) => {
    allProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    applyFilters();
  }, (err) => {
    console.error("Products subscription error:", err);
    productListContainer.innerHTML = "<p>Error loading products.</p>";
  });
}

// Display products in the page
function displayProducts(productsToDisplay) {
  productListContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.id = product.id;
    const stock = parseInt(product?.stock ?? 0, 10) || 0;
    const out = stock <= 0;
    card.innerHTML = `
      <span class="stock-float ${out ? "out" : "in"}">
      ${out ? "Out of stock" : `In Stock: ${product.stock}`}
    </span>
      <div><img src="${product.imageUrl}" alt="${product.name}"></div>
      <h3>${product.name}</h3>
      <p>Price: ${
        product.price
      } <span style="color: #E43636; font-weight: bold">$</span></p>
      <p>${product.description}</p>
      <small>Category: ${product.category}</small>
      <br>
    
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Edit
    card.querySelector(".edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      location.href = `../../AdminPage/editproduct/editproduct.html?productId=${product.id}`;
    });

    // Delete
    card.querySelector(".delete-btn").addEventListener("click", async (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await deleteDoc(doc(db, "products", product.id));
          showToast("Product deleted successfully", 2000);
          toastContainer.style.background = "rgba(72, 187, 56, 0.2)";
          toastContainer.style.height = "50px";
          toastContainer.style.borderRadius = "25px";
          applyFilters();
        } catch (error) {
          console.error("Error deleting product:", error);
          showToast("Error deleting product");
          toastContainer.style.height = "60px";
          toastContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
          toastContainer.style.borderRadius = "30px";
        }
      }
    });

    productListContainer.appendChild(card);
  });
}

// Apply filters to the products
function applyFilters() {
  const searchTerm = (searchInput?.value || "").toLowerCase();
  const selectedCategory = (categoryFilter?.value || "").toLowerCase();

  const filtered = allProducts.filter((product) => {
    const nameMatch = (product.name || "").toLowerCase().includes(searchTerm);
    const categoryMatch = selectedCategory
      ? (product.category || "").toLowerCase() === selectedCategory
      : true;
    return nameMatch && categoryMatch;
  });

  displayProducts(filtered);
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      productListContainer.innerHTML = "<p>Please sign in to see your products.</p>";
      return;
    }
    listenMyProducts(user.uid); // ⬅️ هنا بيتم تحميل منتجات المستخدم الحالي فقط
  });

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
});

// Orders Notifications
onSnapshot(collection(db, "orders"), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const order = change.doc.data();
      showToast(
        `${order.email} confirmed an order with price ${order.total} $`
      );
    }
  });
});
