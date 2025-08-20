import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHighScores, clearHighScores } from '../utils/storage';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  const loadScores = () => {
    setScores(getHighScores());
  };

  useEffect(() => {
    loadScores();

    // Listen for score updates
    const handleScoresUpdate = () => {
      loadScores();
    };

    window.addEventListener('scoresUpdated', handleScoresUpdate);
    return () => window.removeEventListener('scoresUpdated', handleScoresUpdate);
  }, []);

  const handleClearScores = () => {
    if (window.confirm('Are you sure you want to clear all high scores?')) {
      clearHighScores();
      loadScores();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border-t border-white/20 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            🏆 Leaderboard
          </h2>
          {scores.length > 0 && (
            <button
              onClick={handleClearScores}
              className="text-sm text-red-600 hover:text-red-800 font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        {scores.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-lg text-gray-600">No scores yet!</p>
            <p className="text-gray-500">Be the first to complete the quiz and make it to the leaderboard.</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {scores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`flex items-center justify-between p-4 rounded-xl shadow-md border-2 transition-all duration-200 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : index === 1
                      ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                      : index === 2
                        ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
                        : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getRankEmoji(index + 1)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      {score.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(score.date)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800">
                    {score.score}/{score.total}
                  </div>
                  <div className={`text-sm font-semibold ${
                    score.percentage >= 80 ? 'text-green-600' :
                    score.percentage >= 60 ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    {score.percentage}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {scores.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            Showing top {Math.min(scores.length, 5)} scores
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;