import React, { useEffect, useState } from 'react';
import { Search, Menu, X, PanelLeftClose, PanelLeft, ArrowUpRight } from 'lucide-react';
import { siDotnet } from 'simple-icons';
import { BrandIcon } from './BrandIcon';
import { roadmap } from '../content/roadmap.generated';

export interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeTab: string;
  onNavigate: (view: string) => void;
  progressPercent: number;
  onOpenJargon?: () => void;
}

const STORAGE = 'karmatix-dotnet:v1:roadmap';
const TOTAL = roadmap.stages.reduce((n, s) => n + s.topics.length, 0);
const readDone = () => { try { return (JSON.parse(localStorage.getItem(STORAGE) || '[]') as string[]).length; } catch { return 0; } };

// Keep the header to the four things people use most. Everything else is in the footer.
const primary = [
  { id: 'home', label: 'Roadmap' },
  { id: 'projects', label: 'Projects' },
  { id: 'exam-prep', label: 'Interview prep' },
  { id: 'cheatsheets', label: 'Cheat sheets' },
];
const secondary = [
  { id: 'practice', label: 'Daily practice' },
  { id: 'course', label: 'Notes' },
  { id: 'glossary', label: 'Glossary' },
];
const ALIASES: Record<string, string[]> = {
  course: ['course', 'curriculum', 'lesson'], practice: ['practice', 'daily-practice'], 'exam-prep': ['exam-prep', 'career'],
};

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onToggleSidebar, isSidebarOpen, activeTab, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(readDone);
  useEffect(() => {
    const on = (e: Event) => setDone((e as CustomEvent).detail.done);
    window.addEventListener('kx-roadmap-progress', on);
    return () => window.removeEventListener('kx-roadmap-progress', on);
  }, []);
  useEffect(() => { setOpen(false); setDone(readDone()); }, [activeTab]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const pct = Math.round((done / (TOTAL || 1)) * 100);
  const isActive = (id: string) => activeTab === id || (ALIASES[id] || []).includes(activeTab);
  const go = (id: string) => { setOpen(false); onNavigate(id); };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-2">
          {activeTab === 'lesson' && (
            <button onClick={onToggleSidebar} className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-colors hover:text-slate-100 lg:inline-flex" aria-label={isSidebarOpen ? 'Hide notes list' : 'Show notes list'}>
              {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </button>
          )}
          <a href="#/home" onClick={(e) => { e.preventDefault(); go('home'); }} className="group inline-flex min-h-11 items-center gap-2 rounded-md" aria-label=".NET roadmap, home">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-star transition-transform duration-500 group-hover:rotate-90" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 3v18" /><path d="M4.2 7.5l15.6 9" /><path d="M4.2 16.5l15.6-9" /></g>
            </svg>
            <span className="font-mono text-[15px] font-medium tracking-tight text-slate-100">karmatix</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[15px] text-slate-500">/<BrandIcon icon={siDotnet} className="h-4 w-4" color="#b39dfc" />dotnet</span>
          </a>
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {primary.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} aria-current={isActive(l.id) ? 'page' : undefined}
              className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors ${isActive(l.id) ? 'bg-slate-900 text-slate-100' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}`}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={onOpenSearch} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-800 px-3 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-100" aria-label="Search">
            <Search className="h-4 w-4" /><span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 lg:inline-block">⌘K</kbd>
          </button>
          <button onClick={() => go('home')} className="hidden h-10 items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 text-sm font-medium text-slate-100 transition-colors hover:border-ember/70 md:inline-flex" title={`${done} of ${TOTAL} roadmap skills done`}>
            <span className="relative h-1.5 w-12 overflow-hidden rounded-full bg-slate-800"><span className="absolute inset-y-0 left-0 rounded-full bg-ember" style={{ width: `${pct}%` }} /></span>
            {pct}%
          </button>
          <button onClick={() => setOpen((o) => !o)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-100 lg:hidden" aria-expanded={open} aria-controls="kx-mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="kx-mobile-nav" className="border-t border-slate-800 bg-slate-900 px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {[...primary, ...secondary].map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className={`flex min-h-12 w-full items-center border-b border-slate-800 text-left text-base font-medium ${isActive(l.id) ? 'text-ember' : 'text-slate-100'}`}>{l.label}</button>
              </li>
            ))}
            <li><a href="https://learn.karmatix.in/roadmaps/" className="flex min-h-12 items-center justify-between text-base text-slate-400">All stack roadmaps <ArrowUpRight className="h-4 w-4" /></a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};
