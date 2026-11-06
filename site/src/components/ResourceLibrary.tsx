import React, { useState } from 'react';
import { ExternalLink, Search, Filter, BookOpen, ShieldCheck } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { resourcesData } from '../content/resources/resourcesData';

export const ResourceLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [cost, setCost] = useState<string>('All');
  const [level, setLevel] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(resourcesData.map((r) => r.category)))];
  const costs = ['All', 'Free', 'Free to Audit', 'Freemium', 'Commercial / Paid'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filtered = resourcesData.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.whyItsGood.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || r.category === category;
    const matchesCost = cost === 'All' || r.cost === cost;
    const matchesLevel = level === 'All' || r.level === level;
    return matchesSearch && matchesCat && matchesCost && matchesLevel;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Ecosystem</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verified Free Resource Library
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Every resource is manually tested and verified. Zero broken links, zero low-quality scrapers, zero affiliate promotions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          >
            {costs.map((c) => (
              <option key={c} value={c}>
                Cost: {c}
              </option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                Level: {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing {filtered.length} of {resourcesData.length} resources</span>
        <span>Verified for modern .NET 10 & C# 14</span>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Card key={item.id} hover className="flex flex-col justify-between space-y-4 p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="purple">{item.category}</Badge>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    item.cost === 'Free'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : item.cost === 'Free to Audit'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}
                >
                  {item.cost}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {item.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Level: {item.level}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.whyItsGood}
              </p>

              {item.licenseNote && (
                <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
                  {item.licenseNote}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Verified {item.lastVerified}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
