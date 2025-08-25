const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

////////////////////

// UserPage/homePage/category.js
import { db } from "../../firebase-config.js";
import {
  query,
  where,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
// const categoryName = params.get("category") || "";
const categoryName = params.get("category") || "";

const cards = document.getElementById("product-content");
const titleEl = document.getElementById("category-title");
if (titleEl) {
  titleEl.textContent = categoryName
    ? `Category: ${categoryName}`
    : "All Products";
}

// Likely field names in your Firestore documents
const CATEGORY_KEYS = [
  "productCategory",
  "category",
  "Category",
  "type",
  "product_type",
];
const NAME_KEYS = ["name", "productName", "title"];
const PRICE_KEYS = ["price", "productPrice", "cost", "amount"];
const IMAGE_KEYS = ["imageUrl", "imageURL", "image", "thumbnail", "img"];
const ID_FALLBACK = ["id", "productId"];

/** Pick the first existing field from candidate keys */
function pick(obj, keys, defaultVal = "") {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) {
      return obj[k];
    }
  }
  return defaultVal;
}

async function loadCategoryProducts() {
  try {
    const colRef = collection(db, "products");

    let snapshots = [];
    let usedCategoryKey = null;

    if (categoryName) {
      // Try each possible category key until one returns results
      for (const key of CATEGORY_KEYS) {
        const q = query(colRef, where(key, "==", categoryName));
        const snap = await getDocs(q);
        if (!snap.empty) {
          snapshots = [snap];
          usedCategoryKey = key;
          break;
        }
      }
      // If none matched, fallback to all products (so the page isn't empty)
      if (!snapshots.length) {
        const all = await getDocs(colRef);
        snapshots = [all];
      }
    } else {
      const all = await getDocs(colRef);
      snapshots = [all];
    }

    // Render
    let total = 0;
    cards.innerHTML = "";
    for (const snap of snapshots) {
      snap.forEach((doc) => {
        const p = doc.data();

        const name = pick(p, NAME_KEYS, "Product");
        const price = pick(p, PRICE_KEYS, "");
        const img = pick(p, IMAGE_KEYS, "");
        const cat = usedCategoryKey
          ? p?.[usedCategoryKey] ?? ""
          : pick(p, CATEGORY_KEYS, "");
        const localId = doc.id || pick(p, ID_FALLBACK, "");

        cards.innerHTML += `
          <div class="card cardcat" data-id="${localId}">
            <div class="product-img">
              <img src="${img}" alt="${name}" width="100%" height="100%">
            </div>
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price">${
              price !== "" ? `<sup>$</sup>${price}` : ""
            }</h4>
            <p class="product-category">${cat || ""}</p>
            <p class="star">★★★★★</p>
          </div>
        `;
        total++;
      });
    }

    if (total === 0) {
      cards.innerHTML = `<p style="padding:1rem;">No products found.</p>`;
    } else {
      attachCardClicks();
    }
  } catch (err) {
    console.error("Failed to load category products:", err);
    cards.innerHTML = `<p style="padding:1rem; color:red;">Error loading products. Check the console.</p>`;
  }
}
function attachCardClicks() {
  document.querySelectorAll(".cardcat").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      if (id) {
        localStorage.setItem("product-id", id);
        console.log(`Product ID ${id} saved! Now navigating...`);
        window.location.href = "../ProductDetailsPage/product-details.html";
      }
    });
  });
}

loadCategoryProducts();
