import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { siteConfig } from '../config/site';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(`${siteConfig.storagePrefix}theme`);
    if (stored) return stored === 'dark';
    return true; // Default to dark obsidian mode as specified in design system
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(`${siteConfig.storagePrefix}theme`, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(`${siteConfig.storagePrefix}theme`, 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  );
};

