/**
 * feedback.js
 * ------------
 * Manages the feedback functionality in the Emoji Word Guessing Game.
 * 
 * Handles:
 * - Feedback form submission via DOM interaction
 * - reCAPTCHA client-side validation
 * - Storing feedback in Firestore
 * - Redirecting the user back to the menu after submission
 * 
 * Uses:
 * - Firebase Firestore
 * - grecaptcha for client-side bot verification
 * - DOM event listeners
 */

/**
 * submitFeedback(message, score, category)
 * Saves user feedback to Firestore with name, score, message, and timestamp.
 * Displays a toast and resets the form upon success, or shows error message on failure.
 */
function submitFeedback(message, score, category) {

    if (!firebase || !firebase.firestore) return;

    const db = firebase.firestore();
    db.collection("feedback").add({
        name: window.username || "Anonymous",
        category: category || "Unknown",
        score: score || 0,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        showToast("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
        grecaptcha.reset(); // Reset reCAPTCHA for next time
        switchState("menu");
    }).catch(error => {
        console.error("Error submitting feedback:", error);
        showToast("There was a problem submitting your feedback.");
    });
}

/**
 * Sets up the event listener for the feedback form submit button.
 * Validates input and reCAPTCHA before submitting to Firestore.
 */
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit-feedback-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const feedbackText = document.getElementById("feedback-input").value.trim();
            const token = grecaptcha.getResponse(); // reCAPTCHA token

            if (!feedbackText) {
                showToast("Please write something before submitting.");
                return;
            }

            if (!token) {
                showToast("Please complete the reCAPTCHA.");
                return;
            }

            // Submit directly to Firestore
            submitFeedback(feedbackText, score, currentCategory);
        });
    }
});
