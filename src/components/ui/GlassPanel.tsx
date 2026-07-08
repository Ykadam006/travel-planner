import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export type GlassPanelProps = HTMLAttributes<HTMLDivElement>;

/**
 * Frosted glass surface — use sparingly, over imagery or gradients only.
 * Falls back to a solid surface when backdrop-filter is unsupported.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border shadow-floating backdrop-blur-md',
          'border-[var(--glass-border)] bg-[var(--surface-glass)] supports-[not(backdrop-filter:blur(0))]:bg-theme-surface',
          className
        )}
        {...props}
      />
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
