import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronDown, BookOpen, Layers } from 'lucide-react';

export interface LessonMeta {
  slug: string;
  title: string;
  module: number;
  duration: number; // in mins
  reviewStatus: 'draft' | 'reviewed';
}

export interface ModuleMeta {
  id: number;
  title: string;
  description: string;
  lessons: LessonMeta[];
}

export interface SidebarProps {
  modules: ModuleMeta[];
  currentSlug: string;
  onSelectLesson: (slug: string) => void;
  completedLessons: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  currentSlug,
  onSelectLesson,
  completedLessons,
  isOpen,
  onClose,
}) => {
  // Find which module contains the current lesson and keep it open
  const currentModule = modules.find((m) => m.lessons.some((l) => l.slug === currentSlug))?.id ?? 0;
  const [openModules, setOpenModules] = useState<number[]>([currentModule]);

  const toggleModule = (modId: number) => {
    setOpenModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 sm:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto flex flex-col`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Modules (0 – 11)</span>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {completedLessons.length} Done
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          {modules.map((mod) => {
            const isModuleOpen = openModules.includes(mod.id);
            const modCompletedCount = mod.lessons.filter((l) =>
              completedLessons.includes(l.slug)
            ).length;
            const isFullyCompleted = modCompletedCount === mod.lessons.length && mod.lessons.length > 0;

            return (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20 overflow-hidden"
              >
                {/* Module Header Button */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                      M{mod.id}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {mod.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isFullyCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    {isModuleOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons list */}
                {isModuleOpen && (
                  <div className="p-1.5 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60">
                    {mod.lessons.map((lesson) => {
                      const isActive = currentSlug === lesson.slug;
                      const isLessonDone = completedLessons.includes(lesson.slug);

                      return (
                        <button
                          key={lesson.slug}
                          onClick={() => {
                            onSelectLesson(lesson.slug);
                            onClose();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                            isActive
                              ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {lesson.reviewStatus === 'reviewed' && (
                              <span className="text-[9px] px-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded">
                                Rev
                              </span>
                            )}
                            {isLessonDone && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
