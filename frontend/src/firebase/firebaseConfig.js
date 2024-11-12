import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth service if needed

const firebaseConfig = {
  apiKey: "AIzaSyA3JVxLTh6lHv2EmAiRhS0FlHZGnyFMgFY",
  authDomain: "recipe-b7969.firebaseapp.com",
  projectId: "recipe-b7969",
  storageBucket: "recipe-b7969.appspot.com",
  messagingSenderId: "365276829361",
  appId: "1:365276829361:web:95835841f1dedf6b553490",
  measurementId: "G-09W0NE3N5T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// If using authentication
const auth = getAuth(app);
export { auth };