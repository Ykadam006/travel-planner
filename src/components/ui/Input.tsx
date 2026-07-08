import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

const fieldClasses =
  'w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-text-main shadow-sm transition-colors placeholder:text-theme-text-muted hover:border-primary-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-primary-900';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn(fieldClasses, className)} {...props} />;
});

Input.displayName = 'Input';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <textarea ref={ref} className={cn(fieldClasses, 'min-h-24', className)} {...props} />;
  }
);

Textarea.displayName = 'Textarea';
