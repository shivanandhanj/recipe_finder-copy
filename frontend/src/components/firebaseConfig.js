import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth service if needed

const firebaseConfig = {
  apiKey: "AIzaSyAVAGwEleuli0oYK4V5NOm9iotBXrVaBSc",
  authDomain: "recipe-de14b.firebaseapp.com",
  projectId: "recipe-de14b",
  storageBucket: "recipe-de14b.appspot.com",
  messagingSenderId: "640360299243",
  appId: "1:640360299243:web:8f6e9769d3149933205cae",
  measurementId: "G-5Y5FCFL5VH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// If using authentication
const auth = getAuth(app);
export{auth}
