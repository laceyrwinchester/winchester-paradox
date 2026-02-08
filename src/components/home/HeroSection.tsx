import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToTerminal = () => {
    document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title glow-text font-cinzel font-bold animate-breathe">
            Winchester Paradox
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-400 font-mono text-sm md:text-base mb-12 tracking-[0.2em] uppercase"
        >
          Where Ancient Wisdom Meets Digital Consciousness
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={scrollToTerminal}
            className="text-cyan-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.5, 1, 0.5],
          y: [0, -20, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-3 h-3 bg-purple-500 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.8, 0.3],
          x: [0, 15, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-400 rounded-full"
        animate={{ 
          scale: [1, 2, 1], 
          opacity: [0.4, 1, 0.4],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full"
        animate={{ 
          scale: [1, 1.8, 1], 
          opacity: [0.3, 0.9, 0.3],
          y: [0, 30, 0],
          x: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </section>
  );
}
