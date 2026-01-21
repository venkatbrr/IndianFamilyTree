import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuAkWbQRZhmx4ULJT0qoHOZmVl9dUez8U",
  authDomain: "indian-family-tree-1990.firebaseapp.com",
  projectId: "indian-family-tree-1990",
  storageBucket: "indian-family-tree-1990.firebasestorage.app",
  messagingSenderId: "1061764015655",
  appId: "1:1061764015655:web:a61a61044ede9e7559d002"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export default app;
