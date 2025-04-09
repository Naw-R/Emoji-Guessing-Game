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



let wrongAttempts = 0;

function showCheckmark() {
    let check = document.getElementById("checkmark");
    
    // Create the element if it doesn't exist
    if (!check) {
        console.warn("Checkmark element not found, creating it dynamically");
        check = document.createElement("div");
        check.id = "checkmark";
        check.className = "hidden";
        check.textContent = "✅";
        
        // Find a parent to append to
        const feedbackDiv = document.getElementById("feedback");
        if (feedbackDiv) {
            feedbackDiv.appendChild(check);
        } else {
            // Fallback to appending to game screen
            const gameScreen = document.getElementById("game-screen");
            if (gameScreen) {
                gameScreen.appendChild(check);
            } else {
                console.error("Could not find appropriate parent for checkmark");
                return;
            }
        }
    }
    
    check.classList.add("show");
    check.classList.remove("hidden");

    setTimeout(() => {
        check.classList.remove("show");
        check.classList.add("hidden");
    }, 1500);
}


// Show X for wrong attempt
function showWrongAttempt() {
    wrongAttempts++;
  
    // Get all x-icon elements and show the current one
    const xIcons = document.querySelectorAll('.x-icon');
    if (wrongAttempts <= xIcons.length && xIcons[wrongAttempts - 1]) {
        xIcons[wrongAttempts - 1].classList.remove("hidden");
        xIcons[wrongAttempts - 1].classList.add("show");
    }
  
    if (wrongAttempts >= 3) {
      // End game after 3 wrong attempts
      alert("Game Over! Too many incorrect guesses.");
      submitScore(score);
      switchState(states.FEEDBACK);
    }
  }

  function resetFeedback() {
     // Reset checkmark
     const checkmark = document.getElementById("checkmark");
     if (checkmark) {
         checkmark.classList.add("hidden");
         checkmark.classList.remove("show");
     }
     
     // Reset all X icons
     const xIcons = document.querySelectorAll('.x-icon');
     xIcons.forEach(icon => {
         icon.classList.add("hidden");
         icon.classList.remove("show");
     });
     
     // Reset wrong attempts counter
     wrongAttempts = 0;
}


// Expose functions globally for use in other scripts
window.updateEmojiDisplay = updateEmojiDisplay;
window.updateScoreDisplay = updateScoreDisplay;
window.clearUserInput = clearUserInput;
window.showCheckmark = showCheckmark;
window.showWrongAttempt = showWrongAttempt;
window.resetFeedback = resetFeedback;