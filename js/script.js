/**
 * script.js
 * ----------
 * Main Game Script for the Emoji Word Guessing Game 
 * 
 * Handles:
 * - Username setup and display
 * - Game state event listeners and transitions
 * - Firebase leaderboard and feedback submissions
 * - Real-time banner update for top scores
 * 
 * Functions Overview:
 * - initUsername(): Initializes and displays a unique player username.
 * - submitScore(score): Saves high scores to Firebase leaderboard.
 * - updateBanner(): Updates the banner with top 3 leaderboard scores.
 * - showFullLeaderboard(): Displays full leaderboard with top 10 scores.
 * - submitFeedback(message, score, category): Sends player feedback to Firebase.
 * - showToast(message): Creates a brief toast popup for messages.
 * 
 * Uses:
 * - Firebase Firestore (initialized in firebaseInit.js)
 * - DOM event listeners and localStorage
 */

 /**
  * Initializes player username
  * If not found in localStorage, generates a random one and stores it.
  * Updates the welcome banner with the username.
  */
function initUsername() {
    // Retrieve stored username from local storage or create a default one
    let storedName = localStorage.getItem("username");
    if (!storedName) {
        const randomNum = Math.floor(Math.random() * 9000) + 1000; // Generate a random number
        storedName = `Player${randomNum}`; // Default username format
        localStorage.setItem("username", storedName); // Store the username
    }
    window.username = storedName; // Set global username variable

    // Update the display with the username
    const display = document.getElementById("username-display");
    if (display) {
        display.textContent = `Welcome, ${window.username}!`;
    }
}

/**
 * Submits the user's score to Firebase only if it's their personal best.
 * Updates existing record or creates a new one.
 */
async function submitScore(score) {
    if (!firebase || !firebase.firestore) {
        console.error("Firebase not initialized.");
        return;
    }

    const db = firebase.firestore();
    const leaderboardRef = db.collection("leaderboard");
    const username = window.username;

    try {
        // Check if a score already exists for this username
        const querySnapshot = await leaderboardRef.where("name", "==", username).get();

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const existingScore = existingDoc.data().score;

            if (score > existingScore) {
                // Update with the new higher score
                await leaderboardRef.doc(existingDoc.id).update({
                    score: score,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log("Score updated successfully.");
            } else {
                console.log("Score not high enough to update leaderboard.");
            }
        } else {
            // No score yet for this user, add a new one
            await leaderboardRef.add({
                name: username,
                score: score,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("New score submitted.");
        }
    } catch (error) {
        console.error("Error submitting or updating score:", error);
    }
}

/**
 * Fetches top 3 scores from Firebase and displays them in the banner.
 * Runs every second via setInterval for real-time updates.
 */
async function updateBanner() {
    // Check if Firebase is initialized
    if (!firebase || !firebase.firestore) {
        console.error("Firebase not initialized.");
        return; // Exit if Firebase is not set up
    }

    const db = firebase.firestore(); // Get Firestore database reference
    try {
        const snapshot = await db.collection("leaderboard")
            .orderBy("score", "desc") // Order by score descending
            .orderBy("timestamp", "asc") // Order by timestamp ascending
            .limit(3) // Limit to top 3 scores
            .get();

        console.log("Fetched leaderboard docs:", snapshot.docs.map(doc => doc.data())); // Log fetched documents
        const topScores = snapshot.docs.map(doc => doc.data()); // Extract top scores
        const bannerText = topScores.map(entry =>
            `${entry.name || "Anon"}: ${entry.score || 0}` // Format banner text
        ).join(" | ");
        const banner = document.getElementById("top-scores-text");
        if (banner) {
            banner.textContent = `Top Scores: ${bannerText}`; // Update banner text
        }
    } catch (error) {
        console.error("Error fetching leaderboard:", error); // Log any errors
    }
}

/**
 * Loads the top 10 scores from Firebase and populates the leaderboard table.
 */
async function showFullLeaderboard() {
    // Check if Firebase is initialized
    if (!firebase || !firebase.firestore) return; // Exit if Firebase is not set up

    const db = firebase.firestore(); // Get Firestore database reference
    try {
        const snapshot = await db.collection("leaderboard")
            .orderBy("score", "desc") // Order by score descending
            .orderBy("timestamp", "asc") // Order by timestamp ascending
            .limit(10) // Limit to top 10 scores
            .get();

        const tbody = document.querySelector("#leaderboard-table tbody");
        if (tbody) {
            tbody.innerHTML = ""; // Clear existing leaderboard
            snapshot.forEach(doc => {
                const { name, score } = doc.data(); // Extract name and score
                const row = document.createElement("tr");
                row.innerHTML = `<td>${name}</td><td>${score}</td>`; // Create table row
                tbody.appendChild(row); // Append row to table body
            });
        }
    } catch (err) {
        console.error("Error displaying full leaderboard:", err); // Log any errors
    }
}

/**
 * Submits player feedback with score and category to Firebase.
 * Provides UI toast confirmation or error.
 */
function submitFeedback(message, score, category) {
    if (!firebase || !firebase.firestore) return;

    const db = firebase.firestore();
    db.collection("feedback").add({
        name: window.username,
        category: category,
        score: score,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        showToast("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
    }).catch(error => {
        console.error("Error submitting feedback:", error);
        showToast("There was a problem submitting your feedback.");
    });
}

/**
 * Displays a temporary message banner ("toast") at the bottom of the screen.
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
