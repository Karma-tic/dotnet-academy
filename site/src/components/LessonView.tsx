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
  ShieldCheck,
  Baby,
  GraduationCap,
  Play
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { CodeBlock } from './ui/CodeBlock';
import { Quiz, QuizQuestion } from './ui/Quiz';
import { RichTextRenderer } from './ui/RichTextRenderer';
import { siteConfig } from '../config/site';
import { getLessonEnhancement } from '../content/lessons/lessonEnhancements';

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
  eli5Explanation?: string;
  didYouKnow?: string;
  examAlert?: string;
  sandboxUrl?: string;
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
  onOpenJargon?: () => void;
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
  onOpenJargon,
}) => {
  const [noteText, setNoteText] = useState(savedNote);
  const [showSolution, setShowSolution] = useState(false);
  const [isEli5Mode, setIsEli5Mode] = useState(false);

  // Retrieve curated trivia, exam alerts, and ELI5 narrative
  const enhancement = getLessonEnhancement(lesson.slug, lesson.summary, lesson.title);
  const eli5Text = lesson.eli5Explanation || enhancement.eli5;
  const didYouKnowText = lesson.didYouKnow || enhancement.didYouKnow;
  const examAlertText = lesson.examAlert || enhancement.examAlert;
  const sandboxUrl = lesson.sandboxUrl || enhancement.sandboxUrl || 'https://dotnetfiddle.net/';

  const issueUrl = `${siteConfig.repoUrl}/issues/new?title=[Content Issue] ${encodeURIComponent(
    lesson.title
  )}&body=${encodeURIComponent(
    `Lesson: ${lesson.title} (${lesson.slug})\nModule: ${lesson.module}\n\nDescription of defect or suggestion:\n`
  )}`;

  const handleOpenJargon = () => {
    if (onOpenJargon) {
      onOpenJargon();
    } else {
      window.dispatchEvent(new CustomEvent('open-jargon-modal'));
    }
  };

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => onNavigate('curriculum')} className="hover:underline">
          Curriculum Hub
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
            <span className="hidden sm:inline">{siteConfig.versions.headerBadgeText}</span>
            <span className="sm:hidden">Verified on .NET 10 LTS • C# 14</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {lesson.reviewStatus === 'reviewed' ? (
            <Badge variant="reviewed">✓ Reviewed by Karmatix</Badge>
          ) : (
            <Badge variant="warning">Under Review</Badge>
          )}
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            Verified {lesson.lastVerified}
          </span>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="purple">Module {lesson.module}: {lesson.moduleTitle}</Badge>
            <Badge variant="default">{lesson.difficulty}</Badge>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration} min read
            </span>
          </div>

          {/* ANTI-BOREDOM FEATURE: ELI5 Toggle Button */}
          <button
            onClick={() => setIsEli5Mode(!isEli5Mode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              isEli5Mode
                ? 'bg-amber-500 text-white ring-2 ring-amber-300 dark:ring-amber-600'
                : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/40'
            }`}
            title="Toggle Explain Like I'm 5 simplified mode"
          >
            {isEli5Mode ? (
              <>
                <GraduationCap className="w-3.5 h-3.5" />
                <span>🎓 Technical Mode</span>
              </>
            ) : (
              <>
                <Baby className="w-3.5 h-3.5" />
                <span>👶 Switch to ELI5 Mode</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white break-words">
          {lesson.title}
        </h1>

        {/* ELI5 Notification Banner when active */}
        {isEli5Mode ? (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs uppercase tracking-wider">
              <Baby className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>ELI5 Mode Active (Kindergarten Simple)</span>
            </div>
            <p className="text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
              {eli5Text}
            </p>
          </div>
        ) : (
          <div className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
            <RichTextRenderer content={lesson.summary} />
          </div>
        )}

        {/* Quick actions (Bookmark + Mark complete + Jargon Buster) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-y border-slate-200 dark:border-slate-800 py-3">
          <div className="flex flex-wrap items-center gap-2">
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

            {/* Jargon Buster Trigger Button */}
            <button
              onClick={handleOpenJargon}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 hover:bg-amber-100 transition-colors"
              title="Open Jargon Buster dictionary"
            >
              <span>🌶️ Jargon Buster</span>
            </button>
          </div>

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Report defect</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 1. 🎯 Goal of this Lesson */}
      <section id="goal" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎯 Goal of this Lesson</span>
        </h2>
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-sm leading-relaxed text-slate-800 dark:text-slate-100 border-l-4 border-indigo-600 shadow-xs">
          <RichTextRenderer content={lesson.goal} />
        </div>
      </section>

      {/* 2. 💡 Simple Explanation */}
      <section id="explanation" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Simple Explanation</span>
        </h2>
        <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 space-y-4">
          <RichTextRenderer content={lesson.explanation} onJargonClick={handleOpenJargon} />
        </div>
      </section>

      {/* 3. 🍕 Relatable Beginner Analogy */}
      <section id="analogy" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🍕 Relatable Beginner Analogy</span>
        </h2>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-3 text-sm">
          <div>
            <span className="font-semibold text-indigo-900 dark:text-indigo-300">The Everyday Scenario: </span>
            <span className="text-slate-700 dark:text-slate-200">
              <RichTextRenderer content={lesson.analogy.realWorldScenario} />
            </span>
          </div>
          <div>
            <span className="font-semibold text-indigo-900 dark:text-indigo-300">How it Maps to .NET: </span>
            <span className="text-slate-700 dark:text-slate-200">
              <RichTextRenderer content={lesson.analogy.techMapping} />
            </span>
          </div>
        </div>
      </section>

      {/* ANTI-BOREDOM FEATURE: 🤯 Mind Blown Did You Know? Trivia Card */}
      <section id="trivia" className="p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-pink-50/50 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-pink-950/30 space-y-2 text-sm shadow-xs">
        <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-bold">
          <span className="text-xl" aria-hidden="true">🤯</span>
          <span>Mind Blown: Did You Know?</span>
        </div>
        <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
          <RichTextRenderer content={didYouKnowText} />
        </div>
      </section>

      {/* 4. 💻 Clean Code Example (With Online Playground runner) */}
      <section id="code" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>💻 Clean Code Example</span>
          </h2>
          <a
            href={sandboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            title="Open online C# sandbox (.NET Fiddle / SharpLab)"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run in Online Sandbox 🚀</span>
          </a>
        </div>
        <CodeBlock
          code={lesson.codeSnippet.code}
          language={lesson.codeSnippet.language}
          filename={lesson.codeSnippet.filename}
          samplePath={lesson.codeSnippet.samplePath}
        />
      </section>

      {/* 5. 🚶 Step-by-Step Walkthrough */}
      <section id="walkthrough" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🚶 Step-by-Step Walkthrough</span>
        </h2>
        <div className="space-y-3">
          {lesson.walkthrough.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex items-start gap-3.5"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="space-y-1 text-sm">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {step.step}
                </h4>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <RichTextRenderer content={step.detail} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ⚠️ Common Beginner Mistakes & Exact Fixes */}
      <section id="mistakes" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚠️ Common Mistakes &amp; Exact Fixes</span>
        </h2>
        <div className="space-y-4">
          {lesson.commonMistakes.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/25 space-y-2 text-sm"
            >
              <div className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Mistake: {m.mistake}</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200">
                <strong className="font-semibold text-slate-900 dark:text-white">Why it fails: </strong>
                <RichTextRenderer content={m.whyItFails} />
              </div>
              <div className="text-emerald-800 dark:text-emerald-300">
                <strong className="font-semibold text-emerald-900 dark:text-emerald-200">Correct fix: </strong>
                <RichTextRenderer content={m.fix} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANTI-BOREDOM FEATURE: 🚨 Campus & Placement Exam Alert */}
      <section id="exam-alert" className="p-5 rounded-2xl border-l-4 border-red-500 bg-red-50/60 dark:bg-red-950/30 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold">
          <span className="text-base" aria-hidden="true">🚨</span>
          <span>Placement Exam Alert (TCS, Infosys, Wipro, AZ-204)</span>
        </div>
        <div className="text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
          <RichTextRenderer content={examAlertText} />
        </div>
      </section>

      {/* 7. 🛠️ Hands-on Practice Task */}
      <section id="practice" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🛠️ Hands-on Practice Task</span>
        </h2>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {lesson.practiceTask.title}
          </h3>
          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <RichTextRenderer content={lesson.practiceTask.task} />
          </div>

          {lesson.practiceTask.hints.length > 0 && (
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Hints:</span>
              <ul className="list-disc pl-5 space-y-1">
                {lesson.practiceTask.hints.map((hint, hIdx) => (
                  <li key={hIdx} className="text-slate-700 dark:text-slate-300">
                    <RichTextRenderer content={hint} />
                  </li>
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

      {/* 8. 🧠 Mini Quiz (Auto-marks complete on 70%+) */}
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

      {/* Ko-fi Chai Support Callout (Preserved as requested) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="text-base" aria-hidden="true">☕</span>
          <span>Enjoyed this lesson? Help keep Karmatix free for developers worldwide.</span>
        </div>
        <a
          href="https://ko-fi.com/karmatix"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
          aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
        >
          <span>Enjoyed this course? Buy me a chai ☕</span>
        </a>
      </div>

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
