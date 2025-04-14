/**
 * database.js
 * ------------
 * Stores the emoji data for each category in the Emoji Word Guessing Game.
 *  
 * This file contains:
 * - A global object `emojiDatabase` categorized by theme (movies, songs, books, etc.)
 * - Each category includes an array of emoji puzzles, each with:
 *   - emoji: the emoji clue
 *   - title: the correct answer
 *   - hint: an array of 3 hints
 * 
 * Used by game logic to fetch emojis and validate answers.
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
        { emoji: "🦸‍♂️🛸", title: "Superman", hint: ["Kryptonian hero", "Faster than a speeding bullet", "Clark Kent and Lois Lane"] },
        { emoji: "👽🌌🚀", title: "E.T.", hint: ["An alien from another world", "Phone home", "A boy befriends a stranded alien"] },
        { emoji: "🕷️🖤", title: "Venom", hint: ["Alien symbiote", "Anti-hero", "Eddie Brock's transformation"] },
        { emoji: "⚔️🏰", title: "Gladiator", hint: ["Fighting in the arena", "Revenge and honor", "Maximus Decimus Meridius"] },
        { emoji: "🔫💥", title: "Die Hard", hint: ["Christmas action movie", "Yippee-ki-yay", "Bruce Willis as John McClane"] },
        { emoji: "🌎👾", title: "The Matrix", hint: ["A simulated reality", "Red pill or blue pill?", "Neo's journey to freedom"] },
        { emoji: "🦸‍♀️💥", title: "Wonder Woman", hint: ["Amazonian warrior", "God killer", "Diana Prince"] },
        { emoji: "🦷👽", title: "Men in Black", hint: ["Alien secret agents", "The neuralyzer", "Will Smith and Tommy Lee Jones"] },
        { emoji: "🚕🚨", title: "Taxi Driver", hint: ["A New York vigilante", "Mental instability", "Robert De Niro as Travis Bickle"] },
        { emoji: "🏹🎯", title: "The Hunger Games", hint: ["Dystopian society", "The Mockingjay", "Katniss Everdeen's rebellion"] },
        { emoji: "🦇👨🃏", title: "The Dark Knight", hint: ["The Joker's reign of terror", "Why so serious?", "Batman vs The Joker"] },
        { emoji: "🧟‍♂️💀", title: "The Walking Dead", hint: ["Zombie apocalypse", "Survival of the fittest", "Rick Grimes and his group"] },
        { emoji: "🦸‍♂️🔥", title: "Iron Man", hint: ["Genius billionaire", "Iron suit", "Tony Stark"] },
        { emoji: "🧛‍♀️🦇", title: "Twilight", hint: ["Vampires and werewolves", "Forbidden love", "Bella and Edward's love story"] },
        { emoji: "🌪️👠", title: "The Wizard of Oz", hint: ["A tornado takes her home", "Follow the yellow brick road", "Ruby slippers"] },
        { emoji: "⏳⚔️", title: "Inception", hint: ["Dream within a dream", "Mind bending concepts", "The spinning top"] },
        { emoji: "🧟‍♂️🏃‍♀️", title: "28 Days Later", hint: ["A viral outbreak", "Zombies", "Survival in a post-apocalyptic world"] },
        { emoji: "💣🎒", title: "Mission Impossible", hint: ["Spy thriller", "Impossible missions", "Tom Cruise as Ethan Hunt"] },
        { emoji: "🚴‍♂️🏅", title: "Breaking Away", hint: ["Bicycle racing", "Coming of age", "Small town dreams"] },
        { emoji: "🧑‍🍳🍲", title: "Ratatouille", hint: ["A rat who wants to be a chef", "Parisian kitchen", "Remy and Linguini"] },
        { emoji: "🏠👹", title: "The Conjuring", hint: ["Haunted house", "Paranormal investigation", "Ed and Lorraine Warren"] },
        { emoji: "🧳✈️", title: "Up", hint: ["A house floating with balloons", "An old man’s dream", "Adventure and grief"] },
        { emoji: "🧑‍🚀🌍", title: "Interstellar", hint: ["Space travel", "Time dilation", "Saving humanity"] },
        { emoji: "🐱👓", title: "The Cat in the Hat", hint: ["A mischievous cat", "A magical hat", "Two kids' wild day"] },
        { emoji: "🧠💡", title: "A Beautiful Mind", hint: ["A brilliant mathematician", "Schizophrenia", "John Nash"] },
        { emoji: "🍿🎥", title: "The Godfather", hint: ["Organized crime", "The Corleone family", "Vito and Michael"] },
        { emoji: "🎻💃", title: "La La Land", hint: ["Musical love story", "Hollywood dreams", "Emma Stone and Ryan Gosling"] },
        { emoji: "⛷️🏔️", title: "Everest", hint: ["Climbing the highest mountain", "Survival against nature", "Based on a true story"] },
        { emoji: "👑🇬🇧", title: "The Crown", hint: ["Royal family drama", "Queen Elizabeth II", "The history of the British monarchy"] },
        { emoji: "🦄🌟", title: "The NeverEnding Story", hint: ["A magical land", "A boy's adventure", "Falkor the luck dragon"] },
        { emoji: "🏀🎯", title: "Space Jam", hint: ["Basketball and cartoons", "Michael Jordan", "Looney Tunes"] },
        { emoji: "🎹👨‍🎤", title: "Bohemian Rhapsody", hint: ["The rise of Queen", "Freddie Mercury", "A musical journey"] },
        { emoji: "👨‍🍳🍔", title: "Chef", hint: ["Food truck", "Gourmet cooking", "Father-son relationship"] },
        { emoji: "🎡🎪", title: "The Greatest Showman", hint: ["The circus", "A musical about P.T. Barnum", "Showmanship and dreams"] },
        { emoji: "🧙‍♂️🏞️", title: "The Hobbit", hint: ["A journey through Middle Earth", "Smaug the dragon", "Bilbo Baggins"] },
        { emoji: "⚰️💀", title: "The Sixth Sense", hint: ["A young boy who sees dead people", "Psychic abilities", "Bruce Willis' twist ending"] }
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
        { emoji: "❤️👩‍🎤", title: "Love Yourself", hint: ["Justin Bieber's breakup song", "Self-love anthem", "You should go and love yourself"] },
        { emoji: "🌊🎵", title: "Ocean Eyes", hint: ["Billie Eilish breakout", "Melancholy and dreamy", "You really know how to make me cry"] },
        { emoji: "🚘💨", title: "Fast Car", hint: ["Tracy Chapman classic", "Dreams of escape", "We gotta make a decision"] },
        { emoji: "🪩💃", title: "Levitating", hint: ["Dua Lipa bop", "Floating in love", "If you wanna run away with me"] },
        { emoji: "💔🕺", title: "Dancing On My Own", hint: ["Robyn's emotional anthem", "Sad on the dance floor", "I’m in the corner"] },
        { emoji: "🌅🚘", title: "Blinding Lights", hint: ["The Weeknd’s 80s hit", "Late-night drives", "I’m blinded by the lights"] },
        { emoji: "🪦🖤", title: "Ghost", hint: ["Justin Bieber song", "Love after loss", "If I can't be close to you"] },
        { emoji: "🐎🏜️", title: "Old Town Road", hint: ["Lil Nas X & Billy Ray", "Country-rap mix", "Can't nobody tell me nothin’"] },
        { emoji: "👠💃", title: "Juice", hint: ["Lizzo’s confidence anthem", "Feelin’ myself", "Mirror mirror on the wall"] },
        { emoji: "💤🌙", title: "No Sleep", hint: ["Martin Garrix & Khalid", "Late-night energy", "We stay up all night"] },
        { emoji: "🌧️🌧️🌧️", title: "Set Fire to the Rain", hint: ["Adele emotional hit", "Impossible love", "Let it fall, my heart"] },
        { emoji: "🌍🎶", title: "Heal the World", hint: ["Michael Jackson message", "Hope and kindness", "Make it a better place"] },
        { emoji: "👗🪩", title: "Style", hint: ["Taylor Swift", "Red lips & slicked back hair", "We never go out of style"] },
        { emoji: "🎈🎂", title: "It's My Party", hint: ["Lesley Gore classic", "Cry if I want to", "You would cry too"] },
        { emoji: "🌪️💔", title: "Tornado Warnings", hint: ["Sabrina Carpenter track", "Love and anxiety", "I ignore all the tornado warnings"] },
        { emoji: "😴🌙", title: "Talking to the Moon", hint: ["Bruno Mars ballad", "Lonely nights", "I sit by myself"] },
        { emoji: "🕺💫", title: "Stayin' Alive", hint: ["Bee Gees disco hit", "Survival with rhythm", "Ah, ha, ha, ha"] },
        { emoji: "🥀💘", title: "Love on the Brain", hint: ["Rihanna soulful ballad", "Painful passion", "It beats me black and blue"] },
        { emoji: "🌈🧒", title: "Rainbow Connection", hint: ["Kermit the Frog classic", "Dreamers and lovers", "Someday we'll find it"] },
        { emoji: "☁️🚶", title: "Clouds", hint: ["Zach Sobiech", "Bittersweet goodbye", "We'll go up, up, up"] },
        { emoji: "🪞🧠", title: "Anti-Hero", hint: ["Taylor Swift introspection", "It’s me, hi", "Everybody agrees"] }
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
        { emoji: "🎩🐇", title: "Alice in Wonderland", hint: ["A girl in a strange world", "The White Rabbit", "Through the looking glass"] },
        { emoji: "👩‍🔬🧬", title: "Frankenstein", hint: ["A scientist's creation", "The monster isn't who you think", "Mary Shelley's gothic tale"] },
        { emoji: "🌊🧶", title: "The Old Man and the Sea", hint: ["A fisherman’s battle", "Ernest Hemingway classic", "Man vs nature"] },
        { emoji: "🚪👻", title: "Coraline", hint: ["A button-eyed world", "Neil Gaiman’s eerie story", "A dark mirror of reality"] },
        { emoji: "🧒🍫🏭", title: "Charlie and the Chocolate Factory", hint: ["Golden ticket adventure", "Willy Wonka’s world", "Magical sweets and lessons"] },
        { emoji: "👧📓", title: "Anne of Green Gables", hint: ["A red-haired orphan", "Life in Avonlea", "Finding family and identity"] },
        { emoji: "🏃‍♂️💨", title: "The Maze Runner", hint: ["Trapped in a labyrinth", "No memories", "Escape or die"] },
        { emoji: "🧛‍♂️🌙", title: "Dracula", hint: ["The original vampire", "Blood and darkness", "Bram Stoker’s chilling novel"] },
        { emoji: "🌬️🏠", title: "The Wizard of Oz", hint: ["A magical tornado ride", "Follow the yellow brick road", "There's no place like home"] },
        { emoji: "🧒🦊", title: "The Little Prince", hint: ["A philosophical journey", "Tiny planet wisdom", "Draw me a sheep"] },
        { emoji: "💡🌍", title: "Sapiens", hint: ["A brief history of humankind", "Yuval Noah Harari", "From foragers to global empire"] },
        { emoji: "🚂❄️", title: "Murder on the Orient Express", hint: ["A train mystery", "Hercule Poirot", "Everyone's a suspect"] },
        { emoji: "🌌🚀", title: "Dune", hint: ["A desert planet", "Spice and power", "Sci-fi epic with sandworms"] },
        { emoji: "💼⚖️", title: "To Kill a Mockingbird", hint: ["Justice and racism", "Atticus Finch", "A child's perspective on the South"] },
        { emoji: "🐰⏱️", title: "Watership Down", hint: ["Rabbits on a journey", "Survival and hope", "A deeper allegory"] },
        { emoji: "⛵🌅", title: "Life of Pi", hint: ["A boy and a tiger", "Stranded in the ocean", "Survival with a twist"] }
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
        { emoji: "⚡👽", title: "The 100", hint: ["Post-apocalyptic world", "Teenagers sent to Earth", "Survival against all odds"] },
        { emoji: "📓🔪", title: "13 Reasons Why", hint: ["A mysterious set of tapes", "Teen drama and tragedy", "Hannah Baker's story"] },
        { emoji: "🛍️👠", title: "Sex and the City", hint: ["New York friendships", "Fashion and love", "Carrie Bradshaw’s adventures"] },
        { emoji: "🧛‍♂️🌃", title: "Buffy the Vampire Slayer", hint: ["Fighting supernatural beings", "A high school slayer", "Saving the world (a lot)"] },
        { emoji: "👩‍👧🎀", title: "Gilmore Girls", hint: ["Mother and daughter duo", "Coffee and fast talking", "Life in Stars Hollow"] },
        { emoji: "🧟‍♂️🧬", title: "iZombie", hint: ["Crime-solving zombie", "Brains and visions", "A medical examiner’s secret"] },
        { emoji: "🍳🐶🛁", title: "Friends", hint: ["Couch at Central Perk", "Iconic theme song", "Could it *be* more classic?"] },
        { emoji: "🐉⚔️🔥", title: "Avatar: The Last Airbender", hint: ["Elemental bending", "The Avatar's journey", "Restore balance to the world"] },
        { emoji: "🛥️🧪🌴", title: "Lost", hint: ["Plane crash survivors", "A mysterious island", "Smoke monster and time travel"] },
        { emoji: "🌪️🧙‍♂️", title: "Once Upon a Time", hint: ["Fairy tale characters", "In the real world", "Storybrooke’s secrets"] },
        { emoji: "💼👨‍💼", title: "Suits", hint: ["Law without a degree", "Harvey and Mike", "Drama in the courtroom"] },
        { emoji: "👩‍🎤🎹", title: "Glee", hint: ["High school choir", "Singing competitions", "Musical drama and comedy"] },
        { emoji: "🎮👾", title: "Black Mirror", hint: ["Dark future tech", "Twisted sci-fi tales", "Every episode is a standalone"] },
        { emoji: "🧪👦🐵", title: "The Umbrella Academy", hint: ["Superpowered siblings", "Dysfunctional family", "Time-traveling chaos"] },
        { emoji: "🚨🚔", title: "Brooklyn Nine-Nine", hint: ["NYPD’s funniest squad", "Detective Jake Peralta", "Comedy and crime solving"] },
        { emoji: "🧼🎤", title: "American Idol", hint: ["Singing competition", "Golden ticket", "Judges and performances"] }
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
        { emoji: "🇦🇷🥩", title: "Argentina", hint: ["Tango and steak", "Buenos Aires", "Patagonia and the Andes"] },
        { emoji: "🇵🇹🍷", title: "Portugal", hint: ["Lisbon and Porto", "Pastéis de nata", "Fado music and beautiful coastlines"] },
        { emoji: "🇹🇭🌶️", title: "Thailand", hint: ["Spicy street food", "Tropical beaches", "Temples and tuk-tuks"] },
        { emoji: "🇵🇭🏝️", title: "Philippines", hint: ["Archipelago of islands", "White sand beaches", "Warm hospitality and jeepneys"] },
        { emoji: "🇳🇴🎿", title: "Norway", hint: ["Fjords and Northern Lights", "Vikings", "A snowy, scenic wonderland"] },
        { emoji: "🇿🇦🦁", title: "South Africa", hint: ["Safari adventures", "Cape Town and Table Mountain", "Diverse cultures"] },
        { emoji: "🇬🇷🏛️", title: "Greece", hint: ["Ancient ruins", "Santorini sunsets", "Gyros and mythology"] },
        { emoji: "🇳🇱🌷", title: "Netherlands", hint: ["Windmills and tulips", "Amsterdam canals", "Bicycles everywhere"] },
        { emoji: "🇹🇷🕌", title: "Turkey", hint: ["Istanbul’s historic sites", "Baklava and kebabs", "Bridging Europe and Asia"] },
        { emoji: "🇨🇭⛰️", title: "Switzerland", hint: ["Alps and skiing", "Chocolate and cheese", "Neutral but stunning"] },
        { emoji: "🇨🇺🎺", title: "Cuba", hint: ["Vintage cars", "Havana rhythms", "Cigars and salsa dancing"] },
        { emoji: "🇲🇦🌴", title: "Morocco", hint: ["Colorful markets", "Sahara Desert", "Tagine and historic medinas"] },
        { emoji: "🇨🇴☕", title: "Colombia", hint: ["Coffee and mountains", "Cartagena’s charm", "Cumbia and arepas"] },
        { emoji: "🇨🇱🏔️", title: "Chile", hint: ["Andes and Patagonia", "Deserts to glaciers", "Long and narrow beauty"] },
        { emoji: "🇻🇳🥢", title: "Vietnam", hint: ["Pho and street food", "Rice paddies and scooters", "Halong Bay adventures"] },
        { emoji: "🇮🇸🔥", title: "Iceland", hint: ["Volcanoes and glaciers", "Hot springs and geysers", "The land of fire and ice"] }
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
        { emoji: "📦📦", title: "Amazon", hint: ["E-commerce giant", "The Everything Store", "Prime delivery service"] },
        { emoji: "📸🎞️", title: "Canon", hint: ["Camera and imaging", "Photography essential", "Known for DSLRs and lenses"] },
        { emoji: "🍕🏠", title: "Domino's", hint: ["Pizza delivery", "Blue and red logo", "30-minute promise"] },
        { emoji: "🎧🎵", title: "Spotify", hint: ["Music streaming", "Green logo", "Playlists and podcasts"] },
        { emoji: "📺🌐", title: "YouTube", hint: ["Video sharing platform", "Creators and content", "Red play button"] },
        { emoji: "🛍️👜", title: "Zara", hint: ["Fashion retail", "Trendy clothing", "Spanish fast fashion"] },
        { emoji: "🏀🐂", title: "NBA", hint: ["Basketball league", "Famous players", "Slam dunks and playoffs"] },
        { emoji: "🍗🚗", title: "KFC", hint: ["Fried chicken", "Colonel Sanders", "Secret recipe"] },
        { emoji: "📷🎨", title: "Instagram", hint: ["Photo-sharing app", "Stories and filters", "Meta-owned platform"] },
        { emoji: "🚗🔧", title: "Toyota", hint: ["Reliable cars", "Japanese automaker", "Corolla and Prius"] },
        { emoji: "💻🪟", title: "Microsoft", hint: ["Tech giant", "Windows and Office", "Blue logo with four squares"] },
        { emoji: "🕶️🔳", title: "Ray-Ban", hint: ["Iconic sunglasses", "Aviators and Wayfarers", "Stylish eye protection"] },
        { emoji: "📱📷", title: "Samsung", hint: ["South Korean brand", "Galaxy phones", "Tech and appliances"] },
        { emoji: "👗🛍️", title: "H&M", hint: ["Affordable fashion", "Trendy collections", "Clothing and accessories"] },
        { emoji: "👟🔥", title: "Adidas", hint: ["Three stripes logo", "Athletic wear and sneakers", "German sports brand"] },
        { emoji: "🛫🧳", title: "Emirates", hint: ["Luxury airline", "Dubai-based", "Fly better"] },
        { emoji: "🍦🐄", title: "Ben & Jerry's", hint: ["Ice cream brand", "Creative flavors", "Chunky and funky"] },
        { emoji: "📷⛅", title: "Polaroid", hint: ["Instant photography", "Shake it like...", "Retro vibes"] },
        { emoji: "🍩☕", title: "Tim Hortons", hint: ["Canadian coffee chain", "Double-double", "Timbits and iced caps"] },
        { emoji: "🛹🔥", title: "Supreme", hint: ["Streetwear brand", "Hyped drops", "Red box logo"] },
        { emoji: "💅✨", title: "Sephora", hint: ["Makeup and skincare", "Beauty retailer", "Black-and-white chic"] }

    ]
};
