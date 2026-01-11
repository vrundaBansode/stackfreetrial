
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }}
      className="text-center py-12 px-4"
    >
      <motion.h1 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
      >
        Understand your error. <span className="text-blue-600">Instantly.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg text-gray-600 font-medium"
      >
        Paste it. We'll explain it like a human would.
      </motion.p>
    </motion.header>
  );
};

export default Header;
