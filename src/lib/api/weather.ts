/**
 * Weather client — Visual Crossing Timeline API.
 * Production goes through the Netlify Function proxy (/api/weather) so the
 * key stays server-side. For local `vite dev` without `netlify dev`, set
 * VITE_VISUALCROSSING_API_KEY in .env.local (public in the bundle — dev only).
 *
 * The raw Visual Crossing response is adapted into the app-facing WeatherData
 * shape below, so UI components never depend on the provider's format.
 * @see https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
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

/* ── Visual Crossing response (only the fields we read) ── */

interface VCConditions {
  temp?: number;
  feelslike?: number;
  humidity?: number;
  windspeed?: number;
  windgust?: number;
  pressure?: number;
  uvindex?: number;
  conditions?: string;
  icon?: string;
}

interface VCHour extends VCConditions {
  datetime: string; // "HH:MM:SS"
}

interface VCDay extends VCConditions {
  datetime: string; // "YYYY-MM-DD"
  tempmax?: number;
  tempmin?: number;
  hours?: VCHour[];
}

export interface VisualCrossingResponse {
  resolvedAddress?: string;
  address?: string;
  currentConditions?: VCConditions;
  days?: VCDay[];
}

/** Map Visual Crossing icon slugs onto the condition codes the UI knows */
function iconToCode(icon?: string): number {
  if (!icon) return 1000;
  if (icon.startsWith('clear')) return 1000;
  if (icon.startsWith('partly-cloudy')) return 1003;
  if (icon === 'cloudy' || icon === 'fog' || icon === 'wind') return 1006;
  return 1063; // rain / snow / sleet / thunder — precipitation family
}

export function adaptVisualCrossing(vc: VisualCrossingResponse, days: number): WeatherData {
  const current = vc.currentConditions ?? {};
  const forecastDays = (vc.days ?? []).slice(0, days);

  return {
    location: { name: vc.resolvedAddress ?? vc.address ?? 'Unknown location' },
    current: {
      temp_c: Math.round((current.temp ?? 0) * 10) / 10,
      feelslike_c: Math.round((current.feelslike ?? current.temp ?? 0) * 10) / 10,
      humidity: Math.round(current.humidity ?? 0),
      wind_kph: Math.round(current.windspeed ?? 0),
      condition: {
        text: current.conditions ?? '—',
        code: iconToCode(current.icon),
        icon: current.icon ?? '',
      },
      uv: current.uvindex ?? 0,
      pressure_mb: Math.round(current.pressure ?? 0),
      gust_kph: Math.round(current.windgust ?? current.windspeed ?? 0),
    },
    forecast: {
      forecastday: forecastDays.map((d) => ({
        date: d.datetime,
        day: {
          maxtemp_c: Math.round((d.tempmax ?? 0) * 10) / 10,
          mintemp_c: Math.round((d.tempmin ?? 0) * 10) / 10,
          condition: { text: d.conditions ?? '—', code: iconToCode(d.icon) },
        },
        hour: (d.hours ?? []).map((h) => ({
          // Full timestamp so the UI can Date-parse it for locale formatting
          time: `${d.datetime} ${h.datetime}`,
          temp_c: Math.round((h.temp ?? 0) * 10) / 10,
          condition: { text: h.conditions ?? '—', code: iconToCode(h.icon) },
          wind_kph: Math.round(h.windspeed ?? 0),
          humidity: Math.round(h.humidity ?? 0),
        })),
      })),
    },
  };
}

const DEV_KEY = import.meta.env.VITE_VISUALCROSSING_API_KEY as string | undefined;

function buildUrl(city: string): string {
  if (import.meta.env.DEV && DEV_KEY) {
    const url = new URL(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`
    );
    url.searchParams.set('unitGroup', 'metric');
    url.searchParams.set('include', 'days,hours,current');
    url.searchParams.set('contentType', 'json');
    url.searchParams.set('key', DEV_KEY);
    return url.toString();
  }
  const params = new URLSearchParams({ q: city });
  return `/api/weather?${params}`;
}

export async function getWeatherForecast(city: string, days = 3): Promise<WeatherData> {
  const res = await fetch(buildUrl(city));
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? `Weather request failed (${res.status})`);
  }
  const raw = (await res.json()) as VisualCrossingResponse;
  return adaptVisualCrossing(raw, days);
}
