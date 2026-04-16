import { Difficulty } from '@/types/problem';

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colors = {
    Easy: 'bg-green-500/10 text-green-400 border border-green-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
}
