
import React from 'react';
import { motion } from 'framer-motion';
import { ErrorExplanation } from '../types';

interface OutputSectionProps {
  explanation: ErrorExplanation;
}

const OutputSection: React.FC<OutputSectionProps> = ({ explanation }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20"
    >
      {/* Detection Badge Bar */}
      <motion.div 
        variants={item}
        className="col-span-1 md:col-span-2 flex justify-center gap-3 mb-2"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest shadow-sm">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Detected Language: {explanation.detectedLanguage}
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Framework: {explanation.detectedFramework}
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        whileHover={{ scale: 1.01 }}
        className="col-span-1 md:col-span-2 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all"
      >
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Meaning</h3>
        <p className="text-xl text-gray-800 leading-relaxed font-medium">
          {explanation.meaning}
        </p>
      </motion.div>

      <motion.div 
        variants={item}
        whileHover={{ scale: 1.01 }}
        className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all"
      >
        <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Likely Causes</h3>
        <ul className="space-y-3">
          {explanation.likelyCauses.map((cause, i) => (
            <li key={i} className="flex gap-3 text-gray-600">
              <span className="text-red-400 font-bold">•</span>
              {cause}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        variants={item}
        whileHover={{ scale: 1.01 }}
        className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all"
      >
        <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-4">Check First</h3>
        <ul className="space-y-3">
          {explanation.checkFirst.map((check, i) => (
            <li key={i} className="flex gap-3 text-gray-600">
              <span className="text-yellow-400 font-bold">•</span>
              {check}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        variants={item}
        whileHover={{ scale: 1.01 }}
        className="col-span-1 md:col-span-2 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all"
      >
        <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-4">Common Fixes</h3>
        <div className="space-y-4">
          {explanation.commonFixes.map((fix, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-gray-700 text-sm whitespace-pre-wrap font-mono">{fix}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OutputSection;
