export type LearningType = 'supervised' | 'unsupervised' | 'reinforcement' | 'semi-supervised';

export interface SorterScenario {
  id: string;
  title: string;
  description: string;
  correctCategory: LearningType;
  explanation: string;
  whyOthersFail: Record<LearningType, string>;
  realWorldContext: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  isMisconception?: boolean;
}

export interface VideoResource {
  id: string;
  title: string;
  topicId: string;
  topicTitle: string;
  description: string;
  youtubeId?: string;
  youtubeUrl: string;
  duration?: string;
  keyConcepts: string[];
  isVerified: boolean;
  notesSummary: string;
}

export interface LessonSection {
  id: string;
  topicNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  category: 'core' | 'extension';
  hook: {
    question: string;
    scenario: string;
  };
  intuition: {
    story: string;
    keyTakeaway: string;
  };
  formal: {
    definition: string;
    terminology: { term: string; definition: string }[];
  };
  visualExplanation: {
    summary: string;
    interactiveType: 'sorter' | 'tree' | 'entropy' | 'gain' | 'hypothesis' | 'regression';
  };
  mathsSimple?: {
    whyNeeded: string;
    formulaLatex: string;
    symbols: { symbol: string; meaning: string }[];
    numericalExample: {
      problem: string;
      steps: { stepName: string; calculation: string; result: string; explanation: string }[];
      finalMeaning: string;
    };
  };
  tryItYourself: {
    instruction: string;
    prompt: string;
    solution: string;
  };
  video?: {
    title: string;
    youtubeUrl: string;
    youtubeId?: string;
    summary: string;
  };
  knowledgeCheck: QuizQuestion[];
  summary: {
    keyPoints: string[];
    revisionChecklist: string[];
  };
}
