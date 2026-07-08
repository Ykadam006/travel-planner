import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/motion';

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-theme-surface-subtle', className)}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary-600 to-secondary-500"
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

interface ProgressRingProps {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ProgressRing({
  value,
  size = 56,
  strokeWidth = 5,
  label,
  className,
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-theme-border"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="stroke-primary-600"
          initial={false}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute text-xs font-semibold text-theme-text-main">
        {Math.round(clamped)}%
      </span>
    </div>
  );
}
