/**
 * Emoji Manager
 * Author: Rowan and Maia 
 * 
 * Manages the selection of emojis from different categories, 
 * ensuring that each emoji is only shown once before the list resets. 
 * 
 * Functions:
 * - getRandomEmoji(): returns a random, non-repeating emoji from a category
 *    
 * Uses:
 * emojiDatabase (assumed global)
 *   
 * Exposed to:
 * window.getRandomEmoji
 */


// Object to track used emojis for each category
const usedEmojis = {};

/**
 * Returns a random emoji from the given category, avoiding repetition
 * until all options have been used, then resets.
 */
function getRandomEmoji(category) {
    console.log(`Getting random emoji from category: ${category}`); // Debug log
    
    // Initialize usedEmojis tracking for the category if it doesn't exist
    if (!usedEmojis[category]) {
        usedEmojis[category] = new Set();
    }

    // Get the list of available emojis in the category
    const availableEmojis = emojiDatabase[category].filter(emoji => 
        !usedEmojis[category].has(emoji.title) // Ensure it's not used yet
    );

    // If all emojis have been used, reset the used set to allow reuse
    if (availableEmojis.length === 0) {
        console.warn(`All emojis in category "${category}" have been used. Resetting...`);
        usedEmojis[category].clear();
        return getRandomEmoji(category); // Recursively call to start fresh
    }

    // Select a random index from the available emojis
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    const selectedEmoji = availableEmojis[randomIndex];

    // Mark the selected emoji as used
    usedEmojis[category].add(selectedEmoji.title);

    console.log(`Selected emoji: ${selectedEmoji.emoji} (${selectedEmoji.title})`); // Debug log
    return selectedEmoji;
}

// Expose functions and data globally
window.getRandomEmoji = getRandomEmoji;
