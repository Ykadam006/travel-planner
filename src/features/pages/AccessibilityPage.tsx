import { Button } from '@/components/ui';
import { useReducedMotion, useReducedMotionToggle } from '@/motion';
import { useTheme } from '@/contexts/ThemeContext';
import { StaticPage, InfoSection } from './StaticPage';

export function AccessibilityPage() {
  const reduceMotion = useReducedMotion();
  const toggleMotion = useReducedMotionToggle();
  const { theme, toggleTheme } = useTheme();

  return (
    <StaticPage title="Accessibility" subtitle="Built for everyone.">
      <InfoSection icon="⌨️" title="Keyboard navigation">
        <p>
          Every interactive element is reachable and operable by keyboard: navigation, forms, modals
          and sheets (with focus trapping and Escape to close), filter chips, checkboxes, and
          drag-and-drop reordering in the itinerary (pick up with Space, move with arrow keys).
        </p>
        <p>
          Try it now — press{' '}
          <kbd className="rounded border border-theme-border bg-theme-surface-subtle px-1.5 py-0.5 font-mono text-xs">
            Tab
          </kbd>{' '}
          and watch the focus ring travel through this page.
        </p>
      </InfoSection>

      <InfoSection icon="🎬" title="Responsible motion">
        <p>
          Animation in Ghumakkad supports meaning — route continuity, state changes, spatial
          orientation — and is never required to use the app. We honor your operating system&apos;s
          <em> reduce motion</em> preference automatically, and you can override it here: parallax,
          pinned scroll scenes, and autoplaying movement are replaced with simple fades.
        </p>
        <Button variant="outline" onClick={toggleMotion} aria-pressed={reduceMotion}>
          {reduceMotion ? '▶ Enable motion' : '⏸ Reduce motion'}
        </Button>
        <p className="text-sm">
          Motion is currently <strong>{reduceMotion ? 'reduced' : 'on'}</strong>.
        </p>
      </InfoSection>

      <InfoSection icon="🌗" title="Theme & contrast">
        <p>
          Light and dark themes are fully supported, follow your system preference by default, and
          keep text at WCAG-AA contrast on all surfaces.
        </p>
        <Button variant="outline" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Switch to light' : '🌙 Switch to dark'}
        </Button>
      </InfoSection>

      <InfoSection icon="🔎" title="Focus styles">
        <p>
          Keyboard focus is always visible: a consistent two-pixel ring drawn with the brand color,
          shown only for keyboard interaction so mouse users aren&apos;t distracted.
        </p>
      </InfoSection>

      <InfoSection icon="🐛" title="Found an issue?">
        <p>
          If you encounter accessibility issues, please{' '}
          <a
            href="https://github.com/yourusername/ghumakkad/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            report them
          </a>
          . We treat accessibility bugs as functional bugs.
        </p>
      </InfoSection>
    </StaticPage>
  );
}
