import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveScore, getScores } from '../utils/storage';

function EndScreen({ score, total, onPlayAgain }) {
  const [playerName, setPlayerName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    setLeaderboard(getScores());
  }, []);

  const getScoreMessage = () => {
    if (percentage >= 90) return { emoji: '🏆', message: 'Outstanding! Perfect score!', color: 'text-yellow-600' };
    if (percentage >= 80) return { emoji: '🎉', message: 'Excellent! You\'re a quiz master!', color: 'text-green-600' };
    if (percentage >= 70) return { emoji: '👍', message: 'Great job! Well done!', color: 'text-blue-600' };
    if (percentage >= 60) return { emoji: '👏', message: 'Good work! Keep it up!', color: 'text-indigo-600' };
    if (percentage >= 50) return { emoji: '📚', message: 'Not bad! Room for improvement!', color: 'text-purple-600' };
    return { emoji: '💪', message: 'Keep practicing! You\'ll improve!', color: 'text-orange-600' };
  };

  const scoreInfo = getScoreMessage();

  const handleSaveScore = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }

    setIsLoading(true);

    const success = saveScore({
      name: playerName.trim(),
      score,
      total,
      percentage
    });

    setIsLoading(false);

    if (success) {
      setIsSaved(true);
      // Update leaderboard after saving
      setLeaderboard(getScores());
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scoresUpdated'));
      }, 100);
    } else {
      alert('Failed to save score. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && playerName.trim() && !isSaved) {
      handleSaveScore();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="card p-12 text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
          <div className="text-6xl mb-6">{scoreInfo.emoji}</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {score}/{total}
          </div>
          <div className="text-2xl font-semibold text-gray-600">
            {percentage}% Correct
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-xl font-semibold mb-8 ${scoreInfo.color}`}
        >
          {scoreInfo.message}
        </motion.p>

        {!isSaved && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your name"
              className="w-full max-w-xs px-4 py-3 text-center border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg font-semibold"
              maxLength={20}
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveScore}
              disabled={isLoading || !playerName.trim()}
              className="btn-primary ml-4 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Score'}
            </motion.button>
          </motion.div>
        )}

        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl"
          >
            🎉 Score saved successfully!
          </motion.div>
        )}

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-8 p-6 bg-gray-50 rounded-xl text-left max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <ul>
              {leaderboard
                .sort((a, b) => b.score - a.score) // highest score first
                .slice(0, 5) // show top 5
                .map((s, index) => (
                  <li key={index} className="mb-2">
                    {s.name} — {s.score}/{s.total} ({s.percentage}%)
                  </li>
                ))}
            </ul>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="btn-primary text-lg px-8 py-4 mr-4"
          >
            🚀 Play Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EndScreen;
