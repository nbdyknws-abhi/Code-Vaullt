import { Link } from 'react-router-dom';
import { CheckCircle, Heart } from 'lucide-react';
import { Problem } from '@/types/problem';
import DifficultyBadge from './DifficultyBadge';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';

export default function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const { isFavorite, isSolved, toggleFavorite } = useUser();
  const solved = isSolved(problem.id);
  const favorite = isFavorite(problem.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/problems/${problem.id}`} className="block h-full cursor-pointer">
        <div className="glass-card p-5 h-full flex flex-col justify-between group">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                {problem.title}
              </h3>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(problem.id);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    favorite ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                </button>
                {solved && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <DifficultyBadge difficulty={problem.difficulty} />
            <span className="text-xs text-slate-400 font-medium px-2 py-0.5 bg-slate-800/50 rounded-md truncate">
              {problem.topic}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
