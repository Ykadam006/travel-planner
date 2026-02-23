import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ViewTransitionLink } from '@/motion';
import { useReducedMotion } from '@/motion';

const MAGNETIC_STRENGTH = 0.3;

interface MagneticCTAProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  as?: 'link' | 'button';
  onClick?: () => void;
}

export function MagneticCTA({ children, className, to, as = 'link', onClick }: MagneticCTAProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
    const deltaY = (e.clientY - centerY) * MAGNETIC_STRENGTH;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  if (as === 'link' && to) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="inline-block"
      >
        <ViewTransitionLink to={to} className={className}>
          {children}
        </ViewTransitionLink>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
