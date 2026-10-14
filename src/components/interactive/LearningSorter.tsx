import React, { useState } from 'react';
import { LearningType, SorterScenario } from '../../types';
import { triggerCelebration } from '../common/Celebration';
import { CheckCircle2, XCircle, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

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
    title: 'Email Spam and Malware Filtering',
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
    title: 'Estimating Age from Photos with Deceptive Labels',
    description: 'You collect photos of 1,000 people and ask their age. However, some people systematically underreport their real age. You also have 100,000 unlabeled photos from public archives.',
    correctCategory: 'semi-supervised',
    explanation: 'Combines a small set of labeled data (even with systematic noise/deception) with a massive pool of unlabeled photos to discover underlying structural facial features.',
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
    title: 'Autonomous Drone Obstacle Navigation',
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
      desc: 'Learns mapping from labeled input-output pairs (x, y)',
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
      desc: 'Learns through actions, states, and reward feedback',
    },
    {
      id: 'semi-supervised',
      label: 'Semi-Supervised',
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      desc: 'Combines small labeled data with large unlabeled data',
    },
  ];

  const handleSelect = (cat: LearningType) => {
    if (isAnswered) return;
    setSelectedCategory(cat);
    if (cat === scenario.correctCategory) {
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
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedCategory(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Interactive Lab 01
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Learning Paradigm Classifier
          </h3>
        </div>
        <div className="text-sm font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Score: {score} / {SCENARIOS.length}
        </div>
      </div>

      {!completed ? (
        <div>
          <div className="mb-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                Scenario {currentIndex + 1} of {SCENARIOS.length}
              </span>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {scenario.title}
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {scenario.description}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Which machine learning paradigm applies to this problem?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const isChosen = selectedCategory === cat.id;
                const isTarget = scenario.correctCategory === cat.id;
                let btnStyle = 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-brand-500 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
                  if (isTarget) {
                    btnStyle = 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                  } else if (isChosen && !isTarget) {
                    btnStyle = 'border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  } else {
                    btnStyle = 'opacity-50 border border-slate-200 dark:border-slate-700';
                  }
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    disabled={isAnswered}
                    className={`p-4 rounded-xl text-left transition-all relative ${btnStyle}`}
                  >
                    <div className="font-bold text-sm mb-1 flex items-center justify-between">
                      {cat.label}
                      {isAnswered && isTarget && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isAnswered && isChosen && !isTarget && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered && (
            <div className={`p-4 rounded-xl mb-6 border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'}`}>
              <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                {isCorrect ? (
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Correct reasoning!
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Not quite: Why this is {scenario.correctCategory}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                {scenario.explanation}
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Real-World Note:</span> {scenario.realWorldContext}
              </div>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-colors shadow-sm"
              >
                {currentIndex + 1 < SCENARIOS.length ? 'Next Scenario' : 'View Results'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Activity Complete!
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
            You scored {score} out of {SCENARIOS.length}. Understanding the distinct input/output relationships and feedback mechanisms is essential for mastering Machine Learning.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
