import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { allProblems } from '@/data/problems';
import { ChevronLeft } from 'lucide-react';
import DifficultyBadge from '@/components/DifficultyBadge';
import LanguageTabs from '@/components/LanguageTabs';
import CodeBlock from '@/components/CodeBlock';
import ComplexityPanel from '@/components/ComplexityPanel';

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const problem = id ? allProblems[id] : undefined;
  
  const [lang, setLang] = useState<'python' | 'cpp' | 'java'>('python');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
        <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
    );
  }

  const solution = problem.solutions.find((s: any) => s.language === lang) || problem.solutions[0];

  return (
    <div className="flex flex-col">
      <div className="border-b border-white/10 bg-slate-900/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Problems
          </Link>
          <div className="w-px h-6 bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-slate-200">{problem.title}</h1>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Problem Description */}
        <div className="glass-card p-6 overflow-y-auto max-h-[calc(100vh-12rem)] min-h-[500px] fancy-scrollbar">
          <div className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-headings:text-slate-200 prose-a:text-blue-400">
            <div className="whitespace-pre-wrap text-slate-300">
              {problem.prompt}
            </div>

            <h3 className="text-xl font-semibold mt-8 text-slate-200">Examples</h3>
            <div className="space-y-6 mt-4">
              {problem.examples.map((ex: any, i: number) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                  <p className="font-mono text-sm"><span className="text-slate-500 select-none">Input: </span><span className="text-slate-300">{ex.input}</span></p>
                  <p className="font-mono text-sm mt-2"><span className="text-slate-500 select-none">Output: </span><span className="text-emerald-400">{ex.output}</span></p>
                  {ex.explanation && (
                    <p className="text-sm text-slate-400 mt-3 pt-3 border-t border-slate-800/50">
                      <span className="font-medium text-slate-300">Explanation:</span> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-8 text-slate-200">Constraints</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              {problem.constraints.map((c: string, i: number) => (
                <li key={i}><code className="px-1 py-0.5 rounded bg-black/30 font-mono text-sm text-amber-200">{c}</code></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code & Solutions */}
        <div className="flex flex-col h-full">
          <LanguageTabs
            languages={['python', 'cpp', 'java']}
            selectedLanguage={lang}
            onSelect={setLang}
          />

          <CodeBlock language={solution.language} code={solution.code} />

          <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-slate-200 mb-4">Approach & Reasoning</h4>
            <div className="space-y-3">
              {solution.explanation.map((step: string, idx: number) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-300">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <ComplexityPanel
            timeComplexity={problem.timeComplexity}
            spaceComplexity={problem.spaceComplexity}
            edgeCases={problem.edgeCases}
          />
        </div>
      </div>
    </div>
  );
}
