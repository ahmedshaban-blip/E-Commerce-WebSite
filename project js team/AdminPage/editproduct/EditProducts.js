import { db } from "../../firebase-config.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

const form = document.getElementById("editProductForm");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const descInput = document.getElementById("productDescription");
const categoryInput = document.getElementById("productCategory");
const imagePreview = document.getElementById("productImage");

// Load product data from Firestore and fill form fields
async function loadProduct() {
  if (!productId) {
    console.error("No productId in URL");
    return;
  }

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const product = docSnap.data();

    // Fill form fields with product data
    nameInput.value = product.name;
    priceInput.value = product.price;
    descInput.value = product.description;
    categoryInput.value = product.category;
    imagePreview.src = product.imageUrl;
  } else {
    console.error("No such product!");
  }
}

loadProduct();


// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  try {
    // Update product data in Firestore
    const docRef = doc(db, "products", productId);

    await updateDoc(docRef, {
      name: nameInput.value,
      price: Number(priceInput.value),
      description: descInput.value,
      category: categoryInput.value,
    });

    // Show success message
    const messageEl = document.createElement("p");
    messageEl.style.color = "green";
    messageEl.textContent = `Product updated successfully at ${new Date().toLocaleTimeString()}`;
    form.appendChild(messageEl);
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 3000);
  } catch (error) {
    console.error("Error updating product:", error);
    // Show error message
    const messageEl = document.getElementById("errorMessage");
    messageEl.textContent = `Failed to update product at ${new Date().toLocaleTimeString()}`;
    messageEl.style.display = "block";
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 3000);
  }
});

