import { motion } from 'framer-motion';
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
            <h2 className="font-cinzel text-3xl md:text-4xl text-white mb-4">
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
              },
              {
                title: 'READ',
                subtitle: 'Ancient Wisdom',
                description: 'Explore written works that bridge ancient philosophy with modern digital consciousness.',
                accent: 'cyan',
              },
              {
                title: 'ACQUIRE',
                subtitle: 'Artifacts',
                description: 'Own physical manifestations of the paradox, crafted with care and cosmic intent.',
                accent: 'gold',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300"
                style={{
                  borderColor: feature.accent === 'purple' ? 'rgba(157, 78, 221, 0.3)' : 
                              feature.accent === 'cyan' ? 'rgba(0, 212, 255, 0.3)' : 
                              'rgba(255, 215, 0, 0.3)'
                }}
              >
                <div 
                  className="font-cinzel text-2xl mb-2"
                  style={{
                    color: feature.accent === 'purple' ? '#c77dff' : 
                           feature.accent === 'cyan' ? '#00d4ff' : 
                           '#ffd700'
                  }}
                >
                  {feature.title}
                </div>
                <div className="text-white font-cinzel text-lg mb-4">
                  {feature.subtitle}
                </div>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyan-400/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-cinzel text-white text-lg mb-2">
            Winchester<span className="text-cyan-400">Paradox</span>
          </p>
          <p className="text-gray-500 text-xs font-mono">
            © {new Date().getFullYear()} All frequencies reserved
          </p>
          <p className="text-gray-600 text-xs font-mono mt-2">
            [TRANSMITTED_FROM_THE_VOID]
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
