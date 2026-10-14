import React, { useState, useMemo } from 'react';
import { calculateEntropy, calculateGini } from '../../math/entropy';
import { MathFormula } from '../common/MathFormula';
import { Callout } from '../common/Callout';
import { Info, Sparkles, RefreshCw } from 'lucide-react';

export const EntropyExplorer: React.FC = () => {
  const [yesCount, setYesCount] = useState<number>(9);
  const [noCount, setNoCount] = useState<number>(5);
  const [metric, setMetric] = useState<'entropy' | 'gini'>('entropy');

  const counts = useMemo(() => [yesCount, noCount], [yesCount, noCount]);
  const total = yesCount + noCount;
  const pYes = total > 0 ? yesCount / total : 0;

  const entropyResult = useMemo(() => calculateEntropy(counts), [counts]);
  const giniResult = useMemo(() => calculateGini(counts), [counts]);

  // SVG Curve points for binary entropy: p from 0.01 to 0.99
  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    pts.push({ x: 0, y: 0 });
    for (let p = 0.01; p <= 0.99; p += 0.02) {
      const h = -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
      pts.push({ x: p, y: h });
    }
    pts.push({ x: 1, y: 0 });
    return pts;
  }, []);

  const svgPath = useMemo(() => {
    // Map x (0..1) to width (0..300), y (0..1) to height (150..10)
    return curvePoints
      .map((pt, i) => {
        const sx = 30 + pt.x * 240;
        const sy = 140 - pt.y * 120;
        return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      })
      .join(' ');
  }, [curvePoints]);

  const currentMarkerX = 30 + pYes * 240;
  const currentMarkerY = 140 - entropyResult.entropy * 120;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Mathematical Intuition & Interactive Calculator
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Shannon Entropy & Impurity Explorer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMetric('entropy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${metric === 'entropy' ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            Shannon Entropy (log₂)
          </button>
          <button
            onClick={() => setMetric('gini')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${metric === 'gini' ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            Gini Index (CART)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls & Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center justify-between">
              <span>Adjust Sample Class Counts</span>
              <span className="text-xs font-normal text-slate-500">Total: {total}</span>
            </h4>

            {/* Class 1 (Yes) Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Positive Class ("Yes"): {yesCount}</span>
                <span className="text-slate-400 font-mono">p = {pYes.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={yesCount}
                onChange={(e) => setYesCount(parseInt(e.target.value) || 0)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Class 2 (No) Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Negative Class ("No"): {noCount}</span>
                <span className="text-slate-400 font-mono">p = {(1 - pYes).toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={noCount}
                onChange={(e) => setNoCount(parseInt(e.target.value) || 0)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {/* Quick Presets */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 block mb-2">Preset Scenarios:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setYesCount(9); setNoCount(5); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Play Tennis (9 Yes, 5 No)
                </button>
                <button
                  onClick={() => { setYesCount(10); setNoCount(10); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Max Uncertainty (10, 10)
                </button>
                <button
                  onClick={() => { setYesCount(14); setNoCount(0); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Pure Leaf (14, 0)
                </button>
                <button
                  onClick={() => { setYesCount(16); setNoCount(14); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Gym Dataset (16, 14)
                </button>
              </div>
            </div>
          </div>

          {/* Metric KPI Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-brand-900 to-navy-950 text-white shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
              {metric === 'entropy' ? 'Calculated Shannon Entropy' : 'Calculated Gini Impurity'}
            </span>
            <div className="text-4xl font-extrabold font-mono mt-1 mb-2 text-white flex items-baseline gap-2">
              <span>{metric === 'entropy' ? entropyResult.entropy.toFixed(4) : giniResult.gini.toFixed(4)}</span>
              <span className="text-sm font-normal text-brand-200">
                {metric === 'entropy' ? 'bits' : 'impurity index'}
              </span>
            </div>
            <p className="text-xs text-brand-100 leading-relaxed">
              {entropyResult.entropy === 0
                ? '🌟 Pure Node (0 uncertainty): All examples belong to one class. Further splitting is unnecessary.'
                : entropyResult.entropy === 1
                ? '⚠️ Maximum Disorder: Classes are split 50/50. A coin toss has the same uncertainty!'
                : `Contains mixed classes (${(pYes * 100).toFixed(1)}% Yes / ${((1 - pYes) * 100).toFixed(1)}% No). Information gain can be obtained by splitting.`}
            </p>
          </div>
        </div>

        {/* Visual Graph & Formula Derivation */}
        <div className="lg:col-span-7 space-y-5">
          {/* SVG Entropy Curve */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Shannon Entropy Curve H(p)
              </span>
              <span className="text-xs text-brand-600 dark:text-brand-400 font-mono">
                Current: p={pYes.toFixed(2)}, H={entropyResult.entropy.toFixed(3)}
              </span>
            </div>

            <div className="w-full flex justify-center py-2">
              <svg viewBox="0 0 300 160" className="w-full max-w-md h-auto">
                {/* Axes */}
                <line x1="30" y1="140" x2="270" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="30" y1="20" x2="30" y2="140" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis ticks */}
                <text x="22" y="24" fontSize="9" fill="#64748b" textAnchor="end">1.0</text>
                <text x="22" y="80" fontSize="9" fill="#64748b" textAnchor="end">0.5</text>
                <text x="22" y="143" fontSize="9" fill="#64748b" textAnchor="end">0.0</text>
                <line x1="27" y1="20" x2="270" y2="20" stroke="#e2e8f0" strokeDasharray="3,3" />
                <line x1="27" y1="80" x2="270" y2="80" stroke="#e2e8f0" strokeDasharray="3,3" />

                {/* X-axis ticks */}
                <text x="30" y="153" fontSize="9" fill="#64748b" textAnchor="middle">0.0</text>
                <text x="150" y="153" fontSize="9" fill="#64748b" textAnchor="middle">p = 0.5</text>
                <text x="270" y="153" fontSize="9" fill="#64748b" textAnchor="middle">1.0</text>

                {/* Curve */}
                <path d={svgPath} fill="none" stroke="#0c8de4" strokeWidth="2.5" />

                {/* Current point indicator */}
                <circle cx={currentMarkerX} cy={currentMarkerY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <line x1={currentMarkerX} y1={currentMarkerY} x2={currentMarkerX} y2="140" stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-center text-xs text-slate-500">
              Notice the symmetry: Entropy reaches peak 1.0 when classes are equally balanced (p = 0.5) and drops to 0 at the pure boundaries.
            </div>
          </div>

          {/* Step-by-Step Derivation */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
            <div className="text-brand-400 font-bold mb-2 uppercase tracking-wider text-[11px]">
              Step-by-Step Numerical Substitution:
            </div>
            <div className="space-y-1.5">
              <div>1. Total observations: N = {yesCount} + {noCount} = {total}</div>
              <div>2. Probabilities: P(Yes) = {yesCount}/{total} = {pYes.toFixed(4)}, P(No) = {noCount}/{total} = {(1 - pYes).toFixed(4)}</div>
              {metric === 'entropy' ? (
                <>
                  <div>3. Shannon Formula: H(S) = - P(Yes) * log2(P(Yes)) - P(No) * log2(P(No))</div>
                  <div className="text-amber-300">
                    4. Calculation:
                    {yesCount > 0 ? ` - (${pYes.toFixed(4)} * ${Math.log2(pYes).toFixed(4)})` : ' - 0'}
                    {noCount > 0 ? ` - (${(1 - pYes).toFixed(4)} * ${Math.log2(1 - pYes).toFixed(4)})` : ' - 0'}
                  </div>
                  <div className="text-emerald-400 font-bold">
                    5. Result: H(S) = {entropyResult.entropy.toFixed(4)} bits
                  </div>
                </>
              ) : (
                <>
                  <div>3. Gini Formula: Gini(S) = 1 - [P(Yes)^2 + P(No)^2]</div>
                  <div className="text-amber-300">
                    4. Calculation: 1 - [({pYes.toFixed(4)})^2 + ({(1 - pYes).toFixed(4)})^2] = 1 - [{(pYes * pYes).toFixed(4)} + {((1 - pYes) * (1 - pYes)).toFixed(4)}]
                  </div>
                  <div className="text-emerald-400 font-bold">
                    5. Result: Gini(S) = {giniResult.gini.toFixed(4)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
