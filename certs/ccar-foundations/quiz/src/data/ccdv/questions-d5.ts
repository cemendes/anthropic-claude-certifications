import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 501,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'During high traffic, your client receives an HTTP 529 error from the Anthropic Messages API.',
    question: 'What does this error indicate, and how should your application handle it?',
    options: [
      { label: 'A', text: 'The provided API key is invalid; refresh credentials immediately.' },
      { label: 'B', text: 'Anthropic servers are temporarily overloaded; retry the request with exponential backoff and jitter.' },
      { label: 'C', text: 'The request payload exceeded context length; prune conversation history.' },
      { label: 'D', text: 'A validation schema error occurred in tool definitions; fix input_schema.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'HTTP 529 Overloaded Error Handling',
    explanation: 'HTTP 529 indicates that Anthropic infrastructure is experiencing temporary overload. Clients should implement exponential backoff with randomized jitter to retry gracefully.',
    distractorAnalysis: {
      A: 'Invalid API key returns HTTP 401 Unauthorized.',
      C: 'Exceeding context length returns HTTP 400 InvalidRequestError.',
      D: 'Schema validation errors return HTTP 400 InvalidRequestError.',
    },
    references: [
      { title: 'Anthropic Error Codes', url: 'https://docs.anthropic.com/en/api/errors' }
    ]
  },
  {
    id: 502,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: "An application parses a streaming JSON completion, but the stream ends unexpectedly and `response.stop_reason` is 'max_tokens'. JSON parsing fails with SyntaxError: Unexpected end of input.",
    question: 'What is the root cause of this failure and how should it be mitigated?',
    options: [
      { label: 'A', text: 'The model suffered an internal crash; retry with the exact same parameters.' },
      { label: 'B', text: 'The max_tokens limit in the API request was set too low, truncating the JSON before the closing brace; increase max_tokens.' },
      { label: 'C', text: 'The API key lacked permission for streaming; switch to non-streaming.' },
      { label: 'D', text: 'The model entered an infinite loop caused by temperature 0.0.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'max_tokens Truncation Risk on Structured Data',
    explanation: "When `stop_reason: 'max_tokens'`, the output is forcibly cut off at the token limit, leaving unclosed JSON brackets/quotes. Developers must increase `max_tokens` or handle pagination.",
    distractorAnalysis: {
      A: 'max_tokens is not an internal crash; retrying with identical max_tokens will truncate again.',
      C: 'Streaming permissions are not the cause of mid-generation token truncation.',
      D: 'Temperature 0.0 does not trigger infinite loops.',
    },
    references: [
      { title: 'Stop Reasons in Anthropic API', url: 'https://docs.anthropic.com/en/docs/build-with-claude/messages-api#response-parameters' }
    ]
  },
  {
    id: 503,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'A batch processing service makes 200 API calls per minute and begins receiving HTTP 429 RateLimitError responses.',
    question: 'Which header returned by the Anthropic API specifies when the rate limit window resets?',
    options: [
      { label: 'A', text: 'retry-after-ms / retry-after' },
      { label: 'B', text: 'x-rate-limit-reset-time' },
      { label: 'C', text: 'anthropic-cooldown-seconds' },
      { label: 'D', text: 'x-api-throttle-wait' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Rate Limit Headers & Backoff',
    explanation: 'Anthropic returns standard `retry-after` and `retry-after-ms` response headers indicating the duration clients should pause before attempting the next request.',
    distractorAnalysis: {
      B: 'Standard header name is retry-after or retry-after-ms.',
      C: 'anthropic-cooldown-seconds is not an Anthropic header.',
      D: 'x-api-throttle-wait is non-standard.',
    },
    references: [
      { title: 'Rate Limits & Error Handling', url: 'https://docs.anthropic.com/en/api/rate-limits' }
    ]
  },
  {
    id: 504,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'You are building an automated evaluation test suite (evals) to detect prompt regressions before deploying a new system prompt to production.',
    question: 'Which evaluation methodology provides scalable, automated scoring of complex natural language responses against qualitative rubrics?',
    options: [
      { label: 'A', text: 'Model-graded evaluation (LLM-as-a-judge) using Claude 3.5 Sonnet / Opus with a structured scoring rubric.' },
      { label: 'B', text: 'Exact string equality assertions (assert response.text == expected_text).' },
      { label: 'C', text: 'Manual human review of every production request in real-time.' },
      { label: 'D', text: 'Regex matching on word count only.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'LLM-as-a-Judge Evaluation Strategy',
    explanation: 'Model-graded evals (LLM-as-a-judge) using a capable model like Sonnet or Opus provide nuanced, scalable scoring across qualitative criteria (factuality, tone, adherence) that exact string matching cannot evaluate.',
    distractorAnalysis: {
      B: 'Exact string equality fails due to natural language variance even with temperature 0.',
      C: 'Manual real-time human review does not scale in CI/CD pipelines.',
      D: 'Word count regex does not measure semantic correctness or safety.',
    },
    references: [
      { title: 'Evaluate Your Prompt', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 505,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'Why is adding randomized jitter essential when implementing exponential backoff for high-throughput clients experiencing HTTP 429 or 529 errors?',
    question: 'What problem does jitter solve in distributed systems?',
    options: [
      { label: 'A', text: "It prevents the 'Thundering Herd' problem where all synchronized clients retry simultaneously, re-overloading the API gateway." },
      { label: 'B', text: 'It bypasses API rate limits completely.' },
      { label: 'C', text: 'It reduces token costs by 50%.' },
      { label: 'D', text: 'It increases temperature dynamically.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Exponential Backoff with Full Jitter',
    explanation: 'Without jitter, all concurrent clients back off for identical durations ($2^1, 2^2, 2^3...$) and hit the server simultaneously in waves (Thundering Herd). Adding randomized jitter spreads retries evenly across time.',
    distractorAnalysis: {
      B: 'Jitter does not bypass rate limits; it smooths traffic arrival.',
      C: 'Jitter does not change token pricing.',
      D: 'Jitter is a client-side network retry delay, unrelated to sampling temperature.',
    },
    references: [
      { title: 'Exponential Backoff and Jitter', url: 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/' }
    ]
  },
  {
    id: 506,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: "An API call returns an HTTP 400 error with error type `invalid_request_error` and message 'messages.0.content: string or list of content blocks expected'.",
    question: 'Should this error be automatically retried by an exponential backoff retry loop?',
    options: [
      { label: 'A', text: 'No, HTTP 400 errors are client-side payload validation failures that will never succeed without fixing the request code.' },
      { label: 'B', text: 'Yes, retry up to 5 times.' },
      { label: 'C', text: 'Yes, but only if temperature is 0.' },
      { label: 'D', text: 'Yes, because all 4xx errors are transient.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Non-Retryable vs Retryable Errors',
    explanation: 'HTTP 400 (Bad Request), 401 (Unauthorized), and 403 (Forbidden) are permanent client-side errors. Retrying them without code changes wastes cycles and will always fail.',
    distractorAnalysis: {
      B: 'Retrying a malformed schema 5 times produces 5 identical HTTP 400 failures.',
      C: 'Temperature does not fix malformed request payloads.',
      D: 'Most 4xx errors are permanent client errors; only 429 is retryable.',
    },
    references: [
      { title: 'Anthropic Errors', url: 'https://docs.anthropic.com/en/api/errors' }
    ]
  },
  {
    id: 507,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'An application uses Anthropic API to classify user tickets. The team wants to test if updating the system prompt degrades accuracy across 500 edge cases.',
    question: 'What is the industry-standard workflow for regression testing LLM prompts?',
    options: [
      { label: 'A', text: 'Run automated offline evaluations against a versioned ground-truth dataset with deterministic assertions and LLM-as-a-judge scoring before deploying prompt changes to production.' },
      { label: 'B', text: 'Deploy the prompt to 100% of users and wait for user complaints.' },
      { label: 'C', text: 'Manually inspect 2 examples in the web UI console.' },
      { label: 'D', text: 'Unit test only the client HTTP connection.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Offline Prompt Regression Testing (Evals-as-Code)',
    explanation: 'Evals-as-code involves maintaining a gold standard evaluation dataset and running deterministic/LLM-graded test suites in CI/CD before any prompt or model version changes go live.',
    distractorAnalysis: {
      B: 'Testing in production without evals risks catastrophic regressions for end users.',
      C: '2 examples provide zero statistical confidence across 500 edge cases.',
      D: 'Testing only HTTP connections does not evaluate model behavioral accuracy.',
    },
    references: [
      { title: 'Evaluate Prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 508,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: "A developer receives an error with `type: 'authentication_error'` and `message: 'invalid x-api-key'`.",
    question: 'What HTTP status code is returned for this authentication failure?',
    options: [
      { label: 'A', text: 'HTTP 401 Unauthorized' },
      { label: 'B', text: 'HTTP 403 Forbidden' },
      { label: 'C', text: 'HTTP 400 Bad Request' },
      { label: 'D', text: 'HTTP 404 Not Found' },
    ],
    correctAnswer: 'A',
    keyConcept: 'HTTP 401 Authentication Error',
    explanation: "Missing, malformed, or invalid `x-api-key` headers always return `HTTP 401 Unauthorized` with `type: 'authentication_error'`.",
    distractorAnalysis: {
      B: '403 indicates permission/tier restrictions on a valid key.',
      C: '400 indicates malformed payload bodies.',
      D: '404 indicates non-existent endpoints or invalid model identifiers.',
    },
    references: [
      { title: 'API Errors', url: 'https://docs.anthropic.com/en/api/errors' }
    ]
  },
  {
    id: 509,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'What is the difference between Tokens Per Minute (TPM) rate limits and Requests Per Minute (RPM) rate limits in the Anthropic platform?',
    question: 'How do RPM and TPM constraints operate independently?',
    options: [
      { label: 'A', text: 'RPM caps the count of API requests regardless of payload size; TPM caps the total cumulative input and output tokens consumed in a 60-second window.' },
      { label: 'B', text: 'RPM and TPM are identical metrics.' },
      { label: 'C', text: 'TPM only counts output tokens.' },
      { label: 'D', text: 'RPM only applies to streaming requests.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'RPM vs TPM Rate Limiting Dynamics',
    explanation: 'Rate limits enforce dual independent constraints: RPM (rate of requests) and TPM (volume of tokens processed). Exceeding either limit triggers an HTTP 429.',
    distractorAnalysis: {
      B: 'They measure distinct resources (request count vs token volume).',
      C: 'TPM includes input tokens, cache tokens, and output tokens.',
      D: 'RPM applies equally to sync, async, and streaming requests.',
    },
    references: [
      { title: 'Anthropic Rate Limits', url: 'https://docs.anthropic.com/en/api/rate-limits' }
    ]
  },
  {
    id: 510,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'An engineer needs to test that Claude refuses to generate harmful or unauthorized content according to safety boundaries.',
    question: 'Which evaluation metric measures whether the model correctly declines prohibited queries without false positives on benign edge cases?',
    options: [
      { label: 'A', text: 'Refusal / Safety Conformance Evaluation (measuring True Refusal Rate vs False Refusal / Over-refusal Rate)' },
      { label: 'B', text: 'Token per second throughput' },
      { label: 'C', text: 'BLEU score against reference text' },
      { label: 'D', text: 'JSON parsing speed' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Safety & Refusal Evaluation Metrics',
    explanation: 'Evaluating safety guardrails requires measuring both True Refusals (correctly refusing harmful prompts) and False Refusals (unnecessarily refusing harmless benign prompts that contain sensitive keywords).',
    distractorAnalysis: {
      B: 'Throughput measures performance, not safety adherence.',
      C: 'BLEU score measures n-gram overlap in translation, not safety boundaries.',
      D: 'JSON speed measures parse latency.',
    },
    references: [
      { title: 'Model Evaluation Strategies', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 511,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'During client execution, an unhandled network disconnection occurs mid-request before receiving the first byte of response.',
    question: 'Which exception class in the Anthropic Python SDK represents this network-level communication failure?',
    options: [
      { label: 'A', text: '`anthropic.APIConnectionError`' },
      { label: 'B', text: '`anthropic.BadRequestError`' },
      { label: 'C', text: '`anthropic.AuthenticationError`' },
      { label: 'D', text: '`anthropic.RateLimitError`' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Anthropic SDK Exception Hierarchy (APIConnectionError)',
    explanation: 'Network timeouts, DNS resolution failures, and dropped socket connections raise `anthropic.APIConnectionError`, which inherits from `anthropic.APIError` and is safe to retry.',
    distractorAnalysis: {
      B: 'BadRequestError is raised on HTTP 400 responses.',
      C: 'AuthenticationError is raised on HTTP 401 responses.',
      D: 'RateLimitError is raised on HTTP 429 responses.',
    },
    references: [
      { title: 'Python SDK Exception Hierarchy', url: 'https://github.com/anthropics/anthropic-sdk-python' }
    ]
  },
  {
    id: 512,
    domain: 5,
    domainName: 'Error Handling, Rate Limits & Evaluation',
    scenario: 'When building an evaluation rubric for an LLM-as-a-judge prompt, which scoring design produces the most consistent and calibrated evaluations?',
    question: 'What is the recommended design for LLM judge rubrics?',
    options: [
      { label: 'A', text: 'Provide clear categorical criteria with concrete scoring anchors (e.g. 1-5 scale where each score has an explicit definition and example), requiring Chain-of-Thought reasoning before outputting the score.' },
      { label: 'B', text: 'Ask the model to output a floating point number between 0.0 and 100.0 with no guidelines.' },
      { label: 'C', text: 'Tell the model to give high scores to friendly answers.' },
      { label: 'D', text: 'Use temperature 1.0 to get diverse opinions.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Calibrated LLM-as-a-Judge Rubric Design',
    explanation: 'High-quality LLM-as-a-judge systems require explicit anchor definitions for each score point and mandatory Chain-of-Thought reasoning prior to emitting the numerical evaluation.',
    distractorAnalysis: {
      B: 'Uncalibrated 0-100 scales produce erratic variance.',
      C: 'Subjective friendliness instructions bias the judge away from factual accuracy.',
      D: 'Evaluation judges should use temperature 0.0 for deterministic scoring.',
    },
    references: [
      { title: 'Evaluate Prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
];
