import React, { useState } from 'react';
import { LearningType, SorterScenario } from '../../types';
import { triggerCelebration } from '../common/Celebration';
import { CheckCircle2, XCircle, RefreshCw, Sparkles, HelpCircle, ArrowRight, Trophy } from 'lucide-react';

export const SCENARIOS: SorterScenario[] = [
  {
    id: 's1',
    title: 'Customer Segmentation for Retail',
    description: 'A marketing team has purchasing records of 10,000 customers without predefined categories. They want to group customers with similar buying habits to create tailored promotional campaigns.',
    correctCategory: 'unsupervised',
    explanation: 'There are NO target output labels provided (e.g. no "Loyal" or "Casual" tags). The algorithm discovers inherent clusters based purely on feature similarities.',
    whyOthersFail: {
      supervised: 'Supervised learning requires ground-truth target labels for each customer.',
      unsupervised: 'Correct! The objective is to discover latent structure without ground-truth labels.',
      reinforcement: 'No agent is taking dynamic sequential actions in an environment to receive reward signals.',
      'semi-supervised': 'There are no labeled examples at all here; it is purely unsupervised clustering.',
    },
    realWorldContext: 'Clustering algorithms like K-Means and Hierarchical Clustering perform this task.',
  },
  {
    id: 's2',
    title: 'Email Spam and Phishing Detection',
    description: 'An email client trains on 50,000 historical emails, where each email is already marked as either "Spam" or "Not Spam" (Ham). The goal is to accurately tag incoming new emails.',
    correctCategory: 'supervised',
    explanation: 'Each training email includes an input vector (words, header) and an explicit known ground-truth output label ("Spam" vs "Not Spam").',
    whyOthersFail: {
      supervised: 'Correct! Mappings from input x to discrete categorical target y are learned from labeled pairs.',
      unsupervised: 'Unsupervised would not know what constitutes "spam" without human-defined labels.',
      reinforcement: 'The model is not learning through iterative reward penalties from an interactive environment.',
      'semi-supervised': 'In this scenario, all 50,000 examples are fully labeled.',
    },
    realWorldContext: 'Naïve Bayes, Decision Trees, and Support Vector Machines are standard supervised spam filters.',
  },
  {
    id: 's3',
    title: 'Estimating Age from Photos with Scarce Verified Labels',
    description: 'You collect photos of 1,000 people with verified age IDs, but also have 100,000 unlabeled photos from public archives. You want to train an accurate facial age estimator.',
    correctCategory: 'semi-supervised',
    explanation: 'Combines a small set of labeled data with a massive pool of unlabeled photos to discover underlying structural facial geometry and feature distributions.',
    whyOthersFail: {
      supervised: 'Supervised requires clean labels for all data and cannot leverage the 100,000 unlabeled images.',
      unsupervised: 'Unsupervised alone cannot assign numerical calendar ages without reference labels.',
      reinforcement: 'No interactive environment or action-reward feedback loop is present.',
      'semi-supervised': 'Correct! Exploits small labeled data alongside vast unlabeled collections.',
    },
    realWorldContext: 'Directly highlighted in Russell & Norvig and the course notes as a bridge between supervised and unsupervised learning.',
  },
  {
    id: 's4',
    title: 'Autonomous Drone Obstacle Avoidance',
    description: 'A quadcopter learns to navigate through a windy obstacle course by trial-and-error: receiving +10 points for reaching checkpoints and -100 points for colliding with obstacles.',
    correctCategory: 'reinforcement',
    explanation: 'The drone (agent) interacts with the environment, takes actions (motor thrusts), observes state transitions, and updates its policy to maximize cumulative rewards over time.',
    whyOthersFail: {
      supervised: 'No human is providing the optimal motor thrust commands for every microsecond.',
      unsupervised: 'Unsupervised algorithms cannot learn goal-oriented dynamic control without reward feedback.',
      reinforcement: 'Correct! Learns optimal policy through environmental rewards and penalties.',
      'semi-supervised': 'This is active sequential decision-making under uncertainty, not static dataset classification.',
    },
    realWorldContext: 'Q-Learning, Policy Gradients, and Deep Reinforcement Learning power autonomous robotics.',
  },
  {
    id: 's5',
    title: 'Medical Tumor Diagnosis from Biopsy Slides',
    description: 'A hospital supplies 2,000 microscopic biopsy slides, each pathologically verified by expert oncologists as either "Malignant" or "Benign".',
    correctCategory: 'supervised',
    explanation: 'Every training sample is paired with the gold-standard diagnostic label from medical pathologists.',
    whyOthersFail: {
      supervised: 'Correct! The objective is binary classification y ∈ {Malignant, Benign} from labeled features.',
      unsupervised: 'Unsupervised clustering would not guarantee grouping by oncology pathology.',
      reinforcement: 'There is no dynamic environment or trial-and-error reward loop.',
      'semi-supervised': 'All slides in this cohort possess confirmed ground-truth diagnoses.',
    },
    realWorldContext: 'Convolutional neural networks and logistic regression are trained on labeled pathology datasets.',
  },
];

export const LearningSorter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<LearningType | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = SCENARIOS[currentIndex];
  const isAnswered = selectedCategory !== null;
  const isCorrect = selectedCategory === scenario.correctCategory;

  const categories: { id: LearningType; label: string; color: string; desc: string }[] = [
    {
      id: 'supervised',
      label: 'Supervised Learning',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      desc: 'Learns mapping from labeled pairs (x, y)',
    },
    {
      id: 'unsupervised',
      label: 'Unsupervised Learning',
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      desc: 'Discovers patterns/clusters without target labels',
    },
    {
      id: 'reinforcement',
      label: 'Reinforcement Learning',
      color: 'bg-amber-600 hover:bg-amber-700 text-white',
      desc: 'Learns through actions, states, and rewards',
    },
    {
      id: 'semi-supervised',
      label: 'Semi-Supervised',
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      desc: 'Combines small labeled data with large unlabeled data',
    },
  ];

  const handleSelect = (category: LearningType) => {
    if (isAnswered) return;
    setSelectedCategory(category);
    if (category === scenario.correctCategory) {
      setScore((s) => s + 1);
      triggerCelebration();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedCategory(null);
    } else {
      setCompleted(true);
      triggerCelebration();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedCategory(null);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <Trophy className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Paradigm Challenge Completed!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            You scored <strong className="text-brand-600 dark:text-brand-400 font-mono text-base">{score}</strong> out of{' '}
            <strong className="font-mono text-base">{SCENARIOS.length}</strong> scenarios correct.
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Challenge Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
      {/* Header & Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Paradigm Sorter</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Classify the Machine Learning Problem
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Can you identify which learning framework fits the scenario?
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span>Scenario {currentIndex + 1} of {SCENARIOS.length}</span>
          <span className="text-slate-400">|</span>
          <span className="text-brand-600 dark:text-brand-400">Score: {score}</span>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Real-World Case Study
        </span>
        <h4 className="text-lg font-black text-slate-900 dark:text-white">
          {scenario.title}
        </h4>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* 4 Interactive Category Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const isTargetCorrect = cat.id === scenario.correctCategory;

          let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-900';
          if (isAnswered) {
            if (isTargetCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/40';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
            } else {
              btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={cat.id}
              disabled={isAnswered}
              onClick={() => handleSelect(cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative ${btnStyle} ${
                !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {cat.label}
                </span>
                {isAnswered && isTargetCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Feedback */}
      {isAnswered && (
        <div
          className={`p-5 rounded-2xl border transition-all space-y-3 ${
            isCorrect
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {isCorrect ? 'Correct Diagnosis!' : 'Incorrect Choice'}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentIndex + 1 < SCENARIOS.length ? 'Next Scenario' : 'View Results'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
            {scenario.explanation}
          </p>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Why others don't apply:</strong> {scenario.whyOthersFail[selectedCategory!]}
          </div>
        </div>
      )}
    </div>
  );
};
