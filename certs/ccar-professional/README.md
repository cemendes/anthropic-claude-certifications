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

## 🎯 Exam Structure & Official Score

* **Format**: 60 Scenario-based Questions (Multiple-Choice and **Tri-Category Classification/Sorting**).
* **Time Limit**: 120 Minutes (~2 minutes per question).
* **Scoring Scale**: Scaled score from **100 to 1000**.
* **Passing Score**: **720 / 1000** (equivalent to ~43/60 questions correct).
* **Official Result**: 🟢 **PASSED — Score: 836 / 1000** (September 6, 2026).
* **Delivery**: Online proctored.

---

## 📈 Official Score Breakdown (836 / 1000)

### 🌟 100% Mastery Objectives (22 Areas):
* Translate business problems into Claude-based AI solutions (100%)
* Design end-to-end architectures (input → processing → output → feedback loops) (100%)
* Select appropriate architectural patterns (workflow, agentic, augmented LLM) (100%)
* Apply decomposition techniques for complex problem solving (100%)
* Align solutions to business value pillars (efficiency, transformation, productivity, cost, SLAs) (100%)
* Select appropriate Claude models based on trade-offs (100%)
* Implement prompt reuse strategies (e.g., caching, modular prompts) (100%)
* Analyze authentication and authorization requirements to identify security gaps (100%)
* Analyze observability challenges and select monitoring strategies at scale (100%)
* Apply retrieval strategies matched to data shape and query pattern (100%)
* Define evaluation metrics (accuracy, latency, cost, safety, security) (100%)
* Design evaluation datasets and test frameworks using a mix of testing methodologies (100%)
* Conduct A/B testing and iterative improvements (100%)
* Diagnose system issues (prompt failure, hallucinations, model mismatch) (100%)
* Optimize token usage, latency, and cost-performance trade-offs (100%)
* Monitor system performance using logging and observability tools (100%)
* Address ethical AI considerations (bias, fairness, transparency) (100%)
* Communicate architectural decisions and trade-offs (100%)
* Document architectures and provide implementation guidance (100%)
* Support lifecycle phases (discovery, design, handoff, monitoring, iteration) (100%)
* Configure Claude tools and environments for teams (e.g., Claude Code) (100%)
* Improve developer workflows using AI-assisted tooling (100%)

---

## 💡 Candidate Exam Dynamics & Pacing Insights

1. **Nuance Density & Tricky Distractors**:
   * Highest nuance of all 4 exams. Questions are less verbose than Foundations, but choices feature razor-thin distinctions where multiple options look ~90% plausible.
2. **New Question Modality — Tri-Category Classification**:
   * Features classification questions where items must be sorted into three architectural categories (e.g., Workflow vs. Autonomous Agent vs. Augmented LLM).
3. **Pacing Recommendation**:
   * Answering all questions left only 16 minutes on the clock, which proved insufficient to review all flagged questions.
   * **Rule of Thumb**: Commit decisively on the first pass; flag only $\le 5$ items with high uncertainty.
4. **Preparation Resources**:
   * Google Internal GenAI Architect Enablement.
   * Anthropic Official Architecture Documentation.
   * [Udemy CCAR-P Exam Prep Course](https://www.udemy.com/course/ccar-p-exam-prep/).

---

## 📁 Track Assets

* 📖 **[Domain Study Guides](./study-guide/)**: In-depth architectural deep dives for all 5 enterprise domains.
* ⚡ **[Cheat Sheets](./cheat-sheets/)**: Quick reference tables for multi-cloud parity, MCP security, and agent governance.
* 📽️ **[Slide Deck](./presentation/slides.md)**: Professional review presentation for team leads and architects.
* 🕹️ **[Interactive Quiz Simulator](../../certs/ccar-foundations/quiz/)**: Multi-track practice engine deployed on GitHub Pages.
