import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Scroll restoration for BrowserRouter: new navigations start at the top,
 * back/forward keeps the browser's native position restoration.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    window.history.scrollRestoration = 'auto';
  }, []);

  useLayoutEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}
