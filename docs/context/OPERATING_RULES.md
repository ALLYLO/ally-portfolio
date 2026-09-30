# Portfolio operating rules

This is the canonical source for durable Codex operating rules and regression guards. `AGENTS.md` is the short entry point. Follow the user's current task boundary; a task-specific restriction does not become a permanent rule.

## Mandatory preflight

Before analysis or changes: read `AGENTS.md` and this file; state the task scope and source of truth; read `PROJECT_CONTEXT.md` and only the relevant canonical context and source; check the guards below, whether context synchronization may be needed, and whether the action is destructive or high risk. Before Git operations, verify that `git rev-parse --show-toplevel` is this repository. If scope, authority, dependencies, or public-use permission conflict or remain unclear, stop the affected action and report `Needs confirmation` rather than guess.

## Facts and scope

- Current source establishes what is *currently implemented*, not whether a business claim is *confirmed*. Confirm a metric, outcome, personal attribution, or public-use permission only with the evidence and owner approval required by `CONTENT_GUIDE.md`.
- Historical chats, assistant suggestions, old pages labeled “final,” and file or directory names do not establish current decisions. Keep unsupported material as candidate or `Needs confirmation`; never invent missing experience, data, results, or design decisions.
- Change only what the current task authorizes. A copy edit does not authorize layout changes; a bug fix does not authorize refactoring; a visual change does not authorize business-content edits. Do not rename, move, delete, or reorganize unrelated files for convenience.
- Keep public-repository context free of conversation IDs, local absolute paths, identity mappings, internal record locations, raw business evidence, secrets, tokens, and credentials. Verify disclosure permission separately from anonymization.

## Regression guards

- Do not classify a file as unused, prototype, or obsolete by its name or directory. Before deletion or movement, check real static and dynamic references, iframe paths, previews, scripts, build and deployment dependencies, Git history, and independent use.
- Do not promote historical “final” wording, a candidate, or an assistant suggestion into `DECISIONS.md` without explicit owner confirmation.
- Keep all Portfolio Git operations inside this repository. Verify the selected root and stage only the intended paths; inspect staged and unstaged diffs before a commit.
- After an important UI or interaction change, verify the affected page, asset paths, relevant states, and necessary breakpoints. Match verification depth to risk.
- At task end, add a new guard here only for a demonstrated, reusable failure pattern. Do not turn a one-off issue or temporary task limit into a permanent rule.

## Context synchronization

In the same task, synchronize an owner-confirmed change that alters project positioning, final page copy, durable page or case-study structure, approved design principles, business facts or metric definitions, disclosure boundaries, existing decisions, or project-level rules. Maintain each fact with one owner: `PROJECT_CONTEXT.md` for baseline and context map; `CONTENT_GUIDE.md` for claim and disclosure standards; `DESIGN_GUIDE.md` for approved durable design constraints; `DECISIONS.md` for explicitly approved important decisions; `OPEN_QUESTIONS.md` for candidates and unresolved matters; `TODO.md` for work items, not facts; this file for operating rules and guards. `README.md` owns running, previewing, and deployment instructions. Do not duplicate a fact across documents. Experiments, routine implementation details, and minor visual adjustments need no formal context update. If confirmation or ownership is unclear, report `Context sync: Needs confirmation` without promoting a claim.

## Change units and rollback

- One independently reversible logical change is one atomic commit when committing is authorized. Split unrelated changes into separate commits. Keep implementation and its required canonical-context update in the same logical commit where practical; a context-only rule update may stand alone. A task that prohibits commits leaves changes uncommitted.
- Prefer rollback of the whole task or atomic commit, then file-level rollback, then hunk-level rollback. Before any rollback, inspect the target commit, later dependent commits, context consistency, active dependencies, and deployment effects.
- For changes already pushed to shared or public history, default to a traceable `git revert`. Do not rewrite that history unless the owner explicitly requests it with the impact understood.

## Verification and completion

Before finishing a modification, inspect the diff for scope and unintended changes; verify active dependencies and the affected behavior; confirm required context and operating-rule synchronization. Apply stricter reference and runtime checks after deletion, movement, refactoring, or important UI/interaction work. Scale checks to risk.

Report: `Rules preflight: Passed / Blocked`; `Scope`; `Context sync: Updated / Not required / Needs confirmation`; `Operating rules sync: Updated / Not required`; `Verification: Passed / Issues found`; `Rollback unit`; and, if applicable, `Commit: <hash> — <message>`. State explicitly when no commit was created.
