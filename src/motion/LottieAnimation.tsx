import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useReducedMotion } from './MotionContext';

interface LottieAnimationProps {
  /** JSON animation data (from import or fetch) */
  animationData?: object;
  /** URL to load animation JSON (alternative to animationData) */
  src?: string;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function LottieAnimation({
  animationData: dataProp,
  src,
  loop = true,
  className,
  ariaLabel,
}: LottieAnimationProps) {
  const reduceMotion = useReducedMotion();
  const [data, setData] = useState<object | null>(dataProp ?? null);

  useEffect(() => {
    if (dataProp) {
      setData(dataProp);
      return;
    }
    if (!src) return;
    fetch(src)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [dataProp, src]);

  if (reduceMotion || !data) {
    return null;
  }

  return (
    <div className={className} role={ariaLabel ? 'img' : undefined} aria-label={ariaLabel}>
      <Lottie animationData={data} loop={loop} />
    </div>
  );
}
