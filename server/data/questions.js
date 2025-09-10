// This file contains some sample questions to populate the database.
export const sampleQuestions = [
    // Web Dev
    {
        questionText: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
        category: "Web Dev",
        difficulty: "Easy",
    },
    {
        questionText: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "font-style"],
        correctAnswer: "color",
        category: "Web Dev",
        difficulty: "Easy",
    },
    {
        questionText: "What is the purpose of the `useState` hook in React?",
        options: ["To manage state in functional components", "To fetch data from an API", "To create a new component", "To add styling"],
        correctAnswer: "To manage state in functional components",
        category: "Web Dev",
        difficulty: "Medium",
    },
    {
        questionText: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: "MongoDB",
        category: "Web Dev",
        difficulty: "Medium",
    },
     {
        questionText: "What is the correct syntax for a GET request using fetch API?",
        options: ["fetch('url', { method: 'GET' })", "fetch.get('url')", "get('url')", "fetch.request('url', 'GET')"],
        correctAnswer: "fetch('url', { method: 'GET' })",
        category: "Web Dev",
        difficulty: "Hard",
    },

    // Math
    {
        questionText: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        category: "Math",
        difficulty: "Easy",
    },
    {
        questionText: "What is the value of Pi (to 2 decimal places)?",
        options: ["3.14", "3.15", "3.16", "3.12"],
        correctAnswer: "3.14",
        category: "Math",
        difficulty: "Easy",
    },
    {
        questionText: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12",
        category: "Math",
        difficulty: "Medium",
    },

    {
        questionText: "What is the formula for the area of a circle?",
        options: ["πr²", "2πr", "πd", "2πd"],
        correctAnswer: "πr²",
        category: "Math",
        difficulty: "Medium",
    },
    {
        questionText: "What is the next prime number after 7?",
        options: ["9", "10", "11", "12"],
        correctAnswer: "11",
        category: "Math",
        difficulty: "Hard",
    },

    // General Knowledge (GK)
    {
        questionText: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
        category: "GK",
        difficulty: "Easy",
    },
    {
        questionText: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        category: "GK",
        difficulty: "Easy",
    },
    {
        questionText: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter",
        category: "GK",
        difficulty: "Medium",
    },
    {
        questionText: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        correctAnswer: "1912",
        category: "GK",
        difficulty: "Medium",
    },
    {
        questionText: "What is the chemical symbol for Gold?",
        options: ["Go", "Ag", "Gd", "Au"],
        correctAnswer: "Au",
        category: "GK",
        difficulty: "Hard",
    },
];
