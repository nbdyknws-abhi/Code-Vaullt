import { Clock, HardDrive, AlertTriangle } from 'lucide-react';

interface ComplexityPanelProps {
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
}

export default function ComplexityPanel({ timeComplexity, spaceComplexity, edgeCases }: ComplexityPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Time Complexity</p>
          <p className="text-lg font-mono font-medium text-slate-200">{timeComplexity}</p>
        </div>
      </div>
      
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="p-3 bg-fuchsia-500/10 text-fuchsia-400 rounded-lg">
          <HardDrive className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Space Complexity</p>
          <p className="text-lg font-mono font-medium text-slate-200">{spaceComplexity}</p>
        </div>
      </div>

      {edgeCases && edgeCases.length > 0 && (
        <div className="glass-card p-4 md:col-span-2 mt-2">
          <div className="flex items-center gap-2 mb-3 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-medium">Edge Cases to Consider</h4>
          </div>
          <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
            {edgeCases.map((ec, idx) => (
              <li key={idx}>{ec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
