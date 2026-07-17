# Clarity Ledger

**Every instruction has a source. Every conflict has a trail.**

Clarity Ledger is an AI evidence and contradiction workbench for teams whose policies, memos, email updates, checklists, and chat guidance do not always agree. It creates a dated source register, highlights contradiction candidates, drafts decision-ready clarification questions, and separates safe automation opportunities from actions that must remain under human control.

## Build Week category

Work & Productivity

## Working demo

The demo uses a fictional organization and synthetic content only. No customer, employer, healthcare, or confidential operational data is included.

Try this flow:

1. Browse and search the Source Register.
2. Select a source to inspect its owner, authority, date, and cited excerpt.
3. Click **Run evidence analysis**.
4. Review the three side-by-side contradiction candidates.
5. Route a conflict to the Clarification Queue.
6. Open the Automation Map to see where human approval remains required.

## Why it matters

Organizations lose time and assume risk when guidance is distributed across formats and dates. A normal search can retrieve both answers without explaining that they conflict. Clarity Ledger preserves provenance and makes ambiguity visible before automation accelerates the wrong instruction.

## How Codex and GPT-5.6 were used

Codex served as the build environment and implementation partner: translating the product brief into the information architecture, interaction model, responsive interface, validation workflow, and submission assets. GPT-5.6 supported the reasoning-intensive design of the evidence model, contradiction explanations, clarification routing, and safety boundaries.

The current public demo is deterministic and uses synthetic data so reviewers can evaluate the complete workflow without credentials, API keys, or exposure of private material. A production implementation would add controlled ingestion, retrieval, structured model outputs, evaluation, permissions, and auditable human approvals.

## Safety design

- Evidence-preserving, not decision-making
- Source, date, owner, and authority remain visible
- Informal guidance is not silently elevated to policy
- Contradictions are candidates for human validation
- No automatic policy update, enforcement, or personnel decision
- Synthetic demonstration data only

## Local development

Requirements: Node.js 22.13+ and pnpm.

```bash
pnpm install
pnpm dev
```

For Windows PowerShell:

```powershell
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
pnpm exec vinext dev
```

Production build:

```powershell
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
pnpm exec vinext build
```

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS, vinext, Cloudflare Workers/Sites.

## Submission checklist

See [SUBMISSION.md](./SUBMISSION.md) for the Devpost description, demo script, repository-sharing requirements, and final checklist.