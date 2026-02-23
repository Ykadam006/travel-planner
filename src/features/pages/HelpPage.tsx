import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="Help Center" subtitle="Quick answers." />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <h2 id="shortcuts" className="mt-6 text-xl font-semibold text-theme-text-main">
          Keyboard Shortcuts
        </h2>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          <li>Tab — Navigate between interactive elements</li>
          <li>Enter — Activate links and buttons</li>
          <li>Escape — Close modals and menus</li>
        </ul>
        <h2 className="mt-6 text-xl font-semibold text-theme-text-main">FAQ</h2>
        <p>
          <strong>Where is my data stored?</strong> Locally in your browser. We don&apos;t store it
          on servers.
        </p>
        <p>
          <strong>How do I export my itinerary?</strong> Export feature coming soon. For now, copy
          from the page.
        </p>
        <p>
          <ViewTransitionLink to="/" className="text-primary-600 hover:underline">
            ← Back to Home
          </ViewTransitionLink>
        </p>
      </div>
    </div>
  );
}
