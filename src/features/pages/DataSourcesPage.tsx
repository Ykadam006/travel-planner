import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function DataSourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="Data Sources" subtitle="Attributions and disclaimers." />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <p>
          Ghumakkad uses the following third-party services. Weather and location data may be
          delayed or inaccurate.
        </p>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          <li>
            <strong>OpenWeather</strong> — Weather forecasts and current conditions
          </li>
          <li>
            <strong>OpenStreetMap / Nominatim</strong> — Location search and geocoding
          </li>
          <li>
            <strong>Wikipedia / Wikimedia</strong> — Destination descriptions and images
          </li>
          <li>
            <strong>OpenTripMap</strong> — Points of interest nearby (e.g. museums, landmarks)
          </li>
        </ul>
        <p>
          © OpenStreetMap contributors. Data licensed under{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            ODbL
          </a>
          .
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
