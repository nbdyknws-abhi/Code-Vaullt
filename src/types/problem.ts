export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Solution {
  language: 'python' | 'cpp' | 'java';
  code: string;
  explanation: string[]; // Line-by-line or section-by-section explanation
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string; // unique slug e.g. "two-sum"
  title: string;
  difficulty: Difficulty;
  topic: string;
  tags: string[];
  prompt: string; // Markdown supported
  constraints: string[];
  examples: Example[];
  solutions: Solution[];
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  hints?: string[];
}
