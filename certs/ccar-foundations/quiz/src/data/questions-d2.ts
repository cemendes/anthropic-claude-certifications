import type { Question } from '../types';

export const questionsD2: Question[] = [
  {
    id: 28,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A startup recently migrated from Copilot to Claude Code. The team wants to ensure that all developers share the same core formatting rules for the project, while allowing individual developers to define their personal preferred workflow aliases.',
    question: 'How should the team structure their configuration files to achieve this balance?',
    options: [
      { label: 'A', text: 'Define all project and personal rules in a single global `~/.claude/CLAUDE.md` file.' },
      { label: 'B', text: 'Place project rules in `./CLAUDE.md` and instruct developers to define personal aliases in their `~/.claude/CLAUDE.md` file.' },
      { label: 'C', text: 'Use a `./CLAUDE.md` file with a special `@user` directive to load user-specific preferences.' },
      { label: 'D', text: 'Define project rules in `.claudeignore` and personal aliases in `./CLAUDE.md`.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Project-Level (\'./CLAUDE.md\') vs Global (\'~/.claude/CLAUDE.md\') Precedence',
    explanation: 'Claude Code supports a hierarchical configuration model. A project-level `./CLAUDE.md` provides shared context for the repository, while a user-level `~/.claude/CLAUDE.md` applies to all projects for that specific user. The local project settings will take precedence, but both are read, allowing a mix of team standards and personal workflows.\n\n```markdown\n# ./CLAUDE.md (Project)\n- Use 2 spaces for indentation\n- Write tests in Vitest\n```\n\n```markdown\n# ~/.claude/CLAUDE.md (User)\n- Use the alias /test for running vitest watch\n```\n\n',
    distractorAnalysis: {
      A: 'Using only a global file means project-specific rules would apply to all of a developer\'s unrelated projects. This leads to context leakage and inappropriate formatting rules being applied in wrong environments.',
      C: 'There is no `@user` directive for loading configurations in Claude Code. Configuration hierarchy is strictly managed via file paths (local vs global).',
      D: 'The `.claudeignore` file is used to exclude files from context, not for defining formatting rules. Putting project rules there would be completely ignored by the model.'
    },
    references: [{ title: 'Claude Code Overview', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' }]
  },
  {
    id: 29,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'An enterprise architecture team is structuring a large monorepo with multiple microservices. The frontend and backend services have completely different linting and testing commands, but share some foundational Git workflows.',
    question: 'Which configuration approach optimally handles these differing requirements without polluting context?',
    options: [
      { label: 'A', text: 'Create a massive root `CLAUDE.md` detailing every service\'s command.' },
      { label: 'B', text: 'Place a `CLAUDE.md` file in the root for shared workflows, and scoped `CLAUDE.md` files in each microservice subdirectory.' },
      { label: 'C', text: 'Use the `/init` command in each subdirectory every time a developer switches contexts.' },
      { label: 'D', text: 'Disable `CLAUDE.md` loading and pass commands manually via the CLI on every invocation.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Monorepo Root and Subdirectory Scoped \'CLAUDE.md\' Hierarchy',
    explanation: 'Claude Code evaluates `CLAUDE.md` files hierarchically. By placing a shared config at the root and specific configs in subdirectories, Claude only loads the context relevant to the directory it is currently operating in or analyzing, which preserves token limits and prevents confusion.\n\n```markdown\n# /backend/CLAUDE.md\n- Run tests with `pytest`\n- Ensure type hints are used\n```\n\n',
    distractorAnalysis: {
      A: 'A massive root config wastes context window space and can confuse the model with irrelevant commands. It also increases the likelihood of hallucinating the wrong tool for a specific service.',
      C: 'Running `/init` repeatedly is a manual setup task and does not establish persistent scoped configurations. It also overwrites or duplicates context unnecessarily.',
      D: 'Manually passing commands defeats the purpose of persistent configuration. It creates friction for developers who want automated contextual awareness.'
    },
    references: [{ title: 'Claude Code Settings', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' }]
  },
  {
    id: 30,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A mobile development team has extensive prompt instructions for UI testing, state management, and API mocking. Their single CLAUDE.md file has grown to 600 lines and is becoming hard to maintain across the team.',
    question: 'How should the team organize their Claude Code configuration to keep it modular?',
    options: [
      { label: 'A', text: 'Create subdirectory CLAUDE.md files (e.g., `tests/CLAUDE.md`, `src/api/CLAUDE.md`) that apply scoped rules when Claude works in those directories.' },
      { label: 'B', text: 'Configure a `module.exports` array in `.claude/config.json` to load multiple instruction files.' },
      { label: 'C', text: 'Run `/compact` to automatically split the CLAUDE.md into smaller files.' },
      { label: 'D', text: 'Use `#include <filename.md>` preprocessor macros in the main CLAUDE.md.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Subdirectory Modularization for Scoped Team Rules',
    explanation: 'Claude Code supports a hierarchy of CLAUDE.md files. You can place scoped configuration in subdirectories, and those rules automatically apply when Claude operates on files within that directory.\\n\\n```\\nproject/\\n├── CLAUDE.md              # Global project rules\\n├── src/\\n│   ├── CLAUDE.md          # Rules for source code\\n│   └── api/\\n│       └── CLAUDE.md      # API-specific conventions\\n└── tests/\\n    └── CLAUDE.md          # Testing-specific rules\\n```\\n\\nMore specific (deeper) CLAUDE.md files extend and override parent instructions when working within their subdirectory.',
    distractorAnalysis: {
      B: 'Claude Code configuration is markdown-based, not JSON module exports. There is no `.claude/config.json` file for loading instruction modules. Configuration lives entirely in CLAUDE.md files.',
      C: '`/compact` compresses your current conversation context to free up token space. It has nothing to do with splitting configuration files. It is a session management tool, not a file organization tool.',
      D: '`#include` is a C/C++ preprocessor directive and has no meaning in Claude Code. CLAUDE.md files are plain markdown \u2014 modularization is achieved through the directory hierarchy, not through import macros.'
    },
    references: [{ title: 'Claude Code Memory & CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' }]
  },
  {
    id: 31,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A developer maintains an open-source project and has a global `~/.claude/CLAUDE.md` file dictating that all code should be written in JavaScript. However, the current project they are working on has a local `./CLAUDE.md` explicitly requiring TypeScript.',
    question: 'What is the expected behavior when Claude generates new code in this project?',
    options: [
      { label: 'A', text: 'Claude will prompt the user to manually resolve the conflict before generating code.' },
      { label: 'B', text: 'Claude will generate JavaScript, as the global user configuration takes absolute precedence.' },
      { label: 'C', text: 'Claude will generate TypeScript, as local project settings override conflicting global user settings.' },
      { label: 'D', text: 'Claude will fail silently and refuse to generate file contents.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Local Directory Override Precedence over Global User Configuration',
    explanation: 'In the configuration hierarchy, local project settings (`./CLAUDE.md`) take precedence over global user settings (`~/.claude/CLAUDE.md`) when there is a conflict. This allows developers to maintain default habits globally while adhering to specific project rules.\n\n```typescript\n// Local CLAUDE.md overrides global, so output is typed\nfunction calculate(amount: number): number {\n  return amount * 1.2;\n}\n```\n\n',
    distractorAnalysis: {
      A: 'Claude resolves this automatically via standard precedence rules, without pausing to prompt the user. Interactive prompts are usually reserved for security/tool permissions.',
      B: 'Local settings override global settings, not the other way around. Project specificity always wins to prevent global defaults from breaking specialized repos.',
      D: 'Claude does not fail silently; it resolves the hierarchy and proceeds with generation. A silent failure would break the developer workflow.'
    },
    references: [{ title: 'Claude Code Settings', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' }]
  },
  {
    id: 32,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A DevOps engineer wants to create a highly specialized agent workflow that only applies to the `scripts/deploy` directory of their repository, without affecting the main application logic in `src/`.',
    question: 'What is the most effective way to configure this scoped behavior?',
    options: [
      { label: 'A', text: 'Place a `CLAUDE.md` directly inside the `scripts/deploy` directory.' },
      { label: 'B', text: 'Add a `.claudeignore` file in the `src/` directory.' },
      { label: 'C', text: 'Modify the global `~/.claude/CLAUDE.md` to include conditional bash logic.' },
      { label: 'D', text: 'Use the `/lint` command to restrict Claude to the deployment directory.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Scoped Directory Conventions in Script Subtrees (\'scripts/deploy/CLAUDE.md\')',
    explanation: 'Claude Code supports subdirectory-level configurations. By placing a `CLAUDE.md` directly inside `scripts/deploy`, the specific instructions for deployment scripts will only be active when the agent is working within that directory, providing scoped and highly relevant context.\n\n```bash\n# Tree view\n├── src/\n│   └── App.tsx\n├── scripts/\n│   └── deploy/\n│       ├── CLAUDE.md  # Only applies when working here\n│       └── deploy.sh\n```\n\n',
    distractorAnalysis: {
      B: 'Ignoring `src/` does not add specific deployment instructions; it only blinds the agent to the source code. It doesn\'t solve the requirement of adding specialized rules for deployments.',
      C: 'Global files should not contain project-specific conditional logic. LLMs are bad at following complex conditional file-path rules compared to just reading scoped files.',
      D: 'The `/lint` command runs linters; it does not configure scope. It is an operational tool, not a configuration mechanism.'
    },
    references: [{ title: 'Claude Code Settings', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' }]
  },
  {
    id: 33,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A data science team notices that Claude is frequently forgetting early instructions during long exploratory sessions. Their `CLAUDE.md` is currently over 1,500 lines long and includes pasted contents of their core Python modules.',
    question: 'How should the team optimize their configuration to resolve this context issue?',
    options: [
      { label: 'A', text: 'Increase the session token limit using `/compact max`.' },
      { label: 'B', text: 'Remove the pasted code, keeping the config under 200-300 lines, and let Claude discover the code via tool calls.' },
      { label: 'C', text: 'Convert the markdown file to a binary format for faster ingestion.' },
      { label: 'D', text: 'Move the 1,500 lines into `.claude/commands/` and trigger them manually.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Concise \'CLAUDE.md\' Design (<200-300 lines) with Tool-Discovery Focus',
    explanation: 'A `CLAUDE.md` file should be concise (ideally 200-300 lines) and focus on high-level architecture, conventions, and tool instructions. Pasting massive code files consumes the context window and dilutes instruction adherence. Claude should use its native file reading tools to explore code dynamically.\n',
    distractorAnalysis: {
      A: 'There is no `/compact max` command, and cramming more context does not solve the root issue of dilution. It just delays the inevitable context limit failure.',
      C: 'Claude configurations must be plain text markdown, not binaries. An LLM cannot natively process proprietary binary formats for system prompts.',
      D: 'Moving large static text to commands does not improve automatic context management. It merely shifts the bloated context problem to a manual activation step.'
    },
    references: [{ title: 'Claude Code Best Practices', url: 'https://anthropic.com/engineering/claude-code-best-practices' }]
  },
  {
    id: 34,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'An agency is standardizing project setups. Some developers argue that every database schema, API route, and utility function should be documented in `CLAUDE.md` so the agent has immediate context.',
    question: 'According to Claude Code best practices, what should actually be included in the `CLAUDE.md` file?',
    options: [
      { label: 'A', text: 'A complete copy of the database schema and all external API response examples.' },
      { label: 'B', text: 'Strictly the commands to build the project, but no architectural context.' },
      { label: 'C', text: 'High-level guidelines, critical commands, and testing conventions, letting Claude discover the rest.' },
      { label: 'D', text: 'Base64 encoded versions of the primary source files to save tokens.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Core Contents of \'CLAUDE.md\': Essential Commands and Architecture Rules',
    explanation: 'Best practices dictate that `CLAUDE.md` should contain high-level project goals, critical build/test commands, and overarching architectural conventions. It should not contain exhaustive schemas or full file contents, as Claude can effectively explore and discover these details autonomously using its tools.\n\n```markdown\n# CLAUDE.md\n## Build\n- Run `npm run build`\n## Architecture\n- This is a Next.js App Router project.\n- Use Server Actions for data mutations.\n```\n\n',
    distractorAnalysis: {
      A: 'This would create a massive, bloated configuration file that degrades performance. It wastes the context window on data the model can just query when needed.',
      B: 'Omitting all architectural context deprives Claude of necessary high-level guidance. It needs to know the "why" and "how" of the project to write idiomatic code.',
      D: 'Claude cannot effectively interpret Base64 encoded code within its system prompt instructions. It operates natively on plaintext tokens.'
    },
    references: [{ title: 'Claude Code Best Practices', url: 'https://anthropic.com/engineering/claude-code-best-practices' }]
  },
  {
    id: 35,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A lead developer is refactoring a chaotic frontend codebase. They want Claude to follow different rules for state management code, styling, and test files \u2014 but their single root CLAUDE.md is becoming unwieldy at 500+ lines.',
    question: 'What is the best approach to scope Claude\'s behavior differently for each part of the codebase?',
    options: [
      { label: 'A', text: 'Rely solely on a single root CLAUDE.md file, assuming it automatically filters out unused sections.' },
      { label: 'B', text: 'Create subdirectory CLAUDE.md files (e.g., `src/state/CLAUDE.md`, `src/styles/CLAUDE.md`, `tests/CLAUDE.md`) with scoped rules for each area.' },
      { label: 'C', text: 'Paste all rules into the system prompt using the API parameter instead of CLAUDE.md files.' },
      { label: 'D', text: 'Create a single `.claude/rules.json` file with nested configuration objects for each directory.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Subdirectory Scoping to Prevent Monolithic 500+ Line \'CLAUDE.md\' Files',
    explanation: 'Claude Code\'s CLAUDE.md hierarchy lets you place scoped configuration in subdirectories. When Claude works on files in `src/state/`, it picks up both the root CLAUDE.md AND `src/state/CLAUDE.md`. This gives you modular, maintainable rules without a bloated monolith.\\n\\nThe key benefit: teams can update styling rules in `src/styles/CLAUDE.md` without merge conflicts in the root file. Each domain expert owns their scoped config.',
    distractorAnalysis: {
      A: 'A single root file does not dynamically scope instructions by directory; it sends all 500+ lines in every context, wasting tokens and degrading instruction following.',
      C: 'Using the API system prompt directly skips the CLAUDE.md hierarchy entirely. This breaks the developer workflow where CLAUDE.md files live in the repo and are version-controlled alongside the code.',
      D: 'Claude Code does not support a `.claude/rules.json` configuration format. All configuration is done through CLAUDE.md markdown files in the project directory hierarchy.'
    },
    references: [{ title: 'Claude Code Memory & CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' }]
  },
  {
    id: 36,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A quality assurance automation team is writing a `CLAUDE.md` file to instruct Claude on how to run their Cypress tests. They need Claude to always run a specific seed script before executing tests.',
    question: 'How should they structure this instruction in the `CLAUDE.md` to ensure Claude follows it efficiently?',
    options: [
      { label: 'A', text: 'Provide the exact command (`npm run seed && npx cypress run`) and explicitly state it is a prerequisite.' },
      { label: 'B', text: 'Paste the entire contents of the seed script into the markdown.' },
      { label: 'C', text: 'Use a `/seed` slash command inside the markdown file.' },
      { label: 'D', text: 'Ask Claude to guess the testing framework on every run.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Documenting Prerequisite Build and Test Commands in \'CLAUDE.md\'',
    explanation: 'For operational workflows, `CLAUDE.md` is most effective when it provides explicit, concise commands and prerequisites. Stating exactly which commands to run gives Claude the necessary tool parameters without overwhelming the context.\n\n```markdown\n# Testing Rules\nWhen asked to run tests, ALWAYS run the seed script first:\n`npm run seed && npx cypress run`\n```\n\n',
    distractorAnalysis: {
      B: 'Pasting the full script wastes context; Claude just needs the command to execute it. The actual logic of the seed script is irrelevant to the orchestration.',
      C: 'Slash commands are used in the interactive CLI, not inside `CLAUDE.md` text. The markdown file acts as a system prompt, not a bash execution script.',
      D: 'Forcing Claude to guess wastes tokens and time when the framework is already known. Predictability is key for agentic reliability.'
    },
    references: [{ title: 'Claude Code Best Practices', url: 'https://anthropic.com/engineering/claude-code-best-practices' }]
  },
  {
    id: 37,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A junior developer has been asking Claude to debug a complex React issue for 45 minutes. The conversation history is very long, and Claude is beginning to slow down and lose track of the immediate task.',
    question: 'Which built-in slash command should the developer use to optimize the current session without losing the core context?',
    options: [
      { label: 'A', text: '`/clear`' },
      { label: 'B', text: '`/compact`' },
      { label: 'C', text: '`/init`' },
      { label: 'D', text: '`/lint`' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Context Compression and Token Recovery with the \'/compact\' Command',
    explanation: 'The `/compact` command is specifically designed to compress the current session\'s context. It summarizes past interactions to free up tokens and improve responsiveness while retaining the core knowledge of the task, making it ideal for long debugging sessions.\n',
    distractorAnalysis: {
      A: '`/clear` entirely wipes the session history, losing all context. This would force the developer to re-explain the entire debugging state from scratch.',
      C: '`/init` is used to create a new `CLAUDE.md` file in the project. It has nothing to do with memory management.',
      D: '`/lint` instructs the agent to run linters, which does not compress context. It would just append more terminal output to the already bloated history.'
    },
    references: [{ title: 'Claude Code CLI Usage', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' }]
  },
  {
    id: 38,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A technical lead wants to standardize a daily workflow where Claude runs tests, lints the codebase, and formats the output into a specific summary report.',
    question: 'How can the team create a custom, repeatable slash command (e.g., `/daily-check`) for this exact workflow?',
    options: [
      { label: 'A', text: 'By adding a new alias to their global `.bashrc` or `.zshrc`.' },
      { label: 'B', text: 'By creating a markdown file in `.claude/commands/` (or `.claude/skills/` for the newer Skills format) that defines the workflow prompt.' },
      { label: 'C', text: 'By passing the `--alias daily-check` flag during startup.' },
      { label: 'D', text: 'By manually typing the steps and using `/compact` to save it forever.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Custom Slash Commands and Skills in \'.claude/commands/\' and \'.claude/skills/\'',
    explanation: 'Claude Code lets you create custom slash commands by placing markdown files in `.claude/commands/` (project-level) or `~/.claude/commands/` (personal). The filename becomes the command name \u2014 so `daily-check.md` gives you `/daily-check`.\\n\\n```markdown\\n# .claude/commands/daily-check.md\\nRun the full test suite, lint all source files,\\nand format the results as a summary table.\\nInclude pass/fail counts and any error details.\\n```\\n\\nThe newer `.claude/skills/` directory with `SKILL.md` files is now the recommended approach. Skills support frontmatter, auto-loading, and bundled supporting files \u2014 but legacy commands still work fine.',
    distractorAnalysis: {
      A: 'Bash aliases live in your shell, not in Claude. They won\'t register as internal slash commands that Claude can discover and execute.',
      C: 'No `--alias` flag exists in the Claude CLI. Custom commands are filesystem-based \u2014 you create a markdown file, not a CLI flag.',
      D: '`/compact` compresses your conversation context to free up tokens. It doesn\'t save macros, workflows, or persistent commands.'
    },
    references: [{ title: 'Claude Code Custom Commands', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' }]
  },
  {
    id: 39,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A developer has just cloned a massive, poorly documented legacy repository. They want to generate a baseline `CLAUDE.md` file based on an intelligent analysis of the codebase to help guide future tasks.',
    question: 'Which command is designed to automatically generate this initial configuration?',
    options: [
      { label: 'A', text: '`/bootstrap`' },
      { label: 'B', text: '`/init`' },
      { label: 'C', text: '`/analyze`' },
      { label: 'D', text: '`/setup`' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Bootstrapping Initial Project Context with the \'/init\' Command',
    explanation: 'The `/init` command is used to bootstrap a new project. When executed, Claude will analyze the current directory structure and file contents to generate a foundational `CLAUDE.md` file customized for that specific codebase.\n\n```bash\n$ claude\n> /init\nGenerating CLAUDE.md based on project analysis...\n```\n\n',
    distractorAnalysis: {
      A: '`/bootstrap` is not a valid Claude Code command. The specific command to start a project context is `/init`.',
      C: 'While Claude naturally analyzes code when asked, `/init` is the designated slash command specifically wired to generate the `CLAUDE.md` file.',
      D: '`/setup` is not the recognized standard command for this workflow. Relying on made-up slash commands will return an error.'
    },
    references: [{ title: 'Claude Code CLI Usage', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' }]
  },
  {
    id: 40,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'During a live coding session, a developer realizes that they have accidentally fed Claude incorrect assumptions about an API for the past 10 prompts. They want to start fresh without restarting the terminal process.',
    question: 'Which built-in command provides the cleanest way to wipe the current conversational context?',
    options: [
      { label: 'A', text: '`/reset-api`' },
      { label: 'B', text: '`/compact`' },
      { label: 'C', text: '`/clear`' },
      { label: 'D', text: '`/purge`' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Resetting Active Session Context with the \'/clear\' Command',
    explanation: 'The `/clear` command is used to completely reset the current session state. It clears the conversation history, ensuring that the model drops all prior assumptions and starts with a blank slate without needing to exit the CLI.\n',
    distractorAnalysis: {
      A: '`/reset-api` does not exist in the standard toolset. It is a fabricated distractor.',
      B: '`/compact` compresses history but retains the core context and assumptions. If the assumptions were wrong, `/compact` would bake them in.',
      D: '`/purge` is not a valid command for session management in Claude Code.'
    },
    references: [{ title: 'Claude Code CLI Usage', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' }]
  },
  {
    id: 41,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A frontend engineer is using a custom slash command `/component` which generates a React component, and they want to immediately follow it up by asking Claude to review the new file for accessibility issues.',
    question: 'How does Claude Code handle the chaining of slash commands and natural language prompts?',
    options: [
      { label: 'A', text: 'Slash commands must be executed in absolute isolation and cannot be chained with natural language in the same prompt.' },
      { label: 'B', text: 'Users can combine custom slash commands with natural language to chain workflows dynamically.' },
      { label: 'C', text: 'Chaining is only supported if the user passes the `--chain` argument at startup.' },
      { label: 'D', text: 'Custom slash commands automatically terminate the session upon completion.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Chaining Custom Slash Commands with Contextual Natural Language',
    explanation: 'Claude Code allows users to integrate slash commands directly with natural language instructions. You can run a command and append further instructions, effectively chaining macros with dynamic reasoning.\n\n```bash\n> /component Button and ensure it meets WCAG contrast guidelines\n```\n\n',
    distractorAnalysis: {
      A: 'Commands and natural language are highly interoperable. Enforcing isolation would needlessly slow down developer velocity.',
      C: 'There is no `--chain` argument required; it works natively out of the box.',
      D: 'Commands do not terminate the interactive session. The REPL loop continues allowing further conversation.'
    },
    references: [{ title: 'Claude Code Overview', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' }]
  },
  {
    id: 42,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A security audit team is reviewing the use of Claude Code across a large engineering department. They notice that Claude pauses execution to ask the developer for confirmation before running a `npm install` command.',
    question: 'Which component of Claude Code\'s architecture is responsible for this behavior?',
    options: [
      { label: 'A', text: 'The `.claudeignore` exclusion rules.' },
      { label: 'B', text: 'The interactive permission prompt tied to the `allowedTools` security model.' },
      { label: 'C', text: 'The system\'s default firewall blocking outbound HTTP requests.' },
      { label: 'D', text: 'The `/lint` command detecting an insecure package.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Interactive Tool Permission Model and Sensitive Action Prompting',
    explanation: 'Claude Code operates with a strict permissions model. By default, actions that modify the system, access the network, or execute arbitrary shell commands require explicit user approval via an interactive permission prompt to prevent unintended or malicious execution.\n',
    distractorAnalysis: {
      A: '`.claudeignore` prevents files from being read; it does not block shell commands from executing.',
      C: 'The prompt is generated by Claude Code internally as a safety guardrail, not by a network firewall.',
      D: 'Linters analyze code statically, they do not intercept or manage CLI tool execution permissions.'
    },
    references: [{ title: 'Claude Code Security', url: 'https://docs.anthropic.com/en/docs/claude-code/security' }]
  },
  {
    id: 43,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A CI/CD pipeline engineer is integrating Claude Code into an automated GitHub Actions workflow to auto-generate pull request summaries. The pipeline keeps hanging because Claude is waiting for user confirmation.',
    question: 'How can the engineer safely resolve this hanging issue in an isolated, ephemeral CI environment?',
    options: [
      { label: 'A', text: 'Use the `--dangerously-skip-permissions` flag.' },
      { label: 'B', text: 'Pipe the command `echo "yes"` into the Claude Code process.' },
      { label: 'C', text: 'Disable the GitHub Actions firewall.' },
      { label: 'D', text: 'Run the `/clear` command prior to execution.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Non-Interactive Automated Execution with \'--dangerously-skip-permissions\' in CI/CD',
    explanation: 'In headless, non-interactive environments like CI/CD, Claude cannot prompt a human for permission. The `--dangerously-skip-permissions` flag is provided explicitly for these scenarios to allow automated execution, though it should be used with extreme caution.\n\n```bash\n# Run in CI without hanging on prompt\nclaude --dangerously-skip-permissions -p "Summarize this PR"\n```\n\n',
    distractorAnalysis: {
      B: 'Piping "yes" is brittle and does not interface correctly with Claude\'s internal tool validation loop. It can cause unexpected shell behavior.',
      C: 'Firewalls do not cause the interactive prompt to hang. The hang is an explicit internal wait state.',
      D: '`/clear` wipes history; it does not bypass security prompts or adjust execution privileges.'
    },
    references: [{ title: 'Claude Code Security', url: 'https://docs.anthropic.com/en/docs/claude-code/security' }]
  },
  {
    id: 44,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A developer wants to grant Claude the ability to run `git diff` without asking for permission every time, but still wants to be prompted before Claude attempts to execute `git push` or `rm -rf`.',
    question: 'How is this granular permission escalation managed in Claude Code?',
    options: [
      { label: 'A', text: 'It cannot be managed; permissions are strictly all-or-nothing.' },
      { label: 'B', text: 'By configuring the permissions allow-list in `settings.json` (or passing `--allowedTools`) to pre-approve specific read-only or low-risk commands.' },
      { label: 'C', text: 'By running Claude as the root user.' },
      { label: 'D', text: 'By placing `git diff` inside `.claudeignore`.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Granular Tool Whitelisting in \'settings.json\' (\'permissions.allow\')',
    explanation: 'Claude Code supports granular tool permissions in `settings.json` (or via the `--allowedTools` CLI flag). You can pre-approve low-risk commands like `git diff` or `npm test` under the allow list while retaining interactive prompts for dangerous commands like `rm` or `git push`.\\n\\n```json\\n{\\n  "permissions": {\\n    "allow": [\\n      "Bash(git diff)",\\n      "Bash(npm test)"\\n    ]\\n  }\\n}\\n```\\n\\n',
    distractorAnalysis: {
      A: 'Permissions are highly granular and configurable precisely to avoid all-or-nothing friction.',
      C: 'Running as root disables system-level guardrails and is a massive security risk, but it does not bypass Claude\'s internal prompts.',
      D: '`.claudeignore` hides files from context; it does not manage bash command execution permissions.'
    },
    references: [{ title: 'Claude Code Security', url: 'https://docs.anthropic.com/en/docs/claude-code/security' }]
  },
  {
    id: 45,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'An engineering team working in a highly regulated fintech environment needs to ensure that Claude never accidentally reads API keys stored in their local `.env.local` files during autonomous debugging.',
    question: 'What is the most secure way to enforce this restriction at the project level?',
    options: [
      { label: 'A', text: 'Instruct Claude in `CLAUDE.md` to "never read .env files".' },
      { label: 'B', text: 'Remove the read-file tool entirely from Claude\'s permissions.' },
      { label: 'C', text: 'Add `.env.local` to the project\'s `.claudeignore` file.' },
      { label: 'D', text: 'Encrypt the `.env.local` file using a custom bash script before launching Claude.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Preventing Accidental Secret Ingestion via \'.claudeignore\'',
    explanation: 'The `.claudeignore` file explicitly prevents Claude from seeing or accessing specified files, functioning similarly to `.gitignore`. This is a hard guardrail, unlike a prompt instruction which is soft and relies on model adherence.\n\n```text\n# .claudeignore\n.env*\nsecrets.json\n```\n\n',
    distractorAnalysis: {
      A: 'Prompt instructions are soft constraints and can sometimes be circumvented or ignored by the model during complex tool chains.',
      B: 'Removing the read tool entirely breaks the agent\'s ability to analyze any code, rendering it useless for debugging.',
      D: 'While encryption works, `.claudeignore` is the native, purpose-built, and vastly simpler solution for this exact problem.'
    },
    references: [{ title: 'Claude Code Security', url: 'https://docs.anthropic.com/en/docs/claude-code/security' }]
  },
  {
    id: 46,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A DevOps engineer wants to integrate Claude into a shell script that checks the health of their staging environment. They need Claude to execute a single task and return just the text response to stdout, without launching the interactive UI.',
    question: 'Which command-line argument should they use to achieve this single-shot, non-interactive execution?',
    options: [
      { label: 'A', text: '`claude --headless`' },
      { label: 'B', text: '`claude --print`' },
      { label: 'C', text: '`claude /execute`' },
      { label: 'D', text: '`claude --daemon`' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Headless Script Integration using \'claude -p\' (\'--print\')',
    explanation: 'The `--print` (or `-p`) flag instructs Claude Code to run in a single-shot mode. It executes the provided prompt, prints the final output directly to standard output, and then terminates, making it perfect for shell scripts.\n\n```bash\n# Use inside a script\nRESULT=$(claude -p "Check system health")\necho $RESULT\n```\n\n',
    distractorAnalysis: {
      A: '`--headless` is not the correct flag for single-shot output in Claude Code. It does not exist.',
      C: '`/execute` is not a valid CLI argument; slash commands are for inside the REPL.',
      D: '`--daemon` would suggest a long-running background process, not a single-shot return.'
    },
    references: [{ title: 'Claude Code CLI Usage', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' }]
  },
  {
    id: 47,
    domain: 2,
    domainName: 'Claude Code Configuration & Workflows',
    scenario: 'A platform team is building an internal dashboard that aggregates Claude Code\'s analysis of daily pull requests. To parse the data easily in their Node.js backend, they need Claude\'s terminal output to be structured rather than plain text.',
    question: 'Which flag should the team pass to the Claude CLI to ensure the output is programmatically parsable?',
    options: [
      { label: 'A', text: '`--output-format json`' },
      { label: 'B', text: '`--parseable=true`' },
      { label: 'C', text: '`--xml`' },
      { label: 'D', text: '`--strict-mode`' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Structured Machine-Readable Output using \'--output-format json\'',
    explanation: 'When automating workflows or integrating Claude Code into custom pipelines, passing a JSON output flag ensures that the output is structured. This allows downstream tools to easily parse logs, tool usage, and final responses.\n',
    distractorAnalysis: {
      B: '`--parseable` is not the standard flag for structured formatting. It is a fabricated distractor.',
      C: 'While Claude generates XML well in prompts, JSON is the standard structured output format for CLI integration and terminal parsing.',
      D: '`--strict-mode` does not dictate standard output formatting. It typically refers to runtime type checking.'
    },
    references: [{ title: 'Claude Code CLI Usage', url: 'https://docs.anthropic.com/en/docs/claude-code/cli-usage' }]
  }
];
