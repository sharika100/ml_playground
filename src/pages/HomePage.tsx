import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  Brain,
  Cpu,
  BookOpen,
  Calculator,
  Play,
  CheckCircle2,
  School,
  ExternalLink,
  Gauge,
  TrendingUp,
  GitBranch,
  Film,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { CURRICULUM } from '../data/curriculum';
import { VIDEO_RESOURCES } from '../data/videos';
import { calculateEntropy } from '../math/entropy';
import { TeachTheMachineHero } from '../components/home/TeachTheMachineHero';

interface HomePageProps {
  onStartLearning: () => void;
  onNavigateToTopic: (topicId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartLearning,
  onNavigateToTopic,
  onNavigateTab,
}) => {
  const featuredVideo = VIDEO_RESOURCES[0];

  // MINI SANDBOX 1: Shannon Entropy Live State
  const [heroYes, setHeroYes] = useState<number>(5);
  const heroTotal = 10;
  const heroNo = heroTotal - heroYes;
  const heroEntropy = useMemo(() => {
    return calculateEntropy([heroYes, heroNo]).entropy;
  }, [heroYes, heroNo]);

  // MINI SANDBOX 2: Decision Tree Splitter Demo State
  const [selectedSplit, setSelectedSplit] = useState<'outlook' | 'humidity'>('outlook');

  // MINI SANDBOX 3: Regression Slope State
  const [regressionSlope, setRegressionSlope] = useState<number>(1.2);
  // Sample 4 points: (1, 2), (2, 3), (3, 5), (4, 4)
  const regressionPoints = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
  ];
  const regressionMSE = useMemo(() => {
    const sumSq = regressionPoints.reduce((acc, pt) => {
      const predY = regressionSlope * pt.x + 0.5;
      return acc + Math.pow(pt.y - predY, 2);
    }, 0);
    return (sumSq / regressionPoints.length).toFixed(2);
  }, [regressionSlope]);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION: TEACH THE MACHINE INTERACTIVE EXPERIENCE */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-brand-50/70 via-white to-transparent dark:from-navy-950 dark:via-navy-900 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <TeachTheMachineHero
            onStartLearning={onStartLearning}
            onNavigateTab={onNavigateTab}
          />
        </div>
      </section>

      {/* 4 CORE VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">Intuition First</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every abstract formula begins with a relatable real-world dilemma before formal notation is introduced.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">Interactive Simulations</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Don’t just read about algorithms—split decision trees, drag regression lines, and observe live MSE metrics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">Maths Made Rigorous</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero unexplained jumps. Shannon Entropy, Gini Index, and Cost functions solved step-by-step with KaTeX.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">Revision & Video Hub</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verified video lectures by Sharika T R, misconception busters, and downloadable study summaries.
            </p>
          </div>
        </div>
      </section>

      {/* COMPACT INTERACTIVE LAB PREVIEWS (BELOW THE FOLD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Interactive Laboratories Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Play with the Math & Watch Models Learn
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Test key algorithms with real-time feedback before diving into complete curriculum lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PREVIEW CARD 1: Shannon Entropy Gauge */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  <Gauge className="w-3 h-3" />
                  <span>Shannon Entropy H(S)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">10 Samples</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                Measure Disorder in Real Time
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Click tokens or drag the slider to observe how class balance shifts entropy from 0 (pure) to 1.0 (pure chaos).
              </p>

              {/* Mini Token Matrix */}
              <div className="flex justify-center gap-1.5 py-2 flex-wrap">
                {Array.from({ length: heroTotal }).map((_, i) => {
                  const isYes = i < heroYes;
                  return (
                    <button
                      key={i}
                      onClick={() => setHeroYes(isYes ? heroYes - 1 : heroYes + 1)}
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-black flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-sm border ${
                        isYes
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'bg-amber-500 text-white border-amber-400'
                      }`}
                      title="Click to toggle token"
                    >
                      {isYes ? '+' : '−'}
                    </button>
                  );
                })}
              </div>

              <input
                type="range"
                min="0"
                max={heroTotal}
                value={heroYes}
                onChange={(e) => setHeroYes(parseInt(e.target.value) || 0)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 mt-2"
              />

              <div className="mt-3 p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-300 block">
                    Calculated Entropy
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-400">
                    {heroEntropy.toFixed(3)}{' '}
                    <span className="text-xs font-normal text-slate-400">bits</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-300 font-medium">
                  {heroEntropy === 0 ? '✨ Pure (0.0)' : heroEntropy >= 0.99 ? '⚠️ Max (1.0)' : 'Mixed'}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTopic('topic-3')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Entropy & Gain in Topic 03</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PREVIEW CARD 2: Decision Tree Splitting */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <GitBranch className="w-3 h-3" />
                  <span>ID3 Decision Trees</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">Play Tennis</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                Visual Feature Splitting
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Switch the root candidate attribute to see how the branch purities change:
              </p>

              {/* Split selection */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setSelectedSplit('outlook')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedSplit === 'outlook'
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Split: Outlook (Gain=0.247)
                </button>
                <button
                  onClick={() => setSelectedSplit('humidity')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedSplit === 'humidity'
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Split: Humidity (Gain=0.151)
                </button>
              </div>

              {/* Mini Tree Branch Diagram */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                  Root: {selectedSplit === 'outlook' ? 'Outlook' : 'Humidity'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedSplit === 'outlook' ? 'Sunny (2+, 3−)' : 'High (3+, 4−)'}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Need sub-split</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedSplit === 'outlook' ? 'Overcast (4+, 0−)' : 'Normal (6+, 1−)'}
                    </span>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      {selectedSplit === 'outlook' ? '✨ Pure Leaf: Yes' : 'High Purity'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('lab')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Build Full Trees in Interactive Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PREVIEW CARD 3: Regression & Residuals */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <TrendingUp className="w-3 h-3" />
                  <span>Linear Regression</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">Ordinary Least Squares</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                Minimize Residual Error
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Adjust the model slope m to minimize Mean Squared Error (MSE) across sample points:
              </p>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Slope m: {regressionSlope.toFixed(2)}</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400">
                    Live MSE: {regressionMSE}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={regressionSlope}
                  onChange={(e) => setRegressionSlope(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Mini residual visualizer */}
              <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-300 block">
                    Fitted Hypothesis
                  </span>
                  <span className="text-sm font-mono font-bold text-indigo-200">
                    ŷ = {regressionSlope.toFixed(2)}x + 0.50
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono">
                  {parseFloat(regressionMSE) < 0.6 ? '🎯 Near Optimal' : 'Tuning Needed'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTopic('topic-4')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Regression in Topic 04</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ANIMATED SCENARIOS CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white border border-white/30">
              <Film className="w-3.5 h-3.5" />
              <span>Scenario-Driven Learning Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Watch Real Machine Learning Concepts in Motion
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Step beyond static text. Explore our 5 rich animated simulations with controllable scenarios: Robot Grid Q-Learning, Spam Classifier Stream, Decision Tree Forest, 2D K-Means Clustering, and Aspect Sentiment Analysis.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('scenarios')}
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Launch All 5 Scenarios</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM JOURNEY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Structured Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Core Learning Journey
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('journey')}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View Full Journey Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onNavigateToTopic(topic.id)}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                    Topic 0{topic.topicNumber}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ~{topic.estimatedMinutes} mins
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {topic.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400">
                <span>Start Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>Featured Video Lecture by Sharika T R</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {featuredVideo.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {featuredVideo.keyConcepts.map((c, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-600/25"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => onNavigateTab('videos')}
                  className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                >
                  Browse all channel video lectures
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-video rounded-2xl bg-slate-800/80 border border-slate-700 overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-3">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Interactive Lesson Video</div>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Follow along with worked exam problems and derivations on YouTube.
                </p>
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  <span>youtube.com/@sharikatr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREATOR & INSTITUTIONAL ATTRIBUTION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shrink-0">
                ST
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sharika T R</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                    Lead Educator
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Assistant Professor, Department of Computer Science and Engineering
                </p>
                <div className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">
                  <School className="w-3.5 h-3.5" />
                  <a
                    href="https://www.adishankara.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>Adi Shankara Institute of Engineering and Technology (ASIET)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab('about')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                Creator Profile
              </button>
              <a
                href="https://youtube.com/@sharikatr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-md shadow-rose-600/20"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>YouTube Channel</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
