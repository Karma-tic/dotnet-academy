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
  Filter
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CodeBlock } from './ui/CodeBlock';
import { interviewQuestions } from '../content/career/interviewQuestions';
import { codingProblems, CodingProblem } from '../content/career/codingProblems';
import { mockTests, MockTest } from '../content/career/mockTests';
import { careerArticles, CareerArticle } from '../content/career/careerGuides';

export interface CareerHubProps {
  onSaveMockScore: (testId: string, score: number, total: number) => void;
  mockScores: Record<string, { score: number; total: number; timestamp: string }>;
}

export const CareerHub: React.FC<CareerHubProps> = ({
  onSaveMockScore,
  mockScores,
}) => {
  const [activeTab, setActiveTab] = useState<'qa' | 'coding' | 'mock' | 'guides'>('qa');

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
  const codingCategories = ['All', ...Array.from(new Set(codingProblems.map((p) => p.category)))];

  const toggleQaExpand = (id: string) => {
    setExpandedQa((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job-Ready .NET Career Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Enterprise Interview & Career Accelerator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          200+ curated interview Q&A with clear model answers, 50+ coding problems, 6 timed mock exams, and real-world career strategy guides.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'qa', label: 'Interview Q&A (200+)', icon: HelpCircle },
            { id: 'coding', label: 'Coding Practice (50+)', icon: Code2 },
            { id: 'mock', label: 'Timed Mock Tests (6)', icon: Clock },
            { id: 'guides', label: 'Career & Revision Guides', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <select
                value={qaCategory}
                onChange={(e) => setQaCategory(e.target.value)}
                className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={qaLevel}
                onChange={(e) => setQaLevel(e.target.value)}
                className="text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <p className="text-center py-12 text-sm text-slate-500">
                No interview questions match your filter criteria.
              </p>
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
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {q.modelAnswer}
                          </p>
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

      {/* TAB 2: CODING PRACTICE */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem List (Left col) */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Problems ({codingProblems.length})
              </span>
              <select
                value={codingCategory}
                onChange={(e) => setCodingCategory(e.target.value)}
                className="text-xs p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                {codingCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {codingProblems
                .filter((p) => codingCategory === 'All' || p.category === codingCategory)
                .map((prob) => {
                  const isSelected = selectedProblem.id === prob.id;
                  return (
                    <button
                      key={prob.id}
                      onClick={() => {
                        setSelectedProblem(prob);
                        setShowProblemSolution(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{prob.title}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {prob.category}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Problem Detail & Editor (Right col) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="purple">{selectedProblem.category}</Badge>
                    <Badge variant="default">{selectedProblem.difficulty}</Badge>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedProblem.title}
                  </h2>
                </div>
              </div>

              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProblem.description}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Starter Template (C# 14 / .NET 10)
                </span>
                <CodeBlock
                  code={selectedProblem.starterCode}
                  language="csharp"
                  filename="Solution.cs"
                />
              </div>

              {/* Test Cases */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Example Test Cases
                </span>
                <div className="space-y-2">
                  {selectedProblem.testCases.map((tc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <span>Input: <strong className="text-indigo-600 dark:text-indigo-400">{tc.input}</strong></span>
                      <span>Expected: <strong className="text-emerald-600 dark:text-emerald-400">{tc.expected}</strong></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reveal Solution */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowProblemSolution(!showProblemSolution)}
                >
                  {showProblemSolution ? 'Hide Model Solution' : 'Reveal Model Solution'}
                </Button>

                {showProblemSolution && (
                  <div className="space-y-3">
                    <CodeBlock
                      code={selectedProblem.solutionCode}
                      language="csharp"
                      filename="ModelSolution.cs"
                    />
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-xs text-emerald-900 dark:text-emerald-300">
                      <strong>Engineering Walkthrough: </strong>
                      {selectedProblem.explanation}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: TIMED MOCK TESTS */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          {!activeMockTest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTests.map((test) => {
                const pastScore = mockScores[test.id];
                return (
                  <Card key={test.id} className="p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                          {test.durationMinutes} Min Timed
                        </span>
                        {pastScore && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              pastScore.score >= test.passingScore
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            Best: {pastScore.score}%
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {test.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {test.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {test.questions.length} MCQs &bull; Pass {test.passingScore}%
                      </span>
                      <Button variant="primary" size="sm" onClick={() => handleStartMock(test)}>
                        Start Test
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Active Mock Test Screen */
            <div className="space-y-6">
              {/* Sticky Top Bar for Timer & Status */}
              <div className="sticky top-16 z-30 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-md flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {activeMockTest.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {Object.keys(mockAnswers).length} of {activeMockTest.questions.length} questions answered
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-sm">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>{formatTimer(timeRemaining)}</span>
                  </div>

                  {!mockSubmitted ? (
                    <Button variant="primary" size="sm" onClick={handleSubmitMock}>
                      Submit Exam
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setActiveMockTest(null)}>
                      Close Exam
                    </Button>
                  )}
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {activeMockTest.questions.map((q, idx) => {
                  const selected = mockAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <Card key={q.id} className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          Question {idx + 1} of {activeMockTest.questions.length}: {q.question}
                        </span>
                        {mockSubmitted && (
                          isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )
                        )}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          let optClass = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50";
                          if (selected === oIdx) {
                            optClass = "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 font-medium";
                          }
                          if (mockSubmitted) {
                            if (oIdx === q.correctIndex) {
                              optClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium";
                            } else if (selected === oIdx && !isCorrect) {
                              optClass = "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={mockSubmitted}
                              onClick={() => handleSelectMockOption(q.id, oIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-colors flex items-center justify-between ${optClass}`}
                            >
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

      {/* TAB 4: CAREER & REVISION GUIDES */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Guide Selector (Left col) */}
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

          {/* Guide Content Reader (Right col) */}
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

              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                {selectedArticle.content}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
