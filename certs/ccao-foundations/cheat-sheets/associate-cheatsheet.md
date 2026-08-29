# ⚡ Cheat Sheet: CCAO-F Fast-Lookup & Decision Matrix

---

## 1. Artifacts Trigger Decision Rule

| Scenario | Should It Be an Artifact? | Why? |
|---|:---:|---|
| Generating a 50-line Python script | ✅ **YES** | Code is $\ge 15$ lines and intended to be saved/executed. |
| Writing a 1-page executive summary memo | ✅ **YES** | Standalone document intended for reuse/export. |
| Creating an interactive React dashboard | ✅ **YES** | Interactive visual component rendered in the Artifact panel. |
| Showing a 3-line terminal command | ❌ **NO** | Short inline explanation / quick instruction. |
| Explaining why an approach is preferred | ❌ **NO** | Conversational analysis; belongs in chat stream. |
| Translating a 2-line sentence | ❌ **NO** | Short inline output. |

---

## 2. Model Selection Matrix

| Objective / Workload | Recommended Model | Primary Reason |
|---|---|---|
| Deep coding, debugging, architecture, vision | **Claude 3.5 Sonnet** | Highest intelligence, best coding and visual reasoning. |
| High-volume customer triage, fast categorization | **Claude 3.5 Haiku** | Fastest time-to-first-token, lowest cost per token. |
| Synthesizing 50 historical documents with contradictions | **Claude 3 Opus** | Deepest qualitative synthesis and nuanced evaluation. |

---

## 3. Project vs Chat Scope Matrix

| Feature | Single Chat | Project Workspace |
|---|---|---|
| **Knowledge Base** | Uploaded per conversation | Persisted across all conversations in the project |
| **Custom Instructions** | Default user settings | Project-scoped custom instructions override global defaults |
| **Visibility** | Private to creator | Can be shared across the entire Team workspace |
| **Context Window** | 200k tokens active turn | Files in Project Knowledge inject into chat context as needed |

---

## 4. Prompting Do's and Don'ts

| Principle | ✅ DO | ❌ DON'T |
|---|---|---|
| **Structure** | Use XML tags (`<context>`, `<rules>`) to separate sections. | Dump unformatted walls of text without delimiters. |
| **Grounding** | Ask for verbatim quote extraction to ground claims. | Rely on model memory for private documents. |
| **Output Format** | Provide exact JSON schema or few-shot demonstration. | Use vague requests like *"make it look nice"*. |
| **Thinking** | Prompt Claude to plan or reason step-by-step. | Force instant generation without scratchpad/thinking space. |
