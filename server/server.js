// Main entry point for the backend server
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz.js';
import Question from './models/Question.js';
import { sampleQuestions } from './data/questions.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/questions', quizRoutes);

// --- Database Connection ---
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully.');
        // Start the server after successful DB connection
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        
        // Optional: Seed the database with sample questions if it's empty
        seedDatabase();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- Database Seeding ---
// This function will add sample questions to the database if none exist.
const seedDatabase = async () => {
    try {
        const count = await Question.countDocuments();
        if (count === 0) {
            console.log('No questions found. Seeding database with sample questions...');
            await Question.insertMany(sampleQuestions);
            console.log('Database seeded successfully!');
        } else {
            console.log('Database already contains questions. Skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
