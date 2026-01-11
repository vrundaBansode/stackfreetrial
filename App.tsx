
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
  
  // Lifted state from ErrorInput
  const [errorText, setErrorText] = useState('');
  const [language, setLanguage] = useState<Language>('Auto-detect');
  const [framework, setFramework] = useState<Framework>('Auto-detect');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

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

      // Auto-populate dropdowns if they were set to Auto-detect
      if (language === 'Auto-detect') {
        // Simple normalization check - if the returned string is in our set, select it.
        // This makes the UI feel "intelligent" by filling in the blanks.
        const detectedL = result.detectedLanguage as any;
        setLanguage(detectedL);
        setIsAutoDetected(true);
      }
      if (framework === 'Auto-detect') {
        const detectedF = result.detectedFramework as any;
        setFramework(detectedF);
        setIsAutoDetected(true);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to analyze the error. Please check your API key or connection.");
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
          Intelligent Debugging Assistance • Built with Gemini 2.5
        </p>
      </footer>
    </div>
  );
};

export default App;
