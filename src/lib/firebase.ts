// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAquG7rOOywJIzqJz7hwvUUYyRKLgauYXM",
  authDomain: "theverdanthotels-605d7.firebaseapp.com",
  projectId: "theverdanthotels-605d7",
  storageBucket: "theverdanthotels-605d7.firebasestorage.app",
  messagingSenderId: "927099322704",
  appId: "1:927099322704:web:55b88ee351e6c214bdac55",
  measurementId: "G-WMR6K8PM7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
