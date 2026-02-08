import { motion } from 'framer-motion';

// Your custom "Paradox" animations
const variants = {
  read: { whileHover: { scale: 1.1 } },           // Grow
  view: { whileHover: { opacity: 0.5 } },         // Opaque/Transparent
  acquire: { whileHover: { rotateY: 180 } },      // Mirror Reverse
  all: { whileHover: { letterSpacing: "4px" } }   // Tech expansion
};

export default function FilterButtons({ activeFilter, setActiveFilter }) {
  const categories = ['ALL', 'READ', 'VIEW', 'ACQUIRE'];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          // This line connects the specific animation to the button name
          {...variants[cat.toLowerCase() as keyof typeof variants]}
          className={`px-6 py-2 font-mono text-sm border-2 transition-all duration-300 ${
            activeFilter === cat 
            ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.4)]' 
            : 'text-cyan-400 border-cyan-400/20 hover:border-cyan-400'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
