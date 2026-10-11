export type DomainId = 'attention' | 'memory' | 'learning' | 'perception' | 'decision';

export interface DomainMeta {
  id: DomainId;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  gameTitle: string;
  gameType: string;
  theme: {
    primary: string;
    accent: string;
    bgStyle: string;
    borderStyle: string;
  };
}

export interface AttentionQuestion {
  id: string;
  topic: string;
  originalStatement: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AttentionRoundResult {
  round: number;
  topic: string;
  statement: string;
  userAnswerIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
}

export interface MemoryTile {
  index: number;
  number: number; // 1 to 9
  revealed: boolean;
  completed: boolean;
}

export type LearningColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW';

export interface LearningQuestion {
  id: number;
  word: LearningColor;
  color: LearningColor;
  rulePhase: 1 | 2; // 1: Text-color, 2: Word-meaning
}

export interface PerceptionQuestion {
  id: number;
  title: string;
  scenario: string;
  question: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  keyClue: string;
  explanation: string;
  biasChallenged: string;
}

export interface DecisionOption {
  text: string;
  interpretation: string;
  tags: string[];
}

export interface DecisionScenario {
  id: number;
  title: string;
  scenario: string;
  optionA: DecisionOption;
  optionB: DecisionOption;
  tradeoffNotice: string;
}

export interface DecisionProfile {
  title: string;
  subtitle: string;
  summary: string;
  prominentThemes: string[];
  strengths: string[];
  tradeoffs: string[];
  reflectionQuestions: string[];
}

export interface UserSessionProgress {
  completedDomains: Record<DomainId, boolean>;
  highScores: {
    attention?: { score: number; total: number; percentage: number };
    memory?: { score: number; total: number; completed: boolean };
    learning?: { score: number; total: number; p1Score: number; p2Score: number };
    perception?: { score: number; total: number };
    decision?: { profileTitle: string; choices: ('A' | 'B')[] };
  };
}
