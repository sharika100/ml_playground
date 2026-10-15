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
import { InlineMath, MathText } from '../components/common/MathFormula';

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
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E8E5DE] bg-gradient-to-b from-[#FFF9F0] via-white to-[#FFF9F0]">
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
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful hover:translate-y-[-2px] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF0FD] text-[#315CEB] flex items-center justify-center mb-4 shadow-sm">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#26324B] mb-1.5">Intuition First</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Every abstract formula begins with a relatable real-world dilemma before formal notation is introduced.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful hover:translate-y-[-2px] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FAF6] text-[#247D5C] flex items-center justify-center mb-4 shadow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#26324B] mb-1.5">Interactive Simulations</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Don’t just read about algorithms—split decision trees, drag regression lines, and observe live MSE metrics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful hover:translate-y-[-2px] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF9EB] text-[#8C6B0F] flex items-center justify-center mb-4 shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#26324B] mb-1.5">Maths Made Rigorous</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Zero unexplained jumps. Shannon Entropy, Gini Index, and Cost functions solved step-by-step with KaTeX.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful hover:translate-y-[-2px] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0ED] text-[#C4462D] flex items-center justify-center mb-4 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#26324B] mb-1.5">Revision & Video Hub</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Verified video lectures by Sharika T R, misconception busters, and downloadable study summaries.
            </p>
          </div>
        </div>
      </section>

      {/* COMPACT INTERACTIVE LAB PREVIEWS (BELOW THE FOLD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
            Interactive Laboratories Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#26324B] mt-1">
            Play with the Math & Watch Models Learn
          </h2>
          <p className="text-sm text-[#667085] mt-1">
            Test key algorithms with real-time feedback before diving into complete curriculum lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PREVIEW CARD 1: Shannon Entropy Gauge */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EBF0FD] text-[#315CEB] border border-[#315CEB]/20">
                  <Gauge className="w-3 h-3" />
                  <span>Shannon Entropy</span>
                  <InlineMath math="H(S)" />
                </span>
                <span className="text-[11px] font-mono text-[#667085]">10 Samples</span>
              </div>
              <h3 className="text-base font-extrabold text-[#26324B] mb-1">
                Measure Disorder in Real Time
              </h3>
              <p className="text-xs text-[#667085] mb-4">
                <MathText text="Click tokens or drag the slider to observe how class balance shifts entropy from $0$ (pure) to $1.0$ (pure chaos)." />
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
                          ? 'bg-[#247D5C] text-white border-[#A8E6CF]'
                          : 'bg-[#FF8066] text-white border-[#FF8066]'
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
                className="w-full h-2 bg-[#E8E5DE] rounded-lg appearance-none cursor-pointer accent-[#315CEB] mt-2"
              />

              <div className="mt-3 p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#315CEB] font-bold block">
                    Calculated Entropy
                  </span>
                  <span className="text-xl font-black font-mono text-[#247D5C]">
                    {heroEntropy.toFixed(3)}{' '}
                    <span className="text-xs font-normal text-[#667085]">bits</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#26324B] font-bold">
                  {heroEntropy === 0 ? '✨ Pure (0.0)' : heroEntropy >= 0.99 ? '⚠️ Max (1.0)' : 'Mixed'}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTopic('topic-3')}
              className="w-full py-2.5 rounded-xl bg-[#EBF0FD] hover:bg-[#315CEB] text-[#315CEB] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Entropy & Gain in Topic 03</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PREVIEW CARD 2: Decision Tree Splitting */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0FAF6] text-[#247D5C] border border-[#A8E6CF]">
                  <GitBranch className="w-3 h-3" />
                  <span>ID3 Decision Trees</span>
                </span>
                <span className="text-[11px] font-mono text-[#667085]">Play Tennis</span>
              </div>
              <h3 className="text-base font-extrabold text-[#26324B] mb-1">
                Visual Feature Splitting
              </h3>
              <p className="text-xs text-[#667085] mb-3">
                Switch the root candidate attribute to see how the branch purities change:
              </p>

              {/* Split selection */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setSelectedSplit('outlook')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 ${
                    selectedSplit === 'outlook'
                      ? 'bg-[#315CEB] text-white border-[#315CEB] shadow-playful-sm'
                      : 'bg-[#FFF9F0] text-[#26324B] border-[#E8E5DE] hover:border-[#315CEB]'
                  }`}
                >
                  <span>Outlook</span>
                  <InlineMath math="(\text{Gain} = 0.247)" />
                </button>
                <button
                  onClick={() => setSelectedSplit('humidity')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 ${
                    selectedSplit === 'humidity'
                      ? 'bg-[#315CEB] text-white border-[#315CEB] shadow-playful-sm'
                      : 'bg-[#FFF9F0] text-[#26324B] border-[#E8E5DE] hover:border-[#315CEB]'
                  }`}
                >
                  <span>Humidity</span>
                  <InlineMath math="(\text{Gain} = 0.151)" />
                </button>
              </div>

              {/* Mini Tree Branch Diagram */}
              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-[#EBF0FD] text-[#315CEB] font-mono text-xs font-bold border border-[#315CEB]/20">
                  Root: {selectedSplit === 'outlook' ? 'Outlook' : 'Humidity'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded-xl bg-white border border-[#E8E5DE] shadow-sm">
                    <span className="font-bold text-[#26324B]">
                      {selectedSplit === 'outlook' ? 'Sunny (2+, 3−)' : 'High (3+, 4−)'}
                    </span>
                    <div className="text-[10px] text-[#667085] mt-0.5">Need sub-split</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E8E5DE] shadow-sm">
                    <span className="font-bold text-[#26324B]">
                      {selectedSplit === 'outlook' ? 'Overcast (4+, 0−)' : 'Normal (6+, 1−)'}
                    </span>
                    <div className="text-[10px] text-[#247D5C] font-bold mt-0.5">
                      {selectedSplit === 'outlook' ? '✨ Pure Leaf: Yes' : 'High Purity'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('lab')}
              className="w-full py-2.5 rounded-xl bg-[#EBF0FD] hover:bg-[#315CEB] text-[#315CEB] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Build Full Trees in Interactive Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PREVIEW CARD 3: Regression & Residuals */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FEF9EB] text-[#8C6B0F] border border-[#F5C94B]">
                  <TrendingUp className="w-3 h-3" />
                  <span>Linear Regression</span>
                </span>
                <span className="text-[11px] font-mono text-[#667085]">Ordinary Least Squares</span>
              </div>
              <h3 className="text-base font-extrabold text-[#26324B] mb-1">
                Minimize Residual Error
              </h3>
              <p className="text-xs text-[#667085] mb-3">
                <MathText text="Adjust the model slope $m$ to minimize Mean Squared Error ($\text{MSE}$) across sample points:" />
              </p>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#667085] flex items-center gap-1">
                    <span>Slope</span>
                    <InlineMath math="m" />: {regressionSlope.toFixed(2)}
                  </span>
                  <span className="font-bold text-[#315CEB]">
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
                  className="w-full h-2 bg-[#E8E5DE] rounded-lg appearance-none cursor-pointer accent-[#315CEB]"
                />
              </div>

              {/* Mini residual visualizer */}
              <div className="mt-3 p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#E8E5DE] flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#315CEB] font-bold block">
                    Fitted Hypothesis
                  </span>
                  <span className="text-sm font-bold text-[#26324B]">
                    <InlineMath math={`\\hat{y} = ${regressionSlope.toFixed(2)}x + 0.50`} />
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl bg-white border border-[#E8E5DE] text-[#247D5C] font-mono font-bold shadow-sm">
                  {parseFloat(regressionMSE) < 0.6 ? '🎯 Near Optimal' : 'Tuning Needed'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTopic('topic-4')}
              className="w-full py-2.5 rounded-xl bg-[#EBF0FD] hover:bg-[#315CEB] text-[#315CEB] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Regression in Topic 04</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ANIMATED SCENARIOS CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#315CEB] via-[#FF8066] to-[#F5C94B] text-white shadow-playful-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white border border-white/30">
              <Film className="w-3.5 h-3.5" />
              <span>Scenario-Driven Learning Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">
              Watch Real Machine Learning Concepts in Motion
            </h2>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed">
              Step beyond static text. Explore our 5 rich animated simulations with controllable scenarios: Robot Grid Q-Learning, Spam Classifier Stream, Decision Tree Forest, 2D K-Means Clustering, and Aspect Sentiment Analysis.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('scenarios')}
                className="px-6 py-3.5 rounded-2xl bg-white text-[#26324B] font-extrabold text-sm shadow-xl hover:bg-[#FFF9F0] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Launch All 5 Scenarios</span>
                <ArrowRight className="w-4 h-4 text-[#315CEB]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM JOURNEY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#315CEB]">
              Structured Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#26324B]">
              Core Learning Journey
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('journey')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#315CEB] hover:underline"
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
              className="p-6 rounded-3xl bg-white border border-[#E8E5DE] hover:border-[#315CEB] hover:shadow-playful-lg shadow-playful transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#EBF0FD] text-[#315CEB] border border-[#315CEB]/20">
                    Topic 0{topic.topicNumber}
                  </span>
                  <span className="text-xs text-[#667085] font-medium">
                    ~{topic.estimatedMinutes} mins
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#26324B] group-hover:text-[#315CEB] transition-colors mb-2">
                  {topic.title}
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  {topic.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E5DE] flex items-center justify-between text-xs font-bold text-[#315CEB]">
                <span>Start Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#26324B] text-white border border-[#344465] shadow-playful-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF8066]/20 text-[#FF8066] border border-[#FF8066]/40">
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>Featured Video Lecture by Sharika T R</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {featuredVideo.title}
              </h3>
              <p className="text-sm text-[#E8E5DE] leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {featuredVideo.keyConcepts.map((c, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#344465] border border-[#4A5D84] text-[#FFF9F0]"
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#315CEB] hover:bg-[#2548BA] text-white font-bold text-xs transition-colors shadow-playful-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => onNavigateTab('videos')}
                  className="text-xs font-semibold text-[#E8E5DE] hover:text-white underline underline-offset-4"
                >
                  Browse all channel video lectures
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-video rounded-2xl bg-[#1A2333] border border-[#344465] overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#315CEB]/20 border border-[#315CEB]/40 flex items-center justify-center text-[#315CEB] mb-3">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Interactive Lesson Video</div>
                <p className="text-xs text-[#E8E5DE]/80 max-w-xs mb-4">
                  Follow along with worked exam problems and derivations on YouTube.
                </p>
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#F5C94B] hover:text-white flex items-center gap-1"
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
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#315CEB] to-[#FF8066] flex items-center justify-center text-white font-extrabold text-2xl shadow-playful-sm shrink-0">
                ST
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-[#26324B]">Sharika T R</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FEF9EB] text-[#8C6B0F] border border-[#F5C94B]">
                    Lead Educator
                  </span>
                </div>
                <p className="text-xs text-[#667085]">
                  Assistant Professor, Department of Computer Science and Engineering
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#315CEB] font-semibold mt-1">
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
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[#E8E5DE] hover:bg-[#FFF9F0] text-[#26324B] transition-colors shadow-sm"
              >
                Creator Profile
              </button>
              <a
                href="https://youtube.com/@sharikatr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF8066] hover:bg-[#E0664F] text-white transition-colors shadow-playful-sm"
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
