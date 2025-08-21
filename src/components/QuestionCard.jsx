import { motion } from "framer-motion";
import TimerBar from "./TimerBar"; // make sure path is correct

export default function QuestionCard({ question, onAnswer, duration, onTimeUp, questionKey }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
      <div className="w-full max-w-2xl">
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid gap-4 mt-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(option)}
              className="bg-gray-100 hover:bg-blue-100 transition-colors duration-200 rounded-xl p-4 text-left shadow-md focus:outline-none"
            >
              <span className="font-medium text-gray-700">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
