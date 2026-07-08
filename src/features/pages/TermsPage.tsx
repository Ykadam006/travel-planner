import { ViewTransitionLink } from '@/motion';
import { StaticPage, InfoSection } from './StaticPage';

export function TermsPage() {
  return (
    <StaticPage title="Terms of Use" subtitle="Last updated: Feb 2026">
      <InfoSection icon="📄" title="Use as-is">
        <p>
          Ghumakkad is provided as-is for personal use. Budget estimates and weather forecasts are
          approximate and should not be relied upon for financial or travel decisions.
        </p>
      </InfoSection>
      <InfoSection icon="🌐" title="Third-party data">
        <p>
          Data from third-party services (Visual Crossing, OpenStreetMap, Wikipedia) is subject to
          their terms. See{' '}
          <ViewTransitionLink to="/data-sources" className="text-primary-600 hover:underline">
            Data Sources
          </ViewTransitionLink>{' '}
          for attributions.
        </p>
      </InfoSection>
    </StaticPage>
  );
}
