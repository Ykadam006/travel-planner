import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible name — icon-only buttons must announce their purpose */
  'aria-label': string;
  variant?: 'ghost' | 'outline' | 'solid';
  size?: 'default' | 'sm';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variant === 'ghost' &&
            'text-theme-text-muted hover:bg-theme-surface-subtle hover:text-theme-text-main',
          variant === 'outline' &&
            'border border-theme-border bg-theme-surface text-theme-text-muted hover:bg-theme-surface-subtle hover:text-theme-text-main',
          variant === 'solid' && 'bg-primary-600 text-white hover:bg-primary-700',
          size === 'default' && 'h-10 w-10',
          size === 'sm' && 'h-8 w-8',
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
