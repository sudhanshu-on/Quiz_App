import { getScores } from '../utils/storage';

function Leaderboard() {
  const scores = getScores();

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {scores.length === 0 && <li>No scores yet.</li>}
        {scores.map((s, index) => (
          <li key={index} className="mb-2">
            {s.name} — {s.score}/{s.total} ({s.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
