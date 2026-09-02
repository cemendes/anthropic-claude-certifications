import type { Question } from '../types';
import { questions as d1 } from './ccdv/questions-d1';
import { questions as d2 } from './ccdv/questions-d2';
import { questions as d3 } from './ccdv/questions-d3';
import { questions as d4 } from './ccdv/questions-d4';
import { questions as d5 } from './ccdv/questions-d5';

export const ccdvQuestions: Question[] = [
  ...d1,
  ...d2,
  ...d3,
  ...d4,
  ...d5,
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
