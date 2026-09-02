import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 301,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'An engineer wants Claude to output raw, unescaped JSON without any conversational preamble or markdown code fences (```json).',
    question: 'What is the most reliable developer technique in the Anthropic Messages API to achieve this?',
    options: [
      { label: 'A', text: "Pass response_format={'type': 'json_object'} in the top-level payload." },
      { label: 'B', text: "Prefill the assistant response with {'role': 'assistant', 'content': '{'} in the messages array." },
      { label: 'C', text: "Set temperature: 0.0 and add 'JSON ONLY' in capital letters in the system prompt." },
      { label: 'D', text: "Add stop_sequences: ['```'] in the request configuration." },
    ],
    correctAnswer: 'B',
    keyConcept: 'Assistant Prefilling for Deterministic Output',
    explanation: "Prefilling the assistant turn with '{' forces the model to complete the JSON payload directly from the opening bracket, completely bypassing conversational preamble and markdown backticks.",
    distractorAnalysis: {
      A: 'response_format is an OpenAI parameter and is not part of the Anthropic Messages API.',
      C: 'Prompting instructions alone do not guarantee elimination of markdown backticks.',
      D: 'Stopping at ``` would prematurely terminate markdown formatting rather than prevent it.',
    },
    references: [
      { title: 'Anthropic Prefill Responses', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response' },
    ]
  },
  {
    id: 302,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'You are designing a prompt that accepts untrusted user input and need to prevent prompt injection while extracting specific data points.',
    question: 'Which prompt engineering pattern is recommended by Anthropic to clearly delineate untrusted inputs from instructions?',
    options: [
      { label: 'A', text: 'Surround untrusted user text with distinct XML tags like <user_input>...</user_input> and reference those tags in system instructions.' },
      { label: 'B', text: 'Encode the user input in Base64 before sending it to the API.' },
      { label: 'C', text: "Add 'DO NOT HACK ME' in the system prompt." },
      { label: 'D', text: 'Remove all punctuation marks from the user input before API transmission.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'XML Tag Delimitation for Security & Parsing',
    explanation: 'Anthropic models are specifically trained to respect XML tag boundaries. Wrapping untrusted content in `<user_input>` tags prevents the model from conflating instructions with input data.',
    distractorAnalysis: {
      B: 'Base64 encoding degrades model comprehension and increases token costs without offering reliable safety.',
      C: 'Superficial negative prompting is easily bypassed by adversarial jailbreaks.',
      D: 'Stripping punctuation destroys semantic meaning of legitimate inputs.',
    },
    references: [
      { title: 'Use XML Tags', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags' },
    ]
  },
  {
    id: 303,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'A developer needs Claude to perform complex mathematical reasoning before returning a final JSON summary. The reasoning should be inspectable by developers but separated from the final parsed output.',
    question: "How should the prompt structure the model's output?",
    options: [
      { label: 'A', text: 'Instruct Claude to place its reasoning inside <thinking>...</thinking> tags and the final result inside <result>...</result> tags.' },
      { label: 'B', text: 'Run two separate API calls: one for thinking and one for JSON formatting.' },
      { label: 'C', text: 'Ask Claude to write comments inside the JSON keys.' },
      { label: 'D', text: 'Use temperature: 0.9 so the model thinks out loud.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'CoT with XML Thinking Blocks',
    explanation: 'Instructing Claude to use `<thinking>` tags provides a dedicated scratchpad for Chain-of-Thought reasoning. Client code can easily extract `<result>` for downstream consumers while logging `<thinking>` for auditing.',
    distractorAnalysis: {
      B: 'Two API calls double latency and token costs unnecessarily.',
      C: 'JSON specification does not support comments and results in invalid JSON parse errors.',
      D: 'Higher temperature increases randomness, not reasoning rigor.',
    },
    references: [
      { title: 'Chain of Thought Prompting', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought' },
    ]
  },
  {
    id: 304,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'You prefill the assistant turn with `{"status": "success", "data": [` to guarantee an array output.',
    question: 'When receiving the API response, what does `response.content[0].text` contain?',
    options: [
      { label: 'A', text: 'The entire JSON string including the prefill prefix.' },
      { label: 'B', text: 'Only the continuation generated by the model after the prefill string.' },
      { label: 'C', text: 'A parsed JavaScript/Python object.' },
      { label: 'D', text: 'An empty string because prefilling ends generation.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Prefill Completion Reconstitution',
    explanation: 'When assistant prefilling is used, `response.content[0].text` contains ONLY the newly generated tokens following the prefill. The application must prepend the prefill string to reconstruct the complete payload.',
    distractorAnalysis: {
      A: 'The API does not duplicate the prefill string in the response text.',
      C: 'The API returns raw text; parsing is always handled on the client.',
      D: 'Prefilling guides the start of generation; it does not terminate it.',
    },
    references: [
      { title: "Prefill Claude's Response", url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response' },
    ]
  },
  {
    id: 305,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'You want to provide few-shot examples for a complex sentiment analysis classification task.',
    question: 'What is the recommended structure for formatting few-shot examples with Claude?',
    options: [
      { label: 'A', text: 'Wrap all examples inside <examples> tags, with individual <example> blocks showing <input> and <output>.' },
      { label: 'B', text: 'Add 20 fake user/assistant turns in the active conversation history.' },
      { label: 'C', text: 'Comma-separated key-value pairs in a single string.' },
      { label: 'D', text: 'Few-shot prompting is deprecated and unsupported on Claude 3.5.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Few-Shot Formatting with XML Tags',
    explanation: 'Anthropic recommends formatting few-shot examples cleanly inside `<examples><example><input>...</input><output>...</output></example></examples>` blocks in the system prompt or user turn.',
    distractorAnalysis: {
      B: 'Polluting the message history with fake conversational turns is error-prone and interferes with cache breakpoints.',
      C: 'Unstructured CSV strings lack clear schema boundaries.',
      D: 'Few-shot prompting remains a foundational, highly effective prompting technique.',
    },
    references: [
      { title: 'Give Claude Examples', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-claude-examples' },
    ]
  },
  {
    id: 306,
    domain: 3,
    domainName: 'Structured Outputs & Advanced Prompting',
    scenario: 'A customer feedback categorization prompt produces occasional hallucinations when the sentiment is neutral or ambiguous.',
    question: 'Which prompt engineering adjustment best mitigates this behavior?',
    options: [
      { label: 'A', text: "Instruct Claude: 'If the input is ambiguous or does not contain clear sentiment, output UNKNOWN and explain why inside <reasoning> tags.'" },
      { label: 'B', text: 'Set max_tokens: 10.' },
      { label: 'C', text: 'Use temperature: 1.0 to increase model confidence.' },
      { label: 'D', text: 'Remove system instructions.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Explicit Fallback & Ambiguity Handling',
    explanation: "Providing an explicit 'escape hatch' or fallback instruction (e.g. outputting 'UNKNOWN') prevents the model from being forced to hallucinate a false positive when inputs are ambiguous.",
    distractorAnalysis: {
      B: 'Restricting max_tokens cuts off generation abruptly without fixing accuracy.',
      C: 'High temperature increases hallucinations and unpredictability.',
      D: 'Removing system prompt removes all guardrails and task definition.',
    },
    references: [
      { title: 'Prompt Engineering Interactive Tutorial', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    ]
  },
];
