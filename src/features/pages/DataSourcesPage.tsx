import { StaticPage, InfoSection } from './StaticPage';

const SOURCES = [
  {
    icon: '☀️',
    name: 'WeatherAPI',
    role: 'Weather forecasts and current conditions',
    href: 'https://www.weatherapi.com/',
  },
  {
    icon: '🗺️',
    name: 'OpenStreetMap / Nominatim',
    role: 'Location search, geocoding, and map tiles',
    href: 'https://www.openstreetmap.org/copyright',
  },
  {
    icon: '📚',
    name: 'Wikipedia / Wikimedia',
    role: 'Destination descriptions and images',
    href: 'https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_API_Usage_Guidelines',
  },
  {
    icon: '📍',
    name: 'OpenTripMap',
    role: 'Points of interest nearby (museums, landmarks)',
    href: 'https://opentripmap.io',
  },
];

export function DataSourcesPage() {
  return (
    <StaticPage title="Data Sources" subtitle="Attributions and disclaimers.">
      <InfoSection icon="🤝" title="Services we rely on">
        <p>
          Ghumakkad uses the following third-party services. Weather and location data may be
          delayed or inaccurate.
        </p>
        <ul className="mt-4 space-y-3">
          {SOURCES.map((s) => (
            <li
              key={s.name}
              className="flex items-start gap-3 rounded-xl border border-theme-border bg-theme-surface p-4"
            >
              <span className="text-xl" aria-hidden>
                {s.icon}
              </span>
              <div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-theme-text-main hover:text-primary-600 hover:underline"
                >
                  {s.name}
                </a>
                <p className="text-sm">{s.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </InfoSection>
      <InfoSection icon="⚖️" title="Licensing">
        <p>
          © OpenStreetMap contributors. Map data licensed under{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            ODbL
          </a>
          . Photography via Unsplash.
        </p>
      </InfoSection>
    </StaticPage>
  );
}
