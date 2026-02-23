import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/motion';

const PARALLAX_DEPTH = 8;

interface CursorParallaxCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Preview card that reacts to cursor — tiny parallax tilt.
 */
export function CursorParallaxCard({ children, className }: CursorParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    setRotate({
      y: percentX * PARALLAX_DEPTH,
      x: -percentY * PARALLAX_DEPTH,
    });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
