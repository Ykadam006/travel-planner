import { http, HttpResponse } from 'msw';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const WIKIPEDIA_BASE = 'https://en.wikipedia.org';

export const handlers = [
  http.get(`${NOMINATIM_BASE}/search`, () => {
    return HttpResponse.json([
      {
        place_id: 12345,
        lat: '48.8566',
        lon: '2.3522',
        display_name: 'Paris, France',
        type: 'city',
        address: { country: 'France' },
        extratags: { wikipedia: 'en:Paris' },
      },
    ]);
  }),

  http.get(`${WIKIPEDIA_BASE}/api/rest_v1/page/summary/Paris`, () => {
    return HttpResponse.json({
      extract: 'Paris is the capital of France.',
      thumbnail: { source: 'https://upload.wikimedia.org/paris.jpg' },
    });
  }),

  // Weather is requested via the Netlify proxy path in app code and directly
  // from Visual Crossing in dev — mock both, returning the raw Visual Crossing
  // Timeline shape (the client adapter converts it to WeatherData).
  http.get(
    /(\/api\/weather|weather\.visualcrossing\.com\/VisualCrossingWebServices)/,
    ({ request }) => {
      const url = new URL(request.url);
      const q = url.searchParams.get('q') ?? url.pathname.split('/timeline/')[1];
      if (!q) return HttpResponse.json({ error: 'Missing q' }, { status: 400 });
      return HttpResponse.json({
        resolvedAddress: decodeURIComponent(q),
        currentConditions: {
          temp: 20,
          feelslike: 19,
          humidity: 60,
          windspeed: 15,
          windgust: 20,
          pressure: 1013,
          uvindex: 5,
          conditions: 'Partly cloudy',
          icon: 'partly-cloudy-day',
        },
        days: [
          {
            datetime: '2024-12-01',
            tempmax: 22,
            tempmin: 12,
            conditions: 'Clear',
            icon: 'clear-day',
            hours: [],
          },
        ],
      });
    }
  ),
];
