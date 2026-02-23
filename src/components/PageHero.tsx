import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerIn, staggerItem } from '@/motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  cta?: ReactNode;
}

/**
 * Hero entrance — headline + subcopy + CTA choreography.
 * Staggered fade-up per MOTION-SPEC.
 */
export function PageHero({ title, subtitle, cta }: PageHeroProps) {
  return (
    <motion.header className="mb-10" variants={staggerIn(0.08)} initial="initial" animate="animate">
      <motion.h1
        variants={staggerItem}
        className="font-display text-3xl font-bold text-theme-text-main md:text-4xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p variants={staggerItem} className="mt-2 text-theme-text-muted md:text-lg">
          {subtitle}
        </motion.p>
      )}
      {cta && (
        <motion.div variants={staggerItem} className="mt-6">
          {cta}
        </motion.div>
      )}
    </motion.header>
  );
}
