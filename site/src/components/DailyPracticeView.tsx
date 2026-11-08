import React, { useState } from 'react';
import { Flame, Award, CheckCircle2, Eye, Copy, Check, Play, ExternalLink } from 'lucide-react';
import { codingProblems, CodingProblem } from '../content/career/codingProblems';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { RichTextRenderer } from './ui/RichTextRenderer';
import confetti from 'canvas-confetti';

export interface DailyPracticeViewProps {
  streakData: {
    currentStreak: number;
    longestStreak: number;
    lastSolvedDate: string | null;
    solvedProblemIds: string[];
  };
  onRecordProblemSolved: (problemId: string) => void;
}

export const DailyPracticeView: React.FC<DailyPracticeViewProps> = ({
  streakData,
  onRecordProblemSolved,
}) => {
  // Deterministic Problem of the Day based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const todayProblemIndex = dayOfYear % codingProblems.length;
  const todayProblem = codingProblems[todayProblemIndex];

  const [activeProblem, setActiveProblem] = useState<CodingProblem>(todayProblem);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const isSolved = streakData.solvedProblemIds?.includes(activeProblem.id);

  const handleSolve = () => {
    onRecordProblemSolved(activeProblem.id);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(activeProblem.solutionCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const categories = ['All', 'Strings', 'Arrays & Lists', 'LINQ', 'OOP & Design', 'Async & Concurrency', 'Algorithms'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = codingProblems.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header with Streak Counter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-linear-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-indigo-950/20 rounded-3xl border border-amber-200 dark:border-amber-900/40">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Daily Engineering Streak</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Problem of the Day
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Consistency beats intensity. Solve one .NET algorithm or architectural coding challenge every day to build permanent problem-solving reflexes.
          </p>
        </div>

        {/* Streak Stats Badges */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500" />
              <span>{streakData.currentStreak || 0}</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Day Streak
            </span>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-indigo-500">
              <Award className="w-5 h-5" />
              <span>{streakData.longestStreak || 0}</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Best Streak
            </span>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
              <span>{streakData.solvedProblemIds?.length || 0}</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Solved
            </span>
          </div>
        </div>
      </div>

      {/* Main Coding Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Problem Description & Interactive Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {activeProblem.id.toUpperCase()}
                </span>
                <Badge variant={activeProblem.difficulty === 'Easy' ? 'success' : activeProblem.difficulty === 'Medium' ? 'warning' : 'default'}>
                  {activeProblem.difficulty}
                </Badge>
                <Badge variant="purple">{activeProblem.category}</Badge>
                {activeProblem.id === todayProblem.id && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                    ⭐ Today's Challenge
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeProblem.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://dotnetfiddle.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                title="Open in official .NET Fiddle online sandbox"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run in .NET Fiddle</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <Button
                variant={isSolved ? 'outline' : 'primary'}
                size="sm"
                onClick={handleSolve}
                className="shrink-0 text-xs shadow-xs"
              >
                {isSolved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    Solved!
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Mark as Solved
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem Statement</h4>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              <RichTextRenderer content={activeProblem.description} />
            </div>
          </div>

          {/* Starter Code */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">C# 14 Method Signature</h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto">
              <pre>{activeProblem.starterCode}</pre>
            </div>
          </div>

          {/* Test Cases */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Example Test Cases</h4>
            <div className="space-y-2">
              {activeProblem.testCases.map((tc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="text-slate-600 dark:text-slate-400">
                    Input: <strong className="text-slate-900 dark:text-slate-200">{tc.input}</strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Output: <strong>{tc.expected}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Toggle & Explanation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              {showSolution ? 'Hide Verified Solution' : 'Reveal Solution & Analysis'}
            </Button>

            {showSolution && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Optimal C# Solution
                  </span>
                  <button
                    onClick={handleCopySolution}
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Solution'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                  <pre>{activeProblem.solutionCode}</pre>
                </div>

                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl text-xs text-slate-700 dark:text-slate-200">
                  <strong className="text-indigo-600 dark:text-indigo-400">Algorithmic Complexity: </strong>
                  <RichTextRenderer content={activeProblem.explanation} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Problem Browser (52 Problems) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                All 52 Coding Challenges
              </h3>
              <span className="text-xs text-slate-400">
                {filteredProblems.length} Problems
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter by topic or difficulty to practice beyond today's prompt.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Problem List */}
          <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
            {filteredProblems.map((prob) => {
              const isProbSolved = streakData.solvedProblemIds?.includes(prob.id);
              const isSelected = activeProblem.id === prob.id;

              return (
                <button
                  key={prob.id}
                  onClick={() => {
                    setActiveProblem(prob);
                    setShowSolution(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/30 shadow-xs'
                      : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {isProbSolved ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {prob.title}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                      prob.difficulty === 'Easy'
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                        : prob.difficulty === 'Medium'
                        ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
