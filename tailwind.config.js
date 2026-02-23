/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Coastal Minimal Premium — primary (CTAs, nav, links) */
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0b5fff',
          600: '#0b5fff',
          700: '#094bd6',
          800: '#0742b8',
          900: '#053891',
          950: '#021a3d',
        },
        /* Secondary (support, gradients) */
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        /* Accent (chips, badges, highlights) — light #FF4D6D, dark #FB7185 */
        accent: {
          50: '#fff1f3',
          100: '#ffe4e9',
          200: '#ffccd6',
          300: '#ff98a8',
          400: '#ff6b82',
          500: '#ff4d6d',
          600: '#e63e5c',
          700: '#cc2f4d',
          800: '#992236',
          900: '#66141f',
          950: '#330a10',
        },
        /* Semantic — use only for real states */
        success: '#16a34a',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#38bdf8',
        /* Warm neutrals (nav, footer, cards) */
        warm: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe2d4',
          300: '#ddcfbb',
          400: '#c9b59a',
          500: '#b89d80',
        },
        /* Neutral text (main) */
        ink: {
          950: '#0f172a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
        },
        /* Theme tokens — use these for surfaces/text/border (auto light/dark) */
        theme: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          'surface-subtle': 'var(--surface-subtle)',
          'text-main': 'var(--text-main)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: '9999px',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionDuration: {
        micro: 'var(--duration-micro)',
        ui: 'var(--duration-ui)',
        page: 'var(--duration-page)',
        narrative: 'var(--duration-narrative)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        emphasized: 'var(--ease-emphasized)',
        exit: 'var(--ease-exit)',
      },
    },
  },
  plugins: [],
};
