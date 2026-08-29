# 🏆 Anthropic Claude Certifications Hub

[![Deploy to GitHub Pages](https://github.com/cemendes/anthropic-claude-certifications/actions/workflows/deploy.yml/badge.svg)](https://github.com/cemendes/anthropic-claude-certifications/actions/workflows/deploy.yml)
[![Live Practice Quiz](https://img.shields.io/badge/Live%20App-CCAR--F%20Quiz-blue?style=flat&logo=googlechrome)](https://cemendes.github.io/anthropic-claude-certifications/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An open-source, comprehensive study and mastery hub for **Anthropic Claude Certifications**, engineered for Solutions Architects, AI Engineers, and Google Customer Engineers.

---

## 🧭 Certification Master Roadmap

| Certification Track | Level | Exam Code | Status | Comprehensive Resources |
|---|---|---|---|---|
| **Claude Certified Associate: Foundations** | Associate | **CCAO-F** | 🟢 **Passed (967/1000)** | [Study Guide](./certs/ccao-foundations/study-guide/associate-guide.md), [Cheat Sheet](./certs/ccao-foundations/cheat-sheets/associate-cheatsheet.md), [Track README](./certs/ccao-foundations/) |
| **Claude Certified Architect: Foundations** | Associate / Foundation | **CCAR-F** | 🟢 **Passed (854/1000)** | [Study Guides](./certs/ccar-foundations/study-guide/), [Cheat Sheets](./certs/ccar-foundations/cheat-sheets/), [Slides](./certs/ccar-foundations/presentation/slides.md), [Live Quiz App](https://cemendes.github.io/anthropic-claude-certifications/) |
| **Claude Certified Developer: Foundations** | Associate / Developer | **CCDV-F** | 🟡 **Active / Next (Aug 30)** | In Progress |
| **Claude Certified Architect: Professional** | Professional | **CCAR-P** | ⚪ *Scheduled (Sep 5)* | In Progress |

---

## 📚 Certification Tracks Breakdown

### 1. 🟢 [CCAO-F: Associate Foundations](./certs/ccao-foundations/)
* Core mastery of Claude Web & Desktop, Artifacts lifecycle ($\ge 15$ lines, visual components, documents), Projects knowledge bases, Custom Instructions, Team workspaces, and Multimodal Vision. (Score: **967 / 1000**).

### 2. 🟢 [CCAR-F: Architect Foundations](./certs/ccar-foundations/)
* Production architecture, Agentic Loops (`stop_reason: tool_use`), 5 Workflow Patterns, `CLAUDE.md` hierarchy, Model Context Protocol (MCP), Prompt Caching exact prefix rules, and Context Reliability. Includes the **100-Question Interactive Practice App**.

### 3. ⚪ CCDV-F: Developer Foundations *(Coming Tomorrow)*
* Messages API, Tool Calling (`tool_choice`), JSON Schemas, Pydantic, SDK integrations, Prompt Caching, and Streaming SSE.

### 4. ⚪ CCAR-P: Architect Professional *(Coming Next Weekend)*
* Enterprise Multi-Agent Swarms, Production MCP over SSE with OAuth 2.0, Multi-Cloud Failover (Vertex AI / Bedrock / Direct API), Zero Data Retention (ZDR), and Evals-as-Code.

---

## 🚀 Quick Start & Local Execution

```bash
# Clone the repository
git clone https://github.com/cemendes/anthropic-claude-certifications.git
cd anthropic-claude-certifications

# Install dependencies in the monorepo
npm install

# Run the practice quiz app locally
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

MIT License — Free to use for personal study, corporate training, and community education.
