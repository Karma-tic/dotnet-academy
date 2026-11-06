import React from 'react';
import { Calendar, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';

export interface StudyPlannerProps {
  completedCount: number;
  totalLessons: number;
  plannerState: {
    targetDays: number;
    hoursPerDay: number;
    startDate: string;
  };
  onUpdatePlanner: (targetDays: number, hoursPerDay: number) => void;
  onNavigateToLesson: (slug: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  completedCount,
  totalLessons,
  plannerState,
  onUpdatePlanner,
}) => {
  const { targetDays, hoursPerDay } = plannerState;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Calculate schedule
  const totalEstimatedHours = 80; // comprehensive course depth
  const totalDaysNeeded = Math.ceil(totalEstimatedHours / hoursPerDay);
  const lessonsPerDay = (totalLessons / targetDays).toFixed(1);

  const schedules = [
    { days: 30, hours: 3, label: '30 Days (Fast Track / Bootcamp)', desc: '~3 hours daily. Intense pace designed for career pivot or rapid interview prep.' },
    { days: 60, hours: 2, label: '60 Days (Balanced / Recommended)', desc: '~2 hours daily. Thorough understanding, sample coding, and capstone execution.' },
    { days: 90, hours: 1, label: '90 Days (Flexible / Part-time)', desc: '~1 hour daily. Ideal for working professionals or college students.' },
  ];

  const milestones = [
    { day: Math.round(targetDays * 0.15), title: 'Milestone 1: C# Syntax, OOP & Collections', module: 'Modules 0, 1 & 2' },
    { day: Math.round(targetDays * 0.35), title: 'Milestone 2: LINQ, Async/Await & EF Core', module: 'Modules 3 & 4' },
    { day: Math.round(targetDays * 0.60), title: 'Milestone 3: ASP.NET Core Web APIs & Security', module: 'Modules 5 & 6' },
    { day: Math.round(targetDays * 0.80), title: 'Milestone 4: Clean Architecture, Testing & DevOps', module: 'Modules 7, 8 & 9' },
    { day: targetDays, title: 'Milestone 5: Capstones Completed & Interview Ready', module: 'Modules 10 & 11' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Title banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Structured Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          30 / 60 / 90-Day Study Planner
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Tailor your daily study schedule. Learn .NET systematically with clear weekly milestones and realistic daily goals.
        </p>
      </div>

      {/* Preset selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {schedules.map((item) => {
          const isSelected = targetDays === item.days;
          return (
            <Card
              key={item.days}
              hover
              onClick={() => onUpdatePlanner(item.days, item.hours)}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20'
                  : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.days} Days
                  </span>
                  {isSelected && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-600 text-white">
                      Active Plan
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {item.hours} Hours / Day
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Current Pace Summary */}
      <Card className="bg-gradient-to-r from-indigo-500/5 via-slate-50 to-indigo-500/5 dark:from-indigo-950/30 dark:via-slate-900 dark:to-indigo-950/30 border-indigo-200 dark:border-indigo-900/60 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              Target Pace
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {hoursPerDay} hrs <span className="text-xs font-normal text-slate-500">/ day</span>
            </p>
            <p className="text-xs text-slate-500">
              {lessonsPerDay} lessons per day
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              Target Duration
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {targetDays} Days
            </p>
            <p className="text-xs text-slate-500">
              ~{totalDaysNeeded} days needed at this pace
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
              Curriculum Progress
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {progressPercent}%
            </p>
            <p className="text-xs text-slate-500">
              {completedCount} of {totalLessons} lessons done
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <ProgressBar value={progressPercent} label="Overall Completion" />
        </div>
      </Card>

      {/* Week-by-Week Roadmap & Milestones */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Target Milestones ({targetDays}-Day Schedule)</span>
        </h2>

        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                  D{m.day}
                </span>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {m.module}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  By Day {m.day}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
