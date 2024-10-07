import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATZcL47uxq5Zj7VvQNuf8m5yfy1YxF_2k",
  authDomain: "forever-living-5d868.firebaseapp.com",
  projectId: "forever-living-5d868",
  storageBucket: "forever-living-5d868.appspot.com",
  messagingSenderId: "748571382420",
  appId: "1:748571382420:web:c38cf44e5bcb7e76241a81",
  measurementId: "G-LQHP02BW9J"
};

console.log("Firebase config:", JSON.stringify(firebaseConfig, null, 2));

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();