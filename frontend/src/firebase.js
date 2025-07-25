// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAE_bMqvpMm_UEeYGVDbzp-WwhzkzE07Wk",
  authDomain: "project-c016f.firebaseapp.com",
  projectId: "project-c016f",
  storageBucket: "project-c016f.firebasestorage.app",
  messagingSenderId: "393384143011",
  appId: "1:393384143011:web:806d97d75fa16265d27716",
  measurementId: "G-LEXV79DSWE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics };
