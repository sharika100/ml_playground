import React, { useState, useEffect, useCallback } from 'react';
import { ScenarioFrame, PredictionChallenge } from './ScenarioFrame';
import { triggerCelebration } from '../common/Celebration';
import { Compass, Sparkles, User, Sun, CloudRain, Cloud, CheckCircle2, XCircle } from 'lucide-react';

interface DayInstance {
  day: string;
  outlook: 'Sunny' | 'Overcast' | 'Rain';
  humidity: 'High' | 'Normal';
  wind: 'Strong' | 'Weak';
  truePlay: 'Yes' | 'No';
}

const TEST_DAYS: DayInstance[] = [
  { day: 'Day 1 (Overcast)', outlook: 'Overcast', humidity: 'High', wind: 'Weak', truePlay: 'Yes' },
  { day: 'Day 2 (Sunny + High Humidity)', outlook: 'Sunny', humidity: 'High', wind: 'Weak', truePlay: 'No' },
  { day: 'Day 3 (Sunny + Normal Humidity)', outlook: 'Sunny', humidity: 'Normal', wind: 'Strong', truePlay: 'Yes' },
  { day: 'Day 4 (Rain + Strong Wind)', outlook: 'Rain', humidity: 'High', wind: 'Strong', truePlay: 'No' },
  { day: 'Day 5 (Rain + Weak Wind)', outlook: 'Rain', humidity: 'Normal', wind: 'Weak', truePlay: 'Yes' },
];

export const DecisionTreeJourneyScenario: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [journeyStep, setJourneyStep] = useState<'root' | 'branch1' | 'node2' | 'leaf'>('root');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [currentActionDesc, setCurrentActionDesc] = useState<string>(
    'Player character stands at Root Decision Node (Outlook?).'
  );

  const activeDay = TEST_DAYS[selectedDayIdx];

  // Character traversal step
  const stepJourney = useCallback(() => {
    if (journeyStep === 'root') {
      setJourneyStep('branch1');
      setCurrentActionDesc(
        `Checking root feature: Outlook = "${activeDay.outlook}". Character walks down the ${activeDay.outlook} branch.`
      );
    } else if (journeyStep === 'branch1') {
      if (activeDay.outlook === 'Overcast') {
        // Direct pure leaf!
        setJourneyStep('leaf');
        triggerCelebration();
        setCurrentActionDesc(
          `Overcast branch reaches 100% Pure Leaf [4+, 0-]. Final Decision: YES (Play Tennis! 🎾)`
        );
      } else {
        setJourneyStep('node2');
        const nextNodeAttr = activeDay.outlook === 'Sunny' ? 'Humidity' : 'Wind';
        setCurrentActionDesc(
          `Arrived at Level 1 Decision Node (${nextNodeAttr}?). Examining feature value...`
        );
      }
    } else if (journeyStep === 'node2') {
      setJourneyStep('leaf');
      triggerCelebration();
      if (activeDay.outlook === 'Sunny') {
        const decision = activeDay.humidity === 'High' ? 'NO (Do Not Play)' : 'YES (Play Tennis)';
        setCurrentActionDesc(
          `Sunny + ${activeDay.humidity} Humidity reached leaf. Final Decision: ${decision}!`
        );
      } else {
        const decision = activeDay.wind === 'Strong' ? 'NO (Do Not Play)' : 'YES (Play Tennis)';
        setCurrentActionDesc(
          `Rain + ${activeDay.wind} Wind reached leaf. Final Decision: ${decision}!`
        );
      }
    } else {
      // Loop to next test day
      const nextIdx = (selectedDayIdx + 1) % TEST_DAYS.length;
      setSelectedDayIdx(nextIdx);
      setJourneyStep('root');
      setCurrentActionDesc(`Loaded ${TEST_DAYS[nextIdx].day}. Character returns to Root.`);
    }
  }, [activeDay, journeyStep, selectedDayIdx]);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = 1400 / speed;
    const interval = setInterval(() => {
      stepJourney();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isRunning, speed, stepJourney]);

  const handleReset = () => {
    setIsRunning(false);
    setSelectedDayIdx(0);
    setJourneyStep('root');
    setCurrentActionDesc('Tree walk reset to Root Node.');
  };

  const predictionChallenge: PredictionChallenge = {
    question:
      'When Outlook is "Overcast", why does the character immediately make a decision without checking Humidity or Wind?',
    options: [
      {
        id: 'opt-pure',
        label: 'Because the Overcast subset is 100% pure [4+, 0-] with Entropy H = 0.0 bits. Every recorded overcast day played tennis!',
        isCorrect: true,
        explanation:
          'ID3 terminates tree expansion at a node when all sample instances belong to the exact same class (Shannon Entropy = 0). Further questions are mathematically redundant.',
      },
      {
        id: 'opt-memory',
        label: 'Because decision trees have a fixed depth limit of 1 on cloudy days.',
        isCorrect: false,
        explanation: 'Tree depth is determined by class purity, not hardcoded weather rules.',
      },
      {
        id: 'opt-random',
        label: 'The character makes a random guess because Overcast weather is too uncertain.',
        isCorrect: false,
        explanation: 'Overcast has zero uncertainty in the training set (4 yes, 0 no).',
      },
    ],
  };

  return (
    <ScenarioFrame
      title="Scenario C: Build a Decision Tree & Character Journey"
      badge="Decision Trees • ID3 Induction & Traversal"
      badgeColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
      story="Watch a tennis player character walk through the branches of the ID3 decision tree based on incoming weather observations. Notice how the tree terminates as soon as a pure leaf (Entropy = 0) is reached."
      isRunning={isRunning}
      onTogglePlay={() => setIsRunning(!isRunning)}
      onStep={stepJourney}
      onReset={handleReset}
      speed={speed}
      onSpeedChange={setSpeed}
      prediction={predictionChallenge}
      userPrediction={userPrediction}
      onSelectPrediction={setUserPrediction}
      currentStepDescription={currentActionDesc}
      scientificExplanation="Decision Tree induction partitions a dataset S by selecting the attribute A with the highest Information Gain: Gain(S, A) = H(S) - ∑ (|S_v|/|S|) H(S_v). In the Play Tennis dataset, Outlook yields the highest gain (0.247 bits). The tree recurses on impure child subsets until all samples at a node share the same label (H = 0), producing pure terminal leaves."
      formalConcept="Module 5 Topic 3: Decision Tree Induction & ID3 Algorithm. Decision trees represent disjunctions of conjunctions of constraints on the attribute values of instances."
      followUpChallenge="Select a different Day Scenario from the pills below and observe how the path dynamically shifts through the tree hierarchy!"
      telemetry={
        <>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Current Node</span>
            <span className="font-bold text-emerald-400 text-sm">
              {journeyStep === 'root'
                ? 'Root (Outlook)'
                : journeyStep === 'branch1'
                ? `${activeDay.outlook} Branch`
                : journeyStep === 'node2'
                ? activeDay.outlook === 'Sunny'
                  ? 'Humidity Node'
                  : 'Wind Node'
                : 'Terminal Leaf'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Decision</span>
            <span
              className={`font-bold text-sm ${
                journeyStep === 'leaf'
                  ? activeDay.truePlay === 'Yes'
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {journeyStep === 'leaf' ? `${activeDay.truePlay} (Play)` : 'Evaluating...'}
            </span>
          </div>
        </>
      }
    >
      {/* Animated Decision Tree SVG Stage */}
      <div className="p-6 sm:p-8 flex flex-col items-center select-none space-y-6">
        {/* Test Day Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TEST_DAYS.map((d, i) => (
            <button
              key={d.day}
              onClick={() => {
                setSelectedDayIdx(i);
                setJourneyStep('root');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDayIdx === i
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        {/* Tree Visual Representation */}
        <div className="w-full max-w-2xl relative py-4 flex flex-col items-center">
          {/* ROOT NODE */}
          <div
            className={`px-5 py-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center shadow-xl ${
              journeyStep === 'root'
                ? 'bg-brand-600 border-white ring-4 ring-brand-400/50 scale-105'
                : 'bg-slate-900 border-slate-700'
            }`}
          >
            <span className="text-[9px] uppercase font-bold text-slate-400">Root Node (Gain = 0.247)</span>
            <span className="text-sm font-black text-white">Outlook?</span>
            <span className="text-[10px] text-slate-400 font-mono">[9+, 5−] Total</span>

            {/* Character at Root */}
            {journeyStep === 'root' && (
              <div className="absolute -top-7 animate-bounce">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow-md flex items-center gap-1">
                  <User className="w-3 h-3" /> Player Here
                </span>
              </div>
            )}
          </div>

          {/* SVG Connector Lines */}
          <svg viewBox="0 0 600 50" className="w-full max-w-xl h-[45px] my-1">
            <line
              x1="300"
              y1="0"
              x2="120"
              y2="45"
              stroke={activeDay.outlook === 'Sunny' && journeyStep !== 'root' ? '#f59e0b' : '#334155'}
              strokeWidth={activeDay.outlook === 'Sunny' && journeyStep !== 'root' ? '3' : '1.5'}
            />
            <line
              x1="300"
              y1="0"
              x2="300"
              y2="45"
              stroke={activeDay.outlook === 'Overcast' && journeyStep !== 'root' ? '#10b981' : '#334155'}
              strokeWidth={activeDay.outlook === 'Overcast' && journeyStep !== 'root' ? '3' : '1.5'}
            />
            <line
              x1="300"
              y1="0"
              x2="480"
              y2="45"
              stroke={activeDay.outlook === 'Rain' && journeyStep !== 'root' ? '#3b82f6' : '#334155'}
              strokeWidth={activeDay.outlook === 'Rain' && journeyStep !== 'root' ? '3' : '1.5'}
            />
          </svg>

          {/* LEVEL 1: THREE BRANCHES */}
          <div className="w-full grid grid-cols-3 gap-3 text-center">
            {/* SUNNY BRANCH */}
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-2xl border transition-all text-xs w-full relative ${
                  activeDay.outlook === 'Sunny' && journeyStep !== 'root'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 ring-2 ring-amber-400/40 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {activeDay.outlook === 'Sunny' && journeyStep === 'branch1' && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce">
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black shadow-md flex items-center gap-1">
                      <User className="w-3 h-3" /> Walking...
                    </span>
                  </div>
                )}
                <div className="font-extrabold flex items-center justify-center gap-1 text-amber-300">
                  <Sun className="w-3.5 h-3.5" /> Sunny
                </div>
                <div className="font-mono text-[10px] text-slate-400">[2+, 3−] • Sub-split: Humidity?</div>
              </div>

              {/* Leaf for Sunny */}
              {activeDay.outlook === 'Sunny' && journeyStep === 'leaf' && (
                <div className="mt-4 p-3 rounded-2xl border-2 text-xs animate-fade-in bg-slate-900 border-white shadow-2xl">
                  <div className="font-black text-sm text-white">
                    {activeDay.humidity === 'High' ? '🏠 NO PLAY' : '🎾 PLAY TENNIS'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Sunny + {activeDay.humidity} Humidity (Pure)
                  </div>
                </div>
              )}
            </div>

            {/* OVERCAST BRANCH (Direct Pure Leaf) */}
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-2xl border-2 transition-all text-xs w-full relative ${
                  activeDay.outlook === 'Overcast' && journeyStep !== 'root'
                    ? 'bg-emerald-600 border-white text-white ring-4 ring-emerald-400/50 shadow-2xl scale-105'
                    : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                }`}
              >
                {activeDay.outlook === 'Overcast' && journeyStep === 'leaf' && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce">
                    <span className="px-2 py-0.5 rounded-full bg-white text-emerald-900 text-[10px] font-black shadow-md flex items-center gap-1">
                      🎾 Playing Tennis!
                    </span>
                  </div>
                )}
                <div className="font-black flex items-center justify-center gap-1">
                  <Cloud className="w-3.5 h-3.5" /> Overcast
                </div>
                <div className="font-mono text-[10px] text-emerald-200">[4+, 0−] • 100% Pure Leaf!</div>
                <div className="text-[9px] text-emerald-100 font-bold mt-1">H = 0.000 bits</div>
              </div>
            </div>

            {/* RAIN BRANCH */}
            <div className="flex flex-col items-center">
              <div
                className={`p-3 rounded-2xl border transition-all text-xs w-full relative ${
                  activeDay.outlook === 'Rain' && journeyStep !== 'root'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-200 ring-2 ring-blue-400/40 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {activeDay.outlook === 'Rain' && journeyStep === 'branch1' && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce">
                    <span className="px-2 py-0.5 rounded-full bg-blue-400 text-slate-950 text-[9px] font-black shadow-md flex items-center gap-1">
                      <User className="w-3 h-3" /> Walking...
                    </span>
                  </div>
                )}
                <div className="font-extrabold flex items-center justify-center gap-1 text-blue-300">
                  <CloudRain className="w-3.5 h-3.5" /> Rain
                </div>
                <div className="font-mono text-[10px] text-slate-400">[3+, 2−] • Sub-split: Wind?</div>
              </div>

              {/* Leaf for Rain */}
              {activeDay.outlook === 'Rain' && journeyStep === 'leaf' && (
                <div className="mt-4 p-3 rounded-2xl border-2 text-xs animate-fade-in bg-slate-900 border-white shadow-2xl">
                  <div className="font-black text-sm text-white">
                    {activeDay.wind === 'Strong' ? '🏠 NO PLAY' : '🎾 PLAY TENNIS'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Rain + {activeDay.wind} Wind (Pure)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScenarioFrame>
  );
};
