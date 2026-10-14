import React, { useState } from 'react';
import { triggerCelebration } from '../common/Celebration';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

interface ProblemDef {
  id: string;
  title: string;
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
    scenario: 'You have 14 total weather days: 9 days where tennis was played ("Yes") and 5 days where it was not ("No"). Compute the parent Shannon Entropy H(S).',
    steps: [
      {
        instruction: 'Step 1: Compute probability of positive class P(Yes) = 9/14 (round to 3 decimals)',
        formula: 'P(Yes) = 9 / 14',
        expectedAnswer: 0.643,
        tolerance: 0.005,
        unit: '',
        hint: 'Divide 9 by 14 on a calculator: 9 ÷ 14 ≈ 0.6428',
        explanation: '9 out of 14 days are Yes, so P(Yes) = 9/14 ≈ 0.643.',
      },
      {
        instruction: 'Step 2: Compute probability of negative class P(No) = 5/14 (round to 3 decimals)',
        formula: 'P(No) = 5 / 14',
        expectedAnswer: 0.357,
        tolerance: 0.005,
        unit: '',
        hint: 'Divide 5 by 14 on a calculator: 5 ÷ 14 ≈ 0.3571',
        explanation: '5 out of 14 days are No, so P(No) = 5/14 ≈ 0.357.',
      },
      {
        instruction: 'Step 3: Calculate final Entropy H(S) = - P(Yes)*log2(P(Yes)) - P(No)*log2(P(No)) in bits',
        formula: 'H(S) = - (9/14) * log2(9/14) - (5/14) * log2(5/14)',
        expectedAnswer: 0.94,
        tolerance: 0.015,
        unit: 'bits',
        hint: 'Use log base 2: log2(0.6428) ≈ -0.637, log2(0.3571) ≈ -1.485. Expected answer is around 0.940.',
        explanation: '-(0.643 * -0.637) - (0.357 * -1.485) = 0.4098 + 0.5303 ≈ 0.940 bits.',
      },
    ],
  },
  {
    id: 'prob-linear-pred',
    title: 'Linear Model Prediction & Residual',
    scenario: 'A company models salary Y (in thousands of dollars) as a function of years of experience X using the fitted linear regression line: Y = 4.5 * X + 32.0.',
    steps: [
      {
        instruction: 'Step 1: Predict the expected salary ŷ for an engineer with X = 4 years of experience.',
        formula: 'ŷ = 4.5 * 4 + 32.0',
        expectedAnswer: 50.0,
        tolerance: 0.1,
        unit: 'k$',
        hint: 'Multiply 4.5 by 4 (= 18.0) and add the intercept 32.0.',
        explanation: '4.5 * 4 = 18.0; 18.0 + 32.0 = 50.0 thousand dollars.',
      },
      {
        instruction: 'Step 2: If the actual observed salary for this engineer is y = 53.0k$, compute the residual error e = y - ŷ.',
        formula: 'e = y - ŷ',
        expectedAnswer: 3.0,
        tolerance: 0.1,
        unit: 'k$',
        hint: 'Subtract predicted salary (50.0) from actual salary (53.0).',
        explanation: '53.0 - 50.0 = +3.0k$. The positive residual means the actual salary was 3k$ above the regression line.',
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
  const [revealed, setRevealed] = useState(false);

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
      setFeedback({ isCorrect: true, message: `Correct! ${step.explanation}` });
      triggerCelebration();
    } else {
      setFeedback({
        isCorrect: false,
        message: `Not quite. Expected around ${step.expectedAnswer}${step.unit ? ' ' + step.unit : ''}. Check the hint if you're stuck!`,
      });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < problem.steps.length) {
      setCurrentStepIndex((i) => i + 1);
      setFeedback(null);
      setShowHint(false);
      setRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setUserInputs(['', '', '']);
    setFeedback(null);
    setShowHint(false);
    setRevealed(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Interactive Maths Practice
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Guided Step-by-Step Numerical Solver
          </h3>
        </div>
        <select
          value={selectedProbIndex}
          onChange={(e) => {
            setSelectedProbIndex(parseInt(e.target.value));
            handleReset();
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
        >
          {PROBLEMS.map((p, i) => (
            <option key={p.id} value={i}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Problem Scenario */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
          Scenario
        </span>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {problem.scenario}
        </p>
      </div>

      {/* Current Step Input */}
      <div className="p-5 rounded-xl border border-brand-200 dark:border-brand-900/50 bg-brand-50/30 dark:bg-brand-950/20 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            Step {currentStepIndex + 1} of {problem.steps.length}
          </span>
          <span className="text-xs font-mono text-slate-500">{step.formula}</span>
        </div>

        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {step.instruction}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="number"
              step="any"
              placeholder={`Enter value${step.unit ? ' in ' + step.unit : ''}...`}
              value={userInputs[currentStepIndex]}
              onChange={(e) => {
                const newInputs = [...userInputs];
                newInputs[currentStepIndex] = e.target.value;
                setUserInputs(newInputs);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <button
            onClick={handleVerify}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Check Answer
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
        </div>

        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
            💡 <strong>Hint:</strong> {step.hint}
          </div>
        )}

        {feedback && (
          <div
            className={`mt-4 p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              feedback.isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">{feedback.message}</div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Start Over
        </button>

        {feedback?.isCorrect && currentStepIndex + 1 < problem.steps.length && (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Proceed to Step {currentStepIndex + 2}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
