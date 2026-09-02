import json

questions_d1 = [
  {
    "id": 101,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A developer sends a request to the Anthropic Messages API with two consecutive messages possessing the role 'user' in the messages array.",
    "question": "What response will the Anthropic Messages API return to the client?",
    "options": [
      {"label": "A", "text": "HTTP 200 OK with the messages automatically concatenated into a single user turn."},
      {"label": "B", "text": "HTTP 400 Bad Request error stating that roles must alternate between user and assistant."},
      {"label": "C", "text": "HTTP 422 Unprocessable Entity specifying an invalid schema format."},
      {"label": "D", "text": "HTTP 200 OK with the assistant replying to the second user message and ignoring the first."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Messages API Strict Role Alternation",
    "explanation": "The Anthropic Messages API strictly requires alternating turns between 'user' and 'assistant'. Consecutive messages with the same role result in an immediate HTTP 400 Bad Request.",
    "distractorAnalysis": {
      "A": "Anthropic Messages API does not auto-merge consecutive turns on the server side.",
      "C": "The error returned is 400 Bad Request (invalid_request_error), not 422.",
      "D": "The API will fail closed and reject the request immediately before inference."
    },
    "references": [{"title": "Anthropic Messages API Reference", "url": "https://docs.anthropic.com/en/api/messages"}]
  },
  {
    "id": 102,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "You are configuring a system prompt for a specialized developer assistant using the Python Anthropic SDK.",
    "question": "Where should the system prompt be defined in the API request payload?",
    "options": [
      {"label": "A", "text": "As a dictionary with {'role': 'system', 'content': '...'} in the messages list."},
      {"label": "B", "text": "As a top-level system parameter in client.messages.create(system='...')."},
      {"label": "C", "text": "As a header x-system-prompt in the HTTP request."},
      {"label": "D", "text": "Inside the metadata dictionary under system_instruction."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Top-level System Parameter",
    "explanation": "In the Anthropic Messages API, the system prompt is a dedicated top-level parameter (or list of content blocks with cache control), separate from the conversational messages array.",
    "distractorAnalysis": {
      "A": "Placing {'role': 'system'} inside the messages array causes an HTTP 400 Bad Request.",
      "C": "System instructions are in the request JSON body, not in HTTP headers.",
      "D": "The metadata field does not take system instructions."
    },
    "references": [{"title": "Anthropic System Prompts", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts"}]
  },
  {
    "id": 103,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "You are processing a real-time streaming response from Claude 3.5 Sonnet using Server-Sent Events (SSE). You need to capture partial text chunks as they arrive.",
    "question": "Which SSE event type and inner delta field provide the incremental text tokens?",
    "options": [
      {"label": "A", "text": "Event: message_delta with delta.text"},
      {"label": "B", "text": "Event: content_block_delta with delta.type == 'text_delta' and delta.text"},
      {"label": "C", "text": "Event: content_block_start with block.text"},
      {"label": "D", "text": "Event: stream_chunk with chunk.content"}
    ],
    "correctAnswer": "B",
    "keyConcept": "Streaming SSE Event Lifecycle",
    "explanation": "In the Anthropic streaming protocol, textual token deltas are delivered in 'content_block_delta' events containing a delta object with type 'text_delta' and the 'text' string property.",
    "distractorAnalysis": {
      "A": "message_delta contains top-level completion updates like stop_reason and usage.output_tokens, not token chunks.",
      "C": "content_block_start initializes the block with its type and index, but contains empty or initial metadata.",
      "D": "stream_chunk is not a valid Anthropic SSE event."
    },
    "references": [{"title": "Streaming Messages", "url": "https://docs.anthropic.com/en/api/messages-streaming"}]
  },
  {
    "id": 104,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "An engineer wants to know the exact token footprint of a large prompt before sending it to inference, without incurring generation costs.",
    "question": "Which SDK method should the engineer invoke?",
    "options": [
      {"label": "A", "text": "client.messages.count_tokens(model=..., messages=...)"},
      {"label": "B", "text": "client.tokens.estimate(prompt=...)"},
      {"label": "C", "text": "client.messages.create(model=..., max_tokens=0)"},
      {"label": "D", "text": "client.utils.calculate_tokens(text=...)"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Token Counting API",
    "explanation": "Anthropic provides a dedicated `client.messages.count_tokens()` endpoint that calculates exact input tokens for a given model, system prompt, and message payload without triggering generation.",
    "distractorAnalysis": {
      "B": "There is no client.tokens.estimate method.",
      "C": "max_tokens must be greater than 0; passing 0 triggers a validation error.",
      "D": "Token counting is done via the messages.count_tokens API endpoint."
    },
    "references": [{"title": "Token Counting API", "url": "https://docs.anthropic.com/en/api/messages-count-tokens"}]
  },
  {
    "id": 105,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A financial data extraction script requires high determinism and exact reproduction of results on identical JSON inputs.",
    "question": "Which parameter configuration best supports this requirement?",
    "options": [
      {"label": "A", "text": "temperature: 1.0, top_p: 1.0"},
      {"label": "B", "text": "temperature: 0.0"},
      {"label": "C", "text": "top_k: 100, temperature: 0.7"},
      {"label": "D", "text": "temperature: 0.5, top_p: 0.5"}
    ],
    "correctAnswer": "B",
    "keyConcept": "Sampling Temperature & Determinism",
    "explanation": "Setting `temperature: 0.0` minimizes randomness and makes the model output as greedy and deterministic as possible, ideal for structured data extraction and code tasks.",
    "distractorAnalysis": {
      "A": "temperature 1.0 introduces high variance and creative sampling.",
      "C": "top_k 100 with 0.7 temperature allows significant sampling variety.",
      "D": "Anthropic recommends altering either temperature or top_p, not both, and 0.5 still introduces stochasticity."
    },
    "references": [{"title": "Anthropic Sampling Parameters", "url": "https://docs.anthropic.com/en/api/messages"}]
  },
  {
    "id": 106,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A developer needs to send a request containing a high-resolution architecture diagram image and a text question within the same turn.",
    "question": "How should this payload be structured in the Python SDK?",
    "options": [
      {"label": "A", "text": "Pass the image base64 string directly into client.messages.create(image=...)"},
      {"label": "B", "text": "Send two consecutive messages: one with role 'user' and image, followed by another 'user' with text."},
      {"label": "C", "text": "Send a single message with role 'user' whose content is a list containing an image block and a text block."},
      {"label": "D", "text": "Embed the image as an HTML <img> tag inside the text string."}
    ],
    "correctAnswer": "C",
    "keyConcept": "Heterogeneous Content Blocks in Messages API",
    "explanation": "In the Anthropic Messages API, multi-modal content within a single turn is passed as a list of content blocks (e.g. `[{\"type\": \"image\", \"source\": {...}}, {\"type\": \"text\", \"text\": \"...\"}]`) inside a single `user` turn.",
    "distractorAnalysis": {
      "A": "There is no top-level image argument in client.messages.create.",
      "B": "Two consecutive user messages trigger an immediate HTTP 400 Bad Request.",
      "D": "The API does not parse raw HTML <img> tags for vision inputs."
    },
    "references": [{"title": "Vision with Claude", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 107,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A developer wants to ensure generation halts immediately if Claude outputs the delimiter string '### END OF RECORD ###'.",
    "question": "Which parameter should be configured in the API call?",
    "options": [
      {"label": "A", "text": "stop_sequences: ['### END OF RECORD ###']"},
      {"label": "B", "text": "halt_tokens: ['### END OF RECORD ###']"},
      {"label": "C", "text": "system: 'Stop when you print ### END OF RECORD ###'"},
      {"label": "D", "text": "max_tokens: 50"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Custom stop_sequences Configuration",
    "explanation": "Passing `stop_sequences: ['### END OF RECORD ###']` instructs the API to halt generation immediately upon producing the matching string, returning `stop_reason: 'stop_sequence'` and `stop_sequence: '### END OF RECORD ###'`.",
    "distractorAnalysis": {
      "B": "halt_tokens is not a valid parameter.",
      "C": "Prompting instructions alone do not guarantee instant token generation cessation at the API boundary.",
      "D": "max_tokens sets a hard numeric token limit, not a delimiter-based cutoff."
    },
    "references": [{"title": "Anthropic API Parameters", "url": "https://docs.anthropic.com/en/api/messages"}]
  },
  {
    "id": 108,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "You are building a production backend with the official TypeScript SDK `@anthropic-ai/sdk` and want to configure client-level automatic retries with custom timeouts.",
    "question": "How should the Anthropic client be initialized?",
    "options": [
      {"label": "A", "text": "new Anthropic({ maxRetries: 3, timeout: 20000 })"},
      {"label": "B", "text": "new Anthropic({ retryAttempts: 3, requestTimeout: 20000 })"},
      {"label": "C", "text": "Anthropic.init({ retries: 3, socketTimeout: 20 })"},
      {"label": "D", "text": "new Anthropic().setRetry(3).setTimeout(20000)"}
    ],
    "correctAnswer": "A",
    "keyConcept": "TypeScript SDK Client Configuration",
    "explanation": "The official TypeScript SDK accepts `maxRetries` (integer) and `timeout` (milliseconds) directly in the constructor options object.",
    "distractorAnalysis": {
      "B": "The property names are maxRetries and timeout, not retryAttempts or requestTimeout.",
      "C": "Anthropic is a class constructor, not an init static factory.",
      "D": "Builder-style chaining is not used for core client options."
    },
    "references": [{"title": "Anthropic TypeScript SDK", "url": "https://github.com/anthropics/anthropic-sdk-typescript"}]
  },
  {
    "id": 109,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "An asynchronous worker service in Python needs to concurrently process 50 user prompts without blocking the event loop.",
    "question": "Which client class and method pattern should be used?",
    "options": [
      {"label": "A", "text": "anthropic.Anthropic() with standard multithreading"},
      {"label": "B", "text": "anthropic.AsyncAnthropic() with await asyncio.gather(*[client.messages.create(...) for ...])"},
      {"label": "C", "text": "anthropic.BatchProcessor() with batch.submit()"},
      {"label": "D", "text": "anthropic.ParallelClient()"}
    ],
    "correctAnswer": "B",
    "keyConcept": "AsyncAnthropic Client Usage",
    "explanation": "`anthropic.AsyncAnthropic()` provides an async/await interface designed specifically for non-blocking I/O with `asyncio.gather()`.",
    "distractorAnalysis": {
      "A": "Sync client blocks threads and has much higher resource overhead for 50 concurrent requests.",
      "C": "BatchProcessor is not the standard async client class.",
      "D": "ParallelClient does not exist in the SDK."
    },
    "references": [{"title": "Async Python SDK", "url": "https://github.com/anthropics/anthropic-sdk-python"}]
  },
  {
    "id": 110,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A developer receives a message response object and wants to inspect how many tokens were consumed in the prompt vs generation.",
    "question": "Where are these metrics located on the response object?",
    "options": [
      {"label": "A", "text": "response.token_metrics.prompt_tokens and response.token_metrics.completion_tokens"},
      {"label": "B", "text": "response.usage.input_tokens and response.usage.output_tokens"},
      {"label": "C", "text": "response.headers['x-token-count']"},
      {"label": "D", "text": "response.metadata.tokens"}
    ],
    "correctAnswer": "B",
    "keyConcept": "Response Usage Structure",
    "explanation": "The Anthropic Messages API returns a `usage` object containing `input_tokens` and `output_tokens` (and optional cache token metrics).",
    "distractorAnalysis": {
      "A": "token_metrics and prompt_tokens/completion_tokens are OpenAI naming conventions.",
      "C": "Usage is returned in the JSON body under usage, not headers.",
      "D": "metadata is for client tracking, not billing metrics."
    },
    "references": [{"title": "Anthropic Messages API Reference", "url": "https://docs.anthropic.com/en/api/messages"}]
  },
  {
    "id": 111,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "You are writing a TypeScript application that parses a streaming text response using the SDK helper `anthropic.messages.stream()`.",
    "question": "Which event or callback provides the accumulated, complete text after the stream finishes?",
    "options": [
      {"label": "A", "text": "stream.on('finish', (text) => ...)"},
      {"label": "B", "text": "await stream.finalText()"},
      {"label": "C", "text": "stream.getPayload()"},
      {"label": "D", "text": "stream.accumulatedText"}
    ],
    "correctAnswer": "B",
    "keyConcept": "TypeScript SDK Stream Helpers",
    "explanation": "In the TypeScript SDK, the `MessageStream` helper provides convenient promise-based getters such as `await stream.finalText()` and `await stream.finalMessage()`.",
    "distractorAnalysis": {
      "A": "The stream helper uses promise methods or .on('text') events, not a 'finish' text callback.",
      "C": "getPayload is not a method on MessageStream.",
      "D": "accumulatedText is not a property on the stream object."
    },
    "references": [{"title": "TypeScript Streaming Helpers", "url": "https://github.com/anthropics/anthropic-sdk-typescript"}]
  },
  {
    "id": 112,
    "domain": 1,
    "domainName": "Anthropic Messages API & SDKs",
    "scenario": "A developer sends a request with model: 'claude-3-5-sonnet-20241022' but omits the required `max_tokens` parameter.",
    "question": "What happens when the API receives this request?",
    "options": [
      {"label": "A", "text": "The API defaults max_tokens to 4096 and processes the request."},
      {"label": "B", "text": "The API rejects the request with HTTP 400 Bad Request error stating max_tokens is required."},
      {"label": "C", "text": "The API defaults max_tokens to infinity."},
      {"label": "D", "text": "The API returns HTTP 422 with a warning header."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Mandatory max_tokens Parameter",
    "explanation": "In the Anthropic Messages API, `max_tokens` is a strictly required top-level parameter. Omitting it causes an immediate `HTTP 400 Bad Request` validation error.",
    "distractorAnalysis": {
      "A": "Anthropic does not supply an implicit default for max_tokens.",
      "C": "Unbounded generation is not allowed.",
      "D": "Anthropic returns 400 invalid_request_error, not 422."
    },
    "references": [{"title": "Anthropic Messages API", "url": "https://docs.anthropic.com/en/api/messages"}]
  }
]

questions_d2 = [
  {
    "id": 201,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "You want to build a triage assistant that is strictly forced to execute at least one tool from the tools array on the user query, but Claude should autonomously decide which tool is most appropriate.",
    "question": "Which tool_choice configuration should you provide in the request?",
    "options": [
      {"label": "A", "text": "tool_choice={'type': 'auto'}"},
      {"label": "B", "text": "tool_choice={'type': 'any'}"},
      {"label": "C", "text": "tool_choice={'type': 'required'}"},
      {"label": "D", "text": "tool_choice={'type': 'tool', 'name': 'all'}"}
    ],
    "correctAnswer": "B",
    "keyConcept": "tool_choice any mode",
    "explanation": "tool_choice: {'type': 'any'} forces the model to choose and invoke at least one tool from the provided tools list, rather than responding with plain conversational text.",
    "distractorAnalysis": {
      "A": "'auto' allows Claude to answer with plain text without invoking any tool.",
      "C": "'required' is OpenAI schema syntax, not supported in Anthropic Messages API.",
      "D": "To force a specific tool, you must name a real tool in the list, not 'all'."
    },
    "references": [{"title": "Anthropic Tool Choice Documentation", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use"}]
  },
  {
    "id": 202,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "A local database query fails due to a timeout after Claude triggers a tool_use block with id 'toolu_xyz'.",
    "question": "How should the application report this failure back to Claude in the subsequent turn?",
    "options": [
      {"label": "A", "text": "Throw an unhandled exception in the client and disconnect the session."},
      {"label": "B", "text": "Send a user message with a tool_result block containing tool_use_id: 'toolu_xyz', content: 'Timeout error', and is_error: true."},
      {"label": "C", "text": "Send an assistant message with role: 'error' and the error message string."},
      {"label": "D", "text": "Omit the tool_result block and ask the user to rephrase their prompt."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Graceful Tool Error Handling with is_error",
    "explanation": "When a tool execution fails locally, return a tool_result block with is_error: true. This allows Claude to see the exact error and either retry with adjusted parameters or explain the issue gracefully to the user.",
    "distractorAnalysis": {
      "A": "Crashing the client stops the conversational workflow.",
      "C": "There is no role: 'error' in the Messages API schema.",
      "D": "Omitting the tool_result for a pending tool_use will trigger an HTTP 400 validation error."
    },
    "references": [{"title": "Anthropic Handling Tool Errors", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-errors"}]
  },
  {
    "id": 203,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "You are defining an input schema for a weather tool in Python using Pydantic. You want to generate the JSON Schema expected by Anthropic's tools parameter.",
    "question": "Which Pydantic method generates the compatible schema dictionary in Pydantic v2?",
    "options": [
      {"label": "A", "text": "WeatherModel.schema()"},
      {"label": "B", "text": "WeatherModel.model_json_schema()"},
      {"label": "C", "text": "WeatherModel.to_json_schema()"},
      {"label": "D", "text": "WeatherModel.__json__()"}
    ],
    "correctAnswer": "B",
    "keyConcept": "Pydantic v2 JSON Schema Generation",
    "explanation": "In Pydantic V2, `Model.model_json_schema()` is the canonical method to generate the JSON Schema dictionary conforming to Draft 2020-12/Draft 7 used in Anthropic tool definitions.",
    "distractorAnalysis": {
      "A": "schema() was deprecated in Pydantic V1.",
      "C": "to_json_schema() is not a Pydantic method.",
      "D": "__json__() does not return JSON Schema definitions."
    },
    "references": [{"title": "Pydantic JSON Schema", "url": "https://docs.pydantic.dev/latest/concepts/json_schema/"}]
  },
  {
    "id": 204,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "An API call returns a response where Claude invoked two separate tools in parallel: 'get_weather' (id: 'toolu_1') and 'get_traffic' (id: 'toolu_2').",
    "question": "How must the client construct the next message in the conversation history?",
    "options": [
      {"label": "A", "text": "Send two consecutive user messages, each containing one tool_result block."},
      {"label": "B", "text": "Send a single user message containing both tool_result blocks in its content array."},
      {"label": "C", "text": "Send only the tool_result for get_weather and make Claude call get_traffic again."},
      {"label": "D", "text": "Send an assistant message containing the combined results."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Handling Parallel Tool Execution Results",
    "explanation": "When Claude emits multiple tool_use blocks in a single turn, the client must execute all tools and return all corresponding tool_result blocks inside the content array of a single `user` message to maintain role alternation.",
    "distractorAnalysis": {
      "A": "Two consecutive user messages cause an HTTP 400 Bad Request error.",
      "C": "Omitting pending tool results violates schema integrity.",
      "D": "Tool results must be submitted by the user role."
    },
    "references": [{"title": "Tool Use Handling", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use"}]
  },
  {
    "id": 205,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "You want to strictly guarantee that Claude executes ONLY the 'execute_sql_query' tool and no other tool or text response.",
    "question": "Which tool_choice payload must you supply?",
    "options": [
      {"label": "A", "text": "tool_choice={'type': 'tool', 'name': 'execute_sql_query'}"},
      {"label": "B", "text": "tool_choice={'type': 'specific', 'tool': 'execute_sql_query'}"},
      {"label": "C", "text": "tool_choice={'force': 'execute_sql_query'}"},
      {"label": "D", "text": "tool_choice={'name': 'execute_sql_query'}"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Forcing a Specific Named Tool",
    "explanation": "To force a specific tool, pass `tool_choice: {'type': 'tool', 'name': '<tool_name>'}`. Claude is guaranteed to output a tool_use block for that exact tool.",
    "distractorAnalysis": {
      "B": "'type': 'specific' is invalid schema syntax.",
      "C": "'force' is not a valid parameter in tool_choice.",
      "D": "The 'type': 'tool' discriminator is required."
    },
    "references": [{"title": "Forcing Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use"}]
  },
  {
    "id": 206,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "A developer provides a tool schema without a `description` field in the tool definition.",
    "question": "What is the consequence of omitting descriptions on tools and input properties?",
    "options": [
      {"label": "A", "text": "The API will return an HTTP 400 error immediately."},
      {"label": "B", "text": "The API accepts the request, but Claude will have significantly reduced accuracy in selecting the tool and formatting valid arguments."},
      {"label": "C", "text": "The tool will be automatically disabled by the API gateway."},
      {"label": "D", "text": "Claude will inspect the source code of the tool automatically."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Importance of Tool & Property Descriptions",
    "explanation": "While the JSON schema may technically validate without descriptions, Anthropic strongly emphasizes that detailed descriptions in tool definitions and input properties are the primary mechanism Claude uses to understand when and how to invoke the tool.",
    "distractorAnalysis": {
      "A": "Descriptions are optional in JSON Schema Draft 7, so it does not throw an immediate 400.",
      "C": "The gateway does not disable tools silently.",
      "D": "Claude has no access to underlying source code unless explicitly provided in context."
    },
    "references": [{"title": "Tool Use Best Practices", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#best-practices-for-tool-definitions"}]
  },
  {
    "id": 207,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "When building an agent, you want Claude to think step-by-step and provide a user-facing explanation BEFORE outputting the tool_use block.",
    "question": "What does Claude typically produce in the response content when tool_choice is 'auto'?",
    "options": [
      {"label": "A", "text": "An error, because text blocks and tool_use blocks cannot coexist in the same message."},
      {"label": "B", "text": "A list of content blocks containing a text block first, followed by a tool_use block."},
      {"label": "C", "text": "Only the tool_use block; text is always suppressed during tool calling."},
      {"label": "D", "text": "Two separate assistant messages."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Mixed Content Blocks with Tool Use",
    "explanation": "Claude can generate both conversational text (or reasoning) and a `tool_use` block within the same turn. The response `content` array contains `[{\"type\": \"text\", \"text\": \"...\"}, {\"type\": \"tool_use\", ...}]`.",
    "distractorAnalysis": {
      "A": "Text and tool_use blocks coexist natively in the content array.",
      "C": "Text is not suppressed unless forced by specific prefilling or prompt constraints.",
      "D": "Consecutive assistant messages are forbidden by the API."
    },
    "references": [{"title": "Anthropic Tool Calling", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use"}]
  },
  {
    "id": 208,
    "domain": 2,
    "domainName": "Tool Calling & JSON Schemas",
    "scenario": "A tool requires an enum parameter to select an action: 'create', 'update', or 'delete'.",
    "question": "How should this constraint be expressed in the input_schema?",
    "options": [
      {"label": "A", "text": "'action': {'type': 'string', 'enum': ['create', 'update', 'delete']}"},
      {"label": "B", "text": "'action': {'type': 'enum', 'values': ['create', 'update', 'delete']}"},
      {"label": "C", "text": "'action': {'type': 'string', 'regex': 'create|update|delete'}"},
      {"label": "D", "text": "'action': {'type': 'options', 'choices': ['create', 'update', 'delete']}"}
    ],
    "correctAnswer": "A",
    "keyConcept": "JSON Schema Enum Constraints",
    "explanation": "Conforming to standard JSON Schema, enums are declared with `'type': 'string'` and an `'enum': [...]` array containing allowed literal values.",
    "distractorAnalysis": {
      "B": "'type': 'enum' is invalid JSON Schema.",
      "C": "regex is not standard JSON Schema for fixed enums (pattern keyword exists, but enum is standard).",
      "D": "'options' is not a valid JSON Schema type."
    },
    "references": [{"title": "JSON Schema Reference", "url": "https://json-schema.org/understanding-json-schema/reference/enum"}]
  }
]

questions_d3 = [
  {
    "id": 301,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "An engineer wants Claude to output raw, unescaped JSON without any conversational preamble or markdown code fences (```json).",
    "question": "What is the most reliable developer technique in the Anthropic Messages API to achieve this?",
    "options": [
      {"label": "A", "text": "Pass response_format={'type': 'json_object'} in the top-level payload."},
      {"label": "B", "text": "Prefill the assistant response with {'role': 'assistant', 'content': '{'} in the messages array."},
      {"label": "C", "text": "Set temperature: 0.0 and add 'JSON ONLY' in capital letters in the system prompt."},
      {"label": "D", "text": "Add stop_sequences: ['```'] in the request configuration."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Assistant Prefilling for Deterministic Output",
    "explanation": "Prefilling the assistant turn with '{' forces the model to complete the JSON payload directly from the opening bracket, completely bypassing conversational preamble and markdown backticks.",
    "distractorAnalysis": {
      "A": "response_format is an OpenAI parameter and is not part of the Anthropic Messages API.",
      "C": "Prompting instructions alone do not guarantee elimination of markdown backticks.",
      "D": "Stopping at ``` would prematurely terminate markdown formatting rather than prevent it."
    },
    "references": [{"title": "Anthropic Prefill Responses", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response"}]
  },
  {
    "id": 302,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "You are designing a prompt that accepts untrusted user input and need to prevent prompt injection while extracting specific data points.",
    "question": "Which prompt engineering pattern is recommended by Anthropic to clearly delineate untrusted inputs from instructions?",
    "options": [
      {"label": "A", "text": "Surround untrusted user text with distinct XML tags like <user_input>...</user_input> and reference those tags in system instructions."},
      {"label": "B", "text": "Encode the user input in Base64 before sending it to the API."},
      {"label": "C", "text": "Add 'DO NOT HACK ME' in the system prompt."},
      {"label": "D", "text": "Remove all punctuation marks from the user input before API transmission."}
    ],
    "correctAnswer": "A",
    "keyConcept": "XML Tag Delimitation for Security & Parsing",
    "explanation": "Anthropic models are specifically trained to respect XML tag boundaries. Wrapping untrusted content in `<user_input>` tags prevents the model from conflating instructions with input data.",
    "distractorAnalysis": {
      "B": "Base64 encoding degrades model comprehension and increases token costs without offering reliable safety.",
      "C": "Superficial negative prompting is easily bypassed by adversarial jailbreaks.",
      "D": "Stripping punctuation destroys semantic meaning of legitimate inputs."
    },
    "references": [{"title": "Use XML Tags", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags"}]
  },
  {
    "id": 303,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "A developer needs Claude to perform complex mathematical reasoning before returning a final JSON summary. The reasoning should be inspectable by developers but separated from the final parsed output.",
    "question": "How should the prompt structure the model's output?",
    "options": [
      {"label": "A", "text": "Instruct Claude to place its reasoning inside <thinking>...</thinking> tags and the final result inside <result>...</result> tags."},
      {"label": "B", "text": "Run two separate API calls: one for thinking and one for JSON formatting."},
      {"label": "C", "text": "Ask Claude to write comments inside the JSON keys."},
      {"label": "D", "text": "Use temperature: 0.9 so the model thinks out loud."}
    ],
    "correctAnswer": "A",
    "keyConcept": "CoT with XML Thinking Blocks",
    "explanation": "Instructing Claude to use `<thinking>` tags provides a dedicated scratchpad for Chain-of-Thought reasoning. Client code can easily extract `<result>` for downstream consumers while logging `<thinking>` for auditing.",
    "distractorAnalysis": {
      "B": "Two API calls double latency and token costs unnecessarily.",
      "C": "JSON specification does not support comments and results in invalid JSON parse errors.",
      "D": "Higher temperature increases randomness, not reasoning rigor."
    },
    "references": [{"title": "Chain of Thought Prompting", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought"}]
  },
  {
    "id": 304,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "You prefill the assistant turn with `{\"status\": \"success\", \"data\": [` to guarantee an array output.",
    "question": "When receiving the API response, what does `response.content[0].text` contain?",
    "options": [
      {"label": "A", "text": "The entire JSON string including the prefill prefix."},
      {"label": "B", "text": "Only the continuation generated by the model after the prefill string."},
      {"label": "C", "text": "A parsed JavaScript/Python object."},
      {"label": "D", "text": "An empty string because prefilling ends generation."}
    ],
    "correctAnswer": "B",
    "keyConcept": "Prefill Completion Reconstitution",
    "explanation": "When assistant prefilling is used, `response.content[0].text` contains ONLY the newly generated tokens following the prefill. The application must prepend the prefill string to reconstruct the complete payload.",
    "distractorAnalysis": {
      "A": "The API does not duplicate the prefill string in the response text.",
      "C": "The API returns raw text; parsing is always handled on the client.",
      "D": "Prefilling guides the start of generation; it does not terminate it."
    },
    "references": [{"title": "Prefill Claude's Response", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response"}]
  },
  {
    "id": 305,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "You want to provide few-shot examples for a complex sentiment analysis classification task.",
    "question": "What is the recommended structure for formatting few-shot examples with Claude?",
    "options": [
      {"label": "A", "text": "Wrap all examples inside <examples> tags, with individual <example> blocks showing <input> and <output>."},
      {"label": "B", "text": "Add 20 fake user/assistant turns in the active conversation history."},
      {"label": "C", "text": "Comma-separated key-value pairs in a single string."},
      {"label": "D", "text": "Few-shot prompting is deprecated and unsupported on Claude 3.5."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Few-Shot Formatting with XML Tags",
    "explanation": "Anthropic recommends formatting few-shot examples cleanly inside `<examples><example><input>...</input><output>...</output></example></examples>` blocks in the system prompt or user turn.",
    "distractorAnalysis": {
      "B": "Polluting the message history with fake conversational turns is error-prone and interferes with cache breakpoints.",
      "C": "Unstructured CSV strings lack clear schema boundaries.",
      "D": "Few-shot prompting remains a foundational, highly effective prompting technique."
    },
    "references": [{"title": "Give Claude Examples", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-claude-examples"}]
  },
  {
    "id": 306,
    "domain": 3,
    "domainName": "Structured Outputs & Advanced Prompting",
    "scenario": "A customer feedback categorization prompt produces occasional hallucinations when the sentiment is neutral or ambiguous.",
    "question": "Which prompt engineering adjustment best mitigates this behavior?",
    "options": [
      {"label": "A", "text": "Instruct Claude: 'If the input is ambiguous or does not contain clear sentiment, output UNKNOWN and explain why inside <reasoning> tags.'"},
      {"label": "B", "text": "Set max_tokens: 10."},
      {"label": "C", "text": "Use temperature: 1.0 to increase model confidence."},
      {"label": "D", "text": "Remove system instructions."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Explicit Fallback & Ambiguity Handling",
    "explanation": "Providing an explicit 'escape hatch' or fallback instruction (e.g. outputting 'UNKNOWN') prevents the model from being forced to hallucinate a false positive when inputs are ambiguous.",
    "distractorAnalysis": {
      "B": "Restricting max_tokens cuts off generation abruptly without fixing accuracy.",
      "C": "High temperature increases hallucinations and unpredictability.",
      "D": "Removing system prompt removes all guardrails and task definition."
    },
    "references": [{"title": "Prompt Engineering Interactive Tutorial", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"}]
  }
]

questions_d4 = [
  {
    "id": 401,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "A developer adds cache_control: {'type': 'ephemeral'} to a system prompt containing 650 tokens on Claude 3.5 Sonnet.",
    "question": "What will be the result of this caching configuration?",
    "options": [
      {"label": "A", "text": "The prompt will be cached normally with a 5-minute TTL."},
      {"label": "B", "text": "The API will return an HTTP 400 InvalidRequestError because the prompt is below the 1,024 minimum token threshold."},
      {"label": "C", "text": "The prompt will not be cached, and standard input token rates will apply without throwing an error."},
      {"label": "D", "text": "The prompt will be padded with whitespace automatically up to 1,024 tokens."}
    ],
    "correctAnswer": "C",
    "keyConcept": "Prompt Caching Minimum Token Thresholds",
    "explanation": "Claude 3.5 Sonnet requires a minimum of 1,024 tokens for Prompt Caching. If a marked block is below this threshold, the request succeeds normally without error, but caching does not activate and no cache tokens are written.",
    "distractorAnalysis": {
      "A": "The 650-token block does not meet the 1,024 minimum token requirement.",
      "B": "The API does not fail or reject requests that fall below cache thresholds.",
      "D": "Anthropic does not auto-pad prompts with whitespace tokens."
    },
    "references": [{"title": "Anthropic Prompt Caching Guide", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"}]
  },
  {
    "id": 402,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "You are designing a chatbot with a large 10,000-token product catalog. How does Prompt Caching affect billing on cache hits vs cache writes?",
    "question": "What are the pricing multipliers for cache creation and cache reads relative to base input tokens?",
    "options": [
      {"label": "A", "text": "Cache Creation: 1.25x base price; Cache Read: 0.10x base price (90% discount)."},
      {"label": "B", "text": "Cache Creation: Free; Cache Read: 0.50x base price."},
      {"label": "C", "text": "Cache Creation: 2.0x base price; Cache Read: Free."},
      {"label": "D", "text": "Cache Creation: 1.0x base price; Cache Read: 0.25x base price."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Prompt Caching Pricing Mechanics",
    "explanation": "Writing to cache incurs a 25% surcharge (1.25x base input token price), while reading from cache grants a massive 90% discount (0.10x base input token price).",
    "distractorAnalysis": {
      "B": "Cache creation is not free; it requires server-side resource allocation.",
      "C": "Cache reads are not 100% free; they cost 10% of base price.",
      "D": "The read discount is 90% (0.10x), not 75% (0.25x)."
    },
    "references": [{"title": "Prompt Caching Pricing", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#pricing"}]
  },
  {
    "id": 403,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "An engineer places a dynamic timestamp string at line 1 of the system prompt, followed by a 5,000-token static company handbook marked with cache_control.",
    "question": "What will happen to prompt cache efficiency across consecutive requests?",
    "options": [
      {"label": "A", "text": "The entire cache will miss on every request because prompt caching requires an exact prefix token match from the start of the prompt."},
      {"label": "B", "text": "The API will cache the handbook and ignore the dynamic timestamp."},
      {"label": "C", "text": "The cache will hit with a 50% penalty."},
      {"label": "D", "text": "Anthropic will automatically reorder the system prompt to put static text first."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Exact Prefix Matching Rule in Prompt Caching",
    "explanation": "Prompt Caching relies on exact byte/token prefix matching starting from index 0. Any mutation before a cache breakpoint (like inserting dynamic timestamps) invalidates the entire cache.",
    "distractorAnalysis": {
      "B": "The cache cannot skip leading changed tokens; prefix matching is strictly linear.",
      "C": "Cache hits are all-or-nothing per prefix; there is no 50% partial hit.",
      "D": "The API never mutates or reorders developer prompts."
    },
    "references": [{"title": "Prompt Caching Prefix Matching", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#how-prompt-caching-works"}]
  },
  {
    "id": 404,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "How many cache breakpoints (`cache_control: {'type': 'ephemeral'}`) can be declared in a single API request?",
    "question": "What is the maximum number of cache breakpoints supported per request?",
    "options": [
      {"label": "A", "text": "1"},
      {"label": "B", "text": "4"},
      {"label": "C", "text": "10"},
      {"label": "D", "text": "Unlimited"}
    ],
    "correctAnswer": "B",
    "keyConcept": "Maximum Cache Breakpoints Limit",
    "explanation": "Anthropic allows up to 4 cache breakpoints per API request across system prompts, tool definitions, and message turns.",
    "distractorAnalysis": {
      "A": "You can declare up to 4 breakpoints to cache multiple layers (e.g. system + tools + history).",
      "C": "10 exceeds the maximum limit of 4.",
      "D": "Breakpoints are bounded to 4 to conserve memory."
    },
    "references": [{"title": "Prompt Caching Limits", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#limits"}]
  },
  {
    "id": 405,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "What is the default Time-To-Live (TTL) for cached prompt prefixes, and how is it extended?",
    "question": "What is the prompt cache lifespan?",
    "options": [
      {"label": "A", "text": "5 minutes; refreshed automatically on every cache hit."},
      {"label": "B", "text": "24 hours static TTL."},
      {"label": "C", "text": "1 hour; requires an explicit touch_cache API call to extend."},
      {"label": "D", "text": "Permanent until deleted by the user."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Prompt Cache TTL & Refresh Lifecycle",
    "explanation": "Cached prefixes have a 5-minute TTL that is automatically refreshed for another 5 minutes every time a request triggers a cache hit.",
    "distractorAnalysis": {
      "B": "Cached memory is not retained for 24 hours.",
      "C": "There is no manual touch_cache endpoint; refresh is implicit on hit.",
      "D": "Caches are ephemeral and evict automatically after 5 minutes of inactivity."
    },
    "references": [{"title": "Prompt Caching TTL", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"}]
  },
  {
    "id": 406,
    "domain": 4,
    "domainName": "Prompt Caching & Cost/Latency Optimization",
    "scenario": "You are caching a 5,000-token prompt on Claude 3 Opus. What is the minimum token requirement for prompt caching on Claude 3 Opus?",
    "question": "What is the minimum token threshold on Claude 3 Opus?",
    "options": [
      {"label": "A", "text": "512 tokens"},
      {"label": "B", "text": "1,024 tokens"},
      {"label": "C", "text": "2,048 tokens"},
      {"label": "D", "text": "4,096 tokens"}
    ],
    "correctAnswer": "C",
    "keyConcept": "Opus vs Sonnet Cache Thresholds",
    "explanation": "Claude 3.5 Sonnet and Haiku require 1,024 tokens minimum, while Claude 3 Opus requires a minimum of 2,048 tokens to activate prompt caching.",
    "distractorAnalysis": {
      "A": "512 is below all model thresholds.",
      "B": "1,024 is the threshold for Sonnet 3.5 and Haiku 3.5, but Opus requires 2,048.",
      "D": "4,096 is unnecessarily high."
    },
    "references": [{"title": "Model-Specific Cache Limits", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"}]
  }
]

questions_d5 = [
  {
    "id": 501,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "During high traffic, your client receives an HTTP 529 error from the Anthropic Messages API.",
    "question": "What does this error indicate, and how should your application handle it?",
    "options": [
      {"label": "A", "text": "The provided API key is invalid; refresh credentials immediately."},
      {"label": "B", "text": "Anthropic servers are temporarily overloaded; retry the request with exponential backoff and jitter."},
      {"label": "C", "text": "The request payload exceeded context length; prune conversation history."},
      {"label": "D", "text": "A validation schema error occurred in tool definitions; fix input_schema."}
    ],
    "correctAnswer": "B",
    "keyConcept": "HTTP 529 Overloaded Error Handling",
    "explanation": "HTTP 529 indicates that Anthropic infrastructure is experiencing temporary overload. Clients should implement exponential backoff with randomized jitter to retry gracefully.",
    "distractorAnalysis": {
      "A": "Invalid API key returns HTTP 401 Unauthorized.",
      "C": "Exceeding context length returns HTTP 400 InvalidRequestError.",
      "D": "Schema validation errors return HTTP 400 InvalidRequestError."
    },
    "references": [{"title": "Anthropic Error Codes", "url": "https://docs.anthropic.com/en/api/errors"}]
  },
  {
    "id": 502,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "An application parses a streaming JSON completion, but the stream ends unexpectedly and `response.stop_reason` is 'max_tokens'. JSON parsing fails with SyntaxError: Unexpected end of input.",
    "question": "What is the root cause of this failure and how should it be mitigated?",
    "options": [
      {"label": "A", "text": "The model suffered an internal crash; retry with the exact same parameters."},
      {"label": "B", "text": "The max_tokens limit in the API request was set too low, truncating the JSON before the closing brace; increase max_tokens."},
      {"label": "C", "text": "The API key lacked permission for streaming; switch to non-streaming."},
      {"label": "D", "text": "The model entered an infinite loop caused by temperature 0.0."}
    ],
    "correctAnswer": "B",
    "keyConcept": "max_tokens Truncation Risk on Structured Data",
    "explanation": "When `stop_reason: 'max_tokens'`, the output is forcibly cut off at the token limit, leaving unclosed JSON brackets/quotes. Developers must increase `max_tokens` or handle pagination.",
    "distractorAnalysis": {
      "A": "max_tokens is not an internal crash; retrying with identical max_tokens will truncate again.",
      "C": "Streaming permissions are not the cause of mid-generation token truncation.",
      "D": "Temperature 0.0 does not trigger infinite loops."
    },
    "references": [{"title": "Stop Reasons in Anthropic API", "url": "https://docs.anthropic.com/en/docs/build-with-claude/messages-api#response-parameters"}]
  },
  {
    "id": 503,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "A batch processing service makes 200 API calls per minute and begins receiving HTTP 429 RateLimitError responses.",
    "question": "Which header returned by the Anthropic API specifies when the rate limit window resets?",
    "options": [
      {"label": "A", "text": "retry-after-ms / retry-after"},
      {"label": "B", "text": "x-rate-limit-reset-time"},
      {"label": "C", "text": "anthropic-cooldown-seconds"},
      {"label": "D", "text": "x-api-throttle-wait"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Rate Limit Headers & Backoff",
    "explanation": "Anthropic returns standard `retry-after` and `retry-after-ms` response headers indicating the duration clients should pause before attempting the next request.",
    "distractorAnalysis": {
      "B": "Standard header name is retry-after or retry-after-ms.",
      "C": "anthropic-cooldown-seconds is not an Anthropic header.",
      "D": "x-api-throttle-wait is non-standard."
    },
    "references": [{"title": "Rate Limits & Error Handling", "url": "https://docs.anthropic.com/en/api/rate-limits"}]
  },
  {
    "id": 504,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "You are building an automated evaluation test suite (evals) to detect prompt regressions before deploying a new system prompt to production.",
    "question": "Which evaluation methodology provides scalable, automated scoring of complex natural language responses against qualitative rubrics?",
    "options": [
      {"label": "A", "text": "Model-graded evaluation (LLM-as-a-judge) using Claude 3.5 Sonnet / Opus with a structured scoring rubric."},
      {"label": "B", "text": "Exact string equality assertions (assert response.text == expected_text)."},
      {"label": "C", "text": "Manual human review of every production request in real-time."},
      {"label": "D", "text": "Regex matching on word count only."}
    ],
    "correctAnswer": "A",
    "keyConcept": "LLM-as-a-Judge Evaluation Strategy",
    "explanation": "Model-graded evals (LLM-as-a-judge) using a capable model like Sonnet or Opus provide nuanced, scalable scoring across qualitative criteria (factuality, tone, adherence) that exact string matching cannot evaluate.",
    "distractorAnalysis": {
      "B": "Exact string equality fails due to natural language variance even with temperature 0.",
      "C": "Manual real-time human review does not scale in CI/CD pipelines.",
      "D": "Word count regex does not measure semantic correctness or safety."
    },
    "references": [{"title": "Evaluate Your Prompt", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts"}]
  },
  {
    "id": 505,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "Why is adding randomized jitter essential when implementing exponential backoff for high-throughput clients experiencing HTTP 429 or 529 errors?",
    "question": "What problem does jitter solve in distributed systems?",
    "options": [
      {"label": "A", "text": "It prevents the 'Thundering Herd' problem where all synchronized clients retry simultaneously, re-overloading the API gateway."},
      {"label": "B", "text": "It bypasses API rate limits completely."},
      {"label": "C", "text": "It reduces token costs by 50%."},
      {"label": "D", "text": "It increases temperature dynamically."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Exponential Backoff with Full Jitter",
    "explanation": "Without jitter, all concurrent clients back off for identical durations ($2^1, 2^2, 2^3...$) and hit the server simultaneously in waves (Thundering Herd). Adding randomized jitter spreads retries evenly across time.",
    "distractorAnalysis": {
      "B": "Jitter does not bypass rate limits; it smooths traffic arrival.",
      "C": "Jitter does not change token pricing.",
      "D": "Jitter is a client-side network retry delay, unrelated to sampling temperature."
    },
    "references": [{"title": "Exponential Backoff and Jitter", "url": "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"}]
  },
  {
    "id": 506,
    "domain": 5,
    "domainName": "Error Handling, Rate Limits & Evaluation",
    "scenario": "An API call returns an HTTP 400 error with error type `invalid_request_error` and message 'messages.0.content: string or list of content blocks expected'.",
    "question": "Should this error be automatically retried by an exponential backoff retry loop?",
    "options": [
      {"label": "A", "text": "No, HTTP 400 errors are client-side payload validation failures that will never succeed without fixing the request code."},
      {"label": "B", "text": "Yes, retry up to 5 times."},
      {"label": "C", "text": "Yes, but only if temperature is 0."},
      {"label": "D", "text": "Yes, because all 4xx errors are transient."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Non-Retryable vs Retryable Errors",
    "explanation": "HTTP 400 (Bad Request), 401 (Unauthorized), and 403 (Forbidden) are permanent client-side errors. Retrying them without code changes wastes cycles and will always fail.",
    "distractorAnalysis": {
      "B": "Retrying a malformed schema 5 times produces 5 identical HTTP 400 failures.",
      "C": "Temperature does not fix malformed request payloads.",
      "D": "Most 4xx errors are permanent client errors; only 429 is retryable."
    },
    "references": [{"title": "Anthropic Errors", "url": "https://docs.anthropic.com/en/api/errors"}]
  }
]

def format_ts(questions):
    output = "import type { Question } from '../../types';\n\nexport const questions: Question[] = [\n"
    for q in questions:
        output += "  {\n"
        output += f"    id: {q['id']},\n"
        output += f"    domain: {q['domain']},\n"
        output += f"    domainName: {repr(q['domainName'])},\n"
        output += f"    scenario: {repr(q['scenario'])},\n"
        output += f"    question: {repr(q['question'])},\n"
        output += "    options: [\n"
        for opt in q['options']:
            output += f"      {{ label: {repr(opt['label'])}, text: {repr(opt['text'])} }},\n"
        output += "    ],\n"
        output += f"    correctAnswer: {repr(q['correctAnswer'])},\n"
        output += f"    keyConcept: {repr(q['keyConcept'])},\n"
        output += f"    explanation: {repr(q['explanation'])},\n"
        output += "    distractorAnalysis: {\n"
        for k, v in q['distractorAnalysis'].items():
            output += f"      {k}: {repr(v)},\n"
        output += "    },\n"
        output += "    references: [\n"
        for ref in q['references']:
            output += f"      {{ title: {repr(ref['title'])}, url: {repr(ref['url'])} }},\n"
        output += "    ]\n"
        output += "  },\n"
    output += "];\n"
    return output

import os

base_quiz = "/Users/eduardo/code_projects/anthropic-claude-certifications/certs/ccar-foundations/quiz/src/data/ccdv"
base_cert = "/Users/eduardo/code_projects/anthropic-claude-certifications/certs/ccdv-foundations/quiz"

files = [
  ("questions-d1.ts", questions_d1),
  ("questions-d2.ts", questions_d2),
  ("questions-d3.ts", questions_d3),
  ("questions-d4.ts", questions_d4),
  ("questions-d5.ts", questions_d5),
]

for filename, qlist in files:
    content = format_ts(qlist)
    # Fix import path for questions in certs/ccdv-foundations
    with open(os.path.join(base_quiz, filename), "w") as f:
        f.write(content)
    with open(os.path.join(base_cert, filename), "w") as f:
        f.write(content.replace("../../types", "../types"))

print(f"Generated {sum(len(q[1]) for q in files)} comprehensive CCDV questions.")
