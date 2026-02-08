import { motion } from 'framer-motion';

const variants = {
  read: { whileHover: { scale: 1.1 } },
  view: { whileHover: { opacity: 0.5 } },
  acquire: { whileHover: { rotateY: 180 } },
  all: { whileHover: { letterSpacing: "4px" } }
};

interface FilterButtonsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterButtons({ activeFilter, setActiveFilter }: FilterButtonsProps) {
  const categories = ['ALL', 'READ', 'VIEW', 'ACQUIRE'];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          {...(variants[cat.toLowerCase() as keyof typeof variants] || {})}
          className={`px-6 py-2 font-mono text-sm border-2 transition-all duration-300 ${
            activeFilter === cat 
            ? 'bg-cyan-400 text-black border-cyan-400' 
            : 'text-cyan-400 border-cyan-400/20 hover:border-cyan-400'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
