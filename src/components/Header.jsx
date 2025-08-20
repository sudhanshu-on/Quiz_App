import { motion } from 'framer-motion';

function Header({ currentQuestion, totalQuestions, score }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            🧠 Quiz App
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm"
            >
              Question {currentQuestion} / {totalQuestions}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              aria-label={`Current score: ${score}`}
            >
              {score}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;