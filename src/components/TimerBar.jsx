import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function TimerBar({ duration, onTimeUp, questionKey }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const controls = useAnimation();

  useEffect(() => {
    setTimeLeft(duration);

    // Reset animation on new question
    controls.set({ width: "100%" });
    controls.start({
      width: "0%",
      transition: { duration: duration, ease: "linear" },
    });

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimeUp, controls, questionKey]); // restart on new question

  const getColor = () => {
    const ratio = timeLeft / duration;
    if (ratio > 0.5) return "bg-green-500";
    if (ratio > 0.25) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden shadow-inner">
      <motion.div
        className={`${getColor()} h-full`}
        animate={controls}
      />
    </div>
  );
}
