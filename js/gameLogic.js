// gameLogic.js - Manages game mechanics

//global variables
let score = 0;
let currentEmoji = null;
let hintUsed = 0; //track the number of hints the user has used
let incorrectGuesses = 0; // Track incorrect guesses

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


// Function to start a new game round
function startGame() {
    
    console.log("Starting new game round"); // Debug log

    // Reset the number of incorrect guesses
    incorrectGuesses = 0;
    
    // Get a random emoji from the current category
    currentEmoji = getRandomEmoji(window.currentCategory);
    
    if (!currentEmoji) {
        console.error("Error: Could not get emoji from database");
        return;
    }

    console.log(`Selected emoji: ${currentEmoji.emoji} (${currentEmoji.title})`); // Debug log

    //currentEmoji.hints is an array
    currentEmoji.hints = currentEmoji.hints || [];

    // Reset the hint counter each round
    hintUsed = 0;
    
    // Update the display
    updateEmojiDisplay(currentEmoji.emoji);
    updateScoreDisplay();
    clearUserInput();
    
    // Reset the timer
    resetTimer();
    
    // Set focus on the input field
    document.getElementById("user-input").focus();
}


// Function to handle user guess submission
function handleGuess() {
    const userGuess = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = currentEmoji.title.toLowerCase();
    
    console.log(`User guessed: "${userGuess}". Correct answer: "${correctAnswer}"`); // Debug log
    
    if (userGuess === correctAnswer) {
        // Correct answer
        score += 10;
        updateScoreDisplay();
        alert("Correct! 🎉 +10 points");
        startGame(); // Move to next round
    } else {
        //wrong answer 
        incorrectGuesses++;
        if (score > 0) {
            score -= 2;  // Subtract 2 points for incorrect guess, but only if score is greater than 0
        }
        updateScoreDisplay();
        if (incorrectGuesses >= 3) {
            alert(`Game Over! Final Score: ${score}`);
            clearInterval(timerInterval); // Stop the timer before switching
            switchState(states.FEEDBACK); // Move to feedback screen
            return; // Exit function early to prevent new rounds from starting
        } else {
            alert(`Try again! You've made ${incorrectGuesses} incorrect guesses.`);
            clearUserInput();
        }
    }
}

// Function to provide a hint
function showHint() {
    // Get the next hint from the current emoji's list of hints
    const hint = currentEmoji.hint;
    
    if (hintUsed < hint.length) {

        if (hintUsed === 0) {
            score -= 1; // First hint costs 1 point
        } else if (hintUsed === 1) {
            score -= 3; // Second hint costs 3 points
        } else if (hintUsed === 2) {
            score -= 5; // Third hint costs 5 points
        }
        updateScoreDisplay();
        // Ensure score doesn't go below 0
        score = Math.max(score, 0);

        // Show the next hint
        alert(`Hint ${hintUsed + 1}: ${hint[hintUsed]}`);
        
        // Increment the hint counter
        hintUsed++;
    } else {
        alert("No more hints available for this emoji.");
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

// Add event listeners for game buttons
document.getElementById("submit-btn").addEventListener("click", handleGuess);
document.getElementById("hint-btn").addEventListener("click", showHint);

// Add enter key support for guessing
document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Expose functions globally
window.startGame = startGame;
window.score = score;