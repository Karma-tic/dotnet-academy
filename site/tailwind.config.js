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
        // Karmatix warm neutrals + .NET brand purples
        neutral: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, slate: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, gray: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' }, zinc: { 50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8', 500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110' },
        violet: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' }, purple: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' }, indigo: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' }, blue: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' }, sky: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' }, fuchsia: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', 950: '#170b3d' },
        ink: '#121110',
        // Accent follows the .NET brand purple (#512BD4)
        ember: { DEFAULT: '#9b7ff7', soft: '#b39dfc', ink: '#120a2e', deep: '#512bd4' },
        star: '#ff6433',
        dotnet: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b', accent: '#7c5ce8', glow: '#9b7ff7' },
        obsidian: '#121110',
        surface: { DEFAULT: '#171614', card: '#171614', elevated: '#1c1b19', light: '#171614', dark: '#121110', subtleLight: '#1c1b19', subtleDark: '#121110' },
        border: { subtle: '#2b2926', strong: '#3a3733' },
        signal: { DEFAULT: '#9b7ff7', hover: '#b39dfc', glow: 'rgba(81, 43, 212, 0.2)' },
        status: {
          live: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.2)',
        },
        brand: { 50: '#f3f0ff', 100: '#e7e1ff', 200: '#d1c5ff', 300: '#b39dfc', 400: '#9b7ff7', 500: '#7c5ce8', 600: '#512bd4', 700: '#4422b0', 800: '#361b8c', 900: '#2a166b' },
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
