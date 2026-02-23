import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

type FeedbackType = 'success' | 'error';

interface FeedbackMessageProps {
  type: FeedbackType;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Feedback micro-motion: success pop, error shake.
 */
export function FeedbackMessage({ type, message, onDismiss, className }: FeedbackMessageProps) {
  useEffect(() => {
    if (!onDismiss) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isError = type === 'error';

  return (
    <motion.div
      initial={isError ? false : { opacity: 0, scale: 0.96 }}
      animate={
        isError
          ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.35 } }
          : { opacity: 1, scale: 1 }
      }
      className={cn(
        'rounded-lg px-4 py-3',
        isError ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800',
        className
      )}
    >
      {message}
    </motion.div>
  );
}
