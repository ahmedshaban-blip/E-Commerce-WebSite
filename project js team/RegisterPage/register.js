// import { auth, db } from "../../firebase-config.js";
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// import {
//   doc,
//   setDoc,
// } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// const allowedAdminIDs = ["11", "22", "33", "44", "55", "66", "77", "88", "99"];

// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();

//     let username = document.getElementById("username").value.trim();
//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirm_password").value;
//     let yourID = document.getElementById("YourID").value.trim();
//     let userType = document.querySelector('input[name="user_type"]:checked');

//     if (!username || !email || !password || !confirmPassword || !yourID) {
//       const messageEl = document.getElementById("errorMessage");
//       messageEl.textContent = `Please fill in all fields `;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//       return;
//     }

//     if (!userType) {
//       const messageEl = document.getElementById("errorMessage");
//       messageEl.textContent = `Please select a user type `;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//       return;
//     }

//     if (userType.value === "admin") {
//       if (!allowedAdminIDs.includes(yourID)) {
//       const messageEl = document.getElementById("errorMessage");
//       messageEl.textContent = `Invalid Admin ID `;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//         return;
//       }
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         username: username,
//         email: email,
//         userType: userType.value,
//         yourID: userType.value === "admin" ? yourID : null,
//       });

//       const messageEl = document.getElementById("successMessage");
//       messageEl.textContent = `Registration successful`;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);

//       if (userType.value === "admin") {
//         window.location.href = "../AdminPage/homePage/admin.html";
//       } else {
//         window.location.href = "../UserPage/homePage/home.html";
//       }
//     } catch (error) {
//       console.error("Error registering user:", error.message);
//       const messageEl = document.getElementById("errorMessage");
//       messageEl.textContent = `Registration failed `;
//       messageEl.style.display = "block";
//       setTimeout(() => {
//         messageEl.style.display = "none";
//       }, 3000);
//     }
//   });

// let yourIdContainer = document.getElementById("YourID-container");
// let radioButtons = document.querySelectorAll('input[name="user_type"]');

// radioButtons.forEach((radio) => {
//   radio.addEventListener("change", function () {
//     if (this.value === "admin") {
//       yourIdContainer.style.display = "block";
//     } else {
//       yourIdContainer.style.display = "none";
//     }
//   });
// });

// import { auth, db } from "../../firebase-config.js";
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// import {
//   doc,
//   setDoc,
// } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// const allowedAdminIDs = ["11", "22", "33", "44", "55", "66", "77", "88", "99"];

// // function showSuccess(message) {
// //   const successElement = document.getElementById("successMessage");
// //   successElement.textContent = message;
// function showError(elementId, message) {
//   const errorElement = document.getElementById(elementId);
//   errorElement.textContent = message;
//   errorElement.style.display = "block";
// }

// // function hideError(elementId) 
// function clearErrors() {
//   const errorMessages = document.querySelectorAll(".error-message");
//   errorMessages.forEach((el) => {
//     el.textContent = "";
//     el.style.display = "none";
//   });
// }

// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();
//     clearErrors();

//     let username = document.getElementById("username").value.trim();
//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirm_password").value;
//     let yourID = document.getElementById("YourID").value.trim();
//     let userType = document.querySelector('input[name="user_type"]:checked');

//     let isValid = true;

//     if (username === "") {
//       showError("username-error", "username is required.");
//       isValid = false;
//     } else if (username.length < 3) {
//       showError("username-error", "username should be at least 3 characters.");
//       isValid = false;
//     }

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (email === "") {
//       showError("email-error", "email is required.");
//       isValid = false;
//     } else if (!emailRegex.test(email)) {
//       showError("email-error", "email not valid.");
//       isValid = false;
//     }

//     if (password === "") {
//       showError("password-error", "password is required.");
//       isValid = false;
//     } else if (password.length < 6) {
//       showError("password-error", "password should be at least 6 characters.");
//       isValid = false;
//     }

//     if (confirmPassword === "") {
//       showError("confirm-password-error", "Confirm password is required.");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       showError("confirm-password-error", "passwords do not match.");
//       isValid = false;
//     }

//     if (!userType) {
//       showError("user-type-error", "Please select a user type.");
//       isValid = false;
//     }

//     if (userType && userType.value === "admin") {
//       if (yourID === "") {
//         showError("your-id-error", "Admin ID is required for admin users.");
//         isValid = false;
//       } else if (!allowedAdminIDs.includes(yourID)) {
//         showError("your-id-error", "Admin ID not valid. Please use a valid ID.");
//         isValid = false;
//       }
//     }

//     if (!isValid) {
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         username: username,
//         email: email,
//         userType: userType.value,
//         yourID: userType.value === "admin" ? yourID : null,
//       });

//       const successMessageEl = document.getElementById("successMessage");
//       successMessageEl.textContent = "Registration successful!";
//       successMessageEl.style.display = "block";

//       setTimeout(() => {
//         if (userType.value === "admin") {
//           window.location.href = "../AdminPage/homePage/admin.html";
//         } else {
//           window.location.href = "../UserPage/homePage/home.html";
//         }
//       }, 2000);
//     } catch (error) {
//       console.error("Error registering user:", error.message);
//       const generalErrorEl = document.getElementById("errorMessage");

//       if (error.code === "auth/email-already-in-use") {
//         generalErrorEl.textContent =
//           "this email is already in use. Please try another one.";
//       } else {
//         generalErrorEl.textContent =
//           "error registering user. Please try again.";
//       }
//       generalErrorEl.style.display = "block";
//       setTimeout(() => {
//         generalErrorEl.style.display = "none";
//       }, 3000);
//     }
//   });

// let yourIdContainer = document.getElementById("YourID-container");
// let radioButtons = document.querySelectorAll('input[name="user_type"]');

// radioButtons.forEach((radio) => {
//   radio.addEventListener("change", function () {
//     if (this.value === "admin") {
//       yourIdContainer.style.display = "block";
//     } else {
//       yourIdContainer.style.display = "none";
//       document.getElementById("your-id-error").style.display = "none";
//     }
//   });
// });


// ------------------- الإعداد والاتصال بـ Firebase -------------------
// استيراد الدوال اللازمة من مكتبة Firebase
import { auth, db } from '../firebase-config.js';
 // auth للمصادقة, db لقاعدة البيانات
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"; // دالة لإنشاء حساب جديد
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"; // دوال لحفظ البيانات في قاعدة البيانات

// ------------------- إعدادات خاصة بالمسؤول (Admin) -------------------
// قائمة تحتوي على أرقام الهوية المسموح لها بالتسجيل كمسؤول
const allowedAdminIDs = ["11", "22", "33", "44", "55", "66", "77", "88", "99"];

// ------------------- دوال مساعدة لإظهار وإخفاء الرسائل -------------------
/**
 * دالة لإظهار رسالة خطأ في مكان محدد في الصفحة
 * @param {string} elementId - الـ id الخاص بالعنصر الذي ستظهر فيه الرسالة
 * @param {string} message - نص رسالة الخطأ
 */
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId); // البحث عن عنصر الخطأ
  errorElement.textContent = message; // وضع نص الرسالة فيه
  errorElement.style.display = "block"; // إظهار العنصر
}

/**
 * دالة لمسح جميع رسائل الخطأ من الشاشة
 */
function clearErrors() {
  // البحث عن كل العناصر التي لها كلاس "error-message"
  const errorMessages = document.querySelectorAll(".error-message");
  // المرور على كل عنصر وإخفاؤه
  errorMessages.forEach((el) => {
    el.textContent = ""; // إفراغ النص
    el.style.display = "none"; // إخفاء العنصر
  });
}

// ------------------- المنطق الرئيسي عند إرسال الفورم -------------------
// البحث عن فورم التسجيل وإضافة "مستمع" لحدث الإرسال (submit)
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    // منع السلوك الافتراضي للفورم (إعادة تحميل الصفحة)
    e.preventDefault();
    // أولاً، نقوم بمسح أي رسائل خطأ قديمة
    clearErrors();

    // --- 1. الحصول على البيانات من حقول الإدخال ---
    let username = document.getElementById("username").value.trim(); // .trim() لإزالة المسافات الزائدة
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let yourID = document.getElementById("YourID").value.trim();
    // البحث عن زر الراديو الذي تم اختياره لنوع المستخدم
    let userType = document.querySelector('input[name="user_type"]:checked');

    // --- 2. التحقق من صحة البيانات (Validation) ---
    let isValid = true; // متغير "علم" لتتبع ما إذا كانت جميع البيانات صالحة

    // التحقق من اسم المستخدم
    if (username === "") {
      showError("username-error", "username is required.");
      isValid = false; // إذا كان هناك خطأ، نغير العلم إلى false
    } else if (username.length < 3) {
      showError("username-error", "username should be at least 3 characters.");
      isValid = false;
    }

    // التحقق من البريد الإلكتروني باستخدام تعبير نمطي (Regex)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email === "") {
      showError("email-error", "email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError("email-error", "email not valid.");
      isValid = false;
    }

    // التحقق من كلمة المرور
    if (password === "") {
      showError("password-error", "password is required.");
      isValid = false;
    } else if (password.length < 6) {
      showError("password-error", "password should be at least 6 characters.");
      isValid = false;
    }

    // التحقق من تطابق كلمتي المرور
    if (confirmPassword === "") {
      showError("confirm-password-error", "Confirm password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      showError("confirm-password-error", "passwords do not match.");
      isValid = false;
    }

    // التحقق من اختيار نوع المستخدم
    if (!userType) {
      showError("user-type-error", "Please select a user type.");
      isValid = false;
    }

    // التحقق من هوية المسؤول (إذا تم اختياره)
    if (userType && userType.value === "admin") {
      if (yourID === "") {
        showError("your-id-error", "Admin ID is required for admin users.");
        isValid = false;
      } else if (!allowedAdminIDs.includes(yourID)) {
        // التحقق مما إذا كانت الهوية موجودة في قائمة الهويات المسموح بها
        showError("your-id-error", "Admin ID not valid. Please use a valid ID.");
        isValid = false;
      }
    }

    // إذا كان هناك أي خطأ (isValid == false)، نتوقف هنا ولا نكمل عملية التسجيل
    if (!isValid) {
      return;
    }

    // --- 3. محاولة تسجيل المستخدم في Firebase ---
    try {
      // إنشاء حساب المستخدم باستخدام البريد الإلكتروني وكلمة المرور
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // الحصول على بيانات المستخدم الذي تم إنشاؤه

      // حفظ بيانات المستخدم الإضافية في قاعدة بيانات Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        userType: userType.value,
        // إذا كان المستخدم مسؤولاً، احفظ هويته، وإلا فاحفظ القيمة null
        yourID: userType.value === "admin" ? yourID : null,
      });

      // إظهار رسالة نجاح للمستخدم
      const successMessageEl = document.getElementById("successMessage");
      successMessageEl.textContent = "Registration successful!";
      successMessageEl.style.display = "block";

      // بعد ثانيتين، يتم توجيه المستخدم إلى الصفحة المناسبة
      setTimeout(() => {
        if (userType.value === "admin") {
          window.location.href = "../AdminPage/homePage/admin.html"; // صفحة المسؤول
        } else {
          window.location.href = "../UserPage/homePage/home.html"; // صفحة المستخدم العادي
        }
      }, 2000); // 2000ms = 2 seconds
    } catch (error) {
      // في حالة حدوث خطأ أثناء التسجيل (مثل إيميل مستخدم من قبل)
      console.error("Error registering user:", error.message);
      const generalErrorEl = document.getElementById("errorMessage");

      // عرض رسالة خطأ مخصصة للمستخدم
      if (error.code === "auth/email-already-in-use") {
        generalErrorEl.textContent =
          "this email is already in use. Please try another one.";
      } else {
        generalErrorEl.textContent =
          "error registering user. Please try again.";
      }
      generalErrorEl.style.display = "block";
      // إخفاء رسالة الخطأ بعد 3 ثوانٍ
      setTimeout(() => {
        generalErrorEl.style.display = "none";
      }, 3000);
    }
  });

// ------------------- منطق إظهار/إخفاء حقل هوية المسؤول -------------------
// الحصول على الحاوية الخاصة بحقل "Your ID"
let yourIdContainer = document.getElementById("YourID-container");
// الحصول على جميع أزرار الراديو الخاصة بنوع المستخدم
let radioButtons = document.querySelectorAll('input[name="user_type"]');

// إضافة "مستمع" لكل زر راديو
radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    // عند تغيير الاختيار، تحقق من القيمة
    if (this.value === "admin") {
      // إذا تم اختيار "admin"، أظهر حقل الهوية
      yourIdContainer.style.display = "block";
    } else {
      // إذا تم اختيار أي شيء آخر، أخفِ الحقل ورسالة الخطأ الخاصة به
      yourIdContainer.style.display = "none";
      document.getElementById("your-id-error").style.display = "none";
    }
  });
});
