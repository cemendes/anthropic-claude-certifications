# 🎓 CCAR-F Practice Exam & Study App

An interactive, scenario-driven practice exam platform for the **Anthropic Certified Claude Architect: Foundations (CCAR-F)** certification.

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4** featuring the **Stitch Slate Design System**.

---

## 🚀 Key Features

* **📚 100 Scenarios Across All 5 Exam Domains**:
  * **Domain 1: Agentic Architecture & Orchestration** (27 questions)
  * **Domain 2: Claude Code Configuration & Workflows** (20 questions)
  * **Domain 3: Prompt Engineering & Structured Output** (20 questions)
  * **Domain 4: Tool Design & MCP Integration** (18 questions)
  * **Domain 5: Context Management & Reliability** (15 questions)
* **🎯 Tutorials Dojo-Style In-Depth Explanations**:
  * Authoritative **Key Concept** banners for every question.
  * Code snippets (`<pre><code>`) with syntax highlighting for Python, JSON, Bash, and Markdown.
  * Deep **Distractor Analysis** (2–3 substantive sentences explaining the architectural breakdown of each wrong option).
  * Direct links to official Anthropic documentation.
* **🕹️ Three Dedicated Study Modes**:
  * **Study Mode**: Real-time feedback, domain filtering, and immediate architectural explanations.
  * **Exam Simulation**: 60 randomized questions, 120-minute countdown timer with warnings, and navigation matrix.
  * **Review Mode**: Flagged question review and 1-click Markdown export.
* **💾 Resilient Persistence**:
  * Full session auto-save in `localStorage` — resume exactly where you left off on browser refresh.
  * Real-time lifetime accuracy tracking and statistics.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Bundler**: Vite
* **Styling**: Tailwind CSS v4 + Google Fonts (Inter + Material Symbols Outlined)
* **Quality Assurance**: 100% LLM-as-a-Judge grounded in official Anthropic API specifications via Gemini 3.7 Flash High Reasoning.

---

## 📦 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/cemendes/ccar-f-quiz.git
cd ccar-f-quiz

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Embedding in Your Website

To embed the quiz directly into a webpage or portfolio post:

```html
<iframe 
  src="https://cemendes.github.io/ccar-f-quiz/" 
  width="100%" 
  height="850px" 
  frameborder="0" 
  style="border-radius: 12px; overflow: hidden;"
  allow="clipboard-write">
</iframe>
```

---

## 📄 License

MIT License — free for individual study and community education.
