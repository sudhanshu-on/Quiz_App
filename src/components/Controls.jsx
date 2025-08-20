import { motion } from 'framer-motion';

function Controls({ canNext, canSkip, canPause, isPaused, onNext, onSkip, onTogglePause, onRestart }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {canNext && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="btn-primary"
        >
          Next Question →
        </motion.button>
      )}
      
      {canSkip && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSkip}
          className="btn-secondary"
        >
          Skip Question
        </motion.button>
      )}
      
      {canPause && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePause}
          className="btn-secondary"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </motion.button>
      )}
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="btn-secondary text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
      >
        🔄 Restart
      </motion.button>
    </div>
  );
}

export default Controls;