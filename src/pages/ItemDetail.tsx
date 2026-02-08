import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Item } from '../context/DataContext';

const API_URL = '/api';

const typeLabels = {
  art: 'DIGITAL ART',
  article: 'ANCIENT TEXT',
  product: 'ARTIFACT',
};

const typeClasses = {
  art: 'badge-art',
  article: 'badge-article',
  product: 'badge-product',
};

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageHovered, setImageHovered] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-cyan-400 font-mono"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading artifact data...
        </motion.div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            ✦
          </motion.div>
          <p className="text-gray-400 font-mono mb-4">Artifact not found</p>
          <motion.button 
            onClick={() => navigate('/gallery')} 
            className="btn-cosmic"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Gallery
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 font-mono text-sm group"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:animate-pulse" />
          Return to Collection
        </motion.button>

        {/* Item Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image with magical hover effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <motion.div
              className="relative overflow-hidden rounded-xl border border-cyan-400/20"
              whileHover={{ borderColor: 'rgba(0, 212, 255, 0.5)' }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full"
                animate={{
                  scale: imageHovered ? 1.1 : 1,
                  filter: imageHovered ? 'brightness(1.1)' : 'brightness(1)'
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Magical overlay effects */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: imageHovered ? [
                    'linear-gradient(45deg, transparent 30%, rgba(0,212,255,0.1) 50%, transparent 70%)',
                    'linear-gradient(45deg, transparent 70%, rgba(0,212,255,0.1) 90%, transparent 100%)',
                  ] : 'transparent'
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating particles on hover */}
              {imageHovered && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      initial={{ 
                        opacity: 0,
                        x: Math.random() * 100 + '%',
                        y: '100%'
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: '-100%'
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-4 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(0,212,255,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className={`inline-block px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-4 ${typeClasses[item.type]}`}
              whileHover={{ scale: 1.05 }}
            >
              {typeLabels[item.type]}
            </motion.span>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-cinzel text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {item.title}
            </motion.h1>
            
            {item.price > 0 && (
              <motion.p 
                className="text-2xl font-mono text-yellow-400 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255,215,0,0.5)',
                      '0 0 20px rgba(255,215,0,0.8)',
                      '0 0 10px rgba(255,215,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ${item.price.toFixed(2)}
                </motion.span>
              </motion.p>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {(item.type === 'product' || item.type === 'art') && item.price > 0 && (
                <motion.a
                  href="https://stripe.com "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cosmic flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0,212,255,0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.type === 'art' ? 'Acquire' : 'Purchase'}
                </motion.a>
              )}
              
              <motion.button
                className="filter-btn flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Sparkles className="w-4 h-4" />
                Share
              </motion.button>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-cinzel text-sm text-cyan-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.span>
                Description
              </h3>
              <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {item.content}
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div 
              className="mt-6 pt-6 border-t border-cyan-400/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-gray-500 text-xs font-mono">
                <span className="text-cyan-400/60">ID:</span> {item.id}
              </p>
              <p className="text-gray-500 text-xs font-mono mt-1">
                <span className="text-cyan-400/60">Created:</span>{' '}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
