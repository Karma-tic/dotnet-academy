import React, { useState, useEffect } from 'react';
import { X, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { jargonTerms } from '../content/glossary/jargonTerms';
import { CodeBlock } from './ui/CodeBlock';
import { Badge } from './ui/Badge';

export interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string;
}

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose,
  initialTermId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(initialTermId || null);

  useEffect(() => {
    if (initialTermId) {
      setSelectedTermId(initialTermId);
      const target = jargonTerms.find((t) => t.id === initialTermId);
      if (target) {
        setSearchTerm(target.term);
      }
    }
  }, [initialTermId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Core Language', 'Memory & Runtime', 'Architecture & Web', 'Concurrency'];

  const filteredTerms = jargonTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.plainEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.analogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.aliases && term.aliases.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesRating = selectedRating === 'All' || term.scaryRating === selectedRating;

    return matchesSearch && matchesCategory && matchesRating;
  });

  const activeTerm = selectedTermId
    ? jargonTerms.find((t) => t.id === selectedTermId) || filteredTerms[0]
    : filteredTerms[0];

  const renderPeppers = (count: number) => {
    return '🌶️'.repeat(count);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xl">
              🌶️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Jargon Buster Widget
                </h2>
                <Badge variant="warning">Anti-Boredom Engine</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                20+ terrifying .NET programming terms demystified into simple plain English.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close Jargon Buster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search any scary technical term (e.g. recursion, async, pointers, DI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Spiciness Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Scariness:</span>
              {(['All', 1, 2, 3] as const).map((lvl) => (
                <button
                  key={String(lvl)}
                  onClick={() => setSelectedRating(lvl)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedRating === lvl
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {lvl === 'All' ? 'All' : renderPeppers(lvl)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body: Split view on desktop */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Terms List (4 cols on desktop) */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 max-h-[35vh] md:max-h-full">
            {filteredTerms.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No jargon terms match your search.
              </div>
            ) : (
              filteredTerms.map((t) => {
                const isSelected = activeTerm?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTermId(t.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-900 dark:text-amber-200 shadow-xs'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm truncate">{t.term}</div>
                      <div className="text-[10px] text-slate-400 truncate">{t.category}</div>
                    </div>
                    <span className="shrink-0 text-xs" title={`Scary rating: ${t.scaryLabel}`}>
                      {renderPeppers(t.scaryRating)}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Term Details Panel (8 cols on desktop) */}
          <div className="md:col-span-8 overflow-y-auto p-5 sm:p-6 space-y-6">
            {activeTerm ? (
              <div className="space-y-6">
                {/* Term Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {activeTerm.term}
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      <span>{renderPeppers(activeTerm.scaryRating)}</span>
                      <span>{activeTerm.scaryLabel}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Category: <span className="font-semibold text-slate-700 dark:text-slate-300">{activeTerm.category}</span>
                  </div>
                </div>

                {/* Don't Panic Reassurance Callout */}
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs sm:text-sm space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Don't Panic (Reassurance Note)</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeTerm.reassurance}
                  </p>
                </div>

                {/* Plain English Definition */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Plain English Definition (Zero Jargon)</span>
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                    {activeTerm.plainEnglish}
                  </p>
                </div>

                {/* Real-World Analogy */}
                <div className="p-4 rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/40 dark:bg-violet-950/20 space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-violet-900 dark:text-violet-300 flex items-center gap-1.5">
                    <span>🍕 Relatable Real-World Analogy</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeTerm.analogy}
                  </p>
                </div>

                {/* Minimal C# Example */}
                {activeTerm.codeExample && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Code in Action (C#)
                    </h4>
                    <CodeBlock
                      code={activeTerm.codeExample}
                      language="csharp"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center text-sm text-slate-400">
                Select a term on the left to see its plain English definition and real-world analogy.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Click any jargon badge throughout lessons to open this instant pop-up.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
