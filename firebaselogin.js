// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsWydXympVQehwatTqCDuxTN9MCvsSPwo",
  authDomain: "car-rental-user-88dd3.firebaseapp.com",
  projectId: "car-rental-user-88dd3",
  storageBucket: "car-rental-user-88dd3.firebasestorage.app",
  messagingSenderId: "1093471354102",
  appId: "1:1093471354102:web:942050d686472f360bc0d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => (messageDiv.style.opacity = 0), 5000);
}

/* =======================
      REGISTER USER
========================== */

const register = document.getElementById("registeruser");
register.addEventListener("click", (event) => {
  event.preventDefault();

  const username = document.getElementById("newuser").value;
  const email = document.getElementById("newemail").value;
  const password = document.getElementById("newpassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const userData = {
        username,
        email
      };

      showMessage("Account Register Successful!", "SignUpMessage");

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Firestore Error:", error);
        });
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        showMessage("Email already in use. Please use a different email.", "SignUpMessage");
      } else {
        showMessage("Registration failed. Please try again.", "SignUpMessage");
      }
    });
});

/* =======================
          LOGIN
  Username or Email
========================== */

const login = document.getElementById("accountlogin");
login.addEventListener("click", async (event) => {
  event.preventDefault();

  const userInput = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let emailToLogin = userInput;

  // If input is NOT an email, treat it as username
  if (!userInput.includes("@")) {
    const q = query(collection(db, "users"), where("username", "==", userInput));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      showMessage("Invalid Username or Email.", "SignInMessage");
      return;
    }

    // Extract email from Firestore
    emailToLogin = querySnapshot.docs[0].data().email;
  }

  // Now login using email
  signInWithEmailAndPassword(auth, emailToLogin, password)
    .then((userCredential) => {
      showMessage("Login Successful!", "SignInMessage");
      localStorage.setItem("loggedInUser", userCredential.user.uid);
      window.location.href = "home.html";
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        showMessage("Incorrect Password.", "SignInMessage");
      } else if (error.code === "auth/user-not-found") {
        showMessage("Invalid Username or Email.", "SignInMessage");
      } else {
        showMessage("Login failed. Please try again.", "SignInMessage");
      }
    });
});
