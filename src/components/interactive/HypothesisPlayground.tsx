import React, { useState, useMemo } from 'react';
import { Point2D } from '../../math/linearRegression';
import { fitPolynomial, evalPoly, polyMSE } from '../../math/hypothesis';
import { AlertTriangle, CheckCircle, Info, Sparkles, TrendingUp, Layers } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';
import { InlineMath, MathText } from '../common/MathFormula';

const TRAIN_POINTS: Point2D[] = [
  { x: 1, y: 1.8, id: 'tr1' },
  { x: 2, y: 2.1, id: 'tr2' },
  { x: 3, y: 3.5, id: 'tr3' },
  { x: 4, y: 3.9, id: 'tr4' },
  { x: 5, y: 5.2, id: 'tr5' },
  { x: 6, y: 5.8, id: 'tr6' },
  { x: 7, y: 7.1, id: 'tr7' },
];

const TEST_POINTS: Point2D[] = [
  { x: 1.5, y: 2.0, id: 'te1' },
  { x: 3.5, y: 3.6, id: 'te2' },
  { x: 5.5, y: 5.4, id: 'te3' },
];

export const HypothesisPlayground: React.FC = () => {
  const [degree, setDegree] = useState<number>(1);

  // Fit polynomial of chosen degree
  const coeffs = useMemo(() => fitPolynomial(TRAIN_POINTS, degree), [degree]);

  const trainMSE = useMemo(() => polyMSE(coeffs, TRAIN_POINTS), [coeffs]);
  const testMSE = useMemo(() => polyMSE(coeffs, TEST_POINTS), [coeffs]);

  // Coordinate mapping for SVG (Width: 380, Height: 240, Padding: 40)
  const mapX = (x: number) => 40 + (x / 8) * 300;
  const mapY = (y: number) => 210 - (y / 9) * 170;

  // Generate smooth polynomial curve
  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0.5; x <= 7.5; x += 0.1) {
      const y = evalPoly(coeffs, x);
      const clampedY = Math.max(-2, Math.min(12, y));
      pts.push(`${x === 0.5 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(clampedY).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [coeffs]);

  const isOverfitting = degree >= 5;
  const isGoodFit = degree === 2 || degree === 3;
  const isUnderfitting = degree === 1;

  const handleSelectDegree = (deg: number) => {
    setDegree(deg);
    if (deg === 2 || deg === 3) {
      triggerCelebration();
    }
  };

  return (
    <div className="playful-card p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-playful-softBorder gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-playful-cobalt/10 border border-playful-cobalt/25 text-playful-cobalt text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hypothesis Selection & Ockham's Razor</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-playful-ink">
            Polynomial Degree vs Overfitting Explorer
          </h3>
          <p className="text-xs sm:text-sm text-playful-muted mt-0.5">
            Compare training error vs unseen generalization test error across degrees 1 to 7.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOverfitting ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-playful-coral/20 text-rose-950 border border-playful-coral/40 shadow-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Overfitting (High Variance)
            </span>
          ) : isGoodFit ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-playful-mint/30 text-emerald-950 border border-playful-mint/80 shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> Ockham's Razor Preferred
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-playful-sunny/30 text-amber-950 border border-playful-sunny/80 shadow-sm">
              Underfitting (High Bias)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SVG Plot */}
        <div className="lg:col-span-7 bg-playful-cream/40 p-5 rounded-3xl border border-playful-softBorder">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-playful-ink flex items-center gap-1">
              <span>Hypothesis Curve</span>
              <InlineMath math="h(x)" />
              <span>vs Data</span>
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-playful-ink font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#26324B] inline-block"></span>
                Train Data (7)
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-bold">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#F5C94B] inline-block"></span>
                Unseen Test (3)
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center py-2 select-none">
            <svg viewBox="0 0 380 240" className="w-full max-w-lg h-auto">
              {/* Axes */}
              <line x1="40" y1="210" x2="350" y2="210" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="210" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="355" y="214" fontSize="10" fill="#667085">x</text>
              <text x="35" y="24" fontSize="10" fill="#667085">y</text>

              {/* Ticks on X */}
              {[2, 4, 6].map((t) => (
                <g key={t}>
                  <line x1={mapX(t)} y1="207" x2={mapX(t)} y2="213" stroke="#94a3b8" />
                  <text x={mapX(t)} y="225" fontSize="9" fill="#667085" textAnchor="middle" fontFamily="monospace">
                    {t}
                  </text>
                </g>
              ))}

              {/* Fitted Polynomial Curve */}
              <path
                d={curvePath}
                fill="none"
                stroke={isOverfitting ? '#FF8066' : isGoodFit ? '#10b981' : '#315CEB'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Training Points (Dark Ink Circles) */}
              {TRAIN_POINTS.map((pt) => (
                <circle
                  key={pt.id}
                  cx={mapX(pt.x)}
                  cy={mapY(pt.y)}
                  r="5.5"
                  fill="#26324B"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all hover:scale-125"
                />
              ))}

              {/* Unseen Test Points (Sunny Diamonds) */}
              {TEST_POINTS.map((pt) => (
                <polygon
                  key={pt.id}
                  points={`
                    ${mapX(pt.x)},${mapY(pt.y) - 6}
                    ${mapX(pt.x) + 6},${mapY(pt.y)}
                    ${mapX(pt.x)},${mapY(pt.y) + 6}
                    ${mapX(pt.x) - 6},${mapY(pt.y)}
                  `}
                  fill="#F5C94B"
                  stroke="#26324B"
                  strokeWidth="1.5"
                  className="transition-all hover:scale-125"
                />
              ))}
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-playful-muted pt-2 border-t border-playful-softBorder gap-2 overflow-x-auto">
            <span>Model Degree: <strong className="font-mono text-playful-cobalt font-black">d = {degree}</strong></span>
            <span className="truncate max-w-full font-mono text-playful-ink font-semibold">
              <InlineMath math={`h(x) = ${coeffs.map((c, i) => `${c >= 0 && i > 0 ? '+' : ''}${c.toFixed(2)}${i > 0 ? (i === 1 ? 'x' : `x^${i}`) : ''}`).join(' ')}`} />
            </span>
          </div>
        </div>

        {/* Right Column: Degree Stepper & Error Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Degree Stepper Buttons */}
          <div className="p-5 rounded-3xl bg-white border border-playful-softBorder shadow-playful-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-playful-ink block">
              Select Polynomial Degree:
            </span>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((deg) => (
                <button
                  key={deg}
                  onClick={() => handleSelectDegree(deg)}
                  className={`py-2 rounded-xl font-bold font-mono text-xs transition-all ${
                    degree === deg
                      ? 'bg-playful-cobalt text-white shadow-playful-sm scale-105'
                      : 'bg-playful-cream/60 border border-playful-softBorder text-playful-ink hover:bg-playful-cream'
                  }`}
                >
                  d={deg}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-playful-muted pt-1">
              <MathText text={`Higher degrees allow wilder curves ($m = ${degree + 1}$ parameters), increasing risk of memorizing noise.`} />
            </div>
          </div>

          {/* Train vs Test MSE Comparison */}
          <div className="grid grid-cols-2 gap-3">
            {/* Train MSE */}
            <div className="p-4 rounded-2xl bg-white border border-playful-softBorder shadow-playful-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-playful-muted">
                Training Error (MSE)
              </span>
              <div className="text-2xl font-black font-mono mt-1 text-playful-ink">
                {trainMSE.toFixed(4)}
              </div>
              <span className="text-[10px] text-playful-muted">Fits known samples</span>
            </div>

            {/* Test MSE */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                testMSE > 1.0
                  ? 'bg-playful-coral/15 border-playful-coral/40 shadow-playful-sm'
                  : 'bg-playful-mint/20 border-playful-mint/80 shadow-playful-sm'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-playful-muted">
                Unseen Test Error (MSE)
              </span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  testMSE > 1.0 ? 'text-playful-coral' : 'text-emerald-800'
                }`}
              >
                {testMSE.toFixed(4)}
              </div>
              <span className="text-[10px] text-playful-muted">Real-world generalization</span>
            </div>
          </div>

          {/* Explanation Callout */}
          <div className="p-5 rounded-2xl bg-white border border-playful-softBorder shadow-playful-sm text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-playful-cobalt">
              <Layers className="w-4 h-4" />
              <span>Ockham's Razor Diagnostic:</span>
            </div>
            {isOverfitting ? (
              <p className="text-rose-950 bg-playful-coral/20 p-3 rounded-xl border border-playful-coral/40 leading-relaxed">
                ⚠️ <strong>Overfitting Danger:</strong> At degree {degree}, training error is very small ({trainMSE.toFixed(3)}), but test error has spiked to {testMSE.toFixed(3)}! The curve is violently oscillating between points to fit random noise rather than the true trend.
              </p>
            ) : isUnderfitting ? (
              <p className="text-amber-950 bg-playful-sunny/20 p-3 rounded-xl border border-playful-sunny/50 leading-relaxed">
                📉 <strong>Underfitting (High Bias):</strong> Degree 1 fits a straight line. While simple, it has higher training error ({trainMSE.toFixed(3)}) because it fails to capture slight curvature.
              </p>
            ) : (
              <p className="text-emerald-900 bg-playful-mint/20 p-3 rounded-xl border border-playful-mint/60 leading-relaxed">
                ✨ <strong>Optimal Generalization:</strong> Degree {degree} balances simplicity and fit. Both training error ({trainMSE.toFixed(3)}) and unseen test error ({testMSE.toFixed(3)}) are minimized. Ockham's Razor advises choosing this model!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
