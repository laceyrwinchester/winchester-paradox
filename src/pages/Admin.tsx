import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    
    if (!success) {
      setError('Invalid credentials. Access denied.');
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-8 md:p-12 w-full max-w-md relative overflow-hidden"
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
          animate={{
            boxShadow: [
              'inset 0 0 20px rgba(0,212,255,0.1)',
              'inset 0 0 40px rgba(0,212,255,0.3)',
              'inset 0 0 20px rgba(0,212,255,0.1)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="text-center mb-8 relative z-10">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-400/10 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(0,212,255,0.3)',
                '0 0 40px rgba(0,212,255,0.5)',
                '0 0 20px rgba(0,212,255,0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Lock className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </motion.div>
          <h1 className="text-2xl font-cinzel text-white mb-2">
            Admin Access
          </h1>
          <p className="text-gray-500 text-sm font-mono">
            Authentication Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="form-label">Username</label>
            <motion.input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="admin"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <motion.input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-10"
                placeholder="••••••••"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="btn-cosmic w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Authenticating...
              </motion.span>
            ) : (
              'Access Protocol'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <motion.p 
            className="text-gray-600 text-xs font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            [SECURE_CONNECTION]
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
