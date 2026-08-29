# Domain 4: Tool Design & MCP Integration (18% Exam Weight)

## Core Competencies
* Understanding the Model Context Protocol (MCP) architecture: Host vs Client vs Server.
* Differentiating MCP Primitives: **Tools**, **Resources**, and **Prompts**.
* Selecting appropriate MCP transports (`stdio` vs `SSE`).
* Authoring robust JSON Schemas with semantic descriptions and property constraints.
* Implementing structured error handling with `is_error: true`.
* Hardening MCP transport security and filesystem sandboxing.

---

## 1. MCP Architectural Roles

```
┌─────────────────────────────────────────────────────────────┐
│                          MCP HOST                           │
│  (e.g., Claude Desktop, Claude Code, Custom Agent Engine)   │
│                                                             │
│  ┌─────────────────────────┐     ┌───────────────────────┐  │
│  │       MCP Client 1      │     │      MCP Client 2     │  │
│  └────────────┬────────────┘     └───────────┬───────────┘  │
└───────────────┼──────────────────────────────┼──────────────┘
                │ (stdio transport)            │ (SSE over HTTPS)
                ▼                              ▼
      ┌──────────────────┐           ┌──────────────────┐
      │ Local MCP Server │           │ Remote MCP Server│
      │  (Filesystem/DB) │           │ (Cloud API / SaaS)
      └──────────────────┘           └──────────────────┘
```

* **Host**: The AI application that orchestrates conversations and manages client connections.
* **Client**: An entity within the host maintaining a 1:1 connection with an MCP server.
* **Server**: A lightweight program exposing capabilities through standardized MCP primitives.

---

## 2. The Three MCP Primitives

| Primitive | Nature | Driven By | Primary Purpose |
|---|---|---|---|
| **Tools** | Active (Model-Controlled) | Model | Executable functions with side-effects or dynamic calculations (e.g. `execute_query`, `send_email`). |
| **Resources** | Passive (Application-Controlled) | Host / App | Read-only contextual data identified by URI schemas (`file:///`, `postgres://`, `wiki://`). |
| **Prompts** | Interactive (User-Controlled) | User | Reusable prompt templates and slash-command workflows (e.g. `/review-pr`, `/debug-trace`). |

### Resource Templates (`uriTemplate`):
Allows servers to expose parameterized dynamic resources:
`postgres://records/{table_name}/{record_id}`

---

## 3. MCP Transports: `stdio` vs `SSE`

* **`stdio` (Standard Input/Output)**:
  * Used for local servers running on the same machine as the Host.
  * Fast, zero network overhead, process-level lifecycle management.
* **`SSE` (Server-Sent Events over HTTP/HTTPS)**:
  * Used for remote servers running in clouds, microservices, or containers.
  * Requires TLS encryption (HTTPS) and Bearer token authentication in production.

---

## 4. Tool Schema Design Best Practices

1. **Semantic & Distinct Tool Names**: Avoid overlapping tools like `get_user_info` and `query_user_data`. Use distinct, single-responsibility names (`fetch_user_by_id`).
2. **Parameter Descriptions as Prompting**: Describe parameter expectations, formats (e.g. `YYYY-MM-DD`), and constraints directly in parameter `description` fields.
3. **Property Validation**: Use schema constraints (`minimum`, `maximum`, `pattern`, `enum`) to prevent out-of-range tool calls before execution.

---

## 5. Structured Error Handling: `is_error: true`

When a tool fails (e.g. file not found, API timeout, database syntax error), returning raw stack traces or throwing unhandled exceptions crashes the agentic loop.

```python
# Proper tool error formatting
tool_result = {
    "type": "tool_result",
    "tool_use_id": tool_call.id,
    "content": "Error: Table 'users_staging' does not exist. Did you mean 'users_prod'?",
    "is_error": True  # Crucial for recovery
}
```

* Setting `is_error: true` signals to Claude that the execution failed, prompting the model to adjust arguments, query an alternative table, or report the failure gracefully to the user.
