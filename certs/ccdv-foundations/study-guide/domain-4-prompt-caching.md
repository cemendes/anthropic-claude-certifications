# 📘 Domain 4: Prompt Caching & Cost/Latency Optimization

**Weight**: 15% | **Exam Questions**: ~9 Questions  
**Core Competencies**: Exact prefix matching rules, `cache_control: {"type": "ephemeral"}`, token thresholds, 5-minute sliding TTL, header inspection, caching strategies for multi-turn chats and large context injection.

---

## 1. ⚡ How Prompt Caching Works

Prompt Caching allows caching immutable prompt prefixes (system instructions, tool definitions, reference documents, chat history) on Anthropic servers.

### Economic & Latency Impact
* **Cache Writes (Creation)**: $1.25\times$ (25% surcharge on initial cache write).
* **Cache Reads (Hits)**: $0.10\times$ (**90% discount** on subsequent requests).
* **Latency Reduction**: Up to **80% faster Time-To-First-Token (TTFT)**.
* **TTL (Time To Live)**: **5 minutes**, refreshed automatically on every cache hit.

---

## 2. 📏 Minimum Token Thresholds

| Model | Minimum Cacheable Prefix Size |
|---|---|
| **Claude 3.5 Sonnet** | **1,024 tokens** |
| **Claude 3.5 Haiku** | **1,024 tokens** |
| **Claude 3 Opus** | **2,048 tokens** |

> ⚠️ **Critical Exam Rule**: If your prompt prefix has fewer tokens than the minimum threshold (e.g., 850 tokens on Sonnet 3.5), caching will **silently not activate**, and you will be billed standard input rates without cache creation or read tokens.

---

## 3. 🧩 Implementing Cache Breakpoints (`cache_control`)

You can define up to **4 cache breakpoints** in a single API request across `system`, `tools`, and `messages`.

### Example: Multi-layer Caching in Python
```python
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are an enterprise code reviewer.",
        },
        {
            "type": "text",
            "text": LARGE_STYLE_GUIDE_TEXT,  # > 1,024 tokens
            "cache_control": {"type": "ephemeral"}  # Breakpoint 1
        }
    ],
    tools=[
        {
            "name": "lint_code",
            "description": "...",
            "input_schema": {...},
            "cache_control": {"type": "ephemeral"}  # Breakpoint 2
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": LARGE_REPOSITORY_CONTEXT,  # > 1,024 tokens
                    "cache_control": {"type": "ephemeral"}  # Breakpoint 3
                },
                {
                    "type": "text",
                    "text": "Please review this pull request."
                }
            ]
        }
    ]
)
```

---

## 4. 🕵️ Inspecting Cache Usage Headers

Always inspect the `usage` object in the API response to verify cache behavior:

```python
usage = response.usage
print(f"Base Input Tokens: {usage.input_tokens}")
print(f"Cache Creation Tokens: {getattr(usage, 'cache_creation_input_tokens', 0)}")
print(f"Cache Read Tokens: {getattr(usage, 'cache_read_input_tokens', 0)}")
print(f"Output Tokens: {usage.output_tokens}")
```

### Cache Hit Conditions:
1. First Request: `cache_creation_input_tokens > 0`, `cache_read_input_tokens == 0`.
2. Second Request within 5 min: `cache_creation_input_tokens == 0`, `cache_read_input_tokens > 0`.
3. If prompt prefix changes by even 1 byte (e.g. inserting dynamic timestamp at the beginning), the cache misses completely!
