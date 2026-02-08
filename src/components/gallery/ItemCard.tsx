import { motion } from 'framer-motion';

interface ItemProps {
  item: {
    id: number;
    title: string;
    category: string;
    img: string;
  };
}

export default function ItemCard({ item }: ItemProps) {
  return (
    <motion.div
      layout
      className="relative group border border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="aspect-square">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-cinzel text-white">{item.title}</h3>
        <p className="text-cyan-400 font-mono text-xs">[{item.category}]</p>
      </div>
    </motion.div>
  );
}
