import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { useData, Item } from '../../context/DataContext';

const emptyItem: Omit<Item, 'id' | 'createdAt' | 'status'> = {
  title: '',
  type: 'art',
  content: '',
  price: 0,
  image: '',
};

export default function ItemManager() {
  const { items, addItem, updateItem, deleteItem, fetchItems } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyItem);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      await updateItem(editingId, formData);
    } else {
      await addItem(formData);
    }
    
    resetForm();
    fetchItems();
  };

  const handleEdit = (item: Item) => {
    setFormData({
      title: item.title,
      type: item.type,
      content: item.content,
      price: item.price,
      image: item.image,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setShowDeleteConfirm(null);
    fetchItems();
  };

  const resetForm = () => {
    setFormData(emptyItem);
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-cinzel text-white">Item Manager</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-cosmic flex items-center gap-2"
        >
          {isEditing ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isEditing ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="glass-card p-6 mb-8"
          >
            <h3 className="text-lg font-cinzel text-cyan-400 mb-4">
              {editingId ? 'Edit Artifact' : 'New Artifact'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
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
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Item['type'] })}
                  className="form-input"
                >
                  <option value="art">Art (VIEW)</option>
                  <option value="article">Article (READ)</option>
                  <option value="product">Product (ACQUIRE)</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="form-input"
                placeholder="https://..."
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="form-input"
              />
            </div>

            <div className="mb-6">
              <label className="form-label">Content / Description</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-input min-h-[120px] resize-y"
                required
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-cosmic flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="btn-cosmic opacity-70">
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="font-cinzel text-white">{item.title}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs uppercase ${
                    item.type === 'art' ? 'bg-purple-500/20 text-purple-400' :
                    item.type === 'article' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="text-yellow-400">
                  {item.price > 0 ? `$${item.price.toFixed(2)}` : 'FREE'}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-cyan-400/20 rounded text-cyan-400 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
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

      <AnimatePresence>
        {showDelete
