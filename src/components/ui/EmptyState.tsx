import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { LottieAnimation, fadeUp } from '@/motion';

interface EmptyStateProps {
  icon?: string;
  /** Lottie animation URL (calm, gentle loop) */
  lottieSrc?: string;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({
  icon = '📦',
  lottieSrc,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      {...fadeUp}
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-theme-border bg-theme-surface-subtle/50 p-12 text-center',
        className
      )}
    >
      {lottieSrc ? (
        <div className="mb-3 relative flex h-16 w-16 items-center justify-center">
          <span className="text-4xl" aria-hidden>
            {icon}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <LottieAnimation src={lottieSrc} ariaLabel={title} />
          </div>
        </div>
      ) : (
        <span className="mb-3 text-4xl">{icon}</span>
      )}
      <h3 className="font-semibold text-theme-text-main">{title}</h3>
      <p className="mt-1 text-sm text-theme-text-muted">{description}</p>
    </motion.div>
  );
}
