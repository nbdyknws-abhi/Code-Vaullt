import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, Code2, X } from 'lucide-react';
import { problemsList } from '../data/problems';
import { Problem } from '../types/problem';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export default function Sidebar({ className = '', onClose }: SidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const groupedProblems = useMemo(() => {
    const groups: Record<string, Problem[]> = {};
    problemsList.forEach((prob) => {
      if (!groups[prob.topic]) groups[prob.topic] = [];
      groups[prob.topic].push(prob);
    });
    return groups;
  }, []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedProblems;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, Problem[]> = {};
    
    Object.entries(groupedProblems).forEach(([topic, problems]) => {
      const matchingProblems = problems.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.id.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
      
      if (matchingProblems.length > 0) {
        filtered[topic] = matchingProblems;
      }
    });
    
    return filtered;
  }, [searchQuery, groupedProblems]);

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const currentProblemId = location.pathname.startsWith('/problems/') 
    ? location.pathname.split('/')[2] 
    : null;

  return (
    <div className={`flex flex-col h-full bg-slate-950/50 backdrop-blur-xl border-r border-white/10 ${className}`}>
      {/* Header - Mobile Only Close */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-white">Navigation</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {Object.entries(filteredGroups).map(([topic, problems]) => {
          const isExpanded = expandedTopics[topic] || searchQuery.length > 0;
          const hasActiveChild = problems.some(p => p.id === currentProblemId);

          return (
            <div key={topic} className="space-y-1">
              <button
                onClick={() => toggleTopic(topic)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors ${
                  hasActiveChild ? 'text-blue-400 bg-blue-500/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate">{topic}</span>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full text-slate-400">
                    {problems.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 space-y-0.5 border-l border-white/5 pl-2 py-1">
                  {problems.map((prob) => {
                    const isActive = prob.id === currentProblemId;
                    return (
                      <Link
                        key={prob.id}
                        to={`/problems/${prob.id}`}
                        onClick={onClose}
                        className={`block p-2 rounded-md text-xs transition-colors ${
                          isActive
                            ? 'text-white bg-blue-500/20 font-medium'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {prob.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
