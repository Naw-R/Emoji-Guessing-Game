/**
 * Feedback Script
 * 
 * Handles:
 * - Feedback form submission
 * - Saving feedback to Firestore
 * - Returning to the menu screen after submission
 * - reCAPTCHA check (client-only)
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
        alert("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
        grecaptcha.reset(); // Reset reCAPTCHA for next time
        switchState("menu");
    }).catch(error => {
        console.error("Error submitting feedback:", error);
        alert("There was a problem submitting your feedback.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit-feedback-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const feedbackText = document.getElementById("feedback-input").value.trim();
            const token = grecaptcha.getResponse(); // reCAPTCHA tokeng

            if (!feedbackText) {
                alert("Please write something before submitting.");
                return;
            }

            if (!token) {
                alert("Please complete the reCAPTCHA.");
                return;
            }

            // Submit directly to Firestore (without backend verification)
            submitFeedback(feedbackText, score, currentCategory);
        });
    }
});
