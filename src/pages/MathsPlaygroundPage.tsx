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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0FD] text-[#315CEB] text-xs font-black mb-3 border border-[#315CEB]/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>4-Layer Pedagogical System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#26324B] tracking-tight mb-2">
          Maths Playground
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed">
          Master the mathematical equations of Machine Learning with zero unexplained leaps. Move through Intuition, Visualization, Guided Calculation, and Independent Practice.
        </p>
      </div>

      {/* 4 Learning Layers Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#EBF0FD] border border-[#315CEB]/20 flex items-start gap-3 shadow-playful-sm">
          <div className="p-2 rounded-xl bg-[#315CEB] text-white shrink-0 shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#315CEB]">Layer 1: Intuition</div>
            <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
              Plain-language analogy without confusing symbols
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F0FAF6] border border-[#A8E6CF] flex items-start gap-3 shadow-playful-sm">
          <div className="p-2 rounded-xl bg-[#247D5C] text-white shrink-0 shadow-sm">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#247D5C]">Layer 2: Visual Proof</div>
            <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
              Interactive plots connecting variables in real time
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFF0ED] border border-[#FF8066]/30 flex items-start gap-3 shadow-playful-sm">
          <div className="p-2 rounded-xl bg-[#FF8066] text-white shrink-0 shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#C4462D]">Layer 3: Guided Steps</div>
            <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
              Step-by-step arithmetic substitutions & intermediate values
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FEF9EB] border border-[#F5C94B]/50 flex items-start gap-3 shadow-playful-sm">
          <div className="p-2 rounded-xl bg-[#F5C94B] text-[#26324B] shrink-0 shadow-sm">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#8C6B0F]">Layer 4: Try Solo</div>
            <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
              Interactive solver with feedback, hints, and score validation
            </div>
          </div>
        </div>
      </div>

      {/* Maths Topic Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-white border border-[#E8E5DE] shadow-sm">
          <button
            onClick={() => setActiveMathTopic('entropy')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMathTopic === 'entropy'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Entropy & Information Gain</span>
          </button>
          <button
            onClick={() => setActiveMathTopic('regression')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMathTopic === 'regression'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
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
          <section className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <div className="flex items-center gap-2 text-[#315CEB] text-xs font-black uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Layer 1: The Intuition of Disorder</span>
            </div>
            <h3 className="text-xl font-bold text-[#26324B]">
              Movie Night Dilemma: Lucy vs Titanic
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Suppose you and your friends are picking between two movies: "Lucy" and "Titanic".
              If Lucy gets 4 votes and Titanic gets 5 votes, you have near-total deadlock (maximum disorder). But if Lucy gets 9 votes and Titanic gets 0 votes, deciding is trivial!
              Shannon Entropy gives this intuition an exact numeric measurement in <strong>bits</strong>.
            </p>
          </section>

          {/* Layer 2: Visual Representation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#247D5C] text-xs font-black uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Layer 2: Visual Interactive Plot</span>
            </div>
            <EntropyExplorer />
          </section>

          {/* Layer 3: Guided Step-by-Step Calculation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#C4462D] text-xs font-black uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Layer 3: Information Gain Across Candidate Splits</span>
            </div>
            <InformationGainCalculator />
          </section>

          {/* Layer 4: Independent Numerical Practice */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#8C6B0F] text-xs font-black uppercase tracking-wider">
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
          <section className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <div className="flex items-center gap-2 text-[#315CEB] text-xs font-black uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Layer 1: The Intuition of Best Fit</span>
            </div>
            <h3 className="text-xl font-bold text-[#26324B]">
              Balancing Residual Distances
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Imagine connecting each data point to a rigid rod with rubber bands. The rubber bands pull the rod from both above and below until it balances at the exact position with minimal total stretch tension. In Machine Learning, that stretch tension is the <strong>Mean Squared Error (MSE)</strong>!
            </p>
          </section>

          {/* Layer 2: Visual Representation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#247D5C] text-xs font-black uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Layer 2: Visual Cost Surface & Line Adjuster</span>
            </div>
            <RegressionPlayground />
          </section>

          {/* Layer 3 & 4: Guided Practice */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#8C6B0F] text-xs font-black uppercase tracking-wider">
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
