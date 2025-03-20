/**
 * This file is responsible for managing the core gameplay functionality of the Emoji Word Guessing Game. 
 * It handles game state management, puzzle initialization, user interactions, and overall game flow.
 * 
 * Functions Overview:
 *   - getRandomEmoji(category): Retrieves a random emoji from the selected category without repetition.
 *   - Tracks used emojis to ensure variety before resetting.
 *   - Exposes emoji data for use in other game components.
 * 
 * This file ensures a fresh gameplay experience by dynamically managing emoji selection.
 */
const emojiDatabase = {
    "movies": [
        { emoji: "🧙‍♂️👓⚡", title: "Harry Potter", hint: ["A wizarding world", "Diagon Alley", "Harry's lightning bolt scar"] },
        { emoji: "🦁👑🌍", title: "The Lion King", hint: ["The circle of life", "Hakuna Matata", "Simba and Mufasa"] },
        { emoji: "🚢❄️💔", title: "Titanic", hint: ["A doomed voyage", "The iceberg disaster", "Jack and Rose's love story"] },
        { emoji: "👸❄️☃️", title: "Frozen", hint: ["An ice queen", "Let it go", "Elsa and Anna's bond"] },
        { emoji: "🔍🐠", title: "Finding Nemo", hint: ["A lost fish", "Just keep swimming", "Marlin and Dory's ocean adventure"] },
        { emoji: "🕷️🧔", title: "Spider-Man", hint: ["A web-slinging superhero", "With great power...", "Peter Parker"] },
        { emoji: "🤖❤️🌱", title: "WALL-E", hint: ["Post-apocalyptic Earth", "A robot cleaning the planet", "Love in the form of a plant"] },
        { emoji: "👻👻👻👨", title: "Ghostbusters", hint: ["Ghost hunting team", "Who you gonna call?", "The Stay Puft Marshmallow Man"] },
        { emoji: "🦖🏝️", title: "Jurassic Park", hint: ["Dinosaurs on the loose", "Life finds a way", "A theme park gone wrong"] },
        { emoji: "🦇👨🃏", title: "The Dark Knight", hint: ["The Joker's reign of terror", "Why so serious?", "Batman vs The Joker"] },
        { emoji: "👽🌌🚀", title: "E.T.", hint: ["An alien from another world", "Phone home", "A boy befriends a stranded alien"] },
        { emoji: "🦸‍♂️🛸", title: "Superman", hint: ["Kryptonian hero", "Faster than a speeding bullet", "Clark Kent and Lois Lane"] },
        { emoji: "🕷️🖤", title: "Venom", hint: ["Alien symbiote", "Anti-hero", "Eddie Brock's transformation"] },
        { emoji: "⚔️🏰", title: "Gladiator", hint: ["Fighting in the arena", "Revenge and honor", "Maximus Decimus Meridius"] },
        { emoji: "🔫💥", title: "Die Hard", hint: ["Christmas action movie", "Yippee-ki-yay", "Bruce Willis as John McClane"] },
        { emoji: "🌎👾", title: "The Matrix", hint: ["A simulated reality", "Red pill or blue pill?", "Neo's journey to freedom"] },
        { emoji: "🦸‍♀️💥", title: "Wonder Woman", hint: ["Amazonian warrior", "God killer", "Diana Prince"] },
        { emoji: "🦷👽", title: "Men in Black", hint: ["Alien secret agents", "The neuralyzer", "Will Smith and Tommy Lee Jones"] },
        { emoji: "🚕🚨", title: "Taxi Driver", hint: ["A New York vigilante", "Mental instability", "Robert De Niro as Travis Bickle"] },
        { emoji: "🏹🎯", title: "The Hunger Games", hint: ["Dystopian society", "The Mockingjay", "Katniss Everdeen's rebellion"] },
        { emoji: "🦇👨🃏", title: "The Dark Knight", hint: ["The Joker's reign of terror", "Why so serious?", "Batman vs The Joker"] }
    ],
    "songs": [
        { emoji: "⭐🧑‍🚀", title: "Rocket Man", hint: ["An astronaut's tale", "Elton John classic", "Flying solo in space"] },
        { emoji: "🌧️💜", title: "Purple Rain", hint: ["A stormy love song", "Prince's signature track", "I never meant to cause you any sorrow"] },
        { emoji: "👑", title: "King", hint: ["A battle for royalty", "Years & Years hit", "Who’s the king now?"] },
        { emoji: "🎂🎵", title: "Birthday", hint: ["A celebratory song", "Katy Perry's hit", "Happy birthday to you"] },
        { emoji: "🙋‍♀️👋👋👋", title: "Hello", hint: ["A heartfelt Adele ballad", "Longing and loneliness", "Hello from the other side"] },
        { emoji: "🏊💃", title: "Watermelon Sugar", hint: ["A fruity tune", "Harry Styles' catchy hit", "Good vibes and summer memories"] },
        { emoji: "💎💎", title: "Diamonds", hint: ["Shine bright", "Rihanna's anthem", "Sparkling and beautiful"] },
        { emoji: "🚶‍♂️🌙", title: "Walking on the Moon", hint: ["A dreamy track", "The Police's 80s hit", "Strange but familiar"] },
        { emoji: "🔥🔥", title: "Firework", hint: ["Katy Perry's explosive anthem", "A symbol of self-expression", "Show them what you're worth"] },
        { emoji: "❤️👩‍🎤", title: "Love Yourself", hint: ["Justin Bieber's breakup song", "Self-love anthem", "You should go and love yourself"] },
        { emoji: "⏳💔", title: "Time After Time", hint: ["Cyndi Lauper classic", "Time and love", "I will be waiting for you"] },
        { emoji: "🔒🎤", title: "Locked Out of Heaven", hint: ["Bruno Mars hit", "A relationship that feels heavenly", "I’m locked out of heaven"] },
        { emoji: "💔🎶", title: "Tears Dry on Their Own", hint: ["Amy Winehouse track", "Dealing with heartbreak", "I'm stronger without you"] },
        { emoji: "🎧🎶", title: "Take Me to Church", hint: ["Hozier’s anthem", "A powerful voice", "Love and religion collide"] },
        { emoji: "🔥🎶", title: "Hotline Bling", hint: ["Drake’s catchy tune", "Stuck on someone", "You used to call me on my cell phone"] },
        { emoji: "🎤🎶", title: "Bohemian Rhapsody", hint: ["A legendary rock opera", "Queen’s masterpiece", "Is this the real life?"] },
        { emoji: "⏱️⏳", title: "Time", hint: ["Pink Floyd track", "Life's fleeting nature", "Ticking clock in the background"] },
        { emoji: "💭💔", title: "Someone Like You", hint: ["Adele's heartfelt ballad", "A lost love", "I heard that you're settled down"] },
        { emoji: "💫💥", title: "Starboy", hint: ["The Weeknd's modern classic", "Shining bright", "I'm a starboy"] },
        { emoji: "❤️👩‍🎤", title: "Love Yourself", hint: ["Justin Bieber's breakup song", "Self-love anthem", "You should go and love yourself"] }
    ],
    "books": [
        { emoji: "🕷️🕸️👨", title: "Charlotte's Web", hint: ["A pig and a spider", "A tale of friendship", "Wilbur the pig"] },
        { emoji: "🧙‍♂️💍🌋", title: "The Lord of the Rings", hint: ["A magical journey", "One ring to rule them all", "Frodo and Gandalf"] },
        { emoji: "🦁👧🧙‍♂️", title: "The Lion, the Witch and the Wardrobe", hint: ["A magical land", "The wardrobe leads to Narnia", "Aslan the lion"] },
        { emoji: "🐷🏡", title: "Animal Farm", hint: ["A farm with talking animals", "All animals are equal", "Rebellion against oppression"] },
        { emoji: "👧🔮🏫", title: "Harry Potter", hint: ["A magical school", "The boy who lived", "Wand waving and spells"] },
        { emoji: "🐳🚢", title: "Moby Dick", hint: ["A huge white whale", "Call me Ishmael", "A sea captain's obsession"] },
        { emoji: "🕵️‍♂️🔍🐕", title: "Sherlock Holmes", hint: ["A brilliant detective", "Elementary, my dear Watson", "Solving mysteries"] },
        { emoji: "👸📚🔮", title: "Matilda", hint: ["A gifted young girl", "Telekinetic powers", "A story by Roald Dahl"] },
        { emoji: "🏝️👨", title: "Robinson Crusoe", hint: ["Stranded on an island", "A solitary man", "Survival and solitude"] },
        { emoji: "👑🗡️👑", title: "Game of Thrones", hint: ["Warring kingdoms", "Winter is coming", "Dragons and intrigue"] },
        { emoji: "🍂🎋", title: "The Secret Garden", hint: ["A hidden garden", "A healing place", "A story of growth and friendship"] },
        { emoji: "⚡🌩️", title: "Percy Jackson", hint: ["The son of a Greek god", "Mythology in the modern world", "Camp Half-Blood"] },
        { emoji: "🏹🍎", title: "The Hunger Games", hint: ["A dystopian world", "A rebellion against the Capitol", "Katniss Everdeen"] },
        { emoji: "📖💀", title: "The Book Thief", hint: ["A story of books in Nazi Germany", "Liesel Meminger", "A tale of love and loss"] },
        { emoji: "🦸‍♀️💪", title: "Wonder Woman", hint: ["A strong warrior", "A superhero origin story", "Diana Prince"] },
        { emoji: "🐉⚔️", title: "Eragon", hint: ["A young dragon rider", "The Inheritance Cycle", "A mythical world"] },
        { emoji: "📚🕵️‍♂️", title: "The Da Vinci Code", hint: ["A religious mystery", "Ancient secrets", "Robert Langdon's quest"] },
        { emoji: "🏞️🦒", title: "Out of Africa", hint: ["A love story in Africa", "Karen Blixen’s memoir", "Life in Kenya"] },
        { emoji: "🎩🐇", title: "Alice in Wonderland", hint: ["A girl in a strange world", "The White Rabbit", "Through the looking glass"] }
    ],
    "tv": [
        { emoji: "🚨🔍👨‍⚖️", title: "Breaking Bad", hint: ["A chemistry teacher turned criminal", "Blue crystals", "Walter White's transformation"] },
        { emoji: "👑⚔️", title: "Game of Thrones", hint: ["Warring kingdoms", "Dragons and intrigue", "Winter is coming"] },
        { emoji: "🕵️‍♂️🧩", title: "Sherlock", hint: ["A brilliant detective", "The game is afoot", "Sherlock Holmes and Watson"] },
        { emoji: "🍔🍟🍦", title: "The Simpsons", hint: ["A family in Springfield", "Homer's favorite food", "D'oh!"] },
        { emoji: "🧑‍🦳🔬", title: "The Big Bang Theory", hint: ["A genius physicist and his friends", "Socially awkward scientists", "Sheldon Cooper"] },
        { emoji: "🧙‍♂️🦸‍♂️", title: "The Witcher", hint: ["A monster hunter", "Geralt of Rivia", "Based on a book series"] },
        { emoji: "🎬🕵️‍♂️", title: "True Detective", hint: ["Crime and mystery", "A dark investigation", "A haunting journey"] },
        { emoji: "🦸‍♂️⚡", title: "The Flash", hint: ["A super-fast hero", "Central City", "Barry Allen's powers"] },
        { emoji: "🎩🎭", title: "The Crown", hint: ["Royal family drama", "The British monarchy", "A historical TV show"] },
        { emoji: "🐒🌴", title: "The Jungle Book", hint: ["A boy raised by animals", "Jungle animals", "Mowgli's adventure"] },
        { emoji: "👩‍⚕️🏥", title: "Grey's Anatomy", hint: ["Doctors in Seattle", "Romance and surgeries", "Meredith Grey's journey"] },
        { emoji: "🐉🛡️", title: "House of the Dragon", hint: ["Targaryens", "Dragons in Westeros", "Prequel to Game of Thrones"] },
        { emoji: "🐍👨‍🏫", title: "Friends", hint: ["Six friends in New York", "The one with the coffee shop", "Ross, Rachel, Monica, Chandler, Phoebe, and Joey"] },
        { emoji: "🧟‍♂️🏙️", title: "The Walking Dead", hint: ["Zombies take over the world", "Survival and human drama", "Rick Grimes and his group"] },
        { emoji: "🎸🚀", title: "Stranger Things", hint: ["Supernatural events", "A small town mystery", "The Upside Down"] },
        { emoji: "🔬👨‍🔬", title: "Dexter", hint: ["A forensic expert and a serial killer", "The blood spatter analyst", "Dexter's dark secret"] },
        { emoji: "🕵️‍♂️👽", title: "The X-Files", hint: ["Aliens and mysteries", "FBI agents", "Trust no one"] },
        { emoji: "👸🌹", title: "The Bachelor", hint: ["A dating reality show", "The rose ceremony", "A reality show with love"] },
        { emoji: "🛸👽", title: "UFO", hint: ["Alien encounters", "Mysterious disappearances", "Unidentified flying objects"] },
        { emoji: "⚡👽", title: "The 100", hint: ["Post-apocalyptic world", "Teenagers sent to Earth", "Survival against all odds"] }
    ],
    "countries": [
        { emoji: "🍁🇨🇦", title: "Canada", hint: ["Maple syrup", "The Great White North", "A friendly, bilingual country"] },
        { emoji: "🇯🇵🍣", title: "Japan", hint: ["Land of the rising sun", "Sushi and technology", "Tokyo and Mount Fuji"] },
        { emoji: "🇮🇹🍝", title: "Italy", hint: ["The Colosseum", "Pasta and pizza", "Rome and Venice"] },
        { emoji: "🇮🇳🕌", title: "India", hint: ["Bollywood", "Taj Mahal", "A diverse culture and cuisine"] },
        { emoji: "🇷🇺🍶", title: "Russia", hint: ["Cold winters", "Vodka and matryoshkas", "Moscow and Saint Petersburg"] },
        { emoji: "🇺🇸🍔", title: "United States", hint: ["Hollywood", "The land of opportunity", "The White House"] },
        { emoji: "🇨🇳🐉", title: "China", hint: ["The Great Wall", "Panda bears", "Ancient history and culture"] },
        { emoji: "🇪🇸🍷", title: "Spain", hint: ["Flamenco dancing", "Sangria and paella", "Barcelona and Madrid"] },
        { emoji: "🇬🇧🍵", title: "United Kingdom", hint: ["Big Ben", "Royalty and tea", "London and the Beatles"] },
        { emoji: "🇫🇷🍷", title: "France", hint: ["The Eiffel Tower", "Croissants and wine", "Paris and the Louvre"] },
        { emoji: "🇩🇪🍺", title: "Germany", hint: ["Beer and Oktoberfest", "Berlin's history", "Volkswagen and pretzels"] },
        { emoji: "🇦🇺🐨", title: "Australia", hint: ["The Great Barrier Reef", "Koalas and kangaroos", "Sydney Opera House"] },
        { emoji: "🇧🇷🎶", title: "Brazil", hint: ["Samba and Carnival", "The Amazon rainforest", "Rio de Janeiro and football"] },
        { emoji: "🇲🇽🌮", title: "Mexico", hint: ["Tacos and tequila", "Mayan pyramids", "A rich cultural history"] },
        { emoji: "🇰🇷🍱", title: "South Korea", hint: ["K-Pop", "Kimchi and Seoul", "Technology and innovation"] },
        { emoji: "🇸🇪💙", title: "Sweden", hint: ["Ikea", "Northern Lights", "ABBA and Swedish design"] },
        { emoji: "🇳🇿🌄", title: "New Zealand", hint: ["The land of the Hobbits", "Stunning landscapes", "A paradise for adventure lovers"] },
        { emoji: "🇮🇱🕍", title: "Israel", hint: ["Jerusalem", "A place of religious significance", "Dead Sea and the Wailing Wall"] },
        { emoji: "🇪🇬🏺", title: "Egypt", hint: ["Pyramids and Pharaohs", "The Nile River", "Ancient civilization"] },
        { emoji: "🇦🇷🥩", title: "Argentina", hint: ["Tango and steak", "Buenos Aires", "Patagonia and the Andes"] }
    ],
    "brands": [
        { emoji: "🍏📱", title: "Apple", hint: ["Innovative tech company", "MacBook and iPhone", "A bite out of the apple logo"] },
        { emoji: "👟🏃", title: "Nike", hint: ["Just do it", "Athletic wear", "Swoosh logo"] },
        { emoji: "🦁🛋️", title: "IKEA", hint: ["Furniture and home goods", "Swedish design", "Flat-packed assembly"] },
        { emoji: "🐱🍫", title: "KitKat", hint: ["Chocolate bar", "Break time", "Nestlé product"] },
        { emoji: "🍔🍟", title: "McDonald's", hint: ["Golden arches", "Fast food chain", "Happy Meal and Big Mac"] },
        { emoji: "☕🍩", title: "Dunkin' Donuts", hint: ["Coffee and donuts", "America's favorite", "A pink box full of donuts"] },
        { emoji: "🍫🍪", title: "Oreo", hint: ["A cookie with a twist", "Twist, lick, dunk", "Chocolate sandwich cookie"] },
        { emoji: "🏎️💨", title: "Ferrari", hint: ["Luxury sports car", "Italian engineering", "Prancing horse logo"] },
        { emoji: "🍩🦷", title: "Krispy Kreme", hint: ["Doughnuts hot and fresh", "The original glazed", "Sweet treats"] },
        { emoji: "📱💬", title: "WhatsApp", hint: ["Messaging app", "Owned by Facebook", "Green speech bubble logo"] },
        { emoji: "🔋⚡", title: "Tesla", hint: ["Electric cars", "Innovative technology", "Elon Musk's company"] },
        { emoji: "🎮👾", title: "Nintendo", hint: ["Mario and Zelda", "Video game company", "The Switch console"] },
        { emoji: "🍺🍻", title: "Budweiser", hint: ["American beer", "King of beers", "Red label and iconic logo"] },
        { emoji: "🍷🍇", title: "Gallo", hint: ["Wine brand", "Rich heritage", "A rooster as the logo"] },
        { emoji: "🍎🍏", title: "Granny Smith", hint: ["Famous green apple variety", "Sour and crisp", "Australian origin"] },
        { emoji: "🎬📽️", title: "Netflix", hint: ["Streaming platform", "Original series", "Binge-watching favorite"] },
        { emoji: "🍔🧑‍🍳", title: "Burger King", hint: ["Fast food giant", "Have it your way", "Flame-grilled burgers"] },
        { emoji: "💄💋", title: "MAC Cosmetics", hint: ["Beauty and makeup", "A popular cosmetics brand", "Bold and trendy"] },
        { emoji: "🎧📱", title: "Beats by Dre", hint: ["High-quality headphones", "Audio tech brand", "Owned by Apple"] },
        { emoji: "📦📦", title: "Amazon", hint: ["E-commerce giant", "The Everything Store", "Prime delivery service"] }
    ]
};
// Object to track used emojis for each category
const usedEmojis = {};


// Function to get a random emoji from a specific category without repeating
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
window.emojiDatabase = emojiDatabase;
window.getRandomEmoji = getRandomEmoji;