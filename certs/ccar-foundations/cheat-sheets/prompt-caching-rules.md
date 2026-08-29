# ⚡ Cheat Sheet: Anthropic Prompt Caching Rules

---

## 1. Prompt Caching Constraints Matrix

| Parameter | Claude 3.5 Haiku | Claude 3.5 / 3.7 Sonnet | Claude 3 Opus |
|---|---|---|---|
| **Minimum Cache Tokens** | **1,024 tokens** | **1,024 tokens** | **2,048 tokens** |
| **Time-to-Live (TTL)** | 5 minutes (refreshes on hit) | 5 minutes (refreshes on hit) | 5 minutes (refreshes on hit) |
| **Max Cache Breakpoints** | 4 per request | 4 per request | 4 per request |
| **Cost Savings** | ~90% on cached prompt input | ~90% on cached prompt input | ~90% on cached prompt input |
| **Latency Reduction** | Up to 85% on cached prefix | Up to 85% on cached prefix | Up to 85% on cached prefix |

---

## 2. The Exact Prefix Matching Law

Prompt Caching matches strictly on the exact sequence of tokens from the beginning of the prompt:

```
✅ GOOD STRUCTURE (100% Cache Hit Rate):
[Static System Directives (2k tokens)] --> [Static Schema Tools (3k tokens)] --> [cache_control] --> [Dynamic User Turn]
                                                                                      ▲ Breakpoint

❌ BAD STRUCTURE (0% Cache Hit Rate):
[Dynamic Timestamp / Session ID (5 tokens)] --> [Static Directives] --> [Static Tools] --> [User Turn]
▲ Invalidation on every call!
```

---

## 3. High-Yield Exam Traps

1. **Placing Dynamic Variables Early**: Never put timestamps, user IDs, or UUIDs at the beginning of the system prompt.
2. **Sub-1024 Token Prompts**: Trying to cache a 500-token system prompt will silently proceed without caching because it fails the minimum token threshold.
3. **Multiple Redundant Breakpoints**: Putting `cache_control` on every turn evicts useful prefix breakpoints. Place breakpoints only at stable prefix boundaries.
