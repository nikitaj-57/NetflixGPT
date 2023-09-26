// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkvDMAdyXuOvA77b5lD7dg5IZNalezWRs",
  authDomain: "netflixgpt-e1545.firebaseapp.com",
  projectId: "netflixgpt-e1545",
  storageBucket: "netflixgpt-e1545.appspot.com",
  messagingSenderId: "511392510783",
  appId: "1:511392510783:web:075fc2300b22f6346b998a",
  measurementId: "G-YCE4D0HGYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
