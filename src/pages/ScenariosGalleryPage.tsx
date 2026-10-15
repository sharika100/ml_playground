import React, { useState } from 'react';
import { RobotMazeScenario } from '../components/scenarios/RobotMazeScenario';
import { EmailClassifierScenario } from '../components/scenarios/EmailClassifierScenario';
import { DecisionTreeJourneyScenario } from '../components/scenarios/DecisionTreeJourneyScenario';
import { ClusteringScenario } from '../components/scenarios/ClusteringScenario';
import { AspectSentimentScenario } from '../components/scenarios/AspectSentimentScenario';
import { Bot, Mail, GitBranch, Users, MessageSquareText, Film, Sparkles, Compass } from 'lucide-react';

interface ScenariosGalleryPageProps {
  onNavigateToTopic?: (topicId: string) => void;
}

export const ScenariosGalleryPage: React.FC<ScenariosGalleryPageProps> = ({ onNavigateToTopic }) => {
  const [activeScenario, setActiveScenario] = useState<string>('robot');

  const SCENARIOS_LIST = [
    {
      id: 'robot',
      title: 'A. Robot Maze (RL)',
      shortTitle: 'Robot Learning Maze',
      paradigm: 'Reinforcement Learning',
      icon: <Bot className="w-4 h-4" />,
      topicId: 'topic-1',
      desc: 'Watch an agent learn navigation policies via rewards and penalties in real time.',
    },
    {
      id: 'email',
      title: 'B. Email Classifier',
      shortTitle: 'Conveyor Spam Filter',
      paradigm: 'Supervised Learning',
      icon: <Mail className="w-4 h-4" />,
      topicId: 'topic-1',
      desc: 'Physical email cards traveling down an inspection conveyor into Inbox or Spam.',
    },
    {
      id: 'tree',
      title: 'C. Decision Tree Walk',
      shortTitle: 'Character Tree Journey',
      paradigm: 'Decision Trees & ID3',
      icon: <GitBranch className="w-4 h-4" />,
      topicId: 'topic-3',
      desc: 'A character walking branch-by-branch through the Play Tennis tree to pure leaves.',
    },
    {
      id: 'cluster',
      title: 'D. Customer Clustering',
      shortTitle: 'K-Means Migration',
      paradigm: 'Unsupervised Learning',
      icon: <Users className="w-4 h-4" />,
      topicId: 'topic-1',
      desc: 'Centroids physically migrating to the center of unlabeled customer clusters.',
    },
    {
      id: 'sentiment',
      title: 'E. Movie Review ABSA',
      shortTitle: 'Aspect Sentiment',
      paradigm: 'Applied NLP (Extension)',
      icon: <MessageSquareText className="w-4 h-4" />,
      topicId: 'topic-5',
      desc: 'Word-by-word streaming review analysis decoupling acting from direction.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF0FD] text-[#315CEB] border border-[#315CEB]/20 text-xs font-black shadow-sm">
          <Film className="w-4 h-4" />
          <span>Real Animated Learning Scenarios • Interactive Simulation Theater</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#26324B] tracking-tight">
          Animated Scenarios
        </h1>
        <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
          Watch machine learning algorithms come alive. Control the scenes, test what happens when conditions change, make predictions, and see the consequences in motion.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SCENARIOS_LIST.map((sc) => {
          const isActive = activeScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc.id)}
              className={`p-4 rounded-3xl border text-left transition-all ${
                isActive
                  ? 'border-[#315CEB] bg-[#EBF0FD] ring-2 ring-[#315CEB]/30 text-[#315CEB] shadow-playful-sm scale-102 font-bold'
                  : 'border-[#E8E5DE] bg-white hover:border-[#315CEB] text-[#26324B] shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                <span className={isActive ? 'text-[#315CEB]' : 'text-[#667085]'}>
                  {sc.icon}
                </span>
                <span className="truncate">{sc.title}</span>
              </div>
              <div className="text-[10px] font-black text-[#315CEB] mb-1">
                {sc.paradigm}
              </div>
              <div className="text-[10px] text-[#667085] line-clamp-2 leading-tight">
                {sc.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Component */}
      <div className="pt-2">
        {activeScenario === 'robot' && <RobotMazeScenario />}
        {activeScenario === 'email' && <EmailClassifierScenario />}
        {activeScenario === 'tree' && <DecisionTreeJourneyScenario />}
        {activeScenario === 'cluster' && <ClusteringScenario />}
        {activeScenario === 'sentiment' && <AspectSentimentScenario />}
      </div>
    </div>
  );
};
