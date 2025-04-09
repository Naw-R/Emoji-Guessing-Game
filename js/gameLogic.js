/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - loadCategory(category): Loads and sets the selected emoji category, then transitions to the Lobby state.
 *   - startGame(): Initializes a new round, selects a random emoji, and resets necessary states.
 *   - handleGuess(): Processes user input, updates the score, and determines game progression.
 *   - showHint(): Provides hints while deducting points based on hint usage.
 * 
 * This file ensures smooth gameplay mechanics by handling game logic dynamically.
 * 
 * Key Variables:
 *   - score: Tracks the player's current score.
 *   - currentEmoji: Holds the emoji object currently being guessed.
 *   - hintUsed: Counts the number of hints the player has used.
 *   - incorrectGuesses: Counts the number of incorrect guesses made by the player.
 */

//global variables
let score = 0; // Initialize score to 0
let currentEmoji = null; // Current emoji object for the round
let hintUsed = 0; // Track the number of hints the user has used
let incorrectGuesses = 0; // Track incorrect guesses

// Function to load the selected category
function loadCategory(category) {
    console.log(`loadCategory() called with category: ${category}`); // Debug log

    window.currentCategory = category; // Store selected category globally
    document.getElementById("selected-category").innerText = category; // Update UI to reflect selected category

    console.log(`currentCategory is now set to: ${window.currentCategory}`); // Debug log

    // Ensure state switching function exists
    if (typeof switchState === "function") {
        console.log("Switching state to LOBBY..."); // Debug log
        switchState(states.LOBBY); // Move to Lobby screen
    } else {
        console.error("Error: switchState() is not available."); // Debug log error if missing
    }
}

// Function to start a new game round
function startGame() {
    console.log("Starting new game round"); // Debug log

    resetFeedback(); // ✅ Reset all feedback animations/icons

    incorrectGuesses = 0; // Reset incorrect guess counter for the new round
    currentEmoji = getRandomEmoji(window.currentCategory); // Get a random emoji from the selected category

    if (!currentEmoji) {
        console.error("Error: Could not get emoji from database"); // Log error if emoji retrieval fails
        return; // Exit function if no emoji is found
    }

    console.log(`Selected emoji: ${currentEmoji.emoji} (${currentEmoji.title})`); // Debug log the selected emoji

    currentEmoji.hints = currentEmoji.hints || []; // Ensure hints array exists for the current emoji
    hintUsed = 0; // Reset hint counter for the new round

    // Update UI with the selected emoji and reset score display
    updateEmojiDisplay(currentEmoji.emoji);
    updateScoreDisplay();
    clearUserInput();
    
    resetTimer(); // Restart the timer for the new round

    document.getElementById("user-input").focus(); // Auto-focus input field for user input
}

// Function to handle user guess submission
function handleGuess() {
    const userGuess = document.getElementById("user-input").value.trim().toLowerCase(); // Get and format user input
    const correctAnswer = currentEmoji.title.toLowerCase(); // Get the correct answer in lowercase
    
    console.log(`User guessed: "${userGuess}". Correct answer: "${correctAnswer}"`); // Debug log user guess and correct answer
    
    if (userGuess === correctAnswer) { // Check if the user's guess is correct
        showCheckmark(); // ✅ Animation for correct answer
        score += 10; // Increase score by 10 for a correct answer
        updateScoreDisplay(); // Update the score display
        // Show the checkmark
        document.getElementById('checkmark').classList.add('show');

        // Wait for animation to complete before moving to next screen
        setTimeout(() => {
            document.getElementById('checkmark').classList.remove('show');
            startGame(); // Start the next round
        }, 1500); // Adjust timing as needed
    } else {
        showWrongAttempt(); // Show X mark for wrong attempt
        incorrectGuesses++; // Increment the count of incorrect guesses
        
        if (score > 0) {
            score -= 2; // Deduct 2 points for an incorrect guess (if score > 0)
        }

        updateScoreDisplay(); // Update score display after deduction

        if (incorrectGuesses >= 3) { // Check if the user has made 3 incorrect guesses
            alert(`Game Over! Final Score: ${score}`); // Notify user of game over
            submitScore(score); // Submit the final score
            clearInterval(timerInterval); // Stop the timer before switching state
            switchState(states.FEEDBACK); // Move to feedback screen
            return; // Prevent further execution
        } else {
            // alert(`Try again! You've made ${incorrectGuesses} incorrect guesses.`); // Prompt user to try again
            clearUserInput(); // Clear user input for the next guess
        }
    }
}

// Function to provide hints
function showHint() {
    const hint = currentEmoji.hints; // Get hints for the current emoji

    if (hintUsed < hint.length) { // Check if there are hints available
        // Deduct points based on hint number
        if (hintUsed === 0) {
            score -= 1; // First hint costs 1 point
        } else if (hintUsed === 1) {
            score -= 3; // Second hint costs 3 points
        } else if (hintUsed === 2) {
            score -= 5; // Third hint costs 5 points
        }

        updateScoreDisplay(); // Update score display after deduction
        score = Math.max(score, 0); // Ensure score doesn't drop below 0

        alert(`Hint ${hintUsed + 1}: ${hint[hintUsed]}`); // Show the current hint to the user
        hintUsed++; // Increment hint counter
    } else {
        alert("No more hints available for this emoji."); // Notify user if no hints are left
    }
}

// Event listeners for category selection
document.addEventListener("DOMContentLoaded", () => {
    console.log("Document fully loaded. Adding event listeners to category buttons."); // Debug log

    document.querySelectorAll(".category-btn").forEach(button => { // Select all category buttons
        console.log(`Adding event listener to button: ${button.innerText}`); // Debug log for each button
        button.addEventListener("click", () => { // Add click event listener to each button
            console.log(`Category button clicked: ${button.getAttribute("data-category")}`); // Debug log for clicked category
            loadCategory(button.getAttribute("data-category")); // Load the selected category
        });
    });
});

// Attach event listeners for game buttons
document.getElementById("submit-btn").addEventListener("click", handleGuess); // Listen for guess submissions
document.getElementById("hint-btn").addEventListener("click", showHint); // Listen for hint requests

// Support Enter key for guessing
document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Check if Enter key is pressed
        handleGuess(); // Call handleGuess function
    }
});

// Expose functions globally for external use
window.startGame = startGame; // Make startGame function available globally
window.score = score; // Make score variable available globally