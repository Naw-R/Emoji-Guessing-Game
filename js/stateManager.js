/**
 * stateManager.js
 * ----------------
 * Manages all screen transitions and state logic for the Emoji Guessing Game. 
 * This file handles which screen (menu, lobby, game, feedback, leaderboard) is visible
 * at any time and updates the UI based on game progress.
 * 
 * Functions:
 * - switchState(newState): Switches to the specified screen and performs logic specific to that state.
 * 
 * Key Features:
 * - Centralized state object for easy management
 * - Score resets and UI updates when switching screens
 * - Final score displayed at the end of the game
 * 
 * Uses:
 * - DOM manipulation via getElementById and classList
 * - setInterval and clearInterval for timing
 * 
 * Globals Exposed:
 * - window.switchState
 * - window.states
 */

// Define the different states of the game
const states = {
    MENU: "menu",
    LOBBY: "lobby",
    GAME: "game",
    FEEDBACK: "feedback",
    LEADERBOARD: "leaderboard"
};

// Initialize the current state to MENU
let currentState = states.MENU;

// Define `currentCategory` only if it doesn't already exist
if (typeof window.currentCategory === "undefined") {
    window.currentCategory = ""; // Initialize currentCategory as an empty string
}

/**
 * Switches the current game state to the specified one.
 * Hides all screens, shows the selected one, resets score if needed,
 * and handles feedback screen logic (like displaying final score and stopping timer).
 */
// Function to switch between game states
function switchState(newState) {
    console.log(`switchState() called. Switching from ${currentState} to ${newState}`); // Debug log

    // Hide all screens before showing the new state screen
    document.getElementById("menu-screen").classList.add("hidden");
    document.getElementById("lobby-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("feedback-screen").classList.add("hidden");
    document.getElementById("leaderboard-screen").classList.add("hidden");

    // Show the screen that matches the new state
    const newScreen = document.getElementById(`${newState}-screen`);
    if (newScreen) {
        newScreen.classList.remove("hidden"); // Display the new state screen
        currentState = newState; // Update the current state
        console.log(`Successfully switched to ${newState} state.`); // Debug log
        
        // Reset score and visuals when switching to a non-game screen
        if (newState === "menu" || newState === "lobby" || newState === "leaderboard") {
            console.log("Resetting score for new game."); // Debug log
            score = 0; // Reset score to zero
            document.getElementById("game-score").innerText = score; // Update score display
            resetFeedback();
            startEmojiAnimation();
        }

        // Stop timer and show final score when entering feedback state
        if (newState === "feedback") {
            console.log("Game over: Stopping timer."); // Debug log
            clearInterval(timerInterval); // Stop the game timer
            resetFeedback();
            startEmojiAnimation();

            // Display final score in the Feedback screen
            document.getElementById("final-score").innerText = `Final Score: ${score}`;
        }
    } else {
        console.error(`Error: Invalid state "${newState}". No matching screen found.`); // Error log
    }
}

// Expose globally for access in other parts of the application
window.switchState = switchState;
window.states = states;
