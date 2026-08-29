export interface QuestionOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuestionReference {
  title: string;
  url: string;
}

export interface Question {
  id: number;
  domain: 1 | 2 | 3 | 4 | 5;
  domainName: string;
  referenceContext?: string;
  scenario: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  keyConcept: string;
  explanation: string;
  distractorAnalysis: Record<string, string>;
  references: QuestionReference[];
}

export type QuizMode = 'study' | 'exam' | 'review' | null;

export interface QuizState {
  mode: QuizMode;
  currentIndex: number;
  answers: Record<number, string>; // questionId -> selected label
  flagged: Set<number>; // questionId set
  showExplanation: boolean;
  submitted: boolean;
  selectedDomains: number[];
  questions: Question[];
}
