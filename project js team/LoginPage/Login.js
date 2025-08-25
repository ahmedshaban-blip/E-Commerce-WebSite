
// import { auth, db } from "../firebase-config.js";
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("loginForm");
//   const usernameInput = document.getElementById("username");
//   const passwordInput = document.getElementById("password");

//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const username = usernameInput.value.trim();
//     const password = passwordInput.value;

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         username, 
//         password
//       );
//       const user = userCredential.user;

//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (userData.userType === "admin") {
//           window.location.href = "/AdminPage/homePage/admin.html";
//         } else {
//           window.location.href = "/UserPage/homePage/home.html";
//         }
//       } else {
//         alert(" No user data found!");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error.message);
//       alert(" Login failed: " + error.message);
//     }
//   });
// });


import { auth, db } from "../firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const msg = document.getElementById("form-msg");

    // Show a message for a few seconds
    const showMessage = (type, text) => {
        msg.className = "msg " + type; 
        msg.textContent = text;

        setTimeout(() => {
            msg.className = "msg";
            msg.textContent = "";
        }, 3000);
    };

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = usernameInput.value.trim(); 
        const password = passwordInput.value;

        if (!email || !password) {
            showMessage("error", "Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                showMessage("success", "Login successful! Redirecting...");
                
                const userData = docSnap.data();
                
                setTimeout(() => {
                    // Redirect to either admin or user page
                    if (userData.userType === "admin") {
                        window.location.href = "../AdminPage/homePage/admin.html";
                    } else {
                        window.location.href = "../UserPage/homePage/home.html";
                    }
                }, 1000); 

            } else {
                showMessage("error", "No user data found!");
            }
        } catch (error) {
            console.error("Error logging in:", error.code);
            
            let errorMessage = "Login failed. Please try again.";
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                errorMessage = "Incorrect email or password.";
            }
            
            showMessage("error", errorMessage);
        }
    });
});
