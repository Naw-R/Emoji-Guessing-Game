/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - updateEmojiDisplay(emoji): Updates the emoji display on the screen.
 *   - updateScoreDisplay(): Updates the score display with the current score.
 *   - clearUserInput(): Clears the user input field.
 * 
 * This file ensures smooth user interaction by updating the UI dynamically during gameplay.
 */

// ui.js - Handles UI updates like emoji display, score, and input field.

// Function to update the emoji display on screen
function updateEmojiDisplay(emoji) {
    console.log(`Updating emoji display: ${emoji}`); // Debug log
    document.getElementById("emoji-display").innerText = emoji; // Show current emoji
}

// Function to update the score display
function updateScoreDisplay() {
    console.log(`Updating score display: ${score}`); // Debug log
    document.getElementById("game-score").innerText = score; // Update score in UI
}

// Function to clear the user input field
function clearUserInput() {
    console.log("Clearing user input field."); // Debug log
    document.getElementById("user-input").value = ""; // Reset input field
}

// Expose functions globally for use in other scripts
window.updateEmojiDisplay = updateEmojiDisplay;
window.updateScoreDisplay = updateScoreDisplay;
window.clearUserInput = clearUserInput;
