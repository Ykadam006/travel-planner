import { Link, useNavigate } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

function supportsViewTransitions(): boolean {
  if (typeof document === 'undefined') return false;
  const d = document as Document & { startViewTransition?: (cb: () => void) => void };
  return typeof d.startViewTransition === 'function';
}

export interface SharedElementLinkProps extends Omit<LinkProps, 'to'> {
  to: string | { pathname: string; state?: object };
  /** Unique view-transition-name for the image (e.g. "dest-image-tokyo") */
  imageTransitionName: string;
  /** Unique view-transition-name for the title */
  titleTransitionName: string;
  children: React.ReactNode;
}

/**
 * Link with shared-element continuity — image + title morph into destination hero.
 * Call before navigate: set view-transition-name on the clicked card's image and title.
 */
export function SharedElementLink({
  to,
  imageTransitionName,
  titleTransitionName,
  onClick,
  children,
  ...props
}: SharedElementLinkProps) {
  const navigate = useNavigate();
  const path = typeof to === 'string' ? to : to.pathname;
  const state = typeof to === 'object' ? to.state : undefined;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (path === window.location.pathname) return;

    e.preventDefault();

    if (supportsViewTransitions()) {
      const target = e.currentTarget;
      const img = target.querySelector('[data-shared-image]');
      const title = target.querySelector('[data-shared-title]');
      if (img instanceof HTMLElement) img.style.viewTransitionName = imageTransitionName;
      if (title instanceof HTMLElement) title.style.viewTransitionName = titleTransitionName;

      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => {
          navigate(path, { state });
        })
        .finished.finally(() => {
          if (img instanceof HTMLElement) img.style.viewTransitionName = '';
          if (title instanceof HTMLElement) title.style.viewTransitionName = '';
        });
    } else {
      navigate(path, { state });
    }
  };

  return (
    <Link to={path} state={state} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
