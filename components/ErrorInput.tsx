
import React from 'react';
import { motion } from 'framer-motion';
import { Language, Framework } from '../types';

interface ErrorInputProps {
  onExplain: () => void;
  isLoading: boolean;
  errorText: string;
  setErrorText: (val: string) => void;
  language: Language;
  setLanguage: (val: Language) => void;
  framework: Framework;
  setFramework: (val: Framework) => void;
  isAutoDetected: boolean;
}

const languages: Language[] = [
  'Auto-detect', 'JavaScript', 'TypeScript', 'Python', 'Java', 
  'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 
  'Kotlin', 'Dart', 'Shell', 'SQL', 'Other'
];

const frameworks: Framework[] = [
  'Auto-detect', 'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 
  'Express', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 
  'Laravel', 'Ruby on Rails', 'Flutter', 'React Native', 'None'
];

const ErrorInput: React.FC<ErrorInputProps> = ({ 
  onExplain, 
  isLoading, 
  errorText, 
  setErrorText,
  language,
  setLanguage,
  framework,
  setFramework,
  isAutoDetected
}) => {

  const handleSubmit = () => {
    if (!errorText.trim()) return;
    onExplain();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto px-4 space-y-6"
    >
      <div className="relative group">
        <motion.textarea
          whileFocus={{ scale: 1.005 }}
          value={errorText}
          onChange={(e) => setErrorText(e.target.value)}
          placeholder="Paste your stack trace or error message here..."
          className="w-full h-64 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 resize-none font-mono text-sm leading-relaxed group-hover:shadow-md"
        />
        {errorText.length > 0 && (
          <button 
            onClick={() => setErrorText('')}
            className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
            Language {isAutoDetected && language !== 'Auto-detect' && <span className="text-blue-500 animate-pulse">✨</span>}
          </label>
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className={`w-full p-3 bg-white border rounded-xl shadow-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer ${isAutoDetected && language !== 'Auto-detect' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
            Framework {isAutoDetected && framework !== 'Auto-detect' && <span className="text-blue-500 animate-pulse">✨</span>}
          </label>
          <div className="relative">
            <select 
              value={framework}
              onChange={(e) => setFramework(e.target.value as Framework)}
              className={`w-full p-3 bg-white border rounded-xl shadow-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer ${isAutoDetected && framework !== 'Auto-detect' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}
            >
              {frameworks.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!errorText.trim() || isLoading}
          onClick={handleSubmit}
          className={`
            px-12 py-4 rounded-full font-bold text-white shadow-lg transition-all
            ${!errorText.trim() || isLoading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </div>
          ) : "Explain error"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorInput;
