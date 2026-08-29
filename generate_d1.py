import json

questions = []

def add_q(id, domain, domainName, scenario, question, options, correct, explanation, distractor, refs):
    questions.append({
        "id": id,
        "domain": domain,
        "domainName": domainName,
        "scenario": scenario,
        "question": question,
        "options": options,
        "correctAnswer": correct,
        "explanation": explanation,
        "distractorAnalysis": distractor,
        "references": refs
    })

# Q1-5: Agentic loop mechanics
add_q(1, 1, 'Agentic Architecture & Orchestration', 
      "A healthcare startup is building an AI assistant to schedule patient appointments. After extracting the patient's preferred date, the model returns a response with a stop_reason of 'tool_use'.", 
      "What should you do next in your agentic loop?", 
      [{"label": "A", "text": "End the conversation because the model has finished processing."}, 
       {"label": "B", "text": "Extract the tool use request, execute the tool locally, and append a tool_result block to the message history."}, 
       {"label": "C", "text": "Prompt the user to manually execute the tool and provide the results."}, 
       {"label": "D", "text": "Restart the conversation with a system prompt instructing the model not to use tools."}], 
      "B", 
      "The key insight is that a stop_reason of 'tool_use' indicates the model has paused generation and is waiting for the application to execute a tool. A common mistake is assuming the turn is over. You must execute the tool and return the result using a tool_result block.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because the model is waiting for data to continue.", "C": "C is incorrect because the application should handle tool execution, not the user.", "D": "D is incorrect because it defeats the purpose of agentic capabilities."}, 
      [{"title": "Agentic Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use"}])

add_q(2, 1, 'Agentic Architecture & Orchestration', 
      "A fintech platform uses Claude to process loan applications. When the model invokes the 'check_credit' tool, it provides a tool_use_id of 'toolu_123'. The application successfully retrieves the credit score.", 
      "How must the application format the result when sending it back to Claude?", 
      [{"label": "A", "text": "As a user message containing the text 'The credit score is 750'."}, 
       {"label": "B", "text": "As a tool_result block with the tool_use_id 'toolu_123'."}, 
       {"label": "C", "text": "As a tool_result block without any ID, relying on the sequential order of messages."}, 
       {"label": "D", "text": "As an assistant message confirming the tool was executed."}], 
      "B", 
      "The trap here is thinking you can just send text back. Anthropic's API strictly requires that any tool result matches the exact tool_use_id provided in the tool_use block. Failing to include this ID will cause an API error.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because it violates the required block structure for tool results.", "C": "C is incorrect because the API requires an explicit tool_use_id for matching.", "D": "D is incorrect because results must come from the user role in a tool_result block."}, 
      [{"title": "Tool Use Handling", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks"}])

add_q(3, 1, 'Agentic Architecture & Orchestration', 
      "An e-commerce retailer has an agent that searches inventory. Occasionally, the agent enters an infinite loop, repeatedly calling the 'search_products' tool with slightly different queries and exhausting the API budget.", 
      "Which approach minimizes the risk of this infinite loop?", 
      [{"label": "A", "text": "Implement a hard cap on the maximum number of iterations in the agentic loop."}, 
       {"label": "B", "text": "Add a system prompt instruction: 'Do not search more than 3 times.'"}, 
       {"label": "C", "text": "Disable the tool and rely entirely on the model's internal knowledge."}, 
       {"label": "D", "text": "Use a smaller, cheaper model to save costs during the loop."}], 
      "A", 
      "The key insight is that agentic loops require systemic controls. A common mistake is relying purely on prompt instructions to control flow. While prompting helps, a hard iteration cap in the code acts as a reliable circuit breaker to prevent runaway loops and uncontrolled costs.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because models may occasionally ignore prompt constraints, failing to provide a hard guarantee.", "C": "C is incorrect because it breaks the required functionality of searching inventory.", "D": "D is incorrect because it just slows the burn rate rather than fixing the infinite loop."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(4, 1, 'Agentic Architecture & Orchestration', 
      "A legal firm built a contract review agent. During a long document analysis, the application receives a response with a stop_reason of 'max_tokens'.", 
      "What is the most likely cause of this behavior?", 
      [{"label": "A", "text": "The model successfully completed the tool execution."}, 
       {"label": "B", "text": "The model decided the user's prompt violated safety guidelines."}, 
       {"label": "C", "text": "The generated response reached the max_tokens limit specified in the API request."}, 
       {"label": "D", "text": "The system encountered an internal server error."}], 
      "C", 
      "The trap here is confusing stop reasons. A stop_reason of 'max_tokens' explicitly means the generation was truncated because it hit the max_tokens parameter limit set in the API call, not that it finished naturally or hit a safety filter.\n\nHence, the correct answer is: C.", 
      {"A": "A is incorrect because completing a tool execution yields 'tool_use'.", "B": "B is incorrect because safety issues usually return an error or a different stop reason.", "D": "D is incorrect because server errors return 5xx HTTP codes, not a max_tokens stop reason."}, 
      [{"title": "Agentic Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use"}])

add_q(5, 1, 'Agentic Architecture & Orchestration', 
      "A logistics company has an agentic loop that alternates between user queries and Claude's tool calls. A developer mistakenly appends two 'user' messages in a row without an intervening 'assistant' message.", 
      "What will be the result of this API call?", 
      [{"label": "A", "text": "The API will automatically merge the two user messages."}, 
       {"label": "B", "text": "The API will reject the request due to an invalid message sequence."}, 
       {"label": "C", "text": "Claude will ignore the first user message and only process the second."}, 
       {"label": "D", "text": "Claude will generate a response, but it may hallucinate."}], 
      "B", 
      "The key insight is that Anthropic's Messages API enforces strict role alternation. A common mistake is appending consecutive user or assistant messages. The sequence must alternate strictly (e.g., user, assistant, user, assistant), otherwise the API throws an invalid request error.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because the API does not auto-merge messages.", "C": "C is incorrect because the request won't even reach the model.", "D": "D is incorrect because the API blocks the request before generation."}, 
      [{"title": "Tool Use Handling", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks"}])

# Q6-10: 5 Workflow Patterns
add_q(6, 1, 'Agentic Architecture & Orchestration', 
      "An insurance underwriter system receives raw claim documents. It first extracts text, then identifies key entities, and finally evaluates the claim validity, passing the output of each step to the next.", 
      "Which workflow pattern best fits this architecture?", 
      [{"label": "A", "text": "Routing"}, 
       {"label": "B", "text": "Parallelization"}, 
       {"label": "C", "text": "Prompt Chaining"}, 
       {"label": "D", "text": "Evaluator-Optimizer"}], 
      "C", 
      "The key insight is recognizing sequential dependencies. A common mistake is calling any multi-step process an orchestrator. Prompt Chaining is specifically for tasks broken into sequential subtasks where one LLM call's output becomes the input for the next.\n\nHence, the correct answer is: C.", 
      {"A": "A is incorrect because Routing involves classifying and dispatching to one specific path, not sequential steps.", "B": "B is incorrect because Parallelization runs tasks simultaneously, not sequentially.", "D": "D is incorrect because Evaluator-Optimizer involves an iterative feedback loop, not just a straight sequence."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(7, 1, 'Agentic Architecture & Orchestration', 
      "A SaaS platform's customer support bot receives diverse queries. It must determine if the query is billing, technical, or sales-related, and send it to a specialized prompt for that category.", 
      "Which approach minimizes latency and complexity for this requirement?", 
      [{"label": "A", "text": "Orchestrator-Workers pattern"}, 
       {"label": "B", "text": "Routing pattern"}, 
       {"label": "C", "text": "Evaluator-Optimizer pattern"}, 
       {"label": "D", "text": "Autonomous Agent pattern"}], 
      "B", 
      "The trap here is overcomplicating the solution. Routing is the ideal pattern when an input needs to be classified and directed to a specialized downstream task. It avoids the overhead of a dynamic Orchestrator-Worker setup.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because Orchestrator-Workers is for dynamic task decomposition, which is overkill here.", "C": "C is incorrect because there is no feedback loop required.", "D": "D is incorrect because an open-ended autonomous agent lacks the strict predictability needed for simple triage."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(8, 1, 'Agentic Architecture & Orchestration', 
      "A content moderation system needs to assess user-generated posts for policy violations. To ensure high accuracy and avoid false positives, the system asks three distinct Claude instances to review the post simultaneously and aggregates their results.", 
      "Which pattern best describes this architecture?", 
      [{"label": "A", "text": "Parallelization (Voting)"}, 
       {"label": "B", "text": "Prompt Chaining"}, 
       {"label": "C", "text": "Routing"}, 
       {"label": "D", "text": "Evaluator-Optimizer"}], 
      "A", 
      "The key insight is the concurrent execution for consensus. The Parallelization pattern (specifically fan-out/voting) is used when multiple identical or similar tasks run concurrently to improve reliability through majority voting or aggregation.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because Chaining implies sequential execution.", "C": "C is incorrect because Routing sends the task down only one path.", "D": "D is incorrect because Evaluator-Optimizer is an iterative loop, not concurrent consensus."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(9, 1, 'Agentic Architecture & Orchestration', 
      "A software development firm wants Claude to write complex, production-ready code. The initial output often has edge-case bugs. They implement a system where a second Claude instance reviews the code, finds bugs, and asks the first instance to fix them.", 
      "Which workflow pattern best fits this iterative improvement process?", 
      [{"label": "A", "text": "Routing"}, 
       {"label": "B", "text": "Parallelization"}, 
       {"label": "C", "text": "Evaluator-Optimizer"}, 
       {"label": "D", "text": "Prompt Chaining"}], 
      "C", 
      "The trap here is confusing sequential chaining with iterative refinement. The Evaluator-Optimizer pattern is specifically designed for generate-then-critique loops where one model generates output and another (or the same one) evaluates and refines it iteratively.\n\nHence, the correct answer is: C.", 
      {"A": "A is incorrect because Routing is for dispatching tasks.", "B": "B is incorrect because Parallelization is concurrent, not iterative.", "D": "D is incorrect because Prompt Chaining is a fixed sequence, whereas this requires a feedback loop."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(10, 1, 'Agentic Architecture & Orchestration', 
      "A real estate analytics firm wants an AI that can take a broad request like 'Analyze the Seattle housing market', figure out the necessary subtasks (fetch prices, fetch crime rates, analyze trends), and assign them to specialized sub-agents dynamically.", 
      "Which architecture pattern best addresses this requirement?", 
      [{"label": "A", "text": "Orchestrator-Workers"}, 
       {"label": "B", "text": "Prompt Chaining"}, 
       {"label": "C", "text": "Routing"}, 
       {"label": "D", "text": "Evaluator-Optimizer"}], 
      "A", 
      "The key insight is dynamic task decomposition. A common mistake is using Routing, but Routing handles predictable, pre-defined paths. Orchestrator-Workers dynamically breaks down a complex task and delegates it to specialized workers.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because Chaining uses fixed sequential steps.", "C": "C is incorrect because Routing does not dynamically decompose a task.", "D": "D is incorrect because Evaluator-Optimizer focuses on critique, not task delegation."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

# Q11-15: Deterministic State Machines vs Autonomous Loops
add_q(11, 1, 'Agentic Architecture & Orchestration', 
      "A fast-food chain is deploying a drive-thru ordering assistant. The process has strictly defined steps: greet, take order, upsell, and confirm payment. They want minimal hallucinations.", 
      "How should you modify your architecture to best support this?", 
      [{"label": "A", "text": "Use an autonomous agentic loop with a single prompt instructing it to follow all steps."}, 
       {"label": "B", "text": "Implement a deterministic state machine where the LLM is only used to extract entities at each fixed state."}, 
       {"label": "C", "text": "Use the Orchestrator-Worker pattern to dynamically decide the flow."}, 
       {"label": "D", "text": "Implement a fully autonomous swarm to handle the order flexibly."}], 
      "B", 
      "The key insight is that highly predictable, structured processes shouldn't rely on open-ended LLM routing. A common mistake is using autonomous agents for rigid tasks. Deterministic state machines provide reliability and control, using the LLM only for specific extraction tasks.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because an open-ended loop risks drifting off-script.", "C": "C is incorrect because Orchestrator-Workers is for unpredictable, complex tasks.", "D": "D is incorrect because a swarm introduces unnecessary latency, cost, and unpredictability."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(12, 1, 'Agentic Architecture & Orchestration', 
      "A cybersecurity firm uses an autonomous agent to investigate network anomalies. The agent iteratively queries logs, analyzes results, and queries more logs. Sometimes it gets stuck pursuing a dead end.", 
      "Which approach minimizes the risk of the agent running indefinitely?", 
      [{"label": "A", "text": "Implement a recursion depth cap or max iterations limit in the execution loop."}, 
       {"label": "B", "text": "Tell the model in the system prompt to stop if it feels it is taking too long."}, 
       {"label": "C", "text": "Switch to a Prompt Chaining workflow."}, 
       {"label": "D", "text": "Remove the agent's ability to call the log-querying tool."}], 
      "A", 
      "The trap here is relying on the model to self-regulate. For open-ended autonomous loops, you must implement hard architectural controls like a recursion depth cap (circuit breaker) to prevent infinite loops and runaway costs.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because models can fail to adhere to self-regulation prompts.", "C": "C is incorrect because investigating anomalies requires dynamic querying, which chaining cannot do.", "D": "D is incorrect because removing the tool cripples the agent's core function."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(13, 1, 'Agentic Architecture & Orchestration', 
      "A travel agency agent plans custom vacations. The agent often generates long itineraries, but the developers notice the context window fills up quickly, leading to API rejections.", 
      "Which strategy best addresses this issue within an autonomous loop?", 
      [{"label": "A", "text": "Implement token budget monitoring and context summarization to prune older messages."}, 
       {"label": "B", "text": "Use a deterministic state machine instead of an agent."}, 
       {"label": "C", "text": "Increase the max_tokens parameter in the API call."}, 
       {"label": "D", "text": "Send only the very first and very last message to the API."}], 
      "A", 
      "The key insight is that autonomous loops accumulate context rapidly. A common mistake is just increasing max_tokens (which limits output, not input). Implementing token monitoring and pruning or summarizing old context keeps the loop within the context window limits.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because planning a custom vacation requires flexibility that state machines lack.", "C": "C is incorrect because max_tokens only affects the output generation length.", "D": "D is incorrect because the model will lose crucial intermediate context needed to plan."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(14, 1, 'Agentic Architecture & Orchestration', 
      "A tech consultancy is deciding between a deterministic workflow and an autonomous agent for a new invoice processing system. The process always follows the exact same three steps: OCR, validate totals, and insert into SQL.", 
      "What is the most compelling reason to choose a deterministic workflow over an agentic loop?", 
      [{"label": "A", "text": "Agents cannot execute SQL queries under any circumstances."}, 
       {"label": "B", "text": "Deterministic workflows offer greater predictability and lower latency for rigid tasks."}, 
       {"label": "C", "text": "Agents require the Evaluator-Optimizer pattern to function properly."}, 
       {"label": "D", "text": "Deterministic workflows use significantly more API tokens."}], 
      "B", 
      "The trap here is assuming AI agents are always better. For rigidly defined, unchanging processes, deterministic workflows (state machines/pipelines) are superior because they eliminate the latency of LLM routing and guarantee predictable execution paths.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because agents can certainly be provided tools to execute SQL.", "C": "C is incorrect because agents do not strictly require Evaluator-Optimizer.", "D": "D is incorrect because deterministic workflows typically use fewer tokens by avoiding orchestrator overhead."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(15, 1, 'Agentic Architecture & Orchestration', 
      "An educational platform uses an autonomous loop to tutor students in math. To prevent excessive cloud costs from long sessions, the engineering team wants to implement a cost circuit breaker.", 
      "Which mechanism is most appropriate to implement this?", 
      [{"label": "A", "text": "Track cumulative token usage in the orchestration layer and force-terminate the loop when a threshold is met."}, 
       {"label": "B", "text": "Rely entirely on Anthropic's native billing limits in the console."}, 
       {"label": "C", "text": "Add a system prompt telling Claude to calculate the cost and stop when it reaches $1."}, 
       {"label": "D", "text": "Limit the student to asking only one question per day."}], 
      "A", 
      "The key insight is that cost controls in agentic loops must be handled programmatically by the orchestrator. Tracking cumulative tokens across the loop and terminating when a threshold is crossed ensures strict, granular budget control at the session level.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because console billing limits apply to the whole workspace/org, not individual sessions.", "C": "C is incorrect because LLMs cannot reliably calculate real-time API costs internally.", "D": "D is incorrect because it severely degrades the user experience unnecessarily."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

# Q16-20: Multi-Agent Coordination
add_q(16, 1, 'Agentic Architecture & Orchestration', 
      "A media company is building a multi-agent system to write articles. A 'Researcher' agent gathers facts, and a 'Writer' agent drafts the copy. The Writer is currently receiving the entire raw web-scraping history of the Researcher, causing context overload.", 
      "Which approach minimizes context overload for the Writer agent?", 
      [{"label": "A", "text": "Implement shared memory where both agents read the exact same message array."}, 
       {"label": "B", "text": "Implement context isolation by having the Researcher output a concise summary to pass to the Writer."}, 
       {"label": "C", "text": "Switch to a single monolithic agent that does both tasks simultaneously."}, 
       {"label": "D", "text": "Use the Routing pattern to bypass the Researcher entirely."}], 
      "B", 
      "The trap here is thinking agents must share all context. In multi-agent coordination, context isolation is crucial. Passing a synthesized summary rather than raw scratchpad data prevents context bloat and keeps the downstream agent focused.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because shared memory exacerbates the context overload problem.", "C": "C is incorrect because a single agent might struggle with the combined complexity and context length.", "D": "D is incorrect because bypassing the Researcher defeats the purpose of the architecture."}, 
      [{"title": "Agents Overview", "url": "https://docs.anthropic.com/en/docs/agents"}])

add_q(17, 1, 'Agentic Architecture & Orchestration', 
      "A financial institution has a 'Coordinator' agent that delegates tasks to 'Tax' and 'Investment' subagents. The Coordinator needs to know when a subagent has finished its task so it can resume control.", 
      "How should you structure the handoff protocol?", 
      [{"label": "A", "text": "Have the subagent call a 'yield_control' tool or return a final string to signal completion to the Coordinator."}, 
       {"label": "B", "text": "Set a fixed time limit; if the subagent takes longer than 5 seconds, the Coordinator takes over."}, 
       {"label": "C", "text": "Have the subagents communicate directly with the user and bypass the Coordinator."}, 
       {"label": "D", "text": "Merge the system prompts of all agents into one massive prompt."}], 
      "A", 
      "The key insight is that multi-agent handoffs require explicit signaling. A common mistake is relying on heuristics. Having the subagent emit a specific completion token, return a final string, or use a handoff tool ensures predictable orchestration.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because time limits cause race conditions and abrupt task failure.", "C": "C is incorrect because bypassing the Coordinator ruins the orchestration structure.", "D": "D is incorrect because merging prompts destroys agent specialization and increases confusion."}, 
      [{"title": "Agents Overview", "url": "https://docs.anthropic.com/en/docs/agents"}])

add_q(18, 1, 'Agentic Architecture & Orchestration', 
      "An enterprise resource planning (ERP) system uses an Orchestrator agent to assign data-entry tasks to worker agents. The Orchestrator is failing because it tries to execute the data-entry tools itself instead of delegating.", 
      "What is the most likely cause of this behavior?", 
      [{"label": "A", "text": "The Orchestrator's system prompt lacks clear instructions about its role as a delegator."}, 
       {"label": "B", "text": "The Orchestrator was given direct access to the worker agents' tools in its API call."}, 
       {"label": "C", "text": "Both A and B are likely contributing to the issue."}, 
       {"label": "D", "text": "The worker agents are offline."}], 
      "C", 
      "The trap here is ignoring tool scoping. In an Orchestrator-Worker pattern, the Orchestrator should only have tools for delegating to workers (e.g., `call_worker`), not the workers' specific tools. Giving it direct access to the tools, combined with poor prompting, causes it to do the work itself.\n\nHence, the correct answer is: C.", 
      {"A": "A is partially correct, but B is also a major architectural flaw.", "B": "B is partially correct, but A also contributes.", "D": "D is incorrect because agents don't go 'offline' like traditional servers; they are just API calls."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(19, 1, 'Agentic Architecture & Orchestration', 
      "A healthcare routing agent takes patient symptoms and must securely pass the session to a 'Medical' subagent. They must share some context, but the Medical agent shouldn't see the patient's billing data.", 
      "Which approach best addresses the multi-agent context sharing requirement?", 
      [{"label": "A", "text": "Pass the entire raw conversation history from the Routing agent to the Medical agent."}, 
       {"label": "B", "text": "Have the Routing agent generate a sanitized summary of symptoms to initialize the Medical agent's context."}, 
       {"label": "C", "text": "Disable context sharing entirely; the Medical agent must ask the patient for their symptoms again."}, 
       {"label": "D", "text": "Use the Parallelization pattern to run both agents at the same time."}], 
      "B", 
      "The key insight is state management across boundaries. A common mistake is passing the full raw history, which leaks sensitive data or wastes tokens. A synthesized, sanitized state transfer is best for secure, efficient handoffs.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because it violates the requirement to hide billing data.", "C": "C is incorrect because forcing the user to repeat themselves creates a terrible user experience.", "D": "D is incorrect because Parallelization does not solve the sequential routing and data privacy requirements."}, 
      [{"title": "Agents Overview", "url": "https://docs.anthropic.com/en/docs/agents"}])

add_q(20, 1, 'Agentic Architecture & Orchestration', 
      "A customer service system uses a Supervisor agent to monitor a Chat agent. If the Chat agent becomes argumentative, the Supervisor intercepts the message and forces a polite rewrite.", 
      "Which pattern best describes this architecture?", 
      [{"label": "A", "text": "Routing"}, 
       {"label": "B", "text": "Evaluator-Optimizer"}, 
       {"label": "C", "text": "Parallelization"}, 
       {"label": "D", "text": "Prompt Chaining"}], 
      "B", 
      "The trap here is focusing on the 'Supervisor' name rather than the flow. Because one agent generates an output and another evaluates it to enforce corrections/optimizations, this is a classic Evaluator-Optimizer pattern.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because it's not simply classifying and dispatching an initial request.", "C": "C is incorrect because this is a sequential check, not concurrent tasks.", "D": "D is incorrect because Evaluator-Optimizer specifically entails critique and refinement, not just generic chaining."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

# Q21-24: Agent SDK Hooks
add_q(21, 1, 'Agentic Architecture & Orchestration', 
      "A logistics developer is using an Agent SDK to manage tools. They need to validate the latitude and longitude arguments generated by Claude BEFORE the 'schedule_delivery' tool executes.", 
      "Where should you place this validation logic?", 
      [{"label": "A", "text": "In the after_tool_call hook."}, 
       {"label": "B", "text": "In the before_tool_call hook or pre-execution interceptor."}, 
       {"label": "C", "text": "Inside the system prompt."}, 
       {"label": "D", "text": "In the telemetry observability hook."}], 
      "B", 
      "The key insight is the lifecycle of tool execution. A common mistake is relying on the LLM to validate its own output. Using a pre-execution hook (like before_tool_call) allows the application code to validate inputs and optionally abort or modify the execution before the tool runs.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because after_tool_call runs after the tool has already executed, which is too late to prevent bad input.", "C": "C is incorrect because prompts cannot execute programmatic validation logic.", "D": "D is incorrect because telemetry is for logging, not flow control."}, 
      [{"title": "Agentic Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use"}])

add_q(22, 1, 'Agentic Architecture & Orchestration', 
      "An analytics dashboard uses an agent to query a database. The database occasionally returns huge JSON blobs that exceed the context window, causing the next API call to fail.", 
      "How should you modify the architecture using SDK hooks to prevent this?", 
      [{"label": "A", "text": "Use an after_tool_call hook to truncate or summarize the database output before returning it to Claude."}, 
       {"label": "B", "text": "Use a before_tool_call hook to increase the context window size."}, 
       {"label": "C", "text": "Implement a Routing pattern to bypass the database entirely."}, 
       {"label": "D", "text": "Use a prompt instructing Claude not to read large JSON files."}], 
      "A", 
      "The trap here is assuming you must pass the exact raw tool output back to the LLM. An after_tool_call hook allows the application to inspect the result, and if it's too large, summarize or truncate it so it fits safely within the context window before constructing the tool_result block.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because you cannot dynamically change the context window limit of the model.", "C": "C is incorrect because you need the database for analytics.", "D": "D is incorrect because Claude cannot control the size of the database's return blob."}, 
      [{"title": "Tool Use Handling", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-tool-use-and-tool-result-content-blocks"}])

add_q(23, 1, 'Agentic Architecture & Orchestration', 
      "A cloud management platform uses an agent SDK. The team wants to trace the latency of every LLM API call and track which tools are invoked most frequently for auditing purposes.", 
      "Which mechanism is most appropriate to implement this observability?", 
      [{"label": "A", "text": "Evaluator-Optimizer pattern"}, 
       {"label": "B", "text": "Telemetry and observability hooks provided by the orchestrator."}, 
       {"label": "C", "text": "Adding a 'log_latency' tool for Claude to call after every step."}, 
       {"label": "D", "text": "Parsing the text of the user messages."}], 
      "B", 
      "The key insight is separating concerns. A common mistake is forcing the agent to manage its own logging. Telemetry and observability hooks in the orchestrator run transparently, capturing metrics like latency and tool frequency without consuming tokens or altering the agent's logic.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because Evaluator-Optimizer is a reasoning pattern, not a logging tool.", "C": "C is incorrect because making the LLM log its own latency wastes tokens and is highly inaccurate.", "D": "D is incorrect because latency data isn't in user messages."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(24, 1, 'Agentic Architecture & Orchestration', 
      "An e-commerce agent occasionally encounters an API timeout when calling a third-party shipping API. The agent crashes immediately.", 
      "Which approach minimizes downtime and makes the agent more resilient?", 
      [{"label": "A", "text": "Implement error interceptors in the tool execution layer to return a graceful error message as a tool_result."}, 
       {"label": "B", "text": "Tell Claude to wait 5 minutes if the API times out."}, 
       {"label": "C", "text": "Use a complex swarm architecture to query multiple shipping APIs at once."}, 
       {"label": "D", "text": "Change the stop_reason to 'end_turn'."}], 
      "A", 
      "The trap here is letting unhandled exceptions bubble up and crash the orchestrator. By catching errors in the execution layer and returning them as a formatted tool_result block (e.g., 'API timed out, please try again'), the agent can read the error and decide to retry or inform the user gracefully.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because the LLM does not execute code and cannot perform a background wait.", "C": "C is incorrect because it's an over-engineered solution for a simple timeout.", "D": "D is incorrect because you cannot manually change the stop_reason returned by the API."}, 
      [{"title": "Agentic Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use"}])

# Q25-27: Human-in-the-loop (HITL)
add_q(25, 1, 'Agentic Architecture & Orchestration', 
      "A server management agent is authorized to reboot web servers. However, to prevent accidental downtime, the engineering team requires a human administrator to approve the action before the reboot command runs.", 
      "What is the most secure way to implement this Human-in-the-loop requirement?", 
      [{"label": "A", "text": "Add a system prompt telling Claude to ask the user for permission before calling the tool."}, 
       {"label": "B", "text": "Implement an escalation gate in the application logic that pauses tool execution and waits for human UI confirmation."}, 
       {"label": "C", "text": "Use the Routing pattern to send all reboot requests to a null endpoint."}, 
       {"label": "D", "text": "Execute the tool first, then ask the human if it was the right decision."}], 
      "B", 
      "The key insight is that security controls must live outside the model. A common mistake is relying on prompt instructions for destructive actions. An escalation gate in the application code hard-pauses execution, guaranteeing a human confirms the action before the actual tool runs.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because models can ignore prompts and autonomously trigger tools.", "C": "C is incorrect because it completely breaks the required functionality.", "D": "D is incorrect because reversing a server reboot after the fact defeats the purpose of the safety check."}, 
      [{"title": "Agentic Tool Use", "url": "https://docs.anthropic.com/en/docs/build-with-claude/agentic-tool-use"}])

add_q(26, 1, 'Agentic Architecture & Orchestration', 
      "An automated payroll system uses an agent to adjust employee salaries. The developers want a human to verify the proposed changes, but if the human rejects them, the agent should try to fix the calculation.", 
      "Which workflow best addresses this requirement?", 
      [{"label": "A", "text": "Pass the human's rejection feedback directly into a tool_result block and let the agent continue its loop."}, 
       {"label": "B", "text": "Terminate the loop entirely and force the human to do the math manually."}, 
       {"label": "C", "text": "Use the Parallelization pattern to calculate salaries three times and take the average."}, 
       {"label": "D", "text": "Delete the context history so the agent starts fresh without bias."}], 
      "A", 
      "The trap here is thinking a human rejection must end the session. In advanced HITL systems, human feedback can be injected back into the loop as a tool_result (e.g., 'Error: Human rejected, reason: bonus too high'). The agent reads this context and dynamically corrects its approach.\n\nHence, the correct answer is: A.", 
      {"B": "B is incorrect because it abandons the agent's capabilities rather than utilizing its correction ability.", "C": "C is incorrect because it bypasses the mandatory human approval.", "D": "D is incorrect because the agent needs the history to know what it did wrong."}, 
      [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}])

add_q(27, 1, 'Agentic Architecture & Orchestration', 
      "A customer service bot handles refunds. If a user requests a refund over $500, the bot must hand the conversation over to a human support agent and cease autonomous replies.", 
      "How should you architect this graceful degradation?", 
      [{"label": "A", "text": "Configure the agent's prompt to say 'I am transferring you' and wait for the model to stop running."}, 
       {"label": "B", "text": "Implement a programmatic rule that intercepts the $500 tool call, alerts a human, and permanently exits the agentic loop."}, 
       {"label": "C", "text": "Let the agent process the $500 refund, then alert a human to review it later."}, 
       {"label": "D", "text": "Use the Evaluator-Optimizer pattern to argue with the user until the refund amount drops below $500."}], 
      "B", 
      "The key insight is graceful degradation. A common mistake is leaving the handoff up to the LLM. For strict business policies, the orchestrator must intercept the high-stakes intent (e.g., tool call for >$500), sever the autonomous loop, and seamlessly bridge the user to a human UI.\n\nHence, the correct answer is: B.", 
      {"A": "A is incorrect because simply prompting the model doesn't programmatically disconnect the loop or alert a human.", "C": "C is incorrect because it violates the requirement to hand over BEFORE processing.", "D": "D is incorrect because it creates a hostile user experience and violates business logic."}, 
      [{"title": "Agents Overview", "url": "https://docs.anthropic.com/en/docs/agents"}])


output = "import type { Question } from '../types';\n\nexport const questionsD1: Question[] = [\n"

for q in questions:
    output += "  {\n"
    output += f"    id: {q['id']},\n"
    output += f"    domain: {q['domain']},\n"
    output += f"    domainName: '{q['domainName']}',\n"
    output += f"    scenario: {repr(q['scenario'])},\n"
    output += f"    question: {repr(q['question'])},\n"
    output += "    options: [\n"
    for opt in q['options']:
        output += f"      {{ label: '{opt['label']}', text: {repr(opt['text'])} }},\n"
    output += "    ],\n"
    output += f"    correctAnswer: '{q['correctAnswer']}',\n"
    output += f"    explanation: {repr(q['explanation'])},\n"
    output += "    distractorAnalysis: {\n"
    for key, val in q['distractorAnalysis'].items():
        output += f"      {key}: {repr(val)},\n"
    output += "    },\n"
    output += "    references: [\n"
    for ref in q['references']:
        output += f"      {{ title: {repr(ref['title'])}, url: {repr(ref['url'])} }}\n"
    output += "    ]\n"
    output += "  },\n"

output += "];\n"

with open('/Users/eduardo/code_projects/ccar-f-quiz/src/data/questions-d1.ts', 'w') as f:
    f.write(output)
print("File written successfully.")
