/**
 * stateManager.js
 * 
 * Authors: Maia and Rowan
 * 
 * This module handles all screen state transitions in the Emoji Guessing Game.
 * It controls which screen (menu, lobby, game, feedback, leaderboard) is visible
 * at any given moment, and also updates the score display and final score when needed.
 *
 * Functions:
 * - switchState(newState): Dynamically shows the requested screen and performs related state-specific logic.
 * 
 * Key Features:
 * - Maintains a centralized 'states' object for clean and readable state references.
 * - Updates the player's score when moving into or out of game-related screens.
 * - Stops the game timer and displays final score upon entering the feedback screen.
 *
 * Global Variables Exposed:
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
 * Handles transition between game screens and associated logic
 * @param {string} newState - The screen to switch to (menu, game, etc.)
 */
function switchState(newState) {
    console.log(`switchState() called. Switching from ${currentState} to ${newState}`); // Debug log

    // Hide all screens to prepare for the new state
    document.getElementById("menu-screen").classList.add("hidden");
    document.getElementById("lobby-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("feedback-screen").classList.add("hidden");
    document.getElementById("leaderboard-screen").classList.add("hidden");

    // Show the selected screen based on the new state
    const newScreen = document.getElementById(`${newState}-screen`);
    if (newScreen) {
        newScreen.classList.remove("hidden"); // Display the new state screen
        currentState = newState; // Update the current state
        console.log(`Successfully switched to ${newState} state.`); // Debug log
        
        // Reset score when returning to Menu, Lobby, or Leaderboard
        if (newState === "menu" || newState === "lobby" || newState === "leaderboard") {
            console.log("Resetting score for new game."); // Debug log
            score = 0; // Reset score to zero
            document.getElementById("game-score").innerText = score; // Update score display
            resetFeedback();
            startEmojiAnimation();
        }

        // Handle final score display in Feedback state
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
