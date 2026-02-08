import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Users, LogOut, Sparkles } from 'lucide-react';
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
        <motion.div 
          className="text-cyan-400 font-cinzel text-lg mb-8 px-4 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          Admin Panel
        </motion.div>
        
        <nav className="space-y-2">
          <motion.button
            onClick={() => setActiveTab('items')}
            className={`admin-nav-item ${activeTab === 'items' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="inline-flex"
              animate={activeTab === 'items' ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Package className="w-4 h-4 inline mr-2" />
            </motion.div>
            Items
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab('subscribers')}
            className={`admin-nav-item ${activeTab === 'subscribers' ? 'active' : ''}`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="inline-flex"
              animate={activeTab === 'subscribers' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Users className="w-4 h-4 inline mr-2" />
            </motion.div>
            Subscribers
          </motion.button>
          
          <motion.button
            onClick={logout}
            className="admin-nav-item text-red-400 hover:text-red-300 mt-8"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            Logout
          </motion.button>
        </nav>

        {/* Decorative element */}
        <motion.div
          className="absolute bottom-8 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </aside>

      {/* Main Content */}
      <main className="p-6 md:p-8 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'items' && <ItemManager />}
          {activeTab === 'subscribers' && <SubscriberList />}
        </motion.div>
      </main>
    </div>
  );
}
