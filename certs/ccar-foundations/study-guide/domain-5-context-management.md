# Domain 5: Context Management & Reliability (15% Exam Weight)

## Core Competencies
* Mastering Anthropic Prompt Caching (`cache_control`, prefix matching, token thresholds, TTL).
* Implementing context compaction strategies (history summarization, tool pruning, sliding windows).
* Designing multi-tier model routing (Claude 3.5 Haiku $\rightarrow$ Claude 3.7 Sonnet $\rightarrow$ Claude 3 Opus).
* Managing multi-agent payload isolation to prevent context bloat.
* Establishing high provenance attribution with source citations.
* Evaluating production RAG pipelines using LLM-as-a-Judge and golden test sets.

---

## 1. Anthropic Prompt Caching Mechanics

Anthropic Prompt Caching allows developers to cache frequently reused prompt prefixes, reducing cost by up to 90% and latency by up to 85%.

```
[System Prompt & Tools]  -->  [cache_control: ephemeral]  -->  [Dynamic User Message]
  ▲ (Cached Prefix: >= 1024 tokens)                                ▲ (Not cached)
```

### Critical Caching Rules:
1. **Exact Prefix Match**: Caching works strictly on exact byte/token prefix matching. If even 1 token changes early in the prompt (e.g. a dynamic timestamp placed at the top of the system prompt), the entire cache prefix is invalidated.
2. **Token Minimums**:
   * **Claude 3.5 Sonnet / Haiku**: Minimum **1,024 tokens**.
   * **Claude 3 Opus**: Minimum **2,048 tokens**.
3. **Time-to-Live (TTL)**: 5-minute cache lifespan, automatically refreshed upon each cache hit.
4. **Placement**: Add `"cache_control": {"type": "ephemeral"}` to the last content block of the static prefix.

```python
# Enabling prompt caching on a large static reference document
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=2048,
    system=[
        {
            "type": "text",
            "text": large_static_documentation,
            "cache_control": {"type": "ephemeral"}  # Breakpoint
        }
    ],
    messages=conversation_turns
)
```

---

## 2. Context Compaction & Multi-Turn History Management

As conversations grow toward context limits, latency increases and needle-in-a-haystack recall degrades.

### Three Compaction Strategies:
1. **Periodic Summarization**: When history reaches a token threshold (e.g., 50k tokens), an LLM generates a structured summary of older turns. Replace old turns with the summary block while preserving recent turns verbatim.
2. **Tool Result Pruning**: Intermediate tool outputs (e.g., a 15,000-character JSON payload from 5 turns ago) can be truncated or replaced with a concise status confirmation once the model has extracted the required facts.
3. **Sliding Windows with Pinned Directives**: Maintain a rolling window of recent turns while permanently pinning initial user directives and system constraints at the prompt head.

---

## 3. Model Tiering & Cost Routing

| Model Tier | Strengths & Capabilities | Best Use Cases |
|---|---|---|
| **Claude 3.5 Haiku** | Blazing speed, lowest cost, strong tool calling. | High-volume classification, ticket routing, guardrail screening, simple data parsing. |
| **Claude 3.7 Sonnet** | Industry-leading coding, agentic reasoning, tool use. | Production agents, full-stack software development, complex workflow orchestration. |
| **Claude 3 Opus** | Deep philosophical nuance, complex multi-document synthesis. | Open-ended research analysis, contradiction resolution across dozens of papers. |

---

## 4. Production Evaluation & LLM-as-a-Judge

* **Golden Test Sets**: Benchmark datasets containing representative inputs, edge cases, and human-verified expected outputs.
* **LLM-as-a-Judge**: Use an advanced model (e.g., Claude 3.7 Sonnet with extended thinking) with strict grading rubrics to evaluate candidate outputs across dimensions: *Faithfulness*, *Relevance*, *Tone*, and *Completeness*.
* **Provenance & Citations**: Require models to attribute factual claims to specific source indices (`[Source: Doc 2, Section 4]`) to facilitate automated verification.
