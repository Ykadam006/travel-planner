/**
 * Weather client. Production goes through the Netlify Function proxy
 * (/api/weather) so the WeatherAPI key stays server-side.
 * For local `vite dev` without `netlify dev`, set VITE_WEATHERAPI_KEY in
 * .env.local — Vite env vars are public, so use a throwaway dev key only.
 */

export interface WeatherData {
  location: { name: string };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: { text: string; code: number; icon: string };
    uv: number;
    pressure_mb: number;
    gust_kph: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: { maxtemp_c: number; mintemp_c: number; condition: { text: string; code: number } };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: { text: string; code: number };
        wind_kph: number;
        humidity: number;
      }>;
    }>;
  };
}

const DEV_KEY = import.meta.env.VITE_WEATHERAPI_KEY as string | undefined;

function buildUrl(city: string, days: number): string {
  if (import.meta.env.DEV && DEV_KEY) {
    const url = new URL('https://api.weatherapi.com/v1/forecast.json');
    url.searchParams.set('key', DEV_KEY);
    url.searchParams.set('q', city);
    url.searchParams.set('days', String(days));
    return url.toString();
  }
  const params = new URLSearchParams({ q: city, days: String(days) });
  return `/api/weather?${params}`;
}

export async function getWeatherForecast(city: string, days = 3): Promise<WeatherData> {
  const res = await fetch(buildUrl(city, days));
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? `Weather request failed (${res.status})`);
  }
  return (await res.json()) as WeatherData;
}
