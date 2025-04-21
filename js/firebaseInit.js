/**
 * Firebase Initialization
 * Authors: Rowan and Maia
 * 
 * Initializes Firebase for the Emoji Guessing Game using the compat SDK,
 * since a module bundler is not being used.
 * 
 * Uses:
 * - Firebase App
 * - Firebase Analytics
 */

/**
 * Firebase project configuration
 */

const firebaseConfig = {
  apiKey: "AIzaSyA29gnyFD26EppNFDG0Fdxnc_smYLKGEAc",
  authDomain: "emojiguessinggame-bae5a.firebaseapp.com",
  projectId: "emojiguessinggame-bae5a",
  storageBucket: "emojiguessinggame-bae5a.firebasestorage.app",
  messagingSenderId: "32184547838",
  appId: "1:32184547838:web:f98e3eaa2e6582292928af",
  measurementId: "G-N6RS2KWSZR"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Sets Firebase services
  firebase.analytics(); // Enable Tracking
}