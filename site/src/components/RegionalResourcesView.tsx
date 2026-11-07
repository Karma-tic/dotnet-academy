import React, { useState } from 'react';
import { Languages, ExternalLink, Users } from 'lucide-react';
import { regionalResourcesData } from '../content/learningSupport/regionalResourcesData';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const RegionalResourcesView: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const languages = ['All', 'Hindi', 'Hindi / Bilingual', 'Pan-Indian'];

  const filteredResources = regionalResourcesData.filter((r) => {
    if (selectedLanguage === 'All') return true;
    return r.language === selectedLanguage;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Languages className="w-3.5 h-3.5" />
          <span>Regional & Indian Language Learning</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          .NET & C# in Hindi & Indian Languages
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Learning complex software engineering concepts in your native language makes mental models click faster. Here are verified, active, high-quality Indian educators and localized documentation.
        </p>

        {/* Language Filter */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage(lang)}
              className="text-xs"
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of Verified Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="purple">{res.language}</Badge>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                  {res.cost}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {res.name}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                  by {res.creatorOrOrg}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {res.description}
              </p>

              {/* Topics */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Topics Covered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {res.topicsCovered.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">Audience: </strong>
                {res.recommendedAudience}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Verified: {res.lastVerified}
              </span>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition-colors"
              >
                <span>Open {res.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Community Meetups Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
          <Users className="w-4 h-4 text-emerald-500" />
          <span>Local .NET Community Meetups across India</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          Connect with local engineers in Bengaluru, Pune, Hyderabad, Chennai, Mumbai, Noida, and Gurgaon. Indian .NET User Groups run free weekend code camps, architecture discussions, and mentorship sessions.
        </p>
      </div>
    </div>
  );
};
