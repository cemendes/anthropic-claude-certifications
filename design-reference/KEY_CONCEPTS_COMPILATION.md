# 📚 Comprehensive CCAR-F Key Concepts Matrix (100 Questions)

This matrix maps every question in the CCAR-F quiz suite to its explicit **Authoritative Key Concept**, its question stem, and verified correct answer.

---

## Domain 1: Agentic Architecture & Orchestration (Q1 – Q27)

| # | Question Summary | Correct Answer | Authoritative Key Concept |
|---|---|---|---|
| **Q1** | Stop reason `tool_use` returned | **B** (Extract & execute tool locally, return `tool_result`) | **Client-Side Tool Execution and `tool_use` Stop Reason Handling** |
| **Q2** | Formatting tool result back to Claude | **B** (`tool_result` with matching `tool_use_id`) | **Mandatory `tool_use_id` Matching in Tool Result Blocks** |
| **Q3** | Agent in infinite loop calling search tool | **A** (Hard cap on loop iterations) | **Hard Iteration Caps as Circuit Breakers in Agentic Loops** |
| **Q4** | Stop reason `max_tokens` received | **C** (Response reached token limit) | **Differentiating `max_tokens` Truncation from Safety Filters** |
| **Q5** | Two consecutive `user` messages sent | **B** (API rejects with 400 Bad Request) | **Strict Message Role Alternation in Anthropic Messages API** |
| **Q6** | Sequential document processing with gates | **C** (Prompt Chaining) | **Prompt Chaining Pattern for Sequential Subtasks with Intermediate Gates** |
| **Q7** | Triage incoming ticket to specialized flow | **B** (Routing pattern) | **Routing Workflow Pattern for Low-Latency Input Classification** |
| **Q8** | Medical claim verification across 3 models | **A** (Parallelization with voting) | **Parallelization Pattern for Concurrent Verification and Voting** |
| **Q9** | Code generation with iterative critique | **C** (Evaluator-Optimizer) | **Evaluator-Optimizer Feedback Loop for Iterative Artifact Refinement** |
| **Q10** | Dynamically decompose vague request into tasks | **A** (Orchestrator-Workers) | **Orchestrator-Workers Architecture for Dynamic Task Decomposition** |
| **Q11** | Drive-thru ordering with minimal drift | **B** (Deterministic State Machine) | **Deterministic State Machines vs Autonomous Agentic Loops** |
| **Q12** | Autonomous debugging loop prevention | **A** (Recursion depth & step limit) | **Architectural Recursion and Step Limits in Open-Ended Agent Loops** |
| **Q13** | Multi-turn chat approaching token limit | **A** (Token budget & history compaction) | **Context Window Token Budgeting and History Compaction** |
| **Q14** | Payroll calculation architecture choice | **B** (Deterministic state pipeline) | **Deterministic Pipelines vs Autonomous Swarms for Rigid Workflows** |
| **Q15** | Agent consuming tokens excessively | **A** (Orchestrator cost circuit breaker) | **Programmatic Cost and Token Circuit Breakers in Orchestrator Loops** |
| **Q16** | 3 subagents sharing raw history anti-pattern | **B** (Context isolation with summary handover) | **Context Isolation and Sanitized Handover in Multi-Agent Systems** |
| **Q17** | Research agent delegating to code agent | **A** (Explicit handoff protocol & completion signal) | **Explicit Handoff Protocols and Completion Signals between Subagents** |
| **Q18** | Subagent invoking wrong tools | **C** (Tool scoping + role prompt isolation) | **Granular Tool Scoping and Role-Prompt Isolation in Multi-Agent Design** |
| **Q19** | Support agent transferring to billing agent | **B** (Sanitized state boundary) | **Data Filtering and Sanitized State Boundaries across Subagents** |
| **Q20** | Writer agent generating, Supervisor reviewing | **B** (Evaluator-Optimizer) | **Identifying Evaluator-Optimizer Workflows with Supervisor Critique** |
| **Q21** | Validate coordinates before tool execution | **B** (`before_tool_call` hook) | **Pre-Execution Hooks (`before_tool_call`) for Input Validation Guardrails** |
| **Q22** | Truncate database blob before returning to LLM | **A** (`after_tool_call` hook) | **Post-Execution Hooks (`after_tool_call`) for Truncating Bulky Tool Outputs** |
| **Q23** | Auditing latency and tool frequency non-invasively | **B** (Telemetry hooks in orchestrator) | **Decoupling Observability and Telemetry Hooks from Agent Reasoning** |
| **Q24** | Shipping API timeout handling | **A** (Error interceptor with `is_error: true`) | **Resilient Tool Error Handling via `tool_result` with `is_error: true`** |
| **Q25** | Server reboot command requiring admin approval | **B** (Human-in-the-loop escalation gate) | **Human-in-the-Loop (HITL) Application Escalation Gates for High-Risk Actions** |
| **Q26** | Human rejects refund amount with feedback | **A** (Inject feedback as `tool_result`) | **Injecting Human Feedback as `tool_result` Blocks in Active Agent Loops** |
| **Q27** | Fraud detection escalation to human agent | **B** (Deterministic programmatic handoff) | **Deterministic Policy-Based Fallback to Human Support Agents** |

---

## Domain 2: Claude Code Configuration & Workflows (Q28 – Q47)

| # | Question Summary | Correct Answer | Authoritative Key Concept |
|---|---|---|---|
| **Q28** | Global vs project-level `CLAUDE.md` precedence | **B** (Project `./CLAUDE.md` takes precedence) | **Project-Level (`./CLAUDE.md`) vs Global (`~/.claude/CLAUDE.md`) Precedence** |
| **Q29** | Monorepo config with shared + service rules | **B** (Root `CLAUDE.md` + subdirectory `CLAUDE.md`) | **Monorepo Root and Subdirectory Scoped `CLAUDE.md` Hierarchy** |
| **Q30** | Modularize 600-line `CLAUDE.md` in mobile team | **A** (Subdirectory `CLAUDE.md` hierarchy) | **Subdirectory Modularization for Scoped Team Rules** |
| **Q31** | Global JS config vs local TS config conflict | **C** (Generates TypeScript due to local override) | **Local Directory Override Precedence over Global User Configuration** |
| **Q32** | Scoped deployment rules in script subfolder | **A** (`scripts/deploy/CLAUDE.md`) | **Scoped Directory Conventions in Script Subtrees (`scripts/deploy/CLAUDE.md`)** |
| **Q33** | Optimization threshold for `CLAUDE.md` length | **B** (Keep under 200–300 lines; use tool discovery) | **Concise `CLAUDE.md` Design (<200-300 lines) with Tool-Discovery Focus** |
| **Q34** | What belongs in `CLAUDE.md` | **C** (Build/test commands, architecture guidelines) | **Core Contents of `CLAUDE.md`: Essential Commands and Architecture Rules** |
| **Q35** | Different rules for state vs styles without monolith | **B** (Subdirectory `CLAUDE.md` files) | **Subdirectory Scoping to Prevent Monolithic 500+ Line `CLAUDE.md` Files** |
| **Q36** | Ensure Claude runs tests and checks build | **A** (Document commands explicitly in `CLAUDE.md`) | **Documenting Prerequisite Build and Test Commands in `CLAUDE.md`** |
| **Q37** | Compress context in long session | **B** (`/compact` command) | **Context Compression and Token Recovery with the `/compact` Command** |
| **Q38** | Create custom slash command `/daily-check` | **B** (Markdown file in `.claude/commands/` or `.claude/skills/`) | **Custom Slash Commands and Skills in `.claude/commands/` and `.claude/skills/`** |
| **Q39** | Initialize `CLAUDE.md` on legacy repo | **B** (`/init` command) | **Bootstrapping Initial Project Context with the `/init` Command** |
| **Q40** | Reset session context completely | **C** (`/clear` command) | **Resetting Active Session Context with the `/clear` Command** |
| **Q41** | Combine command execution with prompt | **B** (Chain slash command with natural language) | **Chaining Custom Slash Commands with Contextual Natural Language** |
| **Q42** | Claude asking for permission before `rm` | **B** (Interactive permission prompt) | **Interactive Tool Permission Model and Sensitive Action Prompting** |
| **Q43** | GitHub Actions hanging on user prompt | **A** (`--dangerously-skip-permissions` flag) | **Non-Interactive Automated Execution with `--dangerously-skip-permissions` in CI/CD** |
| **Q44** | Allow `git diff` but prompt on `git push` | **B** (`permissions.allow` in `settings.json`) | **Granular Tool Whitelisting in `settings.json` (`permissions.allow`)** |
| **Q45** | Prevent Claude from reading `.env.local` | **C** (Add to `.claudeignore`) | **Preventing Accidental Secret Ingestion via `.claudeignore`** |
| **Q46** | Run Claude non-interactively in bash script | **B** (`claude -p` / `--print`) | **Headless Script Integration using `claude -p` (`--print`)** |
| **Q47** | Output Claude Code results as JSON | **A** (`--output-format json`) | **Structured Machine-Readable Output using `--output-format json`** |

---

## Domain 3: Prompt Engineering & Structured Output (Q48 – Q67)

| # | Question Summary | Correct Answer | Authoritative Key Concept |
|---|---|---|---|
| **Q48** | Distinguish email content from instructions | **A** (Wrap user email in `<email>` XML tags) | **XML Tag Demarcation for Rigid Separation of Data and Instructions** |
| **Q49** | Prevent hallucinations in quote extraction | **B** (Prompt model to extract verbatim quotes first) | **Verbatim Quote Grounding to Eliminate Extraction Hallucinations** |
| **Q50** | Ensure deterministic JSON output format | **D** (Assistant prefill `{` or force tool use) | **Prefilling Assistant Messages and Tool Forcing for Structured Output** |
| **Q51** | Restrict category output to 3 valid strings | **B** (JSON Schema `enum` in tool definition) | **Schema-Level `enum` Constraints for Deterministic Value Enforcement** |
| **Q52** | Model jumping to conclusions on complex contract | **B** (Chain-of-Thought via `<thinking>` tags) | **Chain-of-Thought Reasoning via `<thinking>` Tags for Complex Analysis** |
| **Q53** | Agent invoking tools prematurely without log analysis | **B** (Output analysis in `<thinking>` before tool call) | **Enforcing Pre-Invocation Error Log Analysis with `<thinking>` Blocks** |
| **Q54** | Model skipping risk severity before JSON output | **A** (Step-by-step assessment in `<scratchpad>`) | **Dedicated Scratchpad Blocks for Step-by-Step Risk Evaluation before JSON** |
| **Q55** | Verify employee ID and dates before tool call | **B** (Output `<verification>` block before tool) | **Articulated Verification Blocks prior to Executing State-Modifying Tools** |
| **Q56** | Deepen architectural threat modeling analysis | **B** (Step-by-step reasoning in `<thinking>` tags) | **Deepening Threat Modeling via Chain-of-Thought Deliberation** |
| **Q57** | Eliminate conversational filler ("Here is the array") | **A** (Prefill assistant response with `[`) | **Assistant Response Prefilling (`[`) to Suppress Conversational Filler** |
| **Q58** | Force model to always use specific tool | **B** (`tool_choice: {"type": "tool", "name": "..."}`) | **Enforcing Exact JSON Output via `tool_choice` Schema Forcing** |
| **Q59** | Restrict status output to specific values | **B** (JSON schema `enum` in tool definition) | **Constraining Parameter Diversity with Schema `enum` vs Sampling Parameters** |
| **Q60** | Prefilling `{` vs tool forcing for complex schemas | **A** (Tool forcing provides schema validation) | **Comparison of Assistant Prefilling vs Tool Forcing for Complex Schemas** |
| **Q61** | Extracting data into JSON via Anthropic API | **A** (Tool use with JSON schema) | **Anthropic API JSON Extraction Mechanics (Tool Use vs OpenAI JSON Mode)** |
| **Q62** | Few-shot prompt failing on messy real-world data | **B** (Include messy, edge-case demonstrations) | **Few-Shot Example Distribution Balance with Representative Edge Cases** |
| **Q63** | Few-shot examples for malformed receipts | **B** (Include examples of missing and malformed fields) | **Demonstrating Malformed and Missing Field Handling in Few-Shot Examples** |
| **Q64** | Format drifting over 20-example batch | **A** (Consistent formatting across all examples) | **Maintaining Schema Stability Across Long-Context Few-Shot Batches** |
| **Q65** | Explaining format errors in few-shot prompt | **B** (Show correct demonstrations instead of negative rules) | **Avoiding Negative Demonstration Traps in Few-Shot Prompt Design** |
| **Q66** | Handling Pydantic validation failure | **A** (Append validation error and prompt retry) | **Pydantic Validation-Retry Loops with Injected Parser Errors** |
| **Q67** | Bounded retry loop on invalid JSON | **B** (Inject specific parser error with 3-retry cap) | **Bounded Retry Loops with Targeted Error Feedback for Malformed JSON** |

---

## Domain 4: Tool Design & MCP Integration (Q68 – Q85)

| # | Question Summary | Correct Answer | Authoritative Key Concept |
|---|---|---|---|
| **Q68** | Expose read-only wiki pages in MCP | **B** (MCP Resources) | **MCP Resources Primitive for Passive Read-Only Context Retrieval** |
| **Q69** | Tool used with invalid argument format | **B** (Return `is_error: true` with descriptive feedback) | **Structured Error Propagation in MCP Tools using `is_error: true`** |
| **Q70** | Local CLI vs remote microservice transports | **A** (`stdio` for local, `SSE` for remote) | **MCP Protocol Transports: `stdio` for Local and `SSE` for Remote Servers** |
| **Q71** | Model confused between `query_user_by_id` & `get_user` | **B** (Consolidate into single tool with clear params) | **Single-Responsibility Tool Design to Prevent Tool Selection Confusion** |
| **Q72** | 50 database tables tool design | **B** (Single `query_database` tool with `table_name` enum) | **Consolidating Multi-Table Queries into Parameterized Tools with Enums** |
| **Q73** | Expose on-demand historical stock prices | **B** (MCP Resources with URIs) | **Exposing On-Demand Historical Data as MCP Resources with URIs** |
| **Q74** | Parameterized user logs endpoint in MCP | **B** (Resource Templates with `uriTemplate`) | **Dynamic Resource Templates (`uriTemplate`) for Parameterized Context** |
| **Q75** | Slash-command template for code review workflow | **C** (MCP Prompts) | **MCP Prompts Primitive for User-Facing Interactive Slash-Command Templates** |
| **Q76** | Model generating invalid ISO dates in tool args | **B** (Detailed parameter description with ISO example) | **Detailed Parameter Descriptions as Prompt Guidance in JSON Schemas** |
| **Q77** | Enforce integer between 1 and 100 in tool schema | **A** (`minimum: 1, maximum: 100` constraints) | **Schema Property Constraints (`minimum`, `maximum`, `pattern`) in Tool Definitions** |
| **Q78** | Similar tools `analyze_text` & `process_text` | **B** (Distinct, semantically specific tool names) | **Distinct Semantic Tool Naming to Prevent Model Selection Ambiguity** |
| **Q79** | Multi-action tool hallucinating intermediate state | **A** (Split into atomic, single-responsibility tools) | **Scoping Tools to Single Operations to Avoid Multi-Action Hallucinations** |
| **Q80** | Compiler error in code execution tool | **A** (Return compiler stderr in `tool_result`) | **Actionable Compiler/Error Feedback in Tool Results for Self-Correction** |
| **Q81** | External API returning 500 error in infinite retry | **A** (Return `is_error: true` instructing model to stop) | **Breaking External API 500 Failure Loops with Explicit Non-Retry Guidance** |
| **Q82** | Tool throwing `FileNotFoundError` crashing app | **A** (Catch exception and format as `tool_result` error) | **Catching Tool Runtime Exceptions and Formatting into Structured `tool_result`** |
| **Q83** | Database query returning SQL syntax error | **A** (Return SQL error message in `tool_result`) | **Returning Specific Exception Details in Tool Results to Aid Recovery** |
| **Q84** | Prevent path traversal (`../../etc/passwd`) in tool | **B** (Sanitize path against allowed root directory) | **MCP Security Sandboxing and Path Sanitization for Local Filesystems** |
| **Q85** | Secure remote MCP server deployment | **A** (SSE over HTTPS with Bearer token authentication) | **Authentication and TLS Transport Security for Remote MCP SSE Servers** |

---

## Domain 5: Context Management & Reliability (Q86 – Q100)

| # | Question Summary | Correct Answer | Authoritative Key Concept |
|---|---|---|---|
| **Q86** | 0% cache hit rate with dynamic timestamp at start | **A** (Timestamp at start breaks cache prefix) | **Exact Prefix Matching Requirement for Anthropic Prompt Caching** |
| **Q87** | 150k token support chat latency spike | **B** (Summarize older turns, keep recent verbatim) | **Context Compaction via Periodic Multi-Turn History Summarization** |
| **Q88** | Orchestrator passing 100k tokens to subagent | **B** (Payload isolation with task-specific extract) | **Payload Isolation Principle for Subagent Context Management** |
| **Q89** | High-volume ticket classification + complex draft | **C** (Haiku for triage, Sonnet for drafting) | **Model Tiering: Haiku for High-Speed Triage, Sonnet for Complex Execution** |
| **Q90** | Cache 50k token document queried multiple times | **B** (`cache_control: {"type": "ephemeral"}` on doc) | **Applying `cache_control` Breakpoints on Large Documents** |
| **Q91** | Context compaction keeping system instructions | **B** (Summarize history, pin system prompt & summary) | **Context Window Compaction with Pinned System Rules and Summary State** |
| **Q92** | Multi-step agent context bloat from old tool logs | **A** (Prune/truncate intermediate past tool results) | **Pruning Bulky Past Tool Results to Free Context Space in Long Conversations** |
| **Q93** | Retain initial project goals across 50 turns | **B** (Sliding window with pinned initial turns) | **Sliding Window with Pinned Initial Turns for Retaining Core Mission Directives** |
| **Q94** | Routing customer small talk to finance subagent | **B** (Extract only financial payload for subagent) | **Synthesizing Isolated Task Payloads for Delegated Subagent Execution** |
| **Q95** | High-traffic triage + Python coding + report | **B** (Haiku classification, Sonnet coding/report) | **Three-Tier Routing: Haiku Classification, Sonnet Coding, Opus Deep Synthesis** |
| **Q96** | Contradiction analysis across 20 biology papers | **C** (Claude 3 Opus for deep open-ended synthesis) | **Leveraging Claude 3 Opus for Open-Ended Synthesis and Contradiction Analysis** |
| **Q97** | Dynamic cost reduction for simple format edits | **B** (Classifier frontend routing simple tasks to Haiku) | **Dynamic Complexity Routing using Heuristic / Haiku Classifier Frontends** |
| **Q98** | Enterprise search summaries lacking trust | **B** (Verbatim quotes and source citations `[Doc 3]`) | **Establishing High Provenance and Auditability with Verbatim Source Citations** |
| **Q99** | RAG accuracy evaluation at scale | **B** (Golden dataset + LLM-as-a-judge) | **LLM-as-a-Judge Evaluation Framework with Golden Test Sets for RAG Pipelines** |
| **Q100** | Mitigate prompt injection in scraped web data | **A** (XML tag demarcation with strict data rules) | **Mitigating Indirect Prompt Injection using Strict XML Boundary Encapsulation** |
