import React, { useState, useMemo } from 'react';
import { PLAY_TENNIS_DATASET, GYM_DATASET, RESTAURANT_DATASET, DatasetDef } from '../../data/datasets';
import { calculateEntropy, calculateInformationGain, GainResult } from '../../math/entropy';
import { Trophy, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';

export const InformationGainCalculator: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('play-tennis');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('Outlook');

  const dataset: DatasetDef = useMemo(() => {
    if (selectedDatasetId === 'gym-attendance') return GYM_DATASET;
    if (selectedDatasetId === 'restaurant-wait') return RESTAURANT_DATASET;
    return PLAY_TENNIS_DATASET;
  }, [selectedDatasetId]);

  // Ensure selectedAttribute is valid for current dataset
  const activeAttribute = dataset.attributes.includes(selectedAttribute)
    ? selectedAttribute
    : dataset.attributes[0];

  // Compute Parent Counts
  const { parentCounts, targetLabels } = useMemo(() => {
    const target = dataset.targetAttribute;
    const labelSet = Array.from(new Set(dataset.data.map((r) => String(r[target])))).sort();
    const counts = labelSet.map((lbl) => dataset.data.filter((r) => String(r[target]) === lbl).length);
    return { parentCounts: counts, targetLabels: labelSet };
  }, [dataset]);

  // Compute Gains for ALL attributes in dataset
  const allGains = useMemo(() => {
    const target = dataset.targetAttribute;
    return dataset.attributes.map((attr) => {
      const distinctVals = dataset.attributeValues[attr] || Array.from(new Set(dataset.data.map((r) => String(r[attr]))));
      const children = distinctVals.map((val) => {
        const matchingRows = dataset.data.filter((r) => String(r[attr]) === val);
        const childCounts = targetLabels.map((lbl) => matchingRows.filter((r) => String(r[target]) === lbl).length);
        return { name: `${attr} = ${val}`, counts: childCounts };
      });
      const gainRes = calculateInformationGain(parentCounts, children);
      return { attribute: attr, ...gainRes };
    });
  }, [dataset, parentCounts, targetLabels]);

  // Find Best Attribute
  const bestAttribute = useMemo(() => {
    return [...allGains].sort((a, b) => b.informationGain - a.informationGain)[0];
  }, [allGains]);

  const currentGainDetail = useMemo(() => {
    return allGains.find((g) => g.attribute === activeAttribute) || allGains[0];
  }, [allGains, activeAttribute]);

  const handleDatasetChange = (id: string) => {
    setSelectedDatasetId(id);
    const nextDs = id === 'gym-attendance' ? GYM_DATASET : id === 'restaurant-wait' ? RESTAURANT_DATASET : PLAY_TENNIS_DATASET;
    setSelectedAttribute(nextDs.attributes[0]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Attribute Selection Measure (ASM)
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Information Gain & Split Comparator
          </h3>
        </div>
        {/* Dataset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Dataset:</span>
          <select
            value={selectedDatasetId}
            onChange={(e) => handleDatasetChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="play-tennis">Play Tennis (14 Days, Mitchell)</option>
            <option value="gym-attendance">Gym Attendance (30 People, Notes)</option>
            <option value="restaurant-wait">Restaurant Waiting (12 Scenarios, R&N)</option>
          </select>
        </div>
      </div>

      {/* Attribute Comparison Grid */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Candidate Attributes for Root / Decision Node:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allGains.map((item) => {
            const isWinner = item.attribute === bestAttribute.attribute;
            const isSelected = item.attribute === activeAttribute;
            return (
              <button
                key={item.attribute}
                onClick={() => setSelectedAttribute(item.attribute)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-2.5 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                    <Trophy className="w-3 h-3" /> Best Split
                  </span>
                )}
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {item.attribute}
                </div>
                <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">
                  {item.informationGain.toFixed(4)}
                </div>
                <div className="text-[11px] text-slate-500">Info Gain (bits)</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Attribute Mathematical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              <span>Split Details: {activeAttribute}</span>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
                Gain = {currentGainDetail.informationGain.toFixed(4)}
              </span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Splitting the parent dataset of {dataset.data.length} records by <strong className="text-slate-700 dark:text-slate-300">{activeAttribute}</strong> partitions it into {currentGainDetail.childCalculations.length} branches:
            </p>

            <div className="space-y-2.5">
              {currentGainDetail.childCalculations.map((child, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <span>{child.subsetName}</span>
                    <span className="font-mono text-brand-600 dark:text-brand-400">
                      H = {child.entropy.toFixed(4)} bits
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Count: {child.count} records (Weight: {(child.weight * 100).toFixed(1)}%)</span>
                    <span>
                      {child.entropy === 0 ? 'Pure (Leaf Node) ✨' : 'Mixed (Requires Subtree)'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Math Calculation Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
            <div className="text-brand-400 font-bold mb-2 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Formal Information Gain Equation</span>
              <span className="text-[10px] text-slate-400">ID3 Heuristic</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-slate-300">Gain(S, {activeAttribute}) = H(S) - ∑ (|S_v| / |S|) * H(S_v)</div>
              <div>• Parent Entropy H(S) = {currentGainDetail.parentEntropy.toFixed(4)} bits</div>
              <div>• Weighted Child Entropy = {currentGainDetail.weightedChildEntropy.toFixed(4)} bits</div>
              <div className="text-amber-300 font-bold">
                • Gain(S, {activeAttribute}) = {currentGainDetail.parentEntropy.toFixed(4)} - {currentGainDetail.weightedChildEntropy.toFixed(4)} = {currentGainDetail.informationGain.toFixed(4)} bits
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] leading-relaxed text-slate-300">
              {activeAttribute === bestAttribute.attribute ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> This attribute maximizes information gain!
                  It will be chosen by ID3/C4.5 as the root node because it provides the maximum reduction in entropy.
                </span>
              ) : (
                <span>
                  This attribute yields {currentGainDetail.informationGain.toFixed(4)} bits.
                  However, <strong>{bestAttribute.attribute}</strong> is superior with {bestAttribute.informationGain.toFixed(4)} bits, so {bestAttribute.attribute} will be chosen instead.
                </span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
            <strong>Scientific Insight:</strong> Information gain uses a greedy heuristic. While finding the globally minimal decision tree is NP-complete (2^(2^n) possible trees), selecting the attribute with highest information gain at each step reliably finds compact, highly generalizable trees!
          </div>
        </div>
      </div>
    </div>
  );
};
