import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface PageSectionProps extends HTMLAttributes<HTMLElement> {
  /** Constrain content to the page max width with page padding */
  contained?: boolean;
  /** Subtle alternate background to separate section bands */
  subtle?: boolean;
}

/**
 * Standard page section band — consistent vertical rhythm across pages.
 */
export const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  ({ className, contained = true, subtle = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-20', subtle && 'bg-theme-surface-subtle', className)}
        {...props}
      >
        {contained ? <div className="mx-auto max-w-7xl px-4 md:px-6">{children}</div> : children}
      </section>
    );
  }
);

PageSection.displayName = 'PageSection';
