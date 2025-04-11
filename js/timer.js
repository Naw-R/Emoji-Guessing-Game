/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - startTimer(): Starts the countdown timer and updates the UI.
 *   - resetTimer(): Resets and restarts the countdown timer for a new round.
 *   - stopTimer(): Stops the timer when the game ends or player exits.
 * 
 * This file ensures smooth game progression by managing time-based mechanics.
 */

let timeLeft = 30;
let timerInterval;

// Function to start the countdown timer
function startTimer() {
    console.log("Timer started!"); // Debug log
    timeLeft = 30; // Reset timer to 30 seconds
    document.getElementById("game-time").innerText = timeLeft; // Update UI display

    timerInterval = setInterval(() => {
        timeLeft--; // Decrease time by 1 second
        document.getElementById("game-time").innerText = timeLeft; // Update UI
        console.log(`Timer ticking: ${timeLeft}s left`); // Debug log

        // If time reaches zero, end round and move to feedback state
        if (timeLeft === 0) {
            clearInterval(timerInterval); // Stop timer
            console.warn("Time's up! Moving to next round."); // Debug log
            showToast(`Time's up! The correct answer was: ${currentEmoji.title}`); // Alert player
            switchState(states.FEEDBACK); // Transition to feedback screen
        }
    }, 1000); // Runs every second
}

// Reset Timer when starting a new round
function resetTimer() {
    console.log("Resetting timer..."); // Debug log
    clearInterval(timerInterval); // Stop current timer
    startTimer(); // Restart timer from 30s
}

// Stop the timer when the player loses or exits
function stopTimer() {
    console.log("Stopping timer..."); // Debug log
    clearInterval(timerInterval); // Prevents further countdown
}

// Expose timer functions globally for use in other scripts
window.startTimer = startTimer;
window.resetTimer = resetTimer;
window.stopTimer = stopTimer;
