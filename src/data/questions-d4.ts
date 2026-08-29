import type { Question } from '../types';

export const questionsD4: Question[] = [
  {
    id: 68,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are integrating a Model Context Protocol (MCP) server that provides read-only access to an internal wiki. The agent needs to occasionally read specific wiki pages during conversations.',
    question: 'Which MCP primitive is best suited for providing read-only, paginated text data to the agent?',
    options: [
      { label: 'A', text: 'Tools' },
      { label: 'B', text: 'Resources' },
      { label: 'C', text: 'Prompts' },
      { label: 'D', text: 'Webhooks' }
    ],
    correctAnswer: 'B',
    keyConcept: 'MCP Resources Primitive for Passive Read-Only Context Retrieval',
    explanation: 'In the Model Context Protocol, Resources are designed specifically for exposing read-only data, such as files, database records, or wiki pages, to the agent.\n\nUnlike Tools, which are for actions and side-effects, Resources provide a standard way to load context via URIs.\n\n```python\n# MCP Server returning a resource\n@server.read_resource("wiki://page/123")\ndef read_wiki_page(uri: str):\n    return {"contents": [{"uri": uri, "mimeType": "text/plain", "text": "Wiki content..."}]}\n```\n\n',
    distractorAnalysis: {
      A: 'Tools are meant for actions, computations, or operations that might have side effects, not just reading static data. Using a tool to fetch static data adds unnecessary overhead compared to Resources.',
      C: 'Prompts are templates for user interactions, not for exposing data sources. Prompts are used to structure initial conversation states rather than providing on-demand data lookups.',
      D: 'Webhooks are not an MCP primitive; MCP uses a client-server architecture over stdio or SSE. The protocol defines Prompts, Resources, and Tools as its core primitives.'
    },
    references: [
      { title: 'MCP Docs — Resources', url: 'https://modelcontextprotocol.io/docs/concepts/resources' }
    ]
  },
  {
    id: 69,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'Your agent has a tool called `update_database_record` that accepts a JSON object. Sometimes, the model omits a required field in the JSON payload, causing the database update to fail. The agent immediately stops and reports a generic error to the user.',
    question: 'How should you handle this error to make the agent more resilient?',
    options: [
      { label: 'A', text: 'Throw an exception in the tool execution code to crash the agent safely.' },
      { label: 'B', text: 'Return a tool result with is_error: true and a clear text message explaining which field was missing.' },
      { label: 'C', text: 'Silently ignore the missing field and update the database with null values.' },
      { label: 'D', text: 'Use a complex regex in the prompt to validate the JSON before tool execution.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Structured Error Propagation in MCP Tools using \'is_error: true\'',
    explanation: 'When an agent uses a tool incorrectly, the best practice is to return a descriptive error message directly to the model.\n\nBy setting `is_error: true` in the tool result and explaining the mistake, the agent can recognize its error and automatically retry with a corrected payload.\n\n```python\ntool_result = {\n    "type": "tool_result",\n    "tool_use_id": tool_call.id,\n    "content": "Error: Missing required field \'status\' in JSON payload.",\n    "is_error": True\n}\n```\n\n',
    distractorAnalysis: {
      A: 'Crashing the agent disrupts the user experience; agents should gracefully recover from tool errors. Robust agents handle validation errors by giving the LLM a chance to self-correct.',
      C: 'Silently inserting nulls can corrupt data and mask the underlying issue. Failing loudly with clear feedback is better for data integrity.',
      D: 'Prompt-based regex validation is brittle; JSON Schema validation on the tool definition is the correct approach. LLMs handle structured schema validation natively via their tool use parameters.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 70,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are designing an MCP server that will be used by an agent to manage AWS infrastructure. The server will run on a local machine and communicate with the agent running in a cloud environment.',
    question: 'Which MCP transport mechanism is appropriate for this remote client-server architecture?',
    options: [
      { label: 'A', text: 'Standard Input/Output (stdio)' },
      { label: 'B', text: 'Server-Sent Events (SSE)' },
      { label: 'C', text: 'GraphQL Subscriptions' },
      { label: 'D', text: 'gRPC streams' }
    ],
    correctAnswer: 'B',
    keyConcept: 'MCP Protocol Transports: \'stdio\' for Local and \'SSE\' for Remote Servers',
    explanation: 'The Model Context Protocol supports two primary transports: stdio and Server-Sent Events (SSE).\n\nFor local, same-machine communication, stdio is used. For remote communication over a network (like a cloud agent talking to a local server), SSE over HTTP is the required transport.\n\n',
    distractorAnalysis: {
      A: 'Stdio requires the client and server to run on the same machine/process tree. Standard I/O cannot be directly routed across a network without an intermediary.',
      C: 'GraphQL is not an MCP transport protocol. MCP has its own strictly defined message protocol using JSON-RPC.',
      D: 'GRPC is not an MCP transport protocol. While gRPC is popular for remote communication, MCP standardizes on SSE for web-based remote connections.'
    },
    references: [
      { title: 'MCP Docs — Transports', url: 'https://modelcontextprotocol.io/docs/concepts/transports' }
    ]
  },
  {
    id: 71,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An agent is equipped with a `search_web` tool. The tool description is currently: "Searches the web." You observe that the agent rarely uses the tool, even when asked about current events.',
    question: 'How should you modify the tool description to improve the agent\'s tool-calling behavior?',
    options: [
      { label: 'A', text: 'Change the description to: "Use this tool immediately whenever the user asks a question."' },
      { label: 'B', text: 'Change the description to detail when to use the tool, what it does, and what kind of queries work best (e.g., "Use this tool to search for current events or recent information...").' },
      { label: 'C', text: 'Leave the description alone, but add a system prompt telling it to always use the tool.' },
      { label: 'D', text: 'Rename the tool to `always_search_web`.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Single-Responsibility Tool Design to Prevent Tool Selection Confusion',
    explanation: 'Tool descriptions are critical because they serve as the "prompt" for when and how the model should use the tool.\n\nA good tool description provides clear instructions on its purpose, appropriate use cases, and parameter constraints, which significantly improves the model\'s decision-making.\n\n',
    distractorAnalysis: {
      A: 'This is overly aggressive and may cause the agent to use the tool unnecessarily. A good description explains the tool\'s boundaries rather than dictating absolute usage.',
      C: 'While system prompts help, a detailed tool description is the primary mechanism for guiding tool usage. Descriptions are tightly coupled with the tool schema, making them more contextually relevant to the model.',
      D: 'Renaming the tool does not provide the necessary context for when and how to use it. The name is important, but a descriptive paragraph is essential for nuanced decision-making.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 72,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are building a complex data analysis agent with MCP. The agent needs to access 50 different database tables. Instead of creating 50 separate tools like `query_table_users`, `query_table_orders`, etc., you want a scalable design.',
    question: 'What is the most robust MCP architectural pattern for this scenario?',
    options: [
      { label: 'A', text: 'Create a single `execute_sql` tool that lets the model write raw SQL queries against the database.' },
      { label: 'B', text: 'Create a single `query_database` tool that takes a `table_name` enum and a structured query object.' },
      { label: 'C', text: 'Register all 50 tables as MCP Prompts.' },
      { label: 'D', text: 'Inject the schemas of all 50 tables into the system prompt and let the model guess the API.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Consolidating Multi-Table Queries into Parameterized Tools with Enums',
    explanation: 'Consolidating similar operations into a single tool with parameterized inputs (like `table_name` as an enum) is a best practice for tool design.\n\nThis keeps the context window clean by minimizing the number of distinct tools, while still providing strict boundaries and structure through JSON schema constraints.\n\n```json\n{\n  "name": "query_database",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "table_name": {\n        "type": "string",\n        "enum": ["users", "orders", "products"]\n      }\n    }\n  }\n}\n```\n\n',
    distractorAnalysis: {
      A: 'Allowing raw SQL execution poses significant security risks and relies too heavily on the model writing perfect syntax. It opens the database to SQL injection and unconstrained mutations.',
      C: 'Prompts are for templating user inputs, not for executing queries. Prompts cannot dynamically execute structured database queries.',
      D: 'Injecting 50 schemas bloats the context window and degrades performance. Context windows should be optimized by providing schema only when specifically requested or parameterized.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 73,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are architecting a Model Context Protocol (MCP) server for a financial dashboard. You need to expose historical stock prices that update daily, but the agent should only load them when specifically requested by the user.',
    question: 'Which MCP primitive is best suited for providing this passive, on-demand context?',
    options: [
      { label: 'A', text: 'Dynamic Tools' },
      { label: 'B', text: 'Resources' },
      { label: 'C', text: 'Prompts' },
      { label: 'D', text: 'Webhooks' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Exposing On-Demand Historical Data as MCP Resources with URIs',
    explanation: 'Resources are the MCP primitive designed for exposing passive, read-only context (like logs, database records, or historical prices) that the client can load on-demand via URIs. Tools are for actions, and Prompts are for templating interactions.\n\n',
    distractorAnalysis: {
      A: 'Tools imply active execution or side effects, whereas this is purely reading passive context. Loading historical data fits perfectly into the Resource paradigm.',
      C: 'Prompts are used for UI templates and structured initial messages, not for raw data retrieval. Prompts are used when initializing a conversation, not for mid-stream data fetching.',
      D: 'Webhooks are not an MCP primitive. MCP strictly defines Resources, Tools, and Prompts.'
    },
    references: [
      { title: 'MCP Docs — Resources', url: 'https://modelcontextprotocol.io/docs/concepts/resources' }
    ]
  },
  {
    id: 74,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An MCP server exposes a large collection of internal API documentation pages as Resources. The server needs to organize these documents so the client agent can discover and access them predictably.',
    question: 'How should the MCP server identify and structure these Resources?',
    options: [
      { label: 'A', text: 'Using standard HTTP endpoints with RESTful path variables.' },
      { label: 'B', text: 'Using custom URI templates (e.g., `docs://api/{service_name}`) to organize and expose them.' },
      { label: 'C', text: 'Using a flat list of JSON objects injected into the system prompt.' },
      { label: 'D', text: 'Using GraphQL queries embedded in tool descriptions.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Dynamic Resource Templates (\'uriTemplate\') for Parameterized Context',
    explanation: 'In MCP, Resources are identified using URIs, and Resource Templates allow servers to expose parameterized URIs (like `file://project/{folder}/...` or custom schemas) for clients to discover and read data dynamically.\n\n',
    distractorAnalysis: {
      A: 'MCP does not strictly mandate RESTful HTTP endpoints; it uses its own URI pattern matching through the transport layer. While the underlying transport might be HTTP (via SSE), the Resource identification happens via MCP URIs.',
      C: 'Injecting a large list into the system prompt bloats the context window. This violates the principle of on-demand context loading.',
      D: 'GraphQL is not the standard resource identification mechanism in MCP. MCP relies on its own URI-based templating system.'
    },
    references: [
      { title: 'MCP Docs — Resources', url: 'https://modelcontextprotocol.io/docs/concepts/resources' }
    ]
  },
  {
    id: 75,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are configuring an agent to manage a corporate GitHub repository. The agent needs to view the current list of open issues, but it also needs the ability to close issues when instructed.',
    question: 'Which combination of MCP primitives should you implement for this workflow?',
    options: [
      { label: 'A', text: 'Implement "view issues" as a Tool, and "close issue" as a Resource.' },
      { label: 'B', text: 'Implement both "view issues" and "close issue" as Prompts.' },
      { label: 'C', text: 'Implement "view issues" as a Resource (or Resource Template), and "close issue" as a Tool.' },
      { label: 'D', text: 'Implement both actions as Resources using standard POST requests.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'MCP Prompts Primitive for User-Facing Interactive Slash-Command Templates',
    explanation: 'Resources are ideal for read-only data like viewing lists of issues, while Tools are required for actions that mutate state or produce side effects, like closing an issue.\n\n',
    distractorAnalysis: {
      A: 'Resources are read-only and cannot be used to close an issue. A Tool is explicitly required for any state-mutating operation.',
      B: 'Prompts only template user inputs; they do not fetch real-time lists or mutate state. They are entirely the wrong abstraction for fetching or altering data.',
      D: 'Resources do not support POST requests or state mutations; they are read-only. MCP Resources use a simple "read" mechanism.'
    },
    references: [
      { title: 'MCP Docs — Architecture', url: 'https://modelcontextprotocol.io/docs/concepts/architecture' }
    ]
  },
  {
    id: 76,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'Your Claude agent uses a tool called `provision_vm` which takes a parameter for the amount of RAM in gigabytes. You notice the agent occasionally requests invalid amounts like 3 or 9, which the underlying API rejects.',
    question: 'What is the most robust way to prevent the agent from providing invalid RAM values?',
    options: [
      { label: 'A', text: 'Add a system prompt telling Claude to only use powers of 2 for RAM.' },
      { label: 'B', text: 'Update the tool\'s JSON Schema to use an `enum` restricting the RAM values to [2, 4, 8, 16, 32].' },
      { label: 'C', text: 'Throw a fatal error in the tool execution loop if the value is not a power of 2.' },
      { label: 'D', text: 'Change the parameter type to a string and use regex validation inside the agent loop.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Detailed Parameter Descriptions as Prompt Guidance in JSON Schemas',
    explanation: 'Using strict JSON Schema constraints, such as `enum`, forces the model to select from an explicit set of valid values. This is much more reliable than relying on prompt instructions and prevents invalid API calls entirely.\n\n```json\n"ram_gb": {\n  "type": "integer",\n  "enum": [2, 4, 8, 16, 32]\n}\n```\n\n',
    distractorAnalysis: {
      A: 'While prompts guide behavior, strict schema constraints are the definitive way to guarantee valid tool payloads. Prompts can be ignored or misunderstood by the model.',
      C: 'Crashing the agent is not a graceful way to handle validation; it is better to prevent the error via schema. A fatal error ruins the user experience.',
      D: 'Moving validation to a regex in the loop is less efficient than using the native JSON schema enum. Defining the constraints in the schema is self-documenting for the LLM.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 77,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are designing tools for a customer service agent. You initially created a massive `manage_customer` tool that handles updating emails, processing refunds, resetting passwords, and fetching order history all in one payload.',
    question: 'Why does this design violate the single-responsibility scoping principle for tools?',
    options: [
      { label: 'A', text: 'Because JSON Schema only supports one operation per payload.' },
      { label: 'B', text: 'Because Anthropic enforces a strict 5-tool limit per agent.' },
      { label: 'C', text: 'Because large, multi-purpose tools increase cognitive load on the model, leading to hallucinated parameters and lower success rates.' },
      { label: 'D', text: 'Because MCP servers cannot process tools with more than 3 parameters.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Schema Property Constraints (\'minimum\', \'maximum\', \'pattern\') in Tool Definitions',
    explanation: 'Tools should be well-scoped and adhere to a single responsibility. Overloading a tool with multiple distinct actions makes the JSON Schema overly complex, which increases the likelihood of the model hallucinating arguments or failing to use the tool correctly.\n\n',
    distractorAnalysis: {
      A: 'JSON schema technically supports complex payloads, but it is bad practice for agent performance. You can theoretically build nested oneOf schemas, but the model will struggle with them.',
      B: 'There is no 5-tool limit (you can have hundreds of tools). Anthropic allows a large number of tool definitions per API request.',
      D: 'There is no hard limit of 3 parameters in MCP. You can define as many parameters as needed, though smaller schemas perform better.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 78,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An enterprise agent is equipped with a tool named `fetch_logs`. The parameter description for `timestamp` currently says "The time". The agent frequently passes invalid date formats, causing errors.',
    question: 'How should you improve the tool\'s parameter description to fix this issue?',
    options: [
      { label: 'A', text: 'Rename the tool to `fetch_logs_with_iso_timestamp`.' },
      { label: 'B', text: 'Change the description to "The time. MUST be an ISO 8601 formatted string (e.g., 2024-03-15T10:00:00Z)." and set the type to string.' },
      { label: 'C', text: 'Change the parameter type to integer and expect the model to automatically use Unix epoch time.' },
      { label: 'D', text: 'Remove the parameter and require the user to format the date correctly in their prompt.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Distinct Semantic Tool Naming to Prevent Model Selection Ambiguity',
    explanation: 'Tool and parameter descriptions act as prompts for the model. Providing explicit formats, constraints, and examples directly in the JSON Schema description ensures the model generates the correct payload structure.\n\n',
    distractorAnalysis: {
      A: 'Renaming the tool is less effective than explicitly defining the expected parameter format. The parameter description is the appropriate place for formatting rules.',
      C: 'Without a clear description, the model might guess incorrectly (e.g., milliseconds vs seconds). Changing types without explicit instructions leads to more hallucinations.',
      D: 'Agents should autonomously format data using tools, not rely on users to do it. The user should be able to say "yesterday" and the agent should calculate the ISO string.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 79,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'A developer creates two tools for a serverless agent: `process_data` and `handle_data`. During testing, the agent randomly alternates between them and sometimes combines their parameters incorrectly.',
    question: 'What is the primary cause of this behavior?',
    options: [
      { label: 'A', text: 'The agent is experiencing rate limiting on the Anthropic API.' },
      { label: 'B', text: 'The tool names are too ambiguous and conceptually overlapping, confusing the model\'s tool-selection logic.' },
      { label: 'C', text: 'The tools were registered via stdio instead of SSE.' },
      { label: 'D', text: 'The temperature setting of the model is too low.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Scoping Tools to Single Operations to Avoid Multi-Action Hallucinations',
    explanation: 'Ambiguous or overlapping tool names confuse the model, making it difficult for it to determine which tool is appropriate for a specific task. Tools should have distinct, descriptive names that clearly separate their functionalities.\n\n',
    distractorAnalysis: {
      A: 'Rate limiting results in API errors, not erratic tool selection. Rate limiting impacts the network layer, not the reasoning process.',
      C: 'The transport mechanism (stdio vs SSE) does not affect the model\'s semantic understanding of tools. Transport layers are transparent to the LLM.',
      D: 'Lower temperature makes the model more deterministic, which usually reduces random alternation if one tool is clearly better. The issue here is the semantic ambiguity in the names.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 80,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An agent uses a tool to compile code. Occasionally, the compilation fails with syntax errors. The agent framework currently catches the error and sends a plain text message back to the model saying "Compilation failed." The model often gets stuck and repeats the same mistake.',
    question: 'How should you structure the error handling in the `tool_result` to improve recovery?',
    options: [
      { label: 'A', text: 'Send `is_error: true` along with the full compiler stderr output in the content block so the model can diagnose and fix the syntax error.' },
      { label: 'B', text: 'Send `is_error: false` to trick the model into thinking it succeeded, then silently fix the code.' },
      { label: 'C', text: 'Terminate the session immediately to prevent infinite loops.' },
      { label: 'D', text: 'Retry the exact same tool call automatically 5 times before informing the model.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Actionable Compiler/Error Feedback in Tool Results for Self-Correction',
    explanation: 'When a tool fails due to an actionable issue (like a syntax error), setting `is_error: true` and providing the exact error details (like compiler output) allows the model to analyze the failure, correct its logic, and retry successfully.\n\n',
    distractorAnalysis: {
      B: 'Lying to the model destroys its context alignment and prevents it from learning from the mistake. Agents rely on accurate feedback to adjust their internal state.',
      C: 'Terminating the session ruins the user experience; agents should be designed to recover from errors. Providing the error logs allows for graceful recovery.',
      D: 'Retrying the exact same bad payload will just fail 5 times. The model needs feedback to adjust the payload before retrying.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 81,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'Your agent has a tool to query an external weather API. Occasionally, the external API goes down and returns a 500 Internal Server Error. The agent receives this error but keeps retrying rapidly in a loop, consuming tokens.',
    question: 'What is the best error recovery pattern to implement in the tool result to prevent this loop?',
    options: [
      { label: 'A', text: 'Return `is_error: true` with a message instructing the model to "Stop retrying and inform the user that the weather service is currently unavailable."' },
      { label: 'B', text: 'Return a dummy weather forecast to keep the conversation moving.' },
      { label: 'C', text: 'Return an empty string in the tool result.' },
      { label: 'D', text: 'Strip the tool from the agent\'s tool list mid-conversation.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Breaking External API 500 Failure Loops with Explicit Non-Retry Guidance',
    explanation: 'Providing explicit, actionable instructions in the error message (e.g., telling the model to stop retrying and inform the user) is a highly effective way to break retry loops when dealing with unrecoverable external system failures.\n\n```python\ntool_result = {\n    "type": "tool_result",\n    "tool_use_id": tool_id,\n    "content": "API is down. Stop retrying and inform the user.",\n    "is_error": True\n}\n```\n\n',
    distractorAnalysis: {
      B: 'Returning dummy data is a hallucination and breaks trust. Users rely on the agent to provide factual information, not fabricated fallbacks.',
      C: 'An empty string provides no context, likely causing the model to retry or hallucinate. The model will assume the tool succeeded but returned nothing.',
      D: 'Mutating the tool list dynamically mid-turn is complex and usually unsupported by standard agent frameworks. Instructing the model is much simpler and more robust.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 82,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are reviewing the architecture of a multi-agent system. An agent uses a `read_file` tool. If the file does not exist, the Python script executing the tool throws a `FileNotFoundError`, which crashes the entire application.',
    question: 'What is the correct architectural pattern for handling tool execution exceptions?',
    options: [
      { label: 'A', text: 'Wrap the tool execution in a try-except block, catch the exception, and format it into a valid `tool_result` with `is_error: true`.' },
      { label: 'B', text: 'Require the model to use a `check_file_exists` tool before every `read_file` call.' },
      { label: 'C', text: 'Let the application crash, but restart it automatically with systemd.' },
      { label: 'D', text: 'Modify the system prompt to warn the model about non-existent files.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Catching Tool Runtime Exceptions and Formatting into Structured \'tool_result\'',
    explanation: 'Agent applications should never crash due to predictable tool failures. The host system must catch execution exceptions and convert them into structured `tool_result` blocks with `is_error: true` so the model can handle the failure gracefully.\n\n```python\ntry:\n    content = read_file(path)\n    return {\n        "type": "tool_result",\n        "tool_use_id": tool_call.id,\n        "content": content\n    }\nexcept FileNotFoundError as e:\n    return {\n        "type": "tool_result",\n        "tool_use_id": tool_call.id,\n        "content": f"FileNotFoundError: {str(e)}",\n        "is_error": True\n    }\n```\n\n',
    distractorAnalysis: {
      B: 'Forcing a manual check before every read is inefficient and increases latency/token usage. A robust read tool should handle the existence check inherently.',
      C: 'Crashing disrupts the user session and loses conversation context. Automated restarts do not salvage the active agent dialogue.',
      D: 'A prompt warning cannot physically prevent a file missing error from crashing unhandled code. System architecture must handle runtime exceptions.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 83,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An agent uses a tool to update records in a CRM. The CRM API has strict rate limits. When a rate limit is hit, the API returns a 429 status code with a "Retry-After: 30" header.',
    question: 'How should the tool execution layer communicate this to the Claude model?',
    options: [
      { label: 'A', text: 'Pause the execution thread for 30 seconds before returning the success response.' },
      { label: 'B', text: 'Return `is_error: true` with a message containing the "Retry-After" duration, so the model understands the delay.' },
      { label: 'C', text: 'Send a new system prompt to the model immediately.' },
      { label: 'D', text: 'Ignore the 429 error and keep sending requests until one succeeds.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Returning Specific Exception Details in Tool Results to Aid Recovery',
    explanation: 'When external systems impose constraints like rate limits, passing that operational context back to the model via an error message allows the model to understand why the action failed and inform the user of the expected delay or strategy.\n\n',
    distractorAnalysis: {
      A: 'Blocking the thread for 30 seconds keeps the user waiting with no feedback, leading to a poor experience. The model should be informed so it can update the user.',
      C: 'System prompts are generally static; dynamic updates during a tool cycle are less effective than structured tool results. The tool result specifically ties the error to the action.',
      D: 'Ignoring 429s violates API terms of service and usually results in a permanent ban. Rate limits must be respected architecturally.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 84,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'You are deploying an MCP server that executes shell commands. The server will run on a secure user machine, and the agent client is hosted in a public cloud. You want to ensure that unauthorized third parties cannot intercept or spoof the communication.',
    question: 'When using the SSE transport for remote MCP communication, how is security primarily managed?',
    options: [
      { label: 'A', text: 'The SSE transport inherently encrypts all traffic using custom MCP cryptography.' },
      { label: 'B', text: 'Security relies on the underlying HTTP infrastructure, typically requiring TLS (HTTPS) and standard authentication headers (like Bearer tokens).' },
      { label: 'C', text: 'Security is handled by the stdio fallback mechanism.' },
      { label: 'D', text: 'The agent model automatically sanitizes malicious payloads before sending them.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'MCP Security Sandboxing and Path Sanitization for Local Filesystems',
    explanation: 'MCP transports (like SSE over HTTP) do not reinvent security. For remote connections, they rely on standard web security practices: running over TLS (HTTPS) to prevent interception, and using HTTP headers for authentication and authorization.\n\n',
    distractorAnalysis: {
      A: 'MCP does not implement custom cryptography; it leverages standard transport security (TLS). Standard web protocols are preferred to custom encryption.',
      C: 'Stdio is for local communication, not a fallback for securing remote SSE connections. Stdio relies on operating system process permissions, not network security.',
      D: 'Models can be tricked (prompt injection); security must be enforced at the transport and execution layers. Relying purely on the LLM for security is fundamentally unsafe.'
    },
    references: [
      { title: 'MCP Docs — Transports', url: 'https://modelcontextprotocol.io/docs/concepts/transports' }
    ]
  },
  {
    id: 85,
    domain: 4,
    domainName: 'Tool Design & MCP Integration',
    scenario: 'An agent has a tool called `delete_database_table`. Since this is a highly destructive action, the engineering team wants to implement a safeguard to prevent accidental data loss caused by hallucinations.',
    question: 'What is the recommended architectural pattern to secure this destructive tool?',
    options: [
      { label: 'A', text: 'Implement a "human-in-the-loop" confirmation gate in the application layer that pauses execution until an administrator approves the payload.' },
      { label: 'B', text: 'Add a field to the JSON schema called `are_you_sure` and require the model to set it to true.' },
      { label: 'C', text: 'Tell the model in the system prompt to double-check its work before deleting anything.' },
      { label: 'D', text: 'Use stdio transport instead of SSE to guarantee safety.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Authentication and TLS Transport Security for Remote MCP SSE Servers',
    explanation: 'For destructive or high-risk actions, the most robust security pattern is a human-in-the-loop (HITL) confirmation gate. The application layer pauses the tool execution, presents the payload to a human user, and only proceeds upon explicit approval.\n\n',
    distractorAnalysis: {
      B: 'Models can easily hallucinate `are_you_sure: true`, bypassing the "safeguard". Semantic flags inside schemas offer zero hard security guarantees.',
      C: 'Prompt engineering is never a substitute for hard security controls. The model can still be subjected to prompt injection or catastrophic forgetting.',
      D: 'The transport protocol (stdio) secures data in transit, but does not prevent the model from issuing a valid but destructive command. The risk is the payload itself, not the network.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  }
];
