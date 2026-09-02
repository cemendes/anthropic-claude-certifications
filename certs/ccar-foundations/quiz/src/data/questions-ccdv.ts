import type { Question } from '../types';
import { questionsD1 } from './ccdv/questions-d1';
import { questionsD2 } from './ccdv/questions-d2';
import { questionsD3 } from './ccdv/questions-d3';
import { questionsD4 } from './ccdv/questions-d4';
import { questionsD5 } from './ccdv/questions-d5';

export const ccdvQuestions: Question[] = [
  ...questionsD1,
  ...questionsD2,
  ...questionsD3,
  ...questionsD4,
  ...questionsD5,
];

export const CCDV_DOMAIN_NAMES: Record<number, string> = {
  1: 'Anthropic Messages API & SDKs',
  2: 'Tool Calling & JSON Schemas',
  3: 'Structured Outputs & Advanced Prompting',
  4: 'Prompt Caching & Cost/Latency Optimization',
  5: 'Error Handling, Rate Limits & Evaluation',
};

export const CCDV_DOMAIN_COLORS: Record<number, string> = {
  1: '#2C3E50',
  2: '#4A6B8C',
  3: '#437563',
  4: '#8C704A',
  5: '#FFB4AB',
};
