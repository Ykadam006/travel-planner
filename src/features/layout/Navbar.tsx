import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ViewTransitionLink, ViewTransitionNavLink } from '@/motion/ViewTransitionLink';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { cn } from '@/lib/cn';
import { useReducedMotion, useReducedMotionToggle } from '@/motion';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/itinerary-builder', label: 'Plan Trip' },
  { to: '/packing-list', label: 'Packing' },
  { to: '/travel-suggestions', label: 'Explore Ideas' },
  { to: '/budget-estimator', label: 'Budget Tool' },
  { to: '/weather-forecast', label: 'Weather' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const toggleMotion = useReducedMotionToggle();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map(({ to, label }) => {
        const isActive = location.pathname === to;
        return (
          <li key={to}>
            <ViewTransitionNavLink
              to={to}
              onClick={mobile ? toggleMenu : undefined}
              className={cn(
                'block px-3 py-2 rounded-md transition-colors motion-hover',
                isActive
                  ? 'bg-primary-100 text-primary-700 font-medium dark:bg-primary-900/40 dark:text-primary-300'
                  : 'text-theme-text-muted hover:bg-theme-surface-subtle hover:text-theme-text-main'
              )}
            >
              {label}
            </ViewTransitionNavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 border-b border-theme-border bg-theme-surface-subtle/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <ViewTransitionLink to="/" className="flex items-center gap-2.5">
          <span className="text-xl font-display font-semibold text-theme-text-main">Ghumakkad</span>
        </ViewTransitionLink>

        {/* Desktop */}
        <ul className="hidden md:flex md:items-center md:gap-1">
          <NavLinks />
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-theme-text-muted hover:bg-theme-surface-subtle hover:text-theme-text-main"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>
          <button
            type="button"
            onClick={toggleMotion}
            className="rounded-lg p-2 text-theme-text-muted hover:bg-theme-surface-subtle"
            aria-pressed={reduceMotion}
            aria-label={reduceMotion ? 'Enable motion' : 'Reduce motion'}
          >
            {reduceMotion ? '▶' : '⏸'}
          </button>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-md p-2 text-theme-text-muted hover:bg-theme-surface-subtle md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            data-testid="nav-toggle"
          >
            {mobileMenuOpen ? <VscChromeClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — drawer push + blur overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[110] h-full w-72 max-w-[85vw] border-l border-theme-border bg-theme-surface-subtle shadow-xl backdrop-blur-md md:hidden"
            >
              <div className="flex items-center justify-between border-b border-theme-border px-4 py-3">
                <span className="font-medium text-theme-text-main">Menu</span>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="rounded-lg p-2 text-theme-text-muted hover:bg-theme-surface-subtle"
                  aria-label="Close menu"
                >
                  <VscChromeClose size={20} />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 py-4">
                <NavLinks mobile />
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
