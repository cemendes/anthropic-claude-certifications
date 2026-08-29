# Domain 2: Claude Code Configuration & Workflows (20% Exam Weight)

## Core Competencies
* Understanding the `CLAUDE.md` memory hierarchy and precedence rules.
* Optimizing `CLAUDE.md` content (<200–300 lines) and avoiding code dumps.
* Managing session state using slash commands (`/init`, `/compact`, `/clear`).
* Creating custom slash commands and skills in `.claude/skills/` and `.claude/commands/`.
* Configuring granular tool permissions and evaluating security implications (`--dangerously-skip-permissions`).
* Integrating Claude Code into headless scripts and CI/CD pipelines.

---

## 1. `CLAUDE.md` Hierarchy & Precedence Rules

Claude Code discovers and evaluates instructions hierarchically:

```
~/.claude/CLAUDE.md               (Lowest Precedence: Global developer preferences)
     │
./CLAUDE.md                       (Project Root: Shared repository guidelines)
     │
./src/api/CLAUDE.md               (Subdirectory: Scoped rules for specific subsystems)
     │
./tests/CLAUDE.md                 (Deepest: Highest precedence for files in /tests)
```

### Precedence Principles:
1. **Local Overrides Global**: Project `./CLAUDE.md` overrides `~/.claude/CLAUDE.md`.
2. **Deepest Subdirectory Wins**: A `./tests/CLAUDE.md` adds to and overrides root `./CLAUDE.md` rules when Claude is operating inside the `tests/` folder.
3. **No Monolithic Bloat**: Keep root `CLAUDE.md` under **200–300 lines**. Use subdirectories for domain-specific rules rather than a single 600-line root file.

---

## 2. What Belongs in `CLAUDE.md` vs Tool Discovery

| What to Include in `CLAUDE.md` | What NOT to Include (Let Claude Discover) |
|---|---|
| Exact build, test, and lint commands (`npm test`, `pytest`) | Full copies of source code files or large data dumps |
| Architecture conventions and core patterns | Complete API documentation available in codebase |
| Non-obvious project rules & formatting constraints | Generic programming advice or basic syntax |
| Essential directory layout pointers | Temporary session notes or transient task lists |

---

## 3. Slash Commands & Session Management

* **`/init`**: Analyzes the project and bootstraps an initial `CLAUDE.md` file.
* **`/compact`**: Summarizes the active conversation history to reclaim token space in long-running interactive sessions.
* **`/clear`**: Resets the active session context completely.
* **`/cost`**: Displays token usage and estimated API cost for the current session.

### Custom Slash Commands & Skills:
* Custom commands are defined as Markdown files in `.claude/commands/<command-name>.md` or modern `.claude/skills/<skill-name>/SKILL.md`.
* Users can chain custom commands with contextual natural language (e.g. `/daily-check focus on backend PRs`).

---

## 4. Permissions Model & Security

Claude Code protects developer environments through an interactive permission model:

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(git diff)",
      "Bash(git status)",
      "Bash(npm test)"
    ],
    "ask": [
      "Bash(git push)",
      "Bash(npm run deploy)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  }
}
```

### Critical Security Flags:
* **`--dangerously-skip-permissions`**: Bypasses all confirmation prompts.
  * *Allowed Use Case*: Automated, isolated CI/CD containers (e.g. GitHub Actions runners) with restricted API tokens.
  * *Anti-Pattern*: Running locally on production machines or untrusted repositories without sandboxing.
* **`.claudeignore`**: Prevents Claude Code from reading or indexing sensitive files (e.g. `.env`, `.env.local`, private SSH keys, credential vaults).

---

## 5. Headless Automation & CI/CD Integration

* **`claude -p "prompt"` (`--print`)**: Executes in single-shot non-interactive mode and streams output to stdout.
* **`--output-format json`**: Emits machine-readable JSON structured data for parsing by pipeline scripts.
