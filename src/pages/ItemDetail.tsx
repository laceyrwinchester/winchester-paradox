import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ExternalLink } from 'lucide-react';
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
        <div className="text-cyan-400 font-mono loading-pulse">
          Loading artifact data...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-mono mb-4">Artifact not found</p>
          <button onClick={() => navigate('/gallery')} className="btn-cosmic">
            Return to Gallery
          </button>
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
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Collection
        </motion.button>

        {/* Item Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={`inline-block px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-4 ${typeClasses[item.type]}`}>
              {typeLabels[item.type]}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-cinzel text-white mb-4">{item.title}</h1>
            
            {item.price > 0 && (
              <p className="text-2xl font-mono text-yellow-400 mb-6">
                ${item.price.toFixed(2)}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              {(item.type === 'product' || item.type === 'art') && item.price > 0 && (
                <a
                  href={`https://stripe.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cosmic flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.type === 'art' ? 'Acquire' : 'Purchase'}
                </a>
              )}
            </div>

            {/* Content */}
            <div className="glass-card p-6">
              <h3 className="font-cinzel text-sm text-cyan-400 mb-4 uppercase tracking-wider">
                Description
              </h3>
              <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {item.content}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-6 pt-6 border-t border-cyan-400/10">
              <p className="text-gray-500 text-xs font-mono">
                <span className="text-cyan-400/60">ID:</span> {item.id}
              </p>
              <p className="text-gray-500 text-xs font-mono mt-1">
                <span className="text-cyan-400/60">Created:</span>{' '}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
