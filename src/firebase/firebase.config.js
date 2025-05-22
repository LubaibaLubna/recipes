// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2TfhcWKWflYomh2VHDmv72xAiLZGkGYY",
  authDomain: "recipe-book-24c5a.firebaseapp.com",
  projectId: "recipe-book-24c5a",
  storageBucket: "recipe-book-24c5a.firebasestorage.app",
  messagingSenderId: "1034656129305",
  appId: "1:1034656129305:web:65b81b75050d20eb1ca588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;