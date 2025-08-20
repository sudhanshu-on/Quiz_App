export default function QuestionCard({ question, onAnswer }) {
  if (!question) return null;

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            className="btn w-full"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
