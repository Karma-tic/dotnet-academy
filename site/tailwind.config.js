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
        dotnet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Official .NET Purple
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          accent: '#7c3aed',
          glow: '#a78bfa',
        },
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
          subtle: '#1e293b',
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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
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
