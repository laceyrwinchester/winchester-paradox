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

// Different hover effects based on item type
const getHoverClass = (type: string) => {
  switch (type) {
    case 'art':
      return 'mirror-realm'; // Flips horizontally
    case 'article':
      return 'void-reveal'; // Fades and shows dashed border
    case 'product':
      return 'treasure-glow'; // Gold glow
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
      className={`glass-card item-card ${hoverClass} overflow-hidden cursor-pointer`}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="item-card-image transition-transform duration-500"
        />
        <div className="item-card-overlay">
          <span className={`item-card-type ${typeClasses[item.type]}`}>
            {typeLabels[item.type]}
          </span>
          <h3 className="item-card-title font-cinzel">{item.title}</h3>
          {item.price > 0 && (
            <p className="item-card-price">${item.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
