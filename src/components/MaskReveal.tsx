import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Clip-path reveal for sections */
export function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
}

/** Line-by-line text reveal */
export function TextReveal({ text, className }: TextRevealProps) {
  const lines = text.split('\n');
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="block overflow-hidden"
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

/** Image reveal with soft edge (gradient mask) */
export function ImageReveal({ src, alt, className }: ImageRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-xl ${className ?? ''}`}
    >
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    </motion.div>
  );
}
