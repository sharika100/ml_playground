import React, { useState, useMemo } from 'react';
import { Point2D, computeBestFitLine, evaluateLine } from '../../math/linearRegression';
import { triggerCelebration } from '../common/Celebration';
import { Wand2, RefreshCw, TrendingUp, HelpCircle, CheckCircle2, Sliders } from 'lucide-react';
import { InlineMath, MathText } from '../common/MathFormula';

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
  const [showSquares, setShowSquares] = useState<boolean>(false);

  // Compute optimal analytical parameters via OLS
  const bestFit = useMemo(() => computeBestFitLine(points), [points]);

  // Evaluate current user line
  const metrics = useMemo(() => evaluateLine(points, slope, intercept), [points, slope, intercept]);

  // Evaluate optimal line
  const bestMetrics = useMemo(() => evaluateLine(points, bestFit.slope, bestFit.intercept), [points, bestFit]);

  const handleAutoFit = () => {
    setSlope(Number(bestFit.slope.toFixed(3)));
    setIntercept(Number(bestFit.intercept.toFixed(3)));
    triggerCelebration();
  };

  const handleReset = () => {
    setSlope(0.5);
    setIntercept(1.0);
    setPoints(INITIAL_POINTS);
  };

  // Coordinate mapping for SVG (Width: 380, Height: 240, Padding: 40)
  const mapX = (x: number) => 40 + (x / 8) * 300;
  const mapY = (y: number) => 200 - (y / 8) * 160;

  const lineX1 = 0;
  const lineY1 = intercept;
  const lineX2 = 8;
  const lineY2 = slope * 8 + intercept;

  const isNearOptimal = Math.abs(metrics.mse - bestMetrics.mse) < 0.04;
  const isOptimal = Math.abs(slope - bestFit.slope) < 0.02 && Math.abs(intercept - bestFit.intercept) < 0.05;

  return (
    <div className="playful-card p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-playful-softBorder gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-playful-cobalt/10 border border-playful-cobalt/25 text-playful-cobalt text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Linear Models & Optimization</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-playful-ink">
            Linear Regression & Cost Function (MSE) Playground
          </h3>
          <p className="text-xs sm:text-sm text-playful-muted mt-0.5">
            <MathText text="Adjust slope $a_1$ and intercept $a_0$ to minimize Mean Squared Error ($\text{MSE}$) and maximize $R^2$." />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFit}
            className="playful-btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-playful-sm transition-all hover:scale-105 active:scale-95"
          >
            <Wand2 className="w-4 h-4" />
            <span>Auto Fit (Analytical OLS)</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-playful-muted hover:text-playful-ink bg-playful-cream/60 border border-playful-softBorder shadow-sm"
            title="Reset to default line"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive SVG Chart */}
        <div className="lg:col-span-7 bg-playful-cream/40 p-5 rounded-3xl border border-playful-softBorder">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-playful-ink flex items-center gap-1">
              <span>Scatter Plot & Residuals</span>
              <InlineMath math="(y_i - \hat{y}_i)" />
            </span>
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 text-playful-ink cursor-pointer font-semibold">
                <input
                  type="checkbox"
                  checked={showResiduals}
                  onChange={(e) => setShowResiduals(e.target.checked)}
                  className="rounded text-playful-cobalt accent-playful-cobalt"
                />
                Drop Lines
              </label>
              <label className="flex items-center gap-1.5 text-playful-ink cursor-pointer font-semibold">
                <input
                  type="checkbox"
                  checked={showSquares}
                  onChange={(e) => setShowSquares(e.target.checked)}
                  className="rounded text-playful-cobalt accent-playful-cobalt"
                />
                <span className="flex items-center gap-1">
                  <span>Squared Areas</span>
                  <InlineMath math="(e_i^2)" />
                </span>
              </label>
            </div>
          </div>

          <div className="w-full flex justify-center py-2 select-none">
            <svg viewBox="0 0 380 240" className="w-full max-w-lg h-auto">
              {/* Axes */}
              <line x1="40" y1="200" x2="350" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Ticks on X and Y */}
              {[2, 4, 6, 8].map((t) => (
                <g key={t}>
                  <line x1={mapX(t)} y1="197" x2={mapX(t)} y2="203" stroke="#94a3b8" />
                  <text x={mapX(t)} y="215" fontSize="9" fill="#667085" textAnchor="middle" fontFamily="monospace">
                    {t}
                  </text>
                  <line x1="37" y1={mapY(t)} x2="43" y2={mapY(t)} stroke="#94a3b8" />
                  <text x="32" y={mapY(t) + 3} fontSize="9" fill="#667085" textAnchor="end" fontFamily="monospace">
                    {t}
                  </text>
                </g>
              ))}

              {/* Residual Squares */}
              {showSquares &&
                points.map((pt) => {
                  const yPred = slope * pt.x + intercept;
                  const residual = pt.y - yPred;
                  const py = mapY(pt.y);
                  const px = mapX(pt.x);
                  const predY = mapY(yPred);
                  const side = Math.abs(predY - py);
                  return (
                    <rect
                      key={`sq-${pt.id}`}
                      x={residual > 0 ? px : px - side}
                      y={Math.min(py, predY)}
                      width={side}
                      height={side}
                      fill="#FF8066"
                      fillOpacity="0.2"
                      stroke="#FF8066"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  );
                })}

              {/* Residual Drop Lines */}
              {showResiduals &&
                points.map((pt) => {
                  const yPred = slope * pt.x + intercept;
                  return (
                    <line
                      key={`res-${pt.id}`}
                      x1={mapX(pt.x)}
                      y1={mapY(pt.y)}
                      x2={mapX(pt.x)}
                      y2={mapY(yPred)}
                      stroke="#FF8066"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                  );
                })}

              {/* Fitted Regression Line: y = a0 + a1 * x */}
              <line
                x1={mapX(lineX1)}
                y1={mapY(lineY1)}
                x2={mapX(lineX2)}
                y2={mapY(lineY2)}
                stroke={isOptimal ? '#10b981' : '#315CEB'}
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Empirical Data Points */}
              {points.map((pt) => (
                <circle
                  key={pt.id}
                  cx={mapX(pt.x)}
                  cy={mapY(pt.y)}
                  r="6"
                  fill="#26324B"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all hover:scale-125"
                />
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-playful-muted pt-2 border-t border-playful-softBorder">
            <span className="flex items-center gap-1.5">
              <span>Model:</span>
              <span className="font-bold text-playful-cobalt">
                <InlineMath math={`\\hat{y} = ${intercept.toFixed(2)} + ${slope.toFixed(2)}x`} />
              </span>
            </span>
            <span>Target: Minimize sum of squared residual areas</span>
          </div>
        </div>

        {/* Right Column: Controls, MSE, R², and Feedback */}
        <div className="lg:col-span-5 space-y-6">
          {/* Sliders for Slope and Intercept */}
          <div className="p-5 rounded-3xl bg-white border border-playful-softBorder shadow-playful-sm space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-playful-ink mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-playful-cobalt" />
                  <span>Slope (<InlineMath math="a_1" />):</span>
                </span>
                <span className="font-mono text-sm text-playful-cobalt font-black">
                  {slope.toFixed(2)} (OLS: {bestFit.slope.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="-0.5"
                max="2.0"
                step="0.02"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-playful-cream rounded-lg appearance-none cursor-pointer accent-playful-cobalt border border-playful-softBorder"
              />
              <div className="flex justify-between text-[11px] text-playful-muted mt-1">
                <span>−0.5 (Downward)</span>
                <span>+2.0 (Steep)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-playful-ink mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-playful-cobalt" />
                  <span>Intercept (<InlineMath math="a_0" />):</span>
                </span>
                <span className="font-mono text-sm text-playful-cobalt font-black">
                  {intercept.toFixed(2)} (OLS: {bestFit.intercept.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="5.0"
                step="0.05"
                value={intercept}
                onChange={(e) => setIntercept(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-playful-cream rounded-lg appearance-none cursor-pointer accent-playful-cobalt border border-playful-softBorder"
              />
              <div className="flex justify-between text-[11px] text-playful-muted mt-1">
                <span>−2.0</span>
                <span>+5.0</span>
              </div>
            </div>
          </div>

          {/* Loss & Fit KPIs */}
          <div className="grid grid-cols-2 gap-3">
            {/* MSE Card */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isNearOptimal
                  ? 'bg-playful-mint/20 border-playful-mint/80 shadow-playful-sm'
                  : 'bg-white border-playful-softBorder shadow-playful-sm'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-playful-muted">
                Mean Squared Error (MSE)
              </span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  isNearOptimal ? 'text-emerald-800' : 'text-playful-coral'
                }`}
              >
                {metrics.mse.toFixed(4)}
              </div>
              <span className="text-[10px] text-playful-muted">OLS Minimum: {bestMetrics.mse.toFixed(4)}</span>
            </div>

            {/* R-Squared Card */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                metrics.r2 > 0.9
                  ? 'bg-playful-mint/20 border-playful-mint/80 shadow-playful-sm'
                  : 'bg-white border-playful-softBorder shadow-playful-sm'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-playful-muted flex items-center gap-1">
                <InlineMath math="R^2" />
                <span>Goodness of Fit</span>
              </span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  metrics.r2 > 0.9 ? 'text-emerald-800' : 'text-playful-ink'
                }`}
              >
                {(metrics.r2 * 100).toFixed(1)}%
              </div>
              <span className="text-[10px] text-playful-muted">
                <InlineMath math="R^2 = 1 - \frac{\text{SSE}}{\text{SST}}" />
              </span>
            </div>
          </div>

          {/* Educational Feedback */}
          <div className="p-5 rounded-2xl bg-white border border-playful-softBorder shadow-playful-sm text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-playful-cobalt">
              <CheckCircle2 className="w-4 h-4" />
              <span>Model Fit Diagnostic:</span>
            </div>
            {isOptimal ? (
              <p className="text-emerald-900 bg-playful-mint/20 p-3 rounded-xl border border-playful-mint/60 leading-relaxed">
                🎉 <strong>Perfect Least Squares Solution!</strong> <MathText text="This line minimizes the sum of squared errors $\sum (y_i - \hat{y}_i)^2$ analytically using the normal equations derived in Module 5." />
              </p>
            ) : isNearOptimal ? (
              <p className="text-amber-950 bg-playful-sunny/20 p-3 rounded-xl border border-playful-sunny/60 leading-relaxed">
                🔥 <strong>Very Close!</strong> Your parameters are almost identical to the analytical solution. Click "Auto Fit" to snap to the exact mathematical minimum.
              </p>
            ) : (
              <p className="text-playful-muted leading-relaxed">
                <MathText text="Notice the coral dotted lines: they represent residuals $e_i = y_i - \hat{y}_i$. By adjusting slope and intercept, your goal is to shrink these drop lines as small as possible." />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
