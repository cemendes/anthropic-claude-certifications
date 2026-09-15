# Design Specification: CCAR-P (65 Qs) and CCAO-F (40 Qs) Question Banks

**Date:** 2026-09-15  
**Author:** Eduardo Oliveira (`cemolive@google.com`)  
**Status:** Approved  

---

## 1. Overview & Objectives

This specification defines the architecture, content sourcing, domain distribution, and delivery pipeline for expanding the Anthropic Claude certification question banks in the `anthropic-claude-certifications` repository:

1. **CCAR-P (Certified Claude Architect: Professional)**: Expand from the 14 seed questions to a complete **65-question** scenario bank covering enterprise swarms, production MCP over SSE, multi-cloud resilience (Direct API / Vertex AI / Bedrock), enterprise governance (ZDR, BAA, DLP), and evals-as-code.
2. **CCAO-F (Certified Claude Associate: Foundations)**: Scaffold and build the initial **40-question** bank covering Claude Web & Desktop, Artifacts lifecycle ($\ge 15$ lines, visual rendering, versions), multimodal/document intelligence, prompt engineering for knowledge workers, and team workspaces/sharing.
3. **Interactive Quiz App Integration**: Update the single-page React + Vite application (`certs/ccar-foundations/quiz`) to support `ccao-f` as a 4th selectable track alongside `ccar-f`, `ccdv-f`, and `ccar-p`.

---

## 2. Methodology & Content Sourcing

### 2.1 Authoring Standards (Scenario-Grade Questions)
Every question in both question banks must adhere strictly to the TypeScript `Question` interface:
* **Scenario**: 2–4 sentences describing a concrete, real-world workplace or enterprise production situation.
* **Question Prompt**: Clear, unambiguous technical or operational question.
* **4 Options (A, B, C, D)**: Realistic, plausible options representing common implementation decisions or traps.
* **Key Concept**: A concise 3–6 word architectural/operational principle.
* **Explanation**: Comprehensive technical justification explaining why the correct choice succeeds.
* **Distractor Analysis**: Granular analysis explicitly detailing why each of the 3 incorrect options (A, B, C, or D) is incorrect or sub-optimal.
* **References**: Direct links to authoritative documentation (`modelcontextprotocol.io`, `docs.anthropic.com`, `anthropic.com/engineering`, Google Cloud Vertex AI documentation, or Anthropic trust center).

### 2.2 Domain Allocations & Target Counts

#### Track A: CCAR-P (Certified Claude Architect: Professional) — Total: 65 Questions
*Blueprint Weighting: 60 questions on exam (120 min, passing 720/1000).*

| Domain | Domain Title | Blueprint Weight | Current | Added | Final Bank | ID Range |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **D1** | Enterprise Multi-Agent Swarms & Systems | 25% | 5 | +11 | **16** | `1001` – `1016` |
| **D2** | Production MCP Architecture & Security | 22% | 3 | +11 | **14** | `2001` – `2014` |
| **D3** | Multi-Cloud Deployment & Failover Resilience | 20% | 2 | +11 | **13** | `3001` – `3013` |
| **D4** | Enterprise Governance, Privacy & Security | 18% | 2 | +10 | **12** | `4001` – `4012` |
| **D5** | Evals-as-Code & Continuous Observability | 15% | 2 | +8 | **10** | `5001` – `5010` |
| **Total** | | **100%** | **14** | **+51** | **65** | |

#### Track B: CCAO-F (Certified Claude Associate: Foundations) — Total: 40 Questions
*Blueprint Weighting: 40 questions on exam (90 min, passing 720/1000).*

| Domain | Domain Title | Target Qs | ID Range | Core Competencies |
|---|---|:---:|:---:|---|
| **D1** | Claude Web, Desktop & Project Knowledge Bases | 10 | `101` – `110` | Projects workspace, document uploads, custom instructions, context boundaries, file size limits. |
| **D2** | Artifacts Lifecycle & Component Visualizations | 10 | `201` – `210` | The $\ge 15$ line trigger rule, SVG/React/HTML rendering, versioning, side-by-side editing, downloading/sharing. |
| **D3** | Multimodal Document & Vision Intelligence | 8 | `301` – `308` | Chart interpretation, PDF OCR extraction limits, multi-image comparative queries, spatial reasoning caveats. |
| **D4** | Everyday Prompting & Structuring for Knowledge Workers | 6 | `401` – `406` | Role priming, XML structuring for non-coders, few-shot examples, constraining format and tone. |
| **D5** | Collaboration, Team Workspaces & Commercial Privacy | 6 | `501` – `506` | Team plans vs Pro vs Enterprise, project member access, data training opt-out policies, sharing links. |
| **Total** | | **40** | | |

---

## 3. Technical Architecture (Option 1: Python Generators)

To preserve reproducibility and align with `generate_ccdv_full_65.py`:

1. **`generate_ccarp_full_65.py`**:
   - Expanded to define all 65 CCAR-P questions (`questions_d1` through `questions_d5`).
   - Automatically writes formatted TypeScript to:
     - `certs/ccar-foundations/quiz/src/data/ccarp/questions-d{1..5}.ts`
     - `certs/ccar-professional/quiz/questions-d{1..5}.ts` (standalone mirror)
2. **`generate_ccao_bank_40.py`**:
   - Newly created script to define all 40 CCAO-F questions (`questions_d1` through `questions_d5`).
   - Automatically writes formatted TypeScript to:
     - `certs/ccar-foundations/quiz/src/data/ccao/questions-d{1..5}.ts`
     - `certs/ccao-foundations/quiz/questions-d{1..5}.ts` (standalone mirror)
3. **Vite Quiz Application Updates**:
   - **`src/types.ts`**: Update `TrackType = 'ccar-f' | 'ccdv-f' | 'ccar-p' | 'ccao-f';`
   - **`src/data/questions-ccao.ts`**: Create aggregation file defining `ccaoQuestions`, `CCAO_DOMAIN_NAMES`, and `CCAO_DOMAIN_COLORS`.
   - **`src/hooks/useQuiz.ts`**:
     - Import `ccaoQuestions`, `CCAO_DOMAIN_NAMES`.
     - Update `getTrackQuestions` and `getTrackDomainNames` for `ccao-f`.
     - Update `startQuiz`: sample 40 questions for `ccao-f`, 60 for `ccar-f`, `ccdv-f`, and `ccar-p`.
   - **`src/components/ModeSelect.tsx`**:
     - Add 4th tab button: "Associate Found." (`ccao-f`).
     - Update titles, subtitles, and exam description ("40 questions, 90 minutes" for CCAO-F; "60 questions, 120 minutes" for others).
   - **`src/App.tsx`**:
     - Update header title and mode labels for `ccao-f`.
     - Pass appropriate timer duration (`5400` seconds / 90 mins for CCAO-F, `7200` seconds / 120 mins for others).

---

## 4. Verification & Validation Plan

1. **Syntax & Compilation**:
   - Run `npm run build` in `certs/ccar-foundations/quiz` to guarantee TypeScript compilation and Vite bundling succeed without errors.
2. **Question Count & ID Integrity**:
   - Run verification script to assert:
     - CCAR-F has exactly 100 questions.
     - CCDV-F has exactly 64 questions.
     - CCAR-P has exactly 65 questions across D1 (16), D2 (14), D3 (13), D4 (12), D5 (10).
     - CCAO-F has exactly 40 questions across D1 (10), D2 (10), D3 (8), D4 (6), D5 (6).
     - No duplicate IDs within any track.
     - All questions have valid `correctAnswer` in `options` and complete `distractorAnalysis` for all distractors.
3. **Local Preview**:
   - Validate UI renders all 4 tabs and loads questions without runtime exceptions.
