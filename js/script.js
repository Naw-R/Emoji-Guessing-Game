/**
 * Main Game Script
 * 
 * Handles:
 * - Initializing player usernames
 * - Setting up event listeners for game states and UI buttons
 * - Submitting and updating leaderboard scores in Firebase
 * - Submitting player feedback to Firebase
 * - Displaying top scores in the banner and full leaderboard view
 * 
 * Firebase is initialized separately via a script tag in index.html (firebaseInit.js)
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

// Set up event listeners and initialize game state once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initUsername(); // Initialize the username
    updateBanner(); // Update the leaderboard banner
    // Refresh leaderboard banner every 1 seconds
    setInterval(updateBanner, 1000);

    // Event listeners for category buttons
    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category"); // Get category from button
            loadCategory(category); // Load the selected category
        });
    });

    // Event listener for starting the game
    document.getElementById("start-game-btn").addEventListener("click", () => {
        console.log("Game started!");
        switchState("game"); // Change the game state to 'game'
        if (typeof startGame === "function") {
            startGame(); // Start the game if the function is defined
        } else {
            console.warn("startGame() is not defined");
        }
    });

    // Event listener for returning to menu
    document.getElementById("return-menu-btn").addEventListener("click", () => {
        console.log("Returning to menu...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for exiting the game
    document.getElementById("exit-game-btn").addEventListener("click", () => {
        console.log("Exiting game...");
        switchState("feedback"); // Change the game state to 'feedback'
    });

    // Event listener for returning from feedback
    document.getElementById("return-feedback-btn").addEventListener("click", () => {
        console.log("Returning from feedback...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for returning to menu from leaderboard
    document.getElementById("return-menu-from-leaderboard").addEventListener("click", () => {
        console.log("Returning to menu from leaderboard...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for leaderboard banner click
    const leaderboardBanner = document.getElementById("leaderboard-banner");
    if (leaderboardBanner) {
        leaderboardBanner.addEventListener("click", () => {
            if (typeof currentState !== "undefined" && currentState === "menu") {
                switchState("leaderboard"); // Change state to 'leaderboard'
                showFullLeaderboard(); // Show full leaderboard
            } else {
                alert("Leaderboard can be viewed fully from the main menu!"); // Alert if not in menu
            }
        });
    }

});

// Submit score to Firebase leaderboard, only if it's the user's best score
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

// Fetch top 3 scores and update leaderboard banner
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

// Load top 10 scores into leaderboard screen
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

// Submit player feedback to Firestore
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
        alert("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
    }).catch(error => {
        console.error("Error submitting feedback:", error);
        alert("There was a problem submitting your feedback.");
    });
}


// Firebase is initialized via a script tag in index.html

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

// Set up event listeners and initialize game state once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initUsername(); // Initialize the username
    updateBanner(); // Update the leaderboard banner
    // Refresh leaderboard banner every 1 seconds
    setInterval(updateBanner, 1000);

    // Event listeners for category buttons
    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category"); // Get category from button
            loadCategory(category); // Load the selected category
        });
    });

    // Event listener for starting the game
    document.getElementById("start-game-btn").addEventListener("click", () => {
        console.log("Game started!");
        switchState("game"); // Change the game state to 'game'
        if (typeof startGame === "function") {
            startGame(); // Start the game if the function is defined
        } else {
            console.warn("startGame() is not defined");
        }
    });

    // Event listener for returning to menu
    document.getElementById("return-menu-btn").addEventListener("click", () => {
        console.log("Returning to menu...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for exiting the game
    document.getElementById("exit-game-btn").addEventListener("click", () => {
        console.log("Exiting game...");
        switchState("feedback"); // Change the game state to 'feedback'
    });

    // Event listener for returning from feedback
    document.getElementById("return-feedback-btn").addEventListener("click", () => {
        console.log("Returning from feedback...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for returning to menu from leaderboard
    document.getElementById("return-menu-from-leaderboard").addEventListener("click", () => {
        console.log("Returning to menu from leaderboard...");
        switchState("menu"); // Change the game state to 'menu'
    });

    // Event listener for leaderboard banner click
    const leaderboardBanner = document.getElementById("leaderboard-banner");
    if (leaderboardBanner) {
        leaderboardBanner.addEventListener("click", () => {
            if (typeof currentState !== "undefined" && currentState === "menu") {
                switchState("leaderboard"); // Change state to 'leaderboard'
                showFullLeaderboard(); // Show full leaderboard
            } else {
                alert("Leaderboard can be viewed fully from the main menu!"); // Alert if not in menu
            }
        });
    }

});

// Submit score to Firebase leaderboard, only if it's the user's best score
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

// Fetch top 3 scores and update leaderboard banner
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

// Load top 10 scores into leaderboard screen
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

