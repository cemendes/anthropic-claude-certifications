import type { Question } from '../types';

export const questionsD3: Question[] = [
  {
    id: 301,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'An engineer wants Claude to output raw, unescaped JSON without any conversational preamble or markdown code fences (```json).',
    question: 'What is the most reliable developer technique in the Anthropic Messages API to achieve this?',
    options: [
      { label: 'A', text: 'Pass response_format={"type": "json_object"} in the top-level payload.' },
      { label: 'B', text: 'Prefill the assistant response with {"role": "assistant", "content": "{"} in the messages array.' },
      { label: 'C', text: 'Set temperature: 0.0 and add "JSON ONLY" in capital letters in the system prompt.' },
      { label: 'D', text: 'Add stop_sequences: ["```"] in the request configuration.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Assistant Prefilling for Deterministic Output',
    explanation: 'Prefilling the assistant turn with "{" forces the model to complete the JSON payload directly from the opening bracket, completely bypassing conversational preamble and markdown backticks.',
    distractorAnalysis: {
      A: 'response_format is an OpenAI parameter and is not part of the Anthropic Messages API.',
      C: 'Prompting instructions alone do not guarantee elimination of markdown backticks.',
      D: 'Stopping at ``` would prematurely terminate markdown formatting rather than prevent it.'
    },
    references: [
      { title: 'Anthropic Prefill Responses', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response' }
    ]
  }
];
