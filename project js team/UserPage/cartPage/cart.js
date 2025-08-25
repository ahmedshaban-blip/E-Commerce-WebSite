
// cart.js

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

//////////////////////////////////////

import { db, auth } from "../../firebase-config.js";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const cartSection = document.getElementById("cart-section");
const totalPriceEl = document.getElementById("total-price");
const checkoutSection = document.getElementById("checkout-section");
const checkoutBtn = document.getElementById("checkout-btn");

// authentication state
let checkoutBound = false;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    cartSection.innerHTML = "<h2>please log in to see your cart</h2>";
    checkoutSection.style.display = "none";
    return;
  }

  const cartCollectionRef = collection(db, "users", user.uid, "cart");

  onSnapshot(query(cartCollectionRef), async (snapshot) => {
    if (snapshot.empty) {
      cartSection.innerHTML = "<h2>The cart is empty</h2>";
      checkoutSection.style.display = "none";
      totalPriceEl.innerText = "Total: 0.00 EGP";
      totalPriceEl.dataset.total = "0";
      return;
    }

    let totalPrice = 0;
    let cartHTML = "";

    // fetch data from firebase
    const items = await Promise.all(
      snapshot.docs.map(async (itemDoc) => {
        const product = itemDoc.data();
        const productId = itemDoc.id;

        // stock data
        const productRef = doc(db, "products", productId);
        const pSnap = await getDoc(productRef);
        const stock = pSnap.exists() ? pSnap.data().stock ?? 0 : 0;

        totalPrice += (product.price || 0) * (product.quantity || 0);

        return {
          productId,
          ...product,
          stock,
        };
      })
    );

    // display card data
    for (const it of items) {
      const outOfStock = it.stock <= 0;
      cartHTML += `
        <div class="card">
          <div class="card-img">
            <img src="${it.imageUrl}" alt="${it.name}">
          </div>
          <div class="card-content">
            <h3 class="product-name">${it.name}</h3>
            <h4 class="product-price"><sup>$</sup>${Number(it.price).toFixed(
              2
            )}</h4>

            <div class="stock-row">
              <span class="stock-badge" id="stock-${it.productId}">
                ${outOfStock ? "Not Available in Stock" : `Stock : ${it.stock}`}
              </span>
            </div>

            <div class="quantity-controls">
              <button class="decrease-btn" data-id="${it.productId}">-</button>
              <span class="product-quantity">${it.quantity}</span>
              <button class="increase-btn" data-id="${it.productId}" ${
        outOfStock ? "disabled" : ""
      }>+</button>
            </div>

            <button class="remove-btn" data-id="${it.productId}">Remove</button>
          </div>
        </div>
      `;
    }

    cartSection.innerHTML = cartHTML;
    totalPriceEl.innerText = `Total:  ${totalPrice.toFixed(2)} $`;
    totalPriceEl.dataset.total = totalPrice.toFixed(2);
    checkoutSection.style.display = "block";

    //checkout
    if (!checkoutBound) {
      checkoutBtn.addEventListener("click", () => {
        const price = Number(totalPriceEl.dataset.total || "0");
        const paypalPage = `../paypalPage/paypal.html?price=${price.toFixed(
          2
        )}`;
        window.location.href = paypalPage;
      });
      checkoutBound = true;
    }

    //remove Btn
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.currentTarget.dataset.id;
        const cartRef = doc(db, "users", user.uid, "cart", productId);
        const productRef = doc(db, "products", productId);

        try {
          await runTransaction(db, async (tx) => {
            const [cSnap, pSnap] = await Promise.all([
              tx.get(cartRef),
              tx.get(productRef),
            ]);
            if (!cSnap.exists()) return;
            if (!pSnap.exists()) throw new Error("Product not found.");

            const qty = cSnap.data().quantity ?? 0;
            const currentStock = pSnap.data().stock ?? 0;

            tx.delete(cartRef);
            tx.update(productRef, { stock: currentStock + qty });
          });
        } catch (err) {
          const messageEl = document.getElementById("error-message");
          messageEl.textContent = err.message || "Error while removing item.";
          messageEl.style.display = "block";
          setTimeout(() => {
            messageEl.style.display = "none";
          }, 3000);
        }
      });
    });

    //increase Btn
    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.currentTarget.dataset.id;
        const cartRef = doc(db, "users", user.uid, "cart", productId);
        const productRef = doc(db, "products", productId);

        try {
          await runTransaction(db, async (tx) => {
            const [cSnap, pSnap] = await Promise.all([
              tx.get(cartRef),
              tx.get(productRef),
            ]);
            if (!cSnap.exists()) throw new Error("Cart item not found.");
            if (!pSnap.exists()) throw new Error("Product not found.");

            const qty = cSnap.data().quantity ?? 0;
            const currentStock = pSnap.data().stock ?? 0;

            if (currentStock <= 0) {
              throw new Error("stock is not available.");
            }

            tx.update(cartRef, { quantity: qty + 1 });
            tx.update(productRef, { stock: currentStock - 1 });
          });
        } catch (err) {
          alert(err.message || "dont have enough stock.");
        }
      });
    });

    //decrease Btn
    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.currentTarget.dataset.id;
        const cartRef = doc(db, "users", user.uid, "cart", productId);
        const productRef = doc(db, "products", productId);

        try {
          await runTransaction(db, async (tx) => {
            const [cSnap, pSnap] = await Promise.all([
              tx.get(cartRef),
              tx.get(productRef),
            ]);
            if (!cSnap.exists()) return;
            if (!pSnap.exists()) throw new Error("product not found.");

            const qty = cSnap.data().quantity ?? 0;
            const currentStock = pSnap.data().stock ?? 0;

            if (qty > 1) {
              tx.update(cartRef, { quantity: qty - 1 });
              tx.update(productRef, { stock: currentStock + 1 });
            } else {
              tx.delete(cartRef);
              tx.update(productRef, { stock: currentStock + 1 });
            }
          });
        } catch (err) {
          const messageEl = document.getElementById("error-message");
          messageEl.textContent =
            err.message || "Error while decreasing quantity.";
          messageEl.style.display = "block";
          setTimeout(() => {
            messageEl.style.display = "none";
          }, 3000);
        }
      });
    });
  });
});
