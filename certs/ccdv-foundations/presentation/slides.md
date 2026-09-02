---
marp: true
theme: default
paginate: true
header: '🎓 Claude Certified Developer: Foundations (CCDV-F) Fast Review'
footer: 'Anthropic Claude Certifications Hub'
---

# 🎓 Claude Certified Developer: Foundations (CCDV-F)
## Technical Exam Review & Blueprint Mastery

**Presenter**: Eduardo Mendes
**Target Audience**: AI Developers, Software Engineers, Solutions Architects

---

# 📊 Exam Breakdown & Domains

* **Domain 1**: Anthropic Messages API & SDKs (**25%**)
* **Domain 2**: Tool Calling & JSON Schemas (**25%**)
* **Domain 3**: Structured Outputs & Advanced Prompting (**20%**)
* **Domain 4**: Prompt Caching & Latency/Cost Optimization (**15%**)
* **Domain 5**: Error Handling, Rate Limits & Evaluation (**15%**)

**Passing Score**: 720 / 1000 (60 Questions, 120 Minutes)

---

# 🛠️ Messages API: Golden Structural Rules

1. **Strict Alternation**: `user` $\leftrightarrow$ `assistant`
   * Consecutive `user`/`user` $\rightarrow$ `HTTP 400 Bad Request`
2. **System Prompt**:
   * Top-level `system` parameter. Never place `{"role": "system"}` in `messages`.
3. **First Message**:
   * Must always begin with `role: "user"`.

---

# 🎛️ Tool Calling Lifecycle & Modes

* **Auto Mode** (`{"type": "auto"}`): Claude chooses whether to call 0, 1, or N tools.
* **Any Mode** (`{"type": "any"}`): Guaranteed tool execution (Claude chooses which).
* **Specific Tool Mode** (`{"type": "tool", "name": "..."}`): Strict single-tool forcing.
* **Handling Errors**:
  * Set `is_error: true` in the `tool_result` content block. Do not crash the application.

---

# 🎯 Structured Output: Assistant Prefilling

* Force pure JSON without markdown fences (` ```json `):
  * Pass `{"role": "assistant", "content": "{"}` as the final message in `messages`.
  * Concatenate `"{"` with `response.content[0].text` on receipt.
* Use **XML tags** (`<data>`, `<instructions>`, `<thinking>`) to isolate untrusted input and extract structured elements.

---

# ⚡ Prompt Caching (Cost & Latency Reduction)

* **Thresholds**:
  * Sonnet 3.5 & Haiku 3.5: Minimum **1,024 tokens**.
  * Opus 3: Minimum **2,048 tokens**.
* **Economics**: Cache creation = $1.25\times$; Cache read = $0.10\times$ (90% discount).
* **TTL**: 5 minutes sliding window.
* **Max Breakpoints**: 4 per API call (`cache_control: {"type": "ephemeral"}`).

---

# 🚦 Error Handling & Resilience

* **Non-Retryable (Fix Code/Payload)**:
  * `400` (Bad Request / Role Alternation)
  * `401` (Auth / Invalid API key)
* **Retryable (Exponential Backoff + Full Jitter)**:
  * `429` (Rate Limits - RPM / TPM)
  * `529` (Overloaded Infrastructure)
* **Stop Reason Safety**:
  * Always verify `response.stop_reason == "end_turn"` before parsing output (watch for `max_tokens` truncation).
