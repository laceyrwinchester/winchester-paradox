import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Users, Sparkles, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SubscriberList() {
  const { subscribers, fetchSubscribers, deleteSubscriber } = useData();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleDelete = async (id: string) => {
    await deleteSubscriber(id);
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl font-cinzel text-white flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Users className="w-6 h-6 text-cyan-400" />
          </motion.div>
          Subscribers
        </motion.h2>
        <motion.div 
          className="flex items-center gap-2 text-cyan-400 glass-card px-4 py-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="w-4 h-4" />
          </motion.div>
          <span className="font-mono text-sm">{subscribers.length} frequencies</span>
        </motion.div>
      </div>

      {subscribers.length === 0 ? (
        <motion.div 
          className="glass-card p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✦
          </motion.div>
          <p className="text-gray-500 font-mono">No subscribers yet</p>
          <p className="text-gray-600 text-sm mt-2 font-mono">
            The void awaits its first signal...
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {subscribers.map((subscriber, index) => (
                  <motion.tr
                    key={subscriber.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.05)' }}
                  >
                    <td className="font-mono text-cyan-400/80">{subscriber.email}</td>
                    <td className="text-gray-400">{formatDate(subscriber.subscribedAt)}</td>
                    <td>
                      <motion.button
                        onClick={() => setShowDeleteConfirm(subscriber.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-6 max-w-sm w-full"
            >
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <h3 className="font-cinzel text-lg">Remove Subscriber</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 font-mono">
                Remove this frequency from the protocol?
              </p>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="btn-cosmic bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
                <motion.button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="filter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
