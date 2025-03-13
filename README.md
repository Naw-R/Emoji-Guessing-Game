# **Emoji Guessing Game**

**Author**: Rowan Nasser and Maia Arrais Mateo  
[**View this project online**](https://naw-r.github.io/CART-263/Projects/code/)

---

## **Description**
The Emoji Guessing Game challenges players to guess a phrase (e.g., a book title, movie title, etc.) based on an emoji clue. Players type their guesses into an input field, receiving real-time feedback on their progress.

---

## **Objective**
The goal is to correctly guess the hidden phrase using the provided emoji clue. Players can type their guesses into the input field, and the game provides hints and visual feedback to assist them.

---

## **Game Setup and Rules**

### **1. Selecting a Theme**
- Players select a theme (e.g., Movie Titles, Book Titles, Brands, Countries, etc.).
- A random word/phrase is chosen from the selected theme.
- Words/phrases already used in the session will not repeat until all words in the theme have been played.

### **2. Game Display**
- **Emoji Clue**: An emoji representation of the phrase is displayed at the top of the screen.
- **Word Structure**:
  - Squares representing the number of letters in the phrase are displayed.
  - Visual gaps indicate spaces between words in multi-word phrases.
  - Correctly guessed letters appear in their respective squares in green.
- **Timer**: A countdown timer can be activated for a challenge mode.

### **3. Input and Feedback**
- Players type their guesses using the input field.
- **Real-Time Feedback**:
  - Correctly guessed letters immediately appear in their corresponding slots, turning **green**.
  - Incorrect letters are ignored, and no penalties are applied.

### **4. Hints**
- A hint button provides additional clues.
- Players have a limited number of hints per round.

### **5. Win Condition**
- Players win the round if they guess the entire phrase before the timer expires (if active).
- A success message is displayed, and the game transitions to the next word.

### **6. Lose Condition**
- If the timer runs out, the correct phrase is revealed to the player.
- A failure message is displayed, and the game transitions to the next word.

### **7. Player's Feedback**
- Players can submit feedback about the emoji set to help improve the game.

---

## **Technologies Used**
- **JavaScript & JSON**: Game logic, emoji database, and user interactions.
- **HTML & CSS**: Structuring and styling the game interface.
- **DOM Manipulation**: Dynamic updates based on user input.

---

## **Time Implication**
- **If I had more time I would:**
  - TBD

---

## **Credits**
This project was built using the following tools and resources:
- [PixaBay](https://pixabay.com) for sound effects.
- [Kaggle](https://www.kaggle.com/datasets) for database.

---

## **Attribution**
Special thanks to all contributing resources and tutorials that supported the development of this project.
