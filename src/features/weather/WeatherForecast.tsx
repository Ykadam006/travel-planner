import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { FeedbackMessage } from '@/components/FeedbackMessage';
import { LottieAnimation } from '@/motion';
import { staggerIn, staggerItem } from '@/motion';

const API_KEY = '8fd8ed51284e42978ea222605242311';

interface WeatherData {
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

const LOTTIE_WEATHER: Record<number, string> = {
  1000: 'https://assets2.lottiefiles.com/packages/lf20_2lnxtqsa.json', // Clear
  1003: 'https://assets2.lottiefiles.com/packages/lf20_2lnxtqsa.json', // Partly cloudy
  1006: 'https://assets2.lottiefiles.com/packages/lf20_2lnxtqsa.json', // Cloudy
  1063: 'https://assets2.lottiefiles.com/packages/lf20_2lnxtqsa.json', // Rain
  1188: 'https://assets2.lottiefiles.com/packages/lf20_2lnxtqsa.json', // Light rain
};

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const src = LOTTIE_WEATHER[code] ?? LOTTIE_WEATHER[1000];
  const fallback = ['☀️', '⛅', '☁️', '🌧️'][Math.min(3, Math.floor(code / 400))] ?? '🌤️';
  return (
    <div className={`relative flex h-12 w-12 items-center justify-center ${className ?? ''}`}>
      <span className="absolute text-2xl" aria-hidden>
        {fallback}
      </span>
      <div className="relative z-10">
        <LottieAnimation
          src={src}
          loop={true}
          className="h-10 w-10 opacity-90"
          ariaLabel="Weather condition"
        />
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <motion.div
      className="rounded-xl border border-theme-border bg-theme-surface/90 p-6 shadow-lg backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-4 h-8 w-40 animate-pulse rounded bg-theme-surface-subtle" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-6 animate-pulse rounded bg-theme-surface-subtle/80" />
        ))}
      </div>
    </motion.div>
  );
}

interface HourItem {
  time: string;
  temp_c: number;
  condition: { text: string };
  wind_kph: number;
  humidity: number;
}

function HourlyModal({
  open,
  onClose,
  hourly,
  date,
}: {
  open: boolean;
  onClose: () => void;
  hourly: HourItem[];
  date: string;
}) {
  if (!open) return null;

  const items = hourly ?? [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="mx-4 max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl border border-theme-border bg-theme-surface shadow-2xl"
        >
          <div className="border-b border-theme-border p-4">
            <motion.h3
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-lg font-semibold"
            >
              Hourly forecast — {date}
            </motion.h3>
          </div>
          <div className="max-h-96 overflow-y-auto p-4">
            <motion.ul
              variants={staggerIn(0.03)}
              initial="initial"
              animate="animate"
              className="space-y-2"
            >
              {items.slice(0, 24).map((h) => (
                <motion.li
                  key={h.time}
                  variants={staggerItem}
                  className="flex items-center justify-between rounded-lg border border-theme-border px-4 py-3"
                >
                  <span className="text-sm text-theme-text-muted">
                    {new Date(h.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="font-medium">{h.temp_c}°C</span>
                  <span className="text-sm text-theme-text-muted">{h.condition.text}</span>
                  <span className="text-xs text-theme-text-muted/80">
                    {h.wind_kph} km/h • {h.humidity}%
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="border-t border-theme-border p-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function WeatherForecast() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hourlyOpen, setHourlyOpen] = useState(false);
  const [hourlyDate, setHourlyDate] = useState('');

  const fetchWeatherData = (city: string) => {
    setLoading(true);
    setError('');
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch(() => {
        setError('Could not fetch weather data. Please try again.');
        setWeatherData(null);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    if (location.trim() === '') {
      setError('Please enter a valid location');
      return;
    }
    fetchWeatherData(location);
  };

  const openHourly = (date: string) => {
    setHourlyDate(date);
    setHourlyOpen(true);
  };

  const getWeatherBgClass = () => {
    if (!weatherData) return 'from-theme-surface-subtle to-theme-surface';
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear'))
      return 'from-amber-100 to-orange-100';
    if (condition.includes('rain') || condition.includes('showers'))
      return 'from-theme-surface to-theme-surface-subtle';
    if (condition.includes('cloud') || condition.includes('overcast'))
      return 'from-theme-surface-subtle to-theme-border';
    if (condition.includes('snow')) return 'from-sky-100 to-blue-200';
    return 'from-theme-surface-subtle to-theme-surface';
  };

  const forecastDays = weatherData?.forecast?.forecastday ?? [];

  return (
    <div
      className={`min-h-[80vh] bg-gradient-to-br ${getWeatherBgClass()} px-4 py-10 transition-colors duration-500 md:px-6`}
    >
      <div className="mx-auto max-w-2xl">
        <PageHero
          title="Weather Forecast"
          subtitle="Enter a city to get current weather and 3-day forecast."
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Enter city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 rounded-md border border-theme-border px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <Button onClick={handleSearch} disabled={loading} data-testid="weather-search-btn">
            {loading ? 'Loading…' : 'Get Weather'}
          </Button>
        </div>

        {error && (
          <div className="mb-6">
            <FeedbackMessage type="error" message={error} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <WeatherSkeleton key="skeleton" />
          ) : weatherData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={staggerIn(0.06)}
                initial="initial"
                animate="animate"
                className="space-y-6"
              >
                {/* Current weather card */}
                <motion.div
                  variants={staggerItem}
                  initial="initial"
                  animate="animate"
                  whileHover={{ rotate: 0.5, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-theme-border bg-theme-surface/90 p-6 shadow-lg backdrop-blur"
                >
                  <motion.div variants={staggerItem} className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold">{weatherData.location.name}</h2>
                      <p className="text-lg text-theme-text-muted">
                        {weatherData.current.condition.text}
                      </p>
                    </div>
                    <WeatherIcon code={weatherData.current.condition.code} />
                  </motion.div>
                  <motion.div variants={staggerItem} className="mt-4 grid gap-3 sm:grid-cols-2">
                    <p className="flex items-center gap-2 text-theme-text-main">
                      <span className="font-medium">{weatherData.current.temp_c}°C</span>
                      <span className="text-sm">
                        Feels like {weatherData.current.feelslike_c}°C
                      </span>
                    </p>
                    <p className="text-theme-text-muted">
                      Humidity: {weatherData.current.humidity}%
                    </p>
                    <p className="text-theme-text-muted">
                      Wind: {weatherData.current.wind_kph} km/h
                    </p>
                    <p className="text-theme-text-muted">UV: {weatherData.current.uv}</p>
                  </motion.div>
                </motion.div>

                {/* Forecast day cards */}
                {forecastDays.map((day) => (
                  <motion.div
                    key={day.date}
                    variants={staggerItem}
                    initial="initial"
                    animate="animate"
                    whileHover={{ rotate: 0.5, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-theme-border bg-theme-surface/90 p-6 shadow-lg backdrop-blur"
                  >
                    <motion.div
                      variants={staggerItem}
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => openHourly(day.date)}
                    >
                      <div className="flex items-center gap-4">
                        <WeatherIcon code={day.day.condition.code} />
                        <div>
                          <h3 className="font-semibold">
                            {new Date(day.date).toLocaleDateString([], {
                              weekday: 'long',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </h3>
                          <p className="text-sm text-theme-text-muted">{day.day.condition.text}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                        </p>
                        <p className="text-xs text-theme-text-muted">View hourly →</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {hourlyOpen && weatherData?.forecast?.forecastday && (
          <HourlyModal
            open={hourlyOpen}
            onClose={() => setHourlyOpen(false)}
            hourly={weatherData.forecast.forecastday.find((d) => d.date === hourlyDate)?.hour ?? []}
            date={hourlyDate}
          />
        )}
      </div>
    </div>
  );
}
