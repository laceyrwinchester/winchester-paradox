import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterButtons from '../components/gallery/FilterButtons';
import ItemCard from '../components/gallery/ItemCard';
import { useData } from '../context/DataContext';

type FilterType = 'all' | 'art' | 'article' | 'product';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { items, loading } = useData();

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item) => item.type === activeFilter);
  }, [items, activeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-cyan-400 font-mono"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading cosmic data...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="text-center py-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-cinzel text-white mb-4 glow-text"
        >
          The Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 font-mono mb-8"
        >
          Artifacts from the digital ether
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 font-mono">No artifacts found in this frequency</p>
              <motion.div
                className="mt-4 text-cyan-400/50 text-4xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="masonry-grid"
              layout
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ItemCard item={item} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
