import React, { useState } from 'react';
import { Cloud, ShieldAlert, ExternalLink } from 'lucide-react';
import { cloudFreeTiersData } from '../content/learningSupport/freeTiersData';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const FreeTiersView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cloud Hosting', 'Database', 'Development Environment', 'Container Registry'];

  const filteredTiers = cloudFreeTiersData.filter((tier) => {
    if (selectedCategory === 'All') return true;
    return tier.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Cloud className="w-3.5 h-3.5" />
          <span>Deployment & Practice Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verified Free Cloud Tiers Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Practicing production deployment should not cost money. Here is our verified guide to zero-cost cloud tiers, exact quota boundaries, credit card safety rules, and retired services.
        </p>

        {/* Category Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Critical Credit Card Trap Warning Banner */}
      <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
        <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
          <span>The #1 Rule of Cloud Practice: Enable $0 Spending Limits</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When signing up for cloud providers (like Microsoft Azure or AWS), <strong>never leave an uncapped credit card attached</strong>. In Azure, always confirm the <strong>Spending Limit is set to $0</strong> so Azure automatically suspends compute rather than charging your bank account if your container exceeds free allowances.
        </p>
      </div>

      {/* Grid of Cloud Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTiers.map((tier) => {
          const isRetired = tier.status === 'Retired / Discontinued';
          const isChanged = tier.status === 'Changed / Conditional';

          return (
            <div
              key={tier.id}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-xs ${
                isRetired
                  ? 'bg-rose-50/20 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/40 opacity-80'
                  : isChanged
                  ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={isRetired ? 'default' : isChanged ? 'warning' : 'purple'}>
                    {tier.category}
                  </Badge>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isRetired
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                        : isChanged
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                    }`}
                  >
                    {tier.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {tier.serviceName}
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {tier.provider}
                  </span>
                </div>

                {/* Allowance */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Free Quota:</strong>
                  {tier.freeAllowance}
                </div>

                {/* Limitations */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Constraints
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {tier.limitations.map((lim, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 shrink-0">•</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cost Warning Box */}
                <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                  <strong>⚠️ Cost Warning: </strong>
                  {tier.costWarning}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Verified: {tier.lastVerified}
                </span>

                <a
                  href={tier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-900 dark:text-white transition-colors"
                >
                  <span>Official Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
