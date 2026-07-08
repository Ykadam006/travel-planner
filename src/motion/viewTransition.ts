import { flushSync } from 'react-dom';

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

export function supportsViewTransitions(): boolean {
  if (typeof document === 'undefined') return false;
  return typeof (document as DocumentWithVT).startViewTransition === 'function';
}

function motionIsReduced(): boolean {
  // MotionProvider mirrors both the OS setting and the in-app toggle onto <html>
  return document.documentElement.classList.contains('reduce-motion');
}

/**
 * Run a navigation inside a View Transition when supported and motion is
 * allowed; otherwise navigate directly. flushSync forces React to commit the
 * new route inside the transition callback — without it the browser snapshots
 * the old DOM as the "new" state and the morph silently becomes a no-op.
 */
export function navigateWithViewTransition(navigateFn: () => void): Promise<void> {
  if (!supportsViewTransitions() || motionIsReduced()) {
    navigateFn();
    return Promise.resolve();
  }
  const transition = (document as Required<DocumentWithVT>).startViewTransition(() => {
    flushSync(navigateFn);
  });
  return transition.finished.catch(() => {});
}
