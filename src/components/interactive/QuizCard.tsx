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
      <div className="p-8 rounded-3xl bg-white border border-[#E8E5DE] text-center shadow-playful space-y-5 animate-fade-in">
        <div
          className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-playful-sm ${
            isMastery
              ? 'bg-[#F0FAF6] text-[#247D5C]'
              : 'bg-[#FEF9EB] text-[#8C6B0F]'
          }`}
        >
          <Trophy className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-2xl font-black text-[#26324B]">
            {isMastery ? 'Mastery Badge Earned! 🏆' : 'Assessment Completed!'}
          </h4>
          <p className="text-sm text-[#667085]">
            You achieved <strong className="text-[#315CEB] font-mono text-base">{score}</strong> /{' '}
            <strong className="font-mono text-base text-[#26324B]">{questions.length}</strong> correct.
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315CEB] hover:bg-[#2548BA] text-white font-bold text-xs shadow-playful-sm transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Knowledge Check</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-5">
      {/* Quiz Progress & Score Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DE]">
        <div>
          <span className="text-[10px] uppercase font-black tracking-wider text-[#315CEB] block">
            {title}
          </span>
          <div className="text-xs font-semibold text-[#667085]">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-[#FFF9F0] text-[#26324B] border border-[#E8E5DE] shadow-sm">
          Score: {score}
        </div>
      </div>

      {/* Question Progress Bar */}
      <div className="w-full bg-[#E8E5DE] h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#315CEB] transition-all duration-300 rounded-full"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h4 className="text-base sm:text-lg font-black text-[#26324B] leading-snug">
        <MathText text={q.question} />
      </h4>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isChosen = selectedOption === idx;
          const isTarget = q.correctAnswer === idx;

          let btnClass = 'border-[#E8E5DE] hover:border-[#315CEB] bg-white text-[#26324B] shadow-sm';

          if (isAnswered) {
            if (isTarget) {
              btnClass = 'border-[#A8E6CF] bg-[#F0FAF6] text-[#1F6B4F] font-bold ring-2 ring-[#A8E6CF]/50 shadow-playful-sm';
            } else if (isChosen && !isTarget) {
              btnClass = 'border-[#FF8066] bg-[#FFF0ED] text-[#C4462D]';
            } else {
              btnClass = 'opacity-40 border-[#E8E5DE]';
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
                <CheckCircle2 className="w-4 h-4 text-[#247D5C] shrink-0 ml-2" />
              )}
              {isAnswered && isChosen && !isTarget && (
                <XCircle className="w-4 h-4 text-[#C4462D] shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {q.hint && !isAnswered && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-[#8C6B0F] font-bold flex items-center gap-1 hover:underline"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Stuck? Reveal a Hint'}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 rounded-2xl bg-[#FEF9EB] text-[#8C6B0F] text-xs border border-[#F5C94B]/50 shadow-sm">
              💡 <MathText text={q.hint} />
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 shadow-sm ${
            isCorrect
              ? 'bg-[#F0FAF6] border-[#A8E6CF] text-[#1F6B4F]'
              : 'bg-[#FFF0ED] border-[#FF8066] text-[#C4462D]'
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
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#315CEB] hover:bg-[#2548BA] text-white font-bold text-xs transition-all shadow-playful-sm hover:scale-105 active:scale-95"
          >
            <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
