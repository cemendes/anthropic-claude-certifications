# 🎓 Certified Claude Developer: Foundations (CCDV-F)

The official study track, blueprint analysis, code-first architecture, and preparation kit for the **Anthropic Certified Claude Developer: Foundations (CCDV-F)** exam.

---

## 📊 Exam Blueprint & Weight Distribution

| Domain | Domain Title | Exam Weight | Question Count | Core Competencies |
|---|---|---|---|---|
| **Domain 1** | **Anthropic Messages API & SDKs** | **25%** | ~15 questions | Client initialization (Python/TS), message payload structure, strict role alternation (`user` $\leftrightarrow$ `assistant`), Streaming (SSE), token counting, model parameters (`temperature`, `top_p`, `top_k`, `max_tokens`). |
| **Domain 2** | **Tool Calling & JSON Schemas** | **25%** | ~15 questions | Tool definition schemas, Pydantic integration, `tool_choice` modes (`auto`, `any`, `tool`), handling `stop_reason: "tool_use"`, tool execution loops, injecting `tool_result` with `tool_use_id`, error signaling (`is_error: true`). |
| **Domain 3** | **Structured Outputs & Advanced Prompting** | **20%** | ~12 questions | Assistant prefilling (forcing valid JSON without Markdown blocks), XML tag extraction (`<response>`, `<thinking>`), Chain-of-Thought prompting, system prompt design, dynamic context injection. |
| **Domain 4** | **Prompt Caching & Cost/Latency Optimization** | **15%** | ~9 questions | Exact prefix match mechanics, `cache_control: {"type": "ephemeral"}`, 1,024 minimum tokens (Sonnet/Haiku) / 2,048 (Opus), 5-min sliding TTL, inspecting caching headers (`cache_creation_input_tokens`, `cache_read_input_tokens`). |
| **Domain 5** | **Error Handling, Rate Limits & Evaluation** | **15%** | ~9 questions | Handling HTTP errors (`400 Bad Request`, `401 Unauthorized`, `429 Rate Limit`, `529 Overloaded`), exponential backoff with jitter, inspecting `stop_reason` (`end_turn`, `max_tokens`, `stop_sequence`, `tool_use`), evals-as-code and deterministic testing. |

---

## 🎯 Exam Structure & Scoring Model

* **Format**: 60 Multiple-Choice Questions (Single & Multi-Select, Code Scenario-heavy).
* **Time Limit**: 120 Minutes (~2 minutes per question).
* **Scoring Scale**: Scaled score from **100 to 1000**.
* **Passing Score**: **720 / 1000** (equivalent to ~43/60 questions correct).
* **Result**: 🟢 **Passed — Score: 955 / 1000** (September 2, 2026).
* **Delivery**: Online proctored or authorized test center.

---

## 📈 Official Score Breakdown (955 / 1000)

| Test Objective | Score | Test Objective | Score |
|---|:---:|---|:---:|
| **Agent Architecture** | 100% | **Model Selection** | 100% |
| **Agent Construction** | 0% | **Cost/Token Management** | 100% |
| **Agent Patterns** | 100% | **Context Engineering** | 100% |
| **Systems Life Cycle** | 100% | **Prompt Engineering** | 100% |
| **Claude API Mechanics** | 100% | **Output Handling** | 100% |
| **SW Eng Foundations** | 100% | **AI App Security** | 100% |
| **Claude App Design** | 100% | **Hooks** | 100% |
| **Config Management** | 100% | **Identity/Secrets** | 100% |
| **Claude Code Operation** | 100% | **Tool Implementation** | 100% |
| **Debugging** | 100% | **MCP Dev** | 100% |
| **LLM Fundamentals** | 75% | **Agentic Customization** | 100% |
| **Tech Fundamentals** | 100% | | |

---

## 🧠 High-Yield Developer Heuristics

1. **Messages API Strict Role Alternation**:
   * Consecutive messages with the same role (`user` followed by `user`, or `assistant` followed by `assistant`) return an immediate `HTTP 400 Bad Request`. Messages must alternate strictly.
   * The first message in the `messages` array MUST have `role: "user"`.
   * The `system` parameter is a top-level string (or array with cache control), NEVER a role inside the `messages` array.

2. **Tool Calling Mechanics & Flow**:
   * When Claude calls a tool, it halts generation and returns `stop_reason: "tool_use"`.
   * The response contains one or more `tool_use` content blocks with `id`, `name`, and `input`.
   * The client MUST append the assistant message to history and follow with a `user` message containing a `tool_result` block matching each `tool_use_id`.
   * If tool execution fails locally, do not crash: return `tool_result` with `is_error: true` and the error message as content.

3. **Assistant Prefilling For Pure JSON**:
   * To force pure JSON without markdown code fences (` ```json `), prefill the assistant turn with `{`.
   * The API will complete the remaining JSON string starting immediately after `{`.
   * Note: Remember to prepend `{` to the completion text when parsing the result on the client.

4. **Prompt Caching Rules**:
   * Cache breakpoints are declared using `cache_control: {"type": "ephemeral"}` inside content blocks (system prompt, tools, or messages).
   * Maximum 4 cache breakpoints per request.
   * Minimum cacheable tokens: 1,024 tokens for Claude 3.5 Sonnet / Haiku (2,048 for Opus).
   * Cache reads cost 10% of base input price; cache creation costs 125% of base input price.

5. **Stop Reasons vs HTTP Status Codes**:
   * `end_turn`: Natural completion or stop sequence.
   * `max_tokens`: Generation cut off because it hit `max_tokens` (incomplete JSON hazard!).
   * `stop_sequence`: Triggered a custom `stop_sequences` match.
   * `tool_use`: Claude requested one or more tool calls.
   * HTTP 429 (`Rate Limit`) / 529 (`Overloaded`): Retry with exponential backoff and randomized jitter.

---

## 📁 Track Assets

* 📖 **[Domain Study Guides](./study-guide/)**: Comprehensive technical guides with Python & TypeScript code examples.
* ⚡ **[Cheat Sheets](./cheat-sheets/)**: High-yield reference sheets for API payloads, tool lifecycle, and status codes.
* 📽️ **[Slide Deck](./presentation/slides.md)**: Developer review slides for rapid exam prep.
