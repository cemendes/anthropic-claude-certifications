# 📘 Domain 5: Evals-as-Code & Continuous Observability

**Weight**: 15% | **Exam Questions**: ~9 Questions  
**Core Competencies**: Production LLM evaluation pipelines (LLM-as-a-judge), synthetic benchmark generation, OpenTelemetry distributed tracing across agent spans, latency/cost telemetry, deterministic CI/CD regression gates.

---

## 1. 🧪 Production Evals-as-Code

Prompts and model configurations are enterprise software code. Changing a system prompt or upgrading from Sonnet 3.5 to Opus requires deterministic CI/CD regression validation:

```
[PR Opened] ➡️ [Run 200 Golden Benchmarks] ➡️ [LLM-as-a-Judge Scoring] ➡️ [Pass >= 95%?] ➡️ [Deploy Canary]
```

### Rubric Calibration Rules:
1. **Temperature 0.0**: Judges must run deterministically.
2. **Explicit 1-5 Score Anchors**: Every rating point must have concrete definitions and negative/positive counterexamples.
3. **Mandatory CoT Reasoning**: The judge must write out its critique in `<evaluation_scratchpad>` before emitting the final score.

---

## 2. 🔭 OpenTelemetry Tracing for Agentic Spans

In complex multi-agent swarms, tracking where latency and money are spent requires distributed tracing:

```
Trace: user_support_workflow [1420ms, $0.042]
├── Span: router_agent [220ms, $0.003]
├── Span: mcp_customer_db_lookup [85ms]
├── Span: solution_generation [950ms, $0.038]
└── Span: compliance_audit_agent [165ms, $0.001]
```
