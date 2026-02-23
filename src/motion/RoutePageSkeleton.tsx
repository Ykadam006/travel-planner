import { motion } from 'framer-motion';

/**
 * Motion placeholder for route loading — skeleton → crossfade when content loads.
 * Keeps the UI alive during lazy route load (Vite code-split).
 */
export function RoutePageSkeleton() {
  return (
    <motion.div
      className="mx-auto max-w-6xl px-4 py-10 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Title skeleton */}
      <div className="mb-8 h-9 w-64 animate-pulse rounded-lg bg-theme-surface-subtle" />

      {/* Content grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface"
          >
            <div className="h-40 animate-pulse bg-theme-surface-subtle" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-theme-surface-subtle" />
              <div className="h-3 w-full animate-pulse rounded bg-theme-surface-subtle/80" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-theme-surface-subtle/80" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
