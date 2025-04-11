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
      showToast("Game Over! Too many incorrect guesses.");
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

let isAnimating = true; // Controls whether emojis are animating

//Background Emoji Animation
const emojis = ["😀", "😂", "😍", "🥳", "😎", "🤖", "👻", "🎉", "🌟", "🍕", "❤️", "🔥", "🎉"];
const animationDuration = 3000; // Duration of the animation in milliseconds

function createEmoji() {
    if (!isAnimating) return; // Stop creating emojis if animation is disabled

    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Set random position at the bottom of the screen
    const randomX = Math.random() * window.innerWidth;
    emoji.style.left = `${randomX}px`;
    emoji.style.bottom = "0px";
    
    document.body.appendChild(emoji);
    
    // Start the animation
    requestAnimationFrame(() => animateEmoji(emoji));
}

function animateEmoji(emoji) {
    const startTime = performance.now();
    
    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Move the emoji upwards
        emoji.style.bottom = `${progress * 100}px`;
        emoji.style.opacity = `${1 - progress}`; // Fade out
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Remove the emoji from the DOM after animation
            emoji.remove();
        }
    }
    
    requestAnimationFrame(animate);
}

// Create emojis at intervals
setInterval(createEmoji, 500); // Create a new emoji every 500 milliseconds

function startEmojiAnimation() {
    isAnimating = true;
}

function stopEmojiAnimation() {
    isAnimating = false;
}


// background stars background animation
const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 6;

const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

let scale = 1,
    width,
    height;

let stars = [];

generate();
resize();
step();

window.onresize = resize;

function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
    });
  }
}

function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
}

function recycleStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE;
}

function resize() {
  scale = window.devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvas.width = width;
  canvas.height = height;
  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);
  update();
  render();
  requestAnimationFrame(step);
}

function update() {
  stars.forEach((star) => {
    // Move the stars toward the viewer
    star.z -= 0.0010;

    if (star.z <= 0) {
    star.z = 1; // Reset the depth to the farthest point
    }
  });
}

function render() {
  stars.forEach((star) => {
    const x = (star.x - width / 2) * (1 / star.z) + width / 2;
    const y = (star.y - height / 2) * (1 / star.z) + height / 2;
    const size = STAR_SIZE * star.z * scale;

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = size;
    context.globalAlpha = 0.8;
    context.strokeStyle = STAR_COLOR;

    context.moveTo(x, y);
    context.lineTo(x, y + size);
    context.stroke();
  });
}




// Expose functions globally for use in other scripts
window.updateEmojiDisplay = updateEmojiDisplay;
window.updateScoreDisplay = updateScoreDisplay;
window.clearUserInput = clearUserInput;
window.showCheckmark = showCheckmark;
window.showWrongAttempt = showWrongAttempt;
window.resetFeedback = resetFeedback;