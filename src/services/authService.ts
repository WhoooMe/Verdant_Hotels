import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase.ts";

const googleProvider = new GoogleAuthProvider();

// LOGIN EMAIL
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// REGISTER EMAIL (optional tapi bagus disiapkan)
export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// LOGIN GOOGLE
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// LOGOUT
export const logout = () => {
  return signOut(auth);
};
