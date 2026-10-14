import React, { useState, useMemo } from 'react';
import { calculateEntropy, calculateGini } from '../../math/entropy';
import { Sparkles, Gauge, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { InlineMath, MathText } from '../common/MathFormula';

export const EntropyExplorer: React.FC = () => {
  const [yesCount, setYesCount] = useState<number>(9);
  const [noCount, setNoCount] = useState<number>(5);
  const [metric, setMetric] = useState<'entropy' | 'gini'>('entropy');
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const counts = useMemo(() => [yesCount, noCount], [yesCount, noCount]);
  const total = yesCount + noCount;
  const pYes = total > 0 ? yesCount / total : 0;
  const pNo = total > 0 ? noCount / total : 0;

  const entropyResult = useMemo(() => calculateEntropy(counts), [counts]);
  const giniResult = useMemo(() => calculateGini(counts), [counts]);

  // SVG Curve points for binary entropy: p from 0 to 1
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
    return curvePoints
      .map((pt, i) => {
        const sx = 35 + pt.x * 230;
        const sy = 140 - pt.y * 115;
        return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      })
      .join(' ');
  }, [curvePoints]);

  const currentMarkerX = 35 + pYes * 230;
  const currentMarkerY = 140 - entropyResult.entropy * 115;

  // Toggle a sample token
  const handleToggleToken = (index: number) => {
    if (index < yesCount) {
      // It's currently Yes; convert to No if yesCount > 0
      if (yesCount > 0) {
        setYesCount((prev) => prev - 1);
        setNoCount((prev) => prev + 1);
      }
    } else {
      // It's currently No; convert to Yes if noCount > 0
      if (noCount > 0) {
        setNoCount((prev) => prev - 1);
        setYesCount((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all">
      {/* Header & Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Shannon Entropy & Impurity Explorer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Measure the exact uncertainty of a probability distribution in bits.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto border border-slate-200/60 dark:border-slate-700/60">
          <button
            onClick={() => setMetric('entropy')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              metric === 'entropy'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shannon Entropy (log₂)
          </button>
          <button
            onClick={() => setMetric('gini')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              metric === 'gini'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Gini Impurity (CART)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Controls & Tokens */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Tokens (Visual Sample Cards) */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Sample Set Tokens ({total} items)
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Click any token to flip</span>
            </div>

            <div className="flex flex-wrap gap-2 py-1">
              {Array.from({ length: total }).map((_, i) => {
                const isYes = i < yesCount;
                return (
                  <button
                    key={i}
                    onClick={() => handleToggleToken(i)}
                    className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-sm border ${
                      isYes
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400'
                        : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-400'
                    }`}
                    title={`Click to flip this item to ${isYes ? 'No' : 'Yes'}`}
                  >
                    {isYes ? '+' : '−'}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                Yes: {yesCount} ({total > 0 ? (pYes * 100).toFixed(1) : 0}%)
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                No: {noCount} ({total > 0 ? (pNo * 100).toFixed(1) : 0}%)
              </span>
            </div>
          </div>

          {/* Sliders */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                <span>Positive Class ("Yes"): {yesCount}</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">P = {pYes.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={yesCount}
                onChange={(e) => setYesCount(parseInt(e.target.value) || 0)}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                <span>Negative Class ("No"): {noCount}</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">P = {pNo.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={noCount}
                onChange={(e) => setNoCount(parseInt(e.target.value) || 0)}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Presets */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Curriculum Presets:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setYesCount(9); setNoCount(5); }}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all text-left"
                >
                  🎾 Play Tennis (9+, 5−)
                </button>
                <button
                  onClick={() => { setYesCount(7); setNoCount(7); }}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all text-left"
                >
                  ⚖️ Maximum Chaos (7+, 7−)
                </button>
                <button
                  onClick={() => { setYesCount(14); setNoCount(0); }}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all text-left"
                >
                  ✨ Pure Node (14+, 0−)
                </button>
                <button
                  onClick={() => { setYesCount(13); setNoCount(1); }}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all text-left"
                >
                  🎯 Highly Skewed (13+, 1−)
                </button>
              </div>
            </div>
          </div>

          {/* Uncertainty Meter KPI */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-900 to-slate-900 text-white shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                <Gauge className="w-4 h-4" />
                {metric === 'entropy' ? 'Shannon Entropy' : 'Gini Impurity'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {metric === 'entropy' ? 'H(S)' : 'Gini(S)'}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-black font-mono tracking-tight text-white">
                {metric === 'entropy' ? entropyResult.entropy.toFixed(4) : giniResult.gini.toFixed(4)}
              </span>
              <span className="text-sm font-medium text-slate-300">
                {metric === 'entropy' ? 'bits of uncertainty' : 'index (0 to 0.5)'}
              </span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 mb-3 border border-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  entropyResult.entropy > 0.8
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : entropyResult.entropy > 0.4
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{
                  width: `${Math.min(100, (metric === 'entropy' ? entropyResult.entropy : giniResult.gini * 2) * 100)}%`,
                }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {entropyResult.entropy === 0 ? (
                <span className="text-emerald-300 font-medium">
                  🌟 Pure Certainty (0.0 bits): Every single sample has the exact same class label. A classifier knows the outcome with 100% certainty.
                </span>
              ) : entropyResult.entropy >= 0.99 ? (
                <span className="text-rose-300 font-medium">
                  ⚠️ Maximum Uncertainty (1.0 bit): Exactly 50/50 balanced. Guessing the class has the exact same uncertainty as guessing a fair coin toss!
                </span>
              ) : (
                <span>
                  Partial Uncertainty: {entropyResult.entropy.toFixed(3)} bits. Splitting on a relevant feature will reduce this entropy towards 0.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic SVG Curve & Step-by-Step Numerical Derivation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Animated SVG Curve */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Binary Shannon Entropy Curve H(p)
              </span>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                p = {pYes.toFixed(2)}, H = {entropyResult.entropy.toFixed(3)} bits
              </span>
            </div>

            <div className="w-full flex justify-center py-2">
              <svg viewBox="0 0 300 165" className="w-full max-w-lg h-auto select-none">
                {/* Grid & Axes */}
                <line x1="35" y1="140" x2="265" y2="140" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="35" y1="25" x2="35" y2="140" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Y-axis Ticks */}
                <text x="26" y="29" fontSize="9" fill="#94a3b8" textAnchor="end" fontFamily="monospace">1.0</text>
                <text x="26" y="85" fontSize="9" fill="#94a3b8" textAnchor="end" fontFamily="monospace">0.5</text>
                <text x="26" y="143" fontSize="9" fill="#94a3b8" textAnchor="end" fontFamily="monospace">0.0</text>
                <line x1="32" y1="25" x2="265" y2="25" stroke="#f1f5f9" strokeDasharray="3,3" />
                <line x1="32" y1="82" x2="265" y2="82" stroke="#f1f5f9" strokeDasharray="3,3" />

                {/* X-axis Ticks */}
                <text x="35" y="154" fontSize="9" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">0.0</text>
                <text x="150" y="154" fontSize="9" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">p = 0.5</text>
                <text x="265" y="154" fontSize="9" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">1.0</text>

                {/* Smooth Curve */}
                <path d={svgPath} fill="none" stroke="#0c8de4" strokeWidth="3" strokeLinecap="round" />

                {/* Drop-line to X-axis */}
                <line
                  x1={currentMarkerX}
                  y1={currentMarkerY}
                  x2={currentMarkerX}
                  y2="140"
                  stroke="#f59e0b"
                  strokeDasharray="2,2"
                  strokeWidth="1.5"
                />

                {/* Pulse Ring around current point */}
                <circle
                  cx={currentMarkerX}
                  cy={currentMarkerY}
                  r="10"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />

                {/* Current Point Marker */}
                <circle
                  cx={currentMarkerX}
                  cy={currentMarkerY}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-1">
              Notice the perfect bell symmetry: <strong className="text-slate-700 dark:text-slate-200">H(p) = H(1 - p)</strong>. The peak uncertainty always occurs at <strong className="text-brand-600 dark:text-brand-400">p = 0.5</strong>.
            </div>
          </div>

          {/* Stepped Numerical Derivation */}
          <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 text-xs border border-slate-800 shadow-md space-y-3">
            <div className="text-brand-400 font-bold uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Step-by-Step Numerical Substitution:</span>
              <span className="text-slate-400 font-normal">N = {total} samples</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="text-slate-300 overflow-x-auto py-0.5">
                1. Probabilities:{' '}
                <InlineMath math={`P(+) = \\frac{${yesCount}}{${total}} = ${pYes.toFixed(4)}, \\quad P(-) = \\frac{${noCount}}{${total}} = ${pNo.toFixed(4)}`} />
              </div>

              {metric === 'entropy' ? (
                <>
                  <div className="text-slate-400 overflow-x-auto py-0.5">
                    2. Shannon Formula:{' '}
                    <InlineMath math="H(S) = - P(+) \\log_2(P(+)) - P(-) \\log_2(P(-))" />
                  </div>
                  <div className="text-amber-300 overflow-x-auto py-0.5">
                    3. Substitution:{' '}
                    <InlineMath
                      math={`H(S) = ${yesCount > 0 ? `- (${pYes.toFixed(4)} \\cdot (${Math.log2(pYes).toFixed(4)}))` : '- 0'} ${noCount > 0 ? `- (${pNo.toFixed(4)} \\cdot (${Math.log2(pNo).toFixed(4)}))` : '- 0'}`}
                    />
                  </div>
                  <div className="text-emerald-400 font-bold text-sm pt-1.5 border-t border-slate-800">
                    4. Final Entropy: <InlineMath math={`H(S) = ${entropyResult.entropy.toFixed(4)} \\text{ bits}`} />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-slate-400 overflow-x-auto py-0.5">
                    2. Gini Formula:{' '}
                    <InlineMath math="\\text{Gini}(S) = 1 - \\left(P(+)^2 + P(-)^2\\right)" />
                  </div>
                  <div className="text-amber-300 overflow-x-auto py-0.5">
                    3. Substitution:{' '}
                    <InlineMath
                      math={`1 - \\left[(${pYes.toFixed(4)})^2 + (${pNo.toFixed(4)})^2\\right] = 1 - [${(pYes * pYes).toFixed(4)} + ${(pNo * pNo).toFixed(4)}]`}
                    />
                  </div>
                  <div className="text-emerald-400 font-bold text-sm pt-1.5 border-t border-slate-800">
                    4. Final Gini Impurity: <InlineMath math={`\\text{Gini}(S) = ${giniResult.gini.toFixed(4)}`} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Intuitive Explanation Callout */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60 text-xs text-brand-900 dark:text-brand-200 space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-brand-700 dark:text-brand-300">
                  <HelpCircle className="w-4 h-4" /> Why is Balanced Split Maximum Entropy?
                </span>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-brand-500 hover:text-brand-700 text-[11px]"
                >
                  Dismiss
                </button>
              </div>
              <p className="leading-relaxed">
                Imagine a coin toss: if the coin is fair (50% heads, 50% tails), your ability to predict the next toss is at its absolute worst—you have 1 full bit of uncertainty. But if the coin is weighted to land heads 100% of the time (pure set), you know the outcome with total certainty, so uncertainty is 0 bits!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
