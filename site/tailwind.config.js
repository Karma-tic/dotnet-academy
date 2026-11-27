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
        // Karmatix brand (matches karmatix.in and learn.karmatix.in)
        neutral: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, slate: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, gray: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, zinc: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' },
        violet: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' }, purple: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' }, indigo: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' }, blue: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' }, sky: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' }, fuchsia: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', 950: '#321309' },
        ink: '#121110',
        ember: { DEFAULT: '#ff6433', soft: '#ff8a5c', ink: '#1a0f0a', deep: '#c8431a' },
        dotnet: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210', accent: '#ff6433', glow: '#ff8a5c' },
        obsidian: '#121110',
        surface: { DEFAULT: '#171614', card: '#171614', elevated: '#1c1b19', light: '#171614', dark: '#121110', subtleLight: '#1c1b19', subtleDark: '#121110' },
        border: { subtle: '#2b2926', strong: '#3a3733' },
        signal: { DEFAULT: '#ff6433', hover: '#ff8a5c', glow: 'rgba(255, 100, 51, 0.15)' },
        status: {
          live: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.2)',
        },
        brand: { 50: '#fff4ef', 100: '#ffe6dc', 200: '#ffcbb7', 300: '#ffa98a', 400: '#ff8a5c', 500: '#ff6433', 600: '#c8431a', 700: '#a83816', 800: '#7f2c13', 900: '#5a2210' },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
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
