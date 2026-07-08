import { Link, NavLink, useNavigate, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { navigateWithViewTransition } from './viewTransition';

function useViewTransitionClick(
  to: LinkProps['to'],
  viewTransition: boolean,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
) {
  const navigate = useNavigate();

  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let modified clicks (new tab, etc.) behave natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === window.location.pathname) return;
    if (!viewTransition) return;
    e.preventDefault();
    navigateWithViewTransition(() => navigate(to));
  };
}

/** Link with View Transitions API support for Apple-style page continuity */
export function ViewTransitionLink({
  viewTransition = true,
  onClick,
  to,
  ...props
}: LinkProps & { viewTransition?: boolean }) {
  const handleClick = useViewTransitionClick(to, viewTransition, onClick);
  return <Link to={to} onClick={handleClick} {...props} />;
}

/** NavLink with View Transitions API support */
export function ViewTransitionNavLink({
  viewTransition = true,
  onClick,
  to,
  ...props
}: NavLinkProps & { viewTransition?: boolean }) {
  const handleClick = useViewTransitionClick(to, viewTransition, onClick);
  return <NavLink to={to} onClick={handleClick} {...props} />;
}
