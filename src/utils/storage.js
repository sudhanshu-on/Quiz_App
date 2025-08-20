const STORAGE_KEY = 'quiz-app-high-scores';

/**
 * Get high scores from localStorage
 * @returns {Array} - Array of high score objects
 */
export function getHighScores() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const scores = JSON.parse(stored);
    return Array.isArray(scores) ? scores : [];
  } catch (error) {
    console.error('Error reading high scores:', error);
    return [];
  }
}

/**
 * Save a new score to localStorage
 * @param {Object} scoreData - Score object { name, score, total, percentage, date }
 */
export function saveScore(scoreData) {
  try {
    const currentScores = getHighScores();
    
    // Add new score
    const newScore = {
      ...scoreData,
      id: Date.now(), // Simple ID generation
      date: new Date().toISOString()
    };
    
    currentScores.push(newScore);
    
    // Sort by score (desc), then by date (latest first)
    currentScores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.date) - new Date(a.date);
    });
    
    // Keep only top 5
    const top5 = currentScores.slice(0, 5);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top5));
    return true;
  } catch (error) {
    console.error('Error saving score:', error);
    return false;
  }
}

/**
 * Clear all high scores
 */
export function clearHighScores() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing scores:', error);
    return false;
  }
}