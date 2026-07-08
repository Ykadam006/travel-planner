import { QueryClient } from '@tanstack/react-query';

/**
 * Shared query client. Conservative defaults tuned for free public APIs
 * (Nominatim 1 req/s, WeatherAPI, Wikimedia): long stale times, one retry,
 * no refetch storms on focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
