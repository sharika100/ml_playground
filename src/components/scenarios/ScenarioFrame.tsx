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
  badgeColor = 'bg-playful-cobalt/10 text-playful-cobalt border-playful-cobalt/25',
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
    <div className="playful-card p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-playful-softBorder gap-3">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-bold mb-2 ${badgeColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-playful-ink">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-playful-muted mt-1 max-w-2xl leading-relaxed">
            <MathText text={story} />
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-playful-cream/60 p-1.5 rounded-2xl border border-playful-softBorder shadow-sm">
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-playful-sm ${
              isRunning
                ? 'bg-playful-sunny text-amber-950 hover:bg-amber-400'
                : 'playful-btn-primary'
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
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-white text-playful-ink border border-playful-softBorder disabled:opacity-40 hover:bg-playful-cream/60 transition-all shadow-sm"
            title="Advance one discrete time step"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Step</span>
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl text-playful-muted hover:text-playful-ink bg-white border border-playful-softBorder transition-all shadow-sm"
            title="Reset scenario to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed selector */}
          <div className="flex items-center pl-2 pr-1 gap-1 text-[11px] font-mono font-bold text-playful-muted border-l border-playful-softBorder">
            <span className="hidden md:inline text-[10px] uppercase">Speed:</span>
            {[1, 2].map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  speed === s
                    ? 'bg-playful-cobalt text-white shadow-sm'
                    : 'text-playful-muted hover:text-playful-ink'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Animated Viewport Slot */}
      <div className="rounded-3xl border border-playful-softBorder bg-[#141A28] text-white overflow-hidden shadow-playful-md relative min-h-[340px]">
        {children}
      </div>

      {/* Telemetry & Current Step Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div className="md:col-span-8 p-4 rounded-2xl bg-playful-cream/40 border border-playful-softBorder flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-playful-cobalt animate-pulse shrink-0"></div>
          <div className="text-xs text-playful-ink">
            <strong className="text-playful-ink block sm:inline mr-1">Current Action:</strong>
            <span><MathText text={currentStepDescription} /></span>
          </div>
        </div>

        {telemetry && (
          <div className="md:col-span-4 p-4 rounded-2xl bg-playful-cream/40 border border-playful-softBorder flex items-center justify-around text-xs font-mono text-playful-ink">
            {telemetry}
          </div>
        )}
      </div>

      {/* Prediction Challenge Slot */}
      {prediction && (
        <div className="p-5 sm:p-6 rounded-3xl bg-playful-cobalt/5 border border-playful-cobalt/20 space-y-4">
          <div className="flex items-center gap-2 text-playful-cobalt text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-playful-cobalt" />
            <span>Learner Prediction Challenge</span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-playful-ink">
            <MathText text={prediction.question} />
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prediction.options.map((opt) => {
              const isSelected = userPrediction === opt.id;
              let style = 'bg-white border-playful-softBorder hover:border-playful-cobalt/40 text-playful-ink shadow-sm';
              if (userPrediction) {
                if (opt.isCorrect) {
                  style = 'bg-playful-mint/20 border-playful-mint/80 text-emerald-950 font-bold ring-2 ring-playful-mint/50';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-playful-coral/20 border-playful-coral/40 text-rose-950';
                } else {
                  style = 'opacity-40 border-playful-softBorder bg-white';
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
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                  )}
                  {userPrediction && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-700 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed animate-fade-in ${
                selectedOpt.isCorrect
                  ? 'bg-playful-mint/30 text-emerald-950 border border-playful-mint/70'
                  : 'bg-playful-coral/20 text-rose-950 border border-playful-coral/50'
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
        <div className="p-5 rounded-2xl bg-playful-cream/30 border border-playful-softBorder space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-playful-cobalt block">
            The Science Behind The Movement
          </span>
          <p className="text-xs text-playful-muted leading-relaxed">
            <MathText text={scientificExplanation} />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-playful-cream/30 border border-playful-softBorder space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-playful-cobalt block">
            Course Curriculum Connection
          </span>
          <p className="text-xs text-playful-muted leading-relaxed">
            <MathText text={formalConcept} />
          </p>
          {followUpChallenge && (
            <div className="text-[11px] font-semibold text-playful-cobalt pt-1 border-t border-playful-softBorder">
              💡 <strong>Follow-up Experiment:</strong> <MathText text={followUpChallenge} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
