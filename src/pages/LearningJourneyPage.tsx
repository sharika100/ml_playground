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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0FD] text-[#315CEB] text-xs font-black mb-3 border border-[#315CEB]/20">
          <Compass className="w-3.5 h-3.5" />
          <span>Universal Machine Learning Pathway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#26324B] tracking-tight mb-3">
          Interactive Learning Journey
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed">
          Master the fundamentals of Machine Learning step by step. Each module blends real-world intuition, scientific definitions, step-by-step mathematical reasoning, and hands-on simulation.
        </p>
      </div>

      {/* Timeline Pathway */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-7 sm:before:left-8 before:w-0.5 before:bg-[#E8E5DE] before:z-0">
        {CURRICULUM.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="relative z-10 flex items-start gap-4 sm:gap-6 p-6 rounded-3xl bg-white border border-[#E8E5DE] hover:border-[#315CEB] hover:shadow-playful-lg shadow-playful transition-all cursor-pointer group"
          >
            {/* Step Number Badge */}
            <div className="w-12 h-12 rounded-2xl bg-[#315CEB] text-white font-black text-lg flex items-center justify-center shadow-playful-sm shrink-0 group-hover:scale-105 transition-transform">
              0{topic.topicNumber}
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF0FD] text-[#315CEB]">
                  Core Module {topic.topicNumber}
                </span>
                <span className="text-xs text-[#667085] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> ~{topic.estimatedMinutes} mins
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#26324B] group-hover:text-[#315CEB] transition-colors mb-2">
                {topic.title}
              </h3>

              <p className="text-xs text-[#667085] leading-relaxed mb-4">
                {topic.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#E8E5DE] text-xs">
                <div className="flex items-center gap-2 text-[#667085] font-medium">
                  <span>Interactive: {topic.visualExplanation.interactiveType}</span>
                  <span>•</span>
                  <span>{topic.knowledgeCheck.length} Knowledge Checks</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#315CEB] group-hover:translate-x-1 transition-transform">
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
          className="relative z-10 flex items-start gap-4 sm:gap-6 p-6 rounded-3xl bg-[#FEF9EB] border-2 border-dashed border-[#F5C94B] hover:border-[#315CEB] shadow-playful transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F5C94B] text-[#26324B] font-black text-lg flex items-center justify-center shadow-playful-sm shrink-0 group-hover:scale-105 transition-transform">
            06
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#8C6B0F] border border-[#F5C94B]/50">
                Synthesis & Exam Revision
              </span>
              <span className="text-xs text-[#667085]">~25 mins</span>
            </div>
            <h3 className="text-xl font-bold text-[#26324B] group-hover:text-[#315CEB] transition-colors mb-1">
              Revision Studio, Worked Solutions & Misconception Buster
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              Consolidated formula cheat sheets, step-by-step worked problems for exam preparation, and the Final Mixed Mastery Challenge.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#315CEB]">
              <span>Open Revision Studio</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Optional Extension: Deep Learning Preview */}
        <div className="relative z-10 p-6 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF0ED] text-[#C4462D] border border-[#FF8066]/30">
              Optional Extension
            </span>
            <span className="text-xs text-[#667085] font-medium">Beyond the Core Syllabus</span>
          </div>
          <h3 className="text-lg font-bold text-[#26324B] mb-1 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF8066]" />
            <span>Deep Learning & Neural Networks Glimpse</span>
          </h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            Curious about what comes after linear models? When relationships become non-linear and high-dimensional (like audio and image recognition), multiple layers of artificial neurons with non-linear activation functions (ReLU, Sigmoid) take over! This is covered as an advanced elective track.
          </p>
        </div>
      </div>
    </div>
  );
};
