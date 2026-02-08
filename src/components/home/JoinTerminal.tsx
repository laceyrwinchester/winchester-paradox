import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function JoinTerminal() {
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
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="terminal-section" className="py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-xl mx-auto">
        <div className="glass-card p-8">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-cyan-400/60">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>JOIN_PROTOCOL.exe</span>
          </div>
          <h2 className="font-cinzel text-2xl text-white mb-4 text-center">Initialize Transmission</h2>
          <p className="text-gray-400 text-sm text-center mb-8 font-mono">Enter your frequency to receive cosmic updates</p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-mono">&gt;</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@frequency.com" className="terminal-input w-full pl-10" disabled={status === 'loading'} />
            </div>
            <button type="submit" disabled={status === 'loading' || !email} className="btn-cosmic flex items-center gap-2">
              {status === 'loading' ? <span className="loading-pulse">...</span> : <><Send className="w-4 h-4" /><span>Join</span></>}
            </button>
          </form>
          {status === 'success' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded flex items-center gap-2 text-cyan-400 text-sm"><Check className="w-4 h-4" /><span>{message}</span></motion.div>}
          {status === 'error' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{message}</span></motion.div>}
          <div className="mt-6 text-center"><p className="text-xs text-gray-600 font-mono">[ENCRYPTED_TRANSMISSION]</p></div>
        </div>
      </motion.div>
    </section>
  );
}
