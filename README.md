# Emoji Guessing Game

**Final Project – CART 263**  
**By Rowan Nasser & Maia Arrais Mateo**
[**View this project online**](https://naw-r.github.io/Emoji-Guessing-Game/)

An interactive browser-based guessing game built with JavaScript, HTML, and CSS, featuring Firebase and Google ReCaptcha integration. Players are given emoji clues and must guess the correct phrase (e.g., movie title, brand, book, etc.) before time runs out. This game is structured into modular JavaScript files, each responsible for a different part of the experience:

- `database.js` : Stores emoji data.
- `emojiManager.js`: Manages emoji selection logic and prevents repeats within each category.
- `feedback.js`: Manages feedback form submission and stores messages in Firestore.
- `firebaseInit.js`: Initializes the Firebase configuration for Firestore and analytics.
- `gameLogic.js`: Controls the main gameplay loop including round management, guesses, scoring, and hint behavior.
- `script.js`: Controls global setup, state transitions, user login, and leaderboard integration.
- `stateManager.js`: Switches between the four game states (Menu, Lobby, Game, Feedback) and controls screen visibility.
- `timer.js`: Implements the countdown timer functionality.
- `ui.js`: Handles user interface updates such as rendering emojis, updating score and hint bubbles, and animating feedback visuals.
- `style.css`: Provides visual styling, layout, animations, and responsive design.
- `index.html`: Hosts the full structure of the game including all UI states and reCAPTCHA integration.

This modular approach helped maintain clarity, reusability, and collaborative development throughout the project.

---

## Artist's Statement

The **Emoji Guessing Game** was created to explore how symbolic language — specifically emojis — can serve as an accessible, engaging entry point into gameplay. Our vision was to design a light and enjoyable game where players test their cultural knowledge through intuitive interactions.

We aimed to recreate the casual fun of a party game or trivia night, framed within a clean, responsive web interface. The desired user experience was immediate: type, react, guess — with feedback provided in real time through hints, animations, and timers. Every detail, from the floating emoji animations to the responsive feedback bubbles, was developed to emphasize quick thinking, recognition, and playfulness.

Technically, we emphasized modularity and clarity. Each function — guessing logic, scoring, timer, hint tracking, feedback — is isolated for readability and collaboration. Firebase integration allowed us to store scores and player feedback. Canvas and DOM manipulation made the visuals feel dynamic and expressive. ReCaptcha allowed us to keep our game safe from bots feedbacks ensuring to receive real feedback from players to improve our game. Artistically, we used emojis not just as decoration, but as core communicative elements — a visual puzzle built with symbols.

This project is a blend of functionality and creativity: a game that is both technically grounded and artistically expressive.

---

## Coherent Artistic Direction

The entire project is built around a single, strong concept: guessing common phrases from emoji clues. Everything from the game structure and UI to the choice of animation and interactivity supports this central idea.

- The categories (Movies, Books, Brands, etc.) give thematic clarity and coherence.
- The hints and feedback systems enhance accessibility while maintaining the playful tone.
- The interface is deliberately minimal and colorful, letting the emoji take visual focus.

While the game does not push a narrative message, it fully embodies its theme and consistently expresses its identity.

---

## Interactivity

This project is fully interactive:

- Selectable emoji categories.
- Emoji clues rendered on screen.
- Live player input tracked via keyboard.
- Hint system with limited usage.
- Maximum amount of 3 guesses.
- Instant feedback after every guess with wrong or correct emoji on screen.
- 30-second countdown timer per round.
- Floating emoji animation and starfield background.
- Feedback submission form (protected by reCAPTCHA).
- Firebase-powered leaderboard.

All interactivity is real-time, DOM-based, and optimized for fluid gameplay.

---

## Course Material

This project showcases the application of various concepts and skills from CART 263, including:

- **HTML/CSS**: Structuring and styling the game.
- **JavaScript (Vanilla)**: Core game logic and interactivity.
- **DOM manipulation**: Dynamically updating game content.
- **Events and Callbacks**: Handling user interaction.
- **Arrays and Loops**: Managing emoji data and game rounds.
- **Objects and Object Constructors**: Organizing game data and UI elements.
- **Canvas API**: Creating animated background elements.
- **Timers (`setInterval`)**: Controlling game timing.
- **Dynamic element creation**: Rendering stars, emojis, and feedback bubbles.

All of the above concepts were introduced or reinforced through course labs and lectures.

---

## Attribution

- Emoji Data Source: [Kaggle Datasets](https://www.kaggle.com/datasets)
- Firebase Documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
- reCAPTCHA Integration Guide: [Google Developer Docs](https://developers.google.com/recaptcha)
- CSS Patterns & Modals: [W3Schools](https://www.w3schools.com), [MDN Web Docs](https://developer.mozilla.org)

All reused code is clearly marked in the source files. Assets are used under Creative Commons or equivalent free-use licenses.

---

© 2025 – Rowan Nasser & Maia Arrais Mateo
