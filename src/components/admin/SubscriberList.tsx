import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Users } from 'lucide-react';
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
        <h2 className="text-2xl font-cinzel text-white">Subscribers</h2>
        <div className="flex items-center gap-2 text-cyan-400">
          <Users className="w-5 h-5" />
          <span className="font-mono">{subscribers.length} frequencies</span>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-gray-500 font-mono">No subscribers yet</p>
          <p className="text-gray-600 text-sm mt-2">
            The void awaits its first signal...
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="font-mono">{subscriber.email}</td>
                  <td>{formatDate(subscriber.subscribedAt)}</td>
                  <td>
                    <button
                      onClick={() => setShowDeleteConfirm(subscriber.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="glass-card p-6 max-w-sm w-full"
          >
            <h3 className="font-cinzel text-lg text-white mb-4">Remove Subscriber</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to remove this subscriber?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="btn-cosmic bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
              >
                Remove
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="filter-btn"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
