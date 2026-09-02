import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 201,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: 'You want to build a triage assistant that is strictly forced to execute at least one tool from the tools array on the user query, but Claude should autonomously decide which tool is most appropriate.',
    question: 'Which tool_choice configuration should you provide in the request?',
    options: [
      { label: 'A', text: "tool_choice={'type': 'auto'}" },
      { label: 'B', text: "tool_choice={'type': 'any'}" },
      { label: 'C', text: "tool_choice={'type': 'required'}" },
      { label: 'D', text: "tool_choice={'type': 'tool', 'name': 'all'}" },
    ],
    correctAnswer: 'B',
    keyConcept: 'tool_choice any mode',
    explanation: "tool_choice: {'type': 'any'} forces the model to choose and invoke at least one tool from the provided tools list, rather than responding with plain conversational text.",
    distractorAnalysis: {
      A: "'auto' allows Claude to answer with plain text without invoking any tool.",
      C: "'required' is OpenAI schema syntax, not supported in Anthropic Messages API.",
      D: "To force a specific tool, you must name a real tool in the list, not 'all'.",
    },
    references: [
      { title: 'Anthropic Tool Choice Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' },
    ]
  },
  {
    id: 202,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: "A local database query fails due to a timeout after Claude triggers a tool_use block with id 'toolu_xyz'.",
    question: 'How should the application report this failure back to Claude in the subsequent turn?',
    options: [
      { label: 'A', text: 'Throw an unhandled exception in the client and disconnect the session.' },
      { label: 'B', text: "Send a user message with a tool_result block containing tool_use_id: 'toolu_xyz', content: 'Timeout error', and is_error: true." },
      { label: 'C', text: "Send an assistant message with role: 'error' and the error message string." },
      { label: 'D', text: 'Omit the tool_result block and ask the user to rephrase their prompt.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Graceful Tool Error Handling with is_error',
    explanation: 'When a tool execution fails locally, return a tool_result block with is_error: true. This allows Claude to see the exact error and either retry with adjusted parameters or explain the issue gracefully to the user.',
    distractorAnalysis: {
      A: 'Crashing the client stops the conversational workflow.',
      C: "There is no role: 'error' in the Messages API schema.",
      D: 'Omitting the tool_result for a pending tool_use will trigger an HTTP 400 validation error.',
    },
    references: [
      { title: 'Anthropic Handling Tool Errors', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-errors' },
    ]
  },
  {
    id: 203,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: "You are defining an input schema for a weather tool in Python using Pydantic. You want to generate the JSON Schema expected by Anthropic's tools parameter.",
    question: 'Which Pydantic method generates the compatible schema dictionary in Pydantic v2?',
    options: [
      { label: 'A', text: 'WeatherModel.schema()' },
      { label: 'B', text: 'WeatherModel.model_json_schema()' },
      { label: 'C', text: 'WeatherModel.to_json_schema()' },
      { label: 'D', text: 'WeatherModel.__json__()' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Pydantic v2 JSON Schema Generation',
    explanation: 'In Pydantic V2, `Model.model_json_schema()` is the canonical method to generate the JSON Schema dictionary conforming to Draft 2020-12/Draft 7 used in Anthropic tool definitions.',
    distractorAnalysis: {
      A: 'schema() was deprecated in Pydantic V1.',
      C: 'to_json_schema() is not a Pydantic method.',
      D: '__json__() does not return JSON Schema definitions.',
    },
    references: [
      { title: 'Pydantic JSON Schema', url: 'https://docs.pydantic.dev/latest/concepts/json_schema/' },
    ]
  },
  {
    id: 204,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: "An API call returns a response where Claude invoked two separate tools in parallel: 'get_weather' (id: 'toolu_1') and 'get_traffic' (id: 'toolu_2').",
    question: 'How must the client construct the next message in the conversation history?',
    options: [
      { label: 'A', text: 'Send two consecutive user messages, each containing one tool_result block.' },
      { label: 'B', text: 'Send a single user message containing both tool_result blocks in its content array.' },
      { label: 'C', text: 'Send only the tool_result for get_weather and make Claude call get_traffic again.' },
      { label: 'D', text: 'Send an assistant message containing the combined results.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Handling Parallel Tool Execution Results',
    explanation: 'When Claude emits multiple tool_use blocks in a single turn, the client must execute all tools and return all corresponding tool_result blocks inside the content array of a single `user` message to maintain role alternation.',
    distractorAnalysis: {
      A: 'Two consecutive user messages cause an HTTP 400 Bad Request error.',
      C: 'Omitting pending tool results violates schema integrity.',
      D: 'Tool results must be submitted by the user role.',
    },
    references: [
      { title: 'Tool Use Handling', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
    ]
  },
  {
    id: 205,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: "You want to strictly guarantee that Claude executes ONLY the 'execute_sql_query' tool and no other tool or text response.",
    question: 'Which tool_choice payload must you supply?',
    options: [
      { label: 'A', text: "tool_choice={'type': 'tool', 'name': 'execute_sql_query'}" },
      { label: 'B', text: "tool_choice={'type': 'specific', 'tool': 'execute_sql_query'}" },
      { label: 'C', text: "tool_choice={'force': 'execute_sql_query'}" },
      { label: 'D', text: "tool_choice={'name': 'execute_sql_query'}" },
    ],
    correctAnswer: 'A',
    keyConcept: 'Forcing a Specific Named Tool',
    explanation: "To force a specific tool, pass `tool_choice: {'type': 'tool', 'name': '<tool_name>'}`. Claude is guaranteed to output a tool_use block for that exact tool.",
    distractorAnalysis: {
      B: "'type': 'specific' is invalid schema syntax.",
      C: "'force' is not a valid parameter in tool_choice.",
      D: "The 'type': 'tool' discriminator is required.",
    },
    references: [
      { title: 'Forcing Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' },
    ]
  },
  {
    id: 206,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: 'A developer provides a tool schema without a `description` field in the tool definition.',
    question: 'What is the consequence of omitting descriptions on tools and input properties?',
    options: [
      { label: 'A', text: 'The API will return an HTTP 400 error immediately.' },
      { label: 'B', text: 'The API accepts the request, but Claude will have significantly reduced accuracy in selecting the tool and formatting valid arguments.' },
      { label: 'C', text: 'The tool will be automatically disabled by the API gateway.' },
      { label: 'D', text: 'Claude will inspect the source code of the tool automatically.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Importance of Tool & Property Descriptions',
    explanation: 'While the JSON schema may technically validate without descriptions, Anthropic strongly emphasizes that detailed descriptions in tool definitions and input properties are the primary mechanism Claude uses to understand when and how to invoke the tool.',
    distractorAnalysis: {
      A: 'Descriptions are optional in JSON Schema Draft 7, so it does not throw an immediate 400.',
      C: 'The gateway does not disable tools silently.',
      D: 'Claude has no access to underlying source code unless explicitly provided in context.',
    },
    references: [
      { title: 'Tool Use Best Practices', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#best-practices-for-tool-definitions' },
    ]
  },
  {
    id: 207,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: 'When building an agent, you want Claude to think step-by-step and provide a user-facing explanation BEFORE outputting the tool_use block.',
    question: "What does Claude typically produce in the response content when tool_choice is 'auto'?",
    options: [
      { label: 'A', text: 'An error, because text blocks and tool_use blocks cannot coexist in the same message.' },
      { label: 'B', text: 'A list of content blocks containing a text block first, followed by a tool_use block.' },
      { label: 'C', text: 'Only the tool_use block; text is always suppressed during tool calling.' },
      { label: 'D', text: 'Two separate assistant messages.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Mixed Content Blocks with Tool Use',
    explanation: 'Claude can generate both conversational text (or reasoning) and a `tool_use` block within the same turn. The response `content` array contains `[{"type": "text", "text": "..."}, {"type": "tool_use", ...}]`.',
    distractorAnalysis: {
      A: 'Text and tool_use blocks coexist natively in the content array.',
      C: 'Text is not suppressed unless forced by specific prefilling or prompt constraints.',
      D: 'Consecutive assistant messages are forbidden by the API.',
    },
    references: [
      { title: 'Anthropic Tool Calling', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
    ]
  },
  {
    id: 208,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: "A tool requires an enum parameter to select an action: 'create', 'update', or 'delete'.",
    question: 'How should this constraint be expressed in the input_schema?',
    options: [
      { label: 'A', text: "'action': {'type': 'string', 'enum': ['create', 'update', 'delete']}" },
      { label: 'B', text: "'action': {'type': 'enum', 'values': ['create', 'update', 'delete']}" },
      { label: 'C', text: "'action': {'type': 'string', 'regex': 'create|update|delete'}" },
      { label: 'D', text: "'action': {'type': 'options', 'choices': ['create', 'update', 'delete']}" },
    ],
    correctAnswer: 'A',
    keyConcept: 'JSON Schema Enum Constraints',
    explanation: "Conforming to standard JSON Schema, enums are declared with `'type': 'string'` and an `'enum': [...]` array containing allowed literal values.",
    distractorAnalysis: {
      B: "'type': 'enum' is invalid JSON Schema.",
      C: 'regex is not standard JSON Schema for fixed enums (pattern keyword exists, but enum is standard).',
      D: "'options' is not a valid JSON Schema type.",
    },
    references: [
      { title: 'JSON Schema Reference', url: 'https://json-schema.org/understanding-json-schema/reference/enum' },
    ]
  },
];
