import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PageHero } from '@/components/PageHero';

ChartJS.register(ArcElement, Tooltip, Legend);

const CATEGORIES = ['Transport', 'Accommodation', 'Food', 'Activities', 'Misc'] as const;
const CHART_COLORS = ['#0b5fff', '#14b8a6', '#ff4d6d', '#f59e0b', '#64748b'];

type TripStyle = 'budget' | 'moderate' | 'luxury' | 'splurge';

const TRIP_STYLE_BASES: Record<TripStyle, number[]> = {
  budget: [200, 400, 150, 100, 80],
  moderate: [400, 800, 300, 250, 150],
  luxury: [800, 1500, 600, 500, 300],
  splurge: [1500, 3000, 1200, 1000, 500],
};

const TRIP_STYLE_LABELS: Record<TripStyle, string> = {
  budget: 'Budget',
  moderate: 'Moderate',
  luxury: 'Luxury',
  splurge: 'Splurge',
};

const TRIP_STYLE_DESC: Record<TripStyle, string> = {
  budget: 'Hostels, buses, street food',
  moderate: 'Mid-range hotels, mix of transport',
  luxury: '4-star stays, fine dining',
  splurge: 'Top hotels, first-class, premium',
};

const TRIP_STYLE_MOOD: Record<TripStyle, string> = {
  budget: 'from-secondary-50 to-primary-50 dark:from-theme-surface dark:to-theme-bg',
  moderate: 'from-primary-50 to-secondary-50 dark:from-theme-surface dark:to-theme-bg',
  luxury: 'from-theme-surface-subtle to-primary-50 dark:from-theme-surface dark:to-theme-bg',
  splurge: 'from-accent-50 to-secondary-50 dark:from-theme-surface dark:to-theme-bg',
};

const CATEGORY_HINTS: Record<string, string> = {
  Transport: 'Flights, trains, car rental',
  Accommodation: 'Hotels, hostels, rentals',
  Food: 'Meals, drinks, snacks',
  Activities: 'Tours, tickets, experiences',
  Misc: 'Insurance, visas, souvenirs',
};

function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prevRef.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}

function TripStyleSelector({
  value,
  onChange,
}: {
  value: TripStyle;
  onChange: (v: TripStyle) => void;
}) {
  const styles: TripStyle[] = ['budget', 'moderate', 'luxury', 'splurge'];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {styles.map((style) => {
        const isActive = value === style;
        return (
          <motion.button
            key={style}
            type="button"
            onClick={() => onChange(style)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl border-2 px-4 py-3 text-left transition-shadow ${
              isActive
                ? 'border-primary-500 bg-theme-surface shadow-md ring-2 ring-primary-200'
                : 'border-theme-border bg-theme-surface/80 hover:border-theme-border'
            }`}
          >
            <span
              className={`block font-semibold ${isActive ? 'text-primary-700' : 'text-theme-text-main'}`}
            >
              {TRIP_STYLE_LABELS[style]}
            </span>
            <span className="mt-0.5 block text-xs text-theme-text-muted">
              {TRIP_STYLE_DESC[style]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function BudgetEstimator() {
  const [tripStyle, setTripStyle] = useState<TripStyle>('moderate');
  const [tripDays, setTripDays] = useState(7);
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [compareMode, setCompareMode] = useState(false);
  const [compareStyle, setCompareStyle] = useState<TripStyle>('budget');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: '-50px' });

  const bases = TRIP_STYLE_BASES[tripStyle];
  const values = CATEGORIES.map((cat, i) => amounts[cat] ?? bases[i] ?? 0);
  const total = values.reduce((a: number, b: number) => a + b, 0);
  const perDay = tripDays > 0 ? Math.round(total / tripDays) : 0;

  const compareBases = TRIP_STYLE_BASES[compareStyle];
  const compareValues = CATEGORIES.map((_, i) => (compareMode ? (compareBases[i] ?? 0) : 0));
  const compareTotal = compareValues.reduce((a: number, b: number) => a + b, 0);
  const comparePerDay = tripDays > 0 ? Math.round(compareTotal / tripDays) : 0;

  useEffect(() => {
    setAmounts(Object.fromEntries(CATEGORIES.map((cat, i) => [cat, bases[i] ?? 0])));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bases derived from tripStyle
  }, [tripStyle]);

  useEffect(() => {
    if (compareMode && compareStyle === tripStyle) {
      setCompareStyle(
        (['budget', 'moderate', 'luxury', 'splurge'] as const).find((s) => s !== tripStyle) ??
          'budget'
      );
    }
  }, [tripStyle, compareMode, compareStyle]);

  const chartData = {
    labels: [...CATEGORIES],
    datasets: [
      {
        data: values as number[],
        backgroundColor: CHART_COLORS.map((c, i) =>
          hoveredIndex !== null && hoveredIndex !== i ? `${c}40` : c
        ),
        hoverBackgroundColor: CHART_COLORS.map((c) => `${c}dd`),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: chartInView ? 800 : 0,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { usePointStyle: true, padding: 12 },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) => {
            const v = ctx.raw as number;
            const pct = total > 0 ? ((v / total) * 100).toFixed(1) : '0';
            return `${ctx.label}: $${v.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
    onHover: (_, elements) => {
      setHoveredIndex(elements[0]?.index ?? null);
    },
  };

  const updateAmount = (cat: string, v: number) => {
    setAmounts((prev) => ({ ...prev, [cat]: Math.max(0, v) }));
  };

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${TRIP_STYLE_MOOD[tripStyle]} transition-colors duration-500`}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <PageHero
          title="Budget Estimator"
          subtitle="Plan your travel budget by category. Pick a style, tweak the sliders, and see your total."
        />

        {/* Trip style + duration */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="mb-3 text-sm font-medium text-theme-text-muted">
            How do you like to travel?
          </h3>
          <TripStyleSelector value={tripStyle} onChange={setTripStyle} />
          <div className="mt-6 flex items-center gap-4">
            <label className="text-sm font-medium text-theme-text-main">Trip length</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={365}
                value={tripDays}
                onChange={(e) =>
                  setTripDays(Math.max(1, Math.min(365, parseInt(e.target.value, 10) || 1)))
                }
                className="w-20 rounded-lg border border-theme-border bg-theme-surface px-3 py-2 text-center font-medium text-theme-text-main focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-200"
              />
              <span className="text-sm text-theme-text-muted">days</span>
            </div>
          </div>
        </motion.section>

        {/* Sliders */}
        <motion.section
          className="mb-10"
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="mb-6 text-xl font-semibold text-theme-text-main">Customize your budget</h3>
          <div className="space-y-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat}
                layout
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="w-36 shrink-0">
                  <label className="block text-sm font-medium text-theme-text-main">{cat}</label>
                  <p className="text-xs text-theme-text-muted">{CATEGORY_HINTS[cat]}</p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={(TRIP_STYLE_BASES[tripStyle]?.[i] ?? 1000) * 3}
                  step={10}
                  value={values[i] ?? 0}
                  onChange={(e) => updateAmount(cat, parseFloat(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-theme-surface-subtle accent-primary-600"
                />
                <motion.span
                  className="w-20 shrink-0 text-right font-mono text-sm font-medium"
                  layout
                >
                  $<CountUp value={values[i] ?? 0} decimals={0} />
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Total + Compare toggle */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <motion.div
            className="rounded-xl border border-theme-border bg-theme-surface px-6 py-4 shadow-sm"
            layout
          >
            <p className="text-sm text-theme-text-muted">Total budget</p>
            <p className="text-2xl font-bold text-primary-600">
              $<CountUp value={total} decimals={0} />
            </p>
            {tripDays > 1 && (
              <p className="mt-1 text-sm text-theme-text-muted">
                ≈ ${perDay.toLocaleString()} per day
              </p>
            )}
          </motion.div>
          <label className="flex cursor-pointer items-center gap-3">
            <span className="text-sm text-theme-text-muted">Compare with another style</span>
            <button
              type="button"
              role="switch"
              aria-checked={compareMode}
              onClick={() => setCompareMode(!compareMode)}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                compareMode ? 'bg-primary-600' : 'bg-theme-surface-subtle'
              }`}
            >
              <motion.div
                className="absolute top-1 h-6 w-6 rounded-full bg-white shadow"
                animate={{ left: compareMode ? 32 : 4 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
            </button>
          </label>
        </div>

        {/* Scenario compare: split view */}
        <div ref={chartRef}>
          <AnimatePresence mode="wait">
            {compareMode ? (
              <motion.div
                key="compare"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-10 grid gap-6 md:grid-cols-2"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  className="rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm"
                >
                  <h4 className="mb-1 font-semibold text-primary-700">
                    {TRIP_STYLE_LABELS[tripStyle]}
                  </h4>
                  <p className="text-2xl font-bold">
                    $<CountUp value={total} decimals={0} />
                  </p>
                  {tripDays > 1 && (
                    <p className="text-sm text-theme-text-muted">
                      ≈ ${perDay.toLocaleString()}/day
                    </p>
                  )}
                  <div className="mt-4 h-40">
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="font-semibold text-theme-text-main">Compare with</h4>
                    <select
                      value={compareStyle}
                      onChange={(e) => setCompareStyle(e.target.value as TripStyle)}
                      className="rounded-lg border border-theme-border bg-theme-surface px-3 py-2 text-sm text-theme-text-main focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-200"
                    >
                      {(['budget', 'moderate', 'luxury', 'splurge'] as const)
                        .filter((s) => s !== tripStyle)
                        .map((s) => (
                          <option key={s} value={s}>
                            {TRIP_STYLE_LABELS[s]}
                          </option>
                        ))}
                    </select>
                  </div>
                  <p className="text-2xl font-bold text-theme-text-main">
                    $<CountUp value={compareTotal} decimals={0} />
                  </p>
                  {tripDays > 1 && (
                    <p className="text-sm text-theme-text-muted">
                      ≈ ${comparePerDay.toLocaleString()}/day
                    </p>
                  )}
                  <div className="mt-4 h-40">
                    <Pie
                      data={{
                        labels: [...CATEGORIES],
                        datasets: [
                          {
                            data: compareValues as number[],
                            backgroundColor: CHART_COLORS,
                            borderWidth: 0,
                          },
                        ],
                      }}
                      options={{
                        ...chartOptions,
                        animation: { duration: 600 },
                        plugins: {
                          ...chartOptions.plugins,
                          tooltip: {
                            callbacks: {
                              label: (ctx) => {
                                const v = ctx.raw as number;
                                const pct =
                                  compareTotal > 0 ? ((v / compareTotal) * 100).toFixed(1) : '0';
                                return `${ctx.label}: $${v.toLocaleString()} (${pct}%)`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="single"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mb-10 max-w-md rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm"
              >
                <h4 className="mb-4 font-semibold text-theme-text-main">Breakdown</h4>
                <div className="h-64">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category list with hover highlight */}
        <motion.ul
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
            hidden: {},
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.li
              key={cat}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex cursor-default justify-between rounded-lg border px-4 py-3 transition-colors ${
                hoveredIndex === i
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-theme-border bg-theme-surface'
              }`}
            >
              <span className="font-medium">{cat}</span>
              <span className="font-mono font-medium">
                $<CountUp value={values[i] ?? 0} decimals={0} />
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
