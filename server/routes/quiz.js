import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// --- Utility function to shuffle an array (Fisher-Yates algorithm) ---
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

// --- API Endpoint to GET questions ---
// Example URL: /api/questions?category=Math&difficulty=Easy&limit=10
router.get('/', async (req, res) => {
    const { category, difficulty, limit = 10 } = req.query;

    try {
        // Build the query based on request parameters
        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        // Fetch questions from the database
        let questions = await Question.find(query).limit(Number(limit));

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the selected criteria.' });
        }
        
        // Shuffle the fetched questions
        const shuffledQuestions = shuffleArray(questions);
        
        // For each question, shuffle its options
        const processedQuestions = shuffledQuestions.map(q => {
            const questionObject = q.toObject();
            questionObject.options = shuffleArray(questionObject.options);
            return questionObject;
        });

        res.status(200).json(processedQuestions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error while fetching questions.' });
    }
});

export default router;