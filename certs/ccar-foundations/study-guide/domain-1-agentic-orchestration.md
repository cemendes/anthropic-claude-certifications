# Domain 1: Agentic Architecture & Orchestration (27% Exam Weight)

## Core Competencies
* Understanding the fundamental agentic loop: `stop_reason: tool_use`, local client execution, and `tool_result` packaging.
* Designing and implementing Anthropic's 5 Core Workflow Patterns.
* Choosing between Deterministic State Machines and Autonomous Loops.
* Designing Multi-Agent Systems with context isolation and handoff protocols.
* Implementing Agent SDK lifecycle hooks (`before_tool_call`, `after_tool_call`, error interceptors).
* Structuring Human-in-the-loop (HITL) approval gates.

---

## 1. Agentic Loop Mechanics

### Stop Reason Lifecycle
When interacting with the Anthropic Messages API, the response `stop_reason` signals the loop state:

* `tool_use`: Generation paused because Claude requested one or more tool calls. The orchestrator must execute the tools locally and return their results.
* `end_turn`: Claude completed its natural language response; no further tool calls are required.
* `max_tokens`: Claude's output exceeded the `max_tokens` parameter. The response was truncated.
* `stop_sequence`: Claude encountered a custom stop sequence defined by the client.

```python
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=4096,
    tools=tools,
    messages=messages
)

if response.stop_reason == "tool_use":
    # 1. Extract all tool_use blocks
    tool_blocks = [b for b in response.content if b.type == "tool_use"]
    tool_results = []
    
    for tool_call in tool_blocks:
        output = execute_local_tool(tool_call.name, tool_call.input)
        tool_results.append({
            "type": "tool_result",
            "tool_use_id": tool_call.id,  # MANDATORY
            "content": json.dumps(output)
        })
    
    # 2. Append assistant turn + user tool_result turn
    messages.append({"role": "assistant", "content": response.content})
    messages.append({"role": "user", "content": tool_results})
    
    # 3. Re-invoke model to complete turn
    final_response = client.messages.create(...)
```

### Critical API Rules:
1. **`tool_use_id` Matching**: Every `tool_result` must supply the exact `tool_use_id` generated in the corresponding `tool_use` block.
2. **Turn Alternation**: The Messages API strictly enforces alternating `user` $\leftrightarrow$ `assistant` turns. Consecutive `user` messages return `HTTP 400 invalid_request_error`.
3. **Hard Circuit Breakers**: Always enforce a maximum iteration limit (`MAX_STEPS = 10`) in code to prevent runaway infinite loops and uncontrolled API spend.

---

## 2. Anthropic's 5 Workflow Patterns

```
                ┌──────────────────────────────────────────────┐
                │          Anthropic Workflow Patterns         │
                └──────────────────────┬───────────────────────┘
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       │                               │                               │
┌──────────────┐              ┌─────────────────┐              ┌────────────────┐
│Prompt Chain  │              │     Routing     │              │ Parallelization│
│(Sequential)  │              │(Classification) │              │(Section/Vote)  │
└──────────────┘              └─────────────────┘              └────────────────┘
       │                               │
       └───────────────────────────────┼───────────────────────────────┐
                                       │                               │
                             ┌───────────────────┐           ┌───────────────────┐
                             │Orchestrator-Worker│           │Evaluator-Optimizer│
                             │ (Dynamic Subtasks)│           │ (Critique & Loop) │
                             └───────────────────┘           └───────────────────┘
```

1. **Prompt Chaining**:
   * *Best For*: Predictable, multi-stage workflows (e.g., Parse $\rightarrow$ Validate $\rightarrow$ Draft $\rightarrow$ Format).
   * *Mechanism*: Intermediate gates validate output before triggering the next LLM call.

2. **Routing**:
   * *Best For*: Directing distinct input types to specialized prompts or model tiers.
   * *Mechanism*: High-speed classifier (e.g. Claude 3.5 Haiku) dispatches to specialized handlers. Minimizes latency.

3. **Parallelization**:
   * *Sectioning*: Breaking an independent task into concurrent chunks (e.g., reviewing 5 chapters simultaneously).
   * *Voting*: Running multiple distinct prompts or instances on the same input to reach consensus (e.g. high-stakes medical/fraud review).

4. **Orchestrator-Workers**:
   * *Best For*: Complex, open-ended tasks where subtasks cannot be predicted in advance (e.g. coding features, deep research).
   * *Mechanism*: Orchestrator breaks down the objective, spawns worker agents, and aggregates results.

5. **Evaluator-Optimizer**:
   * *Best For*: Iterative refinement against objective criteria (e.g., code translation passing unit tests).
   * *Mechanism*: Generator model creates artifact $\rightarrow$ Evaluator model critiques $\rightarrow$ Loop until criteria met.

---

## 3. Multi-Agent Systems & Context Isolation

* **Payload Isolation Principle**: Subagents should receive only the specific data extract necessary for their task. Passing the full 100k+ conversation history causes context pollution, slow latency, and tool selection hallucinations.
* **Handoff Protocols**: Subagents must return a structured completion signal (summary or JSON payload) back to the coordinator rather than writing directly to shared global memory.
* **Tool Scoping**: Give each subagent the minimum set of tools required (Principle of Least Privilege).

---

## 4. Lifecycle Hooks & Human-in-the-Loop (HITL)

* **`before_tool_call`**: Pre-execution interceptor for input validation (e.g., bounds checking coordinates, validating authorization tokens). Can abort execution before side effects occur.
* **`after_tool_call`**: Post-execution hook for truncating or summarizing bulky tool results before injecting them into the context window.
* **`is_error: true`**: When tools fail (timeout, 404, parsing error), format the result with `"is_error": true` so Claude treats it as a recoverable failure rather than hallucinating over raw error logs.
* **HITL Escalation Gates**: High-risk actions (financial transactions, server reboots, data deletion) must pause the loop and return an approval request to the UI. Human feedback is injected as a subsequent `tool_result`.
