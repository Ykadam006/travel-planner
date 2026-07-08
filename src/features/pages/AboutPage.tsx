import { StaticPage, InfoSection } from './StaticPage';

export function AboutPage() {
  return (
    <StaticPage title="About Ghumakkad" subtitle="Plan trips faster — all in one place.">
      <InfoSection icon="🧭" title="The name">
        <p>
          Ghumakkad (गुम्मक्कड़) means &quot;wanderer&quot; or &quot;traveler&quot; in Hindi. This
          app helps you plan trips with itineraries, packing lists, budget estimates, and weather
          forecasts — all in one place.
        </p>
      </InfoSection>
      <InfoSection icon="🛠️" title="The project">
        <p>
          Built as a portfolio project to showcase modern React, motion design, and API
          integrations: route-level view transitions, GSAP scroll storytelling, TanStack Query
          caching, and a token-driven design system with full dark mode.
        </p>
        <p>Data powered by OpenStreetMap, Wikipedia, Visual Crossing, and OpenTripMap.</p>
      </InfoSection>
    </StaticPage>
  );
}
