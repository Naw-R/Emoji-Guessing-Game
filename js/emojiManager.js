/**
 * emojiManager.js
 * ----------------
 * Manages emoji selection logic for the Emoji Word Guessing Game.
 *  
 * Handles:
 * - Tracking used emojis to avoid repetition within each category
 * - Selecting a random unused emoji from the specified category
 * - Resetting emoji usage when all have been shown
 * 
 * Functions:
 * - getRandomEmoji(category): Returns a random emoji from a category without repeating until all are used.
 * 
 * Uses:
 * - emojiDatabase global object (assumed to be preloaded)
 * - JavaScript Set to track used emoji titles
 * 
 * Exposes:
 * - window.getRandomEmoji
 */

// Object to track used emojis for each category
const usedEmojis = {};

// Function to get a random emoji from a specific category without repeating
/**
 * getRandomEmoji(category)
 * Selects a random emoji from a given category that hasn't been used yet.
 * If all emojis have been used, resets the set and retries.
 */
function getRandomEmoji(category) {
    console.log(`Getting random emoji from category: ${category}`); // Debug log
    
    // Initialize the used set for this category if it doesn't exist
    if (!usedEmojis[category]) {
        usedEmojis[category] = new Set();
    }

    // Get the list of available emojis in the category
    // Filter out emojis that have already been used
    const availableEmojis = emojiDatabase[category].filter(emoji => 
        !usedEmojis[category].has(emoji.title) // Ensure it's not used yet
    );

    // If all emojis have been used, reset the tracking set and retry
    if (availableEmojis.length === 0) {
        console.warn(`All emojis in category "${category}" have been used. Resetting...`);
        usedEmojis[category].clear();
        return getRandomEmoji(category); // Recursively call to start fresh
    }

    // Pick a random emoji from the available ones
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    const selectedEmoji = availableEmojis[randomIndex];

    // Mark the emoji as used
    usedEmojis[category].add(selectedEmoji.title);

    console.log(`Selected emoji: ${selectedEmoji.emoji} (${selectedEmoji.title})`); // Debug log
    return selectedEmoji;
}

// Expose functions and data globally
window.getRandomEmoji = getRandomEmoji;
