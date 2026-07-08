import { StaticPage, InfoSection } from './StaticPage';

export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="Last updated: Feb 2026">
      <InfoSection icon="💾" title="Your data stays with you">
        <p>
          Ghumakkad stores trip data (itinerary, packing list, budget) locally in your browser. We
          do not collect or transmit personal data to our servers.
        </p>
      </InfoSection>
      <InfoSection icon="🔗" title="Third-party services">
        <p>
          Third-party APIs (Visual Crossing, OpenStreetMap, Wikipedia) may receive location or
          search queries when you use their features. Please refer to their respective privacy
          policies.
        </p>
      </InfoSection>
    </StaticPage>
  );
}
