// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzcsgbSTi9KmLibx1dNwWT7A5WLQAAVuI",
  authDomain: "react-native-ai-tour-app.firebaseapp.com",
  projectId: "react-native-ai-tour-app",
  storageBucket: "react-native-ai-tour-app.appspot.com",
  messagingSenderId: "850494334622",
  appId: "1:850494334622:web:9bb4f1b6dc3a3f9540fd8f",
  measurementId: "G-V0JYP22KRV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
