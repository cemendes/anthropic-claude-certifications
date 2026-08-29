# 📖 CCAO-F Comprehensive Study Guide: Claude Foundations & Workspaces

---

## 1. Claude Model Family & Capabilities

Anthropic models are designed around distinct speed, intelligence, and cost profiles:

| Model | Primary Strengths | Ideal Use Cases | Context Window |
|---|---|---|---|
| **Claude 3.5 Sonnet** | Industry-leading coding, multi-step agentic reasoning, complex analysis, and multimodal vision. | Software engineering, complex data analysis, drafting multi-page technical documents, visual document processing. | 200,000 tokens |
| **Claude 3.5 Haiku** | Blazing speed, lowest latency, high cost efficiency with strong instruction following. | High-volume classification, quick conversational triage, fast summarization, automated data extraction. | 200,000 tokens |
| **Claude 3 Opus** | Deep philosophical nuance, multi-document synthesis, and open-ended research. | Ambiguity resolution across massive research archives, philosophical/creative writing. | 200,000 tokens |

### Multimodal Vision Capabilities:
* **Supported Formats**: JPEG, PNG, GIF, WebP.
* **Capacity**: Up to 20 images per conversational request.
* **Capabilities**: Charts, diagrams, whiteboard photos, code screenshots, UI wireframes, table extraction.
* **Limitations**: Claude does NOT process raw audio or video files directly (audio must be transcribed into text first; video must be sampled as keyframes).

---

## 2. Artifacts: Mechanics, Triggers & Lifecycle

**Artifacts** are dedicated, persistent UI panels displayed side-by-side with the chat, designed for modular content that users want to edit, copy, render, or reuse.

### When Claude Automatically Generates an Artifact:
1. **Significant Code Snippets**: Substantial code blocks ($\ge 15$ lines of code) intended to be executed, saved, or edited.
2. **Interactive Visual Components**: React components, standalone HTML/CSS/JS pages, SVG diagrams, Mermaid flowcharts.
3. **Standalone Documents**: Multi-page reports, Markdown documentation, formal emails, or full memos ($> 15$ lines).
4. **Self-Contained Content**: Content that the user will likely want to modify or iterate on without re-reading the conversational chatter.

### When Claude Keeps Output Inline (No Artifact):
* Short conversational explanations, quick answers, single-line commands (`git status`, `pip install`).
* Brief code snippets ($< 15$ lines) intended solely as illustrative inline examples.
* Conversational responses, thoughts, suggestions, and critique.

### Artifact Versioning & Editing:
* Each modification to an artifact creates a new **version** in the Artifact panel.
* Users can click the version selector to switch between historical revisions or restore previous iterations.

---

## 3. Projects & Knowledge Management

**Projects** allow Claude Team and Enterprise users to curate persistent workspaces for specific initiatives:

### Key Components of a Project:
1. **Project Knowledge Base**:
   * Attach relevant reference files (PDFs, docs, codebases, guidelines).
   * Files in the Project Knowledge are automatically available as background context across **all chats created within that project**.
2. **Project Custom Instructions**:
   * Custom system prompts that govern all chats in the project (e.g., *"Always write responses in Brazilian Portuguese using Google Cloud terminology"*).
   * Overrides general user settings for chats residing in that project.
3. **Collaboration & Sharing**:
   * Projects can be shared with entire Teams or kept private.
   * Team members with access can view project chats, review shared artifacts, and create new conversations grounded in the same project knowledge.

---

## 4. Prompting Foundations & Best Practices

1. **Role Framing (System Directive)**:
   * Establish identity, expertise level, and tone upfront (e.g. *"You are a Senior Cloud Architect specializing in enterprise security"*).
2. **XML Tag Demarcation**:
   * Use explicit XML tags (`<context>`, `<instructions>`, `<requirements>`) to keep data, instructions, and user input cleanly separated.
3. **Quote-First Grounding (Anti-Hallucination)**:
   * When asking Claude to analyze long documents or Project Knowledge, instruct Claude: *"First extract direct quotes relevant to the question into `<quotes>` tags, then answer based strictly on those quotes."*
4. **Giving Claude Room to Think**:
   * Ask Claude to think through steps before outputting final answers (e.g. *"Before generating the response, outline your step-by-step reasoning"*).

---

## 5. Enterprise Security, Privacy & Data Governance

* **Zero Training on Commercial Data**: Anthropic does NOT use data from Claude Team, Enterprise, or API accounts to train foundation models.
* **Data Retention**: Standard commercial accounts retain data only according to enterprise retention policies. Zero Data Retention (ZDR) is available for strict regulatory environments.
* **Safety Boundaries**: Claude is guided by Constitutional AI to refuse harmful requests, generate safe code, and resist prompt injection attacks.
