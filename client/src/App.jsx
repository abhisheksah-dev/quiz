import React, { useState, useEffect, useMemo } from 'react';

// Base URL for the API. Remember to set this in a .env file for production.
const API_BASE_URL = 'http://localhost:5001';

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [quizState, setQuizState] = useState('start'); // 'start', 'active', 'finished'
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Quiz configuration state
    const [config, setConfig] = useState({
        category: 'Web Dev',
        difficulty: 'Easy',
        limit: 10,
    });
    
    // --- Computed Values ---
    const currentQuestion = questions[currentQuestionIndex];
    const score = useMemo(() => {
        return questions.reduce((acc, question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }, [userAnswers, questions]);

    // --- API Call to Fetch Questions ---
    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        setQuizState('active');
        try {
            const url = `${API_BASE_URL}/api/questions?category=${config.category}&difficulty=${config.difficulty}&limit=${config.limit}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch questions. Please try different options.');
            }
            const data = await response.json();
            setQuestions(data);
        } catch (err) {
            setError(err.message);
            setQuizState('start'); // Go back to start screen on error
        } finally {
            setLoading(false);
        }
    };

    // --- Event Handlers ---
    const handleStartQuiz = () => {
        fetchQuestions();
    };

    const handleAnswerSelect = (answer) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    };
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizState('finished');
        }
    };
    
    const handleRestartQuiz = () => {
        setQuizState('start');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setError(null);
    };

    // --- UI Rendering ---
    const renderContent = () => {
        if (loading) {
            return <LoadingSpinner />;
        }
        if (quizState === 'start') {
            return (
                <StartScreen
                    config={config}
                    setConfig={setConfig}
                    onStartQuiz={handleStartQuiz}
                    error={error}
                />
            );
        }
        if (quizState === 'active' && currentQuestion) {
            return (
                <QuestionDisplay
                    question={currentQuestion}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={userAnswers[currentQuestionIndex]}
                    onAnswerSelect={handleAnswerSelect}
                    onNextQuestion={handleNextQuestion}
                />
            );
        }
        if (quizState === 'finished') {
            return (
                <ResultScreen
                    score={score}
                    totalQuestions={questions.length}
                    onRestart={handleRestartQuiz}
                />
            );
        }
        return <p>Something went wrong. Please refresh.</p>;
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-6">
                    Quiz Master Pro
                </h1>
                {renderContent()}
            </div>
        </div>
    );
}

// --- Sub-Components ---

const StartScreen = ({ config, setConfig, onStartQuiz, error }) => {
    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Quiz!</h2>
            <p className="text-slate-400 mb-8">Select your topic and difficulty to begin.</p>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-6">{error}</p>}

            <div className="space-y-6">
                {/* Category Selection */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-lg mb-2 text-slate-300">Category</label>
                    <select name="category" value={config.category} onChange={handleConfigChange} className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="Web Dev">Web Development</option>
                        <option value="Math">Mathematics</option>
                        <option value="GK">General Knowledge</option>
                    </select>
                </div>
                
                {/* Difficulty Selection */}
                <div className="flex flex-col">
                     <label htmlFor="difficulty" className="text-lg mb-2 text-slate-300">Difficulty</label>
                    <select name="difficulty" value={config.difficulty} onChange={handleConfigChange} className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            <button onClick={onStartQuiz} className="w-full mt-10 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg text-lg btn-hover">
                Start Quiz
            </button>
        </div>
    );
};

const QuestionDisplay = ({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect, onNextQuestion }) => {
    return (
        <div>
            {/* Progress Bar */}
            <div className="mb-6">
                <p className="text-slate-400 text-sm mb-2 text-right">Question {questionNumber} / {totalQuestions}</p>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
                </div>
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: question.questionText }} />

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    return (
                        <button
                            key={index}
                            onClick={() => onAnswerSelect(option)}
                            className={`p-4 border rounded-lg text-left text-lg btn-hover ${
                                isSelected 
                                ? 'bg-cyan-500 border-cyan-400 text-slate-900 font-semibold' 
                                : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                            }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
            
            {/* Next Button */}
            {selectedAnswer && (
                 <button onClick={onNextQuestion} className="w-full mt-8 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg text-lg btn-hover">
                    Next
                </button>
            )}
        </div>
    );
};

const ResultScreen = ({ score, totalQuestions, onRestart }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl text-slate-300 mb-2">You Scored</p>
            <p className="text-6xl font-bold text-cyan-400 mb-4">{score} / {totalQuestions}</p>
            <p className="text-2xl text-slate-400 mb-8">({percentage}%)</p>
            <button onClick={onRestart} className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg text-lg btn-hover">
                Play Again
            </button>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
);
