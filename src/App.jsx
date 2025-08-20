import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuestionCard from "./components/QuestionCard";
import EndScreen from "./components/EndScreen";
import TimerBar from "./components/TimerBar";
import Controls from "./components/Controls";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const timePerQuestion = 15; // 15 seconds each

  // ✅ Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
        );
        const data = await res.json();

        const formatted = data.results.map((q) => ({
          question: decodeURIComponent(q.question),
          options: [...q.incorrect_answers, q.correct_answer]
            .map((opt) => decodeURIComponent(opt))
            .sort(() => Math.random() - 0.5),
          answer: decodeURIComponent(q.correct_answer),
        }));

        setQuestions(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // ✅ Start / Reset game
  const startGame = () => {
    setGameStarted(true);
    setShowEnd(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowEnd(false);
    setCurrentIndex(0);
    setScore(0);
  };

  // ✅ Before game starts (Home screen)
  if (!gameStarted && !showEnd) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 text-center max-w-2xl w-full"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            🧠 Modern Quiz App
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            {loading
              ? "Fetching questions..."
              : `Test your web development knowledge! Answer ${questions.length} questions in ${timePerQuestion} seconds each.`}
          </motion.p>
          {!loading && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={startGame}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Quiz 🚀
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading questions...
      </div>
    );
  }

  // ✅ End screen
  if (showEnd) {
    return (
      <EndScreen
        score={score}
        total={questions.length}
        onRestart={resetGame}
      />
    );
  }

  // ✅ Show current question
  const currentQuestion = questions[currentIndex] || null;
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No question available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Question */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={(option) => {
          if (option === currentQuestion.answer) {
            setScore((s) => s + 1);
          }
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex((c) => c + 1);
          } else {
            setShowEnd(true);
          }
        }}
      />

      {/* ✅ Timer */}
      <div className="my-4">
        <TimerBar
          duration={timePerQuestion}
          onTimeUp={() => {
            if (currentIndex + 1 < questions.length) {
              setCurrentIndex((c) => c + 1);
            } else {
              setShowEnd(true);
            }
          }}
        />
      </div>

      {/* ✅ Controls */}
      <Controls />
    </div>
  );
}
