import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

export type RouteTransitionMode = 'subtle' | 'cinematic';

export type MotionContextValue = {
  /** OS prefers-reduced-motion or in-app toggle */
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  /** Route transition style: subtle (fast crossfade) vs cinematic (slower, more dramatic) */
  routeTransitionMode: RouteTransitionMode;
  setRouteTransitionMode: (mode: RouteTransitionMode) => void;
  /** Scroll engine (Lenis) enabled — false when reduced motion */
  scrollEngineEnabled: boolean;
  /** Motion tokens available for programmatic use */
  tokens: {
    durationPage: number;
    durationUi: number;
    durationMicro: number;
  };
};

const MotionContext = createContext<MotionContextValue | null>(null);

const TOKENS = {
  durationPage: 0.5,
  durationUi: 0.28,
  durationMicro: 0.15,
};

interface MotionProviderProps {
  children: ReactNode;
  /** Default route transition mode */
  defaultRouteMode?: RouteTransitionMode;
}

export function MotionProvider({ children, defaultRouteMode = 'subtle' }: MotionProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [routeMode, setRouteMode] = useState<RouteTransitionMode>(defaultRouteMode);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setReducedMotion(mq.matches);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.routeTransition = routeMode;
  }, [routeMode]);

  const scrollEngineEnabled = !reducedMotion;

  const value: MotionContextValue = {
    reducedMotion,
    toggleReducedMotion,
    routeTransitionMode: routeMode,
    setRouteTransitionMode: setRouteMode,
    scrollEngineEnabled,
    tokens: TOKENS,
  };

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return ctx;
}

export function useReducedMotion(): boolean {
  const ctx = useContext(MotionContext);
  return ctx?.reducedMotion ?? false;
}

export function useReducedMotionToggle(): () => void {
  const ctx = useContext(MotionContext);
  return ctx?.toggleReducedMotion ?? (() => {});
}
