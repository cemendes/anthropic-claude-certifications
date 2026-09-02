# ⚡ Cheat Sheet: Status Codes, Exceptions & Stop Reasons

## 1. HTTP Status Code Decision Matrix
| Status | Exception Name | Retryable? | Immediate Action |
|:---:|---|:---:|---|
| **400** | `InvalidRequestError` | ❌ No | Fix consecutive roles, add missing required fields, fix JSON. |
| **401** | `AuthenticationError` | ❌ No | Check `ANTHROPIC_API_KEY`. |
| **403** | `PermissionError` | ❌ No | Check account permissions/workspace tier. |
| **404** | `NotFoundError` | ❌ No | Check model string name (e.g. `claude-3-5-sonnet-20241022`). |
| **429** | `RateLimitError` | ✅ **Yes** | Exponential backoff with full jitter. |
| **500** | `InternalServerError`| ✅ **Yes** | Exponential backoff. |
| **529** | `OverloadedError` | ✅ **Yes** | Exponential backoff with randomized jitter. |

## 2. `stop_reason` Interpretation
* `end_turn`: Natural response completion.
* `max_tokens`: Response cut off due to `max_tokens` parameter.
* `tool_use`: Model requested tool execution.
* `stop_sequence`: Met one of `stop_sequences`.
