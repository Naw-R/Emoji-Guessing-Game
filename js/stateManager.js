/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - switchState(newState): Switches between Menu, Lobby, Game, and Feedback states.
 *   - Handles screen visibility based on the current state.
 *   - Updates the final score and stops the timer when transitioning to Feedback state.
 * 
 * This file ensures seamless game flow by managing UI transitions dynamically.
 */

const states = {
    MENU: "menu",
    LOBBY: "lobby",
    GAME: "game",
    FEEDBACK: "feedback"
};

let currentState = states.MENU;

// Define `currentCategory` only if it doesn't already exist
if (typeof window.currentCategory === "undefined") {
    window.currentCategory = "";
}

// Function to switch between game states
function switchState(newState) {
    console.log(`switchState() called. Switching from ${currentState} to ${newState}`); // Debug log

    // Hide all screens
    document.getElementById("menu-screen").classList.add("hidden");
    document.getElementById("lobby-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("feedback-screen").classList.add("hidden");

    // Show the selected screen
    const newScreen = document.getElementById(`${newState}-screen`);
    if (newScreen) {
        newScreen.classList.remove("hidden");
        currentState = newState;
        console.log(`Successfully switched to ${newState} state.`); // Debug log
        
        // Handle final score display in Feedback state
        if (newState === "feedback") {
            console.log("Game over: Stopping timer."); // Debug log
            clearInterval(timerInterval); // Stop the game timer
            
            // Display final score in the Feedback screen
            document.getElementById("final-score").innerText = `Final Score: ${score}`;
        }
    } else {
        console.error(`Error: Invalid state "${newState}". No matching screen found.`); // Error log
    }
}

// Expose globally
window.switchState = switchState;
window.states = states;
