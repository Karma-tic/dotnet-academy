import React from 'react';
import { siDotnet } from 'simple-icons';
import { BrandIcon } from './BrandIcon';
import { siteConfig } from '../config/site';

export interface FooterProps {
  onNavigate: (view: string) => void;
}

const links = [
  { id: 'home', label: 'Roadmap' },
  { id: 'projects', label: 'Projects' },
  { id: 'exam-prep', label: 'Interview prep' },
  { id: 'cheatsheets', label: 'Cheat sheets' },
  { id: 'practice', label: 'Daily practice' },
  { id: 'course', label: 'Notes' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'free-tiers', label: 'Free cloud tiers' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
  <footer className="mt-24 border-t border-slate-800">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-sm">
        <p className="inline-flex items-center gap-2 font-semibold text-slate-100">
          <BrandIcon icon={siDotnet} className="h-5 w-5" color="#b39dfc" />.NET roadmap by Karmatix
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Free, no sign-up. Your progress stays in this browser.</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href="https://learn.karmatix.in/roadmaps/" className="inline-flex min-h-9 items-center text-ember underline-offset-4 hover:underline">All stack roadmaps</a>
          <a href="https://ko-fi.com/karmatix" className="inline-flex min-h-9 items-center text-slate-400 underline-offset-4 hover:text-slate-100 hover:underline">Support on Ko-fi</a>
        </p>
      </div>
      <nav aria-label="Footer">
        <ul className="grid grid-cols-2 gap-x-10 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#/${l.id}`} onClick={(e) => { e.preventDefault(); onNavigate(l.id); }} className="inline-flex min-h-9 items-center text-sm text-slate-400 transition-colors hover:text-slate-100">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="border-t border-slate-900">
      <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-slate-600 sm:px-6">{siteConfig.trademarkDisclaimer}</p>
    </div>
  </footer>
);
