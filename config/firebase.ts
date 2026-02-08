import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWncifEOqrUFJjjdMDykp27n26gaDLhJs",
    authDomain: "fieldcoffee.firebaseapp.com",
    projectId: "fieldcoffee",
    storageBucket: "fieldcoffee.firebasestorage.app",
    messagingSenderId: "652408466090",
    appId: "1:652408466090:web:06d85b27b518fd1c95bed3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);