import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="What's New" subtitle="Changelog" />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <h2 className="text-xl font-semibold text-theme-text-main">v0.3.0 — Feb 2026</h2>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          <li>Destination search with Nominatim, Wikipedia, OpenTripMap</li>
          <li>Full footer with product links, tools, and attributions</li>
          <li>Simplified home screen</li>
          <li>Error boundaries and improved loading states</li>
        </ul>
        <p>
          <ViewTransitionLink to="/" className="text-primary-600 hover:underline">
            ← Back to Home
          </ViewTransitionLink>
        </p>
      </div>
    </div>
  );
}
