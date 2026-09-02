import type { Question } from '../../types';

export const questionsD4: Question[] = [
  {
    id: 401,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: 'A developer adds cache_control: {"type": "ephemeral"} to a system prompt containing 650 tokens on Claude 3.5 Sonnet.',
    question: 'What will be the result of this caching configuration?',
    options: [
      { label: 'A', text: 'The prompt will be cached normally with a 5-minute TTL.' },
      { label: 'B', text: 'The API will return an HTTP 400 InvalidRequestError because the prompt is below the 1,024 minimum token threshold.' },
      { label: 'C', text: 'The prompt will not be cached, and standard input token rates will apply without throwing an error.' },
      { label: 'D', text: 'The prompt will be padded with whitespace automatically up to 1,024 tokens.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Prompt Caching Minimum Token Thresholds',
    explanation: 'Claude 3.5 Sonnet requires a minimum of 1,024 tokens for Prompt Caching. If a marked block is below this threshold, the request succeeds normally without error, but caching does not activate and no cache tokens are written.',
    distractorAnalysis: {
      A: 'The 650-token block does not meet the 1,024 minimum token requirement.',
      B: 'The API does not fail or reject requests that fall below cache thresholds.',
      D: 'Anthropic does not auto-pad prompts with whitespace tokens.'
    },
    references: [
      { title: 'Anthropic Prompt Caching Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' }
    ]
  }
];
