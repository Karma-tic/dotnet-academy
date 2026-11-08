import React, { useState } from 'react';
import { HelpCircle, ExternalLink, Copy, Check, AlertCircle, Terminal, Search, Code } from 'lucide-react';
import { helpCommunitiesData, commonErrorDiagnoses, CommonErrorDiagnosis } from '../content/learningSupport/stuckHelpData';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const StuckHelpView: React.FC = () => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [errorSearchQuery, setErrorSearchQuery] = useState('');
  const [selectedError, setSelectedError] = useState<CommonErrorDiagnosis | null>(null);

  // Form state for question generator
  const [qTitle, setQTitle] = useState('');
  const [qGoal, setQGoal] = useState('');
  const [qAttempt, setQAttempt] = useState('');
  const [qActual, setQActual] = useState('');
  const [qCode, setQCode] = useState('');

  const generateMarkdownQuestion = () => {
    return `### Problem Description
${qTitle || 'Issue running ASP.NET Core endpoint'}

**Target Environment:**
- .NET SDK Version: .NET 10.0 (C# 14)
- Operating System: macOS / Ubuntu / Windows
- Editor / IDE: VS Code / Visual Studio

### What I am trying to achieve:
${qGoal || 'I am attempting to query records from a SQLite database using EF Core in an ASP.NET Core Minimal API.'}

### What I have attempted:
${qAttempt || 'I registered the DbContext in Program.cs using builder.Services.AddDbContext<AppDbContext>(...).'}

### Actual Result / Error Message:
\`\`\`text
${qActual || 'System.NullReferenceException: Object reference not set to an instance of an object.'}
\`\`\`

### Minimal Reproducible Code (Program.cs):
\`\`\`csharp
${qCode || '// Paste minimal reproducible code snippet here'}
\`\`\`
`;
  };

  const handleCopyQuestion = () => {
    navigator.clipboard.writeText(generateMarkdownQuestion());
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const filteredErrors = commonErrorDiagnoses.filter((err) => {
    const q = errorSearchQuery.toLowerCase();
    return (
      err.code.toLowerCase().includes(q) ||
      err.title.toLowerCase().includes(q) ||
      err.cause.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Troubleshooting & Community Rescue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Stuck? Get Fast, Expert Help
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Getting stuck is not a failure; it is how software engineers discover edge cases. Follow our diagnostic guide or use our interactive question builder to get your bug resolved quickly.
        </p>
      </div>

      {/* Part 1: Common Error Diagnostics Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>Diagnostic Catalog of Common Beginner Errors</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant explanations, bad code vs good code, and prevention tips.
            </p>
          </div>

          {/* Error search filter */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search code (e.g. CS0103, NullRef)..."
              value={errorSearchQuery}
              onChange={(e) => setErrorSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Error cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredErrors.map((err) => (
            <div
              key={err.code}
              onClick={() => setSelectedError(selectedError?.code === err.code ? null : err)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedError?.code === err.code
                  ? 'border-violet-500 bg-violet-50/20 dark:bg-violet-950/20 ring-1 ring-violet-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-400">
                  {err.code}
                </span>
                <Badge variant={err.errorType === 'Compiler Error' ? 'purple' : 'warning'}>
                  {err.errorType}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {err.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {err.symptom}
              </p>

              <div className="mt-3 text-xs text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-1">
                <span>{selectedError?.code === err.code ? 'Hide solution' : 'Inspect fix & examples →'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal/Expand View for Selected Error */}
        {selectedError && (
          <div className="p-6 sm:p-8 rounded-3xl border border-violet-200 dark:border-violet-900 bg-white dark:bg-slate-900 shadow-lg space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">
                  Diagnostic Reference: {selectedError.code}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedError.title}
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedError(null)}>
                Close
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Why this happens:</h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {selectedError.cause}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Bad code */}
                <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                  <div className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
                    <span>❌ Problematic Code</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-800 dark:text-rose-200 overflow-x-auto whitespace-pre">
                    {selectedError.badCode}
                  </pre>
                </div>

                {/* Good code */}
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span>✅ Recommended Fix</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-800 dark:text-emerald-200 overflow-x-auto whitespace-pre">
                    {selectedError.goodCode}
                  </pre>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Senior Tip: </strong>
                {selectedError.preventionTip}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Part 2: Interactive Question Template Generator */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 text-xs font-semibold mb-2">
            <Code className="w-3.5 h-3.5" />
            <span>MCVE Question Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Write a Professional Question in 60 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Fill in the prompts below to automatically generate an MCVE (Minimal, Complete, and Verifiable Example) markdown template formatted for Stack Overflow, Reddit, or Discord.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Question Title / Headline
              </label>
              <input
                type="text"
                placeholder="e.g. EF Core DbUpdateException on unique constraint in ASP.NET Core 10"
                value={qTitle}
                onChange={(e) => setQTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                What are you trying to achieve? (Goal)
              </label>
              <textarea
                rows={2}
                placeholder="Describe the expected business outcome or feature..."
                value={qGoal}
                onChange={(e) => setQGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                What have you already attempted?
              </label>
              <textarea
                rows={2}
                placeholder="Mention what documentation or steps you already tried..."
                value={qAttempt}
                onChange={(e) => setQAttempt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Exact Error Message / Stack Trace
              </label>
              <textarea
                rows={2}
                placeholder="Paste the compiler code or runtime exception message..."
                value={qActual}
                onChange={(e) => setQActual(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Minimal Code Snippet (strip unrelated code)
              </label>
              <textarea
                rows={4}
                placeholder="Paste the 10-20 lines of code that reproduce the issue..."
                value={qCode}
                onChange={(e) => setQCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Generated Markdown Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Generated Markdown Question
              </span>
              <Button variant="primary" size="sm" onClick={handleCopyQuestion} className="text-xs">
                {copiedTemplate ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy Formatted Markdown
                  </>
                )}
              </Button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-[460px] border border-slate-800 whitespace-pre-wrap">
              {generateMarkdownQuestion()}
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Verified Communities Directory */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-violet-500" />
            <span>Where to Post Your Question</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Post in the right venue for the fastest and most constructive answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {helpCommunitiesData.map((comm, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">{comm.platform}</Badge>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ⚡ {comm.responseSpeed}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {comm.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {comm.bestFor}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-700 dark:text-slate-300">Rules: </strong>
                  {comm.postingRules}
                </div>
              </div>

              <a
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-900 dark:text-white transition-colors"
              >
                <span>Visit {comm.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
