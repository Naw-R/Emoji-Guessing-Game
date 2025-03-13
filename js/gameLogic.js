// gameLogic.js - Manages game mechanics

// Function to load the selected category
function loadCategory(category) {
    console.log(`loadCategory() called with category: ${category}`); // Debug log

    window.currentCategory = category; // Store selected category globally
    document.getElementById("selected-category").innerText = category;

    console.log(`currentCategory is now set to: ${window.currentCategory}`); // Debug log

    if (typeof switchState === "function") {
        console.log("Switching state to LOBBY..."); // Debug log
        switchState(states.LOBBY);
    } else {
        console.error("Error: switchState() is not available.");
    }
}

// Attach event listeners to category buttons
document.addEventListener("DOMContentLoaded", () => {
    console.log("Document fully loaded. Adding event listeners to category buttons."); // Debug log

    document.querySelectorAll(".category-btn").forEach(button => {
        console.log(`Adding event listener to button: ${button.innerText}`); // Debug log
        button.addEventListener("click", () => {
            console.log(`Category button clicked: ${button.getAttribute("data-category")}`); // Debug log
            loadCategory(button.getAttribute("data-category"));
        });
    });
});
