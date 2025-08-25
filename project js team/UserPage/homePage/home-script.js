// import { db } from "../../firebase-config.js";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// // // Navbar menu
// // function toggleMenu() {
// //   document.querySelector('.navbar').classList.toggle('active');
// // }
// // function search() {
// //   alert("Searching for: " + document.getElementById("searchInput").value);
// // }

// // Fetching data from firebase

// let cards = document.getElementById("product-content");

// async function loadProducts() {
//   const data = await getDocs(collection(db, "products"));

//   data.forEach((doc) => {
//     // Display data in home page
//     const products = doc.data();
//     console.log(products);

//     cards.innerHTML += `
//                   <div class="card" data-id="${doc.id}">
//                                   <div class="product-img">
//                                       <img src="${products.imageUrl}" width="100%" height="100%">
//                                   </div>
//                                   <h3 class="product-name">${products.name}</h3>
//                                   <h4 class="product-price"><sup>EGP</sup>${products.price}</h4>
//                                   <p class="product-category">${products.category}</p>
//                                   <p class="star">*️*️*️*️*️</p>
//                               </div>
//     `;
//   });
//   getProductID();
// }

// loadProducts();

// //get card id for productDetails page
// function getProductID() {
//   document.querySelectorAll(".card").forEach((item) => {
//     item.addEventListener("click", () => {
//       const id = item.getAttribute("data-id");
//       localStorage.setItem("product-id", id);
//       document.location.href = "../ProductDetailsPage/product-details.html";
//       console.log(id);
//     });
//   });
// }
// document.querySelectorAll(".card").forEach((card) => {
//   card.addEventListener("click", () => {
//     let categoryname = card.dataset.category;
//     window.location.href = `category.html?category=${encodeURIComponent(
//       categoryname
//     )}`;
//   });
// });


const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});


/////////////////////////////
/////////////////////////////
// Import Firebase configs
import { db, auth } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  increment,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ---------- Handle category navigation ----------
document.querySelectorAll(".category-cards .card").forEach((card) => {
  card.addEventListener("click", () => {
    let categoryname = card.dataset.category;
    if (categoryname) {
      // Redirect to category page with query string
      window.location.href = `category.html?category=${encodeURIComponent(
        categoryname
      )}`;
    }
  });
});

let cardsContainer = document.getElementById("product-content");

// ---------- Load products from Firestore ----------
async function loadProducts() {
  const data = await getDocs(collection(db, "products"));
  cardsContainer.innerHTML = "";

  // Render each product as a card
  data.forEach((docSnap) => {
    const product = docSnap.data();
    cardsContainer.innerHTML += `
      <div class="card" data-id="${docSnap.id}">
        <div class="product-img">
          <img src="${product.imageUrl}" width="100%" height="100%">
        </div>
        <h3 class="product-name">${product.name}</h3>
        <h4 class="product-price"><sup>$</sup>${product.price}</h4>
        <p class="product-category">${product.category}</p>
        <p class="star">★★★★★</p>
        <button id="addToCartBtn"
                data-id="${docSnap.id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-img="${product.imageUrl}">
          Add to Cart
        </button>
      </div>
    `;
  });

  // Attach click handlers
  attachProductClickHandler();
  attachAddToCartHandler();
}

// ---------- Navigate to product details page ----------
function attachProductClickHandler() {
  document.querySelectorAll("#product-content .card").forEach((item) => {
    item.addEventListener("click", (e) => {
      // Prevent navigation if "Add to Cart" button is clicked
      if (e.target.classList.contains("addToCartBtn")) return;

      const id = item.getAttribute("data-id");
      if (id) {
        localStorage.setItem("product-id", id);
        document.location.href = "../ProductDetailsPage/product-details.html";
      }
    });
  });
}

// ---------- Add to Cart logic ----------
function attachAddToCartHandler() {
  document.querySelectorAll("#addToCartBtn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation(); // Prevent triggering product details redirect

      const user = auth.currentUser;
      if (!user) {
        // Show error if user is not logged in
        showToast("Please log in to add items to your cart!", "red");
        return;
      }

      const productId = btn.dataset.id;
      const cartDocRef = doc(db, "users", user.uid, "cart", productId);

      try {
        const docSnapshot = await getDoc(cartDocRef);

        if (docSnapshot.exists()) {
          // If product already in cart → increase quantity
          await updateDoc(cartDocRef, {
            quantity: increment(1),
          });
          showToast("Product quantity updated in your cart!", "green");
        } else {
          // If product not in cart → add new with quantity = 1
          await setDoc(cartDocRef, {
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            imageUrl: btn.dataset.img,
            quantity: 1,
            addedAt: serverTimestamp(),
          });
          showToast("Product added to your cart!", "green");
        }
      } catch (error) {
        console.error("Error adding to cart: ", error);
        showToast("Something went wrong. Please try again.", "red");
      }
    });
  });
}

// ---------- Show Toast notification ----------
function showToast(message, color = "green") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4CAF50";
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  toast.style.zIndex = "1000";
  document.body.appendChild(toast);

  // Auto-remove toast after 3 seconds
  setTimeout(() => toast.remove(), 2000);
}

// 
loadProducts();
