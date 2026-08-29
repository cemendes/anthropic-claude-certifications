# Domain 3: Prompt Engineering & Structured Output (20% Exam Weight)

## Core Competencies
* Structuring complex prompts using XML tag demarcation (`<instructions>`, `<context>`, `<examples>`).
* Applying quote extraction techniques to eliminate hallucinations in long-document RAG.
* Implementing Chain-of-Thought (CoT) and Extended Thinking via `<thinking>` tags.
* Enforcing deterministic JSON output using assistant prefilling and `tool_choice` forcing.
* Designing high-yield few-shot examples with representative edge cases.
* Building Pydantic/Zod validation-retry loops.

---

## 1. XML Tag Demarcation

Claude is specifically trained to recognize and prioritize XML tags for structural separation:

```xml
<system>
You are an expert financial auditor. Follow the rules in <instructions>.
</system>

<instructions>
1. Extract all transactions exceeding $10,000.
2. Ground each transaction with verbatim quotes from <financial_record>.
3. Format output strictly as valid JSON.
</instructions>

<financial_record>
${user_document}
</financial_record>
```

### Why XML Tags Matter:
* **Prompt Injection Defense**: Encapsulating untrusted user input inside dedicated tags (e.g. `<user_input>`) prevents prompt injection attacks from overriding system instructions.
* **Role Clarification**: Explicitly distinguishes reference data, schema rules, few-shot examples, and output instructions.

---

## 2. Eliminating Hallucinations: Verbatim Quote Grounding

When querying long documents, models can hallucinate facts when asked to synthesize directly. The architectural countermeasure is **Quote-First Grounding**:

1. Instruct Claude to first extract exact, verbatim quotes into a `<quotes>` block.
2. Instruct Claude to derive its final analysis exclusively from those extracted quotes.

```xml
<instructions>
Before answering the question, find relevant excerpts from the document and write them inside <quotes> tags. If no relevant quote exists, state "INSUFFICIENT_DATA".
</instructions>
```

---

## 3. Extended Thinking & `<thinking>` Tags

For multi-step arithmetic, code analysis, policy compliance, and tool parameter preparation, forcing Claude to articulate its reasoning before producing the final answer dramatically improves accuracy.

```xml
<instructions>
Use <thinking> tags to work through the following steps:
1. Verify the customer's account status.
2. Calculate the prorated refund amount.
3. Check for discount eligibility.
After closing </thinking>, output the final JSON result.
</instructions>
```

---

## 4. Deterministic Structured Output: Prefilling vs Tool Forcing

| Technique | How It Works | Best Used For |
|---|---|---|
| **Assistant Prefilling** | Supplying the initial characters (e.g. `{` or `[`) in the `assistant` message turn. | Simple JSON objects, arrays, and suppressing conversational chatter ("Sure! Here is the JSON:"). |
| **`tool_choice` Forcing** | Setting `tool_choice: {"type": "tool", "name": "extract_data"}` in the API request. | Complex nested schemas, strict type enforcement, regex patterns, and schema `enum` constraints. |

```python
# Forcing structured output via tool_choice
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    messages=[{"role": "user", "content": "Extract customer data from text..."}],
    tools=[customer_extraction_tool],
    tool_choice={"type": "tool", "name": "customer_extraction"}
)
```

---

## 5. Few-Shot Prompt Design & Validation-Retry Loops

### Few-Shot Best Practices:
* **Include Edge Cases**: Show missing fields, malformed inputs, and empty states alongside happy-path examples.
* **Consistent Formatting**: Every example must follow the exact same schema structure.
* **Positive Demonstrations**: Demonstrate what *to* do rather than listing negative rules ("do not do X").

### Validation-Retry Loop:
1. Client attempts to parse Claude's JSON output with Pydantic/Zod.
2. If validation fails, append the exact parser error into a new `user` turn.
3. Cap retries (`MAX_RETRIES = 3`) to prevent infinite failure loops.
