/**
 * Feedback Script
 * 
 * Handles:
 * - Feedback form submission
 * - Saving feedback to Firestore
 * - Returning to the menu screen after submission
 */

function submitFeedback(message, score, category) {
    if (!firebase || !firebase.firestore) return;

    const db = firebase.firestore();
    db.collection("feedback").add({
        name: window.username,
        category: category,
        score: score,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Thank you for your feedback!");
        document.getElementById("feedback-input").value = "";
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
            if (feedbackText) {
                submitFeedback(feedbackText, score, currentCategory);
            } else {
                alert("Please write something before submitting.");
            }
        });
    }
});
