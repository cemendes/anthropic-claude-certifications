# ⚡ Cheat Sheet: Anthropic Messages API & Stop Reasons

---

## 1. Stop Reason Reference

| Stop Reason Value | What It Means | Action Required by Application Client |
|---|---|---|
| **`"tool_use"`** | Claude wants to call one or more tools. Generation has paused. | Extract `tool_use` blocks, execute them locally, and return results in a `tool_result` content block. |
| **`"end_turn"`** | Claude has completed its natural language response. | Present response to user or terminate agent turn. |
| **`"max_tokens"`** | The model's response hit the `max_tokens` limit and was cut off. | Increase `max_tokens`, prompt model to continue, or compact output constraints. |
| **`"stop_sequence"`** | A custom stop sequence string provided in the request was encountered. | Handle custom delimiter according to application logic. |

---

## 2. API Contract & Turn Alternation Rules

```json
// Valid Conversation Structure
[
  { "role": "user", "content": "Book an appointment for tomorrow." },
  {
    "role": "assistant",
    "content": [
      {
        "type": "tool_use",
        "id": "toolu_01A9Zb246BPx6sA8j",
        "name": "book_appointment",
        "input": { "date": "2026-08-30" }
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "type": "tool_result",
        "tool_use_id": "toolu_01A9Zb246BPx6sA8j",
        "content": "{\"status\": \"confirmed\", \"id\": 987}"
      }
    ]
  }
]
```

### Critical API Rules:
* ⚠️ **Strict Role Alternation**: `user` $\rightarrow$ `assistant` $\rightarrow$ `user` $\rightarrow$ `assistant`. Two consecutive `user` turns return `HTTP 400 Bad Request`.
* ⚠️ **Mandatory `tool_use_id`**: Every `tool_result` must provide the exact ID from the `tool_use` block.
