/**
 * Feedback Script
 * Author: Maia and Rowan
 * 
 * Handles:
 * - Feedback form submission
 * - Saving feedback to Firestore
 * - Returning to the menu screen after submission
 * - Client-side reCAPTCHA validation
 * 
 * Uses:
 * Firebase Firestore
 * grecaptcha
 * showToast()
 * switchState()
 */

/**
 * Submits feedback to the Firestore database
 * @param {string} message - The feedback message from the user
 * @param {number} score - The score associated with the feedback
 * @param {string} category - The emoji category being rated
 */

function submitFeedback(message, score, category) {
    if (!firebase || !firebase.firestore) return;
    
    const db = firebase.firestore();
    db.collection("feedback").add({ // Add feedback entry to the "feedback" collection
        name: window.username || "Anonymous", // Use stored username or default to Anonymous
        category: category || "Unknown",
        score: score || 0,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Server time for accurate logging
    }).then(() => { 
        showToast("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
        grecaptcha.reset(); // Reset reCAPTCHA for next time
        switchState("menu"); // Return to main menu
    }).catch(error => {
        console.error("Error submitting feedback:", error);
        showToast("There was a problem submitting your feedback.");
    });
}

/**
 * Sets up feedback button listener after the page has loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit-feedback-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const feedbackText = document.getElementById("feedback-input").value.trim();
            const token = grecaptcha.getResponse(); // reCAPTCHA tokeng

            if (!feedbackText) {
                showToast("Please write something before submitting.");
                return;
            }

            if (!token) {
                showToast("Please complete the reCAPTCHA.");
                return;
            }

            // Submit directly to Firestore (without backend verification)
            submitFeedback(feedbackText, score, currentCategory);
        });
    }
});
