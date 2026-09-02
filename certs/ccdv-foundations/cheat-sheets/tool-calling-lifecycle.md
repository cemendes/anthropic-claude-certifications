# ⚡ Cheat Sheet: Tool Calling Lifecycle & Payloads

## 1. Tool Call Response (`stop_reason: "tool_use"`)
```json
{
  "id": "msg_01...",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_01A09q90tc1jq8pjczr2394g",
      "name": "get_weather",
      "input": {"location": "San Francisco, CA", "unit": "celsius"}
    }
  ],
  "stop_reason": "tool_use"
}
```

## 2. Follow-Up Tool Result Turn (Must be `role: "user"`)
```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90tc1jq8pjczr2394g",
      "content": "{\"temp\": 18, \"condition\": \"Partly Cloudy\"}"
    }
  ]
}
```

## 3. Error Case (`is_error: true`)
```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01A09q90tc1jq8pjczr2394g",
  "content": "Connection timed out connecting to database.",
  "is_error": true
}
```
