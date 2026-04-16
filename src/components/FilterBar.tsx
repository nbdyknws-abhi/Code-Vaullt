import { Difficulty } from '@/types/problem';

interface FilterBarProps {
  topics: string[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string | null) => void;
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (diff: Difficulty | null) => void;
}

export default function FilterBar({
  topics,
  selectedTopic,
  onSelectTopic,
  selectedDifficulty,
  onSelectDifficulty
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Topic Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-400 font-medium mr-2">Topic:</span>
        <button
          onClick={() => onSelectTopic(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedTopic === null ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTopic === topic ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-400 font-medium mr-2">Difficulty:</span>
        <button
          onClick={() => onSelectDifficulty(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedDifficulty === null ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(diff => (
          <button
            key={diff}
            onClick={() => onSelectDifficulty(diff)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedDifficulty === diff ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );
}
