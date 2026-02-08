import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check, Sparkles } from 'lucide-react';
import { Item, useData } from '../../context/DataContext';

interface ItemFormData {
  title: string;
  type: 'art' | 'article' | 'product';
  content: string;
  price: number;
  image: string;
}

const initialFormData: ItemFormData = {
  title: '',
  type: 'art',
  content: '',
  price: 0,
  image: '',
};

const typeClasses = {
  art: 'badge-art',
  article: 'badge-article',
  product: 'badge-product',
};

export default function ItemManager() {
  const { items, fetchItems, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItemFormData>(initialFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingId) {
      await updateItem(editingId, formData);
    } else {
      await addItem(formData);
    }
    
    resetForm();
  };

  const handleEdit = (item: Item) => {
    setFormData({
      title: item.title,
      type: item.type,
      content: item.content,
      price: item.price,
      image: item.image,
    });
    setIsEditing(true);
    setEditingId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setEditingId(null);
    setFormVisible(false);
  };

  const toggleForm = () => {
    if (formVisible) {
      resetForm();
    } else {
      setFormVisible(true);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl font-cinzel text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Item Manager
        </motion.h2>
        <motion.button
          onClick={toggleForm}
          className="btn-cosmic flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={formVisible ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="w-4 h-4" />
          </motion.div>
          {formVisible ? 'Cancel' : 'Add Item'}
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="glass-card p-6 mb-8 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-cinzel text-lg text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {editingId ? 'Edit Artifact' : 'New Artifact'}
              </h3>
              <motion.button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Title</label>
                  <motion.input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="form-label">Type</label>
                  <motion.select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="form-input"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="art">Art (VIEW)</option>
                    <option value="article">Article (READ)</option>
                    <option value="product">Product (ACQUIRE)</option>
                  </motion.select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price ($)</label>
                  <motion.input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="form-label">Image URL</label>
                  <motion.input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Content / Description</label>
                <motion.textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-input min-h-[120px]"
                  rows={5}
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div className="flex gap-4">
                <motion.button 
                  type="submit" 
                  className="btn-cosmic flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="w-4 h-4" />
                  {editingId ? 'Update' : 'Create'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetForm}
                  className="filter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items Table */}
      <motion.div 
        className="glass-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.05)' }}
                >
                  <td className="font-cinzel">{item.title}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${typeClasses[item.type]}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="font-mono">
                    {item.price > 0 ? (
                      <motion.span
                        animate={{ 
                          color: ['#ffd700', '#ffed4a', '#ffd700']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ${item.price.toFixed(2)}
                      </motion.span>
                    ) : (
                      'Free'
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-colors"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => setShowDeleteConfirm(item.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-8 text-center text-gray-500 font-mono">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              No artifacts in the void...
            </motion.div>
          </div>
        )}
      </motion.div>

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
              className="glass-card p-6 max-w-sm w-full border-red-500/30"
            >
              <div className="flex items-center gap-2 mb-4 text-red-400">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <h3 className="font-cinzel text-lg">Confirm Deletion</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 font-mono">
                Are you sure you want to delete this artifact? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="btn-cosmic bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
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
