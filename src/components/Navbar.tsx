import { Link } from 'react-router-dom';
import { Code2, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <Code2 className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">Code<span className="text-blue-500">Vault</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </div>
    </nav>
  );
}
