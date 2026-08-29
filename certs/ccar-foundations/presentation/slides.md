---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #131315
color: #E6E0EA
style: |
  section {
    font-family: 'Inter', sans-serif;
  }
  h1, h2, h3 {
    color: #B5C8DF;
  }
  code {
    background-color: #1F2021;
    color: #CEBDFF;
  }
  a {
    color: #6B4FBB;
  }
---

# Certified Claude Architect: Foundations
## Architectural Mastery & CCAR-F Preparation Kit

**Eduardo Mendes**  
Customer Engineer @ Google  
*Anthropic Claude Architecture Series*

---

# Agenda

1. **The Anthropic Architectural Paradigm**
2. **Anthropic's 5 Core Workflow Patterns**
3. **Claude Code Memory, Workflows & Permissions**
4. **Prompt Engineering & Extended Thinking**
5. **Model Context Protocol (MCP) Integration**
6. **Prompt Caching & Reliability at Scale**
7. **Exam Strategy & Heuristics**

---

# The Anthropic Architectural Paradigm

* **Building Effective Agents Principle**:
  * *"Start with simple prompts, optimize with evaluation, and add complexity only when demonstrably needed."*
* **Determinism vs Autonomy**:
  * Use deterministic state machines for structured, compliance-heavy business logic.
  * Reserve autonomous agentic loops for open-ended, unpredictable task spaces.

---

# The Agentic Loop Mechanics

* **`stop_reason: "tool_use"`**: Model pauses generation; waits for client-side tool execution.
* **`tool_use_id` Matching**: Every `tool_result` must strictly match the triggering `tool_use.id`.
* **Strict Turn Alternation**: `user` $\leftrightarrow$ `assistant`. Sending two consecutive `user` turns causes an `HTTP 400 Bad Request`.
* **Circuit Breakers**: Always enforce maximum loop iteration caps (`MAX_STEPS = 10`) in code.

---

# Anthropic's 5 Workflow Patterns

1. **Prompt Chaining**: Sequential steps with intermediate quality validation gates.
2. **Routing**: Classifies input and dispatches to specialized prompts or model tiers.
3. **Parallelization**: Concurrently fans out tasks (Sectioning) or aggregates consensus (Voting).
4. **Orchestrator-Workers**: Dynamic runtime task decomposition and subagent delegation.
5. **Evaluator-Optimizer**: Generate-and-critique loop against objective evaluation criteria.

---

# Multi-Agent Coordination & Context Isolation

* **Payload Isolation Principle**:
  * Pass only the minimum necessary data to worker subagents.
  * Avoid passing 100k+ conversation histories across boundaries.
* **Handoff Protocols**:
  * Subagents return structured completion payloads to the coordinator.
  * Shared global memory should be avoided in favor of explicit state handovers.

---

# Claude Code Configuration & Hierarchy

* **Precedence Order**:
  `~/.claude/CLAUDE.md` $\rightarrow$ `./CLAUDE.md` $\rightarrow$ `./src/api/CLAUDE.md`
* **Budget**: Keep root `CLAUDE.md` under **200–300 lines**.
* **Permissions**:
  * Whitelist safe commands via `permissions.allow` in `.claude/settings.json`.
  * Protect credentials using `.claudeignore`.

---

# Prompt Engineering & Structured Output

* **XML Tag Demarcation**:
  * Rigidly separates instructions, context, few-shot demonstrations, and user inputs.
* **Quote-First Grounding**:
  * Have Claude extract verbatim quotes into `<quotes>` tags before answering to eliminate RAG hallucinations.
* **Extended Thinking (`<thinking>`)**:
  * Forces deliberate step-by-step reasoning before generating structured JSON.

---

# Model Context Protocol (MCP)

* **Host vs Client vs Server**:
  * Standardized client-server protocol over `stdio` (local) or `SSE` (remote).
* **The 3 Core Primitives**:
  * **Tools**: Active, executable functions with side-effects (model-driven).
  * **Resources**: Passive, read-only data with URI schemes (app-driven).
  * **Prompts**: Reusable interactive slash commands (user-driven).
* **`is_error: true`**:
  * Formats runtime failures so Claude can self-correct instead of crashing.

---

# Context Optimization & Prompt Caching

* **Exact Prefix Matching Rule**:
  * Caches static prompt prefixes (system directives, tool definitions).
  * Dynamic timestamps at the start invalidate the entire cache!
* **Token Thresholds**:
  * Minimum **1,024 tokens** for Claude 3.5 Sonnet / Haiku (2,048 for Opus).
  * 5-minute TTL refreshed on each cache hit.
* **Model Tiering**:
  * **Haiku**: High-speed routing & triage.
  * **Sonnet**: Agentic reasoning & coding.
  * **Opus**: Deep synthesis & contradiction analysis.

---

# Exam Strategy & Next Steps

* **Time Management**: 60 questions in 120 minutes (~2 min/question).
* **Passing Score**: 720 / 1000 (~43/60 correct).
* **Elimination Heuristics**:
  * Reject hope-based prompting ("please be careful") in favor of structural controls.
  * Reject over-engineered autonomous swarms for deterministic tasks.
* **Practice App**:
  * [https://cemendes.github.io/anthropic-claude-certifications/](https://cemendes.github.io/anthropic-claude-certifications/)
