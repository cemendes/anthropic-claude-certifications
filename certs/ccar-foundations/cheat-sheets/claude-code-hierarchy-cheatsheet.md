# ⚡ Cheat Sheet: Claude Code Hierarchy & Settings

---

## 1. `CLAUDE.md` Precedence Hierarchy

```
Priority 1 (Lowest)  : ~/.claude/CLAUDE.md         (Global user settings across all repos)
Priority 2           : ./CLAUDE.md                 (Project root settings shared with team)
Priority 3           : ./src/api/CLAUDE.md         (Subdirectory scoped rules)
Priority 4 (Highest) : ./src/api/v2/CLAUDE.md      (Deepest specific subdirectory rules)
```

---

## 2. Slash Commands Quick Reference

| Command | Purpose | When to Use |
|---|---|---|
| **`/init`** | Analyzes project and bootstraps initial `CLAUDE.md`. | First time setting up Claude Code in a repo. |
| **`/compact`** | Compresses active conversation history. | When session context gets long or slow. |
| **`/clear`** | Clears active conversation memory completely. | Starting a fresh task without prior context. |
| **`/cost`** | Shows token usage and cost for current session. | Auditing spend during development. |

---

## 3. Permissions Configuration Schema

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(npm test)",
      "FileRead"
    ],
    "ask": [
      "Bash(git push)",
      "Bash(npm run deploy)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "FileWrite(.env*)"
    ]
  }
}
```

---

## 4. Headless & CI/CD Automation

* **`claude -p "Review this PR diff"`**: Single-shot non-interactive execution.
* **`--output-format json`**: Outputs clean structured JSON for script parsing.
* **`--dangerously-skip-permissions`**: Bypasses interactive prompts in automated CI environments.
* **`.claudeignore`**: Prevents Claude from ingesting private secrets, credentials, and API keys.
