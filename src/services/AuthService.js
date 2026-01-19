import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase.js';

class AuthService {
    constructor() {
        this.currentUser = null;
        this.authStateListeners = [];
    }

    // Initialize auth state listener
    init() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.currentUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    };
                    // Create or update user document in Firestore
                    await this.createUserDocument(user);
                } else {
                    this.currentUser = null;
                }
                // Notify all listeners
                this.authStateListeners.forEach(listener => listener(this.currentUser));
                resolve(this.currentUser);
            });
        });
    }

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign out
    async signOut() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            console.error('Sign-out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Create user document in Firestore
    async createUserDocument(user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // New user - create document
            await setDoc(userRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp()
            });
        } else {
            // Existing user - update last login
            await setDoc(userRef, {
                lastLoginAt: serverTimestamp()
            }, { merge: true });
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Subscribe to auth state changes
    onAuthStateChange(callback) {
        this.authStateListeners.push(callback);
        // Return unsubscribe function
        return () => {
            this.authStateListeners = this.authStateListeners.filter(cb => cb !== callback);
        };
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
