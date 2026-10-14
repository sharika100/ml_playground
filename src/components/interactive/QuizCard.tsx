import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';

interface QuizCardProps {
  questions: QuizQuestion[];
  title?: string;
  onComplete?: (score: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  title = 'Knowledge Check & Misconception Buster',
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentIdx];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === q.correctAnswer;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    if (idx === q.correctAnswer) {
      setScore((s) => s + 1);
      triggerCelebration();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete(score + (isCorrect ? 1 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowHint(false);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quiz Completed!</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          You scored <strong className="text-slate-900 dark:text-white font-mono">{score}</strong> out of{' '}
          <strong className="text-slate-900 dark:text-white font-mono">{questions.length}</strong>.
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400">
            {title}
          </span>
          <div className="text-xs font-semibold text-slate-500">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
        <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Score: {score}
        </div>
      </div>

      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 leading-snug">
        {q.question}
      </h4>

      <div className="space-y-2.5 mb-5">
        {q.options.map((opt, idx) => {
          const isChosen = selectedOption === idx;
          const isTarget = q.correctAnswer === idx;

          let btnClass = 'border-slate-200 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200';

          if (isAnswered) {
            if (isTarget) {
              btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
            } else if (isChosen && !isTarget) {
              btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
            } else {
              btnClass = 'opacity-50 border-slate-200 dark:border-slate-700';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${btnClass}`}
            >
              <span>{opt}</span>
              {isAnswered && isTarget && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
              {isAnswered && isChosen && !isTarget && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {q.hint && !isAnswered && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'Stuck? Reveal a Hint'}
          </button>
          {showHint && (
            <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs">
              {q.hint}
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div className={`p-4 rounded-xl mb-4 border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'}`}>
          <div className="font-bold mb-1">
            {isCorrect ? '✓ Correct Reasoning' : '✕ Scientific Clarification'}
          </div>
          <div>{q.explanation}</div>
        </div>
      )}

      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            {currentIdx + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};
