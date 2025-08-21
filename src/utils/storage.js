// utils/storage.js

// Save a new score to local storage
export function saveScore(scoreObj) {
  try {
    // Get existing scores from local storage
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];

    // Add the new score
    scores.push(scoreObj);

    // Save back to local storage
    localStorage.setItem('quizScores', JSON.stringify(scores));

    return true; // success
  } catch (err) {
    console.error('Failed to save score', err);
    return false;
  }
}

// Get all scores from local storage
export function getScores() {
  try {
    return JSON.parse(localStorage.getItem('quizScores')) || [];
  } catch (err) {
    console.error('Failed to get scores', err);
    return [];
  }
}

// Optional: Clear all scores
export function clearScores() {
  localStorage.removeItem('quizScores');
}
