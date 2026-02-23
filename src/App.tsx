import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionProvider } from '@/motion';
import { RoutePageSkeleton } from '@/motion/RoutePageSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/features/layout/Navbar';
import { Footer } from '@/features/layout/Footer';

/* Lazy-load heavy routes: Home (GSAP), Budget (Chart.js), Itinerary (images), etc. */
const HomePage = lazy(() =>
  import('@/features/home/HomePage').then((m) => ({ default: m.HomePage }))
);
const ItineraryBuilder = lazy(() =>
  import('@/features/itinerary/ItineraryBuilder').then((m) => ({ default: m.ItineraryBuilder }))
);
const PackingList = lazy(() =>
  import('@/features/packing/PackingList').then((m) => ({ default: m.PackingList }))
);
const TravelSuggestions = lazy(() =>
  import('@/features/suggestions/TravelSuggestions').then((m) => ({ default: m.TravelSuggestions }))
);
const BudgetEstimator = lazy(() =>
  import('@/features/budget/BudgetEstimator').then((m) => ({ default: m.BudgetEstimator }))
);
const WeatherForecast = lazy(() =>
  import('@/features/weather/WeatherForecast').then((m) => ({ default: m.WeatherForecast }))
);
const DestinationDetail = lazy(() =>
  import('@/features/destination/DestinationDetail').then((m) => ({ default: m.DestinationDetail }))
);
const AboutPage = lazy(() =>
  import('@/features/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const PrivacyPage = lazy(() =>
  import('@/features/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import('@/features/pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const AccessibilityPage = lazy(() =>
  import('@/features/pages/AccessibilityPage').then((m) => ({ default: m.AccessibilityPage }))
);
const HelpPage = lazy(() =>
  import('@/features/pages/HelpPage').then((m) => ({ default: m.HelpPage }))
);
const ChangelogPage = lazy(() =>
  import('@/features/pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage }))
);
const DataSourcesPage = lazy(() =>
  import('@/features/pages/DataSourcesPage').then((m) => ({ default: m.DataSourcesPage }))
);

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <MotionProvider>
            <div className="min-h-screen flex flex-col app-shell">
              <Navbar />
              <main className="flex-1" data-testid="main-content">
                <Suspense fallback={<RoutePageSkeleton />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
                    <Route path="/packing-list" element={<PackingList />} />
                    <Route path="/travel-suggestions" element={<TravelSuggestions />} />
                    <Route path="/budget-estimator" element={<BudgetEstimator />} />
                    <Route path="/weather-forecast" element={<WeatherForecast />} />
                    <Route path="/destination/:id" element={<DestinationDetail />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/accessibility" element={<AccessibilityPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/changelog" element={<ChangelogPage />} />
                    <Route path="/data-sources" element={<DataSourcesPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </MotionProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
