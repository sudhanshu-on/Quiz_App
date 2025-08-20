import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function TimerBar({ timeLeft, totalTime, isPaused, isActive, onTimeout, onTimeUpdate }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      clearInterval(intervalRef.current);
      return;
    }

    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      onTimeUpdate(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          clearInterval(intervalRef.current);
          onTimeout();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, onTimeout, onTimeUpdate]);

  const progressPercentage = (timeLeft / totalTime) * 100;
  const isWarning = timeLeft <= 3;
  const isCritical = timeLeft <= 1;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <motion.div
          key={timeLeft}
          initial={{ scale: 1 }}
          animate={{ 
            scale: isCritical ? [1, 1.2, 1] : 1,
            color: isCritical ? '#dc2626' : isWarning ? '#f59e0b' : '#dc2626'
          }}
          transition={{ duration: isCritical ? 0.5 : 0.2 }}
          className="text-4xl font-bold"
          aria-live="polite"
          role="timer"
          aria-label={`Time remaining: ${timeLeft} seconds`}
        >
          {timeLeft}s
        </motion.div>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
          >
            Paused
          </motion.div>
        )}
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isCritical 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : isWarning 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-green-500 to-blue-500'
            }`}
            style={{ 
              width: `${Math.max(0, progressPercentage)}%`,
              transition: isPaused ? 'none' : 'width 1s linear'
            }}
            animate={{
              boxShadow: isCritical 
                ? ['0 0 0 rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.6)', '0 0 0 rgba(239, 68, 68, 0)']
                : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            transition={{
              boxShadow: {
                duration: 1,
                repeat: isCritical ? Infinity : 0,
                ease: 'easeInOut'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TimerBar;