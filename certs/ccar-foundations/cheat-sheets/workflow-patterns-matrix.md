# ⚡ Cheat Sheet: Anthropic 5 Workflow Patterns Matrix

A fast-lookup reference for choosing the right architecture pattern for production Claude applications.

---

| Pattern | Definition & Flow | When to Use | Latency / Cost Profile | Key Pitfalls & Traps |
|---|---|---|---|---|
| **Prompt Chaining** | Fixed linear sequence of steps where output of step $N$ feeds step $N+1$. Gates validate output before advancing. | Predictable multi-stage tasks (e.g. Extract $\rightarrow$ Validate $\rightarrow$ Draft $\rightarrow$ Format). | **Moderate Latency** (Sequential LLM calls), **Low Cost**. | Breaking the chain on unhandled exceptions; lack of rollback mechanism. |
| **Routing** | Classifier model categorizes input and directs it to a specialized downstream handler or model tier. | Diverse query types requiring distinct system prompts, tools, or model tiers (e.g. triage). | **Lowest Latency** (Single triage call + target execution), **Lowest Cost**. | Misclassification by under-powered router prompts; overlapping categories. |
| **Parallelization** | Concurrent execution across multiple instances. **Sectioning** (chunk division) or **Voting** (consensus). | Sectioning: long document analysis. Voting: high-stakes review (medical/legal/fraud). | **Low Wall-Clock Time** (Concurrent), **Higher Token Cost** (Redundant runs). | Merging conflicting outputs; excessive cost if voting used on low-stakes queries. |
| **Orchestrator-Workers** | Central orchestrator dynamically decomposes complex goals into subtasks and coordinates workers. | Unpredictable, open-ended tasks where steps cannot be hardcoded (e.g. coding features, deep research). | **Higher Latency & Cost** (Dynamic multi-turn coordination). | Passing full conversation history to workers (context pollution); lack of step budget. |
| **Evaluator-Optimizer** | Iterative feedback loop: Generator creates artifact $\rightarrow$ Evaluator critiques against rubric $\rightarrow$ Loop until criteria met. | Tasks with clear evaluation criteria (e.g. code passing tests, schema compliance, translation accuracy). | **High Latency & Variable Cost** (Iterative loop). | Infinite looping when criteria cannot be satisfied; conflicting feedback between turns. |

---

### Architectural Rule of Thumb
> *"Start with the simplest pattern that solves the problem. Use Prompt Chaining and Routing whenever possible. Reserve Orchestrator-Workers for truly unpredictable tasks."*
