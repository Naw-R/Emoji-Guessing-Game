// Initialize Firebase using compat SDK because we are not using a module bundler

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
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}