import { http, HttpResponse } from 'msw';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const WIKIPEDIA_BASE = 'https://en.wikipedia.org';
const WEATHER_BASE = 'https://api.weatherapi.com';

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

  http.get(`${WEATHER_BASE}/v1/forecast.json`, ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    if (!q) return HttpResponse.json({ error: 'Missing q' }, { status: 400 });
    return HttpResponse.json({
      location: { name: q },
      current: {
        temp_c: 20,
        feelslike_c: 19,
        humidity: 60,
        wind_kph: 15,
        condition: { text: 'Partly cloudy', code: 1003, icon: '' },
        uv: 5,
        pressure_mb: 1013,
        gust_kph: 20,
      },
      forecast: {
        forecastday: [
          {
            date: '2024-12-01',
            day: { maxtemp_c: 22, mintemp_c: 12, condition: { text: 'Sunny', code: 1000 } },
            hour: [],
          },
        ],
      },
    });
  }),
];
