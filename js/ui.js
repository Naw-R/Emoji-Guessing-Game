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

/**
 * Function to update the emoji display on screen
 * Updates the displayed emoji in the UI.
 */
function updateEmojiDisplay(emoji) {
    console.log(`Updating emoji display: ${emoji}`); // Debug log
    document.getElementById("emoji-display").innerText = emoji; // Show current emoji
}

/**
 * Function to update the score display
 * Updates the score display in the UI with the current score.
 */
function updateScoreDisplay() {
    console.log(`Updating score display: ${score}`); // Debug log
    document.getElementById("game-score").innerText = score; // Update score in UI
}

/**
 * Function to clear the user input field
 * Clears the user input field in the UI.
 */
function clearUserInput() {
    console.log("Clearing user input field."); // Debug log
    document.getElementById("user-input").value = ""; // Reset input field
}

let wrongAttempts = 0; // Counter for wrong attempts

/**
 * Function to show a checkmark for correct attempts
 * Displays a checkmark on the screen for correct guesses.
 */
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

    // Hide the checkmark after a delay
    setTimeout(() => {
        check.classList.remove("show");
        check.classList.add("hidden");
    }, 1500);
}

/**
 * Function to show X for wrong attempts
 * Increments the wrong attempt counter and displays an X icon for each wrong attempt.
 */
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
 
/**
 * Function to reset feedback visuals
 * Resets the checkmark and all X icons, and the wrong attempts counter.
 */
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

/**
 * Function to show a hint bubble
 * Displays a hint bubble with the provided text.
 */
function showHintBubble(text) {
  const bubble = document.getElementById("hint-bubble");
  if (!bubble) return;

  bubble.textContent = text;
  bubble.classList.add("show");
  bubble.classList.remove("hidden");

  // Hide the hint bubble after a delay
  setTimeout(() => {
    bubble.classList.remove("show");
    bubble.classList.add("hidden");
  }, 3000);
}

let isAnimating = true; // Controls whether emojis are animating

// Background Emoji Animation
const emojis = ["😀", "😂", "😍", "🥳", "😎", "🤖", "👻", "🎉", "🌟", "🍕", "❤️", "🔥", "🎉"];
const animationDuration = 3000; // Duration of the animation in milliseconds

/**
 * Function to create a new emoji
 * Creates a new emoji element and starts its animation.
 */
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

/**
 * Function to animate the emoji
 * Animates the emoji moving upwards and fading out.
 */
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

/**
 * Function to start emoji animation
 * Enables emoji animation.
 */
function startEmojiAnimation() {
    isAnimating = true;
}

/**
 * Function to stop emoji animation
 * Disables emoji animation.
 */
function stopEmojiAnimation() {
    isAnimating = false;
}

// Background stars animation setup
const STAR_COLOR = '#fff'; // Color of the stars
const STAR_SIZE = 3; // Size of the stars
const STAR_MIN_SCALE = 0.2; // Minimum scale of the stars
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 6; // Number of stars based on window size

const canvas = document.querySelector('canvas'), // Select the canvas element
      context = canvas.getContext('2d'); // Get 2D drawing context

let scale = 1, // Scale factor for the canvas
    width, // Width of the canvas
    height; // Height of the canvas

let stars = []; // Array to hold star objects

// Initialize the star field
generate();
resize();
step(); // Start the animation loop

window.onresize = resize; // Adjust canvas on window resize

/**
 * Function to generate stars
 * Creates star objects and adds them to the stars array.
 */
function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE) // Random depth for the star
    });
  }
}

/**
 * Function to place a star at a random location canvas.
 */
function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE); // Random depth for the star
}

/**
 * Function to recycle a star when it goes out of view
 * Resets the star to a random position and depth.
 */
function recycleStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE; // Reset depth to minimum
}

/**
 * Function to resize the canvas
 * Adjusts the canvas size and repositions stars based on the new dimensions.
 */
function resize() {
  scale = window.devicePixelRatio || 1; // Get the scale factor
  width = window.innerWidth * scale; // Set width based on window size
  height = window.innerHeight * scale; // Set height based on window size
  canvas.width = width; // Set canvas width
  canvas.height = height; // Set canvas height
  stars.forEach(placeStar); // Place stars in new positions
}

/**
 * Function to animate the stars
 * Clears the canvas, updates star positions, and renders them.
 */
function step() {
  context.clearRect(0, 0, width, height); // Clear the canvas
  update(); // Update star positions
  render(); // Render stars
  requestAnimationFrame(step); // Loop the animation
}

/**
 * Function to update star positions
 * Updates the depth of each star to create a zooming effect.
 */
function update() {
  stars.forEach((star) => {
    // Move the stars toward the viewer
    star.z -= 0.0010;

    if (star.z <= 0) {
      star.z = 1; // Reset the depth to the farthest point
    }
  });
}

/**
 * Function to render stars on the canvas
 * Draws the stars on the canvas based on their current positions and depths.
 */
function render() {
  stars.forEach((star) => {
    const x = (star.x - width / 2) * (1 / star.z) + width / 2; // Calculate x position
    const y = (star.y - height / 2) * (1 / star.z) + height / 2; // Calculate y position
    const size = STAR_SIZE * star.z * scale; // Calculate size based on depth

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = size; // Set line width based on size
    context.globalAlpha = 0.8; // Set opacity
    context.strokeStyle = STAR_COLOR; // Set color

    context.moveTo(x, y); // Move to star position
    context.lineTo(x, y + size); // Draw line for star
    context.stroke(); // Render the star
  });
}

// Expose functions globally for use in other scripts
window.updateEmojiDisplay = updateEmojiDisplay;
window.updateScoreDisplay = updateScoreDisplay;
window.clearUserInput = clearUserInput;
window.showCheckmark = showCheckmark;
window.showWrongAttempt = showWrongAttempt;
window.resetFeedback = resetFeedback;
window.showHintBubble = showHintBubble;