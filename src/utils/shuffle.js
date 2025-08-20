/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array
 */
export function shuffle(array) {
  const newArray = [...array];
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

/**
 * Shuffle questions and their options
 * @param {Array} questions - Array of question objects
 * @returns {Array} - Shuffled questions with shuffled options
 */
export function shuffleQuestions(questions) {
  // First shuffle the questions
  const shuffledQuestions = shuffle(questions);
  
  // Then shuffle options for each question while maintaining correct answer
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctAnswer = originalOptions[question.answerIndex];
    
    // Shuffle the options
    const shuffledOptions = shuffle(originalOptions);
    
    // Find new index of correct answer
    const newAnswerIndex = shuffledOptions.findIndex(option => option === correctAnswer);
    
    return {
      ...question,
      options: shuffledOptions,
      answerIndex: newAnswerIndex
    };
  });
}