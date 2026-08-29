# 🏆 Anthropic Claude Certifications Hub

[![Deploy to GitHub Pages](https://github.com/cemendes/anthropic-claude-certifications/actions/workflows/deploy.yml/badge.svg)](https://github.com/cemendes/anthropic-claude-certifications/actions/workflows/deploy.yml)
[![Live Practice Quiz](https://img.shields.io/badge/Live%20App-CCAR--F%20Quiz-blue?style=flat&logo=googlechrome)](https://cemendes.github.io/anthropic-claude-certifications/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An open-source, comprehensive study and mastery hub for **Anthropic Claude Certifications**, engineered for Solutions Architects, AI Engineers, and Google Customer Engineers.

---

## 🧭 Certification Roadmap

| Certification Track | Level | Exam Code | Status | Resources |
|---|---|---|---|---|
| **Certified Claude Architect: Foundations** | Associate / Foundation | **CCAR-F** | 🟢 **Complete & Active** | [Study Guide](./certs/ccar-foundations/), [Cheat Sheets](./certs/ccar-foundations/cheat-sheets/), [Slides](./certs/ccar-foundations/presentation/slides.md), [Live Quiz App](https://cemendes.github.io/anthropic-claude-certifications/) |
| **Certified Claude Architect: Advanced** | Professional | **CCAR-A** | 🟡 *In Development* | Coming Soon |
| **Claude Agentic Specialist** | Specialty | **CCAS** | 🟡 *In Development* | Coming Soon |

---

## 📚 Flagship Track: CCAR-F (Foundations)

The **Certified Claude Architect: Foundations (CCAR-F)** validates practical expertise in building production-grade LLM applications, autonomous agentic loops, Claude Code configuration, prompt engineering, Model Context Protocol (MCP) integrations, and context reliability.

### 🌟 What's Included:
1. **[Interactive Practice Exam App (100 Questions)](https://cemendes.github.io/anthropic-claude-certifications/)**:
   * **Study Mode**: Instant validation, code snippets, and in-depth Tutorials Dojo-style explanations.
   * **Exam Simulation**: 60 randomized questions with a 120-minute timer.
   * **Review Mode**: Flagged question triage and Markdown review export.
   * **Persistent State**: Full `localStorage` auto-save and lifetime accuracy metrics.
2. **[Comprehensive Study Guides](./certs/ccar-foundations/study-guide/)**:
   * [Domain 1: Agentic Architecture & Orchestration (27%)](./certs/ccar-foundations/study-guide/domain-1-agentic-orchestration.md)
   * [Domain 2: Claude Code Configuration & Workflows (20%)](./certs/ccar-foundations/study-guide/domain-2-claude-code-workflows.md)
   * [Domain 3: Prompt Engineering & Structured Output (20%)](./certs/ccar-foundations/study-guide/domain-3-prompt-engineering.md)
   * [Domain 4: Tool Design & MCP Integration (18%)](./certs/ccar-foundations/study-guide/domain-4-mcp-tool-design.md)
   * [Domain 5: Context Management & Reliability (15%)](./certs/ccar-foundations/study-guide/domain-5-context-management.md)
3. **[Fast-Lookup Cheat Sheets](./certs/ccar-foundations/cheat-sheets/)**:
   * [The 5 Anthropic Workflow Patterns Matrix](./certs/ccar-foundations/cheat-sheets/workflow-patterns-matrix.md)
   * [MCP Primitives & Transports Guide](./certs/ccar-foundations/cheat-sheets/mcp-primitives-and-transports.md)
   * [Prompt Caching Constraints & Traps](./certs/ccar-foundations/cheat-sheets/prompt-caching-rules.md)
   * [Anthropic Messages API & Stop Reasons](./certs/ccar-foundations/cheat-sheets/messages-api-stop-reasons.md)
   * [Claude Code Settings & Directory Hierarchy](./certs/ccar-foundations/cheat-sheets/claude-code-hierarchy-cheatsheet.md)
4. **[Tech Talk Slide Deck (Marp Markdown)](./certs/ccar-foundations/presentation/slides.md)**:
   * Ready-to-present technical deck for customer engineering sessions, team training, and community presentations.

---

## 🚀 Quick Start & Local Execution

```bash
# Clone the repository
git clone https://github.com/cemendes/anthropic-claude-certifications.git
cd anthropic-claude-certifications

# Install dependencies in the monorepo
npm install

# Run the CCAR-F practice quiz app locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Embedding the Quiz in Your Website / Blog

```html
<iframe 
  src="https://cemendes.github.io/anthropic-claude-certifications/" 
  width="100%" 
  height="850px" 
  frameborder="0" 
  style="border-radius: 12px; border: 1px solid #292A2B; overflow: hidden;"
  allow="clipboard-write">
</iframe>
```

---

## 👨‍💻 Author

**Eduardo Mendes**  
Customer Engineer @ Google  
[LinkedIn](https://www.linkedin.com/in/cemendes/) • [GitHub](https://github.com/cemendes)

---

## 📄 License

MIT License — Feel free to use for personal study, corporate training, and community education.
