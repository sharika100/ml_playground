import React from 'react';
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBackToJourney}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Journey</span>
        </button>
        <div className="text-xs font-mono font-semibold text-slate-400">
          Module {lesson.topicNumber} of {CURRICULUM.length}
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            Topic {lesson.topicNumber}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{lesson.estimatedMinutes} mins
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {lesson.subtitle}
        </p>
      </div>

      {/* STAGE 1: THE HOOK */}
      <section className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Stage 1: The Dilemma & Real-World Hook</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {lesson.hook.question}
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.hook.scenario}
        </p>
      </section>

      {/* STAGE 2: THE INTUITION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Stage 2: Core Intuition in Plain English</span>
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <p>{lesson.intuition.story}</p>
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-200 text-xs font-semibold">
            💡 Takeaway: {lesson.intuition.keyTakeaway}
          </div>
        </div>
      </section>

      {/* STAGE 3: THE FORMAL CONCEPT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Stage 3: Scientific Definition & Technical Terminology</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Authoritative Source Definition
            </span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed italic">
              "{lesson.formal.definition}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {lesson.formal.terminology.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-white mb-1">{t.term}</div>
                <div className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.definition}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 4: VISUAL EXPLANATION & INTERACTIVE SIMULATION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Stage 4: Interactive Simulation & Visual Proof</span>
        </div>

        <div>
          {lesson.topicNumber === 1 && <LearningSorter />}
          {lesson.topicNumber === 2 && <LearningSorter />}
          {lesson.topicNumber === 3 && (
            <div className="space-y-8">
              <DecisionTreeBuilder />
              <EntropyExplorer />
              <InformationGainCalculator />
            </div>
          )}
          {lesson.topicNumber === 4 && <HypothesisPlayground />}
          {lesson.topicNumber === 5 && <RegressionPlayground />}
        </div>
      </section>

      {/* STAGE 5: MATHS MADE SIMPLE */}
      {lesson.mathsSimple && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Stage 5: Maths Made Simple (Step-by-Step Rigor)</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {lesson.mathsSimple.whyNeeded}
            </p>

            <MathFormula
              formula={lesson.mathsSimple.formulaLatex}
              block
              title="Mathematical Formulation"
            />

            {/* Symbol Definitions Table */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Symbol Breakdown:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {lesson.mathsSimple.symbols.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-baseline gap-2"
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
            <div className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3 mt-4">
              <div className="text-brand-400 font-bold uppercase tracking-wider text-[11px]">
                Worked Numerical Example: {lesson.mathsSimple.numericalExample.problem}
              </div>
              <div className="space-y-2">
                {lesson.mathsSimple.numericalExample.steps.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/60">
                    <div className="text-slate-400 text-[10px] font-sans font-bold">{st.stepName}</div>
                    <div className="text-amber-300">{st.calculation} ➔ {st.result}</div>
                    <div className="text-slate-400 text-[11px] font-sans italic mt-0.5">{st.explanation}</div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 text-emerald-400 text-xs font-sans">
                <strong>Result Meaning:</strong> {lesson.mathsSimple.numericalExample.finalMeaning}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STAGE 6: TRY IT YOURSELF */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Stage 6: Try It Yourself Challenge</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">{lesson.tryItYourself.instruction}</p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
          ❓ {lesson.tryItYourself.prompt}
        </div>
        <details className="text-xs pt-1">
          <summary className="font-bold text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">
            Click to reveal expert solution & rationale
          </summary>
          <div className="mt-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
            {lesson.tryItYourself.solution}
          </div>
        </details>
      </section>

      {/* STAGE 7: WATCH SHARIKATR VIDEO */}
      {lesson.video && (
        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <YoutubeIcon className="w-4 h-4" />
            <span>Stage 7: Watch SharikaTR Video Lecture</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">{lesson.video.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{lesson.video.summary}</p>
            <a
              href={lesson.video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Lecture on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </section>
      )}

      {/* STAGE 8: CHECK UNDERSTANDING */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Stage 8: Check Understanding</span>
        </div>
        <QuizCard questions={lesson.knowledgeCheck} title={`Topic ${lesson.topicNumber} Mastery Check`} />
      </section>

      {/* STAGE 9: SUMMARY & REVISION CHECKLIST */}
      <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Stage 9: Key Takeaways & Checklist
        </div>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          {lesson.summary.keyPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-brand-600 dark:text-brand-400 font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
            Self-Assessment Checklist:
          </span>
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {lesson.summary.revisionChecklist.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-brand-600" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Nav Between Lessons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevLesson ? (
          <button
            onClick={() => onSelectTopic(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic {prevLesson.topicNumber}: {prevLesson.title}</span>
          </button>
        ) : <div></div>}

        {nextLesson ? (
          <button
            onClick={() => onSelectTopic(nextLesson.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow-md"
          >
            <span>Topic {nextLesson.topicNumber}: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToJourney}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md"
          >
            <span>Finish to Revision Studio</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
