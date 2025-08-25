const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});



///////////////
import { db, auth } from "../../firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const productId = localStorage.getItem("product-id");
const productDetailsContainer = document.getElementById("product-details");

let currentProductData = null;

// Check if we have a product ID saved in localStorage
if (!productId) {
  productDetailsContainer.innerHTML = "<p>No product selected.</p>";
} else {
  loadProductDetails(productId);
}

// Function to load product details from Firestore
async function loadProductDetails(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const product = docSnap.data();
    currentProductData = product;

    // Render product details inside the container
    productDetailsContainer.innerHTML = `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}" width="300">
      </div>
      <div class="product-info"> 
        <h1>${product.name}</h1>
        <p id="description"><strong>Description: </strong>${product.description}</p>
        <p style="color: red;"><strong>Price:</strong> $ ${product.price}</p>
        <p><strong>Category: </strong> ${product.category}</p>
        <button id="addToCartBtn">Add to Cart</button>
      </div>
    `;

    // Select the Add to Cart button AFTER rendering the HTML
    const addToCartBtn = document.getElementById("addToCartBtn");

    // Add event listener for Add to Cart button
    addToCartBtn.addEventListener("click", async () => {
      const user = auth.currentUser;

      // Check if user is logged in
      if (!user) {
        const messageEl = document.createElement("p");
        messageEl.style.color = "red";
        messageEl.textContent = "Please log in to add items to your cart!";
        productDetailsContainer.appendChild(messageEl);
        return;
      }

      // Make sure product data is loaded
      if (!currentProductData) {
        const messageEl = document.createElement("p");
        messageEl.style.color = "red";
        messageEl.textContent = "Product data is not loaded yet. Please wait.";
        productDetailsContainer.appendChild(messageEl);
        return;
      }

      // Reference to user's cart document inside Firestore
      const cartDocRef = doc(db, "users", user.uid, "cart", productId);

      try {
        const docSnapshot = await getDoc(cartDocRef);

        if (docSnapshot.exists()) {
          // If product already exists in cart -> increase quantity
          await updateDoc(cartDocRef, {
            quantity: increment(1),
          });
          const messageEl = document.createElement("p");
          messageEl.style.color = "green";
          messageEl.style.background = "linear-gradient(to right, #dcf742ff, #fff)";
          messageEl.style.borderRadius = "10px";
          messageEl.style.padding = "10px";
          messageEl.style.display = "flex";
          messageEl.style.justifyContent = "center";
          messageEl.style.height = "40px";
          messageEl.textContent = "Product quantity updated in your cart!";
          productDetailsContainer.appendChild(messageEl);

          setTimeout(() => {
            messageEl.style.display = "none";
          }, 3000);
        } else {
          // If product does not exist in cart -> add it with quantity = 1
          await setDoc(cartDocRef, {
            name: currentProductData.name,
            price: currentProductData.price,
            imageUrl: currentProductData.imageUrl,
            quantity: 1,
            addedAt: serverTimestamp(),
          });
          const messageEl = document.createElement("p");
          messageEl.style.color = "green";
          messageEl.style.background = "linear-gradient(to right, #dcf742ff, #fff)";
          messageEl.style.borderRadius = "10px";
          messageEl.style.padding = "10px";
          messageEl.style.display = "flex";
          messageEl.style.justifyContent = "center";
          messageEl.style.height = "50px";
          messageEl.textContent = "Product added to your cart!";
          productDetailsContainer.appendChild(messageEl);

          setTimeout(() => {
            messageEl.style.display = "none";
          }, 3000);
        }
      } catch (error) {
        console.error("Error adding to cart: ", error);
        const messageEl = document.createElement("p");
        messageEl.style.color = "red";
        messageEl.textContent = "Something went wrong. Please try again.";
        productDetailsContainer.appendChild(messageEl);
      }
    });
  } else {
    // Product not found in Firestore
    productDetailsContainer.innerHTML = "<p>Product not found.</p>";
  }
}
