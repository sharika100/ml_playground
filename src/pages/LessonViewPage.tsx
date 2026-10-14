import React, { useState, useEffect } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { MathFormula } from '../components/common/MathFormula';
import { Callout } from '../components/common/Callout';
import { QuizCard } from '../components/interactive/QuizCard';
import { LearningSorter } from '../components/interactive/LearningSorter';
import { DecisionTreeBuilder } from '../components/interactive/DecisionTreeBuilder';
import { EntropyExplorer } from '../components/interactive/EntropyExplorer';
import { InformationGainCalculator } from '../components/interactive/InformationGainCalculator';
import { HypothesisPlayground } from '../components/interactive/HypothesisPlayground';
import { RegressionPlayground } from '../components/interactive/RegressionPlayground';
import { RobotMazeScenario } from '../components/scenarios/RobotMazeScenario';
import { EmailClassifierScenario } from '../components/scenarios/EmailClassifierScenario';
import { DecisionTreeJourneyScenario } from '../components/scenarios/DecisionTreeJourneyScenario';
import { ClusteringScenario } from '../components/scenarios/ClusteringScenario';
import { AspectSentimentScenario } from '../components/scenarios/AspectSentimentScenario';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Play,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronRight,
  Eye,
  ListFilter,
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';

interface LessonViewPageProps {
  topicId: string;
  onSelectTopic: (id: string) => void;
  onBackToJourney: () => void;
}

export const LessonViewPage: React.FC<LessonViewPageProps> = ({
  topicId,
  onSelectTopic,
  onBackToJourney,
}) => {
  const lesson = CURRICULUM.find((l) => l.id === topicId) || CURRICULUM[0];
  const currentIndex = CURRICULUM.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? CURRICULUM[currentIndex - 1] : null;
  const nextLesson = currentIndex + 1 < CURRICULUM.length ? CURRICULUM[currentIndex + 1] : null;

  // Active stage state (1 to 9)
  const [activeStage, setActiveStage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'stepped' | 'full'>('stepped');
  const [showPredictionSolution, setShowPredictionSolution] = useState<boolean>(false);

  // Reset to stage 1 when topicId changes
  useEffect(() => {
    setActiveStage(1);
    setShowPredictionSolution(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topicId]);

  const STAGES = [
    { id: 1, label: 'Dilemma & Hook', icon: Lightbulb, color: 'text-amber-500' },
    { id: 2, label: 'Intuition', icon: Brain, color: 'text-brand-500' },
    { id: 3, label: 'Scientific Concept', icon: BookOpen, color: 'text-indigo-500' },
    { id: 4, label: 'Interactive Lab', icon: Sparkles, color: 'text-emerald-500' },
    { id: 5, label: 'Mathematics', icon: Calculator, color: 'text-blue-500' },
    { id: 6, label: 'Try It Yourself', icon: HelpCircle, color: 'text-violet-500' },
    { id: 7, label: 'Video Lecture', icon: Play, color: 'text-rose-500' },
    { id: 8, label: 'Mastery Quiz', icon: CheckCircle2, color: 'text-emerald-500' },
    { id: 9, label: 'Checklist & Summary', icon: ListFilter, color: 'text-slate-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <button
          onClick={onBackToJourney}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Journey</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Mode toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewMode('stepped')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'stepped'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Focus Stepper
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'full'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Full Document
            </button>
          </div>

          <div className="text-xs font-mono font-bold text-slate-400 px-2">
            Topic {lesson.topicNumber} of {CURRICULUM.length}
          </div>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            Topic {lesson.topicNumber}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> ~{lesson.estimatedMinutes} mins
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {lesson.subtitle}
        </p>
      </div>

      {/* PROGRESSIVE DISCLOSURE STEPPER BAR (Always visible or in Stepped mode) */}
      <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {STAGES.map((st) => {
            const Icon = st.icon;
            const isActive = activeStage === st.id;
            const isCompleted = activeStage > st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStage(st.id)}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md scale-105'
                    : isCompleted
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40'
                    : 'bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : st.color}`} />
                <span className="truncate">{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STAGE CONTENT CONTAINER */}
      <div className="space-y-10">
        {/* STAGE 1: THE HOOK & SCENARIO */}
        {(viewMode === 'full' || activeStage === 1) && (
          <section className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Stage 1: The Dilemma & Real-World Hook</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {lesson.hook.question}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {lesson.hook.scenario}
            </p>
          </section>
        )}

        {/* STAGE 2: THE INTUITION */}
        {(viewMode === 'full' || activeStage === 2) && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>Stage 2: Core Intuition in Plain English</span>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <p>{lesson.intuition.story}</p>
              <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-200 text-xs font-bold flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Core Takeaway: {lesson.intuition.keyTakeaway}</span>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 3: THE FORMAL SCIENTIFIC DEFINITION */}
        {(viewMode === 'full' || activeStage === 3) && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Stage 3: Scientific Definition & Technical Terminology</span>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Authoritative Source Definition (Mitchell & Russell-Norvig)
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed italic">
                  "{lesson.formal.definition}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {lesson.formal.terminology.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                  >
                    <div className="font-bold text-slate-900 dark:text-white mb-1">{t.term}</div>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.definition}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STAGE 4: INTERACTIVE LABS & ANIMATED SCENARIOS */}
        {(viewMode === 'full' || activeStage === 4) && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Stage 4: Interactive Simulation & Animated Scenarios</span>
            </div>

            <div className="space-y-8">
              {lesson.topicNumber === 1 && (
                <div className="space-y-8">
                  <RobotMazeScenario />
                  <EmailClassifierScenario />
                  <ClusteringScenario />
                  <LearningSorter />
                </div>
              )}

              {lesson.topicNumber === 2 && (
                <div className="space-y-8">
                  <EmailClassifierScenario />
                  <LearningSorter />
                </div>
              )}

              {lesson.topicNumber === 3 && (
                <div className="space-y-8">
                  <DecisionTreeJourneyScenario />
                  <DecisionTreeBuilder />
                  <EntropyExplorer />
                  <InformationGainCalculator />
                </div>
              )}

              {lesson.topicNumber === 4 && <HypothesisPlayground />}

              {lesson.topicNumber === 5 && (
                <div className="space-y-8">
                  <RegressionPlayground />
                  <AspectSentimentScenario />
                </div>
              )}
            </div>
          </section>
        )}

        {/* STAGE 5: MATHEMATICS & NUMERICAL DERIVATIONS */}
        {(viewMode === 'full' || activeStage === 5) && lesson.mathsSimple && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Stage 5: Maths Made Simple (Step-by-Step Rigor)</span>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lesson.mathsSimple.whyNeeded}
              </p>

              <MathFormula formula={lesson.mathsSimple.formulaLatex} block title="Mathematical Formulation" />

              {/* Symbol Definitions Table */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Symbol Breakdown:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {lesson.mathsSimple.symbols.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-baseline gap-2"
                    >
                      <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                        {s.symbol}:
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">{s.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Numerical Walkthrough */}
              <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 font-mono text-xs space-y-4 border border-slate-800 shadow-xl">
                <div className="text-brand-400 font-bold uppercase tracking-wider text-[11px]">
                  Worked Numerical Example: {lesson.mathsSimple.numericalExample.problem}
                </div>
                <div className="space-y-2.5">
                  {lesson.mathsSimple.numericalExample.steps.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div className="text-slate-400 text-[10px] font-sans font-bold mb-1">{st.stepName}</div>
                      <div className="text-amber-300 font-bold">{st.calculation} ➔ {st.result}</div>
                      <div className="text-slate-300 text-[11px] font-sans italic mt-1">{st.explanation}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800 text-emerald-400 text-xs font-sans">
                  <strong>Result Meaning:</strong> {lesson.mathsSimple.numericalExample.finalMeaning}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 6: TRY IT YOURSELF CHALLENGE */}
        {(viewMode === 'full' || activeStage === 6) && (
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Stage 6: Prediction Challenge & Self-Check</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{lesson.tryItYourself.instruction}</p>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              ❓ {lesson.tryItYourself.prompt}
            </div>

            <div>
              <button
                onClick={() => setShowPredictionSolution(!showPredictionSolution)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-bold text-xs transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPredictionSolution ? 'Hide Solution' : 'Reveal Solution & Scientific Rationale'}</span>
              </button>

              {showPredictionSolution && (
                <div className="mt-3 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-xs leading-relaxed animate-fade-in">
                  <strong>Scientific Solution:</strong> {lesson.tryItYourself.solution}
                </div>
              )}
            </div>
          </section>
        )}

        {/* STAGE 7: WATCH VIDEO LECTURE */}
        {(viewMode === 'full' || activeStage === 7) && lesson.video && (
          <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
              <YoutubeIcon className="w-4 h-4" />
              <span>Stage 7: Watch Sharika T R Video Lecture</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">{lesson.video.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{lesson.video.summary}</p>
              <a
                href={lesson.video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-600/30"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Problem Walkthrough on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </section>
        )}

        {/* STAGE 8: MASTERY QUIZ */}
        {(viewMode === 'full' || activeStage === 8) && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Stage 8: Topic Knowledge Mastery Check</span>
            </div>
            <QuizCard questions={lesson.knowledgeCheck} title={`Topic ${lesson.topicNumber} Mastery Check`} />
          </section>
        )}

        {/* STAGE 9: CHECKLIST & SUMMARY */}
        {(viewMode === 'full' || activeStage === 9) && (
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
              Stage 9: Key Takeaways & Exam Checklist
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              {lesson.summary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-brand-600 dark:text-brand-400 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2.5">
                Self-Assessment Checklist:
              </span>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {lesson.summary.revisionChecklist.map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <input type="checkbox" className="rounded text-brand-600 accent-brand-600" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Stepped Navigation Controls (Previous Stage / Next Stage) */}
      {viewMode === 'stepped' && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            disabled={activeStage === 1}
            onClick={() => {
              setActiveStage((s) => Math.max(1, s - 1));
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Stage</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-400">
            Stage {activeStage} of {STAGES.length}
          </span>

          <button
            onClick={() => {
              if (activeStage < STAGES.length) {
                setActiveStage((s) => s + 1);
                window.scrollTo({ top: 200, behavior: 'smooth' });
              } else if (nextLesson) {
                onSelectTopic(nextLesson.id);
              } else {
                onBackToJourney();
              }
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>{activeStage < STAGES.length ? 'Next Stage' : 'Complete Topic →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Nav Between Topics */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevLesson ? (
          <button
            onClick={() => onSelectTopic(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic {prevLesson.topicNumber}: {prevLesson.title}</span>
          </button>
        ) : (
          <div></div>
        )}

        {nextLesson ? (
          <button
            onClick={() => onSelectTopic(nextLesson.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow-md hover:scale-105 active:scale-95"
          >
            <span>Topic {nextLesson.topicNumber}: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToJourney}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md hover:scale-105 active:scale-95"
          >
            <span>Finish to Revision Studio</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
