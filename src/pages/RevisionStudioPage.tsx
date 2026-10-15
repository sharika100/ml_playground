import React, { useState } from 'react';
import { QuizCard } from '../components/interactive/QuizCard';
import { MathFormula, InlineMath, MathText } from '../components/common/MathFormula';
import { Callout } from '../components/common/Callout';
import { BookMarked, CheckCircle2, FileText, HelpCircle, Trophy, Sparkles, Download, Layers } from 'lucide-react';
import { QuizQuestion } from '../types';

const FINAL_MASTERY_CHALLENGE: QuizQuestion[] = [
  {
    id: 'final-1',
    question: 'A decision node has 6 positive and 6 negative instances (50/50 equal distribution). What is its Shannon Entropy?',
    options: ['0.0 bits', '0.5 bits', '1.0 bit', '12.0 bits'],
    correctAnswer: 2,
    explanation: 'Shannon entropy is at its maximum ($1.0\\text{ bit}$) when classes are equally probable: $- (0.5 \\log_2 0.5) - (0.5 \\log_2 0.5) = 0.5 + 0.5 = 1.0\\text{ bit}$.',
  },
  {
    id: 'final-2',
    question: 'Why does an algorithm prefer a split with higher Information Gain over one with lower Information Gain?',
    options: [
      'Because higher information gain means the split was faster to compute',
      'Because higher information gain represents a greater reduction in entropy (uncertainty) in the resulting child nodes',
      'Because higher information gain always guarantees a larger tree with more nodes',
      'Because it eliminates the need for training data',
    ],
    correctAnswer: 1,
    explanation: '$\\text{Gain}(S, A) = H(S) - \\sum \\frac{|S_v|}{|S|} H(S_v)$. Higher gain means more uncertainty was eliminated by testing that feature.',
  },
  {
    id: 'final-3',
    question: 'How does Ockham’s Razor resolve the inductive learning problem of choosing between multiple consistent hypotheses?',
    options: [
      'It dictates choosing the model with the largest number of polynomial parameters',
      'It suggests picking the simplest hypothesis that remains consistent with the data, as it is less likely to overfit noise',
      'It forces the algorithm to use random guessing',
      'It requires equal weighting of all candidate functions',
    ],
    correctAnswer: 1,
    explanation: 'Ockham’s razor advises that simpler models (e.g. low degree polynomials) have higher prior probability $P(h)$ and generalize better to novel instances.',
  },
  {
    id: 'final-4',
    question: 'In Simple Linear Regression $y = a_0 + a_1 x + \\varepsilon$, what does the parameter $a_1$ represent geometrically?',
    options: [
      'The point where the line crosses the y-axis when $x = 0$',
      'The slope of the line, indicating the change in $y$ per unit change in $x$',
      'The total number of data points',
      'The random irreducible error $\\varepsilon$',
    ],
    correctAnswer: 1,
    explanation: '$a_1$ is the regression coefficient/slope, dictating the steepness and direction (positive or negative) of the relationship.',
  },
  {
    id: 'final-5',
    question: 'A model achieves 99% accuracy on the training set but collapses to 52% on the test set. What error has occurred?',
    options: [
      'Underfitting (high bias)',
      'Overfitting (low bias, high variance)',
      'Optimal Generalization',
      'Data Augmentation',
    ],
    correctAnswer: 1,
    explanation: 'High training score paired with poor test score is the hallmark of Overfitting (memorizing noise and failing to generalize).',
  },
];

export const RevisionStudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'worked' | 'misconceptions' | 'exam'>('formulas');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EB] text-[#8C6B0F] border border-[#F5C94B]/50 text-xs font-black mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Complete Study Companion & Formula Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#26324B] tracking-tight mb-2">
          Revision Studio
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed">
          Quick-reference formula cheat sheets, step-by-step worked examination solutions, common misconception busters, and the Final Mixed Mastery Challenge.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-white border border-[#E8E5DE] shadow-sm">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'formulas'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
            }`}
          >
            Formula Reference
          </button>
          <button
            onClick={() => setActiveTab('worked')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'worked'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
            }`}
          >
            Worked Solutions
          </button>
          <button
            onClick={() => setActiveTab('misconceptions')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'misconceptions'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
            }`}
          >
            Misconception Buster
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'exam'
                ? 'bg-[#315CEB] text-white shadow-playful-sm'
                : 'text-[#667085] hover:text-[#26324B]'
            }`}
          >
            Final Mastery Challenge
          </button>
        </div>
      </div>

      {/* TAB 1: FORMULAS */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              Entropy & Information Theory
            </span>
            <h3 className="text-lg font-bold text-[#26324B]">Shannon Entropy</h3>
            <MathFormula formula="H(S) = - \sum_{i=1}^{c} p_i \log_2(p_i)" block />
            <p className="text-xs text-[#667085] leading-relaxed">
              <MathText text="Measures class label disorder. When a subset is pure (all positive or all negative), $H(S) = 0$. When classes are split 50/50, $H(S) = 1.0\text{ bit}$. Convention: $0 \log_2(0) = 0$." />
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              Decision Tree Splitting
            </span>
            <h3 className="text-lg font-bold text-[#26324B]">Information Gain</h3>
            <MathFormula formula="\text{Gain}(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)" block />
            <p className="text-xs text-[#667085] leading-relaxed">
              <MathText text="Measures reduction in entropy after splitting on attribute $A$. The attribute with maximum information gain is selected as the decision node." />
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              CART Impurity Measure
            </span>
            <h3 className="text-lg font-bold text-[#26324B]">Gini Index</h3>
            <MathFormula formula="\text{Gini}(S) = 1 - \sum_{j} p_j^2" block />
            <p className="text-xs text-[#667085] leading-relaxed">
              <MathText text="Alternative impurity metric used in the CART algorithm for binary splits. A pure node has $\text{Gini} = 0$. Algorithms prefer attributes with lower Gini values." />
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              Linear Models Optimization
            </span>
            <h3 className="text-lg font-bold text-[#26324B]">Mean Squared Error (MSE)</h3>
            <MathFormula formula="\text{MSE} = \frac{1}{N} \sum_{i=1}^{N} \left(y_i - (a_1 x_i + a_0)\right)^2" block />
            <p className="text-xs text-[#667085] leading-relaxed">
              <MathText text="Cost function measuring model fit. Gradient descent iteratively updates $a_0$ and $a_1$ to minimize MSE to its global minimum." />
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: WORKED SOLUTIONS */}
      {activeTab === 'worked' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              Classic Exam Problem Walkthrough
            </span>
            <h3 className="text-xl font-bold text-[#26324B]">
              Computing Outlook Information Gain on Play Tennis Dataset
            </h3>
            <div className="text-xs text-[#26324B] space-y-3 leading-relaxed">
              <p>
                <strong>Given:</strong> Total samples <InlineMath math="|S| = 14" /> (9 Yes, 5 No).
              </p>
              <div>
                <strong>Step 1 (Parent Entropy):</strong>
                <MathFormula formula="H(S) = - \frac{9}{14} \log_2\left(\frac{9}{14}\right) - \frac{5}{14} \log_2\left(\frac{5}{14}\right) = 0.940 \text{ bits}" block />
              </div>
              <div className="space-y-1.5">
                <strong>Step 2 (Partition by Outlook):</strong>
                <div className="pl-2 space-y-1 text-[#667085]">
                  <div>• <strong>Sunny:</strong> 5 samples (2 Yes, 3 No) ➔ <InlineMath math="H(S_{\text{Sunny}}) = 0.971 \text{ bits}" /></div>
                  <div>• <strong>Overcast:</strong> 4 samples (4 Yes, 0 No) ➔ <InlineMath math="H(S_{\text{Overcast}}) = 0.0 \text{ bits (Pure!)}" /></div>
                  <div>• <strong>Rain:</strong> 5 samples (3 Yes, 2 No) ➔ <InlineMath math="H(S_{\text{Rain}}) = 0.971 \text{ bits}" /></div>
                </div>
              </div>
              <div>
                <strong>Step 3 (Weighted Average Child Entropy):</strong>
                <MathFormula formula="\sum_{v} \frac{|S_v|}{|S|} H(S_v) = \frac{5}{14}(0.971) + \frac{4}{14}(0) + \frac{5}{14}(0.971) = 0.693 \text{ bits}" block />
              </div>
              <div className="p-5 rounded-2xl bg-[#F0FAF6] border border-[#A8E6CF] text-[#1F6B4F] font-semibold space-y-2 shadow-sm">
                <div><strong>Step 4 (Final Information Gain):</strong></div>
                <MathFormula formula="\text{Gain}(S, \text{Outlook}) = H(S) - 0.693 = 0.940 - 0.693 = 0.247 \text{ bits}" block />
                <div className="text-xs font-normal">
                  Because 0.247 exceeds Humidity (0.151), Wind (0.048), and Temperature (0.029), <strong>Outlook</strong> is mathematically verified as the Root Decision Node!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MISCONCEPTION BUSTERS */}
      {activeTab === 'misconceptions' && (
        <div className="space-y-4">
          <Callout type="misconception" title="Misconception 1: Zero training error means a perfect model">
            <strong>Reality:</strong> Fitting the training set with 0 error usually means the model memorized random noise and outliers (severe overfitting). A model with slightly higher training error that generalizes to unseen test data is far superior!
          </Callout>

          <Callout type="misconception" title="Misconception 2: Unsupervised learning is just supervised learning without a teacher">
            <strong>Reality:</strong> Unsupervised learning has a fundamentally different mathematical objective: discovering latent geometry, clusters, and probability distributions without any target label y.
          </Callout>

          <Callout type="misconception" title="Misconception 3: Reinforcement learning gives a reward for every single micro-action">
            <strong>Reality:</strong> Real-world RL agents often operate under delayed, sparse reward signals (e.g., winning or losing chess after 50 moves). The objective is to maximize cumulative expected return through state-action value policies.
          </Callout>

          <Callout type="misconception" title="Misconception 4: Ockham's razor says simple models are ALWAYS true in nature">
            <strong>Reality:</strong> Ockham's razor does not claim the universe is inherently simple; it provides a rational inductive bias: simpler consistent models possess higher prior probability and contain fewer ways to fit noise.
          </Callout>
        </div>
      )}

      {/* TAB 4: FINAL MASTERY CHALLENGE */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#26324B] border border-[#344465] text-white shadow-playful-lg space-y-2">
            <div className="flex items-center gap-2 text-[#F5C94B] text-xs font-black uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Final Cumulative Exam Challenge</span>
            </div>
            <h3 className="text-2xl font-bold">Comprehensive ML Mastery Check</h3>
            <p className="text-xs text-[#E8E5DE]/80 max-w-xl leading-relaxed">
              Test your comprehensive understanding across all 5 core modules: Learning from Examples, Forms of Learning, Decision Trees, Hypothesis Selection, and Linear Models.
            </p>
          </div>

          <QuizCard questions={FINAL_MASTERY_CHALLENGE} title="Comprehensive Mastery Challenge" />
        </div>
      )}
    </div>
  );
};
