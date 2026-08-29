# ⚡ Cheat Sheet: MCP Primitives & Transports

---

## 1. The Three MCP Primitives

| Primitive | Triggered By | Control Model | Example URI / Name | Primary Use Case |
|---|---|---|---|---|
| **Tools** | Model (Autonomous) | Client allows / asks | `search_database`, `execute_bash` | Actions with external side-effects or computations. |
| **Resources** | Host / Application | Application injects | `file:///var/log/syslog`, `postgres://users/42` | Passive read-only contextual data. |
| **Prompts** | User (Interactive) | User invokes | `review_code`, `generate_summary` | Reusable workflow templates and slash commands. |

---

## 2. Dynamic Resource Templates (`uriTemplate`)
Servers can expose parameterized dynamic data paths using RFC 6570 URI templates:

```json
{
  "uriTemplate": "db://customers/{customer_id}/orders",
  "name": "Customer Orders",
  "mimeType": "application/json"
}
```

---

## 3. MCP Transports Comparison

| Transport | Communication Medium | Use Case | Security Considerations |
|---|---|---|---|
| **`stdio`** | Standard Input / Output processes | Local CLI tools & local servers running on same machine as Host | Sandboxing local process access, path sanitization against directory traversal (`../../`). |
| **`SSE`** | Server-Sent Events over HTTP/HTTPS | Remote cloud microservices, shared enterprise servers | Mandatory TLS (HTTPS), Bearer token authentication, rate limiting, and network isolation. |

---

## 4. MCP Error Handling Checklist
* [x] Tools must catch local runtime exceptions (`FileNotFoundError`, `TimeoutError`, `DatabaseSyntaxError`).
* [x] Return error payload inside `tool_result` content block with `"is_error": true`.
* [x] Provide actionable feedback explaining *why* it failed so Claude can self-correct.
