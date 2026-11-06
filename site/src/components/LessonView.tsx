import React, { useState } from 'react';
import {
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  AlertCircle,
  FileEdit,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { CodeBlock } from './ui/CodeBlock';
import { Quiz, QuizQuestion } from './ui/Quiz';
import { siteConfig } from '../config/site';

export interface LessonContent {
  slug: string;
  title: string;
  module: number;
  moduleTitle: string;
  order: number;
  duration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  dotnetVersion: string;
  csharpVersion: string;
  lastVerified: string;
  reviewStatus: 'draft' | 'reviewed';
  summary: string;
  goal: string;
  explanation: React.ReactNode;
  analogy: {
    realWorldScenario: string;
    techMapping: string;
  };
  codeSnippet: {
    code: string;
    language: string;
    filename: string;
    samplePath?: string;
  };
  walkthrough: { step: string; detail: string }[];
  commonMistakes: { mistake: string; whyItFails: string; fix: string }[];
  practiceTask: {
    title: string;
    task: string;
    hints: string[];
    solutionCode: string;
  };
  quiz: QuizQuestion[];
}

export interface LessonViewProps {
  lesson: LessonContent;
  isCompleted: boolean;
  isBookmarked: boolean;
  savedNote?: string;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
  onSaveNote: (note: string) => void;
  onQuizComplete: (score: number) => void;
  prevLesson?: { slug: string; title: string };
  nextLesson?: { slug: string; title: string };
  onNavigate: (slug: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  isCompleted,
  isBookmarked,
  savedNote = '',
  onToggleComplete,
  onToggleBookmark,
  onSaveNote,
  onQuizComplete,
  prevLesson,
  nextLesson,
  onNavigate,
}) => {
  const [noteText, setNoteText] = useState(savedNote);
  const [showSolution, setShowSolution] = useState(false);

  const issueUrl = `${siteConfig.repoUrl}/issues/new?title=[Content Issue] ${encodeURIComponent(
    lesson.title
  )}&body=${encodeURIComponent(
    `Lesson: ${lesson.title} (${lesson.slug})\nModule: ${lesson.module}\n\nDescription of defect or suggestion:\n`
  )}`;

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => onNavigate('curriculum')} className="hover:underline">
          Curriculum
        </button>
        <span>/</span>
        <span>Module {lesson.module}</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
          {lesson.title}
        </span>
      </nav>

      {/* Verified on .NET Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-indigo-950 dark:text-indigo-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="font-semibold">
            {siteConfig.versions.headerBadgeText}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lesson.reviewStatus === 'reviewed' ? (
            <Badge variant="reviewed">✓ Reviewed by Karmatix</Badge>
          ) : (
            <Badge variant="warning">Under Review</Badge>
          )}
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            Verified {lesson.lastVerified}
          </span>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="purple">Module {lesson.module}: {lesson.moduleTitle}</Badge>
          <Badge variant="default">{lesson.difficulty}</Badge>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lesson.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {lesson.summary}
        </p>

        {/* Quick actions (Bookmark + Mark complete) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-y border-slate-200 dark:border-slate-800 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant={isCompleted ? 'secondary' : 'primary'}
              size="sm"
              onClick={onToggleComplete}
            >
              <CheckCircle2 className={`w-4 h-4 mr-1.5 ${isCompleted ? 'text-emerald-500' : ''}`} />
              {isCompleted ? 'Marked Complete' : 'Mark as Complete'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
            >
              <Bookmark className={`w-4 h-4 mr-1.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </Button>
          </div>

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Report an issue</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Goal Section */}
      <section id="goal" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎯 What You Will Learn (Goal)</span>
        </h2>
        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-sm leading-relaxed text-slate-800 dark:text-slate-200 border-l-4 border-indigo-600">
          {lesson.goal}
        </div>
      </section>

      {/* Simple Explanation */}
      <section id="explanation" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          💡 Clear Explanation
        </h2>
        <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
          {lesson.explanation}
        </div>
      </section>

      {/* Real-world Analogy */}
      <section id="analogy" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          🧩 Real-World Analogy
        </h2>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3 text-sm">
          <div>
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">The Scenario: </span>
            <span className="text-slate-700 dark:text-slate-300">{lesson.analogy.realWorldScenario}</span>
          </div>
          <div>
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">How it maps to .NET: </span>
            <span className="text-slate-700 dark:text-slate-300">{lesson.analogy.techMapping}</span>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section id="code" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          💻 Working Code Example
        </h2>
        <CodeBlock
          code={lesson.codeSnippet.code}
          language={lesson.codeSnippet.language}
          filename={lesson.codeSnippet.filename}
          samplePath={lesson.codeSnippet.samplePath}
        />
      </section>

      {/* Step-by-Step Walkthrough */}
      <section id="walkthrough" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          🔍 Step-by-Step Walkthrough
        </h2>
        <div className="space-y-3">
          {lesson.walkthrough.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3.5"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="space-y-1 text-sm">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {step.step}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes & Fixes */}
      <section id="mistakes" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          ⚠️ Common Mistakes & How to Fix Them
        </h2>
        <div className="space-y-4">
          {lesson.commonMistakes.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/15 space-y-2 text-sm"
            >
              <div className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Mistake: {m.mistake}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Why it fails:</strong> {m.whyItFails}
              </p>
              <p className="text-emerald-700 dark:text-emerald-300">
                <strong>Correct fix:</strong> {m.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Task */}
      <section id="practice" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          🛠️ Hands-on Practice Task
        </h2>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {lesson.practiceTask.title}
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {lesson.practiceTask.task}
          </p>

          {lesson.practiceTask.hints.length > 0 && (
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Hints:</span>
              <ul className="list-disc pl-5 space-y-1">
                {lesson.practiceTask.hints.map((hint, hIdx) => (
                  <li key={hIdx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? 'Hide Solution' : 'Reveal Solution'}
            </Button>

            {showSolution && (
              <div className="mt-4">
                <CodeBlock
                  code={lesson.practiceTask.solutionCode}
                  language="csharp"
                  filename="Solution.cs"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mini Quiz */}
      <section id="quiz">
        <Quiz
          lessonSlug={lesson.slug}
          questions={lesson.quiz}
          onComplete={(score) => onQuizComplete(score)}
        />
      </section>

      {/* Personal Notes Box */}
      <section className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <FileEdit className="w-4 h-4 text-indigo-500" />
          <span>Personal Notes for this Lesson (Stored Locally)</span>
        </div>
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => {
            setNoteText(e.target.value);
            onSaveNote(e.target.value);
          }}
          placeholder="Jot down notes, questions, or key takeaways for your revision..."
          className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Bottom Navigation (Prev / Next) */}
      <nav className="flex items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevLesson ? (
          <button
            onClick={() => onNavigate(prevLesson.slug)}
            className="flex items-center gap-2 text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group max-w-[45%]"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {prevLesson.title}
              </span>
            </div>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => onNavigate(nextLesson.slug)}
            className="flex items-center gap-2 text-right p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group max-w-[45%]"
          >
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Lesson</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {nextLesson.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
          </button>
        ) : <div />}
      </nav>
    </article>
  );
};
