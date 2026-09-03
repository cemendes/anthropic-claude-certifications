---
marp: true
theme: default
paginate: true
header: '🎓 Claude Certified Architect: Professional (CCAR-P) Master Review'
footer: 'Anthropic Claude Certifications Hub'
---

# 🎓 Claude Certified Architect: Professional (CCAR-P)
## Enterprise Architecture, Multi-Cloud & Swarm Governance

**Presenter**: Eduardo Mendes
**Track**: Professional Level Architecture (CCAR-P)

---

# 📊 Exam Overview & Domain Weights

1. **Domain 1**: Enterprise Multi-Agent Swarms & Systems (**25%**)
2. **Domain 2**: Production MCP Architecture & Security (**22%**)
3. **Domain 3**: Multi-Cloud Deployment & Failover Resilience (**20%**)
4. **Domain 4**: Enterprise Governance, Privacy & Security (**18%**)
5. **Domain 5**: Evals-as-Code & Continuous Observability (**15%**)

**Passing Score**: 720 / 1000 (60 Questions, 120 Minutes)

---

# 🐝 Enterprise Multi-Agent Swarms

* **Circuit Breakers**: Monotonic recursion counters, max depth limits ($\le 5$), strict token budgets per session.
* **Context Isolation**: Never pass raw scratchpads between agents. Sanitize state into structured schemas.
* **Consensus Mechanisms**: Peer-to-peer voting with odd-numbered quorums ($3/5$) for high-stakes audits.

---

# 🌐 Production MCP over SSE

* **Local `stdio`** vs **Distributed `sse`**:
  * Production requires HTTP POST + SSE for remote microservices.
* **Security Framework**:
  * OAuth 2.0 / JWT Bearer token authentication at API Gateway.
  * mTLS for zero-trust VPC service communication.
  * Granular RBAC tool permission mapping.

---

# ☁️ Multi-Cloud Resilience Matrix

* **Active-Active Routing**:
  * Anthropic Direct API $\longleftrightarrow$ GCP Vertex AI $\longleftrightarrow$ AWS Bedrock.
* **Authentication Differences**:
  * Direct: `x-api-key`
  * GCP: ADC / Service Account OAuth 2.0
  * AWS: IAM SigV4
* **Private Connectivity**:
  * GCP Private Service Connect (PSC) & AWS PrivateLink.

---

# 🔒 Enterprise Governance & ZDR

* **Zero Data Retention (ZDR)**:
  * Eliminates gateway transient log retention for strict regulatory compliance.
* **Defense-in-Depth against Injection**:
  * Edge classifier screening (Haiku).
  * XML encapsulation (`<external_untrusted_data>`).
  * System instruction hierarchy supremacy.
  * Read-only tool execution sandboxing.

---

# 🧪 Evals-as-Code & OpenTelemetry

* **LLM-as-a-Judge Design**:
  * `temperature: 0.0`, calibrated 1-5 scale anchors, mandatory CoT reasoning before score emission.
* **Distributed Observability**:
  * OpenTelemetry tracing across all agent spans and MCP tool executions.
  * Continuous CI/CD regression testing against golden benchmark datasets.
