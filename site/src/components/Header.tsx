import React from 'react';
import { Search, Menu, X, Award, PanelLeftClose, PanelLeft, Coffee } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '../config/site';

export interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeTab: string;
  onNavigate: (view: string) => void;
  progressPercent: number;
  onOpenJargon?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onToggleSidebar,
  isSidebarOpen,
  activeTab,
  onNavigate,
  progressPercent,
  onOpenJargon,
}) => {
  const handleOpenJargon = () => {
    if (onOpenJargon) {
      onOpenJargon();
    } else {
      window.dispatchEvent(new CustomEvent('open-jargon-modal'));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger / Sidebar toggle + Logo */}
        <div className="flex items-center gap-3 shrink-0 mr-2 sm:mr-4">
          {activeTab === 'lesson' ? (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-violet-500 flex items-center justify-center"
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </button>
          ) : (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-violet-500"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg p-1 shrink-0"
          >
            <img src={`${import.meta.env.BASE_URL}brand/logo.svg`} alt="Karmatix Logo" className="w-8 h-8 rounded-lg shadow-xs" />
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Karmatix <span className="text-violet-600 dark:text-violet-400 font-semibold text-sm">.NET</span>
              </span>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 -mt-1 leading-none font-medium">
                {siteConfig.tagline}
              </p>
            </div>
          </button>

          {/* Switch back to Karmatix Learning Portal */}
          <a
            href={siteConfig.portalUrl || "https://learn.karmatix.in"}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-500 transition-colors"
            title="Return to Karmatix Learning Portal (learn.karmatix.in)"
          >
            <span className="text-amber-500 text-[10px]">◀</span>
            <span>All Tracks</span>
          </a>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 text-sm font-medium">
          {[
            { id: 'home', label: 'Dashboard' },
            { id: 'course', label: 'Curriculum' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'practice', label: 'Practice Lab' },
            { id: 'exam-prep', label: 'Exam Prep' },
            { id: 'resources', label: 'Resources' },
            { id: 'cheatsheets', label: 'Cheat Sheets' },
            { id: 'glossary', label: 'Glossary' },
          ].map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'home' && (activeTab === 'home' || activeTab === 'dashboard')) ||
              (item.id === 'course' && (activeTab === 'course' || activeTab === 'curriculum')) ||
              (item.id === 'roadmap' && (activeTab === 'roadmap' || activeTab === 'learning-paths')) ||
              (item.id === 'practice' && (activeTab === 'practice' || activeTab === 'daily-practice')) ||
              (item.id === 'exam-prep' && (activeTab === 'exam-prep' || activeTab === 'career'));

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Jargon, Progress, Theme, Ko-fi */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
            aria-label="Open search dialog"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden sm:inline-block rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Jargon Buster Trigger Button */}
          <button
            onClick={handleOpenJargon}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            title="Open Jargon Buster Dictionary"
          >
            <span>🌶️</span>
            <span>Jargon</span>
          </button>

          {/* Progress Pill matching Flutter */}
          <button
            onClick={() => onNavigate('home')}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-violet-200/80 bg-violet-50/70 px-3 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300"
            title={`${progressPercent}% completed`}
          >
            <Award className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>{progressPercent}%</span>
          </button>

          {/* Ko-fi Chai Button matching Flutter */}
          <a
            href="https://ko-fi.com/karmatix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a chai on Ko-fi (opens in new tab)"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-200/90 bg-amber-50/80 px-2.5 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-100 hover:border-amber-300 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Chai ☕</span>
          </a>

          {/* Theme Toggle matching Flutter */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
