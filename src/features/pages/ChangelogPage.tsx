import { Badge } from '@/components/ui';
import { StaticPage, InfoSection } from './StaticPage';

export function ChangelogPage() {
  return (
    <StaticPage title="What's New" subtitle="Changelog">
      <InfoSection icon="✨" title="v0.4.0 — Jul 2026">
        <div className="mb-2">
          <Badge>Latest</Badge>
        </div>
        <ul className="list-disc space-y-1 pl-6">
          <li>Cinematic home page with GSAP scroll story and shared-element transitions</li>
          <li>Split planner + live map layout with two-way selection in the Itinerary Builder</li>
          <li>Compare destinations in an accessible bottom sheet</li>
          <li>TanStack Query caching for search and weather</li>
          <li>Weather API key moved behind a Netlify Function proxy</li>
          <li>Design tokens, unified focus styles, and richer dark mode</li>
        </ul>
      </InfoSection>
      <InfoSection icon="🗓️" title="v0.3.0 — Feb 2026">
        <ul className="list-disc space-y-1 pl-6">
          <li>Destination search with Nominatim, Wikipedia, OpenTripMap</li>
          <li>Full footer with product links, tools, and attributions</li>
          <li>Simplified home screen</li>
          <li>Error boundaries and improved loading states</li>
        </ul>
      </InfoSection>
    </StaticPage>
  );
}
