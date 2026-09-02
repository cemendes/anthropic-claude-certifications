# ⚡ Cheat Sheet: Messages API Payloads & Stream Events

## 1. Request Structure
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "system": "System instructions go here (never inside messages array).",
  "messages": [
    {"role": "user", "content": "Hello Claude!"}
  ],
  "temperature": 0.0
}
```

## 2. Streaming (SSE) Event Lifecycle
1. `message_start` $\rightarrow$ Model, ID, input tokens.
2. `content_block_start` $\rightarrow$ Block index & type (`text` or `tool_use`).
3. `content_block_delta` $\rightarrow$ Token stream chunk (`text_delta` or `input_json_delta`).
4. `content_block_stop` $\rightarrow$ Closes current block.
5. `message_delta` $\rightarrow$ Stop reason (`end_turn`, `tool_use`, `max_tokens`), output tokens.
6. `message_stop` $\rightarrow$ End of stream.
