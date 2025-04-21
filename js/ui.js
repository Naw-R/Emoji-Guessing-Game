/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * Authors: Maia and Rowan
 * 
 * Functions Overview:
 * - updateEmojiDisplay(emoji): Updates the displayed emoji.
 * - updateScoreDisplay(): Displays the current score.
 * - clearUserInput(): Clears the input field.
 * - showCheckmark(): Animates the green checkmark for correct answers.
 * - showWrongAttempt(): Displays X icons and handles game over after 3 wrong tries.
 * - resetFeedback(): Resets feedback visuals (✅ and ❌).
 * - showHintBubble(text): Displays a hint bubble on screen.
 * - createEmoji(): Spawns animated emojis for background decoration.
 * - startEmojiAnimation(): Enables animated emoji generation.
 * - stopEmojiAnimation(): Disables animated emoji generation.
 * - Background starfield canvas animation (generate, update, render).
 * 
 * This file ensures smooth user interaction by updating the UI dynamically during gameplay.
 */

// ===== UI Update Functions ===== //

/**
 * Displays the current emoji on screen
 */
function updateEmojiDisplay(emoji) {
    console.log(`Updating emoji display: ${emoji}`); // Debug log
    document.getElementById("emoji-display").innerText = emoji; // Show current emoji
}

/**
 * Updates the score shown on the screen
 */
function updateScoreDisplay() {
    console.log(`Updating score display: ${score}`); // Debug log
    document.getElementById("game-score").innerText = score; // Update score in UI
}

/**
 * Clears the user input field
 */
function clearUserInput() {
    console.log("Clearing user input field."); // Debug log
    document.getElementById("user-input").value = ""; // Reset input field
    
}

// ===== Feedback Display ===== //


let wrongAttempts = 0;

/**
 * Shows a checkmark animation when the user guesses correctly
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

    setTimeout(() => {
        check.classList.remove("show");
        check.classList.add("hidden");
    }, 1500);
}


/**
 * Shows a red X for each incorrect guess and ends game after 3 mistakes
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
 * Resets feedback visuals and counters between rounds
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
 * Displays a hint bubble with given text for 3 seconds
 */
function showHintBubble(text) {
  const bubble = document.getElementById("hint-bubble");
  if (!bubble) return;

  bubble.textContent = text;
  bubble.classList.add("show");
  bubble.classList.remove("hidden");

  setTimeout(() => {
    bubble.classList.remove("show");
    bubble.classList.add("hidden");
  }, 3000);
}

// ===== Emoji Background Animation ===== //

let isAnimating = true; // Controls whether emojis are animating

//Background Emoji Animation
const emojis = ["😀", "😂", "😍", "🥳", "😎", "🤖", "👻", "🎉", "🌟", "🍕", "❤️", "🔥", "🎉"];
const animationDuration = 3000; // Duration of the animation in milliseconds

/**
 * Creates and animates a floating emoji from the bottom of the screen
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
 * Animates an emoji upward and fades it out, then removes it
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
 * Start Emoji Animation
 */
function startEmojiAnimation() {
    isAnimating = true;
}

/**
 * Stop Emoji Animation
 */
function stopEmojiAnimation() {
    isAnimating = false;
}


// ===== Star Background Animation ===== //

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

/**
 * Creates a list of stars with random positions and depth
 */
function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
    });
  }
}

/**
 * Places a star randomly within the canvas area
 */
function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
}

/**
 * Recycles a star by repositioning it to the far background
 */
function recycleStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
  star.z = STAR_MIN_SCALE;
}

/**
 * Resizes canvas to fit window and repositions stars
 */
function resize() {
  scale = window.devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvas.width = width;
  canvas.height = height;
  stars.forEach(placeStar);
}

/**
 * Animation step: updates and renders all stars
 */
function step() {
  context.clearRect(0, 0, width, height);
  update();
  render();
  requestAnimationFrame(step);
}

/**
 * Updates star positions by adjusting their depth
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
 * Renders all stars to the canvas as vertical streaks
 */
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
window.showHintBubble = showHintBubble;