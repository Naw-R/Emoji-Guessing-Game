// stateManager.js - Handles switching between Menu, Lobby, and In-Game states

const states = {
    MENU: "menu",
    LOBBY: "lobby",
    GAME: "game"
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

    // Show the selected screen
    const newScreen = document.getElementById(`${newState}-screen`);
    if (newScreen) {
        newScreen.classList.remove("hidden");
        currentState = newState;
        console.log(`Successfully switched to ${newState} state.`); // Debug log
    } else {
        console.error(`Error: Invalid state "${newState}". No matching screen found.`); // Error log
    }
}

// Expose globally
window.switchState = switchState;
window.states = states;
