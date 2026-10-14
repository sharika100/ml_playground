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
  Award,
  School,
  ExternalLink,
  Compass,
  Gauge,
  TrendingUp,
  GitBranch,
  Film,
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { CURRICULUM } from '../data/curriculum';
import { VIDEO_RESOURCES } from '../data/videos';
import { calculateEntropy } from '../math/entropy';

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

  // HERO LIVE INTERACTIVE TEASER STATE
  const [heroYes, setHeroYes] = useState<number>(5);
  const heroTotal = 10;
  const heroNo = heroTotal - heroYes;
  const heroEntropy = useMemo(() => {
    return calculateEntropy([heroYes, heroNo]).entropy;
  }, [heroYes, heroNo]);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION WITH LIVE INTERACTIVE TEASER */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-brand-50/70 via-white to-transparent dark:from-navy-950 dark:via-navy-900 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-bold mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Interactive Educational Platform • Free & Open Access</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              Machine Learning made simple.{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 dark:from-brand-400 dark:via-indigo-400 dark:to-violet-400">
                Understanding made interactive.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Explore concepts. Play with models. Understand the maths. Discover how machines learn from observations—with live simulations, step-by-step derivations, and zero fluff.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Learning Journey</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigateTab('scenarios')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Film className="w-4 h-4" />
                <span>Watch Animated Scenarios</span>
              </button>

              <button
                onClick={() => onNavigateTab('lab')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Labs</span>
              </button>
            </div>
          </div>

          {/* LIVE HERO INTERACTIVE TEASER CARD */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand-200 dark:border-brand-900/60 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                <Gauge className="w-4 h-4 text-brand-600" />
                <span>Live Hero Sandbox: Feel Shannon Entropy in Real Time</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">10 Sample Elements</span>
            </div>

            {/* Visual Token Row */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>Click presets or drag the slider:</span>
                <span className="font-mono text-brand-600 dark:text-brand-400">
                  {heroYes} Yes (+) vs {heroNo} No (−)
                </span>
              </div>

              <div className="flex justify-center gap-2 py-2 flex-wrap">
                {Array.from({ length: heroTotal }).map((_, i) => {
                  const isYes = i < heroYes;
                  return (
                    <button
                      key={i}
                      onClick={() => setHeroYes(isYes ? heroYes - 1 : heroYes + 1)}
                      className={`w-9 h-9 rounded-xl font-mono text-sm font-black flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-sm border ${
                        isYes
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'bg-amber-500 text-white border-amber-400'
                      }`}
                      title={`Click to toggle token`}
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
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 mt-2"
              />
            </div>

            {/* Real-Time Entropy Gauge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300 block">
                  Shannon Entropy H(S)
                </span>
                <div className="text-3xl font-black font-mono tracking-tight text-white mt-0.5">
                  {heroEntropy.toFixed(3)} <span className="text-sm font-normal text-slate-400">bits</span>
                </div>
              </div>

              <div className="flex-1 max-w-xs space-y-1">
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300 rounded-full"
                    style={{ width: `${heroEntropy * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-300 font-medium">
                  {heroEntropy === 0
                    ? '✨ 100% Certainty (Pure distribution)'
                    : heroEntropy >= 0.99
                    ? '⚠️ Maximum Chaos (50/50 Coin Flip)'
                    : 'Partial Uncertainty'}
                </div>
              </div>

              <button
                onClick={() => onNavigateToTopic('topic-3')}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap self-start sm:self-center"
              >
                Deep-Dive Topic 3 →
              </button>
            </div>
          </div>
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
