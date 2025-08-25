import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyD5bAX5QDSxRXRJt1u8IUiCxQek490z3KA",
  authDomain: "e-commerce-web-22ec7.firebaseapp.com",
  projectId: "e-commerce-web-22ec7",
  storageBucket: "e-commerce-web-22ec7.firebasestorage.app",
  messagingSenderId: "387051332100",
  appId: "1:387051332100:web:68570ddded8f91c44f0b51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);