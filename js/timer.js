// timer.js - Controls countdown and auto-ending rounds

let timeLeft = 30;
let timerInterval;

// Function to start the timer
function startTimer() {
    console.log("Timer started!"); // Debug log
    timeLeft = 30;
    document.getElementById("game-time").innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("game-time").innerText = timeLeft;
        console.log(`Timer ticking: ${timeLeft}s left`); // Debug log

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            console.warn("Time's up! Moving to next round."); // Debug log
            alert(`Time's up! The correct answer was: ${currentEmoji.title}`);
            startGame();
        }
    }, 1000);
}

// Reset Timer when starting a new round
function resetTimer() {
    console.log("Resetting timer..."); // Debug log
    clearInterval(timerInterval);
    startTimer();
}

// Expose globally for use in other scripts
window.startTimer = startTimer;
window.resetTimer = resetTimer;
