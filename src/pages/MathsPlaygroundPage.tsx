import React, { useState } from 'react';
import { StepByStepSolver } from '../components/interactive/StepByStepSolver';
import { EntropyExplorer } from '../components/interactive/EntropyExplorer';
import { InformationGainCalculator } from '../components/interactive/InformationGainCalculator';
import { RegressionPlayground } from '../components/interactive/RegressionPlayground';
import { MathFormula } from '../components/common/MathFormula';
import { Calculator, Eye, Lightbulb, CheckSquare, Sparkles, Binary, TrendingUp, HelpCircle } from 'lucide-react';

export const MathsPlaygroundPage: React.FC = () => {
  const [activeMathTopic, setActiveMathTopic] = useState<'entropy' | 'regression'>('entropy');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>4-Layer Pedagogical System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Maths Playground
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Master the mathematical equations of Machine Learning with zero unexplained leaps. Move through Intuition, Visualization, Guided Calculation, and Independent Practice.
        </p>
      </div>

      {/* 4 Learning Layers Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-900 dark:text-blue-300">Layer 1: Intuition</div>
            <div className="text-[11px] text-blue-700/80 dark:text-blue-400 leading-tight mt-0.5">
              Plain-language analogy without confusing symbols
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Layer 2: Visual Proof</div>
            <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400 leading-tight mt-0.5">
              Interactive plots connecting variables in real time
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-900 dark:text-purple-300">Layer 3: Guided Steps</div>
            <div className="text-[11px] text-purple-700/80 dark:text-purple-400 leading-tight mt-0.5">
              Step-by-step arithmetic substitutions & intermediate values
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 shrink-0">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900 dark:text-amber-300">Layer 4: Try Solo</div>
            <div className="text-[11px] text-amber-700/80 dark:text-amber-400 leading-tight mt-0.5">
              Interactive solver with feedback, hints, and score validation
            </div>
          </div>
        </div>
      </div>

      {/* Maths Topic Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMathTopic('entropy')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeMathTopic === 'entropy'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Entropy & Information Gain</span>
          </button>
          <button
            onClick={() => setActiveMathTopic('regression')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeMathTopic === 'regression'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Linear Regression & Cost Function (MSE)</span>
          </button>
        </div>
      </div>

      {/* TOPIC 1: ENTROPY & INFORMATION GAIN */}
      {activeMathTopic === 'entropy' && (
        <div className="space-y-10">
          {/* Layer 1: Intuition */}
          <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Layer 1: The Intuition of Disorder</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Movie Night Dilemma: Lucy vs Titanic
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Suppose you and your friends are picking between two movies: "Lucy" and "Titanic".
              If Lucy gets 4 votes and Titanic gets 5 votes, you have near-total deadlock (maximum disorder). But if Lucy gets 9 votes and Titanic gets 0 votes, deciding is trivial!
              Shannon Entropy gives this intuition an exact numeric measurement in <strong>bits</strong>.
            </p>
          </section>

          {/* Layer 2: Visual Representation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Layer 2: Visual Interactive Plot</span>
            </div>
            <EntropyExplorer />
          </section>

          {/* Layer 3: Guided Step-by-Step Calculation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Layer 3: Information Gain Across Candidate Splits</span>
            </div>
            <InformationGainCalculator />
          </section>

          {/* Layer 4: Independent Numerical Practice */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <CheckSquare className="w-4 h-4" />
              <span>Layer 4: Try Independently (Numerical Practice)</span>
            </div>
            <StepByStepSolver />
          </section>
        </div>
      )}

      {/* TOPIC 2: LINEAR REGRESSION & MSE */}
      {activeMathTopic === 'regression' && (
        <div className="space-y-10">
          {/* Layer 1: Intuition */}
          <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Layer 1: The Intuition of Best Fit</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Balancing Residual Distances
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Imagine connecting each data point to a rigid rod with rubber bands. The rubber bands pull the rod from both above and below until it balances at the exact position with minimal total stretch tension. In Machine Learning, that stretch tension is the <strong>Mean Squared Error (MSE)</strong>!
            </p>
          </section>

          {/* Layer 2: Visual Representation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Layer 2: Visual Cost Surface & Line Adjuster</span>
            </div>
            <RegressionPlayground />
          </section>

          {/* Layer 3 & 4: Guided Practice */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <CheckSquare className="w-4 h-4" />
              <span>Layers 3 & 4: Guided Step-by-Step Solver</span>
            </div>
            <StepByStepSolver />
          </section>
        </div>
      )}
    </div>
  );
};
