import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, HelpCircle, CheckCircle2, XCircle, Sparkles, Sliders } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';
import { MathText } from '../common/MathFormula';

export interface PredictionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PredictionChallenge {
  question: string;
  options: PredictionOption[];
}

interface ScenarioFrameProps {
  title: string;
  badge: string;
  badgeColor?: string;
  story: string;
  isRunning: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  prediction?: PredictionChallenge;
  userPrediction: string | null;
  onSelectPrediction: (id: string) => void;
  currentStepDescription: string;
  scientificExplanation: string;
  formalConcept: string;
  followUpChallenge?: string;
  children: React.ReactNode;
  telemetry?: React.ReactNode;
}

export const ScenarioFrame: React.FC<ScenarioFrameProps> = ({
  title,
  badge,
  badgeColor = 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border-brand-200 dark:border-brand-800',
  story,
  isRunning,
  onTogglePlay,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  prediction,
  userPrediction,
  onSelectPrediction,
  currentStepDescription,
  scientificExplanation,
  formalConcept,
  followUpChallenge,
  children,
  telemetry,
}) => {
  const selectedOpt = prediction?.options.find((o) => o.id === userPrediction);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-2 ${badgeColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            <MathText text={story} />
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-brand-600 hover:bg-brand-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Scene</span>
              </>
            )}
          </button>

          <button
            onClick={onStep}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            title="Advance one discrete time step"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Step</span>
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all"
            title="Reset scenario to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed selector */}
          <div className="flex items-center pl-2 pr-1 gap-1 text-[11px] font-mono font-bold text-slate-500 border-l border-slate-300 dark:border-slate-700">
            <span className="hidden md:inline text-[10px] uppercase">Speed:</span>
            {[1, 2].map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  speed === s
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Animated Viewport Slot */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white overflow-hidden shadow-xl relative min-h-[340px]">
        {children}
      </div>

      {/* Telemetry & Current Step Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div className="md:col-span-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse shrink-0"></div>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white block sm:inline mr-1">Current Action:</strong>
            <span><MathText text={currentStepDescription} /></span>
          </div>
        </div>

        {telemetry && (
          <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-around text-xs font-mono">
            {telemetry}
          </div>
        )}
      </div>

      {/* Prediction Challenge Slot */}
      {prediction && (
        <div className="p-5 sm:p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-4">
          <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Learner Prediction Challenge</span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            <MathText text={prediction.question} />
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prediction.options.map((opt) => {
              const isSelected = userPrediction === opt.id;
              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-800 dark:text-slate-200';
              if (userPrediction) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-400/40';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200';
                } else {
                  style = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={userPrediction !== null}
                  onClick={() => {
                    onSelectPrediction(opt.id);
                    if (opt.isCorrect) triggerCelebration();
                  }}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
                >
                  <span><MathText text={opt.label} /></span>
                  {userPrediction && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {userPrediction && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed animate-fade-in ${
                selectedOpt.isCorrect
                  ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-100/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
              }`}
            >
              <strong>{selectedOpt.isCorrect ? '✓ Spot On!' : '✕ Scientific Clarification:'}</strong>{' '}
              <MathText text={selectedOpt.explanation} />
            </div>
          )}
        </div>
      )}

      {/* Scientific Explanation & Curriculum Connection Accordion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
            The Science Behind The Movement
          </span>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <MathText text={scientificExplanation} />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Course Curriculum Connection
          </span>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <MathText text={formalConcept} />
          </p>
          {followUpChallenge && (
            <div className="text-[11px] font-semibold text-brand-700 dark:text-brand-300 pt-1 border-t border-slate-200 dark:border-slate-700">
              💡 <strong>Follow-up Experiment:</strong> <MathText text={followUpChallenge} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
