import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function ParticleTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create new particle every 3rd mouse move event to limit density
      if (Math.random() > 0.3) return;
      
      const colors = ['#00d4ff', '#9d4edd', '#ffd700', '#c77dff'];
      const newParticle: Particle = {
        id: particleId,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]);
      setParticleId(prev => prev + 1);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const colors = ['#00d4ff', '#9d4edd', '#ffd700', '#c77dff'];
      const newParticle: Particle = {
        id: particleId,
        x: touch.clientX,
        y: touch.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      };
      
      setParticles(prev => [...prev.slice(-15), newParticle]);
      setParticleId(prev => prev + 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [particleId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
