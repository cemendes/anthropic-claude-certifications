import type { Question } from '../types';
import { questionsD1 } from './questions-d1';
import { questionsD2 } from './questions-d2';
import { questionsD3 } from './questions-d3';
import { questionsD4 } from './questions-d4';
import { questionsD5 } from './questions-d5';

export const questions: Question[] = [
  ...questionsD1,
  ...questionsD2,
  ...questionsD3,
  ...questionsD4,
  ...questionsD5,
];

export const DOMAIN_NAMES: Record<number, string> = {
  1: 'Agentic Architecture & Orchestration',
  2: 'Claude Code Configuration & Workflows',
  3: 'Prompt Engineering & Structured Output',
  4: 'Tool Design & MCP Integration',
  5: 'Context Management & Reliability',
};

export const DOMAIN_COLORS: Record<number, string> = {
  1: '#2C3E50',
  2: '#4A6B8C',
  3: '#437563',
  4: '#8C704A',
  5: '#FFB4AB',
};

export const EXAM_CONFIG = {
  totalQuestions: 60,
  timeMinutes: 120,
  passingScore: 720,
  maxScore: 1000,
  domainWeights: {
    1: 0.27,
    2: 0.20,
    3: 0.20,
    4: 0.18,
    5: 0.15,
  } as Record<number, number>,
};
