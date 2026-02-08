import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Item } from '../../context/DataContext';

interface ItemCardProps {
  item: Item;
  index: number;
}

const typeLabels = {
  art: 'ART',
  article: 'READ',
  product: 'ACQUIRE',
};

const typeClasses = {
  art: 'badge-art',
  article: 'badge-article',
  product: 'badge-product',
};

// MAGICAL HOVER EFFECTS based on item type
const getHoverClass = (type: string) => {
  switch (type) {
    case 'art':
      return 'mirror-realm'; // Flips horizontally + 3D tilt
    case 'article':
      return 'void-reveal'; // Fades + dashed border
    case 'product':
      return 'treasure-glow'; // Gold glow + shimmer
    default:
      return '';
  }
};

export default function ItemCard({ item, index }: ItemCardProps) {
  const navigate = useNavigate();
  const hoverClass = getHoverClass(item.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/item/${item.id}`)}
      className={`glass-card item-card ${hoverClass} overflow-hidden cursor-pointer group`}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden">
        {/* Glitch effect overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 z-10 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.img
          src={item.image}
          alt={item.title}
          className="item-card-image w-full aspect-[4/3] object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Type-specific overlay effects */}
        {item.type === 'art' && (
          <motion.div
            className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
        
        {item.type === 'product' && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(255,215,0,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="item-card-overlay">
          <motion.span 
            className={`item-card-type ${typeClasses[item.type]}`}
            whileHover={{ scale: 1.1 }}
          >
            {typeLabels[item.type]}
          </motion.span>
          <h3 className="item-card-title font-cinzel group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          {item.price > 0 && (
            <motion.p 
              className="item-card-price"
              animate={item.type === 'product' ? {
                textShadow: [
                  '0 0 5px rgba(255,215,0,0.5)',
                  '0 0 15px rgba(255,215,0,0.8)',
                  '0 0 5px rgba(255,215,0,0.5)',
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ${item.price.toFixed(2)}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
