import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from './Button';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizProps {
  lessonSlug: string;
  questions: QuizQuestion[];
  onComplete?: (scorePercentage: number) => void;
  className?: string;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  onComplete,
  className = '',
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (onComplete) {
      onComplete(score);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);
  const score = isSubmitted ? calculateScore() : 0;
  const passed = score >= 70;

  return (
    <div className={`my-8 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/40 ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            Knowledge Check ({questions.length} Questions)
          </h3>
        </div>
        {isSubmitted && (
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full border ${
              passed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400'
            }`}
          >
            Score: {score}% {passed ? '🎉 Passed (>=70%)' : 'Needs Review'}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={qIdx} className="space-y-3">
              <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  let optStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60";
                  if (selected === oIdx) {
                    optStyle = "border-violet-500 bg-violet-50/70 dark:bg-violet-950/30 text-violet-900 dark:text-violet-200";
                  }
                  if (isSubmitted) {
                    if (oIdx === q.correctIndex) {
                      optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium";
                    } else if (selected === oIdx && !isCorrect) {
                      optStyle = "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-colors flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && oIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selected === oIdx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="text-xs p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        {!isSubmitted ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit Answers
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Retry Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

