// ui.js - Updates the UI dynamically

// Function to update emoji display
function updateEmojiDisplay(emoji) {
    console.log(`Updating emoji display: ${emoji}`); // Debug log
    document.getElementById("emoji-display").innerText = emoji;
}

// Function to update score display
function updateScoreDisplay() {
    console.log(`Updating score display: ${score}`); // Debug log
    document.getElementById("game-score").innerText = score;
}

// Function to clear user input field
function clearUserInput() {
    console.log("Clearing user input field."); // Debug log
    document.getElementById("user-input").value = "";
}

// Expose functions globally for use in other scripts
window.updateEmojiDisplay = updateEmojiDisplay;
window.updateScoreDisplay = updateScoreDisplay;
window.clearUserInput = clearUserInput;
