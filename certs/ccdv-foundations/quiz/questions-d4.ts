import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 401,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: "A developer adds cache_control: {'type': 'ephemeral'} to a system prompt containing 650 tokens on Claude 3.5 Sonnet.",
    question: 'What will be the result of this caching configuration?',
    options: [
      { label: 'A', text: 'The prompt will be cached normally with a 5-minute TTL.' },
      { label: 'B', text: 'The API will return an HTTP 400 InvalidRequestError because the prompt is below the 1,024 minimum token threshold.' },
      { label: 'C', text: 'The prompt will not be cached, and standard input token rates will apply without throwing an error.' },
      { label: 'D', text: 'The prompt will be padded with whitespace automatically up to 1,024 tokens.' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Prompt Caching Minimum Token Thresholds',
    explanation: 'Claude 3.5 Sonnet requires a minimum of 1,024 tokens for Prompt Caching. If a marked block is below this threshold, the request succeeds normally without error, but caching does not activate and no cache tokens are written.',
    distractorAnalysis: {
      A: 'The 650-token block does not meet the 1,024 minimum token requirement.',
      B: 'The API does not fail or reject requests that fall below cache thresholds.',
      D: 'Anthropic does not auto-pad prompts with whitespace tokens.',
    },
    references: [
      { title: 'Anthropic Prompt Caching Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
    ]
  },
  {
    id: 402,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: 'You are designing a chatbot with a large 10,000-token product catalog. How does Prompt Caching affect billing on cache hits vs cache writes?',
    question: 'What are the pricing multipliers for cache creation and cache reads relative to base input tokens?',
    options: [
      { label: 'A', text: 'Cache Creation: 1.25x base price; Cache Read: 0.10x base price (90% discount).' },
      { label: 'B', text: 'Cache Creation: Free; Cache Read: 0.50x base price.' },
      { label: 'C', text: 'Cache Creation: 2.0x base price; Cache Read: Free.' },
      { label: 'D', text: 'Cache Creation: 1.0x base price; Cache Read: 0.25x base price.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Prompt Caching Pricing Mechanics',
    explanation: 'Writing to cache incurs a 25% surcharge (1.25x base input token price), while reading from cache grants a massive 90% discount (0.10x base input token price).',
    distractorAnalysis: {
      B: 'Cache creation is not free; it requires server-side resource allocation.',
      C: 'Cache reads are not 100% free; they cost 10% of base price.',
      D: 'The read discount is 90% (0.10x), not 75% (0.25x).',
    },
    references: [
      { title: 'Prompt Caching Pricing', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#pricing' },
    ]
  },
  {
    id: 403,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: 'An engineer places a dynamic timestamp string at line 1 of the system prompt, followed by a 5,000-token static company handbook marked with cache_control.',
    question: 'What will happen to prompt cache efficiency across consecutive requests?',
    options: [
      { label: 'A', text: 'The entire cache will miss on every request because prompt caching requires an exact prefix token match from the start of the prompt.' },
      { label: 'B', text: 'The API will cache the handbook and ignore the dynamic timestamp.' },
      { label: 'C', text: 'The cache will hit with a 50% penalty.' },
      { label: 'D', text: 'Anthropic will automatically reorder the system prompt to put static text first.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Exact Prefix Matching Rule in Prompt Caching',
    explanation: 'Prompt Caching relies on exact byte/token prefix matching starting from index 0. Any mutation before a cache breakpoint (like inserting dynamic timestamps) invalidates the entire cache.',
    distractorAnalysis: {
      B: 'The cache cannot skip leading changed tokens; prefix matching is strictly linear.',
      C: 'Cache hits are all-or-nothing per prefix; there is no 50% partial hit.',
      D: 'The API never mutates or reorders developer prompts.',
    },
    references: [
      { title: 'Prompt Caching Prefix Matching', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#how-prompt-caching-works' },
    ]
  },
  {
    id: 404,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: "How many cache breakpoints (`cache_control: {'type': 'ephemeral'}`) can be declared in a single API request?",
    question: 'What is the maximum number of cache breakpoints supported per request?',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '4' },
      { label: 'C', text: '10' },
      { label: 'D', text: 'Unlimited' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Maximum Cache Breakpoints Limit',
    explanation: 'Anthropic allows up to 4 cache breakpoints per API request across system prompts, tool definitions, and message turns.',
    distractorAnalysis: {
      A: 'You can declare up to 4 breakpoints to cache multiple layers (e.g. system + tools + history).',
      C: '10 exceeds the maximum limit of 4.',
      D: 'Breakpoints are bounded to 4 to conserve memory.',
    },
    references: [
      { title: 'Prompt Caching Limits', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#limits' },
    ]
  },
  {
    id: 405,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: 'What is the default Time-To-Live (TTL) for cached prompt prefixes, and how is it extended?',
    question: 'What is the prompt cache lifespan?',
    options: [
      { label: 'A', text: '5 minutes; refreshed automatically on every cache hit.' },
      { label: 'B', text: '24 hours static TTL.' },
      { label: 'C', text: '1 hour; requires an explicit touch_cache API call to extend.' },
      { label: 'D', text: 'Permanent until deleted by the user.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Prompt Cache TTL & Refresh Lifecycle',
    explanation: 'Cached prefixes have a 5-minute TTL that is automatically refreshed for another 5 minutes every time a request triggers a cache hit.',
    distractorAnalysis: {
      B: 'Cached memory is not retained for 24 hours.',
      C: 'There is no manual touch_cache endpoint; refresh is implicit on hit.',
      D: 'Caches are ephemeral and evict automatically after 5 minutes of inactivity.',
    },
    references: [
      { title: 'Prompt Caching TTL', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
    ]
  },
  {
    id: 406,
    domain: 4,
    domainName: 'Prompt Caching & Cost/Latency Optimization',
    scenario: 'You are caching a 5,000-token prompt on Claude 3 Opus. What is the minimum token requirement for prompt caching on Claude 3 Opus?',
    question: 'What is the minimum token threshold on Claude 3 Opus?',
    options: [
      { label: 'A', text: '512 tokens' },
      { label: 'B', text: '1,024 tokens' },
      { label: 'C', text: '2,048 tokens' },
      { label: 'D', text: '4,096 tokens' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Opus vs Sonnet Cache Thresholds',
    explanation: 'Claude 3.5 Sonnet and Haiku require 1,024 tokens minimum, while Claude 3 Opus requires a minimum of 2,048 tokens to activate prompt caching.',
    distractorAnalysis: {
      A: '512 is below all model thresholds.',
      B: '1,024 is the threshold for Sonnet 3.5 and Haiku 3.5, but Opus requires 2,048.',
      D: '4,096 is unnecessarily high.',
    },
    references: [
      { title: 'Model-Specific Cache Limits', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
    ]
  },
];
