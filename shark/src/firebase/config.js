// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider}  from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAPjyK2ISlqo8h2wyKUARUp23PYcaj2U-c",
  authDomain: "project-shark-7250d.firebaseapp.com",
  projectId: "project-shark-7250d",
  storageBucket: "project-shark-7250d.appspot.com",
  messagingSenderId: "841334921809",
  appId: "1:841334921809:web:a60f385ef302996b94f670",
  measurementId: "G-96RXV3W7CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const db = getFirestore(app)