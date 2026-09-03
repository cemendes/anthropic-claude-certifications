import type { Question } from '../types';
import { questions as d1 } from './ccarp/questions-d1';
import { questions as d2 } from './ccarp/questions-d2';
import { questions as d3 } from './ccarp/questions-d3';
import { questions as d4 } from './ccarp/questions-d4';
import { questions as d5 } from './ccarp/questions-d5';

export const ccarpQuestions: Question[] = [
  ...d1,
  ...d2,
  ...d3,
  ...d4,
  ...d5,
];

export const CCARP_DOMAIN_NAMES: Record<number, string> = {
  1: 'Enterprise Multi-Agent Swarms & Systems',
  2: 'Production MCP Architecture & Security',
  3: 'Multi-Cloud Deployment & Failover Resilience',
  4: 'Enterprise Governance, Privacy & Security',
  5: 'Evals-as-Code & Continuous Observability',
};

export const CCARP_DOMAIN_COLORS: Record<number, string> = {
  1: '#8E44AD',
  2: '#2980B9',
  3: '#D35400',
  4: '#27AE60',
  5: '#C0392B',
};
