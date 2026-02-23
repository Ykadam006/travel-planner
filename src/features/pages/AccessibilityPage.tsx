import { ViewTransitionLink } from '@/motion';
import { PageHero } from '@/components/PageHero';

export function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <PageHero title="Accessibility" subtitle="Built for everyone." />
      <div className="mt-8 space-y-4 text-theme-text-muted">
        <p>
          Ghumakkad aims to be accessible. We support keyboard navigation, semantic HTML, and ARIA
          labels where needed. A &quot;Reduce motion&quot; toggle is available in the navbar and
          footer to respect user preferences.
        </p>
        <p>
          If you encounter accessibility issues, please{' '}
          <a
            href="https://github.com/yourusername/ghumakkad/issues"
            className="text-primary-600 hover:underline"
          >
            report them
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
