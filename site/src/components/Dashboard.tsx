import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Bookmark,
  Download,
  Upload,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Flame,
  Calendar,
  AlertTriangle,
  X
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { ModuleMeta } from './Sidebar';

export interface DashboardProps {
  modules: ModuleMeta[];
  completedLessons: string[];
  lastVisitedSlug: string | null;
  bookmarks: string[];
  notes: Record<string, string>;
  quizScores: Record<string, number>;
  streak?: number;
  onSelectLesson: (slug: string) => void;
  onOpenCertificate: () => void;
  onOpenPlanner?: () => void;
  onExport: () => void;
  onImport: (json: string) => boolean;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  modules,
  completedLessons,
  lastVisitedSlug,
  bookmarks,
  streak = 0,
  onSelectLesson,
  onOpenCertificate,
  onOpenPlanner,
  onExport,
  onImport,
  onReset,
}) => {
  const [importInput, setImportInput] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Exam readiness calculation: derived from lesson progress & streak
  const examReadiness = Math.min(100, Math.round(progressPercent * 0.85 + (streak > 0 ? Math.min(15, streak * 3) : 0)));

  // Flatten lessons for lookup
  const allLessons = modules.flatMap((m) => m.lessons);
  const lastLesson = allLessons.find((l) => l.slug === lastVisitedSlug) || allLessons[0];
  const remainingLessons = allLessons.filter((l) => !completedLessons.includes(l.slug));

  const handleImportSubmit = () => {
    try {
      const success = onImport(importInput);
      if (success) {
        setShowImportModal(false);
        setImportInput('');
        setImportError(null);
      } else {
        setImportError('Invalid backup file. Please provide a valid JSON export.');
      }
    } catch {
      setImportError('Failed to parse JSON file.');
    }
  };

  const handleResetExecute = () => {
    onReset();
    setShowResetConfirmModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Top Welcome & Quick Stats Banner */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-indigo-200 text-xs font-semibold">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Karmatix .NET Academy • Student Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to Your .NET Journey
          </h1>

          <p className="text-sm text-indigo-200 leading-relaxed">
            From absolute zero to job-ready .NET engineer. All your progress, quiz marks, and study milestones are stored safely in your browser.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
            <div className="text-center sm:text-left">
              <span className="text-[11px] sm:text-xs text-indigo-200 block">Completed</span>
              <span className="text-lg sm:text-2xl font-black text-white">{completedCount}/{totalLessons}</span>
              <span className="text-[10px] text-indigo-300 hidden sm:block">Lessons Finished</span>
            </div>

            <div className="text-center sm:text-left border-x border-white/10 px-2 sm:px-4">
              <span className="text-[11px] sm:text-xs text-indigo-200 block">Exam Readiness</span>
              <span className="text-lg sm:text-2xl font-black text-emerald-400">{examReadiness}%</span>
              <span className="text-[10px] text-indigo-300 hidden sm:block">Placement Target</span>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-[11px] sm:text-xs text-indigo-200 block">Daily Streak</span>
              <span className="text-lg sm:text-2xl font-black text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{streak}d</span>
              </span>
              <span className="text-[10px] text-indigo-300 hidden sm:block">Consecutive Days</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-medium text-indigo-200 mb-2">
              <span>Overall Curriculum Completion</span>
              <span className="font-bold text-white text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action CTAs: Continue, Planner & Certificate */}
          <div className="pt-2 flex flex-wrap gap-3">
            {lastLesson && (
              <Button
                variant="primary"
                onClick={() => onSelectLesson(lastLesson.slug)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md"
              >
                Continue Where You Left Off ({lastLesson.title})
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {onOpenPlanner && (
              <Button
                variant="outline"
                onClick={onOpenPlanner}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                30/60/90-Day Study Plan
              </Button>
            )}

            <Button
              variant="outline"
              onClick={onOpenCertificate}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Award className="w-4 h-4 mr-2 text-indigo-300" />
              {progressPercent === 100 ? 'Claim Certificate' : 'Preview Certificate'}
            </Button>
          </div>
        </div>
      </div>

      {/* Module by Module Progress Breakdown Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Module Progress Breakdown
          </h2>
          <span className="text-xs font-medium text-slate-500">12 Total Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const modTotal = mod.lessons.length;
            const modDone = mod.lessons.filter((l) => completedLessons.includes(l.slug)).length;
            const modPct = modTotal > 0 ? Math.round((modDone / modTotal) * 100) : 0;

            return (
              <Card key={mod.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Module {mod.id}
                    </span>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                      {mod.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {modDone}/{modTotal}
                  </span>
                </div>

                <ProgressBar value={modPct} showPercent={false} size="sm" />

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 dark:text-slate-400">
                    {modPct === 100 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      `${modTotal - modDone} lessons left`
                    )}
                  </span>
                  {mod.lessons[0] && (
                    <button
                      onClick={() => onSelectLesson(mod.lessons[0].slug)}
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-xs"
                    >
                      Open Module &rarr;
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Up Next Lessons */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Up Next ({remainingLessons.length} lessons remaining)
        </h2>

        {remainingLessons.length === 0 ? (
          <Card className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Outstanding Achievement!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
              You have completed every single lesson across all modules of Karmatix .NET Academy.
            </p>
            <Button variant="primary" onClick={onOpenCertificate}>
              View Your Certificate
            </Button>
          </Card>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            {remainingLessons.slice(0, 6).map((lesson) => (
              <div
                key={lesson.slug}
                onClick={() => onSelectLesson(lesson.slug)}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <div>
                    <h4 className="font-medium text-sm text-slate-900 dark:text-white">
                      {lesson.title}
                    </h4>
                    <span className="text-xs text-slate-500">
                      Module {lesson.module} &bull; ~{lesson.duration} min read
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks & Data Portability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </div>
          {bookmarks.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              No bookmarks yet. Click the bookmark icon in any lesson to save it for quick revision.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {bookmarks.map((slug) => {
                const bLesson = allLessons.find((l) => l.slug === slug);
                return (
                  <button
                    key={slug}
                    onClick={() => onSelectLesson(slug)}
                    className="w-full text-left p-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                  >
                    <span className="truncate">{bLesson?.title || slug}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {/* Data Portability: Export, Import, Reset */}
        <Card className="space-y-3">
          <div className="font-bold text-sm text-slate-900 dark:text-white">
            Data Portability &amp; Local Backup
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your progress lives only in your local browser storage. Export a backup JSON to transfer to another computer or browser.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export Progress
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowImportModal(true)}>
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Import Backup
            </Button>
            <Button variant="danger" size="sm" onClick={() => setShowResetConfirmModal(true)}>
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Reset Progress
            </Button>
          </div>
        </Card>
      </div>

      {/* Safety Confirmation Modal for Reset */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Reset All Progress?
                </h3>
                <span className="text-xs text-red-500 font-semibold">Irreversible Action</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This will permanently delete all completed lesson checkmarks, quiz scores, personal revision notes, and streak history from your local browser storage.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirmModal(false)}
              >
                Keep My Progress
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleResetExecute}
              >
                Yes, Reset Everything
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Import Progress Backup
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Paste the contents of your exported JSON progress file below to restore your progress:
            </p>
            <textarea
              rows={6}
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {importError && (
              <p className="text-xs text-red-500">{importError}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleImportSubmit}>
                Import Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
