import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  HelpCircle,
  Code2,
  Clock,
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Filter,
  Sparkles,
  Calendar,
  Award,
  Play
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CodeBlock } from './ui/CodeBlock';
import { RichTextRenderer } from './ui/RichTextRenderer';
import { BigOCalculator } from './BigOCalculator';
import { interviewQuestions } from '../content/career/interviewQuestions';
import { codingProblems, CodingProblem } from '../content/career/codingProblems';
import { mockTests, MockTest } from '../content/career/mockTests';
import { careerArticles, CareerArticle } from '../content/career/careerGuides';
import { revisionPlan } from '../content/career/revisionPlan';

export interface CareerHubProps {
  onSaveMockScore: (testId: string, score: number, total: number) => void;
  mockScores: Record<string, { score: number; total: number; timestamp: string }>;
}

export const CareerHub: React.FC<CareerHubProps> = ({
  onSaveMockScore,
  mockScores,
}) => {
  const [activeTab, setActiveTab] = useState<'qa' | 'coding' | 'mock' | 'calculator' | 'revision' | 'capstones' | 'guides'>('qa');

  // Interview Q&A State
  const [qaSearch, setQaSearch] = useState('');
  const [qaCategory, setQaCategory] = useState<string>('All');
  const [qaLevel, setQaLevel] = useState<string>('All');
  const [expandedQa, setExpandedQa] = useState<Record<string, boolean>>({});

  // Coding Practice State
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [codingCategory, setCodingCategory] = useState<string>('All');
  const [showProblemSolution, setShowProblemSolution] = useState(false);

  // Mock Test State
  const [activeMockTest, setActiveMockTest] = useState<MockTest | null>(null);
  const [mockAnswers, setMockAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [mockSubmitted, setMockSubmitted] = useState(false);

  // 7-Day Revision State
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Career Guides State
  const [selectedArticle, setSelectedArticle] = useState<CareerArticle>(careerArticles[0]);

  // Timer effect for mock test
  useEffect(() => {
    if (!activeMockTest || mockSubmitted || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitMock();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeMockTest, mockSubmitted, timeRemaining]);

  // Start mock test
  const handleStartMock = (test: MockTest) => {
    setActiveMockTest(test);
    setMockAnswers({});
    setTimeRemaining(test.durationMinutes * 60);
    setMockSubmitted(false);
  };

  const handleSelectMockOption = (qId: number, oIdx: number) => {
    if (mockSubmitted) return;
    setMockAnswers((prev) => ({ ...prev, [qId]: oIdx }));
  };

  const handleSubmitMock = () => {
    if (!activeMockTest) return;
    setMockSubmitted(true);
    let correct = 0;
    activeMockTest.questions.forEach((q) => {
      if (mockAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const scorePct = Math.round((correct / activeMockTest.questions.length) * 100);
    onSaveMockScore(activeMockTest.id, scorePct, activeMockTest.questions.length);
  };

  // Filtered Interview Questions
  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(qaSearch.toLowerCase()) ||
      q.modelAnswer.toLowerCase().includes(qaSearch.toLowerCase()) ||
      q.keyTakeaway.toLowerCase().includes(qaSearch.toLowerCase());

    const matchesCategory = qaCategory === 'All' || q.category === qaCategory;
    const matchesLevel = qaLevel === 'All' || q.level === qaLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = ['All', ...Array.from(new Set(interviewQuestions.map((q) => q.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered Coding Problems
  const codingCategories = ['All', 'Strings', 'Arrays & Lists', 'LINQ', 'OOP & Design', 'Async & Concurrency', 'Algorithms'];
  const filteredProblems = codingProblems.filter((p) => {
    if (codingCategory === 'All') return true;
    return p.category === codingCategory;
  });

  const toggleQaExpand = (id: string) => {
    setExpandedQa((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeRevisionDay = revisionPlan.find((r) => r.day === selectedDay) || revisionPlan[0];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job-Ready .NET Exam &amp; Career Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Exam Prep &amp; Technical Interview Accelerator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          200+ curated interview Q&amp;A, 50+ coding problems, 6 timed company mock tests, an interactive Big-O calculator, and a 7-day last-minute revision plan.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'qa', label: 'Q&A (200+)', icon: HelpCircle },
            { id: 'mock', label: 'Mock Tests (6)', icon: Clock },
            { id: 'calculator', label: 'Big-O Calculator', icon: Sparkles },
            { id: 'revision', label: '7-Day Revision', icon: Calendar },
            { id: 'capstones', label: 'Capstones', icon: Award },
            { id: 'coding', label: 'Coding Lab (50+)', icon: Code2 },
            { id: 'guides', label: 'Playbooks', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INTERVIEW Q&A */}
      {activeTab === 'qa' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={qaSearch}
                onChange={(e) => setQaSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Category:</span>
                <select
                  value={qaCategory}
                  onChange={(e) => setQaCategory(e.target.value)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Level:</span>
                <select
                  value={qaLevel}
                  onChange={(e) => setQaLevel(e.target.value)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-slate-400">
                {filteredQuestions.length} questions
              </span>
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <Card className="text-center py-12 text-sm text-slate-500">
                No interview questions matched your search criteria.
              </Card>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = expandedQa[q.id];
                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQaExpand(q.id)}
                      className="w-full text-left p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="purple">{q.category}</Badge>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              q.level === 'Beginner'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : q.level === 'Intermediate'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                                : 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                            }`}
                          >
                            {q.level}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                          {q.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform shrink-0 mt-1 ${
                          isExpanded ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 space-y-3 text-sm">
                        <div>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 block text-xs uppercase tracking-wider mb-1">
                            Model Answer:
                          </span>
                          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            <RichTextRenderer content={q.modelAnswer} />
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200">
                          <strong>Key Takeaway: </strong> {q.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TIMED MOCK TESTS (6 Tests) */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          {!activeMockTest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTests.map((test) => {
                const pastScore = mockScores[test.id];
                return (
                  <Card key={test.id} className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="purple">{test.title.split(':')[0]}</Badge>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          {test.durationMinutes}m
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {test.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {test.description}
                      </p>

                      <div className="text-xs text-slate-500">
                        {test.questions.length} Questions &bull; Pass target: {test.passingScore}%
                      </div>

                      {pastScore && (
                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-between">
                          <span className="text-slate-500">Last Attempt:</span>
                          <span
                            className={`font-bold ${
                              pastScore.score >= test.passingScore
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {pastScore.score}%
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartMock(test)}
                      className="w-full justify-center"
                    >
                      {pastScore ? 'Retake Exam' : 'Start 25-Min Exam'}
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Active Test Runner View */
            <div className="space-y-6">
              {/* Test Header with countdown timer */}
              <div className="sticky top-16 z-30 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {activeMockTest.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {Object.keys(mockAnswers).length} of {activeMockTest.questions.length} answered
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {!mockSubmitted && (
                    <div
                      className={`font-mono text-sm sm:text-base font-black px-3 py-1 rounded-lg border ${
                        timeRemaining < 300
                          ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950/40 animate-pulse'
                          : 'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {formatTimer(timeRemaining)}
                    </div>
                  )}

                  {!mockSubmitted ? (
                    <Button variant="primary" size="sm" onClick={handleSubmitMock}>
                      Submit Exam
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setActiveMockTest(null)}>
                      Back to All Tests
                    </Button>
                  )}
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {activeMockTest.questions.map((q, idx) => {
                  const selectedOpt = mockAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <Card key={q.id} className="p-5 sm:p-6 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </h4>
                        {mockSubmitted && (
                          <span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                            )}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selectedOpt === oIdx;
                          let optionClasses = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40';

                          if (mockSubmitted) {
                            if (oIdx === q.correctIndex) {
                              optionClasses = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold';
                            } else if (isOptionSelected) {
                              optionClasses = 'border-red-500 bg-red-50/60 dark:bg-red-950/30 text-red-900 dark:text-red-200';
                            }
                          } else if (isOptionSelected) {
                            optionClasses = 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 font-semibold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={mockSubmitted}
                              onClick={() => handleSelectMockOption(q.id, oIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3 ${optionClasses}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-mono shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {mockSubmitted && (
                        <div className="text-xs p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <strong>Explanation: </strong> {q.explanation}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BIG-O & MEMORY CALCULATOR */}
      {activeTab === 'calculator' && (
        <BigOCalculator />
      )}

      {/* TAB 4: 7-DAY REVISION PLAN */}
      {activeTab === 'revision' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {revisionPlan.map((r) => (
              <button
                key={r.day}
                onClick={() => setSelectedDay(r.day)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedDay === r.day
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Day {r.day}
              </button>
            ))}
          </div>

          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Badge variant="warning">Day {activeRevisionDay.day} Focus</Badge>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeRevisionDay.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {activeRevisionDay.theme}
              </p>
            </div>

            {/* Must Knows */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                High-Yield Must-Know Concepts
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeRevisionDay.mustKnows.map((mk, idx) => (
                  <li key={idx}>
                    <RichTextRenderer content={mk} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Placement Trap Question */}
            <div className="p-5 rounded-2xl border border-rose-300 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-bold text-rose-900 dark:text-rose-200">
                <span>🚨 Top Exam Trap Question</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {activeRevisionDay.trapQuestion.question}
              </p>
              <div className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-amber-600">The Trap: </span>
                {activeRevisionDay.trapQuestion.trap}
              </div>
              <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                <span className="font-semibold text-emerald-600">Correct Answer: </span>
                {activeRevisionDay.trapQuestion.correctAnswer}
              </div>
            </div>

            {/* Cheat Code Snippet */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                High-Yield Syntax Reference
              </h3>
              <CodeBlock code={activeRevisionDay.cheatCode} language="csharp" />
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: END-TO-END CAPSTONE PROJECTS */}
      {activeTab === 'capstones' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-indigo-950 text-white border border-indigo-900/60 space-y-3">
            <Badge variant="purple">Real Working Codebases</Badge>
            <h2 className="text-2xl font-black">Production Capstone Projects</h2>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
              Every project below is a full, working C# application located in the course repository under <code>/samples/Capstones</code> with full xUnit test suites and Dockerfiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="reviewed">Capstone 1</Badge>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Bank Inventory &amp; Transaction API
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Thread-safe banking ledger handling accounts, deposits, and transfers with optimistic concurrency control and clean repository patterns.
                </p>
                <div className="text-xs text-slate-500 space-y-1">
                  <div><strong>Stack:</strong> C# 14, .NET 10 Minimal APIs, In-Memory Thread-Safe Ledger</div>
                  <div><strong>Testing:</strong> xUnit unit test suite for balance race conditions</div>
                  <div><strong>Folder:</strong> <code>samples/Capstones/Capstone1_BankInventory</code></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  dotnet test samples/Capstones/Capstone1_BankInventory
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="reviewed">Capstone 2</Badge>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Student Information Portal REST API
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enterprise-grade student management web API with SQLite Entity Framework Core, DTO mappings, FluentValidation, and RFC ProblemDetails.
                </p>
                <div className="text-xs text-slate-500 space-y-1">
                  <div><strong>Stack:</strong> ASP.NET Core 10, EF Core 10 SQLite, Clean Architecture</div>
                  <div><strong>Testing:</strong> Integration tests with WebApplicationFactory</div>
                  <div><strong>Folder:</strong> <code>samples/Capstones/Capstone2_StudentApi</code></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  dotnet run --project samples/Capstones/Capstone2_StudentApi
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 6: CODING PRACTICE (50+ Challenges) */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category Filter
              </div>
              <div className="flex flex-wrap gap-1">
                {codingCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCodingCategory(c)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      codingCategory === c
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredProblems.map((p) => {
                const isSelected = selectedProblem.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProblem(p);
                      setShowProblemSolution(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="truncate">
                      <div>{p.title}</div>
                      <div className="text-[10px] text-slate-400">{p.category}</div>
                    </div>
                    <Badge variant={p.difficulty === 'Easy' ? 'default' : p.difficulty === 'Medium' ? 'warning' : 'purple'}>
                      {p.difficulty}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <Card className="p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <Badge variant="purple">{selectedProblem.category}</Badge>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {selectedProblem.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedProblem.difficulty === 'Easy' ? 'default' : selectedProblem.difficulty === 'Medium' ? 'warning' : 'purple'}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <a
                    href="https://dotnetfiddle.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run in Sandbox</span>
                  </a>
                </div>
              </div>

              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <RichTextRenderer content={selectedProblem.description} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starter Template</span>
                <CodeBlock code={selectedProblem.starterCode} language="csharp" filename="Solution.cs" />
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProblemSolution(!showProblemSolution)}
                >
                  {showProblemSolution ? 'Hide Solution' : 'Reveal Solution & Explanation'}
                </Button>

                {showProblemSolution && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    <CodeBlock code={selectedProblem.solutionCode} language="csharp" filename="Solution.cs" />
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                      <strong>Approach &amp; Complexity: </strong>
                      <RichTextRenderer content={selectedProblem.explanation} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 7: CAREER & REVISION PLAYBOOKS */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Career Playbooks
            </span>
            {careerArticles.map((art) => {
              const isSelected = selectedArticle.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{art.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {art.category}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-3">
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <Badge variant="purple">{selectedArticle.category}</Badge>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedArticle.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedArticle.summary}
                </p>
              </div>

              <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <RichTextRenderer content={selectedArticle.content} />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
