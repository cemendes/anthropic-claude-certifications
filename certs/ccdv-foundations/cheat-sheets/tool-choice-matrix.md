# ⚡ Cheat Sheet: `tool_choice` Strategy Matrix

| Configuration Payload | Model Constraint | Guaranteed Tool Call? | Can Claude respond with plain text? |
|---|---|:---:|:---:|
| `{"type": "auto"}` *(Default)* | Model decides autonomously | ❌ No | ✅ Yes |
| `{"type": "any"}` | Model must pick at least 1 tool from `tools` list | ✅ **Yes** | ❌ No |
| `{"type": "tool", "name": "get_weather"}` | Model must call specifically `get_weather` | ✅ **Yes** | ❌ No |

```python
# To disable tool usage while keeping definitions in the request payload:
# Simply do not pass tools in that turn, or set tool_choice={"type": "auto"} with prompt guidance.
```
