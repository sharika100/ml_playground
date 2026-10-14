import React from 'react';
import { ArrowRight, Sparkles, Brain, Cpu, BookOpen, Calculator, Play, CheckCircle2, Award, School, ExternalLink, Compass } from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';
import { CURRICULUM } from '../data/curriculum';
import { VIDEO_RESOURCES } from '../data/videos';

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

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-brand-50/60 via-white to-transparent dark:from-navy-950 dark:via-navy-900 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-bold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Educational Platform • No Login Required</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Machine Learning made simple. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-600 dark:from-brand-400 dark:to-violet-400">
              Understanding made interactive.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore concepts. Play with models. Understand the maths. Discover how machines learn from observations—with real simulations, step-by-step derivations, and zero fluff.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Learning Journey</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigateTab('lab')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Explore Interactive Labs</span>
            </button>
          </div>

          {/* Audience Badges */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Designed for:</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Beginners
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              CS & Engineering Students
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Math-Curious Learners
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Educators
            </span>
          </div>
        </div>
      </section>

      {/* 4 CORE VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Intuition First</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every abstract formula begins with a relatable real-world dilemma before formal notation is introduced.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Interactive Simulations</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Don’t just read about algorithms—split decision trees, drag regression lines, and observe live MSE metrics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Maths Made Rigorous</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero unexplained jumps. Shannon Entropy, Gini Index, and Cost functions solved step-by-step with KaTeX.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Revision & Video Hub</h3>
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
              Structured Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Core Learning Curriculum
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('journey')}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View Full Journey Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onNavigateToTopic(topic.id)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                    Topic 0{topic.topicNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
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
                <span>Explore Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-xl">
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

              <div className="pt-4 flex items-center gap-4">
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-600/25"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => onNavigateTab('videos')}
                  className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                >
                  Browse all 4 channel video lectures
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-video rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-3">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
                <div className="font-bold text-sm text-white mb-1">Interactive Lesson Video</div>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Stream verified video lectures directly or open in YouTube to follow along with Sharika T R.
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
                  <span>Adi Shankara Institute of Engineering and Technology (ASIET)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab('about')}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                Read Creator Profile & Mission
              </button>
              <a
                href="https://youtube.com/@sharikatr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
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
