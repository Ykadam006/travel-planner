import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewTransitionLink } from '@/motion';
import { useReducedMotion, useReducedMotionToggle } from '@/motion';

const VERSION = '0.3.0';

const productLinks = [
  { to: '/', label: 'Home' },
  { to: '/itinerary-builder', label: 'Itinerary' },
  { to: '/packing-list', label: 'Packing' },
  { to: '/budget-estimator', label: 'Budget' },
  { to: '/weather-forecast', label: 'Weather' },
  { to: '/travel-suggestions', label: 'Suggestions' },
];

const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/accessibility', label: 'Accessibility' },
  { to: '/about', label: 'About' },
  { to: '/data-sources', label: 'Data Sources' },
];

const linkClass =
  'text-theme-text-muted hover:text-primary-600 transition-colors text-sm underline-offset-4 hover:underline';

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const reduceMotion = useReducedMotion();
  const toggleMotion = useReducedMotionToggle();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewTrip = () => {
    localStorage.removeItem('ghm_itinerary');
    localStorage.removeItem('ghm_packing');
    navigate('/itinerary-builder');
  };

  return (
    <footer className="mt-auto border-t border-theme-border bg-theme-surface-subtle/95">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {/* Brand + links in one clean block */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <ViewTransitionLink
              to="/"
              className="font-display text-xl font-semibold text-theme-text-main"
            >
              Ghumakkad
            </ViewTransitionLink>
            <p className="mt-2 text-sm text-theme-text-muted max-w-xs">
              Plan trips faster — itinerary, packing, budget, and weather in one place.
            </p>
            <p className="mt-1 text-xs text-theme-text-muted">v{VERSION} • Built by Yogesh Kadam</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              {productLinks.map((link) => (
                <ViewTransitionLink key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </ViewTransitionLink>
              ))}
            </nav>
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <ViewTransitionLink key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </ViewTransitionLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-theme-border pt-8">
          <button type="button" onClick={handleStartNewTrip} className={linkClass}>
            Start New Trip
          </button>
          <ViewTransitionLink to="/itinerary-builder" className={linkClass}>
            Resume Trip
          </ViewTransitionLink>
          <ViewTransitionLink to="/help" className={linkClass}>
            Help
          </ViewTransitionLink>
          <button
            type="button"
            onClick={toggleMotion}
            className={linkClass}
            aria-pressed={reduceMotion}
          >
            {reduceMotion ? 'Enable motion' : 'Reduce motion'}
          </button>
          {showBackToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className={`ml-auto ${linkClass} font-medium text-primary-600`}
            >
              Back to top ↑
            </button>
          )}
        </div>

        {/* Bottom line */}
        <div className="mt-6 flex flex-col gap-2 border-t border-theme-border pt-6 text-xs text-theme-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ghumakkad</span>
          <span>Data: OpenWeather, OpenStreetMap, Wikipedia, OpenTripMap</span>
        </div>
        <p className="mt-2 text-xs text-theme-text-muted">
          Budget estimates are approximate. Third-party data may be delayed or inaccurate.
        </p>
      </div>
    </footer>
  );
}
