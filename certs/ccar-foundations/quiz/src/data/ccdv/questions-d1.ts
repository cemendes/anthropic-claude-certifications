import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 101,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: "A developer sends a request to the Anthropic Messages API with two consecutive messages possessing the role 'user' in the messages array.",
    question: 'What response will the Anthropic Messages API return to the client?',
    options: [
      { label: 'A', text: 'HTTP 200 OK with the messages automatically concatenated into a single user turn.' },
      { label: 'B', text: 'HTTP 400 Bad Request error stating that roles must alternate between user and assistant.' },
      { label: 'C', text: 'HTTP 422 Unprocessable Entity specifying an invalid schema format.' },
      { label: 'D', text: 'HTTP 200 OK with the assistant replying to the second user message and ignoring the first.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Messages API Strict Role Alternation',
    explanation: "The Anthropic Messages API strictly requires alternating turns between 'user' and 'assistant'. Consecutive messages with the same role result in an immediate HTTP 400 Bad Request.",
    distractorAnalysis: {
      A: 'Anthropic Messages API does not auto-merge consecutive turns on the server side.',
      C: 'The error returned is 400 Bad Request (invalid_request_error), not 422.',
      D: 'The API will fail closed and reject the request immediately before inference.',
    },
    references: [
      { title: 'Anthropic Messages API Reference', url: 'https://docs.anthropic.com/en/api/messages' },
    ]
  },
  {
    id: 102,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'You are configuring a system prompt for a specialized developer assistant using the Python Anthropic SDK.',
    question: 'Where should the system prompt be defined in the API request payload?',
    options: [
      { label: 'A', text: "As a dictionary with {'role': 'system', 'content': '...'} in the messages list." },
      { label: 'B', text: "As a top-level system parameter in client.messages.create(system='...')." },
      { label: 'C', text: 'As a header x-system-prompt in the HTTP request.' },
      { label: 'D', text: 'Inside the metadata dictionary under system_instruction.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Top-level System Parameter',
    explanation: 'In the Anthropic Messages API, the system prompt is a dedicated top-level parameter (or list of content blocks with cache control), separate from the conversational messages array.',
    distractorAnalysis: {
      A: "Placing {'role': 'system'} inside the messages array causes an HTTP 400 Bad Request.",
      C: 'System instructions are in the request JSON body, not in HTTP headers.',
      D: 'The metadata field does not take system instructions.',
    },
    references: [
      { title: 'Anthropic System Prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
    ]
  },
  {
    id: 103,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'You are processing a real-time streaming response from Claude 3.5 Sonnet using Server-Sent Events (SSE). You need to capture partial text chunks as they arrive.',
    question: 'Which SSE event type and inner delta field provide the incremental text tokens?',
    options: [
      { label: 'A', text: 'Event: message_delta with delta.text' },
      { label: 'B', text: "Event: content_block_delta with delta.type == 'text_delta' and delta.text" },
      { label: 'C', text: 'Event: content_block_start with block.text' },
      { label: 'D', text: 'Event: stream_chunk with chunk.content' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Streaming SSE Event Lifecycle',
    explanation: "In the Anthropic streaming protocol, textual token deltas are delivered in 'content_block_delta' events containing a delta object with type 'text_delta' and the 'text' string property.",
    distractorAnalysis: {
      A: 'message_delta contains top-level completion updates like stop_reason and usage.output_tokens, not token chunks.',
      C: 'content_block_start initializes the block with its type and index, but contains empty or initial metadata.',
      D: 'stream_chunk is not a valid Anthropic SSE event.',
    },
    references: [
      { title: 'Streaming Messages', url: 'https://docs.anthropic.com/en/api/messages-streaming' },
    ]
  },
  {
    id: 104,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'An engineer wants to know the exact token footprint of a large prompt before sending it to inference, without incurring generation costs.',
    question: 'Which SDK method should the engineer invoke?',
    options: [
      { label: 'A', text: 'client.messages.count_tokens(model=..., messages=...)' },
      { label: 'B', text: 'client.tokens.estimate(prompt=...)' },
      { label: 'C', text: 'client.messages.create(model=..., max_tokens=0)' },
      { label: 'D', text: 'client.utils.calculate_tokens(text=...)' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Token Counting API',
    explanation: 'Anthropic provides a dedicated `client.messages.count_tokens()` endpoint that calculates exact input tokens for a given model, system prompt, and message payload without triggering generation.',
    distractorAnalysis: {
      B: 'There is no client.tokens.estimate method.',
      C: 'max_tokens must be greater than 0; passing 0 triggers a validation error.',
      D: 'Token counting is done via the messages.count_tokens API endpoint.',
    },
    references: [
      { title: 'Token Counting API', url: 'https://docs.anthropic.com/en/api/messages-count-tokens' },
    ]
  },
  {
    id: 105,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'A financial data extraction script requires high determinism and exact reproduction of results on identical JSON inputs.',
    question: 'Which parameter configuration best supports this requirement?',
    options: [
      { label: 'A', text: 'temperature: 1.0, top_p: 1.0' },
      { label: 'B', text: 'temperature: 0.0' },
      { label: 'C', text: 'top_k: 100, temperature: 0.7' },
      { label: 'D', text: 'temperature: 0.5, top_p: 0.5' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Sampling Temperature & Determinism',
    explanation: 'Setting `temperature: 0.0` minimizes randomness and makes the model output as greedy and deterministic as possible, ideal for structured data extraction and code tasks.',
    distractorAnalysis: {
      A: 'temperature 1.0 introduces high variance and creative sampling.',
      C: 'top_k 100 with 0.7 temperature allows significant sampling variety.',
      D: 'Anthropic recommends altering either temperature or top_p, not both, and 0.5 still introduces stochasticity.',
    },
    references: [
      { title: 'Anthropic Sampling Parameters', url: 'https://docs.anthropic.com/en/api/messages' },
    ]
  },
  {
    id: 106,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'A developer needs to send a request containing a high-resolution architecture diagram image and a text question within the same turn.',
    question: 'How should this payload be structured in the Python SDK?',
    options: [
      { label: 'A', text: 'Pass the image base64 string directly into client.messages.create(image=...)' },
      { label: 'B', text: "Send two consecutive messages: one with role 'user' and image, followed by another 'user' with text." },
      { label: 'C', text: "Send a single message with role 'user' whose content is a list containing an image block and a text block." },
      { label: 'D', text: 'Embed the image as an HTML <img> tag inside the text string.' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Heterogeneous Content Blocks in Messages API',
    explanation: 'In the Anthropic Messages API, multi-modal content within a single turn is passed as a list of content blocks (e.g. `[{"type": "image", "source": {...}}, {"type": "text", "text": "..."}]`) inside a single `user` turn.',
    distractorAnalysis: {
      A: 'There is no top-level image argument in client.messages.create.',
      B: 'Two consecutive user messages trigger an immediate HTTP 400 Bad Request.',
      D: 'The API does not parse raw HTML <img> tags for vision inputs.',
    },
    references: [
      { title: 'Vision with Claude', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' },
    ]
  },
  {
    id: 107,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: "A developer wants to ensure generation halts immediately if Claude outputs the delimiter string '### END OF RECORD ###'.",
    question: 'Which parameter should be configured in the API call?',
    options: [
      { label: 'A', text: "stop_sequences: ['### END OF RECORD ###']" },
      { label: 'B', text: "halt_tokens: ['### END OF RECORD ###']" },
      { label: 'C', text: "system: 'Stop when you print ### END OF RECORD ###'" },
      { label: 'D', text: 'max_tokens: 50' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Custom stop_sequences Configuration',
    explanation: "Passing `stop_sequences: ['### END OF RECORD ###']` instructs the API to halt generation immediately upon producing the matching string, returning `stop_reason: 'stop_sequence'` and `stop_sequence: '### END OF RECORD ###'`.",
    distractorAnalysis: {
      B: 'halt_tokens is not a valid parameter.',
      C: 'Prompting instructions alone do not guarantee instant token generation cessation at the API boundary.',
      D: 'max_tokens sets a hard numeric token limit, not a delimiter-based cutoff.',
    },
    references: [
      { title: 'Anthropic API Parameters', url: 'https://docs.anthropic.com/en/api/messages' },
    ]
  },
  {
    id: 108,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'You are building a production backend with the official TypeScript SDK `@anthropic-ai/sdk` and want to configure client-level automatic retries with custom timeouts.',
    question: 'How should the Anthropic client be initialized?',
    options: [
      { label: 'A', text: 'new Anthropic({ maxRetries: 3, timeout: 20000 })' },
      { label: 'B', text: 'new Anthropic({ retryAttempts: 3, requestTimeout: 20000 })' },
      { label: 'C', text: 'Anthropic.init({ retries: 3, socketTimeout: 20 })' },
      { label: 'D', text: 'new Anthropic().setRetry(3).setTimeout(20000)' },
    ],
    correctAnswer: 'A',
    keyConcept: 'TypeScript SDK Client Configuration',
    explanation: 'The official TypeScript SDK accepts `maxRetries` (integer) and `timeout` (milliseconds) directly in the constructor options object.',
    distractorAnalysis: {
      B: 'The property names are maxRetries and timeout, not retryAttempts or requestTimeout.',
      C: 'Anthropic is a class constructor, not an init static factory.',
      D: 'Builder-style chaining is not used for core client options.',
    },
    references: [
      { title: 'Anthropic TypeScript SDK', url: 'https://github.com/anthropics/anthropic-sdk-typescript' },
    ]
  },
  {
    id: 109,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'An asynchronous worker service in Python needs to concurrently process 50 user prompts without blocking the event loop.',
    question: 'Which client class and method pattern should be used?',
    options: [
      { label: 'A', text: 'anthropic.Anthropic() with standard multithreading' },
      { label: 'B', text: 'anthropic.AsyncAnthropic() with await asyncio.gather(*[client.messages.create(...) for ...])' },
      { label: 'C', text: 'anthropic.BatchProcessor() with batch.submit()' },
      { label: 'D', text: 'anthropic.ParallelClient()' },
    ],
    correctAnswer: 'B',
    keyConcept: 'AsyncAnthropic Client Usage',
    explanation: '`anthropic.AsyncAnthropic()` provides an async/await interface designed specifically for non-blocking I/O with `asyncio.gather()`.',
    distractorAnalysis: {
      A: 'Sync client blocks threads and has much higher resource overhead for 50 concurrent requests.',
      C: 'BatchProcessor is not the standard async client class.',
      D: 'ParallelClient does not exist in the SDK.',
    },
    references: [
      { title: 'Async Python SDK', url: 'https://github.com/anthropics/anthropic-sdk-python' },
    ]
  },
  {
    id: 110,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'A developer receives a message response object and wants to inspect how many tokens were consumed in the prompt vs generation.',
    question: 'Where are these metrics located on the response object?',
    options: [
      { label: 'A', text: 'response.token_metrics.prompt_tokens and response.token_metrics.completion_tokens' },
      { label: 'B', text: 'response.usage.input_tokens and response.usage.output_tokens' },
      { label: 'C', text: "response.headers['x-token-count']" },
      { label: 'D', text: 'response.metadata.tokens' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Response Usage Structure',
    explanation: 'The Anthropic Messages API returns a `usage` object containing `input_tokens` and `output_tokens` (and optional cache token metrics).',
    distractorAnalysis: {
      A: 'token_metrics and prompt_tokens/completion_tokens are OpenAI naming conventions.',
      C: 'Usage is returned in the JSON body under usage, not headers.',
      D: 'metadata is for client tracking, not billing metrics.',
    },
    references: [
      { title: 'Anthropic Messages API Reference', url: 'https://docs.anthropic.com/en/api/messages' },
    ]
  },
  {
    id: 111,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: 'You are writing a TypeScript application that parses a streaming text response using the SDK helper `anthropic.messages.stream()`.',
    question: 'Which event or callback provides the accumulated, complete text after the stream finishes?',
    options: [
      { label: 'A', text: "stream.on('finish', (text) => ...)" },
      { label: 'B', text: 'await stream.finalText()' },
      { label: 'C', text: 'stream.getPayload()' },
      { label: 'D', text: 'stream.accumulatedText' },
    ],
    correctAnswer: 'B',
    keyConcept: 'TypeScript SDK Stream Helpers',
    explanation: 'In the TypeScript SDK, the `MessageStream` helper provides convenient promise-based getters such as `await stream.finalText()` and `await stream.finalMessage()`.',
    distractorAnalysis: {
      A: "The stream helper uses promise methods or .on('text') events, not a 'finish' text callback.",
      C: 'getPayload is not a method on MessageStream.',
      D: 'accumulatedText is not a property on the stream object.',
    },
    references: [
      { title: 'TypeScript Streaming Helpers', url: 'https://github.com/anthropics/anthropic-sdk-typescript' },
    ]
  },
  {
    id: 112,
    domain: 1,
    domainName: 'Anthropic Messages API & SDKs',
    scenario: "A developer sends a request with model: 'claude-3-5-sonnet-20241022' but omits the required `max_tokens` parameter.",
    question: 'What happens when the API receives this request?',
    options: [
      { label: 'A', text: 'The API defaults max_tokens to 4096 and processes the request.' },
      { label: 'B', text: 'The API rejects the request with HTTP 400 Bad Request error stating max_tokens is required.' },
      { label: 'C', text: 'The API defaults max_tokens to infinity.' },
      { label: 'D', text: 'The API returns HTTP 422 with a warning header.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Mandatory max_tokens Parameter',
    explanation: 'In the Anthropic Messages API, `max_tokens` is a strictly required top-level parameter. Omitting it causes an immediate `HTTP 400 Bad Request` validation error.',
    distractorAnalysis: {
      A: 'Anthropic does not supply an implicit default for max_tokens.',
      C: 'Unbounded generation is not allowed.',
      D: 'Anthropic returns 400 invalid_request_error, not 422.',
    },
    references: [
      { title: 'Anthropic Messages API', url: 'https://docs.anthropic.com/en/api/messages' },
    ]
  },
];
