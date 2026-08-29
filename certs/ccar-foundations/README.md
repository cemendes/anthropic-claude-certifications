# 🎓 Certified Claude Architect: Foundations (CCAR-F)

The official study track, blueprint analysis, and preparation kit for the **Anthropic Certified Claude Architect: Foundations (CCAR-F)** exam.

---

## 📊 Exam Blueprint & Weight Distribution

| Domain | Domain Title | Exam Weight | Question Count | Core Competencies |
|---|---|---|---|---|
| **Domain 1** | **Agentic Architecture & Orchestration** | **27%** | ~16 questions | Loop mechanics, stop reasons, 5 workflow patterns, deterministic state machines, multi-agent coordination, SDK hooks, HITL gates |
| **Domain 2** | **Claude Code Configuration & Workflows** | **20%** | ~12 questions | `CLAUDE.md` hierarchy, scoped rules, slash commands (`/init`, `/compact`), permissions, `.claudeignore`, headless execution |
| **Domain 3** | **Prompt Engineering & Structured Output** | **20%** | ~12 questions | XML tags, verbatim quote extraction, `<thinking>` CoT, assistant prefilling, `tool_choice` forcing, few-shot edge cases |
| **Domain 4** | **Tool Design & MCP Integration** | **18%** | ~11 questions | MCP primitives (Tools, Resources, Prompts), URI templates, transports (stdio/SSE), `is_error: true`, parameter schema constraints |
| **Domain 5** | **Context Management & Reliability** | **15%** | ~9 questions | Prompt Caching prefix matching, history summarization, tool pruning, sliding windows, model tiering (Haiku/Sonnet/Opus), LLM-as-a-judge |

---

## 🎯 Exam Structure & Scoring Model

* **Format**: 60 Multiple-Choice Questions (Single & Multi-Select).
* **Time Limit**: 120 Minutes (~2 minutes per question).
* **Scoring Scale**: Scaled score from **100 to 1000**.
* **Passing Score**: **720 / 1000** (equivalent to ~43/60 questions correct).
* **Delivery**: Online proctored or authorized test center.

---

## 🧠 High-Yield Preparation Heuristics

1. **Messages API Strictness**:
   * Consecutive same-role messages (`user` followed by `user`) produce an immediate `HTTP 400 Bad Request`. Messages must alternate `user` $\leftrightarrow$ `assistant`.
   * When Claude returns `stop_reason: "tool_use"`, generation pauses. The client must execute the tool locally and return a `tool_result` content block with the matching `tool_use_id`.

2. **The 5 Anthropic Workflow Patterns**:
   * **Prompt Chaining**: Linear sequential steps where each step validates the prior step before advancing.
   * **Routing**: Classifies an input to direct it to a single specialized prompt/workflow (low latency).
   * **Parallelization**: Concurrently fans out tasks (Sectioning) or runs redundant queries for consensus (Voting).
   * **Orchestrator-Workers**: Dynamic runtime task decomposition for unpredictable, open-ended tasks.
   * **Evaluator-Optimizer**: Generate-and-critique loop where an evaluator provides feedback until quality criteria are met.

3. **Prompt Caching Exact Prefix Rule**:
   * Cache matches the exact byte/token prefix. Putting dynamic variables (like timestamps) before static prompts breaks cache for the entire prompt.
   * Minimum cacheable tokens: 1,024 tokens for Sonnet/Haiku (2,048 for Opus). 5-minute TTL refreshed on each cache hit.

4. **MCP Primitives**:
   * **Resources**: Read-only, application-controlled, URI-based passive context.
   * **Tools**: Executable functions with side-effects, invoked by the model.
   * **Prompts**: Reusable prompt templates and user slash commands.

---

## 📁 Track Assets

* 📖 **[Domain Study Guides](./study-guide/)**: Comprehensive architectural deep dives for all 5 domains.
* ⚡ **[Cheat Sheets](./cheat-sheets/)**: Quick reference tables for rapid revision.
* 📽️ **[Slide Deck](./presentation/slides.md)**: Technical presentation for team talks and review sessions.
* 🕹️ **[Interactive Quiz App](https://cemendes.github.io/anthropic-claude-certifications/)**: 100 questions with full explanations.
