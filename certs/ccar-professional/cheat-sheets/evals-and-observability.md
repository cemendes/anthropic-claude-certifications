# ⚡ Cheat Sheet: Evals-as-Code & OpenTelemetry

## 1. LLM-as-a-Judge Golden Rules
* **Deterministic Sampling**: Always set `temperature: 0.0`.
* **Few-Shot Anchoring**: Include high, medium, and low benchmark examples in the judge prompt.
* **Reasoning Before Scoring**: Force Chain-of-Thought in `<critique>` tags prior to the numeric `<score>`.

## 2. Distributed Tracing Spans
* Each agent turn and tool invocation must emit an OpenTelemetry span with attributes:
  * `gen_ai.system: anthropic`
  * `gen_ai.request.model: claude-3-5-sonnet`
  * `gen_ai.usage.input_tokens`
  * `gen_ai.usage.output_tokens`
  * `gen_ai.usage.cost_usd`
