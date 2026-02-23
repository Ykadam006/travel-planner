import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './MotionContext';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceScrubProps {
  images: string[];
  className?: string;
}

/**
 * Scroll-scrubbed image sequence — Apple product-page vibe.
 * Scroll progress 0→1 scrubs through frames.
 */
export function ImageSequenceScrub({ images, className }: ImageSequenceScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current || images.length === 0) return;

    const container = containerRef.current;

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(Math.floor(progress * images.length), images.length - 1);
        setFrameIndex(index);
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [images, reduceMotion]);

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className={`relative h-[70vh] overflow-hidden ${className ?? ''}`}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <img src={images[frameIndex]} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
