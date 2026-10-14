import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScenarioFrame, PredictionChallenge } from './ScenarioFrame';
import { triggerCelebration } from '../common/Celebration';
import { Mail, ShieldCheck, ShieldAlert, Sliders, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  spamKeywords: string[];
  linkCount: number;
  hasAttachment: boolean;
  groundTruth: 'SPAM' | 'HAM';
}

const SAMPLE_EMAILS: EmailItem[] = [
  {
    id: 'e1',
    sender: 'prize-notify@lottery-win.com',
    subject: 'URGENT: Claim your $5,000 Cash Prize Now!',
    spamKeywords: ['URGENT', 'Claim', 'Cash Prize'],
    linkCount: 4,
    hasAttachment: false,
    groundTruth: 'SPAM',
  },
  {
    id: 'e2',
    sender: 'hod.cse@adishankara.ac.in',
    subject: 'Department Faculty Meeting Schedule - Monday 10 AM',
    spamKeywords: [],
    linkCount: 1,
    hasAttachment: true,
    groundTruth: 'HAM',
  },
  {
    id: 'e3',
    sender: 'support@bank-security-verify.net',
    subject: 'Account Suspended: Immediate password verification needed',
    spamKeywords: ['Suspended', 'Immediate', 'verification'],
    linkCount: 3,
    hasAttachment: false,
    groundTruth: 'SPAM',
  },
  {
    id: 'e4',
    sender: 'student.sharika@gmail.com',
    subject: 'Assignment 3 Submission - Decision Tree Implementation',
    spamKeywords: [],
    linkCount: 0,
    hasAttachment: true,
    groundTruth: 'HAM',
  },
  {
    id: 'e5',
    sender: 'promo@greatdeals-online.org',
    subject: 'FREE coupons! Limited time 90% discount on electronics',
    spamKeywords: ['FREE', 'discount'],
    linkCount: 5,
    hasAttachment: false,
    groundTruth: 'SPAM',
  },
  {
    id: 'e6',
    sender: 'registrar@ktu.edu.in',
    subject: 'University Examination Timetable Notification',
    spamKeywords: [],
    linkCount: 1,
    hasAttachment: false,
    groundTruth: 'HAM',
  },
];

export const EmailClassifierScenario: React.FC = () => {
  const [emailIndex, setEmailIndex] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(40); // Spam score threshold
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [cardPosition, setCardPosition] = useState<'conveyor' | 'scanner' | 'inbox' | 'spam'>('conveyor');
  const [stats, setStats] = useState({
    processed: 0,
    truePositives: 0,
    trueNegatives: 0,
    falsePositives: 0,
    falseNegatives: 0,
  });
  const [currentActionDesc, setCurrentActionDesc] = useState<string>(
    'Email card placed on the incoming inspection conveyor.'
  );
  const [userPrediction, setUserPrediction] = useState<string | null>(null);

  const email = SAMPLE_EMAILS[emailIndex];

  // Calculate transparent rule-based Spam Score (0 - 100)
  const spamScore = Math.min(
    100,
    email.spamKeywords.length * 25 + email.linkCount * 12 + (email.sender.includes('.com') || email.sender.includes('.net') || email.sender.includes('.org') ? 10 : 0)
  );

  const predictedClass: 'SPAM' | 'HAM' = spamScore >= threshold ? 'SPAM' : 'HAM';
  const isCorrect = predictedClass === email.groundTruth;

  // Step function
  const stepClassification = useCallback(() => {
    if (cardPosition === 'conveyor') {
      setCardPosition('scanner');
      setCurrentActionDesc(
        `Scanning "${email.subject}": found ${email.spamKeywords.length} keywords & ${email.linkCount} links. Computed Spam Score: ${spamScore} / 100.`
      );
    } else if (cardPosition === 'scanner') {
      const destination = predictedClass === 'SPAM' ? 'spam' : 'inbox';
      setCardPosition(destination);

      const isTP = email.groundTruth === 'SPAM' && predictedClass === 'SPAM';
      const isTN = email.groundTruth === 'HAM' && predictedClass === 'HAM';
      const isFP = email.groundTruth === 'HAM' && predictedClass === 'SPAM';
      const isFN = email.groundTruth === 'SPAM' && predictedClass === 'HAM';

      setStats((prev) => ({
        processed: prev.processed + 1,
        truePositives: prev.truePositives + (isTP ? 1 : 0),
        trueNegatives: prev.trueNegatives + (isTN ? 1 : 0),
        falsePositives: prev.falsePositives + (isFP ? 1 : 0),
        falseNegatives: prev.falseNegatives + (isFN ? 1 : 0),
      }));

      if (isCorrect) triggerCelebration();

      setCurrentActionDesc(
        `Classifier decision: Routed to ${destination.toUpperCase()} (Score: ${spamScore} vs Threshold: ${threshold}). Result: ${
          isCorrect ? '✅ Correct Classification' : '⚠️ Misclassification Error'
        }!`
      );
    } else {
      // Advance to next email
      const nextIdx = (emailIndex + 1) % SAMPLE_EMAILS.length;
      setEmailIndex(nextIdx);
      setCardPosition('conveyor');
      setCurrentActionDesc(`Loaded next email #${nextIdx + 1} onto conveyor.`);
    }
  }, [cardPosition, email, emailIndex, isCorrect, predictedClass, spamScore, threshold]);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = 1200 / speed;
    const interval = setInterval(() => {
      stepClassification();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isRunning, speed, stepClassification]);

  const handleReset = () => {
    setIsRunning(false);
    setEmailIndex(0);
    setCardPosition('conveyor');
    setStats({
      processed: 0,
      truePositives: 0,
      trueNegatives: 0,
      falsePositives: 0,
      falseNegatives: 0,
    });
    setCurrentActionDesc('Classifier reset to initial state.');
  };

  const predictionChallenge: PredictionChallenge = {
    question:
      'What happens to classification performance if the Spam Threshold is drastically lowered from 50 to 15?',
    options: [
      {
        id: 'opt-fp',
        label: 'More spam will be caught, but harmless emails with links might be falsely sent to Spam (Higher False Positives).',
        isCorrect: true,
        explanation:
          'Lowering the classification threshold increases sensitivity to spam, but simultaneously increases the false alarm rate (Type I error / False Positives).',
      },
      {
        id: 'opt-fn',
        label: 'Spam emails will bypass the filter directly into the inbox.',
        isCorrect: false,
        explanation:
          'Lowering the threshold makes the filter more aggressive, not less. Bypassing spam happens when threshold is set too high.',
      },
      {
        id: 'opt-nochange',
        label: 'No change, because supervised machine learning is independent of threshold cutoffs.',
        isCorrect: false,
        explanation:
          'Decision boundaries in binary classification are fundamentally defined by the operating threshold.',
      },
    ],
  };

  const accuracy =
    stats.processed > 0
      ? (((stats.truePositives + stats.trueNegatives) / stats.processed) * 100).toFixed(0)
      : '100';

  return (
    <ScenarioFrame
      title="Scenario B: Animated Email Classifier (Supervised Classification)"
      badge="Supervised Learning • Binary Classification"
      badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800"
      story="Watch email cards physically travel along a classification conveyor. An inspection scanner extracts features (keywords, links, domain), computes a spam score, and routes each card to the Safe Inbox or Spam Quarantine."
      isRunning={isRunning}
      onTogglePlay={() => setIsRunning(!isRunning)}
      onStep={stepClassification}
      onReset={handleReset}
      speed={speed}
      onSpeedChange={setSpeed}
      prediction={predictionChallenge}
      userPrediction={userPrediction}
      onSelectPrediction={setUserPrediction}
      currentStepDescription={currentActionDesc}
      scientificExplanation="Supervised classification maps an input feature vector $\\mathbf{x} = [\\text{keywords}, \\text{links}, \\text{domain}]$ to a categorical target $y \\in \\{\\text{SPAM}, \\text{HAM}\\}$. The model evaluates a decision boundary $f(\\mathbf{x}) \\ge \\theta$. Adjusting $\\theta$ shifts the trade-off between False Positives (good email sent to spam) and False Negatives (spam entering inbox)."
      formalConcept="Module 5 Form of Learning #1: Supervised Learning. Training instances provide explicit pairs $(\\mathbf{x}, y)$ containing both observations and ground-truth teacher labels."
      followUpChallenge="Adjust the Spam Threshold slider below between 20 and 70 to test the trade-off on accuracy!"
      telemetry={
        <>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Processed</span>
            <span className="font-bold text-slate-200 text-sm">{stats.processed}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Accuracy</span>
            <span className="font-bold text-emerald-400 text-sm">{accuracy}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">False Positives</span>
            <span className={`font-bold text-sm ${stats.falsePositives > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              {stats.falsePositives}
            </span>
          </div>
        </>
      }
    >
      {/* Animated Classification Conveyor Viewport */}
      <div className="p-6 sm:p-8 flex flex-col items-center justify-between min-h-[360px] select-none space-y-6">
        {/* Top Control: Adjustable Threshold Slider */}
        <div className="w-full max-w-xl p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sliders className="w-4 h-4 text-brand-400" />
            <span className="font-bold">Spam Score Cutoff (&theta;):</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <span className="font-mono font-bold text-brand-400 w-12 text-right">
            &ge; {threshold}
          </span>
        </div>

        {/* Conveyor Belt & Routing Stations */}
        <div className="w-full max-w-2xl relative py-6">
          {/* Conveyor Track */}
          <div className="w-full h-3 bg-slate-800 rounded-full border border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent animate-shimmer" />
          </div>

          {/* Three Stage Zones */}
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            {/* 1. Ingestion */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Conveyor Ingestion
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            {/* 2. Feature Scanner */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 mb-2">
                2. Feature Inspection Scanner
              </span>
              <div className="px-4 py-2 rounded-xl bg-brand-950/80 border border-brand-500 text-brand-300 font-mono text-xs shadow-lg">
                Score: {cardPosition !== 'conveyor' ? spamScore : '...'} / 100
              </div>
            </div>

            {/* 3. Bins */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                3. Classified Destinations
              </span>
              <div className="flex gap-2">
                <div
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 ${
                    cardPosition === 'inbox'
                      ? 'bg-emerald-600 text-white border-white scale-105 shadow-lg'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Inbox
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 ${
                    cardPosition === 'spam'
                      ? 'bg-rose-600 text-white border-white scale-105 shadow-lg'
                      : 'bg-rose-950/60 text-rose-300 border-rose-800'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Spam
                </div>
              </div>
            </div>
          </div>

          {/* Physically Moving Email Card */}
          <div
            className={`mt-4 p-4 rounded-2xl border-2 transition-all duration-500 shadow-2xl max-w-md mx-auto ${
              cardPosition === 'spam'
                ? 'bg-rose-950/90 border-rose-500 text-rose-100'
                : cardPosition === 'inbox'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
                : 'bg-slate-900 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-mono text-slate-400">From: {email.sender}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-800 border border-slate-700">
                True Label: {email.groundTruth}
              </span>
            </div>

            <div className="font-bold text-sm text-white mb-2 leading-tight">
              {email.subject}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              {email.spamKeywords.length > 0 ? (
                email.spamKeywords.map((kw, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-800">
                    ⚠ {kw}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">No high-risk keywords</span>
              )}
              <span className="text-slate-400 ml-auto font-mono">
                Links: {email.linkCount} | Att: {email.hasAttachment ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScenarioFrame>
  );
};
