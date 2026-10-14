import React, { useState } from 'react';
import { PLAY_TENNIS_DATASET } from '../../data/datasets';
import { CheckCircle2, GitBranch, Play, RefreshCw, Sparkles } from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';

export const DecisionTreeBuilder: React.FC = () => {
  // Tree building state
  const [rootAttr, setRootAttr] = useState<string>('Outlook');
  const [sunnySplitAttr, setSunnySplitAttr] = useState<string>('Humidity');
  const [rainSplitAttr, setRainSplitAttr] = useState<string>('Wind');

  // Test sample prediction inputs
  const [testOutlook, setTestOutlook] = useState<string>('Sunny');
  const [testHumidity, setTestHumidity] = useState<string>('Normal');
  const [testWind, setTestWind] = useState<string>('Weak');
  const [testPrediction, setTestPrediction] = useState<string | null>(null);

  // Classify a sample through current built tree
  const handleClassify = () => {
    let result = '';
    if (rootAttr === 'Outlook') {
      if (testOutlook === 'Overcast') {
        result = 'Yes (100% Pure Overcast Leaf)';
      } else if (testOutlook === 'Sunny') {
        if (sunnySplitAttr === 'Humidity') {
          result = testHumidity === 'High' ? 'No (Sunny + High Humidity)' : 'Yes (Sunny + Normal Humidity)';
        } else {
          result = 'Undecided / Suboptimal split';
        }
      } else if (testOutlook === 'Rain') {
        if (rainSplitAttr === 'Wind') {
          result = testWind === 'Strong' ? 'No (Rain + Strong Wind)' : 'Yes (Rain + Weak Wind)';
        } else {
          result = 'Undecided / Suboptimal split';
        }
      }
    } else {
      result = 'Tree not optimal. Please select Outlook as root!';
    }
    setTestPrediction(result);
    if (result.startsWith('Yes') || result.startsWith('No')) {
      triggerCelebration();
    }
  };

  const isOptimalTree =
    rootAttr === 'Outlook' && sunnySplitAttr === 'Humidity' && rainSplitAttr === 'Wind';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Interactive Tree Induction
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Decision Tree Builder & Classifier
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isOptimalTree ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4" /> Optimal ID3 Tree Built!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              Incomplete / Custom Tree
            </span>
          )}
        </div>
      </div>

      {/* Visual Tree Canvas */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white mb-6 overflow-x-auto">
        <div className="min-w-[620px] flex flex-col items-center">
          {/* ROOT NODE */}
          <div className="flex flex-col items-center mb-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
              Level 0: Root Decision Node
            </div>
            <select
              value={rootAttr}
              onChange={(e) => setRootAttr(e.target.value)}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-sm border-2 border-brand-400 shadow-lg cursor-pointer text-center"
            >
              <option value="Outlook">Outlook (Highest Gain: 0.247)</option>
              <option value="Humidity">Humidity (Gain: 0.151)</option>
              <option value="Wind">Wind (Gain: 0.048)</option>
              <option value="Temperature">Temperature (Gain: 0.029)</option>
            </select>
          </div>

          {/* CONNECTOR LINES TO 3 BRANCHES */}
          <div className="w-full flex justify-between px-16 relative">
            <div className="w-1/3 border-t-2 border-slate-700 h-6"></div>
            <div className="w-1/3 border-t-2 border-slate-700 h-6"></div>
          </div>

          {/* 3 OUTLOOK BRANCHES */}
          <div className="w-full grid grid-cols-3 gap-4 text-center">
            {/* BRANCH 1: SUNNY */}
            <div className="flex flex-col items-center bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
                Branch: Sunny (2 Yes, 3 No)
              </div>
              <div className="text-[11px] text-slate-400 mb-2">Split mixed subset by:</div>
              <select
                value={sunnySplitAttr}
                onChange={(e) => setSunnySplitAttr(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 mb-3"
              >
                <option value="Humidity">Humidity (Gain: 0.971)</option>
                <option value="Wind">Wind</option>
                <option value="Temperature">Temperature</option>
              </select>

              {sunnySplitAttr === 'Humidity' ? (
                <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-slate-800 text-xs">
                  <div className="p-2 rounded bg-rose-950/60 border border-rose-800/80 text-rose-300 font-bold">
                    High ➔ No
                  </div>
                  <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-bold">
                    Normal ➔ Yes
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Suboptimal branch</div>
              )}
            </div>

            {/* BRANCH 2: OVERCAST (PURE) */}
            <div className="flex flex-col items-center bg-slate-900/80 p-3.5 rounded-xl border border-emerald-800/50">
              <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                Branch: Overcast (4 Yes, 0 No)
              </div>
              <div className="my-auto py-3">
                <div className="p-3 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-md">
                  Leaf: Play = Yes ✨
                </div>
                <div className="text-[10px] text-emerald-400 mt-2 font-mono">
                  Entropy = 0 (100% Pure, Stop Splitting)
                </div>
              </div>
            </div>

            {/* BRANCH 3: RAIN */}
            <div className="flex flex-col items-center bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
                Branch: Rain (3 Yes, 2 No)
              </div>
              <div className="text-[11px] text-slate-400 mb-2">Split mixed subset by:</div>
              <select
                value={rainSplitAttr}
                onChange={(e) => setRainSplitAttr(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 mb-3"
              >
                <option value="Wind">Wind (Gain: 0.971)</option>
                <option value="Humidity">Humidity</option>
                <option value="Temperature">Temperature</option>
              </select>

              {rainSplitAttr === 'Wind' ? (
                <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-slate-800 text-xs">
                  <div className="p-2 rounded bg-rose-950/60 border border-rose-800/80 text-rose-300 font-bold">
                    Strong ➔ No
                  </div>
                  <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-bold">
                    Weak ➔ Yes
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Suboptimal branch</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Test Sample Inference Tool */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Play className="w-4 h-4 text-brand-600" />
          Test New Example Prediction Through Your Tree
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Outlook:
            </label>
            <select
              value={testOutlook}
              onChange={(e) => setTestOutlook(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Sunny">Sunny</option>
              <option value="Overcast">Overcast</option>
              <option value="Rain">Rain</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Humidity:
            </label>
            <select
              value={testHumidity}
              onChange={(e) => setTestHumidity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Wind:
            </label>
            <select
              value={testWind}
              onChange={(e) => setTestWind(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Weak">Weak</option>
              <option value="Strong">Strong</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleClassify}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            Classify Test Instance
          </button>

          {testPrediction && (
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Prediction Output: <span className="text-brand-600 dark:text-brand-400 font-mono">{testPrediction}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
