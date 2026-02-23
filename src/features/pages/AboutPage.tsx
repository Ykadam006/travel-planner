import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="About Ghumakkad" subtitle="Plan trips faster — all in one place." />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <p>
          Ghumakkad (गुम्मक्कड़) means &quot;wanderer&quot; or &quot;traveler&quot; in Hindi. This
          app helps you plan trips with itineraries, packing lists, budget estimates, and weather
          forecasts — all in one place.
        </p>
        <p>
          Built as a portfolio project to showcase modern React, motion design, and API
          integrations. Data powered by OpenStreetMap, Wikipedia, OpenWeather, and OpenTripMap.
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
