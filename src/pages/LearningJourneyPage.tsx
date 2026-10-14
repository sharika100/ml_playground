import React from 'react';
import { CURRICULUM } from '../data/curriculum';
import { Compass, CheckCircle2, Clock, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';

interface LearningJourneyPageProps {
  onSelectTopic: (topicId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const LearningJourneyPage: React.FC<LearningJourneyPageProps> = ({
  onSelectTopic,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Universal Machine Learning Pathway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Interactive Learning Journey
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Master the fundamentals of Machine Learning step by step. Each module blends real-world intuition, scientific definitions, step-by-step mathematical reasoning, and hands-on simulation.
        </p>
      </div>

      {/* Timeline Pathway */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-7 sm:before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:z-0">
        {CURRICULUM.map((topic, idx) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="relative z-10 flex items-start gap-4 sm:gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/80 hover:shadow-lg transition-all cursor-pointer group"
          >
            {/* Step Number Badge */}
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brand-500/30 shrink-0 group-hover:scale-105 transition-transform">
              0{topic.topicNumber}
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Core Module {topic.topicNumber}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> ~{topic.estimatedMinutes} mins
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                {topic.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {topic.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <span>Interactive: {topic.visualExplanation.interactiveType}</span>
                  <span>•</span>
                  <span>{topic.knowledgeCheck.length} Knowledge Checks</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Start Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Milestone 6: Revision & Practice Studio */}
        <div
          onClick={() => onNavigateTab('revision')}
          className="relative z-10 flex items-start gap-4 sm:gap-6 p-6 rounded-2xl bg-gradient-to-r from-brand-900/10 via-white to-white dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-dashed border-brand-300 dark:border-brand-800 hover:border-brand-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
            06
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Synthesis & Exam Revision
              </span>
              <span className="text-xs text-slate-400">~25 mins</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors mb-1">
              Revision Studio, Worked Solutions & Misconception Buster
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Consolidated formula cheat sheets, step-by-step worked problems for exam preparation, and the Final Mixed Mastery Challenge.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400">
              <span>Open Revision Studio</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Optional Extension: Deep Learning Preview */}
        <div className="relative z-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Optional Extension
            </span>
            <span className="text-xs text-slate-400 font-medium">Beyond the Core Syllabus</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Deep Learning & Neural Networks Glimpse</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Curious about what comes after linear models? When relationships become non-linear and high-dimensional (like audio and image recognition), multiple layers of artificial neurons with non-linear activation functions (ReLU, Sigmoid) take over! This is covered as an advanced elective track.
          </p>
        </div>
      </div>
    </div>
  );
};
