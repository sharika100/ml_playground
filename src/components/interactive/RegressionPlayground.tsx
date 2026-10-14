import React, { useState, useMemo } from 'react';
import { Point2D, computeBestFitLine, evaluateLine } from '../../math/linearRegression';
import { triggerCelebration } from '../common/Celebration';
import { Wand2, RefreshCw, TrendingUp, HelpCircle } from 'lucide-react';

const INITIAL_POINTS: Point2D[] = [
  { x: 1, y: 1.5, id: 'p1' },
  { x: 2, y: 2.3, id: 'p2' },
  { x: 3, y: 2.8, id: 'p3' },
  { x: 4, y: 4.1, id: 'p4' },
  { x: 5, y: 4.9, id: 'p5' },
  { x: 6, y: 5.5, id: 'p6' },
  { x: 7, y: 7.2, id: 'p7' },
];

export const RegressionPlayground: React.FC = () => {
  const [points, setPoints] = useState<Point2D[]>(INITIAL_POINTS);
  const [slope, setSlope] = useState<number>(0.5);
  const [intercept, setIntercept] = useState<number>(1.0);
  const [showResiduals, setShowResiduals] = useState<boolean>(true);

  // Compute optimal analytical parameters
  const bestFit = useMemo(() => computeBestFitLine(points), [points]);

  // Evaluate current user line
  const metrics = useMemo(() => evaluateLine(points, slope, intercept), [points, slope, intercept]);

  // Evaluate optimal line
  const bestMetrics = useMemo(() => evaluateLine(points, bestFit.slope, bestFit.intercept), [points, bestFit]);

  const handleAutoFit = () => {
    setSlope(bestFit.slope);
    setIntercept(bestFit.intercept);
    triggerCelebration();
  };

  const handleReset = () => {
    setSlope(0.5);
    setIntercept(1.0);
    setPoints(INITIAL_POINTS);
  };

  // Coordinate mapping for SVG (Width: 360, Height: 240, Padding: 40)
  const mapX = (x: number) => 40 + (x / 8) * 280;
  const mapY = (y: number) => 200 - (y / 8) * 160;

  const lineX1 = 0;
  const lineY1 = intercept;
  const lineX2 = 8;
  const lineY2 = slope * 8 + intercept;

  const isNearOptimal = Math.abs(metrics.mse - bestMetrics.mse) < 0.05;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Linear Model Lab
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Linear Regression & Cost Function (MSE) Playground
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Auto Fit (OLS Solution)
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Chart */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Scatter Plot & Residuals (y - ŷ)
            </span>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showResiduals}
                onChange={(e) => setShowResiduals(e.target.checked)}
                className="rounded text-brand-600"
              />
              Show Residual Lines
            </label>
          </div>

          <div className="w-full flex justify-center">
            <svg viewBox="0 0 360 240" className="w-full max-w-lg h-auto">
              {/* Grid Lines */}
              {[2, 4, 6, 8].map((v) => (
                <React.Fragment key={v}>
                  <line x1={mapX(v)} y1="40" x2={mapX(v)} y2="200" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <line x1="40" y1={mapY(v)} x2="320" y2={mapY(v)} stroke="#e2e8f0" strokeDasharray="3,3" />
                </React.Fragment>
              ))}

              {/* Axes */}
              <line x1="40" y1="200" x2="320" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="40" y1="40" x2="40" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Labels */}
              <text x="325" y="204" fontSize="10" fill="#64748b">x</text>
              <text x="40" y="32" fontSize="10" fill="#64748b" textAnchor="middle">y</text>

              {/* Regression Line */}
              <line
                x1={mapX(lineX1)}
                y1={mapY(lineY1)}
                x2={mapX(lineX2)}
                y2={mapY(lineY2)}
                stroke="#0c8de4"
                strokeWidth="2.5"
              />

              {/* Residual Lines */}
              {showResiduals &&
                metrics.points.map((pt, i) => (
                  <line
                    key={i}
                    x1={mapX(pt.x)}
                    y1={mapY(pt.y)}
                    x2={mapX(pt.x)}
                    y2={mapY(pt.yPred)}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                  />
                ))}

              {/* Data Points */}
              {metrics.points.map((pt, i) => (
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
            </svg>
          </div>

          <div className="text-center text-xs text-slate-500 mt-2">
            Model: <span className="font-mono font-bold text-brand-600 dark:text-brand-400">y = {slope.toFixed(2)}x + {intercept.toFixed(2)}</span>
            {slope > 0 ? ' (Positive Linear Relationship)' : slope < 0 ? ' (Negative Linear Relationship)' : ' (Zero Slope / Constant)'}
          </div>
        </div>

        {/* Sliders & Real-Time Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Adjust Line Parameters:
            </h4>

            {/* Slope Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Slope (m / a₁): {slope.toFixed(2)}</span>
                <span className="text-slate-400 text-[11px]">Best: {bestFit.slope.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1"
                max="2"
                step="0.05"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Intercept Slider */}
            <div className="mb-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Intercept (b / a₀): {intercept.toFixed(2)}</span>
                <span className="text-slate-400 text-[11px]">Best: {bestFit.intercept.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="5"
                step="0.1"
                value={intercept}
                onChange={(e) => setIntercept(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Real-time Cost Function Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3">
            <div className="text-brand-400 font-bold uppercase tracking-wider text-[11px] flex justify-between">
              <span>Cost Function Performance</span>
              {isNearOptimal && <span className="text-emerald-400">✨ Optimal Fit</span>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Mean Squared Error (MSE)</div>
                <div className="text-lg font-bold text-amber-400">{metrics.mse.toFixed(4)}</div>
                <div className="text-[10px] text-slate-500">Goal: Minimize</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Goodness of Fit (R²)</div>
                <div className="text-lg font-bold text-emerald-400">{(metrics.r2 * 100).toFixed(1)}%</div>
                <div className="text-[10px] text-slate-500">Goal: Maximize</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
              <strong>Cost Function Intuition:</strong> MSE squares each error (y_i - ŷ_i)² to penalize large deviations. Gradient Descent iteratively nudges a₁ and a₀ in the opposite direction of the gradient to reach the minimum point of this error surface!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
