import React, { useState } from 'react';
import { Compass, CheckCircle2, Circle, ArrowRight, Clock, Award, Briefcase, Calendar } from 'lucide-react';
import { learningPathsData } from '../content/learningSupport/learningPathsData';
import { ModuleMeta } from './Sidebar';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';

export interface LearningPathsViewProps {
  modules: ModuleMeta[];
  completedLessons: string[];
  onSelectLesson: (slug: string) => void;
  onNavigateToCurriculum: () => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  modules,
  completedLessons,
  onSelectLesson,
}) => {
  const [selectedPathId, setSelectedPathId] = useState<string>(learningPathsData[0].id);

  const selectedPath = learningPathsData.find((p) => p.id === selectedPathId) || learningPathsData[0];

  // Calculate progress specifically for the selected learning path
  const targetModulesMeta = modules.filter((m) => selectedPath.targetModules.includes(m.id));
  const totalPathLessons = targetModulesMeta.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedPathLessons = targetModulesMeta.reduce((acc, m) => {
    return acc + m.lessons.filter((l) => completedLessons.includes(l.slug)).length;
  }, 0);
  const pathPercent = totalPathLessons > 0 ? Math.round((completedPathLessons / totalPathLessons) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Goal-Oriented Engineering Roadmaps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Choose Your .NET Career Track
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Don't study randomly. Choose a verified curriculum sequence mapped to your specific industry career objective, complete with week-by-week milestones and project deliverables.
        </p>

        {/* Track Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {learningPathsData.map((path) => {
            const isSelected = path.id === selectedPath.id;
            return (
              <Button
                key={path.id}
                variant={isSelected ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedPathId(path.id)}
                className="transition-all"
              >
                {path.title.split('(')[0].replace(' Track', '')}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Interactive Visual Career Roadmap (Step-by-step nodes) */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Step-by-Step Path</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Visual .NET Career Roadmap
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Click any career node below to jump directly into the corresponding curriculum module and code labs.
          </p>
        </div>

        {/* 6 Step Interactive Roadmap Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
          {[
            {
              step: '01',
              title: 'Absolute Beginner',
              desc: 'C# Syntax, Types & CLI',
              slug: 'what-is-dotnet-and-csharp',
              tag: 'Foundation',
              color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
            },
            {
              step: '02',
              title: 'Core Language',
              desc: 'OOP, Records & LINQ',
              slug: 'classes-records-and-structs',
              tag: 'Language',
              color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
            },
            {
              step: '03',
              title: 'Architecture',
              desc: 'Async, Tasks & DI',
              slug: 'async-await-and-concurrency',
              tag: 'Design',
              color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
            },
            {
              step: '04',
              title: 'Web & Databases',
              desc: 'Minimal APIs & EF Core',
              slug: 'aspnet-core-minimal-apis',
              tag: 'Backend',
              color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
            },
            {
              step: '05',
              title: 'Testing & Cloud',
              desc: 'xUnit & Docker Containers',
              slug: 'testing-with-xunit',
              tag: 'DevOps',
              color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
            },
            {
              step: '06',
              title: 'Exam & Placement',
              desc: 'Capstones & Mock Tests',
              slug: 'production-capstone-clean-architecture',
              tag: 'Career Ready',
              color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
            },
          ].map((node, nIdx) => (
            <button
              key={nIdx}
              onClick={() => onSelectLesson(node.slug)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-102 hover:shadow-lg group ${node.color}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold opacity-75">{node.step}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 uppercase tracking-wider font-semibold">
                    {node.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
                  {node.title}
                </h3>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {node.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span>Start Stage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Track Detail Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Track Title and Progress Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="purple">{selectedPath.roleTarget}</Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPath.estimatedWeeks} Weeks Recommended
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPath.difficulty} Level
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {selectedPath.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedPath.description}
            </p>
          </div>

          {/* Progress Card */}
          <div className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 w-full md:w-64 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Track Progress</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{pathPercent}%</span>
            </div>
            <ProgressBar value={pathPercent} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {completedPathLessons} of {totalPathLessons} lessons completed
            </p>
          </div>
        </div>

        {/* Target Job Roles */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Target Roles You Can Apply For</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedPath.jobRoles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Chronological Milestones Timeline */}
        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Week-by-Week Learning Roadmap</span>
          </h3>

          <div className="space-y-4">
            {selectedPath.milestones.map((milestone, mIdx) => {
              // Calculate completion of this specific milestone
              const milestoneModules = modules.filter((m) => milestone.moduleIds.includes(m.id));
              const mTotal = milestoneModules.reduce((acc, m) => acc + m.lessons.length, 0);
              const mDone = milestoneModules.reduce((acc, m) => {
                return acc + m.lessons.filter((l) => completedLessons.includes(l.slug)).length;
              }, 0);
              const isMilestoneDone = mTotal > 0 && mDone === mTotal;

              return (
                <div
                  key={mIdx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isMilestoneDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/60'
                      : 'bg-slate-50/40 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        W{milestone.week}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Modules: {milestone.moduleIds.map((id) => `Module ${id}`).join(', ')} • {milestone.recommendedDurationHours}h estimated
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      {isMilestoneDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Milestone Complete</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">
                          {mDone}/{mTotal} Lessons Done
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Deliverable Box */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                      Target Project:
                    </span>
                    <span className="leading-relaxed">{milestone.deliverable}</span>
                  </div>

                  {/* Modules quick buttons */}
                  <div className="flex flex-wrap gap-2 mt-3 pt-2">
                    {milestoneModules.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => onSelectLesson(mod.lessons[0]?.slug || '')}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {mod.lessons.every((l) => completedLessons.includes(l.slug)) ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Circle className="w-3 h-3 text-slate-400" />
                        )}
                        <span>M{mod.id}: {mod.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capstone Preview */}
        <div className="p-6 rounded-2xl bg-linear-to-r from-indigo-50 to-purple-50 dark:from-slate-950 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Track Capstone Deliverable
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {selectedPath.capstoneProject.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              {selectedPath.capstoneProject.description}
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onSelectLesson(targetModulesMeta[0]?.lessons[0]?.slug || '')}
            className="shrink-0 text-xs shadow-md"
          >
            Start Path Now
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
