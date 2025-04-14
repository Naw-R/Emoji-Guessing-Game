/**
 * firebaseInit.js
 * ----------------
 * Initializes Firebase for the Emoji Word Guessing Game.
 * This file uses the Firebase compat SDK and sets up analytics 
 * and Firestore access for the game.
 * 
 * Firebase Configuration includes:
 * - API key, project ID, auth domain, etc.
 * 
 * The initialization is wrapped in a conditional to avoid re-initializing
 * Firebase if it's already been set up.
 * 
 * Uses:
 * - firebase.initializeApp()
 * - firebase.analytics()
 */

// Firebase configuration specific to this project
const firebaseConfig = {
  apiKey: "AIzaSyA29gnyFD26EppNFDG0Fdxnc_smYLKGEAc",
  authDomain: "emojiguessinggame-bae5a.firebaseapp.com",
  projectId: "emojiguessinggame-bae5a",
  storageBucket: "emojiguessinggame-bae5a.firebasestorage.app",
  messagingSenderId: "32184547838",
  appId: "1:32184547838:web:f98e3eaa2e6582292928af",
  measurementId: "G-N6RS2KWSZR"
};

// Ensure Firebase is only initialized once (avoid re-initialization on reload)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}