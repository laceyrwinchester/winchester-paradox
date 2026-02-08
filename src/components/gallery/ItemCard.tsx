import { motion } from 'framer-motion';

export default function ItemCard({ item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group border border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-4 bg-black/80 backdrop-blur-sm">
        <h3 className="font-cinzel text-white text-lg">{item.title}</h3>
        <p className="text-cyan-400 font-mono text-xs tracking-tighter opacity-70">
          [{item.category}]
        </p>
      </div>
    </motion.div>
  );
}
