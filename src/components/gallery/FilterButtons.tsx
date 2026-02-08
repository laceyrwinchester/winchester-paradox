import { motion } from 'framer-motion';

type FilterType = 'all' | 'art' | 'article' | 'product';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string; color: string }[] = [
  { value: 'all', label: 'ALL', color: '#00d4ff' },
  { value: 'art', label: 'VIEW', color: '#c77dff' },
  { value: 'article', label: 'READ', color: '#00d4ff' },
  { value: 'product', label: 'ACQUIRE', color: '#ffd700' },
];

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {filters.map((filter, index) => (
        <motion.button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 20px ${filter.color}40`
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.span
            animate={activeFilter === filter.value ? {
              textShadow: [
                `0 0 5px ${filter.color}`,
                `0 0 15px ${filter.color}`,
                `0 0 5px ${filter.color}`
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {filter.label}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}
