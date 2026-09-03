# 🎓 Certified Claude Architect: Professional (CCAR-P)

The official advanced enterprise study track, blueprint analysis, and production architecture kit for the **Anthropic Certified Claude Architect: Professional (CCAR-P)** exam.

---

## 📊 Exam Blueprint & Domain Weights

| Domain | Domain Title | Exam Weight | Question Count | Core Production Competencies |
|---|---|:---:|:---:|---|
| **Domain 1** | **Enterprise Multi-Agent Swarms & Systems** | **25%** | ~15 questions | Distributed agent orchestration, supervisor-worker hierarchies, cycle detection & circuit breakers, consensus mechanisms, state synchronization across microservices, resilient handoffs under partial node failure. |
| **Domain 2** | **Production MCP Architecture & Security** | **22%** | ~13 questions | Remote MCP over Server-Sent Events (SSE), reverse proxying, authentication & authorization (OAuth 2.0, mTLS, JWT bearer tokens), granular tool permission scoping, rate-limiting & session multiplexing. |
| **Domain 3** | **Multi-Cloud Deployment & Failover Resilience** | **20%** | ~12 questions | Multi-provider architecture across Anthropic First-Party API, Google Cloud Vertex AI, and AWS Bedrock; quota management, feature parity disparities, cross-region active-active routing, automated graceful degradation. |
| **Domain 4** | **Enterprise Governance, Privacy & Security** | **18%** | ~11 questions | Zero Data Retention (ZDR) agreements, commercial privacy boundaries, PII redaction/DLP interceptors, prompt injection defense-in-depth, audit logging pipelines, VPC service controls & private links. |
| **Domain 5** | **Evals-as-Code & Continuous Observability** | **15%** | ~9 questions | Production LLM evaluation pipelines (LLM-as-a-judge), synthetic benchmark generation, OpenTelemetry distributed tracing across agent spans, latency/cost telemetry, deterministic CI/CD regression gates. |

---

## 🎯 Exam Structure & Scoring Model

* **Format**: 60 Scenario-based Multiple-Choice Questions (Single & Multi-Select).
* **Time Limit**: 120 Minutes (~2 minutes per question).
* **Scoring Scale**: Scaled score from **100 to 1000**.
* **Passing Score**: **720 / 1000** (equivalent to ~43/60 questions correct).
* **Delivery**: Online proctored or authorized test center.

---

## 🧠 High-Yield Professional Architectural Heuristics

1. **Enterprise Multi-Agent Consensus & Circuit Breakers**:
   * Never let multi-agent swarms communicate without hard cycle detectors and monotonic counter circuit breakers in the orchestration layer.
   * Multi-agent state handoffs must be sanitized: pass structured artifact summaries, never unbounded raw scratchpad chat histories.

2. **Distributed MCP over SSE vs stdio**:
   * Local `stdio` MCP is strictly for single-user desktop runtimes (e.g. Claude Code, Claude Desktop).
   * Enterprise production requires **MCP over SSE** secured with mTLS or OAuth 2.0 Bearer tokens, fronted by an API Gateway for TLS termination and rate limiting.

3. **Multi-Cloud Portability & Fallback Matrix**:
   * Direct API vs Vertex AI vs Bedrock differ in parameter names, streaming chunks, and prompt caching availability.
   * Design provider-agnostic abstractions at the orchestration boundary to fail over instantly when encountering regional 529/429 spikes.

4. **Zero Data Retention (ZDR) & Enterprise Boundaries**:
   * Understand that commercial Anthropic API and cloud provider endpoints (Vertex/Bedrock) do not train on customer inputs by default.
   * Regulatory compliance often requires customer-managed encryption keys (CMEK) and VPC Private Service Connect (PSC) / PrivateLink.

5. **Production Evals & LLM-as-a-Judge Calibration**:
   * Evals must use deterministic temperature (`0.0`), few-shot rubric anchoring, and mandatory Chain-of-Thought reasoning steps before scoring.
   * Continuous canary deployments compare live distributions against golden evaluation sets using OpenTelemetry spans.

---

## 📁 Track Assets

* 📖 **[Domain Study Guides](./study-guide/)**: In-depth architectural deep dives for all 5 enterprise domains.
* ⚡ **[Cheat Sheets](./cheat-sheets/)**: Quick reference tables for multi-cloud parity, MCP security, and agent governance.
* 📽️ **[Slide Deck](./presentation/slides.md)**: Professional review presentation for team leads and architects.
* 🕹️ **[Interactive Quiz Simulator](../../certs/ccar-foundations/quiz/)**: Exam simulation mode with professional scenario questions.
