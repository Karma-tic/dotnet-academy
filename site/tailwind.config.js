/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#090b0e',
        surface: {
          DEFAULT: '#11151c',
          card: '#11151c',
          elevated: '#19202c',
          light: '#FFFFFF',
          dark: '#0F172A',
          subtleLight: '#F8FAFC',
          subtleDark: '#0B0F19',
        },
        border: {
          subtle: '#202938',
          strong: '#334155',
        },
        signal: {
          DEFAULT: '#f59e0b',
          hover: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        status: {
          live: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.2)',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
      },
      fontFamily: {
        sans: ['Geist', 'General Sans', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        panel: '8px',
        pill: '9999px',
      },
      boxShadow: {
        'inset-highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'signal-glow': '0 0 24px rgba(245, 158, 11, 0.2)',
        'live-glow': '0 0 16px rgba(34, 197, 94, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [],
}
