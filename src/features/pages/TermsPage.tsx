import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="Terms of Use" subtitle="Last updated: Feb 2026" />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <p>
          Ghumakkad is provided as-is for personal use. Budget estimates and weather forecasts are
          approximate and should not be relied upon for financial or travel decisions.
        </p>
        <p>
          Data from third-party services (OpenWeather, OpenStreetMap, Wikipedia) is subject to their
          terms. See <ViewTransitionLink to="/data-sources">Data Sources</ViewTransitionLink> for
          attributions.
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
