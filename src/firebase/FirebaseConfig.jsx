// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6wMVNFivJORxV1SwQ7vBub6GFtodnhNw",
  authDomain: "estore-bbad6.firebaseapp.com",
  projectId: "estore-bbad6",
  storageBucket: "estore-bbad6.firebasestorage.app",
  messagingSenderId: "430021699535",
  appId: "1:430021699535:web:92f12281219d448d9854ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
