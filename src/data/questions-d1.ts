import type { Question } from '../types';

export const questionsD1: Question[] = [
  {
    id: 1,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A healthcare startup is building an AI assistant to schedule patient appointments. After extracting the patient\'s preferred date, the model returns a response with a stop_reason of 'tool_use'.",
    question: 'What should you do next in your agentic loop?',
    options: [
      { label: 'A', text: 'End the conversation because the model has finished processing.' },
      { label: 'B', text: 'Extract the tool use request, execute the tool locally, and append a tool_result block to the message history.' },
      { label: 'C', text: 'Prompt the user to manually execute the tool and provide the results.' },
      { label: 'D', text: 'Restart the conversation with a system prompt instructing the model not to use tools.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Client-Side Tool Execution and \'tool_use\' Stop Reason Handling',
    explanation: 'When Claude returns a stop_reason of \'tool_use\', generation has paused and the model is waiting for client-side execution. The application must execute the requested tool locally and return the output inside a `tool_result` content block before Claude can complete its response.\n\n```python\nif response.stop_reason == "tool_use":\n    tool_block = next(b for b in response.content if b.type == "tool_use")\n    result = execute_tool(tool_block.name, tool_block.input)\n    # append tool_result and re-invoke\n```\n\n',
    distractorAnalysis: {
      A: 'Terminating here abandons the loop midway. The model is waiting for data to complete the patient\'s booking.',
      C: 'Tool execution is handled autonomously by the client orchestration layer, not manually by the end user.',
      D: 'Disabling tools strips the model of the ability to interact with the scheduling database.'
    },
    references: [
      { title: 'Agentic Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use' }
    ]
  },
  {
    id: 2,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A fintech platform uses Claude to process loan applications. When the model invokes the 'check_credit' tool, it provides a tool_use_id of 'toolu_123'. The application successfully retrieves the credit score.",
    question: 'How must the application format the result when sending it back to Claude?',
    options: [
      { label: 'A', text: "As a user message containing the text 'The credit score is 750'." },
      { label: 'B', text: "As a tool_result block with the tool_use_id 'toolu_123'." },
      { label: 'C', text: 'As a tool_result block without any ID, relying on the sequential order of messages.' },
      { label: 'D', text: 'As an assistant message confirming the tool was executed.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Mandatory \'tool_use_id\' Matching in Tool Result Blocks',
    explanation: 'The Anthropic Messages API strictly requires that every `tool_result` block includes the matching `tool_use_id` from the triggering `tool_use` block. Returning unformatted text or omitting this ID results in an immediate 400 validation error.\n\n```json\n{\n  "role": "user",\n  "content": [\n    {\n      "type": "tool_result",\n      "tool_use_id": "toolu_123",\n      "content": "750"\n    }\n  ]\n}\n```\n\n',
    distractorAnalysis: {
      A: 'Raw strings in a user turn violate the required block structure for returning tool results.',
      C: 'The API does not correlate tool outputs by sequential message order; the `tool_use_id` parameter is mandatory.',
      D: 'Tool results represent incoming environment data and must be returned under the `user` role, not generated under the `assistant` role.'
    },
    references: [
      { title: 'Tool Use Handling', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 3,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "An e-commerce retailer has an agent that searches inventory. Occasionally, the agent enters an infinite loop, repeatedly calling the 'search_products' tool with slightly different queries and exhausting the API budget.",
    question: 'Which approach minimizes the risk of this infinite loop?',
    options: [
      { label: 'A', text: 'Implement a hard cap on the maximum number of iterations in the agentic loop.' },
      { label: 'B', text: "Add a system prompt instruction: 'Do not search more than 3 times.'" },
      { label: 'C', text: "Disable the tool and rely entirely on the model\'s internal knowledge." },
      { label: 'D', text: 'Use a smaller, cheaper model to save costs during the loop.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Hard Iteration Caps as Circuit Breakers in Agentic Loops',
    explanation: 'Agentic loops require systemic controls. A common mistake is relying purely on prompt instructions to control flow. While prompting helps, a hard iteration cap in the code acts as a reliable circuit breaker to prevent runaway loops and uncontrolled costs.\n\n```python\nMAX_ITERATIONS = 5\nfor step in range(MAX_ITERATIONS):\n    # run agent loop\n```\n\n',
    distractorAnalysis: {
      B: 'Models may occasionally ignore prompt constraints, failing to provide a hard guarantee. Prompting is a soft control, not a system guardrail.',
      C: 'It breaks the required functionality of searching live inventory. The agent becomes useless without its tools.',
      D: 'It just slows the burn rate rather than fixing the infinite loop. It treats the symptom, not the architectural flaw.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 4,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A legal firm built a contract review agent. During a long document analysis, the application receives a response with a stop_reason of 'max_tokens'.",
    question: 'What is the most likely cause of this behavior?',
    options: [
      { label: 'A', text: 'The model successfully completed the tool execution.' },
      { label: 'B', text: "The model decided the user\'s prompt violated safety guidelines." },
      { label: 'C', text: 'The generated response reached the max_tokens limit specified in the API request.' },
      { label: 'D', text: 'The system encountered an internal server error.' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Differentiating \'max_tokens\' Truncation from Safety Filters',
    explanation: 'Confusing stop reasons. A stop_reason of \'max_tokens\' explicitly means the generation was truncated because it hit the max_tokens parameter limit set in the API call, not that it finished naturally or hit a safety filter.\n\n```python\n# If generation hits this limit, stop_reason is "max_tokens"\nresponse = client.messages.create(\n    max_tokens=1000,\n    ...\n)\n```\n\n',
    distractorAnalysis: {
      A: "Completing a tool execution yields 'tool_use', not 'max_tokens'. 'end_turn' is used when naturally finished.",
      B: 'Safety issues usually return an error or a different stop reason, such as \'content_filter\'.',
      D: 'Server errors return 5xx HTTP codes, not a max_tokens stop reason. Max tokens is a controlled truncation.'
    },
    references: [
      { title: 'Agentic Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use' }
    ]
  },
  {
    id: 5,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A logistics company has an agentic loop that alternates between user queries and Claude\'s tool calls. A developer mistakenly appends two 'user' messages in a row without an intervening 'assistant' message.",
    question: 'What will be the result of this API call?',
    options: [
      { label: 'A', text: 'The API will automatically merge the two user messages into a single turn.' },
      { label: 'B', text: 'The API will reject the request with a 400 Bad Request error due to an invalid message sequence.' },
      { label: 'C', text: 'Claude will ignore the first user message and only process the second.' },
      { label: 'D', text: 'Claude will generate a response, but it may hallucinate.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Strict Message Role Alternation in Anthropic Messages API',
    explanation: 'The Anthropic Messages API strictly requires alternating conversational turns between "user" and "assistant". If your request payload contains two consecutive messages with the same role, the API rejects the call with an HTTP 400 invalid_request_error ("messages: roles must alternate between \'user\' and \'assistant\'").\\n\\n```python\\n# This payload will be rejected by the API with a 400 error:\\nmessages = [\\n    {\"role\": \"user\", \"content\": \"Track shipment #1234\"},\\n    {\"role\": \"user\", \"content\": \"Also check warehouse stock\"}\\n]\\n\\n# To fix it, merge multiple items into a single user content list:\\nmessages = [\\n    {\\n        \"role\": \"user\",\\n        \"content\": [\\n            {\"type\": \"text\", \"text\": \"Track shipment #1234\"},\\n            {\"type\": \"text\", \"text\": \"Also check warehouse stock\"}\\n        ]\\n    }\\n]\\n```\\n\\nClient applications must combine consecutive inputs into a single user message block before sending them to the API.',
    distractorAnalysis: {
      A: 'The native Anthropic Messages API does not auto-merge consecutive same-role messages. It enforces strict alternation and throws a 400 validation error.',
      C: 'The API will not silently drop or ignore messages; it fails immediately at request validation before any processing occurs.',
      D: 'The request never reaches the model to generate a response or hallucinate; it is blocked at the API gateway layer.'
    },
    references: [
      { title: 'Messages API Specification', url: 'https://docs.anthropic.com/en/docs/build-with-claude/messages-api' }
    ]
  },
  {
    id: 6,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An insurance underwriter system receives raw claim documents. It first extracts text, then identifies key entities, and finally evaluates the claim validity, passing the output of each step to the next.',
    question: 'Which workflow pattern best fits this architecture?',
    options: [
      { label: 'A', text: 'Routing' },
      { label: 'B', text: 'Parallelization' },
      { label: 'C', text: 'Prompt Chaining' },
      { label: 'D', text: 'Evaluator-Optimizer' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Prompt Chaining Pattern for Sequential Subtasks with Intermediate Gates',
    explanation: 'Recognizing sequential dependencies. A common mistake is calling any multi-step process an orchestrator. Prompt Chaining is specifically for tasks broken into sequential subtasks where one LLM call\'s output becomes the input for the next.\n\n```python\ntext = llm(extract_prompt)\nentities = llm(identify_prompt + text)\nresult = llm(evaluate_prompt + entities)\n```\n\n',
    distractorAnalysis: {
      A: 'Routing involves classifying and dispatching to one specific path, not sequential steps where all are executed.',
      B: 'Parallelization runs tasks simultaneously. Here, each step depends on the previous step\'s output.',
      D: 'Evaluator-Optimizer involves an iterative feedback loop, not just a straight linear sequence.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 7,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A SaaS platform's customer support bot receives diverse queries. It must determine if the query is billing, technical, or sales-related, and send it to a specialized prompt for that category.",
    question: 'Which approach minimizes latency and complexity for this requirement?',
    options: [
      { label: 'A', text: 'Orchestrator-Workers pattern' },
      { label: 'B', text: 'Routing pattern' },
      { label: 'C', text: 'Evaluator-Optimizer pattern' },
      { label: 'D', text: 'Autonomous Agent pattern' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Routing Workflow Pattern for Low-Latency Input Classification',
    explanation: 'Routing is the ideal pattern when an input needs to be classified and directed to a specialized downstream task. It avoids the overhead of a dynamic Orchestrator-Worker setup.\n\n```python\ncategory = llm(router_prompt + user_input)\nif category == "billing":\n    return llm(billing_prompt)\n```\n\n',
    distractorAnalysis: {
      A: 'Orchestrator-Workers is for dynamic task decomposition. For simple classification, it introduces unnecessary latency.',
      C: 'There is no feedback loop or critique phase required for routing.',
      D: 'An open-ended autonomous agent lacks the strict predictability needed for simple triage. It wastes tokens trying to plan.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 8,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A content moderation system needs to assess user-generated posts for policy violations. To ensure high accuracy and avoid false positives, the system asks three distinct Claude instances to review the post simultaneously and aggregates their results.',
    question: 'Which pattern best describes this architecture?',
    options: [
      { label: 'A', text: 'Parallelization (Voting)' },
      { label: 'B', text: 'Prompt Chaining' },
      { label: 'C', text: 'Routing' },
      { label: 'D', text: 'Evaluator-Optimizer' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Parallelization Pattern for Concurrent Verification and Voting',
    explanation: 'The concurrent execution for consensus. The Parallelization pattern (specifically fan-out/voting) is used when multiple identical or similar tasks run concurrently to improve reliability through majority voting or aggregation.\n\n```python\nresults = await asyncio.gather(\n    llm(prompt),\n    llm(prompt),\n    llm(prompt)\n)\nfinal_decision = aggregate(results)\n```\n\n',
    distractorAnalysis: {
      B: 'Chaining implies sequential execution. These tasks run simultaneously, not one after the other.',
      C: 'Routing sends the task down only one distinct path. Here, all paths are executed.',
      D: 'Evaluator-Optimizer is an iterative loop. There is no iterative critique happening here, just a single pass.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 9,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A software development firm wants Claude to write complex, production-ready code. The initial output often has edge-case bugs. They implement a system where a second Claude instance reviews the code, finds bugs, and asks the first instance to fix them.',
    question: 'Which workflow pattern best fits this iterative improvement process?',
    options: [
      { label: 'A', text: 'Routing' },
      { label: 'B', text: 'Parallelization' },
      { label: 'C', text: 'Evaluator-Optimizer' },
      { label: 'D', text: 'Prompt Chaining' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Evaluator-Optimizer Feedback Loop for Iterative Artifact Refinement',
    explanation: 'A common mistake is confusing sequential chaining with iterative refinement. The Evaluator-Optimizer pattern is specifically designed for generate-then-critique loops where one model generates output and another evaluates and refines it iteratively.\n\n```python\ncode = llm_generator(prompt)\nwhile not passes_criteria:\n    critique = llm_evaluator(code)\n    code = llm_generator(prompt + critique)\n```\n\n',
    distractorAnalysis: {
      A: 'Routing is for dispatching tasks. It does not handle iterative feedback loops.',
      B: 'Parallelization is concurrent. This process requires sequential refinement.',
      D: 'Prompt Chaining is a fixed sequence. The Evaluator-Optimizer pattern loops dynamically until a criteria is met.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 10,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A real estate analytics firm wants an AI that can take a broad request like 'Analyze the Seattle housing market', figure out the necessary subtasks (fetch prices, fetch crime rates, analyze trends), and assign them to specialized sub-agents dynamically.",
    question: 'Which architecture pattern best addresses this requirement?',
    options: [
      { label: 'A', text: 'Orchestrator-Workers' },
      { label: 'B', text: 'Prompt Chaining' },
      { label: 'C', text: 'Routing' },
      { label: 'D', text: 'Evaluator-Optimizer' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Orchestrator-Workers Architecture for Dynamic Task Decomposition',
    explanation: 'When a broad, ambiguous objective requires dynamic task decomposition, the Orchestrator-Workers pattern is the standard architecture. An orchestrator LLM analyzes the goal, determines sub-tasks at runtime, and delegates them to specialized workers, aggregating their outputs into a unified answer.',
    distractorAnalysis: {
      B: 'Prompt chaining follows fixed sequential steps and cannot dynamically invent or parallelize sub-tasks at runtime.',
      C: 'Routing classifies an input to a single predefined handler rather than decomposing a problem across multiple workers.',
      D: 'Evaluator-Optimizer focuses on iterative critique and refinement of a single artifact, not task decomposition and delegation.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 11,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A fast-food chain is deploying a drive-thru ordering assistant. The process has strictly defined steps: greet, take order, upsell, and confirm payment. They want minimal hallucinations.',
    question: 'How should you modify your architecture to best support this?',
    options: [
      { label: 'A', text: 'Use an autonomous agentic loop with a single prompt instructing it to follow all steps.' },
      { label: 'B', text: 'Implement a deterministic state machine where the LLM is only used to extract entities at each fixed state.' },
      { label: 'C', text: 'Use the Orchestrator-Worker pattern to dynamically decide the flow.' },
      { label: 'D', text: 'Implement a fully autonomous swarm to handle the order flexibly.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Deterministic State Machines vs Autonomous Agentic Loops',
    explanation: 'Highly predictable, structured processes shouldn\'t rely on open-ended LLM routing. A common mistake is using autonomous agents for rigid tasks. Deterministic state machines provide reliability and control, using the LLM only for specific extraction tasks.\n\n```python\nif state == "GREETING":\n    entities = llm_extract(user_input)\n    if entities.wants_to_order:\n        state = "TAKE_ORDER"\n```\n\n',
    distractorAnalysis: {
      A: 'An open-ended loop risks drifting off-script. Hallucinations are much higher when a single prompt dictates a complex sequence.',
      C: 'Orchestrator-Workers is for unpredictable, complex tasks. Drive-thrus are highly predictable.',
      D: 'A swarm introduces unnecessary latency, cost, and unpredictability.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 12,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A cybersecurity firm uses an autonomous agent to investigate network anomalies. The agent iteratively queries logs, analyzes results, and queries more logs. Sometimes it gets stuck pursuing a dead end.',
    question: 'Which approach minimizes the risk of the agent running indefinitely?',
    options: [
      { label: 'A', text: 'Implement a recursion depth cap or max iterations limit in the execution loop.' },
      { label: 'B', text: 'Tell the model in the system prompt to stop if it feels it is taking too long.' },
      { label: 'C', text: 'Switch to a Prompt Chaining workflow.' },
      { label: 'D', text: "Remove the agent\'s ability to call the log-querying tool." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Architectural Recursion and Step Limits in Open-Ended Agent Loops',
    explanation: 'Relying on the model to self-regulate is a frequent trap. For open-ended autonomous loops, you must implement hard architectural controls like a recursion depth cap (circuit breaker) to prevent infinite loops and runaway costs.\n',
    distractorAnalysis: {
      B: 'Models can fail to adhere to self-regulation prompts. Prompting is never a substitute for structural guardrails.',
      C: 'Investigating anomalies requires dynamic querying, which a static chain cannot do. Flexibility is required.',
      D: 'Removing the tool cripples the agent\'s core function. It must query logs to succeed.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 13,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A travel agency agent plans custom vacations. The agent often generates long itineraries, but the developers notice the context window fills up quickly, leading to API rejections.',
    question: 'Which strategy best addresses this issue within an autonomous loop?',
    options: [
      { label: 'A', text: 'Implement token budget monitoring and context summarization to prune older messages.' },
      { label: 'B', text: 'Use a deterministic state machine instead of an agent.' },
      { label: 'C', text: 'Increase the max_tokens parameter in the API call.' },
      { label: 'D', text: 'Send only the very first and very last message to the API.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Context Window Token Budgeting and History Compaction',
    explanation: 'Autonomous loops accumulate context rapidly. A common mistake is just increasing max_tokens (which limits output, not input). Implementing token monitoring and pruning or summarizing old context keeps the loop within the context window limits.\n\n```python\nif estimate_tokens(messages) > LIMIT:\n    messages = summarize_history(messages)\n```\n\n',
    distractorAnalysis: {
      B: 'Planning a custom vacation requires flexibility that state machines lack. It is too dynamic.',
      C: 'Max_tokens only affects the output generation length. It does not fix input context overflow.',
      D: 'The model will lose crucial intermediate context needed to plan. Selective dropping ruins the reasoning trace.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 14,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A tech consultancy is deciding between a deterministic workflow and an autonomous agent for a new invoice processing system. The process always follows the exact same three steps: OCR, validate totals, and insert into SQL.',
    question: 'What is the most compelling reason to choose a deterministic workflow over an agentic loop?',
    options: [
      { label: 'A', text: 'Agents cannot execute SQL queries under any circumstances.' },
      { label: 'B', text: 'Deterministic workflows offer greater predictability and lower latency for rigid tasks.' },
      { label: 'C', text: 'Agents require the Evaluator-Optimizer pattern to function properly.' },
      { label: 'D', text: 'Deterministic workflows use significantly more API tokens.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Deterministic Pipelines vs Autonomous Swarms for Rigid Workflows',
    explanation: 'A common architectural mistake is assuming AI agents are always better than deterministic pipelines. For rigid, unchanging processes, deterministic workflows (state machines/pipelines) are superior because they eliminate the latency of LLM routing and guarantee predictable execution paths.\n',
    distractorAnalysis: {
      A: 'Agents can certainly be provided tools to execute SQL. Tools are totally customizable.',
      C: 'Agents do not strictly require Evaluator-Optimizer. They can just loop dynamically.',
      D: 'Deterministic workflows typically use fewer tokens by avoiding orchestrator overhead.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 15,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An educational platform uses an autonomous loop to tutor students in math. To prevent excessive cloud costs from long sessions, the engineering team wants to implement a cost circuit breaker.',
    question: 'Which mechanism is most appropriate to implement this?',
    options: [
      { label: 'A', text: 'Track cumulative token usage in the orchestration layer and force-terminate the loop when a threshold is met.' },
      { label: 'B', text: "Rely entirely on Anthropic\'s native billing limits in the console." },
      { label: 'C', text: 'Add a system prompt telling Claude to calculate the cost and stop when it reaches $1.' },
      { label: 'D', text: 'Limit the student to asking only one question per day.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Programmatic Cost and Token Circuit Breakers in Orchestrator Loops',
    explanation: 'Cost controls in agentic loops must be enforced programmatically by the orchestrator. Tracking cumulative tokens across the loop and terminating when a threshold is crossed ensures strict, granular budget control at the session level.\n',
    distractorAnalysis: {
      B: 'Console billing limits apply to the whole workspace/org, not individual sessions. It would shut down the whole platform.',
      C: 'LLMs cannot reliably calculate real-time API costs internally. They lack real-time counters.',
      D: 'It severely degrades the user experience unnecessarily. Budgeting tokens is far more precise.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 16,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A media company is building a multi-agent system to write articles. A 'Researcher' agent gathers facts, and a 'Writer' agent drafts the copy. The Writer is currently receiving the entire raw web-scraping history of the Researcher, causing context overload.",
    question: 'Which approach minimizes context overload for the Writer agent?',
    options: [
      { label: 'A', text: 'Implement shared memory where both agents read the exact same message array.' },
      { label: 'B', text: 'Implement context isolation by having the Researcher output a concise summary to pass to the Writer.' },
      { label: 'C', text: 'Switch to a single monolithic agent that does both tasks simultaneously.' },
      { label: 'D', text: 'Use the Routing pattern to bypass the Researcher entirely.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Context Isolation and Sanitized Handover in Multi-Agent Systems',
    explanation: 'A common misconception is thinking agents must share all raw history. In multi-agent coordination, context isolation is crucial. Passing a synthesized summary rather than raw scratchpad data prevents context bloat and keeps the downstream agent focused.\n\n```python\nsummary = researcher_agent.run(query)\nfinal_draft = writer_agent.run(f"Write an article based on: {summary}")\n```\n\n',
    distractorAnalysis: {
      A: 'Shared memory exacerbates the context overload problem. The Writer would still read all the scraping logs.',
      C: 'A single agent might struggle with the combined complexity and context length. Specialization is usually better.',
      D: 'Bypassing the Researcher defeats the purpose of the architecture. The article would have no facts.'
    },
    references: [
      { title: 'Agents Overview', url: 'https://docs.anthropic.com/en/docs/agents' }
    ]
  },
  {
    id: 17,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A financial institution has a 'Coordinator' agent that delegates tasks to 'Tax' and 'Investment' subagents. The Coordinator needs to know when a subagent has finished its task so it can resume control.",
    question: 'How should you structure the handoff protocol?',
    options: [
      { label: 'A', text: "Have the subagent call a 'yield_control' tool or return a final string to signal completion to the Coordinator." },
      { label: 'B', text: 'Set a fixed time limit; if the subagent takes longer than 5 seconds, the Coordinator takes over.' },
      { label: 'C', text: 'Have the subagents communicate directly with the user and bypass the Coordinator.' },
      { label: 'D', text: 'Merge the system prompts of all agents into one massive prompt.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Explicit Handoff Protocols and Completion Signals between Subagents',
    explanation: 'Multi-agent handoffs require explicit signaling. A common mistake is relying on heuristics. Having the subagent emit a specific completion token, return a final string, or use a handoff tool ensures predictable orchestration.\n',
    distractorAnalysis: {
      B: 'Time limits cause race conditions and abrupt task failure. Tasks take variable time.',
      C: 'Bypassing the Coordinator ruins the orchestration structure. The user experience becomes disjointed.',
      D: 'Merging prompts destroys agent specialization and increases confusion. It negates the multi-agent design.'
    },
    references: [
      { title: 'Agents Overview', url: 'https://docs.anthropic.com/en/docs/agents' }
    ]
  },
  {
    id: 18,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An enterprise resource planning (ERP) system uses an Orchestrator agent to assign data-entry tasks to worker agents. The Orchestrator is failing because it tries to execute the data-entry tools itself instead of delegating.',
    question: 'What is the most likely cause of this behavior?',
    options: [
      { label: 'A', text: "The Orchestrator\'s system prompt lacks clear instructions about its role as a delegator." },
      { label: 'B', text: "The Orchestrator was given direct access to the worker agents' tools in its API call." },
      { label: 'C', text: 'Both A and B are likely contributing to the issue.' },
      { label: 'D', text: 'The worker agents are offline.' },
    ],
    correctAnswer: 'C',
    keyConcept: 'Granular Tool Scoping and Role-Prompt Isolation in Multi-Agent Design',
    explanation: 'Ignoring tool scoping. In an Orchestrator-Worker pattern, the Orchestrator should only have tools for delegating to workers (e.g., `call_worker`), not the workers\' specific tools. Giving it direct access to the tools, combined with poor prompting, causes it to do the work itself.\n',
    distractorAnalysis: {
      A: 'A is partially correct, but B is also a major architectural flaw. Prompting alone often isn\'t enough.',
      B: 'B is partially correct, but A also contributes. Removing tools is good, but roles must also be defined.',
      D: 'Agents don\'t go \'offline\' like traditional servers; they are just API calls. They don\'t have downtime.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 19,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A healthcare routing agent takes patient symptoms and must securely pass the session to a 'Medical' subagent. They must share some context, but the Medical agent shouldn't see the patient's billing data.",
    question: 'Which approach best addresses the multi-agent context sharing requirement?',
    options: [
      { label: 'A', text: 'Pass the entire raw conversation history from the Routing agent to the Medical agent.' },
      { label: 'B', text: "Have the Routing agent generate a sanitized summary of symptoms to initialize the Medical agent\'s context." },
      { label: 'C', text: 'Disable context sharing entirely; the Medical agent must ask the patient for their symptoms again.' },
      { label: 'D', text: 'Use the Parallelization pattern to run both agents at the same time.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Data Filtering and Sanitized State Boundaries across Subagents',
    explanation: 'State management across agent boundaries requires intentional data filtering. A common mistake is passing the full raw history, which leaks sensitive data or wastes tokens. A synthesized, sanitized state transfer is best for secure, efficient handoffs.\n',
    distractorAnalysis: {
      A: 'It violates the requirement to hide billing data. The raw history will include all the user\'s inputs.',
      C: 'Forcing the user to repeat themselves creates a terrible user experience. The handover should be seamless.',
      D: 'Parallelization does not solve the sequential routing and data privacy requirements.'
    },
    references: [
      { title: 'Agents Overview', url: 'https://docs.anthropic.com/en/docs/agents' }
    ]
  },
  {
    id: 20,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A customer service system uses a Supervisor agent to monitor a Chat agent. If the Chat agent becomes argumentative, the Supervisor intercepts the message and forces a polite rewrite.',
    question: 'Which pattern best describes this architecture?',
    options: [
      { label: 'A', text: 'Routing' },
      { label: 'B', text: 'Evaluator-Optimizer' },
      { label: 'C', text: 'Parallelization' },
      { label: 'D', text: 'Prompt Chaining' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Identifying Evaluator-Optimizer Workflows with Supervisor Critique',
    explanation: 'Because one agent generates an output and another evaluates it to enforce corrections/optimizations, this is a classic Evaluator-Optimizer pattern.\n',
    distractorAnalysis: {
      A: 'It\'s not simply classifying and dispatching an initial request. It involves reviewing generated output.',
      C: 'This is a sequential check, not concurrent tasks. The evaluation must happen after generation.',
      D: 'Evaluator-Optimizer specifically entails critique and refinement, not just generic chaining.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 21,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: "A logistics developer is using an Agent SDK to manage tools. They need to validate the latitude and longitude arguments generated by Claude BEFORE the 'schedule_delivery' tool executes.",
    question: 'Where should you place this validation logic?',
    options: [
      { label: 'A', text: 'In the after_tool_call hook.' },
      { label: 'B', text: 'In the before_tool_call hook or pre-execution interceptor.' },
      { label: 'C', text: 'Inside the system prompt.' },
      { label: 'D', text: 'In the telemetry observability hook.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Pre-Execution Hooks (\'before_tool_call\') for Input Validation Guardrails',
    explanation: 'Tool execution lifecycle hooks enable programmatic validation before state changes occur. A pre-execution interceptor (`before_tool_call`) allows application code to validate coordinates, sanitize parameters, or reject out-of-bounds inputs before calling external APIs.\n\n```python\n@tool_hook("before_tool_call")\ndef validate_lat_long(tool_name, args):\n    if args["lat"] < -90 or args["lat"] > 90:\n        raise ValueError("Invalid latitude")\n```\n\n',
    distractorAnalysis: {
      A: 'The `after_tool_call` hook fires after dispatch, which is too late to prevent an invalid delivery dispatch.',
      C: 'System prompts are probabilistic instructions, not deterministic input validation guardrails.',
      D: 'Telemetry hooks are for recording logs and metrics, not for mutating or blocking tool execution.'
    },
    references: [
      { title: 'Agentic Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use' }
    ]
  },
  {
    id: 22,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An analytics dashboard uses an agent to query a database. The database occasionally returns huge JSON blobs that exceed the context window, causing the next API call to fail.',
    question: 'How should you modify the architecture using SDK hooks to prevent this?',
    options: [
      { label: 'A', text: 'Use an after_tool_call hook to truncate or summarize the database output before returning it to Claude.' },
      { label: 'B', text: 'Use a before_tool_call hook to increase the context window size.' },
      { label: 'C', text: 'Implement a Routing pattern to bypass the database entirely.' },
      { label: 'D', text: 'Use a prompt instructing Claude not to read large JSON files.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Post-Execution Hooks (\'after_tool_call\') for Truncating Bulky Tool Outputs',
    explanation: 'Never assume you must pass raw, unformatted tool outputs back to the LLM. An after_tool_call hook allows the application to inspect the result, and if it\'s too large, summarize or truncate it so it fits safely within the context window before constructing the tool_result block.\n\n```python\n@tool_hook("after_tool_call")\ndef truncate_large_output(result):\n    if len(result) > MAX_CHARS:\n        return result[:MAX_CHARS] + "...[TRUNCATED]"\n    return result\n```\n\n',
    distractorAnalysis: {
      B: 'You cannot dynamically change the context window limit of the model. It is a fixed hardware/API constraint.',
      C: 'You need the database for analytics. Bypassing it makes the agent useless.',
      D: 'Claude cannot control the size of the database\'s return blob. The bloat happens after Claude asks for data.'
    },
    references: [
      { title: 'Tool Use Handling', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks' }
    ]
  },
  {
    id: 23,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A cloud management platform uses an agent SDK. The team wants to trace the latency of every LLM API call and track which tools are invoked most frequently for auditing purposes.',
    question: 'Which mechanism is most appropriate to implement this observability?',
    options: [
      { label: 'A', text: 'Evaluator-Optimizer pattern' },
      { label: 'B', text: 'Telemetry and observability hooks provided by the orchestrator.' },
      { label: 'C', text: "Adding a 'log_latency' tool for Claude to call after every step." },
      { label: 'D', text: 'Parsing the text of the user messages.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Decoupling Observability and Telemetry Hooks from Agent Reasoning',
    explanation: 'Separating operational telemetry from agent reasoning is an essential design principle. Telemetry and observability hooks provided by the orchestrator run transparently, capturing metrics like latency and tool invocation counts without polluting the prompt context or altering the agent\'s core logic.',
    distractorAnalysis: {
      A: 'Evaluator-Optimizer is a reasoning pattern for iterative critique and refinement, not a telemetry system.',
      C: 'Requiring the LLM to call a logging tool wastes tokens and introduces inaccurate self-reported timestamps.',
      D: 'Latency data is not present in user messages; it must be recorded at the network and execution layer.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 24,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An e-commerce agent occasionally encounters an API timeout when calling a third-party shipping API. The agent crashes immediately.',
    question: 'Which approach minimizes downtime and makes the agent more resilient?',
    options: [
      { label: 'A', text: 'Implement error interceptors in the tool execution layer to return a graceful error message as a tool_result.' },
      { label: 'B', text: 'Tell Claude to wait 5 minutes if the API times out.' },
      { label: 'C', text: 'Use a complex swarm architecture to query multiple shipping APIs at once.' },
      { label: 'D', text: "Change the stop_reason to 'end_turn'." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Resilient Tool Error Handling via \'tool_result\' with \'is_error: true\'',
    explanation: 'Unhandled exceptions inside tool implementations crash the agent loop. By catching exceptions at the execution layer and wrapping them in a structured `tool_result` with `is_error: true`, Claude receives the failure reason and can choose to retry, request human help, or fail gracefully.\n\n```python\ntry:\n    result = call_shipping_api()\nexcept TimeoutError:\n    result = "Error: Shipping API timed out. Please retry or verify the address."\n# append as tool_result with is_error=True\n```\n\n',
    distractorAnalysis: {
      B: 'Claude cannot run background timers or sleep threads natively within an API turn.',
      C: 'Spinning up a multi-agent swarm adds unnecessary architectural overhead for a standard timeout failure.',
      D: 'The `stop_reason` field is returned by the Anthropic API gateway and is read-only for clients.'
    },
    references: [
      { title: 'Agentic Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use' }
    ]
  },
  {
    id: 25,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A server management agent is authorized to reboot web servers. However, to prevent accidental downtime, the engineering team requires a human administrator to approve the action before the reboot command runs.',
    question: 'What is the most secure way to implement this Human-in-the-loop requirement?',
    options: [
      { label: 'A', text: 'Add a system prompt telling Claude to ask the user for permission before calling the tool.' },
      { label: 'B', text: 'Implement an escalation gate in the application logic that pauses tool execution and waits for human UI confirmation.' },
      { label: 'C', text: 'Use the Routing pattern to send all reboot requests to a null endpoint.' },
      { label: 'D', text: 'Execute the tool first, then ask the human if it was the right decision.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Human-in-the-Loop (HITL) Application Escalation Gates for High-Risk Actions',
    explanation: 'Security controls must live outside the model. A common mistake is relying on prompt instructions for destructive actions. An escalation gate in the application code hard-pauses execution, guaranteeing a human confirms the action before the actual tool runs.\n',
    distractorAnalysis: {
      A: 'Models can ignore prompts and autonomously trigger tools. Soft constraints do not guarantee security.',
      C: 'It completely breaks the required functionality. Sending it to a null endpoint means servers never reboot.',
      D: 'Reversing a server reboot after the fact defeats the purpose of the safety check. The damage is already done.'
    },
    references: [
      { title: 'Agentic Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use' }
    ]
  },
  {
    id: 26,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'An automated payroll system uses an agent to adjust employee salaries. The developers want a human to verify the proposed changes, but if the human rejects them, the agent should try to fix the calculation.',
    question: 'Which workflow best addresses this requirement?',
    options: [
      { label: 'A', text: "Pass the human\'s rejection feedback directly into a tool_result block and let the agent continue its loop." },
      { label: 'B', text: 'Terminate the loop entirely and force the human to do the math manually.' },
      { label: 'C', text: 'Use the Parallelization pattern to calculate salaries three times and take the average.' },
      { label: 'D', text: 'Delete the context history so the agent starts fresh without bias.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Injecting Human Feedback as \'tool_result\' Blocks in Active Agent Loops',
    explanation: 'Human rejection does not have to terminate the session. In advanced HITL systems, human feedback can be injected back into the loop as a tool_result (e.g., \'Error: Human rejected, reason: bonus too high\'). The agent reads this context and dynamically corrects its approach.\n\n```python\nif human_rejected:\n    tool_result = f"Action denied by human. Feedback: {human_feedback}. Please adjust."\n    # Send back to Claude to try again\n```\n\n',
    distractorAnalysis: {
      B: 'It abandons the agent\'s capabilities rather than utilizing its correction ability. This causes poor automation efficiency.',
      C: 'It bypasses the mandatory human approval. Averaging doesn\'t replace human oversight.',
      D: 'The agent needs the history to know what it did wrong. If you delete it, it will just make the same mistake.'
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 27,
    domain: 1,
    domainName: 'Agentic Architecture & Orchestration',
    scenario: 'A customer service bot handles refunds. If a user requests a refund over $500, the bot must hand the conversation over to a human support agent and cease autonomous replies.',
    question: 'How should you architect this graceful degradation?',
    options: [
      { label: 'A', text: "Configure the agent\'s prompt to say 'I am transferring you' and wait for the model to stop running." },
      { label: 'B', text: 'Implement a programmatic rule that intercepts the $500 tool call, alerts a human, and permanently exits the agentic loop.' },
      { label: 'C', text: 'Let the agent process the $500 refund, then alert a human to review it later.' },
      { label: 'D', text: 'Use the Evaluator-Optimizer pattern to argue with the user until the refund amount drops below $500.' },
    ],
    correctAnswer: 'B',
    keyConcept: 'Deterministic Policy-Based Fallback to Human Support Agents',
    explanation: 'Graceful degradation requires deterministic boundary enforcement. A common mistake is leaving the handoff up to the LLM. For strict business policies, the orchestrator must intercept the high-stakes intent (e.g., tool call for >$500), sever the autonomous loop, and seamlessly bridge the user to a human UI.\n',
    distractorAnalysis: {
      A: 'Simply prompting the model doesn\'t programmatically disconnect the loop or alert a human. It just creates a text response.',
      C: 'It violates the requirement to hand over BEFORE processing. Once it processes, the money is gone.',
      D: 'It creates a hostile user experience and violates business logic. Arguing with customers is not standard protocol.'
    },
    references: [
      { title: 'Agents Overview', url: 'https://docs.anthropic.com/en/docs/agents' }
    ]
  }
];
