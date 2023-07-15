// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfP0hVFKOdH2aRFQQ-hmmeyFR3G_4K870",
  authDomain: "blockchain-based-scm.firebaseapp.com",
  projectId: "blockchain-based-scm",
  storageBucket: "blockchain-based-scm.appspot.com",
  messagingSenderId: "1055087242583",
  appId: "1:1055087242583:web:b15776f2593ecf16b06212",
  measurementId: "G-0GF907TG0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);