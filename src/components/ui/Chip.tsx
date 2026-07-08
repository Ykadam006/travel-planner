import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected/active filter state */
  selected?: boolean;
}

/**
 * Filter chip — toggleable pill for category filters.
 * Uses aria-pressed so screen readers announce the toggle state.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        className={cn(
          'rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-ui',
          selected
            ? 'bg-accent-100 text-accent-700 ring-2 ring-accent-200 dark:bg-accent-950 dark:text-accent-300 dark:ring-accent-800'
            : 'border border-theme-border bg-theme-surface text-theme-text-muted hover:bg-theme-surface-subtle hover:text-theme-text-main',
          className
        )}
        {...props}
      />
    );
  }
);

Chip.displayName = 'Chip';
