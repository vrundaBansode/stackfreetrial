
import React, { useState } from 'react';
import Header from './components/Header';
import ErrorInput from './components/ErrorInput';
import OutputSection from './components/OutputSection';
import CursorTrail from './components/CursorTrail';
import { explainError } from './services/geminiService';
import { ErrorExplanation, Language, Framework } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<ErrorExplanation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [errorText, setErrorText] = useState('');
  const [language, setLanguage] = useState<Language>('Auto-detect');
  const [framework, setFramework] = useState<Framework>('Auto-detect');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  // Lists for validation/normalization
  const languages: Language[] = [
    'Auto-detect', 'JavaScript', 'TypeScript', 'Python', 'Java', 
    'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 
    'Kotlin', 'Dart', 'Shell', 'SQL', 'Assembly', 'Haskell',
    'Scala', 'R', 'MATLAB', 'Objective-C', 'Perl', 'Other'
  ];

  const frameworks: Framework[] = [
    'Auto-detect', 'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 
    'Express', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 
    'Laravel', 'Ruby on Rails', 'Flutter', 'React Native', 'Nuxt', 
    'SolidJS', 'Remix', 'Electron', 'Ionic', 'None'
  ];

  const handleExplain = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setExplanation(null);
    setIsAutoDetected(false);
    
    try {
      const result = await explainError({ 
        errorText, 
        context: { language, framework } 
      });
      
      setExplanation(result);

      // Robust Auto-population logic
      if (language === 'Auto-detect') {
        const detectedL = result.detectedLanguage;
        const matchedL = languages.find(l => l.toLowerCase() === detectedL.toLowerCase());
        if (matchedL) {
          setLanguage(matchedL);
          setIsAutoDetected(true);
        } else {
          setLanguage('Other');
          setIsAutoDetected(true);
        }
      }

      if (framework === 'Auto-detect') {
        const detectedF = result.detectedFramework;
        const matchedF = frameworks.find(f => f.toLowerCase() === detectedF.toLowerCase());
        if (matchedF) {
          setFramework(matchedF);
          setIsAutoDetected(true);
        } else {
          setFramework('None');
          setIsAutoDetected(true);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to analyze the error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20">
      <CursorTrail />
      
      <main className="container mx-auto">
        <Header />
        
        <ErrorInput 
          onExplain={handleExplain} 
          isLoading={isLoading} 
          errorText={errorText}
          setErrorText={setErrorText}
          language={language}
          setLanguage={(l) => { setLanguage(l); setIsAutoDetected(false); }}
          framework={framework}
          setFramework={(f) => { setFramework(f); setIsAutoDetected(false); }}
          isAutoDetected={isAutoDetected}
        />

        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {explanation && (
            <OutputSection explanation={explanation} />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 w-full py-4 text-center bg-white/80 backdrop-blur-sm border-t border-gray-100 z-50">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          Intelligent Debugging Assistance • Powered by Gemini 3 Flash
        </p>
      </footer>
    </div>
  );
};

export default App;
