import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Home } from 'lucide-react';

import { useExperienceUrl } from '@/hooks/use-experience-url';
import { ParticlesField, HeartsField, WavesField } from '@/components/animations/MathBackgrounds';

export default function Experience() {
  const { decodedData, error } = useExperienceUrl();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);

  // Progressive reveal sequence
  useEffect(() => {
    if (!decodedData) return;

    const timers = [
      setTimeout(() => setStep(1), 1000),  // Show recipient
      setTimeout(() => setStep(2), 4000),  // Show message
      setTimeout(() => setStep(3), 10000), // Show sender
    ];

    return () => timers.forEach(clearTimeout);
  }, [decodedData]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <ParticlesField />
        <div className="glass-panel p-10 max-w-md z-10">
          <h1 className="font-display text-3xl text-white mb-4">Illusion Brisée</h1>
          <p className="text-white/60 mb-8">{error}</p>
          <button 
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors mx-auto"
          >
            <Home className="w-4 h-4" /> Retourner à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (!decodedData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const renderBackground = () => {
    switch (decodedData.theme) {
      case 'particles': return <ParticlesField />;
      case 'hearts': return <HeartsField />;
      case 'waves': return <WavesField />;
      default: return <ParticlesField />;
    }
  };

  // Typography animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const wordVars = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-background">
      {renderBackground()}

      <div className="z-10 max-w-3xl w-full text-center flex flex-col items-center gap-16 mix-blend-screen mix-blend-plus-lighter">
        
        {/* Recipient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.9 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h2 className="font-display text-2xl sm:text-4xl italic text-white/70">
            Pour {decodedData.recipientName},
          </h2>
        </motion.div>

        {/* Message Body */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={step >= 2 ? "show" : "hidden"}
          className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-white font-medium text-glow px-4"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {decodedData.message.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVars} className="inline-block mr-3 mb-2">
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Sender */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 30 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="w-12 h-[1px] bg-primary/50 mx-auto mb-6" />
          <h3 className="font-body font-light text-xl text-white/50 tracking-widest uppercase">
            {decodedData.senderName}
          </h3>
        </motion.div>

      </div>
    </main>
  );
}
