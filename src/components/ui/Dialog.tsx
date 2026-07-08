import { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/motion';
import { IconButton } from './IconButton';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Visually hide the title while keeping it for screen readers */
  hideTitle?: boolean;
  description?: string;
  children: ReactNode;
  /** 'center' = modal dialog, 'bottom' = sheet sliding up (mobile-friendly) */
  variant?: 'center' | 'bottom';
  className?: string;
}

/**
 * Accessible modal built on Radix: focus trap, Escape to close,
 * scroll lock, aria-labelledby — with Motion enter/exit.
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  hideTitle = false,
  description,
  children,
  variant = 'center',
  className,
}: DialogProps) {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.28;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className={cn(
                  'fixed z-modal flex flex-col overflow-hidden border border-theme-border bg-theme-surface shadow-floating',
                  variant === 'center' &&
                    'inset-x-4 top-1/2 mx-auto max-h-[85vh] max-w-2xl rounded-2xl md:inset-x-8',
                  variant === 'bottom' &&
                    'inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl md:inset-x-8 md:bottom-6 md:mx-auto md:max-w-4xl md:rounded-2xl',
                  className
                )}
                initial={
                  variant === 'center'
                    ? { opacity: 0, scale: reducedMotion ? 1 : 0.96, y: '-50%' }
                    : { opacity: 0, y: reducedMotion ? 0 : 24 }
                }
                animate={
                  variant === 'center' ? { opacity: 1, scale: 1, y: '-50%' } : { opacity: 1, y: 0 }
                }
                exit={
                  variant === 'center'
                    ? { opacity: 0, scale: reducedMotion ? 1 : 0.96, y: '-50%' }
                    : { opacity: 0, y: reducedMotion ? 0 : 24 }
                }
                transition={{ duration, ease }}
              >
                <div
                  className={cn(
                    'flex items-center justify-between gap-4 border-b border-theme-border px-6 py-4',
                    hideTitle && 'sr-only'
                  )}
                >
                  <div>
                    <DialogPrimitive.Title className="text-lg font-semibold text-theme-text-main">
                      {title}
                    </DialogPrimitive.Title>
                    {description && (
                      <DialogPrimitive.Description className="mt-0.5 text-sm text-theme-text-muted">
                        {description}
                      </DialogPrimitive.Description>
                    )}
                  </div>
                  <DialogPrimitive.Close asChild>
                    <IconButton aria-label="Close dialog">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          d="M6 6l12 12M18 6L6 18"
                        />
                      </svg>
                    </IconButton>
                  </DialogPrimitive.Close>
                </div>
                <div className="flex-1 overflow-y-auto p-6">{children}</div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
