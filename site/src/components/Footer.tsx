import React from 'react';
import { siteConfig } from '../config/site';
import { ExternalLink, Shield, Heart } from 'lucide-react';

export interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src={`${import.meta.env.BASE_URL}brand/logo.svg`} alt="Karmatix" className="w-7 h-7 rounded" />
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Karmatix .NET Academy
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {siteConfig.description} Designed and engineered by Karmatix for aspiring developers and enterprise engineers worldwide.
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500 inline" />
              <span>for the .NET community by <a href={siteConfig.publisherUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-colors">Karmatix</a></span>
            </div>
          </div>

          {/* Tracks & Curriculum Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Curriculum & Paths
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('portal')} className="hover:text-amber-500 font-medium transition-colors flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <span>◀ All Karmatix Tracks</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('curriculum')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Curriculum & Modules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learning-paths')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-indigo-600 dark:text-indigo-400">
                  Learning Paths by Goal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('daily-practice')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <span>Problem of the Day 🔥</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Career Hub & 200+ Q&A
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('planner')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  30/60/90 Study Plan
                </button>
              </li>
            </ul>
          </div>

          {/* Learning Support Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Learning Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('how-to-learn')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  How to Learn (10m Guide)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-help')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Stuck? Get Help
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('regional-resources')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Hindi & Indian Resources
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('free-tiers')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Free Cloud Tiers Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cheatsheets')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Offline Kit (PDF Sheets)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Free Resource Library
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Privacy Policy (DPDP Act)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-3 leading-relaxed">
          <p>
            {siteConfig.trademarkDisclaimer}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <p>
              &copy; {siteConfig.copyrightYear} <a href={siteConfig.publisherUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline text-slate-700 dark:text-slate-300">Karmatix</a>. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Zero trackers &bull; Local storage only &bull; Static high-performance architecture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
