import { motion } from 'framer-motion';
import { Eye, BookOpen, Gem } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import TerminalSection from '../components/home/TerminalSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <TerminalSection />
      
      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-white mb-4 glow-text">
              Explore The Paradox
            </h2>
            <p className="text-gray-400 font-mono max-w-2xl mx-auto">
              Three paths through the cosmic void. Choose your journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'VIEW',
                subtitle: 'Digital Art',
                description: 'Immerse yourself in cosmic visuals that blur the line between reality and the digital ether.',
                accent: 'purple',
                icon: Eye,
                effect: 'Dimensional Shift - 3D tilt toward cursor with image zoom',
              },
              {
                title: 'READ',
                subtitle: 'Ancient Wisdom',
                description: 'Explore written works that bridge ancient philosophy with modern digital consciousness.',
                accent: 'cyan',
                icon: BookOpen,
                effect: 'Ethereal Fade - Transparency increase with dashed animated border',
              },
              {
                title: 'ACQUIRE',
                subtitle: 'Artifacts',
                description: 'Own physical manifestations of the paradox, crafted with care and cosmic intent.',
                accent: 'gold',
                icon: Gem,
                effect: 'Golden Bloom - Scale up with radiating gold glow and sparkles',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card p-8 text-center group relative overflow-hidden"
                style={{
                  borderColor: feature.accent === 'purple' ? 'rgba(157, 78, 221, 0.3)' : 
                              feature.accent === 'cyan' ? 'rgba(0, 212, 255, 0.3)' : 
                              'rgba(255, 215, 0, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: feature.accent === 'purple' ? 'radial-gradient(circle at center, rgba(157,78,221,0.2) 0%, transparent 70%)' :
                                feature.accent === 'cyan' ? 'radial-gradient(circle at center, rgba(0,212,255,0.2) 0%, transparent 70%)' :
                                'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, transparent 70%)'
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{
                      background: feature.accent === 'purple' ? 'rgba(157, 78, 221, 0.2)' :
                                  feature.accent === 'cyan' ? 'rgba(0, 212, 255, 0.2)' :
                                  'rgba(255, 215, 0, 0.2)',
                      border: `1px solid ${feature.accent === 'purple' ? 'rgba(157, 78, 221, 0.4)' :
                              feature.accent === 'cyan' ? 'rgba(0, 212, 255, 0.4)' :
                              'rgba(255, 215, 0, 0.4)'}`
                    }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.8 }
                    }}
                  >
                    <feature.icon 
                      className="w-8 h-8"
                      style={{
                        color: feature.accent === 'purple' ? '#c77dff' :
                               feature.accent === 'cyan' ? '#00d4ff' :
                               '#ffd700'
                      }}
                    />
                  </motion.div>

                  <motion.div 
                    className="font-cinzel text-2xl mb-2"
                    style={{
                      color: feature.accent === 'purple' ? '#c77dff' : 
                             feature.accent === 'cyan' ? '#00d4ff' : 
                             '#ffd700'
                    }}
                    whileHover={{
                      textShadow: feature.accent === 'purple' ? '0 0 20px rgba(199,125,255,0.8)' :
                                  feature.accent === 'cyan' ? '0 0 20px rgba(0,212,255,0.8)' :
                                  '0 0 20px rgba(255,215,0,0.8)'
                    }}
                  >
                    {feature.title}
                  </motion.div>
                  
                  <div className="text-white font-cinzel text-lg mb-4">
                    {feature.subtitle}
                  </div>
                  
                  <p className="text-gray-400 text-sm font-mono leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Interactive effect description */}
                  <motion.div
                    className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      color: feature.accent === 'purple' ? '#c77dff' :
                             feature.accent === 'cyan' ? '#00d4ff' :
                             '#ffd700'
                    }}
                  >
                    [{feature.effect}]
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyan-400/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p 
            className="font-cinzel text-white text-lg mb-2"
            whileHover={{ scale: 1.05 }}
          >
            Winchester<span className="text-cyan-400">Paradox</span>
          </motion.p>
          <p className="text-gray-500 text-xs font-mono">
            © {new Date().getFullYear()} All frequencies reserved
          </p>
          <motion.p 
            className="text-gray-600 text-xs font-mono mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            [TRANSMITTED_FROM_THE_VOID]
          </motion.p>
        </div>
      </footer>
    </motion.div>
  );
}
