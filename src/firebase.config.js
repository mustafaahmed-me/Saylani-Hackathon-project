// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCankIPjVLcFZ0bbYKXl-67kQgCM68q64",
  authDomain: "react-project-23eef.firebaseapp.com",
  projectId: "react-project-23eef",
  storageBucket: "react-project-23eef.appspot.com",
  messagingSenderId: "858419886411",
  appId: "1:858419886411:web:743bd677a3bf5b53a690ce",
  measurementId: "G-44DJWRSNNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
