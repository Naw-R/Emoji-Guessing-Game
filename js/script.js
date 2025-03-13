// script.js - Main entry point, initializing everything

document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Initialized! DOM fully loaded."); // Debug log

    // Attach event listeners for category selection buttons
    document.querySelectorAll(".category-btn").forEach(button => {
        console.log(`Attaching event listener to category button: ${button.innerText}`); // Debug log
        button.addEventListener("click", () => {
            console.log(`Category button clicked: ${button.getAttribute("data-category")}`); // Debug log
            loadCategory(button.getAttribute("data-category"));
        });
    });

    // Attach event listeners for other state transitions
    document.getElementById("start-game-btn").addEventListener("click", () => {
        console.log("Start Game button clicked. Switching to GAME state."); // Debug log
        switchState(states.GAME);
        startGame(); // Calls game logic function
    });

    document.getElementById("return-menu-btn").addEventListener("click", () => {
        console.log("Return button clicked. Switching to MENU state."); // Debug log
        switchState(states.MENU);
    });

    document.getElementById("exit-game-btn").addEventListener("click", () => {
        console.log("Exit Game button clicked. Returning to LOBBY state."); // Debug log
        switchState(states.LOBBY);
    });
});

// Function to load category and move to Lobby
function loadCategory(category) {
    console.log(`loadCategory() called with category: ${category}`); // Debug log

    window.currentCategory = category; // Use the globally defined variable from stateManager.js
    document.getElementById("selected-category").innerText = currentCategory;

    console.log(`currentCategory updated: ${window.currentCategory}`); // Debug log

    if (typeof switchState === "function") {
        console.log("Switching to LOBBY state..."); // Debug log
        switchState(states.LOBBY);
    } else {
        console.error("Error: switchState() is not available.");
    }
}
