import React, { useState, useMemo } from 'react';
import { PLAY_TENNIS_DATASET, GYM_DATASET, RESTAURANT_DATASET, DatasetDef } from '../../data/datasets';
import { calculateEntropy, calculateInformationGain } from '../../math/entropy';
import { Sparkles, Trophy, Layers, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';
import { InlineMath, MathFormula, MathText } from '../common/MathFormula';

export const InformationGainCalculator: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('play-tennis');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('Outlook');
  const [activeStep, setActiveStep] = useState<number>(4); // Default to reveal all steps or 1-4

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
  const { parentCounts, targetLabels, parentEntropy } = useMemo(() => {
    const target = dataset.targetAttribute;
    const labelSet = Array.from(new Set(dataset.data.map((r) => String(r[target])))).sort();
    const counts = labelSet.map((lbl) => dataset.data.filter((r) => String(r[target]) === lbl).length);
    const entropyRes = calculateEntropy(counts);
    return { parentCounts: counts, targetLabels: labelSet, parentEntropy: entropyRes.entropy };
  }, [dataset]);

  // Compute Gains for ALL attributes in dataset
  const allGains = useMemo(() => {
    const target = dataset.targetAttribute;
    return dataset.attributes.map((attr) => {
      const distinctVals =
        dataset.attributeValues[attr] || Array.from(new Set(dataset.data.map((r) => String(r[attr]))));
      const children = distinctVals.map((val) => {
        const matchingRows = dataset.data.filter((r) => String(r[attr]) === val);
        const childCounts = targetLabels.map(
          (lbl) => matchingRows.filter((r) => String(r[target]) === lbl).length
        );
        return { name: `${attr} = ${val}`, counts: childCounts, totalInSubset: matchingRows.length };
      });
      const gainRes = calculateInformationGain(parentCounts, children);
      return { attribute: attr, children, ...gainRes };
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
    const nextDs =
      id === 'gym-attendance'
        ? GYM_DATASET
        : id === 'restaurant-wait'
        ? RESTAURANT_DATASET
        : PLAY_TENNIS_DATASET;
    setSelectedAttribute(nextDs.attributes[0]);
    setActiveStep(4);
  };

  const handleSelectAttribute = (attr: string) => {
    setSelectedAttribute(attr);
    if (attr === bestAttribute.attribute) {
      triggerCelebration();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Attribute Selection Measure (ASM)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Information Gain & Split Comparator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate entropy reduction: Gain(S, A) = H(S) − Weighted Children Entropy.
          </p>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500">Dataset:</span>
          <select
            value={selectedDatasetId}
            onChange={(e) => handleDatasetChange(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm"
          >
            <option value="play-tennis">🎾 Play Tennis (14 Samples)</option>
            <option value="gym-attendance">🏋️ Gym Attendance (30 Samples)</option>
            <option value="restaurant-wait">🍽️ Restaurant Waiting (12 Samples)</option>
          </select>
        </div>
      </div>

      {/* Candidate Attributes Bar Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Candidate Attributes & Calculated Information Gain:
          </span>
          <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
            Click an attribute to inspect derivation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allGains.map((item) => {
            const isWinner = item.attribute === bestAttribute.attribute;
            const isSelected = item.attribute === activeAttribute;
            return (
              <button
                key={item.attribute}
                onClick={() => handleSelectAttribute(item.attribute)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/50 shadow-md ring-2 ring-brand-400/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-400'
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                    <Trophy className="w-3 h-3" /> Best Split
                  </span>
                )}
                <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                  {item.attribute}
                </div>
                <div className="font-mono text-sm font-black text-brand-600 dark:text-brand-400">
                  Gain: {item.informationGain.toFixed(4)} <span className="text-[10px] font-normal text-slate-500">bits</span>
                </div>
                {/* Visual mini bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isWinner ? 'bg-amber-400' : 'bg-brand-500'}`}
                    style={{ width: `${Math.min(100, (item.informationGain / 0.5) * 100)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepped Derivation & Partition Viewer */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700/60 gap-3">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              <span>Mathematical Derivation for: <span className="text-brand-600 dark:text-brand-400 underline">{activeAttribute}</span></span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Observe how the dataset partitions into subsets and entropy is calculated for each branch.
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-200 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
            <span className="text-slate-500 px-2 text-[11px]">Show Steps:</span>
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  activeStep >= step
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1: PARENT ENTROPY */}
        {activeStep >= 1 && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Step 1: Calculate Parent Dataset Entropy H(S)
              </span>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                <InlineMath math={`H(S) = ${parentEntropy.toFixed(4)} \\text{ bits}`} />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Total instances: {dataset.data.length} ({targetLabels.map((lbl, idx) => `${parentCounts[idx]} "${lbl}"`).join(', ')}).
            </p>
          </div>
        )}

        {/* STEP 2: CHILD PARTITION SUBSETS */}
        {activeStep >= 2 && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              Step 2: Partition Dataset into Child Subsets by "{activeAttribute}":
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentGainDetail.children.map((child, idx) => {
                const childTotal = child.counts.reduce((a, b) => a + b, 0);
                const childRes = calculateEntropy(child.counts);
                const isPure = childRes.entropy === 0;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPure
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {child.name}
                      </span>
                      {isPure && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Pure Leaf!
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      <InlineMath math={`|S_v| = ${childTotal}`} /> ({child.counts.map((c, i) => `${c} "${targetLabels[i]}"`).join(', ')})
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      <InlineMath math={`H(S_v) = ${childRes.entropy.toFixed(4)} \\text{ bits}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: WEIGHTED SUM OF CHILD ENTROPIES */}
        {activeStep >= 3 && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Step 3: Compute Expected / Weighted Child Entropy
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                <InlineMath math={`E_{\\text{weighted}} = ${currentGainDetail.weightedChildEntropy.toFixed(4)} \\text{ bits}`} />
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 overflow-x-auto py-1">
              <InlineMath
                math={`\\sum_{v} \\frac{|S_v|}{|S|} H(S_v) = ${currentGainDetail.children
                  .map((c) => {
                    const ct = c.counts.reduce((a, b) => a + b, 0);
                    const ent = calculateEntropy(c.counts).entropy;
                    return `\\frac{${ct}}{${dataset.data.length}}(${ent.toFixed(3)})`;
                  })
                  .join(' + ')} = ${currentGainDetail.weightedChildEntropy.toFixed(4)} \\text{ bits}`}
              />
            </div>
          </div>
        )}

        {/* STEP 4: FINAL INFORMATION GAIN */}
        {activeStep >= 4 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-900 to-navy-950 text-white shadow-lg space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                Step 4: Final Information Gain
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                <InlineMath math={`\\text{Gain}(S, \\text{${activeAttribute}}) = ${currentGainDetail.informationGain.toFixed(4)} \\text{ bits}`} />
              </span>
            </div>
            <div className="text-xs text-brand-100 overflow-x-auto py-0.5">
              <InlineMath
                math={`\\text{Gain} = H(S) - E_{\\text{weighted}} = ${parentEntropy.toFixed(4)} - ${currentGainDetail.weightedChildEntropy.toFixed(4)} = ${currentGainDetail.informationGain.toFixed(4)} \\text{ bits}`}
              />
            </div>
            <p className="text-xs text-brand-200 pt-1.5 border-t border-brand-800/80 leading-relaxed">
              {activeAttribute === bestAttribute.attribute ? (
                <span>
                  🏆 <strong>Optimal Choice!</strong> This attribute removes the highest amount of uncertainty ({currentGainDetail.informationGain.toFixed(4)} bits). ID3 selects this feature as the test node.
                </span>
              ) : (
                <span>
                  Testing {activeAttribute} removes {currentGainDetail.informationGain.toFixed(4)} bits of uncertainty. However, <strong>{bestAttribute.attribute}</strong> is superior with {bestAttribute.informationGain.toFixed(4)} bits.
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
