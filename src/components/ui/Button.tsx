import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'default' | 'sm';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'recipe-press-tap recipe-ripple recipe-ripple-dark',
          variant === 'default' &&
            'bg-primary-600 text-white hover:bg-primary-700 recipe-lift-hover',
          variant === 'outline' &&
            'border border-theme-border bg-theme-surface text-theme-text-main hover:bg-theme-surface-subtle recipe-ripple',
          variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700 recipe-ripple-dark',
          size === 'default' && 'px-4 py-2.5',
          size === 'sm' && 'px-3 py-1.5 text-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
