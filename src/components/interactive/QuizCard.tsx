import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, Lightbulb, RefreshCw, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';
import { MathText } from '../common/MathFormula';

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
    const isMastery = score === questions.length;
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm space-y-5 animate-fade-in">
        <div
          className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
            isMastery
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
          }`}
        >
          <Trophy className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">
            {isMastery ? 'Mastery Badge Earned! 🏆' : 'Assessment Completed!'}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You achieved <strong className="text-brand-600 dark:text-brand-400 font-mono text-base">{score}</strong> /{' '}
            <strong className="font-mono text-base">{questions.length}</strong> correct.
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Knowledge Check</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      {/* Quiz Progress & Score Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400 block">
            {title}
          </span>
          <div className="text-xs font-semibold text-slate-500">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          Score: {score}
        </div>
      </div>

      {/* Question Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-600 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
        <MathText text={q.question} />
      </h4>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isChosen = selectedOption === idx;
          const isTarget = q.correctAnswer === idx;

          let btnClass = 'border-slate-200 dark:border-slate-800 hover:border-brand-500 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200';

          if (isAnswered) {
            if (isTarget) {
              btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-400/30';
            } else if (isChosen && !isTarget) {
              btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
            } else {
              btnClass = 'opacity-40 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-center justify-between ${btnClass} ${
                !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer' : ''
              }`}
            >
              <span className="leading-relaxed"><MathText text={opt} /></span>
              {isAnswered && isTarget && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
              )}
              {isAnswered && isChosen && !isTarget && (
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {q.hint && !isAnswered && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Stuck? Reveal a Hint'}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs border border-amber-200 dark:border-amber-800">
              💡 <MathText text={q.hint} />
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
            isCorrect
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
          }`}
        >
          <div className="font-black flex items-center gap-1.5">
            {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            <span>{isCorrect ? 'Correct Scientific Reasoning' : 'Concept Clarification'}</span>
          </div>
          <div><MathText text={q.explanation} /></div>
        </div>
      )}

      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
