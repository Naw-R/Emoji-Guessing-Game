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
 */

//global variables
let score = 0;
let currentEmoji = null;
let hintUsed = 0; // Track the number of hints the user has used
let incorrectGuesses = 0; // Track incorrect guesses

// Function to load the selected category
function loadCategory(category) {
    console.log(`loadCategory() called with category: ${category}`); // Debug log

    window.currentCategory = category; // Store selected category globally
    document.getElementById("selected-category").innerText = category; // Update UI

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

    incorrectGuesses = 0; // Reset incorrect guess counter
    currentEmoji = getRandomEmoji(window.currentCategory); // Get a random emoji

    if (!currentEmoji) {
        console.error("Error: Could not get emoji from database");
        return; // Exit function if no emoji is found
    }

    console.log(`Selected emoji: ${currentEmoji.emoji} (${currentEmoji.title})`); // Debug log

    currentEmoji.hints = currentEmoji.hints || []; // Ensure hints array exists
    hintUsed = 0; // Reset hint counter

    // Update UI
    updateEmojiDisplay(currentEmoji.emoji);
    updateScoreDisplay();
    clearUserInput();
    
    resetTimer(); // Restart the timer

    document.getElementById("user-input").focus(); // Auto-focus input field
}

// Function to handle user guess submission
function handleGuess() {
    const userGuess = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = currentEmoji.title.toLowerCase();
    
    console.log(`User guessed: "${userGuess}". Correct answer: "${correctAnswer}"`); // Debug log
    
    if (userGuess === correctAnswer) {
        score += 10; // Increase score for correct answer
        updateScoreDisplay();
        alert("Correct! 🎉 +10 points");
        startGame(); // Start next round
    } else {
        incorrectGuesses++; // Track wrong answers
        
        if (score > 0) {
            score -= 2; // Deduct 2 points for incorrect guess (if score > 0)
        }

        updateScoreDisplay();

        if (incorrectGuesses >= 3) {
            alert(`Game Over! Final Score: ${score}`);
            clearInterval(timerInterval); // Stop timer before switching state
            switchState(states.FEEDBACK); // Move to feedback screen
            return; // Prevent further execution
        } else {
            alert(`Try again! You've made ${incorrectGuesses} incorrect guesses.`);
            clearUserInput();
        }
    }
}

// Function to provide hints
function showHint() {
    const hint = currentEmoji.hint;

    if (hintUsed < hint.length) {
        // Deduct points based on hint number
        if (hintUsed === 0) {
            score -= 1; // First hint costs 1 point
        } else if (hintUsed === 1) {
            score -= 3; // Second hint costs 3 points
        } else if (hintUsed === 2) {
            score -= 5; // Third hint costs 5 points
        }

        updateScoreDisplay();
        score = Math.max(score, 0); // Ensure score doesn't drop below 0

        alert(`Hint ${hintUsed + 1}: ${hint[hintUsed]}`); // Show hint
        hintUsed++; // Increment hint counter
    } else {
        alert("No more hints available for this emoji.");
    }
}

// Event listeners for category selection
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

// Attach event listeners for game buttons
document.getElementById("submit-btn").addEventListener("click", handleGuess);
document.getElementById("hint-btn").addEventListener("click", showHint);

// Support Enter key for guessing
document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Expose functions globally for external use
window.startGame = startGame;
window.score = score;