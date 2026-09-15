import type { Question } from '../types';
import { questions as d1 } from './ccao/questions-d1';
import { questions as d2 } from './ccao/questions-d2';
import { questions as d3 } from './ccao/questions-d3';
import { questions as d4 } from './ccao/questions-d4';
import { questions as d5 } from './ccao/questions-d5';

export const ccaoQuestions: Question[] = [
  ...d1,
  ...d2,
  ...d3,
  ...d4,
  ...d5,
];

export const CCAO_DOMAIN_NAMES: Record<number, string> = {
  1: 'Claude Web, Desktop & Project Knowledge Bases',
  2: 'Artifacts Lifecycle & Component Visualizations',
  3: 'Multimodal Document & Vision Intelligence',
  4: 'Everyday Prompting & Structuring for Knowledge Workers',
  5: 'Collaboration, Team Workspaces & Commercial Privacy',
};

export const CCAO_DOMAIN_COLORS: Record<number, string> = {
  1: '#3498DB',
  2: '#E67E22',
  3: '#1ABC9C',
  4: '#9B59B6',
  5: '#34495E',
};
