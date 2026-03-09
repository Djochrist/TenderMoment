import { motion } from 'framer-motion';
import { ArrowRight, LockKeyhole, Link2, Sparkles, ShieldCheck } from 'lucide-react';

import { ParticlesField } from '@/components/animations/MathBackgrounds';

const benefits = [
  {
    icon: Sparkles,
    title: 'Message personnalisé',
    description: 'Rédigez un message sur mesure, choisissez une ambiance visuelle et composez une expérience cohérente.'
  },
  {
    icon: Link2,
    title: 'Partage par lien',
    description: 'Un lien unique est généré immédiatement, sans création de compte ni étape technique inutile.'
  },
  {
    icon: LockKeyhole,
    title: 'Accès réservé par lien',
    description: 'L’expérience n’est accessible qu’aux personnes disposant du lien de consultation.'
  },
  {
    icon: ShieldCheck,
    title: 'Confidentialité renforcée',
    description: 'Le fonctionnement du service privilégie un partage discret et une lecture plus rassurante.'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <ParticlesField />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between pb-10">
          <div>
            <p className="text-primary/80 uppercase tracking-[0.35em] text-xs mb-2">TenderMoment</p>
            <p className="text-white/45 text-sm">Amusez-vous</p>
          </div>

          <a
            href="/creer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Commencer
            <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        <section className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl leading-none text-white text-glow sm:text-6xl lg:text-7xl">
              Offrez un message personnel dans une expérience soignée et confidentielle.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              TenderMoment vous permet de rédiger un message, de générer un lien privé et de le partager dans un cadre plus élégant. La promesse est simple : une expérience fluide, compréhensible et immédiatement crédible.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/creer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Créer un message
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#fonctionnement"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Voir le fonctionnement
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Parcours utilisateur</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-white font-medium">1. Personnalisez</p>
                    <p className="text-sm leading-6 text-white/55">Renseignez le destinataire, votre signature, le message et l’univers visuel souhaité.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">2. Générez</p>
                    <p className="text-sm leading-6 text-white/55">Un lien de consultation est créé immédiatement, sans inscription.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">3. Partagez</p>
                    <p className="text-sm leading-6 text-white/55">Le destinataire ouvre une page dédiée et découvre votre message dans une mise en scène adaptée.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-primary/10 p-5">
                <p className="text-sm font-medium text-white">Confidentialité</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Le contenu n’est pas accessible publiquement : l’ouverture de l’expérience nécessite le lien correspondant.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="fonctionnement" className="pb-8 pt-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-primary/80 uppercase tracking-[0.35em] text-xs mb-3">Fonctionnement</p>
            <h2 className="font-display text-4xl text-white sm:text-5xl">Un parcours simple, du message au partage</h2>
            <p className="mt-4 text-white/60 leading-7">
              Tout est pensé pour aller à l’essentiel : rédiger, générer un lien, puis partager un moment personnel dans un cadre discret.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-panel p-6">
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
