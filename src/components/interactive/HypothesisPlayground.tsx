import React, { useState, useMemo } from 'react';
import { Point2D } from '../../math/linearRegression';
import { fitPolynomial, evalPoly, polyMSE } from '../../math/hypothesis';
import { AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';

const TRAIN_POINTS: Point2D[] = [
  { x: 1, y: 1.8 },
  { x: 2, y: 2.1 },
  { x: 3, y: 3.5 },
  { x: 4, y: 3.9 },
  { x: 5, y: 5.2 },
  { x: 6, y: 5.8 },
  { x: 7, y: 7.1 },
];

const TEST_POINTS: Point2D[] = [
  { x: 1.5, y: 2.0 },
  { x: 3.5, y: 3.6 },
  { x: 5.5, y: 5.4 },
];

export const HypothesisPlayground: React.FC = () => {
  const [degree, setDegree] = useState<number>(1);

  // Fit polynomial of chosen degree
  const coeffs = useMemo(() => fitPolynomial(TRAIN_POINTS, degree), [degree]);

  const trainMSE = useMemo(() => polyMSE(coeffs, TRAIN_POINTS), [coeffs]);
  const testMSE = useMemo(() => polyMSE(coeffs, TEST_POINTS), [coeffs]);

  // Coordinate mapping for SVG
  const mapX = (x: number) => 40 + (x / 8) * 280;
  const mapY = (y: number) => 210 - (y / 9) * 170;

  // Generate curve path
  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0.5; x <= 7.5; x += 0.1) {
      const y = evalPoly(coeffs, x);
      // clamp y reasonably for display
      const clampedY = Math.max(-2, Math.min(12, y));
      pts.push(`${x === 0.5 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(clampedY).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [coeffs]);

  const isOverfitting = degree >= 5;
  const isGoodFit = degree === 1 || degree === 2;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Hypothesis Selection & Ockham's Razor
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Polynomial Degree vs Overfitting Explorer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isOverfitting ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Overfitting Detected! (High Variance)
            </span>
          ) : isGoodFit ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Ockham's Razor Preferred (Good Generalization)
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              Intermediate Model
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Plot */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hypothesis Curve h(x) vs Training & Unseen Test Data
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white inline-block"></span> Train Data (7)
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Unseen Test Data (3)
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <svg viewBox="0 0 360 240" className="w-full max-w-lg h-auto">
              {/* Axes */}
              <line x1="40" y1="210" x2="330" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="335" y="214" fontSize="10" fill="#64748b">x</text>
              <text x="40" y="22" fontSize="10" fill="#64748b" textAnchor="middle">y</text>

              {/* Curve */}
              <path d={curvePath} fill="none" stroke={isOverfitting ? '#ef4444' : '#0c8de4'} strokeWidth="2.5" />

              {/* Train Points */}
              {TRAIN_POINTS.map((pt, i) => (
                <circle
                  key={i}
                  cx={mapX(pt.x)}
                  cy={mapY(pt.y)}
                  r="5"
                  fill="#0f172a"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              ))}

              {/* Test Points */}
              {TEST_POINTS.map((pt, i) => (
                <circle
                  key={i}
                  cx={mapX(pt.x)}
                  cy={mapY(pt.y)}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <div className="text-center text-xs text-slate-500 mt-2">
            Degree: <span className="font-bold text-slate-700 dark:text-slate-300">{degree}</span>
            {degree === 1 && ' (Linear Function h(x) = ax + b)'}
            {degree === 2 && ' (Quadratic Function h(x) = ax² + bx + c)'}
            {degree >= 5 && ' (High Degree Polynomial with Sharp Spikes)'}
          </div>
        </div>

        {/* Sliders & Generalization Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Polynomial Complexity (Degree): {degree}
            </label>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={degree}
              onChange={(e) => setDegree(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-4"
            />

            <div className="flex justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Degree 1 (Simple)</span>
              <span>Degree 3</span>
              <span>Degree 6 (Complex)</span>
            </div>
          </div>

          {/* Train vs Test Error Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3">
            <div className="text-brand-400 font-bold uppercase tracking-wider text-[11px]">
              Generalization Gap Evaluation:
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Training Error (MSE)</div>
                <div className="text-lg font-bold text-emerald-400">{trainMSE.toFixed(4)}</div>
                <div className="text-[10px] text-slate-500">{degree >= 5 ? 'Memorized noise!' : 'Good fit'}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Unseen Test Error (MSE)</div>
                <div className={`text-lg font-bold ${isOverfitting ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {testMSE.toFixed(4)}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isOverfitting ? 'Skyrockets on new data' : 'Generalizes well'}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
              <strong>Ockham's Razor Principle:</strong> "Prefer the simplest hypothesis consistent with the data." A high-degree polynomial achieves lower training error by weaving through noise, but its wild oscillations fail completely on novel examples!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
