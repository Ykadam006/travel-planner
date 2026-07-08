/**
 * WeatherAPI proxy — keeps the API key server-side.
 * Client calls /.netlify/functions/weather?q=<city>&days=<1-3>
 * Set WEATHERAPI_KEY in Netlify environment variables (never commit it).
 */

const ALLOWED_DAYS = new Set(['1', '2', '3']);

export default async (req: Request): Promise<Response> => {
  const key = process.env.WEATHERAPI_KEY;
  if (!key) {
    return Response.json(
      { error: 'Weather service is not configured (missing WEATHERAPI_KEY).' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() ?? '';
  const days = url.searchParams.get('days') ?? '3';

  if (!q || q.length > 100) {
    return Response.json({ error: 'Query parameter "q" is required.' }, { status: 400 });
  }
  if (!ALLOWED_DAYS.has(days)) {
    return Response.json({ error: 'Parameter "days" must be 1–3.' }, { status: 400 });
  }

  const upstream = new URL('https://api.weatherapi.com/v1/forecast.json');
  upstream.searchParams.set('key', key);
  upstream.searchParams.set('q', q);
  upstream.searchParams.set('days', days);

  try {
    const res = await fetch(upstream);
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        'content-type': 'application/json',
        // Same city+day requests can be served from the CDN for 10 min
        'cache-control': 'public, max-age=600',
      },
    });
  } catch {
    return Response.json({ error: 'Upstream weather service unavailable.' }, { status: 502 });
  }
};

export const config = { path: '/api/weather' };
