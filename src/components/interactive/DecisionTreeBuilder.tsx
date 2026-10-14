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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tree Induction</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Decision Tree Builder & Classifier (ID3)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Induce decision branches based on Information Gain and trace predictions path-by-path.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOptimalTree ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" /> Optimal ID3 Tree (100% Purity)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Custom / Exploratory Split
            </span>
          )}
        </div>
      </div>

      {/* Control Bar: Stepped Pace and Split Attributes */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tree Depth:</span>
          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
            <button
              onClick={() => setStepMode(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 1 ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Step 1: Root Split
            </button>
            <button
              onClick={() => setStepMode(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 2 ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Step 2: Sub-branches
            </button>
            <button
              onClick={() => setStepMode(3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                stepMode === 3 ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Step 3: Full Leaves
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Root Attribute:</span>
            <select
              value={rootAttr}
              onChange={(e) => setRootAttr(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold text-brand-600 dark:text-brand-400"
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
                <span className="font-semibold text-slate-600 dark:text-slate-300">Sunny Branch:</span>
                <select
                  value={sunnySplitAttr}
                  onChange={(e) => setSunnySplitAttr(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold text-brand-600 dark:text-brand-400"
                >
                  <option value="Humidity">Humidity (Gain: 0.971 — Pure!)</option>
                  <option value="Wind">Wind (Gain: 0.020)</option>
                  <option value="Temperature">Temperature (Gain: 0.571)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Rain Branch:</span>
                <select
                  value={rainSplitAttr}
                  onChange={(e) => setRainSplitAttr(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold text-brand-600 dark:text-brand-400"
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
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-2xl mb-8 overflow-x-auto">
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
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-700/60 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Live Tree Inference
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Classify an Unseen Day Through the Tree
            </h4>
          </div>
          <button
            onClick={handleClassify}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trace Prediction Path</span>
          </button>
        </div>

        {/* Input Parameters for Unseen Day */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Outlook Feature:
            </label>
            <select
              value={testOutlook}
              onChange={(e) => setTestOutlook(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Sunny">Sunny</option>
              <option value="Overcast">Overcast</option>
              <option value="Rain">Rain</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Humidity Feature:
            </label>
            <select
              value={testHumidity}
              onChange={(e) => setTestHumidity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Wind Feature:
            </label>
            <select
              value={testWind}
              onChange={(e) => setTestWind(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Weak">Weak</option>
              <option value="Strong">Strong</option>
            </select>
          </div>
        </div>

        {/* Prediction Result Display */}
        {testPrediction && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-800 shadow-sm animate-fade-in space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Classification Result:
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-black ${
                  testPrediction.label.startsWith('Yes')
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {testPrediction.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {testPrediction.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
