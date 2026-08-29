# Design Specification: Anthropic Claude Certifications Hub

## 1. Overview & Vision
The **Anthropic Claude Certifications Hub** (`anthropic-claude-certifications`) is an open-source, comprehensive study and mastery hub for architects, machine learning practitioners, and Google Customer Engineers preparing for official Anthropic Claude certifications.

The flagship track is the **Certified Claude Architect: Foundations (CCAR-F)**, accompanied by modular architecture to support future Anthropic certifications (e.g. Advanced Architect, Specialist tracks).

---

## 2. Monorepo Architecture & Directory Layout

```text
anthropic-claude-certifications/
├── .github/
│   └── workflows/
│       └── deploy.yml                   # Automated GitHub Actions deployment to Pages
├── README.md                            # Global Flagship Guide & Certification Roadmap
├── package.json                         # Root monorepo workspace configuration
├── docs/                                # Project specifications & design docs
│   └── superpowers/
│       └── specs/
├── certs/
│   └── ccar-foundations/                # CCAR-F Certification Track
│       ├── README.md                    # Track overview, domain weights, time management
│       ├── study-guide/                 # Deep architectural domain study guides
│       │   ├── domain-1-agentic-orchestration.md
│       │   ├── domain-2-claude-code-workflows.md
│       │   ├── domain-3-prompt-engineering.md
│       │   ├── domain-4-mcp-tool-design.md
│       │   └── domain-5-context-management.md
│       ├── cheat-sheets/                # Fast-lookup comparison tables & cheat sheets
│       │   ├── workflow-patterns-matrix.md
│       │   ├── mcp-primitives-and-transports.md
│       │   ├── prompt-caching-rules.md
│       │   ├── messages-api-stop-reasons.md
│       │   └── claude-code-hierarchy-cheatsheet.md
│       ├── presentation/                # Slide decks for talks & CE team presentations
│       │   └── slides.md                # Marp Markdown presentation deck
│       └── quiz/                        # Interactive React 19 Practice Exam App
│           ├── package.json
│           ├── vite.config.ts
│           ├── index.html
│           ├── src/
│           │   ├── data/ (100 questions across D1-D5)
│           │   ├── components/
│           │   ├── hooks/
│           │   └── styles/
│           └── public/
```

---

## 3. Component Details & Deliverables

### A. Root Gateway (`README.md`)
* High-impact showcase of Anthropic Certifications.
* Target audience: Solutions Architects, Google CEs, AI Engineers.
* Navigation map to all certification tracks, study resources, slide decks, and live practice apps.

### B. CCAR-F Track Guide (`certs/ccar-foundations/README.md`)
* Official exam syllabus & domain weights breakdown:
  * Domain 1: Agentic Architecture & Orchestration (27%)
  * Domain 2: Claude Code Configuration & Workflows (20%)
  * Domain 3: Prompt Engineering & Structured Output (20%)
  * Domain 4: Tool Design & MCP Integration (18%)
  * Domain 5: Context Management & Reliability (15%)
* Scoring model: Scaled 100–1000 score with a 720 pass threshold (equivalent to ~43/60 on the 60-question exam).
* Exam strategy: Time allocation (2 min/question), flag & review workflow, elimination heuristics.

### C. Comprehensive Domain Study Guides (`study-guide/`)
1. **Domain 1**: Loop mechanics (`stop_reason: tool_use`), tool result formatting (`tool_use_id`), the 5 Anthropic Workflow Patterns (Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer), deterministic state machines vs swarms, context isolation, SDK lifecycle hooks (`before_tool_call`, `after_tool_call`), HITL escalation gates.
2. **Domain 2**: `CLAUDE.md` hierarchy (`~/.claude` vs `./CLAUDE.md` vs subdirectories), 200–300 line budget, slash commands (`/init`, `/compact`, `/clear`), custom commands/skills (`.claude/skills/SKILL.md`), permissions model (`permissions.allow`), `.claudeignore`, headless execution (`claude -p`, `--output-format json`).
3. **Domain 3**: XML tag demarcation (`<context>`, `<instructions>`), quote extraction for zero-hallucination grounding, `<thinking>` tags for chain-of-thought, assistant prefilling (`[` / `{`), `tool_choice` schema forcing, schema `enum` constraints, few-shot edge case demonstrations, Pydantic validation-retry loops.
4. **Domain 4**: Model Context Protocol (Host vs Client vs Server), primitives (Tools vs Resources vs Prompts), URI templates, transports (`stdio` vs `SSE`), single-responsibility tool design, structured errors (`is_error: true`), runtime exception wrapping, filesystem sandboxing.
5. **Domain 5**: Anthropic Prompt Caching (exact prefix matching, 1024/2048 token thresholds, 5-min TTL, dynamic prefix invalidation traps), context compaction (history summarization, tool result pruning, sliding windows), multi-agent payload isolation, model tier routing (Haiku $\rightarrow$ Sonnet $\rightarrow$ Opus), provenance attribution, LLM-as-a-Judge evaluation with golden test sets.

### D. Reference Cheat Sheets (`cheat-sheets/`)
* **Workflow Patterns Matrix**: When to use Chaining vs Routing vs Parallelization vs Orchestrator-Workers vs Evaluator-Optimizer.
* **MCP Primitives & Transports**: Comparison table of Tools, Resources, and Prompts, with URI schemes and stdio vs SSE security rules.
* **Prompt Caching Rules**: Visual prefix diagram, token minimums by model, and invalidation rules.
* **Messages API & Stop Reasons**: `tool_use`, `end_turn`, `max_tokens`, role alternation rules (`user` $\leftrightarrow$ `assistant`).
* **Claude Code Hierarchy**: Precedence order, settings permissions syntax, and slash command reference.

### E. Presentation Deck (`presentation/slides.md`)
* Marp-formatted slide deck (Dark theme, 16:9 aspect ratio).
* Structured for a 45-minute tech talk:
  * Slide 1-5: The Anthropic Architectural Paradigm.
  * Slide 6-15: The 5 Workflow Patterns & State Machines in Production.
  * Slide 16-25: MCP Protocol Architecture & Tool Design Rules.
  * Slide 26-35: Context Optimization, Prompt Caching & Reliability.
  * Slide 36-45: Exam Blueprint, Traps, and Preparation Strategy.

### F. Interactive Quiz App (`certs/ccar-foundations/quiz/`)
* Relocated to `certs/ccar-foundations/quiz/`.
* 100 scenario questions fully loaded, validated, and formatted.
* React 19 + TypeScript + Vite + Tailwind CSS v4.
* GitHub Pages deployment workflow compiling and serving the app seamlessly.

---

## 4. GitHub Setup & Deployment Strategy

1. **Repository Renaming**:
   * Rename remote from `ccar-f-quiz` to `anthropic-claude-certifications`.
   * GitHub automatically sets up redirects from `https://github.com/cemendes/ccar-f-quiz` to `https://github.com/cemendes/anthropic-claude-certifications`.
2. **GitHub Pages Hosting**:
   * The root workflow (`.github/workflows/deploy.yml`) navigates to `certs/ccar-foundations/quiz`, runs `npm ci` and `npm run build`, and publishes the `/dist` artifacts to GitHub Pages at:
   * **`https://cemendes.github.io/anthropic-claude-certifications/`**
   * Universal relative base path (`base: './'`) ensures 100% compatibility with GitHub Pages and `<iframe>` embedding on external websites.

---

## 5. Verification & Acceptance Criteria
* [x] Monorepo structure created cleanly with all directories and submodules.
* [x] Root `README.md` and CCAR-F track `README.md` authored.
* [x] 5 Domain Study Guides authored and fully detailed.
* [x] 5 Cheat Sheets authored with structured Markdown tables.
* [x] Marp slide deck authored in `presentation/slides.md`.
* [x] Quiz app builds with 0 TypeScript errors (`tsc -b && vite build`).
* [x] GitHub repository renamed and pushed to `main`.
* [x] GitHub Pages deployed and verified live.
