# 📘 Domain 4: Enterprise Governance, Privacy & Security

**Weight**: 18% | **Exam Questions**: ~11 Questions  
**Core Competencies**: Zero Data Retention (ZDR) agreements, commercial privacy boundaries, PII redaction/DLP interceptors, prompt injection defense-in-depth, audit logging pipelines, VPC service controls & private links.

---

## 1. 🔒 Data Privacy & Zero Data Retention (ZDR)

* **Commercial Terms Guarantee**: Anthropic does **NOT** train its commercial models on customer API data (inputs, outputs, or cache states) by default.
* **Zero Data Retention (ZDR)**: For regulated industries (healthcare HIPAA, finance PCI-DSS, defense), enterprise ZDR contracts ensure that prompt and completion logs are immediately expunged from Anthropic temporary gateway storage upon request completion.

---

## 2. 🛡️ Defense-in-Depth against Prompt Injection

In production environments processing untrusted user data (e.g. emails, scraped webpages, PDF invoices):

1. **Dual-LLM Guardrail Architecture**:
   * An edge classifier (lightweight Haiku model) screens incoming text for jailbreak patterns before sending to the core reasoning model.
2. **XML Isolation Boundaries**:
   * Untrusted external content is strictly wrapped in distinct XML tags (`<external_untrusted_data>`).
   * The system prompt explicitly commands the model to treat content within these tags as passive data, never executable instructions.
3. **Execution Sandboxing**:
   * Any code generated or tools invoked run in ephemeral, isolated network sandboxes without egress to internal production databases.
