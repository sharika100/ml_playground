import React, { useState } from 'react';
import { LearningSorter } from '../components/interactive/LearningSorter';
import { DecisionTreeBuilder } from '../components/interactive/DecisionTreeBuilder';
import { EntropyExplorer } from '../components/interactive/EntropyExplorer';
import { InformationGainCalculator } from '../components/interactive/InformationGainCalculator';
import { HypothesisPlayground } from '../components/interactive/HypothesisPlayground';
import { RegressionPlayground } from '../components/interactive/RegressionPlayground';
import { FlaskConical, GitBranch, Binary, BarChart3, TrendingUp, Layers, HelpCircle } from 'lucide-react';

export const LabPage: React.FC = () => {
  const [activeLab, setActiveLab] = useState<string>('tree');

  const labs = [
    {
      id: 'tree',
      title: 'Decision Tree Builder',
      icon: <GitBranch className="w-4 h-4" />,
      desc: 'Build ID3 tree, inspect purity, classify samples',
    },
    {
      id: 'entropy',
      title: 'Entropy & Gini Explorer',
      icon: <Binary className="w-4 h-4" />,
      desc: 'Real-time Shannon entropy curve & formulas',
    },
    {
      id: 'gain',
      title: 'Information Gain Comparator',
      icon: <BarChart3 className="w-4 h-4" />,
      desc: 'Compare candidate splits across datasets',
    },
    {
      id: 'hypothesis',
      title: 'Hypothesis & Overfitting',
      icon: <Layers className="w-4 h-4" />,
      desc: 'Ockham’s razor, polynomial degrees 1–6',
    },
    {
      id: 'regression',
      title: 'Linear Regression & MSE',
      icon: <TrendingUp className="w-4 h-4" />,
      desc: 'Drag slope/intercept, observe live cost surface',
    },
    {
      id: 'sorter',
      title: 'Learning Paradigm Classifier',
      icon: <FlaskConical className="w-4 h-4" />,
      desc: 'Supervised vs Unsupervised vs RL vs Semi',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Lab Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold mb-3">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Interactive Machine Learning Experiments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Interactive ML Lab
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Manipulate inputs, adjust model parameters, inspect intermediate mathematical terms, and watch algorithms learn in real time.
        </p>
      </div>

      {/* Lab Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {labs.map((lab) => {
          const isActive = activeLab === lab.id;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500/20 text-brand-900 dark:text-brand-100'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                <span className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}>
                  {lab.icon}
                </span>
                <span className="truncate">{lab.title}</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                {lab.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Lab Component */}
      <div className="pt-2">
        {activeLab === 'tree' && <DecisionTreeBuilder />}
        {activeLab === 'entropy' && <EntropyExplorer />}
        {activeLab === 'gain' && <InformationGainCalculator />}
        {activeLab === 'hypothesis' && <HypothesisPlayground />}
        {activeLab === 'regression' && <RegressionPlayground />}
        {activeLab === 'sorter' && <LearningSorter />}
      </div>
    </div>
  );
};
