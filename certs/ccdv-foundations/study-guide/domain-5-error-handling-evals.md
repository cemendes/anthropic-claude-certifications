# 📘 Domain 5: Error Handling, Rate Limits & Evaluation

**Weight**: 15% | **Exam Questions**: ~9 Questions  
**Core Competencies**: Handling API errors & HTTP status codes, exponential backoff with full jitter, inspecting `stop_reason` safety, building deterministic unit tests and prompt evaluations.

---

## 1. 🚦 HTTP Status Codes & Exception Hierarchy

| Status Code | Error Type | Meaning & Recommended Action |
|---|---|---|
| **400** | `invalid_request_error` | Malformed JSON, consecutive same-role messages, missing required fields. **Do not retry** without fixing payload. |
| **401** | `authentication_error` | Missing or invalid `x-api-key`. |
| **403** | `permission_error` | Account suspended or model access restricted. |
| **404** | `not_found_error` | Invalid endpoint or model identifier. |
| **429** | `rate_limit_error` | Requests/min (RPM) or Tokens/min (TPM) limit reached. **Retry with Exponential Backoff**. |
| **500** | `api_error` | Internal server error on Anthropic side. **Retry with Backoff**. |
| **529** | `overloaded_error` | Anthropic infrastructure is temporarily overloaded. **Retry with Backoff + Jitter**. |

---

## 2. 🔁 Robust Retry Strategy (Exponential Backoff + Jitter)

```python
import time
import random
import anthropic

def call_with_retry(client, **kwargs):
    max_retries = 5
    base_delay = 1.0
    
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except (anthropic.RateLimitError, anthropic.InternalServerError, anthropic.APIConnectionError) as e:
            if attempt == max_retries - 1:
                raise e
            
            # Full Jitter Exponential Backoff: sleep between 0 and base_delay * (2 ^ attempt)
            sleep_time = random.uniform(0, base_delay * (2 ** attempt))
            print(f"Transient error: {e}. Retrying in {sleep_time:.2f}s...")
            time.sleep(sleep_time)
```

---

## 3. 🛑 Inspecting `stop_reason`

The `stop_reason` indicates why Claude halted generation:

```python
response = client.messages.create(...)

match response.stop_reason:
    case "end_turn":
        print("Model completed response naturally.")
    case "max_tokens":
        print("WARNING: Generation truncated due to max_tokens limit! Output may be corrupted/incomplete JSON.")
    case "stop_sequence":
        print(f"Halted on matched stop sequence: {response.stop_sequence}")
    case "tool_use":
        print("Model invoked one or more tools.")
```

---

## 4. 🧪 Deterministic Prompt Evals & Unit Testing

To test prompt changes safely in CI/CD without stochastic test failures:
1. Set `temperature: 0.0`.
2. Assert schema conformance using Pydantic or JSON Schema validators.
3. Use model-graded evaluation (LLM-as-a-judge) with rubric criteria:
   - Factuality / Groundedness against reference context.
   - Schema validity (JSON / XML).
   - Strict avoidance of forbidden tokens / negative constraints.
