import React, { useState, useEffect, useCallback } from 'react';
import { ScenarioFrame, PredictionChallenge } from './ScenarioFrame';
import { triggerCelebration } from '../common/Celebration';
import { MessageSquareText, ThumbsUp, ThumbsDown, Sparkles, HelpCircle, Split, ArrowRight } from 'lucide-react';

interface PresetReview {
  id: string;
  text: string;
  aspect1: { term: string; sentiment: 'Positive' | 'Negative'; word: string; score: number };
  aspect2: { term: string; sentiment: 'Positive' | 'Negative'; word: string; score: number };
}

const PRESET_REVIEWS: PresetReview[] = [
  {
    id: 'r1',
    text: 'The acting was excellent, but the direction was poor.',
    aspect1: { term: 'acting', sentiment: 'Positive', word: 'excellent', score: 0.92 },
    aspect2: { term: 'direction', sentiment: 'Negative', word: 'poor', score: -0.85 },
  },
  {
    id: 'r2',
    text: 'The camera quality is incredible, but the battery life is terrible.',
    aspect1: { term: 'camera quality', sentiment: 'Positive', word: 'incredible', score: 0.95 },
    aspect2: { term: 'battery life', sentiment: 'Negative', word: 'terrible', score: -0.91 },
  },
  {
    id: 'r3',
    text: 'The food was delicious, but the service was slow.',
    aspect1: { term: 'food', sentiment: 'Positive', word: 'delicious', score: 0.88 },
    aspect2: { term: 'service', sentiment: 'Negative', word: 'slow', score: -0.72 },
  },
];

export const AspectSentimentScenario: React.FC = () => {
  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number>(0);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [currentActionDesc, setCurrentActionDesc] = useState<string>(
    'Review text ready for aspect-based token streaming.'
  );

  const review = PRESET_REVIEWS[selectedReviewIdx];
  const words = review.text.split(' ');

  // Word-by-word streaming step
  const stepReview = useCallback(() => {
    setActiveWordIdx((curr) => {
      if (curr < words.length - 1) {
        const nextIdx = curr + 1;
        const currentWord = words[nextIdx];
        if (currentWord.toLowerCase().includes('but') || currentWord.toLowerCase().includes('however')) {
          setCurrentActionDesc(
            `Contrastive conjunction "${currentWord}" detected! Parsing shifts from positive clause to negative clause.`
          );
        } else if (currentWord.toLowerCase().includes('excellent') || currentWord.toLowerCase().includes('incredible') || currentWord.toLowerCase().includes('delicious')) {
          setCurrentActionDesc(`Positive sentiment modifier "${currentWord}" detected (+0.9).`);
        } else if (currentWord.toLowerCase().includes('poor') || currentWord.toLowerCase().includes('terrible') || currentWord.toLowerCase().includes('slow')) {
          setCurrentActionDesc(`Negative sentiment modifier "${currentWord}" detected (-0.8).`);
        } else {
          setCurrentActionDesc(`Scanning token #${nextIdx + 1}: "${currentWord}"`);
        }
        return nextIdx;
      } else {
        setRevealed(true);
        triggerCelebration();
        setCurrentActionDesc(
          'Analysis complete! Distinct sentiment polarities assigned to each aspect.'
        );
        return curr;
      }
    });
  }, [words]);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = 600 / speed;
    const interval = setInterval(() => {
      stepReview();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isRunning, speed, stepReview]);

  const handleReset = () => {
    setIsRunning(false);
    setActiveWordIdx(0);
    setRevealed(false);
    setCurrentActionDesc('Review scanner reset to beginning.');
  };

  const handleSelectReview = (idx: number) => {
    setSelectedReviewIdx(idx);
    setActiveWordIdx(0);
    setRevealed(false);
    setIsRunning(false);
  };

  const predictionChallenge: PredictionChallenge = {
    question:
      'If a traditional whole-sentence sentiment classifier evaluated "The acting was excellent, but the direction was poor", what would it likely output?',
    options: [
      {
        id: 'opt-neutral',
        label: 'Neutral or ambiguous score (~0.0) because "+1 excellent" cancels out "-1 poor", hiding the fact that the user loved one aspect but hated another!',
        isCorrect: true,
        explanation:
          'Global sentiment analysis averages word polarities across the whole document, failing to capture fine-grained aspect targets. ABSA solves this by decoupling aspects.',
      },
      {
        id: 'opt-positive',
        label: '100% Positive because positive words are processed first.',
        isCorrect: false,
        explanation: 'Standard bag-of-words or sentence classifiers do not prioritize word order over polarity sums.',
      },
      {
        id: 'opt-error',
        label: 'A syntax error because "but" confuses language models.',
        isCorrect: false,
        explanation: 'Conjunctions are standard linguistic tokens and do not crash NLP systems.',
      },
    ],
  };

  return (
    <ScenarioFrame
      title="Scenario E: Aspect-Based Movie Review Analysis"
      badge="Optional Application • Aspect-Based Sentiment Analysis (NLP)"
      badgeColor="bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800"
      story="Watch a movie review stream token-by-token. Rather than assigning one blunt score to the entire text, the system extracts specific aspect entities and assigns independent sentiment polarities to each."
      isRunning={isRunning}
      onTogglePlay={() => setIsRunning(!isRunning)}
      onStep={stepReview}
      onReset={handleReset}
      speed={speed}
      onSpeedChange={setSpeed}
      prediction={predictionChallenge}
      userPrediction={userPrediction}
      onSelectPrediction={setUserPrediction}
      currentStepDescription={currentActionDesc}
      scientificExplanation="Aspect-Based Sentiment Analysis (ABSA) decouples an opinion target (e.g. 'acting') from its sentiment polarity (positive, +0.92). Notice how the contrastive conjunction 'but' acts as a pivot, allowing opposite emotional polarities within the same sentence without canceling each other out."
      formalConcept="Optional Advanced Extension: Applied NLP & Machine Learning. Demonstrates how machine learning models move beyond simple scalar classification to structured multi-target feature representation."
      followUpChallenge="Select different sample reviews using the buttons below to observe how different aspects and conjunctions are parsed!"
      telemetry={
        <>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Tokens</span>
            <span className="font-bold text-slate-200 text-sm">
              {activeWordIdx + 1} / {words.length}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Aspect 1 ({review.aspect1.term})</span>
            <span className="font-bold text-emerald-400 text-sm">
              {activeWordIdx >= 3 ? `${(review.aspect1.score * 100).toFixed(0)}%` : 'Scanning...'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Aspect 2 ({review.aspect2.term})</span>
            <span className="font-bold text-rose-400 text-sm">
              {activeWordIdx >= words.length - 2 ? `${(review.aspect2.score * 100).toFixed(0)}%` : 'Scanning...'}
            </span>
          </div>
        </>
      }
    >
      {/* Streaming Text Viewport */}
      <div className="p-6 sm:p-8 flex flex-col items-center justify-between min-h-[340px] select-none space-y-6">
        {/* Preset Review Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PRESET_REVIEWS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => handleSelectReview(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedReviewIdx === i
                  ? 'bg-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
              }`}
            >
              Review #{i + 1}
            </button>
          ))}
        </div>

        {/* Word-by-Word Animated Streaming Card */}
        <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 text-center shadow-2xl space-y-4">
          <div className="text-xs uppercase font-bold tracking-widest text-slate-500">
            Streaming Token Scanner
          </div>

          <div className="text-lg sm:text-2xl font-black text-white leading-relaxed flex flex-wrap items-center justify-center gap-2 py-2">
            {words.map((word, i) => {
              const isVisible = i <= activeWordIdx;
              const isAspect =
                word.toLowerCase().includes('acting') ||
                word.toLowerCase().includes('direction') ||
                word.toLowerCase().includes('camera') ||
                word.toLowerCase().includes('battery') ||
                word.toLowerCase().includes('food') ||
                word.toLowerCase().includes('service');
              const isPositive =
                word.toLowerCase().includes('excellent') ||
                word.toLowerCase().includes('incredible') ||
                word.toLowerCase().includes('delicious');
              const isNegative =
                word.toLowerCase().includes('poor') ||
                word.toLowerCase().includes('terrible') ||
                word.toLowerCase().includes('slow');
              const isConjunction = word.toLowerCase().includes('but');

              return (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded-lg transition-all duration-300 ${
                    !isVisible
                      ? 'opacity-10 scale-95 blur-xs'
                      : i === activeWordIdx
                      ? 'bg-brand-500 text-white scale-110 shadow-lg ring-2 ring-brand-300'
                      : isAspect
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-500'
                      : isPositive
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500'
                      : isNegative
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-500'
                      : isConjunction
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500'
                      : 'text-slate-200'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Dual Aspect Sentiment Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-left">
            {/* Aspect 1 Gauge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300 capitalize">
                  Aspect: {review.aspect1.term}
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-400">
                  <ThumbsUp className="w-3.5 h-3.5" /> Positive (+{review.aspect1.score})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: activeWordIdx >= 3 ? `${review.aspect1.score * 100}%` : '0%' }}
                />
              </div>
              <span className="text-[10px] text-slate-500">
                Triggered by: <span className="text-emerald-400 font-bold font-mono">"{review.aspect1.word}"</span>
              </span>
            </div>

            {/* Aspect 2 Gauge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300 capitalize">
                  Aspect: {review.aspect2.term}
                </span>
                <span className="flex items-center gap-1 font-bold text-rose-400">
                  <ThumbsDown className="w-3.5 h-3.5" /> Negative ({review.aspect2.score})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-500 rounded-full"
                  style={{
                    width: activeWordIdx >= words.length - 2 ? `${Math.abs(review.aspect2.score) * 100}%` : '0%',
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-500">
                Triggered by: <span className="text-rose-400 font-bold font-mono">"{review.aspect2.word}"</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScenarioFrame>
  );
};
