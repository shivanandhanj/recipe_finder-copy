import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app);

// Sign Up
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
