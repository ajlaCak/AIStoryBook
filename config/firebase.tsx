// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-storybook-ead20.firebaseapp.com",
  projectId: "ai-storybook-ead20",
  storageBucket: "ai-storybook-ead20.firebasestorage.app",
  messagingSenderId: "583683122220",
  appId: "1:583683122220:web:9e4755a7a49549f2a05d89",
  measurementId: "G-92QHYGFN80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)