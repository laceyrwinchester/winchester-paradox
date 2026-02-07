import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ItemManager from './ItemManager';
import SubscriberList from './SubscriberList';

type TabType = 'items' | 'subscribers';

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('items');

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="text-cyan-400 font-cinzel text-lg mb-8 px-4">
          Admin Panel
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('items')}
            className={`admin-nav-item ${activeTab === 'items' ? 'active' : ''}`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Items
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`admin-nav-item ${activeTab === 'subscribers' ? 'active' : ''}`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Subscribers
          </button>
          <button
            onClick={logout}
            className="admin-nav-item text-red-400 hover:text-red-300 mt-8"
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6 md:p-8 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'items' && <ItemManager />}
          {activeTab === 'subscribers' && <SubscriberList />}
        </motion.div>
      </main>
    </div>
  );
}
