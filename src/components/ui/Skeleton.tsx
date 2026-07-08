import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

/**
 * Loading placeholder. Pulse animation is disabled by
 * reduced-motion.css (.ghm-skeleton respects prefers-reduced-motion).
 */
export function Skeleton({ className, variant = 'rect', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'ghm-skeleton animate-pulse bg-theme-surface-subtle',
        variant === 'text' && 'h-4 rounded',
        variant === 'rect' && 'rounded-lg',
        variant === 'circle' && 'rounded-full',
        className
      )}
      {...props}
    />
  );
}
