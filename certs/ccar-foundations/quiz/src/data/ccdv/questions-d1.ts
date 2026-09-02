import type { Question } from '../../types';

export const questionsD1: Question[] = [
  {
    id: 101,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'A developer sends a request to the Anthropic Messages API with two consecutive messages possessing the role "user" in the messages array.',
    question: 'What response will the Anthropic Messages API return to the client?',
    options: [
      { label: 'A', text: 'HTTP 200 OK with the messages automatically concatenated into a single user turn.' },
      { label: 'B', text: 'HTTP 400 Bad Request error stating that roles must alternate between user and assistant.' },
      { label: 'C', text: 'HTTP 422 Unprocessable Entity specifying an invalid schema format.' },
      { label: 'D', text: 'HTTP 200 OK with the assistant replying to the second user message and ignoring the first.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Messages API Strict Role Alternation',
    explanation: 'The Anthropic Messages API strictly requires alternating turns between "user" and "assistant". Consecutive messages with the same role result in an immediate HTTP 400 Bad Request.',
    distractorAnalysis: {
      A: 'Anthropic Messages API does not auto-merge consecutive turns on the server side.',
      C: 'The error returned is 400 Bad Request (invalid_request_error), not 422.',
      D: 'The API will fail closed and reject the request immediately before inference.'
    },
    references: [
      { title: 'Anthropic Messages API Reference', url: 'https://docs.anthropic.com/en/api/messages' }
    ]
  },
  {
    id: 102,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'You are configuring a system prompt for a specialized developer assistant using the Python Anthropic SDK.',
    question: 'Where should the system prompt be defined in the API request payload?',
    options: [
      { label: 'A', text: 'As a dictionary with {"role": "system", "content": "..."} in the messages list.' },
      { label: 'B', text: 'As a top-level system parameter in client.messages.create(system="...").' },
      { label: 'C', text: 'As a header x-system-prompt in the HTTP request.' },
      { label: 'D', text: 'Inside the metadata dictionary under system_instruction.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Top-level System Parameter',
    explanation: 'In the Anthropic Messages API, the system prompt is a dedicated top-level parameter (or list of content blocks with cache control), separate from the conversational messages array.',
    distractorAnalysis: {
      A: 'Placing {"role": "system"} inside the messages array causes an HTTP 400 Bad Request.',
      C: 'System instructions are in the request JSON body, not in HTTP headers.',
      D: 'The metadata field does not take system instructions.'
    },
    references: [
      { title: 'Anthropic System Prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' }
    ]
  }
];
