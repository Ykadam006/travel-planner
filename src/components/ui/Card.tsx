import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variant === 'elevated' && 'border border-theme-border bg-theme-surface shadow-md',
          variant === 'outlined' && 'border border-theme-border bg-theme-surface',
          variant === 'filled' &&
            'border border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-950/50',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
