import { motion } from 'framer-motion';

type FilterType = 'all' | 'art' | 'article' | 'product';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'art', label: 'VIEW' },
  { value: 'article', label: 'READ' },
  { value: 'product', label: 'ACQUIRE' },
];

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}
