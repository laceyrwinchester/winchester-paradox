import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { useData, Item } from '../../context/DataContext';

// FIX: Properly type the empty item to allow all types
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

      {/* Add/Edit Form */}
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
              <label className="form-label
