import { useMemo } from 'react';
import { problemsList } from '@/data/problems';
import { useProblems } from '@/hooks/useProblems';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import ProblemCard from '@/components/ProblemCard';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    searchQuery, setSearchQuery,
    selectedTopic, setSelectedTopic,
    selectedDifficulty, setSelectedDifficulty,
    filteredProblems
  } = useProblems(problemsList);

  const topics = useMemo(() => {
    const topicSet = new Set(problemsList.map(p => p.topic));
    return Array.from(topicSet).sort();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-500/10 p-4 rounded-full mb-6"
        >
          <Code2 className="w-12 h-12 text-blue-500" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        >
          Master Data Structures<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">& Algorithms</span>
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-400 max-w-2xl"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        >
          Explore 100 curated coding problems strictly categorized to help you prepare for technical interviews. Solutions provided in Python, C++, and Java.
        </motion.p>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <FilterBar 
        topics={topics}
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />

      <div className="mb-8 flex items-center justify-between pointer-events-none">
        <p className="text-slate-400 text-sm">Showing {filteredProblems.length} problems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProblems.map((problem, i) => (
          <ProblemCard key={problem.id} problem={problem} index={i} />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No problems found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedTopic(null); setSelectedDifficulty(null); }}
            className="mt-4 text-blue-500 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
