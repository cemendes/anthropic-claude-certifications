# 📘 Domain 1: Anthropic Messages API & Client SDKs

**Weight**: 25% | **Exam Questions**: ~15 Questions  
**Core Competencies**: Client initialization (Python/TS), Messages API schema, strict role alternation, Streaming (SSE), token counting, sampling parameters (`temperature`, `top_p`, `top_k`, `max_tokens`).

---

## 1. 🏗️ Client SDK Initialization & Authentication

Anthropic provides official SDKs for Python and TypeScript/Node.js.

### Python SDK (`anthropic`)
```python
import anthropic

# Sync Client (reads ANTHROPIC_API_KEY from environment by default)
client = anthropic.Anthropic()

# Async Client
async_client = anthropic.AsyncAnthropic(
    api_key="sk-ant-...",
    max_retries=3,
    timeout=20.0
)
```

### TypeScript / JavaScript SDK (`@anthropic-ai/sdk`)
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env.ANTHROPIC_API_KEY
  maxRetries: 3,
  timeout: 20000, // 20s
});
```

---

## 2. 📜 Messages API Payload Anatomy & Structural Rules

The Anthropic Messages API (`/v1/messages`) enforces strict payload architecture:

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "system": "You are a specialized code analysis engine.",
  "messages": [
    {"role": "user", "content": "Analyze this function for memory leaks."}
  ],
  "temperature": 0.2
}
```

### 🛑 Critical Architectural Rules Tested in the Exam
1. **No `system` role in `messages`**: The `system` prompt is passed as a **top-level parameter**, NOT as a message object (`{"role": "system", ...}` will return HTTP 400).
2. **Strict Alternation**: Messages MUST alternate strictly: `user` $\rightarrow$ `assistant` $\rightarrow$ `user` $\rightarrow$ `assistant`.
   - `user` followed by `user` $\rightarrow$ **`HTTP 400 Bad Request`**.
   - `assistant` followed by `assistant` $\rightarrow$ **`HTTP 400 Bad Request`**.
3. **Starting Role**: The first message in the `messages` array MUST have `role: "user"`.
4. **Content Blocks**: The `content` field can be a plain string OR an array of heterogeneous content blocks (`text`, `image`, `tool_use`, `tool_result`, `document`).

---

## 3. 🌊 Streaming Responses via Server-Sent Events (SSE)

When streaming is enabled (`stream=True` in Python or `.stream()` helper), responses arrive as typed Server-Sent Events (SSE).

### Python SDK Streaming Helper (`client.messages.stream`)
The helper handles accumulation, text extraction, and event lifecycle automatically:

```python
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain SSE in 2 paragraphs."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

final_message = stream.get_final_message()
print(f"\nFinal Stop Reason: {final_message.stop_reason}")
print(f"Usage: {final_message.usage.input_tokens} in, {final_message.usage.output_tokens} out")
```

### Low-Level SSE Event Lifecycle Flow
When parsing raw SSE chunks or building webhooks, events follow this deterministic sequence:
1. `message_start`: Contains top-level metadata (`id`, `model`, `role`, initial `usage.input_tokens`).
2. `content_block_start`: Declares the beginning of a block (`index`, `type: "text"` or `"tool_use"`).
3. `content_block_delta`: Carries chunk payloads:
   - `text_delta`: `{"type": "text_delta", "text": "partial text"}`
   - `input_json_delta`: `{"type": "input_json_delta", "partial_json": "{\"key\": "}`
4. `content_block_stop`: Closes the specific content block at `index`.
5. `message_delta`: Carries `stop_reason`, `stop_sequence`, and final `usage.output_tokens`.
6. `message_stop`: Final event indicating connection termination.

---

## 4. 🎛️ Sampling Parameters & Determinism

| Parameter | Type | Default | Description & Exam Nuance |
|---|---|---|---|
| `max_tokens` | `int` | **Required** | Maximum tokens to generate. Cannot exceed model max (e.g. 8192 for Sonnet 3.5). |
| `temperature` | `float` (0.0 to 1.0) | `1.0` | Controls randomness. `0.0` is near-deterministic (ideal for code, JSON extraction); `1.0` for creative writing. |
| `top_p` | `float` (0.0 to 1.0) | `null` | Nucleus sampling: cuts off the tail of probability distribution. |
| `top_k` | `int` ($\ge 0$) | `null` | Only sample from the top K most likely tokens. Reduces unlikely token hallucinations. |
| `stop_sequences` | `list[str]` | `null` | Custom strings that immediately halt generation when produced. |

> ⚠️ **Exam Tip**: Anthropic recommends altering **either** `temperature` **or** `top_p`, not both simultaneously.

---

## 5. 🔢 Token Counting API

To inspect token counts prior to sending expensive requests without incurring full model inference costs:

```python
# Python Token Counting
count_response = client.messages.count_tokens(
    model="claude-3-5-sonnet-20241022",
    system="You are a data assistant.",
    messages=[{"role": "user", "content": "Calculate the variance of X."}]
)
print(f"Input tokens: {count_response.input_tokens}")
```
