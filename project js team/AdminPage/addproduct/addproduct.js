// import { db } from "../../firebase-config.js";
// import {
//   collection,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// // Supabase config
// const supabaseUrl = "https://qchwhnhdeoosbbrcrhzp.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHdobmhkZW9vc2JicmNyaHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzY4MzYsImV4cCI6MjA3MDc1MjgzNn0.teaXlwBBmtYwSnBvU1tYPXVtHZimqVNoD2QuoKgD3Zk";
// const supabase = createClient(supabaseUrl, supabaseKey);

// document
//   .getElementById("productForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();

//     // Get form values
//     let name = document.getElementById("productName").value.trim();
//     let price = document.getElementById("productPrice").value.trim();
//     let description = document
//       .getElementById("productDescription")
//       .value.trim();
//     let category = document
//       .getElementById("productCategory")
//       .value.trim();
//     let imageFile = document.getElementById("productImage").files[0];

//     // Validate form
//     if (!name || !price || !description || !category || !imageFile) {
//       const errorMessageEl = document.getElementById("errorMessage");
//       errorMessageEl.textContent = `Please fill in all fields and select an image.`;
//       errorMessageEl.style.display = "block";
//       setTimeout(() => {
//         errorMessageEl.style.display = "none";
//       }, 3000);
//       return;
//     }

//     try {
//       // Upload image to Supabase
//       const uniqueFileName = `${Date.now()}-${imageFile.name}`;
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("images")
//         .upload(uniqueFileName, imageFile, {
//           cacheControl: "3600",
//           upsert: false,
//           contentType: imageFile.type,
//         });

//       if (uploadError) {
//         console.error("Supabase upload error details:", uploadError);

//         if (uploadError.message.includes("row-level security policy")) {
//           throw new Error(
//             "Access denied. Please check storage bucket permissions in Supabase Dashboard."
//           );
//         } else if (uploadError.message.includes("bucket")) {
//           throw new Error(
//             "Storage bucket 'images' not found. Please create it in Supabase Dashboard."
//           );
//         }

//         throw new Error(`Upload failed: ${uploadError.message}`);
//       }

//       console.log("Upload successful:", uploadData);

//       // Get public URL of uploaded image
//       const { data: publicURLData } = supabase.storage
//         .from("images")
//         .getPublicUrl(uniqueFileName);

//       const imageUrl = publicURLData.publicUrl;
//       console.log("Image URL:", imageUrl);

//       // Add product to Firestore
//       const docRef = await addDoc(collection(db, "products"), {
//         name: name,
//         price: parseFloat(price),
//         description: description,
//         category: category,
//         imageUrl: imageUrl,
//         fileName: uniqueFileName,
//         createdAt: new Date(),
//       });

//       console.log("Document written with ID:", docRef.id);

//       // Show success message
//       const messageEl = document.getElementById("successMessage");
//       messageEl.textContent = `Product and image added successfully at ${new Date().toLocaleTimeString()}`;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//       document.getElementById("productForm").reset();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       const messageEl = document.getElementById("errorMessage");
//       messageEl.textContent = `Failed to add product at ${new Date().toLocaleTimeString()}: ${error.message}`;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//     }
//   });

// async function testSupabaseConnection() {
//   try {
//     // Test Supabase connection
//     const { data, error } = await supabase.storage.listBuckets();
//     if (error) {
//       console.error("Supabase connection error:", error);
//     } else {
//       console.log("Available buckets:", data);
//     }
//   } catch (error) {
//     console.error("Failed to connect to Supabase:", error);
//   }
// }
// testSupabaseConnection();

// addproduct.js
import { db } from "../../firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp, // جديد (اختياري لتوحيد التوقيت)
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"; // ⬅️ بدل getAuth
import { auth } from "../../firebase-config.js"; // ⬅️ استيراد auth من firebase-config.js
// subabase config
const supabaseUrl = "https://qchwhnhdeoosbbrcrhzp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHdobmhkZW9vc2JicmNyaHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzY4MzYsImV4cCI6MjA3MDc1MjgzNn0.teaXlwBBmtYwSnBvU1tYPXVtHZimqVNoD2QuoKgD3Zk";
const supabase = createClient(supabaseUrl, supabaseKey);
onAuthStateChanged(auth, (u) => {
  if (!u) {
    // location.href = "/login.html";
    console.warn("No user signed in.");
  }
});

document
  .getElementById("productForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // read form values
    const name = document.getElementById("productName").value.trim();
    const priceRaw = document.getElementById("productPrice").value.trim();
    const description = document
      .getElementById("productDescription")
      .value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const stockRaw = document.getElementById("productStock").value.trim(); // جديد
    const imageFile = document.getElementById("productImage").files[0];

    // show error message
    const errorMessageEl = document.getElementById("errorMessage");
    const showError = (msg) => {
      errorMessageEl.textContent = msg;
      errorMessageEl.style.display = "block";
      setTimeout(() => {
        errorMessageEl.style.display = "none";
      }, 3000);
    };

    // check required fields
    if (
      !name ||
      !priceRaw ||
      !description ||
      !category ||
      stockRaw === "" ||
      !imageFile
    ) {
      return showError("Please fill in all required fields.");
    }

    const price = Number.parseFloat(priceRaw);
    const stock = Number.parseInt(stockRaw, 10);

    if (!Number.isFinite(price) || price < 0) {
      return showError("price must be a number ≥ 0.");
    }
    if (!Number.isInteger(stock) || stock < 0) {
      return showError("stock must be an integer ≥ 0.");
    }

const user = auth.currentUser;
  if (!user) {
    return showError("Please sign in first.");
  }


    try {
      // 1) upload image to Supabase
      const uniqueFileName = `${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(uniqueFileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type,
        });

      if (uploadError) {
        console.error("Supabase upload error details:", uploadError);
        if (uploadError.message.includes("row-level security policy")) {
          throw new Error(
            "don't have access to this storage bucket. Check permissions in Supabase Dashboard."
          );
        } else if (uploadError.message.includes("bucket")) {
          throw new Error(
            "images bucket not found. Please create it in Supabase Dashboard."
          );
        }
        throw new Error(`Supabase upload error: ${uploadError.message}`);
      }

      // 2) global URL of uploaded image
      const { data: publicURLData } = supabase.storage
        .from("images")
        .getPublicUrl(uniqueFileName);
      const imageUrl = publicURLData.publicUrl;

      // 3) //add product to Firestore
      await addDoc(collection(db, "products"), {
        ownerUid: user.uid,
        name,
        price,
        description,
        category,
        imageUrl,
        fileName: uniqueFileName,
        stock,
        createdAt: serverTimestamp(),
      });

      const messageEl = document.getElementById("successMessage");
      messageEl.textContent = `product added successfully (name: ${name}, price: ${price}, stock: ${stock}) at ${new Date().toLocaleTimeString()}`;
      messageEl.style.display = "block";
      setTimeout(() => {
        messageEl.style.display = "none";
      }, 3000);

      document.getElementById("productForm").reset();
    } catch (error) {
      console.error("Error adding product:", error);
      showError(`error: ${new Date().toLocaleTimeString()}: ${error.message}`);
    }
  });

//test connection to Supabase
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error("Supabase connection error:", error);
    } else {
      console.log("Available buckets:", data);
    }
  } catch (error) {
    console.error("Failed to connect to Supabase:", error);
  }
}
testSupabaseConnection();
