import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LearningJourneyPage } from './pages/LearningJourneyPage';
import { LessonViewPage } from './pages/LessonViewPage';
import { LabPage } from './pages/LabPage';
import { MathsPlaygroundPage } from './pages/MathsPlaygroundPage';
import { VideoLearningPage } from './pages/VideoLearningPage';
import { RevisionStudioPage } from './pages/RevisionStudioPage';
import { AboutPage } from './pages/AboutPage';
import { ScenariosGalleryPage } from './pages/ScenariosGalleryPage';

// Helper to determine initial tab and topic from current window location
function parseLocation(): { tab: string; topicId: string } {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const searchParams = new URLSearchParams(window.location.search);
  const topicParam = searchParams.get('topic');

  const validTabs = ['home', 'journey', 'scenarios', 'lesson', 'lab', 'maths', 'videos', 'revision', 'about'];

  if (!path || path === '') {
    return { tab: 'home', topicId: topicParam || 'topic-1' };
  }

  // Handle /lesson/topic-X or /lesson
  if (path.startsWith('lesson')) {
    const segments = path.split('/');
    const specificTopic = segments[1] || topicParam || 'topic-1';
    return { tab: 'lesson', topicId: specificTopic };
  }

  const primarySegment = path.split('/')[0];
  if (validTabs.includes(primarySegment)) {
    return { tab: primarySegment, topicId: topicParam || 'topic-1' };
  }

  return { tab: 'home', topicId: 'topic-1' };
}

export function App() {
  const initial = parseLocation();
  const [activeTab, setActiveTabState] = useState<string>(initial.tab);
  const [currentTopicId, setCurrentTopicId] = useState<string>(initial.topicId);

  // Synchronize state changes to browser URL without full reload
  const navigate = useCallback((tab: string, topic?: string) => {
    setActiveTabState(tab);
    if (topic) {
      setCurrentTopicId(topic);
    }
    const targetTopic = topic || currentTopicId;
    let newPath = tab === 'home' ? '/' : `/${tab}`;
    if (tab === 'lesson' && targetTopic) {
      newPath = `/lesson?topic=${targetTopic}`;
    }

    if (window.location.pathname + window.location.search !== newPath) {
      window.history.pushState({ tab, topic: targetTopic }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTopicId]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation();
      setActiveTabState(parsed.tab);
      setCurrentTopicId(parsed.topicId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStartLearning = () => {
    navigate('lesson', 'topic-1');
  };

  const handleSelectTopic = (topicId: string) => {
    navigate('lesson', topicId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F0] text-[#26324B] font-sans selection:bg-[#315CEB] selection:text-white transition-colors">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => navigate(tab)}
        onStartLearning={handleStartLearning}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartLearning={handleStartLearning}
            onNavigateToTopic={handleSelectTopic}
            onNavigateTab={(tab) => navigate(tab)}
          />
        )}

        {activeTab === 'journey' && (
          <LearningJourneyPage
            onSelectTopic={handleSelectTopic}
            onNavigateTab={(tab) => navigate(tab)}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonViewPage
            topicId={currentTopicId}
            onSelectTopic={handleSelectTopic}
            onBackToJourney={() => navigate('journey')}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenariosGalleryPage onNavigateToTopic={handleSelectTopic} />
        )}

        {activeTab === 'lab' && <LabPage />}

        {activeTab === 'maths' && <MathsPlaygroundPage />}

        {activeTab === 'videos' && <VideoLearningPage />}

        {activeTab === 'revision' && <RevisionStudioPage />}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => navigate(tab)} />
    </div>
  );
}

export default App;
