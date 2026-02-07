import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
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
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-cinzel text-white">Item Manager</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-cosmic flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-cinzel text-lg text-white">
                {editingId ? 'Edit Item' : 'New Item'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="art">Art</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-input min-h-[120px]"
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-cosmic flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="filter-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items Table */}
      <div className="glass-card overflow-hidden">
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${typeClasses[item.type]}`}>
                    {item.type}
                  </span>
                </td>
                <td>{item.price > 0 ? `$${item.price.toFixed(2)}` : 'Free'}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(item.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-6 max-w-sm w-full"
            >
              <h3 className="font-cinzel text-lg text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="btn-cosmic bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                >
                  Delete
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
      </AnimatePresence>
    </div>
  );
}
