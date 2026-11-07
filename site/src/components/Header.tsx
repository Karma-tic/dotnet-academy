import React from 'react';
import { Search, Menu, X, Award, Bookmark, PanelLeftClose, PanelLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '../config/site';

export interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeTab: string;
  onNavigate: (view: string) => void;
  progressPercent: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onToggleSidebar,
  isSidebarOpen,
  activeTab,
  onNavigate,
  progressPercent,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 shrink-0 mr-2 sm:mr-4">
          {activeTab === 'lesson' ? (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </button>
          ) : (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 shrink-0"
          >
            <img src={`${import.meta.env.BASE_URL}brand/logo.svg`} alt="Karmatix Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Karmatix <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">.NET</span>
              </span>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 -mt-1 leading-none font-medium">
                {siteConfig.tagline}
              </p>
            </div>
          </button>

          {/* Switch back to Karmatix Learning Portal */}
          <button
            onClick={() => onNavigate('portal')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-500 transition-colors"
            title="Return to Karmatix Learning Portal"
          >
            <span className="text-amber-500 text-[10px]">◀</span>
            <span>All Tracks</span>
          </button>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 text-sm font-medium">
          {[
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'learning-paths', label: 'Paths' },
            { id: 'daily-practice', label: 'Daily Practice' },
            { id: 'how-to-learn', label: 'How to Learn' },
            { id: 'get-help', label: 'Get Help' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'career', label: 'Career Hub' },
            { id: 'cheatsheets', label: 'Offline Kit' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Progress, Theme, GitHub */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            title="Search (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Quick Progress Badge */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-100/50 transition-colors"
            title="View Dashboard Progress"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{progressPercent}% Complete</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Bookmarks Quick Link */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Saved Bookmarks & Notes"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
