import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
          variant === 'default' &&
            'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300',
          variant === 'accent' &&
            'bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-300',
          variant === 'success' &&
            'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
          variant === 'warning' &&
            'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
          variant === 'outline' && 'border border-theme-border text-theme-text-muted',
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
