import { useState, useMemo } from 'react';
import { Problem, Difficulty } from '@/types/problem';

export function useProblems(initialProblems: Problem[]) {
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem('cv-search') || '');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => sessionStorage.getItem('cv-topic') || null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(() => (sessionStorage.getItem('cv-diff') as Difficulty) || null);

  // Sync to sessionStorage
  const updateSearch = (q: string) => { setSearchQuery(q); sessionStorage.setItem('cv-search', q); };
  const updateTopic = (t: string | null) => { setSelectedTopic(t); if(t) sessionStorage.setItem('cv-topic', t); else sessionStorage.removeItem('cv-topic'); };
  const updateDiff = (d: Difficulty | null) => { setSelectedDifficulty(d); if(d) sessionStorage.setItem('cv-diff', d); else sessionStorage.removeItem('cv-diff'); };

  const filteredProblems = useMemo(() => {
    return initialProblems.filter(problem => {
      const matchSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchTopic = selectedTopic ? problem.topic === selectedTopic : true;
      const matchDifficulty = selectedDifficulty ? problem.difficulty === selectedDifficulty : true;

      return matchSearch && matchTopic && matchDifficulty;
    });
  }, [initialProblems, searchQuery, selectedTopic, selectedDifficulty]);

  return {
    searchQuery,
    setSearchQuery: updateSearch,
    selectedTopic,
    setSelectedTopic: updateTopic,
    selectedDifficulty,
    setSelectedDifficulty: updateDiff,
    filteredProblems
  };
}
