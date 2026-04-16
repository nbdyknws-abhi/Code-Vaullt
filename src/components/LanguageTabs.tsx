interface LanguageTabsProps {
  languages: ('python' | 'cpp' | 'java')[];
  selectedLanguage: 'python' | 'cpp' | 'java';
  onSelect: (lang: 'python' | 'cpp' | 'java') => void;
}

export default function LanguageTabs({ languages, selectedLanguage, onSelect }: LanguageTabsProps) {
  const displayName = {
    python: 'Python 3',
    cpp: 'C++',
    java: 'Java',
  };

  return (
    <div className="flex border-b border-slate-800 mb-6">
      {languages.map(lang => (
        <button
          key={lang}
          onClick={() => onSelect(lang)}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
            selectedLanguage === lang
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          {displayName[lang]}
        </button>
      ))}
    </div>
  );
}
