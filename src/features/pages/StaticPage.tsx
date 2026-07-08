import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/PageHero';
import { ViewTransitionLink, staggerIn, staggerItem } from '@/motion';

interface StaticPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Editorial shell for info pages — shared rhythm, entrance stagger, back link. */
export function StaticPage({ title, subtitle, children }: StaticPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title={title} subtitle={subtitle} />
      <motion.div variants={staggerIn(0.07)} initial="initial" animate="animate">
        {children}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-12 border-t border-theme-border pt-6"
      >
        <ViewTransitionLink to="/" className="text-primary-600 hover:underline">
          ← Back to Home
        </ViewTransitionLink>
      </motion.p>
    </div>
  );
}

interface InfoSectionProps {
  icon?: string;
  title: string;
  children: ReactNode;
}

/** Icon-led section with a soft divider. */
export function InfoSection({ icon, title, children }: InfoSectionProps) {
  return (
    <motion.section
      variants={staggerItem}
      className="border-b border-theme-border/60 py-7 last:border-0"
    >
      <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-theme-text-main">
        {icon && (
          <span className="text-xl" aria-hidden>
            {icon}
          </span>
        )}
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-theme-text-muted">{children}</div>
    </motion.section>
  );
}
