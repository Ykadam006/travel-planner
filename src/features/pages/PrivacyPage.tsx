import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="Privacy Policy" subtitle="Last updated: Feb 2026" />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <p>
          Ghumakkad stores trip data (itinerary, packing list, budget) locally in your browser. We
          do not collect or transmit personal data to our servers.
        </p>
        <p>
          Third-party APIs (OpenWeather, OpenStreetMap, Wikipedia) may receive location or search
          queries when you use their features. Please refer to their respective privacy policies.
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
