import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// THEME 1: PARTICLES (Mathematical Constellations)
// ==========================================
export const ParticlesField: React.FC = () => {
  const particles = useMemo(() => Array.from({ length: 60 }), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1;
        // Mathematical distribution for initial positions
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: size, height: size, left: `${startX}vw`, top: `${startY}vh` }}
            animate={{
              x: [0, Math.sin(i) * 100, Math.cos(i) * -100, 0],
              y: [0, Math.cos(i) * 100, Math.sin(i) * -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          />
        );
      })}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
};

// ==========================================
// THEME 2: HEARTS (Sine Wave Floating)
// ==========================================
export const HeartsField: React.FC = () => {
  const hearts = useMemo(() => Array.from({ length: 40 }), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {hearts.map((_, i) => {
        const size = Math.random() * 15 + 10;
        const startX = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 15;
        
        return (
          <motion.div
            key={i}
            className="absolute text-primary/30"
            style={{ left: `${startX}vw`, fontSize: size }}
            initial={{ y: "110vh", opacity: 0, rotate: 0 }}
            animate={{
              y: "-10vh",
              x: [
                0, 
                Math.sin(i) * 50, // Drift right/left based on index math
                Math.cos(i) * 50,
                0
              ],
              opacity: [0, 0.6, 0],
              rotate: [0, Math.sin(i) * 90, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        );
      })}
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
    </div>
  );
};

// ==========================================
// THEME 3: WAVES (Trigonometric Flow)
// ==========================================
export const WavesField: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-background flex items-center justify-center">
      {/* 3 distinct layered waves using pure mathematical SVG paths */}
      {[1, 2, 3].map((layer) => (
        <motion.svg
          key={layer}
          className={`absolute w-[200vw] h-screen opacity-${10 + layer * 10}`}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20 + layer * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M0,500 C150,400 350,600 500,500 C650,400 850,600 1000,500 L1000,1000 L0,1000 Z"
            fill={`hsl(var(--primary) / ${0.05 * layer})`}
            className="drop-shadow-2xl"
          />
          <path
            d="M0,500 C150,400 350,600 500,500 C650,400 850,600 1000,500 L1000,1000 L0,1000 Z"
            fill={`hsl(var(--primary) / ${0.05 * layer})`}
            transform="translate(1000, 0)"
          />
        </motion.svg>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background mix-blend-multiply" />
    </div>
  );
};
