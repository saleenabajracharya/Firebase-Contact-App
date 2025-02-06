import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDAbDjAffpW5sqIJUpaLMoAHJbxu1e75ZA",
  authDomain: "vite-contact-3463a.firebaseapp.com",
  projectId: "vite-contact-3463a",
  storageBucket: "vite-contact-3463a.firebasestorage.app",
  messagingSenderId: "449223441827",
  appId: "1:449223441827:web:f19f87deeb09eebd1fae16"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);