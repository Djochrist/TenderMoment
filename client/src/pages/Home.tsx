import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Sparkles, Heart, Waves as WavesIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { experienceSchema, type Experience } from '@shared/schema';
import { useExperienceUrl } from '@/hooks/use-experience-url';
import { ParticlesField } from '@/components/animations/MathBackgrounds';

export default function Home() {
  const { generateLink } = useExperienceUrl();
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      theme: 'particles'
    }
  });

  const selectedTheme = watch('theme');

  const onSubmit = async (data: Experience) => {
    try {
      const url = await generateLink(data);
      setGeneratedUrl(url);
      toast.success("Expérience générée avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la génération.");
    }
  };

  const copyToClipboard = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setShowLink(false);
      toast.success("Lien copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error("Impossible de copier le lien.");
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Background Math Effect for ambiance */}
      <ParticlesField />
      
      <div className="w-full max-w-xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4 text-glow">TenderMoment</h1>
          <p className="text-white/60 font-light text-lg">
            Concevez une expérience numérique, éphémère et romantique.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-6 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {!generatedUrl ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Pour qui ?</label>
                  <input 
                    {...register("recipientName")}
                    placeholder="Ex: Mon amour, Sophie, Alexandre..."
                    className="glass-input"
                  />
                  {errors.recipientName && (
                    <p className="text-destructive text-sm mt-1 ml-1">{errors.recipientName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">De la part de</label>
                  <input 
                    {...register("senderName")}
                    placeholder="Votre prénom ou surnom"
                    className="glass-input"
                  />
                  {errors.senderName && (
                    <p className="text-destructive text-sm mt-1 ml-1">{errors.senderName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Votre message</label>
                  <textarea 
                    {...register("message")}
                    placeholder="Écrivez ce que vous avez sur le cœur..."
                    className="glass-input min-h-[120px] resize-none"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1 ml-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/80 ml-1">Ambiance Visuelle</label>
                  <div className="grid grid-cols-3 gap-3">
                    
                    <label className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border
                      ${selectedTheme === 'particles' 
                        ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(220,20,60,0.2)]' 
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'}
                    `}>
                      <input type="radio" value="particles" {...register("theme")} className="hidden" />
                      <Sparkles className={`w-6 h-6 mb-2 ${selectedTheme === 'particles' ? 'text-primary' : 'text-white/40'}`} />
                      <span className="text-xs font-medium text-white/80">Constellation</span>
                    </label>

                    <label className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border
                      ${selectedTheme === 'hearts' 
                        ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(220,20,60,0.2)]' 
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'}
                    `}>
                      <input type="radio" value="hearts" {...register("theme")} className="hidden" />
                      <Heart className={`w-6 h-6 mb-2 ${selectedTheme === 'hearts' ? 'text-primary' : 'text-white/40'}`} />
                      <span className="text-xs font-medium text-white/80">Ascension</span>
                    </label>

                    <label className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border
                      ${selectedTheme === 'waves' 
                        ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(220,20,60,0.2)]' 
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'}
                    `}>
                      <input type="radio" value="waves" {...register("theme")} className="hidden" />
                      <WavesIcon className={`w-6 h-6 mb-2 ${selectedTheme === 'waves' ? 'text-primary' : 'text-white/40'}`} />
                      <span className="text-xs font-medium text-white/80">Ondes Pures</span>
                    </label>

                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full mt-6 py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2
                    bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]
                    hover:bg-gray-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]
                    transition-all duration-300 group"
                >
                  Créer l'expérience
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(220,20,60,0.3)] text-primary">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <h2 className="font-display text-3xl text-white">Magie Encodée</h2>
                <p className="text-white/60 text-sm max-w-sm">
                  Le moment a été scellé mathématiquement dans ce lien. Aucune donnée n'est sauvegardée sur nos serveurs.
                </p>

                <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <input 
                    readOnly 
                    value={generatedUrl}
                    type={showLink ? "text" : "password"}
                    className="bg-transparent text-white/50 text-sm w-full outline-none truncate font-mono"
                  />
                  <button
                    onClick={() => setShowLink((v) => !v)}
                    className="px-3 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white/80 rounded-lg transition-colors flex-shrink-0"
                    title={showLink ? "Masquer le lien" : "Afficher le lien"}
                  >
                    {showLink ? "Masquer" : "Afficher"}
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex-shrink-0"
                    title="Copier le lien"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="pt-4 flex flex-col gap-3 w-full">
                  <motion.button
                    onClick={() => window.open(generatedUrl, '_blank')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-medium tracking-wide bg-gradient-to-r from-primary to-primary/80 text-white shadow-[0_0_20px_rgba(220,20,60,0.3)]"
                  >
                    Prévisualiser
                  </motion.button>
                  <button
                    onClick={() => setGeneratedUrl(null)}
                    className="w-full py-3 rounded-xl font-medium text-white/50 hover:text-white transition-colors"
                  >
                    Créer un nouveau moment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
