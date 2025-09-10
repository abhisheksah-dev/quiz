import mongoose from 'mongoose';

// Defines the structure for quiz questions in the MongoDB database.
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: [arr => arr.length === 4, 'Question must have exactly 4 options.'],
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Dev', 'Math', 'GK'], // Enforces specific categories
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'], // Enforces specific difficulty levels
    },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
