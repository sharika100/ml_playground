import React, { useState } from 'react';
import { triggerCelebration } from '../common/Celebration';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, RefreshCw, Eye, Sparkles, Calculator } from 'lucide-react';
import { InlineMath, MathText } from '../common/MathFormula';

interface ProblemDef {
  id: string;
  title: string;
  badge: string;
  scenario: string;
  steps: {
    instruction: string;
    formula: string;
    expectedAnswer: number;
    tolerance: number;
    unit: string;
    hint: string;
    explanation: string;
  }[];
}

const PROBLEMS: ProblemDef[] = [
  {
    id: 'prob-tennis-entropy',
    title: 'Shannon Entropy of Play Tennis Dataset',
    badge: 'Decision Trees & Entropy',
    scenario: 'You have 14 total weather days: 9 days where tennis was played ("Yes") and 5 days where it was not ("No"). Compute the parent Shannon Entropy H(S).',
    steps: [
      {
        instruction: 'Step 1: Compute probability of positive class P(+) = 9/14 (round to 3 decimals)',
        formula: 'P(+) = \\frac{9}{14} \\approx 0.643',
        expectedAnswer: 0.643,
        tolerance: 0.005,
        unit: '',
        hint: 'Divide 9 by 14: 9 ÷ 14 ≈ 0.6428',
        explanation: '9 out of 14 days are Yes, so P(+) = 9/14 ≈ 0.643.',
      },
      {
        instruction: 'Step 2: Compute probability of negative class P(−) = 5/14 (round to 3 decimals)',
        formula: 'P(-) = \\frac{5}{14} \\approx 0.357',
        expectedAnswer: 0.357,
        tolerance: 0.005,
        unit: '',
        hint: 'Divide 5 by 14: 5 ÷ 14 ≈ 0.3571',
        explanation: '5 out of 14 days are No, so P(−) = 5/14 ≈ 0.357.',
      },
      {
        instruction: 'Step 3: Calculate final parent Entropy H(S) in bits',
        formula: 'H(S) = - P(+) \\log_2 P(+) - P(-) \\log_2 P(-)',
        expectedAnswer: 0.94,
        tolerance: 0.015,
        unit: 'bits',
        hint: 'log₂(0.6428) ≈ −0.637, log₂(0.3571) ≈ −1.485. The expected result is ~0.940.',
        explanation: '−(0.643 * −0.637) − (0.357 * −1.485) = 0.4098 + 0.5303 ≈ 0.940 bits.',
      },
    ],
  },
  {
    id: 'prob-wind-gain',
    title: 'Information Gain of "Wind" Attribute',
    badge: 'Attribute Selection Measure',
    scenario: 'In the Play Tennis dataset (H(S) = 0.940 bits), the attribute "Wind" splits into Weak (6+, 2−) and Strong (3+, 3−). Find Gain(S, Wind).',
    steps: [
      {
        instruction: 'Step 1: Compute entropy of the Strong Wind subset H(S_strong). It has 3 positive and 3 negative days (50/50 balanced).',
        formula: 'H(S_{\\text{strong}}) = - \\frac{3}{6} \\log_2\\left(\\frac{3}{6}\\right) - \\frac{3}{6} \\log_2\\left(\\frac{3}{6}\\right) = 1.000 \\text{ bits}',
        expectedAnswer: 1.0,
        tolerance: 0.01,
        unit: 'bits',
        hint: 'When classes are equally split (p = 0.5), entropy is always 1.0 bit.',
        explanation: 'A 50/50 split represents maximum disorder: H(S_strong) = 1.000 bit.',
      },
      {
        instruction: 'Step 2: Compute the weighted expected entropy of both children: (8/14)*H(Weak) + (6/14)*H(Strong). Given H(Weak) = 0.811 bits.',
        formula: 'E_{\\text{weighted}} = \\frac{8}{14}(0.811) + \\frac{6}{14}(1.000) = 0.892 \\text{ bits}',
        expectedAnswer: 0.892,
        tolerance: 0.01,
        unit: 'bits',
        hint: '(8/14)*0.811 = 0.4634; (6/14)*1.0 = 0.4286. Add them together.',
        explanation: '0.4634 + 0.4286 = 0.892 bits.',
      },
      {
        instruction: 'Step 3: Calculate Information Gain: Gain(S, Wind) = H(S) − E_weighted.',
        formula: '\\text{Gain}(S, \\text{Wind}) = 0.940 - 0.892 = 0.048 \\text{ bits}',
        expectedAnswer: 0.048,
        tolerance: 0.005,
        unit: 'bits',
        hint: 'Subtract 0.892 from 0.940.',
        explanation: 'Gain = 0.940 − 0.892 = 0.048 bits. (Matches Slide 29 of Module 5 PPT!).',
      },
    ],
  },
  {
    id: 'prob-linear-pred',
    title: 'Linear Model Prediction & Residual Error',
    badge: 'Linear Regression & MSE',
    scenario: 'A company models salary Y (in thousands of dollars) as a function of years of experience X using the fitted linear regression line: Y = 4.5 * X + 32.0.',
    steps: [
      {
        instruction: 'Step 1: Predict the expected salary ŷ for an engineer with X = 4 years of experience.',
        formula: '\\hat{y} = 4.5(4) + 32.0 = 50.0',
        expectedAnswer: 50.0,
        tolerance: 0.1,
        unit: 'k$',
        hint: 'Multiply 4.5 by 4 (= 18.0) and add the intercept 32.0.',
        explanation: '4.5 * 4 = 18.0; 18.0 + 32.0 = 50.0 thousand dollars.',
      },
      {
        instruction: 'Step 2: If the actual observed salary for this engineer is y = 53.0k$, compute the residual error e = y − ŷ.',
        formula: 'e = y - \\hat{y} = 53.0 - 50.0 = +3.0',
        expectedAnswer: 3.0,
        tolerance: 0.1,
        unit: 'k$',
        hint: 'Subtract predicted salary (50.0) from actual salary (53.0).',
        explanation: '53.0 − 50.0 = +3.0k$. The positive residual means the actual salary was 3k$ above the regression line.',
      },
    ],
  },
];

export const StepByStepSolver: React.FC = () => {
  const [selectedProbIndex, setSelectedProbIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>(['', '', '']);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFullSolution, setShowFullSolution] = useState(false);

  const problem = PROBLEMS[selectedProbIndex];
  const step = problem.steps[currentStepIndex];

  const handleVerify = () => {
    const val = parseFloat(userInputs[currentStepIndex]);
    if (isNaN(val)) {
      setFeedback({ isCorrect: false, message: 'Please enter a valid numeric value.' });
      return;
    }

    const diff = Math.abs(val - step.expectedAnswer);
    if (diff <= step.tolerance) {
      setFeedback({
        isCorrect: true,
        message: `Spot on! Expected ${step.expectedAnswer} ${step.unit}. ${step.explanation}`,
      });
      triggerCelebration();
    } else {
      setFeedback({
        isCorrect: false,
        message: `Not quite. You entered ${val}, but the expected result is ${step.expectedAnswer} (±${step.tolerance}). Review the formula or check the hint.`,
      });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < problem.steps.length) {
      setCurrentStepIndex((s) => s + 1);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handleSwitchProblem = (idx: number) => {
    setSelectedProbIndex(idx);
    setCurrentStepIndex(0);
    setUserInputs(['', '', '']);
    setFeedback(null);
    setShowHint(false);
    setShowFullSolution(false);
  };

  return (
    <div className="playful-card p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-playful-softBorder gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-playful-cobalt/10 border border-playful-cobalt/25 text-playful-cobalt text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Derivation Solver</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-playful-ink">
            Step-by-Step Numerical Practice Lab
          </h3>
          <p className="text-xs sm:text-sm text-playful-muted mt-0.5">
            Work through exam calculations one stepped substitution at a time.
          </p>
        </div>

        <button
          onClick={() => setShowFullSolution(!showFullSolution)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-playful-softBorder bg-white text-xs font-bold text-playful-ink hover:bg-playful-cream/60 self-start sm:self-auto transition-all shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showFullSolution ? 'Hide Solution' : 'Show Full Solution'}</span>
        </button>
      </div>

      {/* Problem Selection Pills */}
      <div className="flex flex-wrap gap-2.5">
        {PROBLEMS.map((prob, i) => (
          <button
            key={prob.id}
            onClick={() => handleSwitchProblem(i)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedProbIndex === i
                ? 'bg-playful-cobalt text-white shadow-playful-sm'
                : 'bg-white border border-playful-softBorder text-playful-ink hover:bg-playful-cream/60 shadow-sm'
            }`}
          >
            {prob.title}
          </button>
        ))}
      </div>

      {/* Scenario Box */}
      <div className="p-5 rounded-2xl bg-playful-cream/40 border border-playful-softBorder space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-playful-cobalt">
          Problem Context • {problem.badge}
        </span>
        <p className="text-xs sm:text-sm text-playful-ink leading-relaxed">
          {problem.scenario}
        </p>
      </div>

      {/* Step Tracker Pills */}
      <div className="flex items-center gap-2">
        {problem.steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2.5 rounded-full transition-all ${
              i < currentStepIndex
                ? 'bg-[#10b981]'
                : i === currentStepIndex
                ? 'bg-playful-cobalt'
                : 'bg-playful-softBorder/60'
            }`}
          />
        ))}
      </div>

      {/* Current Step Input Card */}
      {!showFullSolution ? (
        <div className="p-6 rounded-3xl bg-white border border-playful-softBorder shadow-playful-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-playful-muted">
              Step {currentStepIndex + 1} of {problem.steps.length}
            </span>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-xs text-amber-700 font-bold hover:underline"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
          </div>

          <h4 className="text-sm sm:text-base font-extrabold text-playful-ink">
            {step.instruction}
          </h4>

          <div className="p-3.5 rounded-2xl bg-playful-cream/60 text-xs text-playful-ink border border-playful-softBorder flex flex-wrap items-center gap-2">
            <span className="font-bold text-playful-muted uppercase text-[10px] tracking-wider">Formula:</span>
            <InlineMath math={step.formula} className="text-playful-cobalt font-bold" />
          </div>

          {showHint && (
            <div className="p-3.5 rounded-xl bg-playful-sunny/20 border border-playful-sunny/50 text-xs text-amber-950">
              💡 <strong>Hint:</strong> <MathText text={step.hint} />
            </div>
          )}

          {/* User Input & Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="relative flex-1">
              <input
                type="number"
                step="any"
                placeholder="Enter calculated numerical value..."
                value={userInputs[currentStepIndex]}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserInputs((prev) => {
                    const next = [...prev];
                    next[currentStepIndex] = val;
                    return next;
                  });
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-playful-cream/30 border border-playful-softBorder text-xs font-mono font-bold text-playful-ink focus:outline-none focus:ring-2 focus:ring-playful-cobalt/20 focus:border-playful-cobalt"
              />
              {step.unit && (
                <span className="absolute right-3 top-2.5 text-xs text-playful-muted font-mono font-semibold">
                  {step.unit}
                </span>
              )}
            </div>

            <button
              onClick={handleVerify}
              className="playful-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs shadow-playful-sm transition-all hover:scale-105 active:scale-95"
            >
              Verify Answer
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                feedback.isCorrect
                  ? 'bg-playful-mint/20 border-playful-mint/80 text-emerald-950'
                  : 'bg-playful-coral/20 border-playful-coral/40 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5">
                  {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <XCircle className="w-4 h-4 text-rose-700" />}
                  {feedback.isCorrect ? 'Correct!' : 'Check Your Calculation'}
                </span>

                {feedback.isCorrect && currentStepIndex + 1 < problem.steps.length && (
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-xs leading-relaxed"><MathText text={feedback.message} /></p>
            </div>
          )}
        </div>
      ) : (
        /* Full Worked Derivation View */
        <div className="p-6 rounded-3xl bg-playful-ink text-white text-xs border border-playful-ink shadow-playful-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <span className="text-playful-sunny font-bold uppercase tracking-wider text-[11px]">
              Complete Analytical Solution
            </span>
            <span className="text-white/60 text-[11px]">All steps revealed</span>
          </div>

          {problem.steps.map((st, i) => (
            <div key={i} className="space-y-1.5 pt-2 border-b border-white/10 pb-3">
              <div className="text-white font-bold">{st.instruction}</div>
              <div className="text-white/80 flex items-center gap-2">
                <span className="text-white/50 text-[10px]">Formula:</span>
                <InlineMath math={st.formula} />
              </div>
              <div className="text-playful-mint font-bold">
                Answer: {st.expectedAnswer} {st.unit} — <MathText text={st.explanation} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
