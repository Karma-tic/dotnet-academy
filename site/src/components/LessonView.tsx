import React, { useState, useEffect } from 'react';
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
  Play,
  BookOpen,
  Lightbulb,
  Zap,
  Save,
  Coffee,
  AlertTriangle,
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
  quizScore?: number;
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
  quizScore,
  onToggleComplete,
  onToggleBookmark,
  onSaveNote,
  onQuizComplete,
  prevLesson,
  nextLesson,
  onNavigate,
  onOpenJargon,
}) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'notes'>('lesson');
  const [noteText, setNoteText] = useState(savedNote);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isEli5Mode, setIsEli5Mode] = useState(false);

  // Sync state when lesson changes
  useEffect(() => {
    setNoteText(savedNote);
    setShowSolution(false);
    setIsEli5Mode(false);
    setSaveSuccess(false);
  }, [lesson.slug, savedNote]);

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

  const handleSaveNote = () => {
    onSaveNote(noteText);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Table of Contents anchors
  const tocItems = [
    { id: 'goal', label: '1. Goal & Objectives' },
    { id: 'explanation', label: '2. Simple Explanation' },
    { id: 'analogy', label: '3. Real-World Analogy' },
    { id: 'trivia', label: '4. Mind Blown Trivia' },
    { id: 'code-example', label: '5. Clean Code Example' },
    { id: 'walkthrough', label: '6. Step-by-Step Breakdown' },
    { id: 'common-mistakes', label: '7. Common Traps & Fixes' },
    { id: 'exam-alert', label: '8. Placement Exam Alert' },
    { id: 'practice-task', label: '9. Hands-on Practice' },
    { id: 'concept-quiz', label: '10. Concept Quiz' },
  ];

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)]">
      {/* Central Lesson Body */}
      <div className="flex-1 min-w-0">
        <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Bar with Breadcrumbs & Action Controls */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800 gap-2">
            <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 truncate">
              <button onClick={() => onNavigate('curriculum')} className="hover:underline shrink-0">
                Course
              </button>
              <span>/</span>
              <span className="shrink-0">Module {lesson.module}</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-[150px] sm:max-w-none">
                {lesson.title}
              </span>
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              {/* Bookmark Toggle */}
              <button
                onClick={onToggleBookmark}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark this lesson'}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isBookmarked
                    ? 'border-violet-500 bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300'
                    : 'border-slate-200 text-slate-400 hover:text-slate-700 dark:border-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Mark Complete Button */}
              <button
                onClick={onToggleComplete}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>

          {/* Verified on .NET LTS Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/50 dark:bg-violet-950/20 text-xs text-violet-950 dark:text-violet-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
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

          {/* Lesson Title & Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  M{lesson.module} • Lesson {lesson.order}
                </span>

                <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Clock className="h-3 w-3" />
                  {lesson.duration} min read
                </span>

                <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                  {lesson.difficulty}
                </span>

                {/* Jargon Buster Trigger Button */}
                <button
                  onClick={handleOpenJargon}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 hover:bg-amber-100 transition-colors"
                  title="Open Jargon Buster dictionary"
                >
                  <span>🌶️ Jargon Buster</span>
                </button>
              </div>

              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 inline-flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Report issue</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white break-words">
              {lesson.title}
            </h1>

            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <RichTextRenderer content={lesson.summary} />
            </div>
          </div>

          {/* Top Tabs: Lesson Content vs My Notes, with ELI5 Toggle */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-1 gap-2 dark:border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'lesson'
                    ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Lesson Content</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'notes'
                    ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <FileEdit className="h-4 w-4" />
                <span>My Notes {noteText ? '(Saved)' : ''}</span>
              </button>
            </div>

            {/* ELI5 Toggle Button */}
            {activeTab === 'lesson' && (
              <button
                onClick={() => setIsEli5Mode(!isEli5Mode)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
                  isEli5Mode
                    ? 'bg-amber-500 text-white ring-2 ring-amber-400/40'
                    : 'border border-amber-300 bg-amber-50/70 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                }`}
                title="Toggle Explain Like I'm 5 simplified mode"
              >
                <Baby className="h-3.5 w-3.5" />
                <span>{isEli5Mode ? '👶 ELI5 Active (Ultra-Simple)' : '👶 Switch to ELI5 Mode'}</span>
              </button>
            )}
          </div>

          {/* TAB 1: LESSON CONTENT */}
          {activeTab === 'lesson' ? (
            <div className="space-y-10 text-slate-800 dark:text-slate-200">
              {/* ELI5 Mode Notification Banner when active */}
              {isEli5Mode && (
                <section className="rounded-2xl border-2 border-amber-400 bg-amber-50/90 p-5 shadow-xs dark:border-amber-700 dark:bg-amber-950/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">👶</span>
                    <h3 className="font-extrabold text-sm text-amber-950 dark:text-amber-200">
                      Explain Like I&apos;m 5 (ELI5) Breakdown:
                    </h3>
                  </div>
                  <div className="text-xs space-y-2 text-amber-900 dark:text-amber-300 leading-relaxed font-medium">
                    <p>
                      <strong>1. What this topic is really doing:</strong>{' '}
                      {eli5Text}
                    </p>
                    <p>
                      <strong>2. Real-life comparison:</strong> &ldquo;{lesson.analogy.realWorldScenario}&rdquo;
                    </p>
                    <p>
                      <strong>3. The golden rule for enterprise &amp; exams:</strong> Don&apos;t just memorize syntax. Focus on how memory, threads, and performance behave!
                    </p>
                  </div>
                </section>
              )}

              {/* 1. 🎯 Goal of this Lesson */}
              <section id="goal" className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Goal of this Lesson
                </h3>
                <div className="rounded-xl border border-violet-200/80 bg-violet-50/40 p-4 text-sm font-medium text-slate-900 dark:border-violet-900/50 dark:bg-violet-950/20 dark:text-slate-100">
                  <RichTextRenderer content={lesson.goal} />
                </div>
              </section>

              {/* 2. 💡 Simple Explanation */}
              <section id="explanation" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Simple Explanation
                  </h3>
                  <span className="text-xs text-slate-400">No jargon assumed</span>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <RichTextRenderer content={lesson.explanation} onJargonClick={handleOpenJargon} />
                </div>
              </section>

              {/* 3. 🍕 Relatable Beginner Analogy */}
              <section id="analogy" className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  Real-World Beginner Analogy
                </h3>
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200 leading-relaxed space-y-2">
                  <div>
                    <span className="font-semibold text-amber-900 dark:text-amber-200">The Everyday Scenario: </span>
                    <RichTextRenderer content={lesson.analogy.realWorldScenario} />
                  </div>
                  <div>
                    <span className="font-semibold text-amber-900 dark:text-amber-200">How it Maps to .NET: </span>
                    <RichTextRenderer content={lesson.analogy.techMapping} />
                  </div>
                </div>
              </section>

              {/* Mind Blown Fun Fact Card */}
              <section id="trivia" className="rounded-2xl border border-purple-200/70 bg-gradient-to-r from-purple-50/60 to-violet-50/40 p-4 text-xs dark:border-purple-900/40 dark:from-purple-950/20 dark:to-slate-900 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-xs">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 text-[10px]">
                    Mind Blown 🤯 Did You Know?
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <RichTextRenderer content={didYouKnowText} />
                  </div>
                </div>
              </section>

              {/* 4. 💻 Clean Code Example */}
              <section id="code-example" className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Clean Code Example
                  </h3>
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

              {/* 5. 🚶 Step-by-Step Code Walkthrough */}
              {lesson.walkthrough && lesson.walkthrough.length > 0 && (
                <section id="walkthrough" className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Step-by-Step Code Walkthrough
                  </h3>
                  <div className="space-y-3">
                    {lesson.walkthrough.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {step.step}
                          </h4>
                          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            <RichTextRenderer content={step.detail} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. ⚠️ Common Traps & Exact Fixes */}
              {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                <section id="common-mistakes" className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Common Beginner Mistakes &amp; How to Fix Them
                  </h3>
                  <div className="space-y-3">
                    {lesson.commonMistakes.map((item, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2 text-xs"
                      >
                        <div className="font-semibold text-red-600 dark:text-red-400 flex items-start gap-1.5">
                          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>Mistake: {item.mistake}</span>
                        </div>
                        <div className="rounded-lg bg-slate-100 p-2.5 font-medium text-emerald-800 dark:bg-slate-800 dark:text-emerald-300">
                          <span className="font-bold">The Fix: </span>
                          <RichTextRenderer content={item.fix} />
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Why this happens: </span>{' '}
                          <RichTextRenderer content={item.whyItFails} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 🚨 Campus & Placement Exam Alert */}
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
              {lesson.practiceTask && (
                <section
                  id="practice-task"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      🎯 Hands-on Practice: {lesson.practiceTask.title}
                    </h3>
                    <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold">
                      Coding Drill
                    </span>
                  </div>

                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <RichTextRenderer content={lesson.practiceTask.task} />
                  </div>

                  {lesson.practiceTask.hints.length > 0 && (
                    <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-slate-200">
                        💡 Hints:
                      </span>
                      <ul className="list-disc pl-5 space-y-1">
                        {lesson.practiceTask.hints.map((hint, hIdx) => (
                          <li key={hIdx}>
                            <RichTextRenderer content={hint} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? 'Hide Solution' : 'Reveal Solution Code'}
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
                </section>
              )}

              {/* 8. 🧠 Concept Quiz */}
              <section id="concept-quiz">
                <Quiz
                  lessonSlug={lesson.slug}
                  questions={lesson.quiz}
                  onComplete={(score) => onQuizComplete(score)}
                />
              </section>

              {/* Ko-fi Chai Support Callout */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
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
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 max-w-[45%]"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="text-left min-w-0">
                      <div className="text-[10px] text-slate-400 font-normal">
                        Previous Lesson
                      </div>
                      <div className="truncate">
                        {prevLesson.title}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <button
                    onClick={() => onNavigate(nextLesson.slug)}
                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700 max-w-[45%]"
                  >
                    <div className="text-right min-w-0">
                      <div className="text-[10px] text-violet-200 font-normal">
                        Next Lesson
                      </div>
                      <div className="truncate">
                        {nextLesson.title}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('exam-prep')}
                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700"
                  >
                    <span>Proceed to Career Hub</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </nav>
            </div>
          ) : (
            /* TAB 2: PERSONAL NOTES */
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Your Private Notes for &ldquo;{lesson.title}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Notes are stored directly in your browser&apos;s localStorage. They survive page reloads and can be exported as JSON in the footer.
                </p>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={12}
                placeholder="Write your key takeaways, code ideas, or exam reminders here..."
                className="w-full rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 focus:border-violet-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              />

              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {saveSuccess ? '✓ Note saved to local storage!' : ''}
                </span>
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Right Column: Table of Contents (Desktop only) */}
      <aside className="hidden xl:block w-64 shrink-0 border-l border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          On This Page
        </h4>
        <nav className="space-y-1.5 text-xs">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-md px-2 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-violet-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Quick Quiz Pass Indicator */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quiz Status
          </div>
          {quizScore !== undefined ? (
            <div className="rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
              Score: {quizScore}%
              {quizScore >= 70 ? ' (Passed ✓)' : ' (Retake for 70%)'}
            </div>
          ) : (
            <div className="text-xs text-slate-400">Not taken yet</div>
          )}
        </div>
      </aside>
    </div>
  );
};
