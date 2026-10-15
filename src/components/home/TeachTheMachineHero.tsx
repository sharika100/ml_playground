import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  HelpCircle,
  ArrowRight,
  Cpu,
  Brain,
  Check,
  X,
  Target,
  RefreshCw,
  Film
} from 'lucide-react';
import { triggerCelebration } from '../common/Celebration';
import { InlineMath, MathText } from '../common/MathFormula';

export interface DataItem {
  id: string;
  name: string;
  icon: string;
  featureValue: number;
  featureName: string;
  featureUnit: string;
  trueClass: 'A' | 'B';
  description: string;
}

interface DatasetConfig {
  id: string;
  label: string;
  icon: string;
  classAName: string;
  classBName: string;
  classAIcon: string;
  classBIcon: string;
  classAColor: string;
  classBColor: string;
  featureLabel: string;
  ruleDescription: (thresh: number) => string;
  optimalRange: [number, number];
  items: DataItem[];
  challenge: {
    question: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

const DATASETS: DatasetConfig[] = [
  {
    id: 'fruit',
    label: 'Fruit Quality Sorter',
    icon: '🍎',
    classAName: 'Grade A Apple',
    classBName: 'Grade B Lemon',
    classAIcon: '🍎',
    classBIcon: '🍋',
    classAColor: 'emerald',
    classBColor: 'amber',
    featureLabel: 'Sugar Sweetness Index',
    ruleDescription: (thresh) => `If Sweetness ≥ ${thresh} → Grade A Apple 🍎, else Grade B Lemon 🍋`,
    optimalRange: [53, 61],
    items: [
      { id: 'f1', name: 'Crisp Honey Gala', icon: '🍎', featureValue: 88, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'A', description: 'Sun-ripened orchard harvest' },
      { id: 'f2', name: 'Sweet Fuji Apple', icon: '🍎', featureValue: 76, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'A', description: 'Crisp high-fructose sweetness' },
      { id: 'f3', name: 'Tart Granny Smith', icon: '🍎', featureValue: 62, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'A', description: 'Slightly tart but verified apple' },
      { id: 'f4', name: 'Meyer Sweet Lemon', icon: '🍋', featureValue: 52, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'B', description: 'Tricky hybrid lemon with mild sweetness' },
      { id: 'f5', name: 'Eureka Citrus Lemon', icon: '🍋', featureValue: 34, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'B', description: 'High citric acid sourness' },
      { id: 'f6', name: 'Wild Green Lime', icon: '🍋', featureValue: 18, featureName: 'Sweetness', featureUnit: '°Bx', trueClass: 'B', description: 'Extremely acidic citrus fruit' },
    ],
    challenge: {
      question: 'What happens if you set the threshold too low at θ = 45?',
      options: [
        {
          text: 'The Meyer Lemon (52°Bx) gets falsely classified as an Apple (False Positive)',
          isCorrect: true,
          explanation: 'Exactly! Because 52 ≥ 45, the model falsely labels the lemon as an apple. That is a Type I error (False Positive).'
        },
        {
          text: 'All fruits will be labeled as Lemons',
          isCorrect: false,
          explanation: 'Not quite—lower thresholds make it easier to predict Grade A (Apple), so more items become Apples, not Lemons.'
        },
        {
          text: 'The sorting accuracy will stay at 100%',
          isCorrect: false,
          explanation: 'False—Meyer Lemon will trigger a misclassification error, dropping accuracy to 83%.'
        }
      ]
    }
  },
  {
    id: 'email',
    label: 'Smart Spam Filter',
    icon: '🛡️',
    classAName: 'Spam Threat',
    classBName: 'Legitimate Work',
    classAIcon: '🚨',
    classBIcon: '💼',
    classAColor: 'rose',
    classBColor: 'indigo',
    featureLabel: 'Spam Suspicion Score',
    ruleDescription: (thresh) => `If Suspicion ≥ ${thresh} → Flag as Spam 🚨, else Inbox 💼`,
    optimalRange: [50, 62],
    items: [
      { id: 'e1', name: 'Crypto Wire Claim', icon: '🚨', featureValue: 94, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'A', description: 'Urgent money transfer from stranger' },
      { id: 'e2', name: 'Gift Card Claim', icon: '🚨', featureValue: 79, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'A', description: 'Suspicious link with prize claim' },
      { id: 'e3', name: 'Flash Sale Promo', icon: '🚨', featureValue: 63, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'A', description: 'Bulk marketing newsletter' },
      { id: 'e4', name: 'Urgent Client Memo', icon: '💼', featureValue: 48, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'B', description: 'Work email containing urgent keywords' },
      { id: 'e5', name: 'Project Milestone', icon: '💼', featureValue: 28, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'B', description: 'Internal team sprint check-in' },
      { id: 'e6', name: 'Cafeteria Weekly Menu', icon: '💼', featureValue: 12, featureName: 'Suspicion', featureUnit: '/100', trueClass: 'B', description: 'Standard workplace notice' },
    ],
    challenge: {
      question: 'Why does setting the threshold θ = 55 work better than θ = 70?',
      options: [
        {
          text: 'At θ = 55 it catches the Marketing Promo (63/100) without blocking work memos',
          isCorrect: true,
          explanation: 'Correct! At θ = 70, the Promo email escapes into the inbox (False Negative), lowering accuracy.'
        },
        {
          text: 'Higher thresholds always improve machine learning accuracy',
          isCorrect: false,
          explanation: 'Not true—if the threshold is too high, genuine spam slips through undetected.'
        },
        {
          text: 'Thresholds do not affect binary classification',
          isCorrect: false,
          explanation: 'Thresholds define the decision boundary that partitions feature space into class regions.'
        }
      ]
    }
  }
];

interface TeachTheMachineHeroProps {
  onStartLearning: () => void;
  onNavigateTab: (tab: string) => void;
}

export const TeachTheMachineHero: React.FC<TeachTheMachineHeroProps> = ({
  onStartLearning,
  onNavigateTab
}) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('fruit');
  const dataset = useMemo(
    () => DATASETS.find((d) => d.id === selectedDatasetId) || DATASETS[0],
    [selectedDatasetId]
  );

  // Classification Threshold theta
  const [threshold, setThreshold] = useState<number>(55);

  // Playback state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200); // ms per item
  const [robotMood, setRobotMood] = useState<'neutral' | 'scanning' | 'happy' | 'confused'>('neutral');
  const [robotMessage, setRobotMessage] = useState<string>('Ready to inspect data stream. Adjust the rule and press Run!');

  // Challenge state
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState<number | null>(null);
  const [hasShownCelebration, setHasShownCelebration] = useState<boolean>(false);

  // Classified history: map of item id -> { predicted: 'A' | 'B', isCorrect: boolean }
  const [classifiedResults, setClassifiedResults] = useState<
    Record<string, { predicted: 'A' | 'B'; isCorrect: boolean }>
  >({});

  // Reset when dataset changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsRunning(false);
    setClassifiedResults({});
    setRobotMood('neutral');
    setRobotMessage(`Switched to ${dataset.label}. Adjust θ and teach the robot how to classify!`);
    setSelectedChallengeIdx(null);
    setHasShownCelebration(false);
  }, [dataset]);

  // Evaluate single item using current threshold
  const evaluateItem = (item: DataItem, thresh: number): { predicted: 'A' | 'B'; isCorrect: boolean } => {
    const predicted: 'A' | 'B' = item.featureValue >= thresh ? 'A' : 'B';
    const isCorrect = predicted === item.trueClass;
    return { predicted, isCorrect };
  };

  // Full dataset metrics under current threshold
  const metrics = useMemo(() => {
    let tp = 0; // True Positives (True A, Predicted A)
    let tn = 0; // True Negatives (True B, Predicted B)
    let fp = 0; // False Positives (True B, Predicted A)
    let fn = 0; // False Negatives (True A, Predicted B)

    dataset.items.forEach((item) => {
      const pred = item.featureValue >= threshold ? 'A' : 'B';
      if (item.trueClass === 'A' && pred === 'A') tp++;
      else if (item.trueClass === 'B' && pred === 'B') tn++;
      else if (item.trueClass === 'B' && pred === 'A') fp++;
      else if (item.trueClass === 'A' && pred === 'B') fn++;
    });

    const total = dataset.items.length;
    const correctCount = tp + tn;
    const accuracy = Math.round((correctCount / total) * 100);

    return { tp, tn, fp, fn, total, correctCount, accuracy };
  }, [dataset, threshold]);

  // Auto-play loop
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= dataset.items.length) {
          setIsRunning(false);
          return prev;
        }

        const currentItem = dataset.items[prev];
        const res = evaluateItem(currentItem, threshold);

        setClassifiedResults((old) => ({
          ...old,
          [currentItem.id]: res
        }));

        if (res.isCorrect) {
          setRobotMood('happy');
          setRobotMessage(`Item #${prev + 1} (${currentItem.name}): ${currentItem.featureValue}${currentItem.featureUnit} matches ${res.predicted === 'A' ? dataset.classAName : dataset.classBName}! ✓`);
        } else {
          setRobotMood('confused');
          setRobotMessage(`MISMATCH! Item #${prev + 1} (${currentItem.name}) has ${currentItem.featureValue}${currentItem.featureUnit}. Predicted ${res.predicted === 'A' ? dataset.classAName : dataset.classBName}, but true label was ${currentItem.trueClass === 'A' ? dataset.classAName : dataset.classBName}! ⚠️`);
        }

        const next = prev + 1;
        if (next >= dataset.items.length) {
          setIsRunning(false);
          // Final check
          setTimeout(() => {
            const allCorrect = dataset.items.every(
              (it) => evaluateItem(it, threshold).isCorrect
            );
            if (allCorrect) {
              setRobotMood('happy');
              setRobotMessage('🎉 Outstanding! 100% Accuracy achieved! Decision boundary perfectly partitions the classes!');
              if (!hasShownCelebration) {
                triggerCelebration();
                setHasShownCelebration(true);
              }
            } else {
              setRobotMood('confused');
              setRobotMessage(`Stream complete. ${metrics.correctCount}/${metrics.total} classified correctly (${metrics.accuracy}% accuracy). Try tuning the threshold slider!`);
            }
          }, 300);
        }
        return next;
      });
    }, playbackSpeed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentIndex, dataset, threshold, playbackSpeed, metrics, hasShownCelebration]);

  const handleStep = () => {
    if (currentIndex >= dataset.items.length) return;
    const currentItem = dataset.items[currentIndex];
    const res = evaluateItem(currentItem, threshold);
    setClassifiedResults((old) => ({
      ...old,
      [currentItem.id]: res
    }));

    if (res.isCorrect) {
      setRobotMood('happy');
      setRobotMessage(`Inspected ${currentItem.name} (${currentItem.featureValue}${currentItem.featureUnit}). Correctly sorted to ${res.predicted === 'A' ? dataset.classAName : dataset.classBName}! ✓`);
    } else {
      setRobotMood('confused');
      setRobotMessage(`Misclassified ${currentItem.name}! Feature=${currentItem.featureValue}${currentItem.featureUnit}. Predicted ${res.predicted}, True=${currentItem.trueClass}.`);
    }

    const next = currentIndex + 1;
    setCurrentIndex(next);
    if (next >= dataset.items.length) {
      setIsRunning(false);
      const allCorrect = dataset.items.every(
        (it) => evaluateItem(it, threshold).isCorrect
      );
      if (allCorrect && !hasShownCelebration) {
        triggerCelebration();
        setHasShownCelebration(true);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentIndex(0);
    setClassifiedResults({});
    setRobotMood('neutral');
    setRobotMessage('Simulation reset. Modify the threshold θ or choose an item to inspect.');
    setHasShownCelebration(false);
  };

  const currentItemBeingScanned =
    currentIndex < dataset.items.length ? dataset.items[currentIndex] : null;

  return (
    <div className="space-y-10">
      {/* HERO BANNER & MISSION HEADLINE */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9EB] border border-[#F5C94B]/70 text-[#8C6B0F] text-xs font-extrabold shadow-playful-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A927]" />
          <span>Interactive Machine Learning Laboratory • Free & Open Access</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#26324B] tracking-tight leading-tight">
          Machine Learning made simple.{' '}
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#315CEB] via-[#FF8066] to-[#315CEB]">
            Understanding made interactive.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed">
          Explore concepts. Play with models. Understand the maths. Discover how machines learn. Train decision boundaries with live interactive feedback.
        </p>

        {/* TOP CTA BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onStartLearning}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#315CEB] hover:bg-[#2649C2] text-white font-extrabold text-sm shadow-playful-cobalt transition-all hover:scale-102 active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <button
            onClick={() => onNavigateTab('scenarios')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#FFF0ED] hover:bg-[#FFE0D9] text-[#C4462D] border border-[#FF8066]/40 font-extrabold text-sm shadow-sm transition-all hover:scale-102 active:scale-98"
          >
            <Film className="w-4 h-4 text-[#FF8066]" />
            <span>5 Animated Scenarios</span>
          </button>

          <button
            onClick={() => onNavigateTab('journey')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-[#FFF9F0] text-[#26324B] font-extrabold text-sm border-2 border-[#E8E5DE] shadow-playful-sm transition-all hover:scale-102 active:scale-98"
          >
            <Cpu className="w-4 h-4 text-[#315CEB]" />
            <span>Browse Lessons</span>
          </button>
        </div>
      </div>

      {/* TEACH THE MACHINE SCENARIO BOX */}
      <div className="rounded-3xl bg-white border border-[#E8E5DE] shadow-playful-lg overflow-hidden transition-all">
        {/* SCENARIO HEADER & DATASET PICKER */}
        <div className="p-5 sm:p-6 bg-[#FFF9F0] border-b border-[#E8E5DE] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#315CEB] animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#315CEB]">
                Interactive Hero Scenario • Supervised Learning
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#26324B] mt-1">
              Teach the Machine: Sorter Bot 3000
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Adjust the decision rule threshold θ. Guide the robot in sorting items into the correct categories!
            </p>
          </div>

          {/* Dataset Switcher Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-white border border-[#E8E5DE] shadow-sm self-start md:self-auto">
            {DATASETS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDatasetId(d.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedDatasetId === d.id
                    ? 'bg-[#315CEB] text-white shadow-playful-sm'
                    : 'text-[#667085] hover:text-[#26324B] hover:bg-[#FFF9F0]'
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN SIMULATION STAGE */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* TOP CONTROLS & RULE SLIDER */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#315CEB]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#26324B]">
                  Decision Boundary Rule
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF0FD] text-[#315CEB] border border-[#ADC4F9] font-mono font-bold">
                  θ = {threshold}
                </span>
              </div>
              <div className="text-xs text-[#667085] font-semibold">
                {dataset.ruleDescription(threshold)}
              </div>
            </div>

            {/* Slider with feature gradient */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>0 ({dataset.classBName})</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">Cutoff Threshold θ: {threshold}</span>
                <span>100 ({dataset.classAName})</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => {
                  setThreshold(parseInt(e.target.value) || 0);
                  // Reset celebration if user moves threshold
                  setHasShownCelebration(false);
                }}
                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Predicts {dataset.classBName} ←</span>
                <span className="text-brand-500 font-semibold">Boundary Line x = {threshold}</span>
                <span>→ Predicts {dataset.classAName}</span>
              </div>
            </div>

            {/* Playback action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-100 dark:border-brand-900/40">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause' : currentIndex === 0 ? 'Run Sorter' : 'Resume'}</span>
                </button>

                <button
                  onClick={handleStep}
                  disabled={isRunning || currentIndex >= dataset.items.length}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 transition-all"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Step</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Accuracy readout badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <Target className="w-3.5 h-3.5 text-brand-600" />
                  <span className="text-slate-500 dark:text-slate-400">Model Accuracy:</span>
                  <span
                    className={`font-mono font-black ${
                      metrics.accuracy === 100
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : metrics.accuracy >= 70
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {metrics.accuracy}% ({metrics.correctCount}/{metrics.total})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ARENA: ROBOT + SCANNER CHUTE + BINS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* LEFT / INCOMING QUEUE (COL 4) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Incoming Data Queue</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {dataset.items.length - currentIndex} remaining
                </span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {dataset.items.map((item, idx) => {
                  const isCurrent = idx === currentIndex;
                  const res = classifiedResults[item.id];
                  const hasBeenClassified = !!res;

                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                        isCurrent
                          ? 'bg-brand-100/80 dark:bg-brand-950/80 border-brand-500 shadow-md ring-2 ring-brand-400/40 translate-x-1'
                          : hasBeenClassified
                          ? res.isCorrect
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 opacity-80'
                            : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 opacity-80'
                          : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <span>{item.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-600 text-white font-mono uppercase">
                                Scanning
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.featureName}: <strong className="font-mono text-slate-700 dark:text-slate-300">{item.featureValue}{item.featureUnit}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        {hasBeenClassified ? (
                          <div className="flex items-center gap-1">
                            {res.isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" /> Correct
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-full">
                                <X className="w-3 h-3" /> Error
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            True: {item.trueClass === 'A' ? dataset.classAName : dataset.classBName}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CENTER / ANIMATED ROBOT & SCANNER CHAMBER (COL 4) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#FFF9F0] via-white to-white border border-[#E8E5DE] text-center relative overflow-hidden shadow-inner min-h-[320px]">
              {/* Background scanner lasers */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#315CEB] to-transparent animate-pulse absolute top-1/3" />
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#F5C94B] to-transparent animate-pulse absolute top-2/3" />
              </div>

              {/* ROBOT SVG CHARACTER */}
              <div className="relative mb-3 transition-transform duration-300 transform hover:scale-105">
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-md"
                >
                  {/* Antenna */}
                  <line x1="50" y1="18" x2="50" y2="4" stroke="#315CEB" strokeWidth="3" strokeLinecap="round" />
                  <circle
                    cx="50"
                    cy="4"
                    r={robotMood === 'happy' ? 5 : 3.5}
                    fill={
                      robotMood === 'happy'
                        ? '#247D5C'
                        : robotMood === 'confused'
                        ? '#FF8066'
                        : '#315CEB'
                    }
                    className={robotMood === 'happy' ? 'animate-ping' : ''}
                  />

                  {/* Robot Head */}
                  <rect x="22" y="18" width="56" height="42" rx="12" fill="#26324B" stroke="#344465" strokeWidth="2.5" />

                  {/* Ears / Sensors */}
                  <rect x="16" y="32" width="6" height="14" rx="2" fill="#667085" />
                  <rect x="78" y="32" width="6" height="14" rx="2" fill="#667085" />

                  {/* Screen Face */}
                  <rect x="28" y="24" width="44" height="28" rx="8" fill="#1A2333" />

                  {/* Eyes depending on mood */}
                  {robotMood === 'happy' ? (
                    <>
                      {/* Happy curved eyes */}
                      <path d="M 36 38 Q 41 33 46 38" stroke="#A8E6CF" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 54 38 Q 59 33 64 38" stroke="#A8E6CF" strokeWidth="3" strokeLinecap="round" />
                      {/* Smile */}
                      <path d="M 43 45 Q 50 49 57 45" stroke="#A8E6CF" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : robotMood === 'confused' ? (
                    <>
                      {/* Confused / error eyes */}
                      <circle cx="41" cy="37" r="3.5" fill="#FF8066" />
                      <line x1="55" y1="34" x2="63" y2="42" stroke="#FF8066" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="63" y1="34" x2="55" y2="42" stroke="#FF8066" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Wavy mouth */}
                      <path d="M 43 46 Q 47 43 51 46 T 57 46" stroke="#F5C94B" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Neutral / scanning eyes */}
                      <circle cx="41" cy="37" r="3" fill="#60A5FA" className="animate-pulse" />
                      <circle cx="59" cy="37" r="3" fill="#60A5FA" className="animate-pulse" />
                      {/* Line mouth */}
                      <line x1="44" y1="46" x2="56" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}

                  {/* Robot Neck */}
                  <rect x="44" y="60" width="12" height="6" fill="#475569" />

                  {/* Robot Body */}
                  <rect x="26" y="66" width="48" height="28" rx="8" fill="#26324B" stroke="#344465" strokeWidth="2" />

                  {/* Meter on body */}
                  <rect x="34" y="74" width="32" height="12" rx="4" fill="#1A2333" />
                  <line
                    x1="38"
                    y1="80"
                    x2={38 + (threshold / 100) * 24}
                    y2="80"
                    stroke="#F5C94B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Speech bubble / status */}
              <div className="w-full bg-white p-3 rounded-2xl border border-[#E8E5DE] shadow-playful-sm text-center relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#315CEB] block mb-0.5">
                  Classifier Bot Diagnostics
                </span>
                <p className="text-xs text-[#26324B] font-medium leading-tight">
                  {robotMessage}
                </p>
              </div>

              {/* Item currently in scanner */}
              {currentItemBeingScanned && (
                <div className="mt-4 p-2.5 rounded-xl bg-[#EBF0FD] border border-[#315CEB]/30 flex items-center gap-2 text-xs font-semibold text-[#315CEB] animate-pulse">
                  <span className="text-base">{currentItemBeingScanned.icon}</span>
                  <span>Scanning: {currentItemBeingScanned.name} ({currentItemBeingScanned.featureValue}{currentItemBeingScanned.featureUnit})</span>
                </div>
              )}
            </div>

            {/* RIGHT / OUTPUT SORTING BINS (COL 4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#667085] flex items-center justify-between">
                <span>Classification Bins</span>
                <span className="text-[10px] text-[#667085]">Predicted classes</span>
              </div>

              {/* BIN A (Sweet / Positive) */}
              <div className="p-4 rounded-2xl bg-[#F0FAF6] border-2 border-[#A8E6CF] space-y-2 shadow-playful-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{dataset.classAIcon}</span>
                    <span className="font-bold text-xs text-[#1F6B4F]">
                      {dataset.classAName} (≥ {threshold})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#1F6B4F] bg-[#A8E6CF]/50 px-2 py-0.5 rounded-full">
                    {Object.values(classifiedResults).filter((r) => r.predicted === 'A').length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[42px] items-center p-2 rounded-xl bg-white border border-[#A8E6CF]/60">
                  {Object.entries(classifiedResults)
                    .filter(([_, r]) => r.predicted === 'A')
                    .map(([id, r]) => {
                      const item = dataset.items.find((i) => i.id === id);
                      if (!item) return null;
                      return (
                        <span
                          key={id}
                          className={`text-xs px-2 py-1 rounded-lg border font-medium flex items-center gap-1 shadow-sm ${
                            r.isCorrect
                              ? 'bg-[#E6F8F0] text-[#1F6B4F] border-[#A8E6CF]'
                              : 'bg-[#FFF0ED] text-[#C4462D] border-[#FF8066]'
                          }`}
                          title={r.isCorrect ? 'Correct Classification' : 'False Positive (Error)'}
                        >
                          <span>{item.icon}</span>
                          <span className="text-[10px]">{item.name.split(' ')[0]}</span>
                          {r.isCorrect ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                        </span>
                      );
                    })}
                  {Object.values(classifiedResults).filter((r) => r.predicted === 'A').length === 0 && (
                    <span className="text-[11px] text-[#667085] italic">Bin empty...</span>
                  )}
                </div>
              </div>

              {/* BIN B (Sour / Negative) */}
              <div className="p-4 rounded-2xl bg-[#FFF0ED] border-2 border-[#FF8066]/50 space-y-2 shadow-playful-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{dataset.classBIcon}</span>
                    <span className="font-bold text-xs text-[#C4462D]">
                      {dataset.classBName} (&lt; {threshold})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#C4462D] bg-[#FF8066]/20 px-2 py-0.5 rounded-full">
                    {Object.values(classifiedResults).filter((r) => r.predicted === 'B').length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[42px] items-center p-2 rounded-xl bg-white border border-[#FF8066]/30">
                  {Object.entries(classifiedResults)
                    .filter(([_, r]) => r.predicted === 'B')
                    .map(([id, r]) => {
                      const item = dataset.items.find((i) => i.id === id);
                      if (!item) return null;
                      return (
                        <span
                          key={id}
                          className={`text-xs px-2 py-1 rounded-lg border font-medium flex items-center gap-1 shadow-sm ${
                            r.isCorrect
                              ? 'bg-[#FEF9EB] text-[#8C6B0F] border-[#F5C94B]'
                              : 'bg-[#FFF0ED] text-[#C4462D] border-[#FF8066]'
                          }`}
                          title={r.isCorrect ? 'Correct Classification' : 'False Negative (Error)'}
                        >
                          <span>{item.icon}</span>
                          <span className="text-[10px]">{item.name.split(' ')[0]}</span>
                          {r.isCorrect ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                        </span>
                      );
                    })}
                  {Object.values(classifiedResults).filter((r) => r.predicted === 'B').length === 0 && (
                    <span className="text-[11px] text-[#667085] italic">Bin empty...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CHALLENGE: PREDICT BEFORE EXPERIMENT */}
          <div className="p-5 rounded-3xl bg-[#FEF9EB] border border-[#F5C94B]/40 space-y-3 shadow-playful-sm">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#8C6B0F]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#8C6B0F]">
                Predictive Challenge: Think Like an ML Engineer
              </span>
            </div>
            <p className="text-xs font-bold text-[#26324B]">
              {dataset.challenge.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {dataset.challenge.options.map((opt, i) => {
                const isSelected = selectedChallengeIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedChallengeIdx(i);
                      if (opt.isCorrect && !hasShownCelebration) {
                        triggerCelebration();
                      }
                    }}
                    className={`p-3 rounded-2xl text-left text-xs transition-all border ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-[#E6F8F0] border-[#A8E6CF] text-[#1F6B4F] font-semibold shadow-playful-sm'
                          : 'bg-[#FFF0ED] border-[#FF8066] text-[#C4462D]'
                        : 'bg-white border-[#E8E5DE] hover:border-[#315CEB] text-[#26324B] shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="font-mono font-bold text-[10px] text-[#667085]">[{String.fromCharCode(65 + i)}]</span>
                      <span>{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedChallengeIdx !== null && (
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                  dataset.challenge.options[selectedChallengeIdx].isCorrect
                    ? 'bg-[#E6F8F0] text-[#1F6B4F] border-[#A8E6CF]'
                    : 'bg-[#FFF0ED] text-[#C4462D] border-[#FF8066]'
                }`}
              >
                {dataset.challenge.options[selectedChallengeIdx].explanation}
              </div>
            )}
          </div>

          {/* SUPERVISED LEARNING MATHEMATICAL LINK */}
          <div className="p-6 rounded-3xl bg-white text-[#26324B] border border-[#E8E5DE] shadow-playful space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#315CEB]">
                Formal Theory • What You Just Learned
              </span>
              <span className="text-[11px] font-mono font-bold text-[#667085] bg-[#FFF9F0] px-2.5 py-1 rounded-full border border-[#E8E5DE]">
                Supervised Classification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#315CEB] flex items-center gap-1">
                  <span>Feature Vector</span>
                  <InlineMath math="\mathbf{x}" />
                </span>
                <p className="text-[#667085] text-[11px] leading-relaxed">
                  Observable quantitative attribute (e.g. sugar sweetness in °Bx or spam keywords).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#247D5C] flex items-center gap-1">
                  <span>Ground Truth</span>
                  <InlineMath math="y" />
                </span>
                <p className="text-[#667085] text-[11px] leading-relaxed">
                  The verified target label from training data (Apple vs Lemon, or Spam vs Work).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#315CEB] flex items-center gap-1">
                  <span>Hypothesis</span>
                  <InlineMath math="\hat{y} = f(\mathbf{x}; \theta)" />
                </span>
                <p className="text-[#667085] text-[11px] leading-relaxed">
                  <MathText text="The classifier decision rule parameterized by threshold $\theta$: $\hat{y} = 1$ if $x \ge \theta$, else $0$." />
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C4462D] flex items-center gap-1">
                  <span>Loss Function</span>
                  <InlineMath math="L(y, \hat{y})" />
                </span>
                <p className="text-[#667085] text-[11px] leading-relaxed">
                  <MathText text="Zero-one loss penalizes mismatches: $L = 1$ if $y \ne \hat{y}$, else $0$. Minimizing loss finds optimal $\theta^*$." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
