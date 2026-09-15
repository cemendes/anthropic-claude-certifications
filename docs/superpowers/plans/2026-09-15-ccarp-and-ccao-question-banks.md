# CCAR-P (65 Qs) and CCAO-F (40 Qs) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the CCAR-P question bank from 14 to 65 enterprise scenario questions and build the CCAO-F question bank with 40 questions, integrating both into the interactive quiz engine.

**Architecture:** Utilize Python generation scripts (`generate_ccarp_full_65.py` and `generate_ccao_bank_40.py`) using dynamic directory paths to generate strictly typed TypeScript question modules for each domain. These are mirrored into both the React quiz application (`certs/ccar-foundations/quiz/src/data/`) and standalone certification track quiz directories. Extend React quiz types, state hooks, and UI navigation to support CCAO-F as a fourth track alongside CCAR-F, CCDV-F, and CCAR-P.

**Tech Stack:** TypeScript, React 18, Vite, Tailwind CSS, Python 3.

**Spec:** [docs/superpowers/specs/2026-09-15-ccarp-and-ccao-question-banks-design.md](file:///usr/local/google/home/cemolive/code_projects/anthropic-claude-certifications/docs/superpowers/specs/2026-09-15-ccarp-and-ccao-question-banks-design.md)

## Global Constraints

- Every question must adhere strictly to the TypeScript `Question` interface with `id`, `domain`, `domainName`, `scenario`, `question`, `options` (A..D), `correctAnswer`, `keyConcept`, `explanation`, `distractorAnalysis` (for all 3 distractors), and `references`.
- Zero duplicate question IDs within any track.
- CCAR-P question IDs: D1 (1001–1016), D2 (2001–2014), D3 (3001–3013), D4 (4001–4012), D5 (5001–5010). Total = 65.
- CCAO-F question IDs: D1 (101–110), D2 (201–210), D3 (301–308), D4 (401–406), D5 (501–506). Total = 40.
- All paths must use repository-relative or dynamic directory discovery in generator scripts so they execute cleanly across all operating environments (no hardcoded `/Users/eduardo/...` paths).
- Build must pass cleanly without TypeScript or Vite errors: `npm run build`.

---

### Task 1: Expand CCAR-P Question Bank to 65 Scenario Questions

**Files:**
- Modify: `generate_ccarp_full_65.py`
- Generate / Overwrite: `certs/ccar-foundations/quiz/src/data/ccarp/questions-d{1..5}.ts`
- Generate / Overwrite: `certs/ccar-professional/quiz/questions-d{1..5}.ts`

**Interfaces:**
- Produces: 65 CCAR-P questions mapped to `Question[]` interface across D1 (16), D2 (14), D3 (13), D4 (12), D5 (10).

- [ ] **Step 1: Update `generate_ccarp_full_65.py` with repo-relative paths and 65 enterprise questions**
  - Fix base paths to dynamically resolve relative to script location (`os.path.dirname(os.path.abspath(__file__))`).
  - Keep the existing 14 high-yield questions (1001–1005, 2001–2003, 3001–3002, 4001–4002, 5001–5002).
  - Add 11 new scenario questions to Domain 1 (IDs 1006–1016): covering Supervisor-Worker routing, state machines, cycle detection, token budget circuit breakers, parallel consensus, partial node failure retries, and Kafka/SQS event orchestration.
  - Add 11 new scenario questions to Domain 2 (IDs 2004–2014): covering Remote MCP over SSE, reverse proxying, OAuth 2.0 / mTLS authorization, session multiplexing, least-privilege tool schemas, rate-limiting, and error reporting (`is_error: true`).
  - Add 11 new scenario questions to Domain 3 (IDs 3003–3013): covering multi-cloud failover between Anthropic First-Party, Google Cloud Vertex AI (Private Service Connect, IAM ADC), and AWS Bedrock; cross-region routing; quota management; and feature disparity handling.
  - Add 10 new scenario questions to Domain 4 (IDs 4003–4012): covering Zero Data Retention (ZDR), HIPAA/BAA compliance, indirect prompt injection defense-in-depth, PII redaction/DLP interceptors, VPC Service Controls, and audit logging.
  - Add 8 new scenario questions to Domain 5 (IDs 5013–5010): covering Evals-as-Code CI/CD quality gates, LLM-as-a-judge scoring calibration, OpenTelemetry GenAI semantic conventions, distributed tracing, latency/cost telemetry, and synthetic benchmark suites.

- [ ] **Step 2: Run `python3 generate_ccarp_full_65.py` and verify generated question counts**
  - Verify script generates exactly 65 questions across all 5 domain files in both directories.

- [ ] **Step 3: Commit CCAR-P question bank expansion**
  - Run `git add generate_ccarp_full_65.py certs/ccar-foundations/quiz/src/data/ccarp/ certs/ccar-professional/quiz/`
  - Commit: `feat(ccar-p): expand professional question bank to full 65 enterprise scenario questions`

---

### Task 2: Build CCAO-F (Associate Foundations) Question Bank (40 Questions)

**Files:**
- Create: `generate_ccao_bank_40.py`
- Generate: `certs/ccar-foundations/quiz/src/data/ccao/questions-d{1..5}.ts`
- Generate: `certs/ccao-foundations/quiz/questions-d{1..5}.ts`

**Interfaces:**
- Produces: 40 CCAO-F questions mapped to `Question[]` interface across D1 (10), D2 (10), D3 (8), D4 (6), D5 (6).

- [ ] **Step 1: Author `generate_ccao_bank_40.py`**
  - Define Domain 1 (IDs 101–110, 10 Qs): Claude Web & Desktop, Projects knowledge bases, document uploads, custom instructions, and context boundaries.
  - Define Domain 2 (IDs 201–210, 10 Qs): Artifacts lifecycle, the $\ge 15$ lines threshold rule, SVG/HTML/React rendering, version history, side-by-side editing, and sharing.
  - Define Domain 3 (IDs 301–308, 8 Qs): Multimodal document intelligence, chart and graph interpretation, PDF OCR extraction nuances, multi-image comparative queries, and resolution limitations.
  - Define Domain 4 (IDs 401–406, 6 Qs): Everyday prompting for knowledge workers, role prompting, XML tags for document sectioning, few-shot demonstration framing, and formatting constraints.
  - Define Domain 5 (IDs 501–506, 6 Qs): Team workspaces, collaboration, member access permissions, data training opt-out policies, and share links.
  - Generate TypeScript files for both `src/data/ccao/` and `certs/ccao-foundations/quiz/`.

- [ ] **Step 2: Execute generator and verify question counts**
  - Run `python3 generate_ccao_bank_40.py`.
  - Assert exactly 40 questions are generated with no duplicate IDs.

- [ ] **Step 3: Commit CCAO-F question bank generation**
  - Run `git add generate_ccao_bank_40.py certs/ccar-foundations/quiz/src/data/ccao/ certs/ccao-foundations/quiz/`
  - Commit: `feat(ccao-f): author 40 scenario questions for Claude Certified Associate Foundations track`

---

### Task 3: Integrate CCAO-F into Quiz Engine (Types, State & UI)

**Files:**
- Create: `certs/ccar-foundations/quiz/src/data/questions-ccao.ts`
- Modify: `certs/ccar-foundations/quiz/src/types.ts`
- Modify: `certs/ccar-foundations/quiz/src/hooks/useQuiz.ts`
- Modify: `certs/ccar-foundations/quiz/src/components/ModeSelect.tsx`
- Modify: `certs/ccar-foundations/quiz/src/App.tsx`
- Modify: `README.md` and `certs/ccao-foundations/README.md`

**Interfaces:**
- Updates: `TrackType = 'ccar-f' | 'ccdv-f' | 'ccar-p' | 'ccao-f';`
- Exports: `ccaoQuestions: Question[]`, `CCAO_DOMAIN_NAMES`, `CCAO_DOMAIN_COLORS`

- [ ] **Step 1: Create `questions-ccao.ts`**
  - Import `questions as d1` through `d5` from `./ccao/questions-d{1..5}`.
  - Export `ccaoQuestions`, `CCAO_DOMAIN_NAMES`, and `CCAO_DOMAIN_COLORS`.

- [ ] **Step 2: Update `types.ts`**
  - Add `'ccao-f'` to `TrackType`.

- [ ] **Step 3: Update `useQuiz.ts`**
  - Import `ccaoQuestions` and `CCAO_DOMAIN_NAMES`.
  - Update `getTrackQuestions`: return `ccaoQuestions` when `track === 'ccao-f'`.
  - Update `getTrackDomainNames`: return `CCAO_DOMAIN_NAMES` when `track === 'ccao-f'`.
  - Update `startQuiz`: when `mode === 'exam'`, slice 40 questions if `track === 'ccao-f'`, else slice 60 questions.

- [ ] **Step 4: Update `ModeSelect.tsx`**
  - Change track selector tabs to 4 buttons (Architect Found., Developer Found., Architect Pro, Associate Found.).
  - Add CCAO-F title ("Certified Associate: Foundations (CCAO-F)") and subtitle ("Master Claude Web, Projects, Artifacts & Multimodal Vision").
  - Update exam mode description dynamically: "40 questions. 90 minutes." for CCAO-F, "60 questions. 120 minutes." for other tracks.

- [ ] **Step 5: Update `App.tsx`**
  - Update `getHeaderTitle`: return `'CCAO-F Practice Quiz'` when `track === 'ccao-f'`.
  - Update `getModeLabel`: return `'Associate CCAO-F'` when `track === 'ccao-f'`.
  - Pass 5400 seconds (90 minutes) to `ExamTimer` when `track === 'ccao-f'`.

- [ ] **Step 6: Update Documentation links**
  - Update root `README.md` and `certs/ccao-foundations/README.md` with links to the live practice quiz for CCAO-F.

- [ ] **Step 7: Verify Build and Type Checking**
  - Run `npm run build` in root workspace.
  - Confirm zero compile or lint errors.

- [ ] **Step 8: Commit UI and Engine Integration**
  - Commit: `feat(quiz): integrate CCAO-F 40-question practice exam into multi-track simulator`

---

### Task 4: Automated Validation & Final Smoke Testing

**Files:**
- Create scratch test script: `scratch_test_banks.py`

- [ ] **Step 1: Run comprehensive question bank audit script**
  - Assert CCAR-F has 100 questions (IDs 1–100).
  - Assert CCDV-F has 64 questions (IDs 101–512).
  - Assert CCAR-P has 65 questions (IDs 1001–5010).
  - Assert CCAO-F has 40 questions (IDs 101–506).
  - Check that all 269 total questions have valid option labels (A, B, C, D), valid `correctAnswer`, non-empty explanations, and non-empty `distractorAnalysis` for each incorrect option.

- [ ] **Step 2: Clean up scratch test and push / verify git status**
  - Check `git status` and ensure clean working tree.
