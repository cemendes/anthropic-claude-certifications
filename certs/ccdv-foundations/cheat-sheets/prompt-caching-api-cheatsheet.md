# ⚡ Cheat Sheet: Prompt Caching Rules & Headers

## 1. Golden Rules
* **Minimum Token Count**: 1,024 tokens (Sonnet 3.5, Haiku 3.5) / 2,048 tokens (Opus 3).
* **Max Breakpoints**: 4 per API request (`system`, `tools`, or `messages`).
* **TTL**: 5 minutes (refreshed per cache hit).
* **Exact Prefix Rule**: Even 1 single byte change earlier in the payload invalidates all subsequent cache breakpoints.

## 2. Usage Response Verification
```json
{
  "usage": {
    "input_tokens": 25,
    "cache_creation_input_tokens": 1250,
    "cache_read_input_tokens": 0,
    "output_tokens": 120
  }
}
```
* **Cache Creation**: Initial request write.
* **Cache Read**: Subsequent request hit ($90\%$ cost discount).
