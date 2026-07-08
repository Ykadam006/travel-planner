/**
 * Visual Crossing weather proxy — keeps the API key server-side.
 * Client calls /api/weather?q=<city> and receives the raw Timeline API
 * response (the client adapts it to the app's WeatherData shape).
 * Set VISUALCROSSING_API_KEY in Netlify environment variables (never commit it).
 */

export default async (req: Request): Promise<Response> => {
  const key = process.env.VISUALCROSSING_API_KEY;
  if (!key) {
    return Response.json(
      { error: 'Weather service is not configured (missing VISUALCROSSING_API_KEY).' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() ?? '';

  if (!q || q.length > 100) {
    return Response.json({ error: 'Query parameter "q" is required.' }, { status: 400 });
  }

  const upstream = new URL(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(q)}`
  );
  upstream.searchParams.set('unitGroup', 'metric');
  upstream.searchParams.set('include', 'days,hours,current');
  upstream.searchParams.set('contentType', 'json');
  upstream.searchParams.set('key', key);

  try {
    const res = await fetch(upstream);
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        'content-type': 'application/json',
        // Same-city requests can be served from the CDN for 10 min
        'cache-control': 'public, max-age=600',
      },
    });
  } catch {
    return Response.json({ error: 'Upstream weather service unavailable.' }, { status: 502 });
  }
};

export const config = { path: '/api/weather' };
