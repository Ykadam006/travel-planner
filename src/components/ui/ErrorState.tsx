import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeUp } from '@/motion';
import { Button } from './Button';

interface ErrorStateProps {
  icon?: string;
  title?: string;
  description?: string;
  /** Retry handler — renders a "Try again" button when provided */
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  icon = '⚠️',
  title = 'Something went wrong',
  description = 'We could not load this right now. Please try again.',
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <motion.div
      {...fadeUp}
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-red-300 bg-red-50/60 p-12 text-center dark:border-red-900 dark:bg-red-950/30',
        className
      )}
    >
      <span className="mb-3 text-4xl" aria-hidden>
        {icon}
      </span>
      <h3 className="font-semibold text-theme-text-main">{title}</h3>
      <p className="mt-1 text-sm text-theme-text-muted">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </motion.div>
  );
}
