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

let app;
let auth;
let analytics;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");

  auth = getAuth(app);
  console.log("Firebase auth initialized successfully");

  analytics = getAnalytics(app);
  console.log("Firebase analytics initialized successfully");

  db = getFirestore(app);
  console.log("Firebase Firestore initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { app, auth, analytics, db };
export const googleProvider = new GoogleAuthProvider();