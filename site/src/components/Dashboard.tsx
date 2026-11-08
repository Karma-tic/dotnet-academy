import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  ChevronRight,
  Calendar,
  Flame,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Button } from './ui/Button';
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
  onNavigate?: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  modules,
  completedLessons,
  lastVisitedSlug,
  streak = 0,
  onSelectLesson,
  onOpenCertificate,
  onOpenPlanner,
  onExport,
  onImport,
  onReset,
  onNavigate,
}) => {
  const [importInput, setImportInput] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Exam readiness calculation: derived from lesson progress & streak
  const examReadiness = Math.min(
    100,
    Math.round(progressPercent * 0.85 + (streak > 0 ? Math.min(15, streak * 3) : 0))
  );

  // Flatten lessons for lookup
  const allLessons = modules.flatMap((m) => m.lessons);
  const lastLesson = allLessons.find((l) => l.slug === lastVisitedSlug);
  const nextIncomplete = allLessons.find((l) => !completedLessons.includes(l.slug)) || allLessons[0];
  const continueLesson = lastLesson || nextIncomplete;

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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      {/* 1. Hero Section (matching Flutter course) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/80 bg-violet-100/90 px-3.5 py-1.5 text-xs font-bold text-violet-950 shadow-2xs dark:border-violet-500/40 dark:bg-violet-950/90 dark:text-violet-200">
              <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>Tailored for Absolute Beginners &amp; Enterprise Engineers</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white leading-tight">
              Master .NET from Scratch.{' '}
              <span className="text-violet-600 dark:text-violet-400">
                Build Enterprise Systems.
              </span>{' '}
              Get Job-Ready.
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg leading-relaxed">
              No programming background assumed. Master modern C# 14, .NET 10 LTS, Clean Architecture, ASP.NET Core APIs, Entity Framework Core, Docker, and interview prep with verified sample labs.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectLesson(continueLesson.slug)}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-violet-700"
              >
                <span>Continue: {continueLesson.title}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate && onNavigate('exam-prep')}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900/50"
              >
                <Award className="h-4 w-4" />
                <span>Career &amp; Interview Hub</span>
              </button>

              {onOpenPlanner && (
                <button
                  onClick={onOpenPlanner}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <Calendar className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span>Study Planner</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Progress & Quick Stats Banner */}
      <section className="border-b border-slate-200/80 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Overall Progress Gauge */}
            <div className="md:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Overall Course Progress
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {progressPercent}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({completedCount} of {totalLessons} lessons finished)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {streak > 0 && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
                      <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{streak}d Streak</span>
                    </div>
                  )}

                  {progressPercent >= 100 && (
                    <button
                      onClick={onOpenCertificate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                    >
                      <Award className="w-4 h-4" />
                      <span>Get Certificate</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-violet-600 dark:bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Exam Placement Readiness: <strong className="text-emerald-600 dark:text-emerald-400">{examReadiness}%</strong></span>
                <button
                  onClick={() => onSelectLesson(continueLesson.slug)}
                  className="text-violet-600 dark:text-violet-400 hover:underline font-semibold"
                >
                  Resume Next &rarr;
                </button>
              </div>
            </div>

            {/* 3 Quick Stat Cards */}
            <div className="md:col-span-6 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center sm:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 mb-2 mx-auto sm:mx-0">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">12</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Core Modules</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center sm:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 mb-2 mx-auto sm:mx-0">
                  <Code2 className="h-5 w-5" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">16</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Tested Capstones</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center sm:text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 mb-2 mx-auto sm:mx-0">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">200+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Interview Q&amp;As</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Body Container */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Continue Learning Jump Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Up Next In Your Study Path
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {continueLesson.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{continueLesson.duration} mins</span>
                </span>
                <span>&bull;</span>
                <span>Module {continueLesson.module}: {modules.find((m) => m.id === continueLesson.module)?.title || 'Curriculum'}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectLesson(continueLesson.slug)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition shrink-0"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Curriculum Modules Overview Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Curriculum Modules
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                12 comprehensive, production-grade engineering modules from C# fundamentals to Cloud &amp; Microservices.
              </p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('course')}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 w-fit"
            >
              <span>View full curriculum</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const modLessons = module.lessons;
              const doneCount = modLessons.filter((l) => completedLessons.includes(l.slug)).length;
              const modPercent = modLessons.length > 0 ? Math.round((doneCount / modLessons.length) * 100) : 0;
              const firstLesson = modLessons[0];

              return (
                <div
                  key={module.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="space-y-4">
                    {/* Module Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 font-extrabold text-sm dark:bg-violet-950/60 dark:text-violet-400">
                        M{module.id}
                      </div>

                      {modPercent === 100 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Complete</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">
                          {modLessons.length} Lessons
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {module.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar & Jump */}
                  <div className="mt-6 space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{doneCount} / {modLessons.length} completed</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {modPercent}%
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-violet-600 dark:bg-violet-400 rounded-full transition-all"
                        style={{ width: `${modPercent}%` }}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const nextInMod = modLessons.find((l) => !completedLessons.includes(l.slug)) || firstLesson;
                          if (nextInMod) onSelectLesson(nextInMod.slug);
                        }}
                        className="flex items-center justify-between w-full text-xs font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400"
                      >
                        <span>{doneCount > 0 && doneCount < modLessons.length ? 'Continue Module' : 'Start Module'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Remaining Sections Checklist (matching Flutter course) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Remaining Sections ({remainingLessons.length} Lessons Left)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A clear checklist of topics you haven&apos;t completed yet
              </p>
            </div>
            {remainingLessons.length === 0 && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                🎉 All Lessons Completed!
              </span>
            )}
          </div>

          {remainingLessons.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto p-1">
              {remainingLessons.map((lesson) => (
                <button
                  key={lesson.slug}
                  onClick={() => onSelectLesson(lesson.slug)}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs transition text-left hover:border-violet-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="shrink-0 rounded-md border border-violet-200/80 bg-violet-50 px-2 py-0.5 text-[10px] font-extrabold uppercase text-violet-700 dark:border-violet-800/80 dark:bg-violet-950/80 dark:text-violet-300">
                      M{lesson.module}
                    </span>
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {lesson.title}
                    </span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-slate-600 dark:text-slate-300 space-y-3">
              <p>You have completed every lesson in this course! You are ready to claim your certificate.</p>
              <Button variant="primary" size="sm" onClick={onOpenCertificate}>
                <Award className="w-4 h-4 mr-1.5" />
                <span>Claim Certificate of Completion</span>
              </Button>
            </div>
          )}
        </div>

        {/* 6. Data Portability Backup */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Data Portability &amp; Local Backup
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your progress lives only in your local browser storage. Export a backup JSON to transfer to another device.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                Reset
              </Button>
            </div>
          </div>
        </div>
      </main>

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
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
