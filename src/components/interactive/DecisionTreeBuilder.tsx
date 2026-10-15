import React, { useState } from 'react';
import { PLAY_TENNIS_DATASET } from '../../data/datasets';
import { CheckCircle2, Play, RefreshCw, Sparkles, HelpCircle, ArrowRight, Compass } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';

export const DecisionTreeBuilder: React.FC = () => {
  // Tree building state
  const [rootAttr, setRootAttr] = useState<string>('Outlook');
  const [sunnySplitAttr, setSunnySplitAttr] = useState<string>('Humidity');
  const [rainSplitAttr, setRainSplitAttr] = useState<string>('Wind');
  const [stepMode, setStepMode] = useState<number>(3); // 1 = root only, 2 = level 1, 3 = full tree

  // Test sample prediction inputs
  const [testOutlook, setTestOutlook] = useState<string>('Sunny');
  const [testHumidity, setTestHumidity] = useState<string>('Normal');
  const [testWind, setTestWind] = useState<string>('Weak');
  const [activePath, setActivePath] = useState<string[]>([]);
  const [testPrediction, setTestPrediction] = useState<{ label: string; explanation: string } | null>(null);

  // Classify a test sample and trace its path through the tree
  const handleClassify = () => {
    const path: string[] = ['root'];

    if (rootAttr === 'Outlook') {
      if (testOutlook === 'Overcast') {
        path.push('branch-overcast', 'leaf-overcast');
        setTestPrediction({
          label: 'Yes (Play Tennis)',
          explanation: 'Outlook = Overcast leads directly to a 100% pure leaf node [4+, 0-]. Tennis is played without needing to test any other attribute!',
        });
      } else if (testOutlook === 'Sunny') {
        path.push('branch-sunny');
        if (sunnySplitAttr === 'Humidity') {
          path.push('node-sunny');
          if (testHumidity === 'High') {
            path.push('branch-sunny-high', 'leaf-sunny-high');
            setTestPrediction({
              label: 'No (Do Not Play)',
              explanation: 'Sunny + High Humidity leads to a pure leaf [0+, 3-]. High humidity makes it too oppressive to play tennis under full sun.',
            });
          } else {
            path.push('branch-sunny-normal', 'leaf-sunny-normal');
            setTestPrediction({
              label: 'Yes (Play Tennis)',
              explanation: 'Sunny + Normal Humidity leads to a pure leaf [2+, 0-]. The weather conditions are ideal for outdoor tennis!',
            });
          }
        } else {
          setTestPrediction({
            label: 'Undecided / Impure Node',
            explanation: 'Suboptimal split chosen. In Mitchell Module 5, the Sunny branch requires testing Humidity (Gain = 0.971 bits) to reach purity.',
          });
        }
      } else if (testOutlook === 'Rain') {
        path.push('branch-rain');
        if (rainSplitAttr === 'Wind') {
          path.push('node-rain');
          if (testWind === 'Strong') {
            path.push('branch-rain-strong', 'leaf-rain-strong');
            setTestPrediction({
              label: 'No (Do Not Play)',
              explanation: 'Rain + Strong Wind leads to a pure leaf [0+, 2-]. Severe wind coupled with rain cancels the game.',
            });
          } else {
            path.push('branch-rain-weak', 'leaf-rain-weak');
            setTestPrediction({
              label: 'Yes (Play Tennis)',
              explanation: 'Rain + Weak Wind leads to a pure leaf [3+, 0-]. Light rain with calm wind still permits play.',
            });
          }
        } else {
          setTestPrediction({
            label: 'Undecided / Impure Node',
            explanation: 'Suboptimal split chosen. In Mitchell Module 5, the Rain branch requires testing Wind (Gain = 0.971 bits) to reach purity.',
          });
        }
      }
    } else {
      setTestPrediction({
        label: 'Suboptimal Root Chosen',
        explanation: 'Outlook has the highest Information Gain (0.247 bits). Starting with another root yields an incomplete tree with redundant questions.',
      });
    }

    setActivePath(path);
    triggerCelebration();
  };

  const isOptimalTree =
    rootAttr === 'Outlook' && sunnySplitAttr === 'Humidity' && rainSplitAttr === 'Wind';

  const isPathActive = (id: string) => activePath.includes(id);

  return (
    <div className="playful-card p-6 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-playful-softBorder gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-playful-cobalt/10 border border-playful-cobalt/25 text-playful-cobalt text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tree Induction</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-playful-ink">
            Decision Tree Builder & Classifier (ID3)
          </h3>
          <p className="text-xs sm:text-sm text-playful-muted mt-0.5">
            Induce decision branches based on Information Gain and trace predictions path-by-path.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOptimalTree ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-playful-mint/30 text-emerald-950 border border-playful-mint/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Optimal ID3 Tree (100% Purity)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-playful-sunny/30 text-amber-950 border border-playful-sunny/80 shadow-sm">
              Custom / Exploratory Split
            </span>
          )}
        </div>
      </div>

      {/* Control Bar: Stepped Pace and Split Attributes */}
      <div className="p-4 rounded-2xl bg-playful-cream/50 border border-playful-softBorder mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-playful-muted">Tree Depth:</span>
          <div className="inline-flex rounded-xl bg-playful-cream border border-playful-softBorder p-1">
            <button
              onClick={() => setStepMode(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 1 ? 'bg-playful-cobalt text-white shadow-playful-sm' : 'text-playful-muted hover:text-playful-ink'
              }`}
            >
              Step 1: Root Split
            </button>
            <button
              onClick={() => setStepMode(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 2 ? 'bg-playful-cobalt text-white shadow-playful-sm' : 'text-playful-muted hover:text-playful-ink'
              }`}
            >
              Step 2: Sub-branches
            </button>
            <button
              onClick={() => setStepMode(3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 3 ? 'bg-playful-cobalt text-white shadow-playful-sm' : 'text-playful-muted hover:text-playful-ink'
              }`}
            >
              Step 3: Full Leaves
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-playful-ink">Root Attribute:</span>
            <select
              value={rootAttr}
              onChange={(e) => setRootAttr(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-playful-softBorder font-bold text-playful-cobalt shadow-sm focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer"
            >
              <option value="Outlook">Outlook (Gain: 0.247 — Winner!)</option>
              <option value="Humidity">Humidity (Gain: 0.151)</option>
              <option value="Wind">Wind (Gain: 0.048)</option>
              <option value="Temperature">Temperature (Gain: 0.029)</option>
            </select>
          </div>

          {rootAttr === 'Outlook' && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-playful-ink">Sunny Branch:</span>
                <select
                  value={sunnySplitAttr}
                  onChange={(e) => setSunnySplitAttr(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-playful-softBorder font-bold text-playful-cobalt shadow-sm focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer"
                >
                  <option value="Humidity">Humidity (Gain: 0.971 — Pure!)</option>
                  <option value="Wind">Wind (Gain: 0.020)</option>
                  <option value="Temperature">Temperature (Gain: 0.571)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-playful-ink">Rain Branch:</span>
                <select
                  value={rainSplitAttr}
                  onChange={(e) => setRainSplitAttr(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-playful-softBorder font-bold text-playful-cobalt shadow-sm focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer"
                >
                  <option value="Wind">Wind (Gain: 0.971 — Pure!)</option>
                  <option value="Humidity">Humidity (Gain: 0.020)</option>
                  <option value="Temperature">Temperature (Gain: 0.020)</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Responsive Visual SVG Decision Tree Canvas */}
      <div className="p-6 rounded-3xl bg-playful-ink border border-playful-ink text-white shadow-playful-lg mb-8 overflow-x-auto">
        <div className="min-w-[720px] flex flex-col items-center py-2 select-none">
          {/* LEVEL 0: ROOT NODE */}
          <div
            className={`px-6 py-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center shadow-lg ${
              isPathActive('root')
                ? 'bg-brand-600 border-white ring-4 ring-brand-400/50 scale-105'
                : 'bg-brand-700 border-brand-400'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-200">
              Level 0: Root Split
            </span>
            <span className="text-base font-black text-white">{rootAttr}</span>
            <span className="text-xs text-brand-100 font-mono mt-0.5">
              Parent Data: [9+, 5−] • H = 0.940 bits
            </span>
          </div>

          {/* SVG CONNECTOR LINES FROM ROOT TO 3 BRANCHES */}
          {stepMode >= 1 && (
            <svg viewBox="0 0 680 60" className="w-[680px] h-[55px] overflow-visible my-1">
              {/* Left connector to Sunny */}
              <path
                d="M 340 0 L 120 50"
                stroke={isPathActive('branch-sunny') ? '#f59e0b' : '#475569'}
                strokeWidth={isPathActive('branch-sunny') ? '3.5' : '2'}
                strokeDasharray={isPathActive('branch-sunny') ? 'none' : '4,4'}
                fill="none"
              />
              {/* Middle connector to Overcast */}
              <path
                d="M 340 0 L 340 50"
                stroke={isPathActive('branch-overcast') ? '#10b981' : '#475569'}
                strokeWidth={isPathActive('branch-overcast') ? '3.5' : '2'}
                strokeDasharray={isPathActive('branch-overcast') ? 'none' : '4,4'}
                fill="none"
              />
              {/* Right connector to Rain */}
              <path
                d="M 340 0 L 560 50"
                stroke={isPathActive('branch-rain') ? '#3b82f6' : '#475569'}
                strokeWidth={isPathActive('branch-rain') ? '3.5' : '2'}
                strokeDasharray={isPathActive('branch-rain') ? 'none' : '4,4'}
                fill="none"
              />

              {/* Branch Labels */}
              <text x="210" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                Outlook = Sunny
              </text>
              <text x="350" y="28" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="start">
                Outlook = Overcast
              </text>
              <text x="470" y="24" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
                Outlook = Rain
              </text>
            </svg>
          )}

          {/* LEVEL 1: 3 CHILDREN NODES */}
          {stepMode >= 1 && (
            <div className="w-full grid grid-cols-3 gap-6 text-center">
              {/* Branch 1: Sunny Subtree */}
              <div className="flex flex-col items-center">
                <div
                  className={`px-4 py-2 rounded-xl border transition-all text-xs w-full max-w-[210px] ${
                    isPathActive('node-sunny') || isPathActive('branch-sunny')
                      ? 'bg-amber-950/80 border-amber-400 text-amber-200 ring-2 ring-amber-400/40'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-amber-300">Split: {sunnySplitAttr}</div>
                  <div className="font-mono text-[11px] text-slate-400">Subset: [2+, 3−] • H = 0.971</div>
                </div>

                {/* Subtree Connectors to Leaves */}
                {stepMode >= 2 && (
                  <>
                    <svg viewBox="0 0 200 45" className="w-[200px] h-[40px] my-1">
                      <path
                        d="M 100 0 L 40 38"
                        stroke={isPathActive('branch-sunny-high') ? '#ef4444' : '#475569'}
                        strokeWidth={isPathActive('branch-sunny-high') ? '3' : '1.5'}
                        fill="none"
                      />
                      <path
                        d="M 100 0 L 160 38"
                        stroke={isPathActive('branch-sunny-normal') ? '#10b981' : '#475569'}
                        strokeWidth={isPathActive('branch-sunny-normal') ? '3' : '1.5'}
                        fill="none"
                      />
                      <text x="50" y="16" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                        High
                      </text>
                      <text x="150" y="16" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Normal
                      </text>
                    </svg>

                    {/* Level 2 Leaves for Sunny */}
                    {stepMode >= 3 && (
                      <div className="w-full flex justify-between gap-2 px-1">
                        <div
                          className={`flex-1 p-2 rounded-xl border text-[11px] font-bold ${
                            isPathActive('leaf-sunny-high')
                              ? 'bg-rose-600 border-white text-white ring-2 ring-rose-400 shadow-lg scale-105'
                              : 'bg-rose-950/70 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div>NO</div>
                          <div className="text-[9px] font-mono opacity-80">[0+, 3−] Pure</div>
                        </div>
                        <div
                          className={`flex-1 p-2 rounded-xl border text-[11px] font-bold ${
                            isPathActive('leaf-sunny-normal')
                              ? 'bg-emerald-600 border-white text-white ring-2 ring-emerald-400 shadow-lg scale-105'
                              : 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                          }`}
                        >
                          <div>YES</div>
                          <div className="text-[9px] font-mono opacity-80">[2+, 0−] Pure</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Branch 2: Overcast Immediate Pure Leaf */}
              <div className="flex flex-col items-center">
                <div
                  className={`p-3 rounded-2xl border-2 transition-all text-xs w-full max-w-[210px] ${
                    isPathActive('leaf-overcast') || isPathActive('branch-overcast')
                      ? 'bg-emerald-600 border-white text-white ring-4 ring-emerald-400/50 scale-105 shadow-xl'
                      : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  }`}
                >
                  <div className="font-black text-sm">YES (100% Pure Leaf)</div>
                  <div className="font-mono text-[11px] text-emerald-300 mt-0.5">
                    Subset: [4+, 0−] • H = 0.000 bits
                  </div>
                  <div className="text-[10px] text-emerald-200 mt-1 italic">
                    No further questions needed!
                  </div>
                </div>
              </div>

              {/* Branch 3: Rain Subtree */}
              <div className="flex flex-col items-center">
                <div
                  className={`px-4 py-2 rounded-xl border transition-all text-xs w-full max-w-[210px] ${
                    isPathActive('node-rain') || isPathActive('branch-rain')
                      ? 'bg-blue-950/80 border-blue-400 text-blue-200 ring-2 ring-blue-400/40'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-blue-300">Split: {rainSplitAttr}</div>
                  <div className="font-mono text-[11px] text-slate-400">Subset: [3+, 2−] • H = 0.971</div>
                </div>

                {/* Subtree Connectors to Leaves */}
                {stepMode >= 2 && (
                  <>
                    <svg viewBox="0 0 200 45" className="w-[200px] h-[40px] my-1">
                      <path
                        d="M 100 0 L 40 38"
                        stroke={isPathActive('branch-rain-strong') ? '#ef4444' : '#475569'}
                        strokeWidth={isPathActive('branch-rain-strong') ? '3' : '1.5'}
                        fill="none"
                      />
                      <path
                        d="M 100 0 L 160 38"
                        stroke={isPathActive('branch-rain-weak') ? '#10b981' : '#475569'}
                        strokeWidth={isPathActive('branch-rain-weak') ? '3' : '1.5'}
                        fill="none"
                      />
                      <text x="50" y="16" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Strong
                      </text>
                      <text x="150" y="16" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Weak
                      </text>
                    </svg>

                    {/* Level 2 Leaves for Rain */}
                    {stepMode >= 3 && (
                      <div className="w-full flex justify-between gap-2 px-1">
                        <div
                          className={`flex-1 p-2 rounded-xl border text-[11px] font-bold ${
                            isPathActive('leaf-rain-strong')
                              ? 'bg-rose-600 border-white text-white ring-2 ring-rose-400 shadow-lg scale-105'
                              : 'bg-rose-950/70 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div>NO</div>
                          <div className="text-[9px] font-mono opacity-80">[0+, 2−] Pure</div>
                        </div>
                        <div
                          className={`flex-1 p-2 rounded-xl border text-[11px] font-bold ${
                            isPathActive('leaf-rain-weak')
                              ? 'bg-emerald-600 border-white text-white ring-2 ring-emerald-400 shadow-lg scale-105'
                              : 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                          }`}
                        >
                          <div>YES</div>
                          <div className="text-[9px] font-mono opacity-80">[3+, 0−] Pure</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Inference / Classify a New Instance */}
      <div className="p-6 rounded-3xl bg-playful-cream/40 border border-playful-softBorder">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-playful-softBorder gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-playful-cobalt flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Live Tree Inference
            </span>
            <h4 className="text-base font-bold text-playful-ink">
              Classify an Unseen Day Through the Tree
            </h4>
          </div>
          <button
            onClick={handleClassify}
            className="playful-btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-playful-sm transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trace Prediction Path</span>
          </button>
        </div>

        {/* Input Parameters for Unseen Day */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-playful-ink mb-1">
              Outlook Feature:
            </label>
            <select
              value={testOutlook}
              onChange={(e) => setTestOutlook(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-playful-softBorder text-xs font-semibold text-playful-ink focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer shadow-sm"
            >
              <option value="Sunny">Sunny</option>
              <option value="Overcast">Overcast</option>
              <option value="Rain">Rain</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-playful-ink mb-1">
              Humidity Feature:
            </label>
            <select
              value={testHumidity}
              onChange={(e) => setTestHumidity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-playful-softBorder text-xs font-semibold text-playful-ink focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer shadow-sm"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-playful-ink mb-1">
              Wind Feature:
            </label>
            <select
              value={testWind}
              onChange={(e) => setTestWind(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-playful-softBorder text-xs font-semibold text-playful-ink focus:border-playful-cobalt focus:ring-2 focus:ring-playful-cobalt/20 cursor-pointer shadow-sm"
            >
              <option value="Weak">Weak</option>
              <option value="Strong">Strong</option>
            </select>
          </div>
        </div>

        {/* Prediction Result Display */}
        {testPrediction && (
          <div className="p-4 rounded-2xl bg-white border border-playful-softBorder shadow-playful-sm animate-fade-in space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-playful-muted">
                Classification Result:
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-black shadow-sm ${
                  testPrediction.label.startsWith('Yes')
                    ? 'bg-playful-mint text-emerald-950'
                    : 'bg-playful-coral/20 text-rose-950 border border-playful-coral/40'
                }`}
              >
                {testPrediction.label}
              </span>
            </div>
            <p className="text-xs text-playful-muted leading-relaxed">
              {testPrediction.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
