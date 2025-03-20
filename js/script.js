/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - loadCategory(category): Loads and sets the selected emoji category, then transitions to the Lobby state.
 *   - Handles game state changes and UI transitions.
 *   - Attaches event listeners for category selection, starting the game, exiting, and returning to the menu.
 * 
 * This file ensures smooth game progression by dynamically managing UI and event-driven interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Initialized! DOM fully loaded."); // Debug log

    // Attach event listeners for category selection buttons
    document.querySelectorAll(".category-btn").forEach(button => {
        console.log(`Attaching event listener to category button: ${button.innerText}`); // Debug log
        button.addEventListener("click", () => {
            console.log(`Category button clicked: ${button.getAttribute("data-category")}`); // Debug log
            loadCategory(button.getAttribute("data-category")); // Load selected emoji category
        });
    });

    // Start Game Button - Switch to GAME state and begin gameplay
    document.getElementById("start-game-btn").addEventListener("click", () => {
        console.log("Start Game button clicked. Switching to GAME state."); // Debug log
        switchState(states.GAME); // Change game state to active play
        startGame(); // Initialize game logic
    });

    // Return to Menu Button (General) - Navigates to the main menu
    document.getElementById("return-menu-btn").addEventListener("click", () => {
        console.log("Return button clicked. Switching to MENU state."); // Debug log
        switchState(states.MENU); // Go back to main menu
    });

   // Exit Game Button - Ends game and transitions to FEEDBACK state
document.getElementById("exit-game-btn").addEventListener("click", () => {
    console.log("Exit Game button clicked. Returning to FEEDBACK state."); // Debug log
    switchState(states.FEEDBACK); // Switch to feedback screen
    clearInterval(timerInterval); // Stop timer when exiting
});

    // Return Button in Feedback Screen - Goes back to Menu after feedback
    document.getElementById("return-feedback-btn").addEventListener("click", () => {
        console.log("Return button clicked in Feedback state. Switching to MENU."); // Debug log
        switchState(states.MENU); // Return to main menu from feedback
    });
});

// Loads the selected emoji category and moves to the Lobby screen
function loadCategory(category) {
    console.log(`loadCategory() called with category: ${category}`); // Debug log

    window.currentCategory = category; // Store selected category globally
    document.getElementById("selected-category").innerText = currentCategory; // Update UI text

    console.log(`currentCategory updated: ${window.currentCategory}`); // Debug log

    // Ensure `switchState` function exists before calling it
    if (typeof switchState === "function") {
        console.log("Switching to LOBBY state..."); // Debug log
        switchState(states.LOBBY); // Transition to Lobby screen
    } else {
        console.error("Error: switchState() is not available."); // Debug log error if function is missing
    }
}
