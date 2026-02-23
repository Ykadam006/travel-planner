import { Link, NavLink, useNavigate, type LinkProps, type NavLinkProps } from 'react-router-dom';

function supportsViewTransitions(): boolean {
  if (typeof document === 'undefined') return false;
  const d = document as Document & { startViewTransition?: (cb: () => void) => void };
  return typeof d.startViewTransition === 'function';
}

/** Link with View Transitions API support for Apple-style page continuity */
export function ViewTransitionLink({
  viewTransition = true,
  onClick,
  to,
  ...props
}: LinkProps & { viewTransition?: boolean }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === window.location.pathname) return;
    if (viewTransition && supportsViewTransitions()) {
      e.preventDefault();
      (
        document as Document & { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        navigate(to);
      });
    }
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}

/** NavLink with View Transitions API support */
export function ViewTransitionNavLink({
  viewTransition = true,
  onClick,
  to,
  ...props
}: NavLinkProps & { viewTransition?: boolean }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === window.location.pathname) return;
    if (viewTransition && supportsViewTransitions()) {
      e.preventDefault();
      (
        document as Document & { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        navigate(to);
      });
    }
  };

  return <NavLink to={to} onClick={handleClick} {...props} />;
}
