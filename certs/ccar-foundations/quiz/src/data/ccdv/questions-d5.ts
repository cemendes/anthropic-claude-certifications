import type { Question } from '../../types';

export const questionsD5: Question[] = [
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
      { label: 'D', text: 'A validation schema error occurred in tool definitions; fix input_schema.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'HTTP 529 Overloaded Error Handling',
    explanation: 'HTTP 529 indicates that Anthropic infrastructure is experiencing temporary overload. Clients should implement exponential backoff with randomized jitter to retry gracefully.',
    distractorAnalysis: {
      A: 'Invalid API key returns HTTP 401 Unauthorized.',
      C: 'Exceeding context length returns HTTP 400 InvalidRequestError.',
      D: 'Schema validation errors return HTTP 400 InvalidRequestError.'
    },
    references: [
      { title: 'Anthropic Error Codes', url: 'https://docs.anthropic.com/en/api/errors' }
    ]
  }
];
