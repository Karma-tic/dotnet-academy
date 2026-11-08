import React, { useState } from 'react';
import { BookA, Search, Filter, RotateCw, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { glossaryData } from '../content/glossary/glossaryData';

export const GlossaryView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [mode, setMode] = useState<'glossary' | 'flashcards'>('glossary');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredTerms, setMasteredTerms] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('karmatix-dotnet:v1:mastered-flashcards');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const categories = ['All', ...Array.from(new Set(glossaryData.map((g) => g.category)))];

  const filtered = glossaryData.filter((g) => {
    const matchesSearch =
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || g.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleToggleMastered = (term: string) => {
    const next = masteredTerms.includes(term)
      ? masteredTerms.filter((t) => t !== term)
      : [...masteredTerms, term];
    setMasteredTerms(next);
    try {
      localStorage.setItem('karmatix-dotnet:v1:mastered-flashcards', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const currentCard = glossaryData[cardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % glossaryData.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev === 0 ? glossaryData.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-xs font-semibold">
          <BookA className="w-3.5 h-3.5" />
          <span>Every Term Demystified</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          .NET & C# Visual Glossary & Flashcards
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Every technical term defined in one simple sentence with an everyday analogy. Practice with interactive spaced-repetition flashcards.
        </p>

        {/* View Switcher */}
        <div className="flex justify-center gap-2 pt-2">
          <Button
            variant={mode === 'glossary' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setMode('glossary')}
          >
            A-Z Glossary ({glossaryData.length} Terms)
          </Button>
          <Button
            variant={mode === 'flashcards' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setMode('flashcards')}
          >
            Spaced Repetition Flashcards ({masteredTerms.length} Mastered)
          </Button>
        </div>
      </div>

      {mode === 'glossary' ? (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, idx) => (
              <Card key={idx} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.term}
                  </h3>
                  <Badge variant="purple">{item.category}</Badge>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Definition: </strong> {item.definition}
                </p>

                <div className="p-2.5 rounded-lg bg-violet-50/60 dark:bg-violet-950/30 text-[11px] text-violet-900 dark:text-violet-200">
                  <strong>Analogy: </strong> {item.analogy}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Flashcards Mode */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Card {cardIndex + 1} of {glossaryData.length}</span>
            <span>{masteredTerms.length} marked mastered</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[260px] p-8 rounded-3xl border-2 border-violet-200 dark:border-violet-900/60 bg-gradient-to-br from-white via-violet-50/20 to-slate-50 dark:from-slate-900 dark:via-violet-950/20 dark:to-slate-950 flex flex-col justify-between items-center text-center shadow-lg transition-all hover:scale-[1.01]"
          >
            <div className="w-full flex justify-between items-center text-xs text-slate-400">
              <Badge variant="purple">{currentCard.category}</Badge>
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Click card to flip
              </span>
            </div>

            <div className="py-6 space-y-3">
              {!isFlipped ? (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {currentCard.term}
                </h2>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {currentCard.definition}
                  </p>
                  <p className="text-xs text-violet-600 dark:text-violet-300 italic">
                    "{currentCard.analogy}"
                  </p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              {isFlipped ? 'Answer revealed' : 'Question / Concept'}
            </div>
          </div>

          {/* Flashcard Actions */}
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" size="sm" onClick={handlePrevCard}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <Button
              variant={masteredTerms.includes(currentCard.term) ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => handleToggleMastered(currentCard.term)}
            >
              <Check className="w-4 h-4 mr-1 text-emerald-500" />
              {masteredTerms.includes(currentCard.term) ? 'Mastered ✓' : 'Mark as Mastered'}
            </Button>

            <Button variant="primary" size="sm" onClick={handleNextCard}>
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
