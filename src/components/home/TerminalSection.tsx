import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function TerminalSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { subscribe } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await subscribe(email);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="terminal-section" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto"
      >
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-50"
            animate={{
              boxShadow: [
                'inset 0 0 20px rgba(0,212,255,0.1)',
                'inset 0 0 40px rgba(0,212,255,0.2)',
                'inset 0 0 20px rgba(0,212,255,0.1)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-cyan-400/60">
              <motion.div 
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>JOIN_PROTOCOL.exe</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >_</motion.span>
            </div>

            <h2 className="font-cinzel text-2xl text-white mb-4 text-center">
              Initialize Transmission
            </h2>

            <p className="text-gray-400 text-sm text-center mb-8 font-mono">
              Enter your frequency to receive cosmic updates
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-mono group-hover:animate-pulse">&gt;</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@frequency.com"
                  className="terminal-input w-full pl-10"
                  disabled={status === 'loading'}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan-400"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading' || !email}
                className="btn-cosmic flex items-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === 'loading' ? (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >...</motion.span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Join</span>
                  </>
                )}
              </motion.button>
            </form>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded flex items-center gap-2 text-cyan-400 text-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
                <span>{message}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600 font-mono">
                [ENCRYPTED_TRANSMISSION]
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
