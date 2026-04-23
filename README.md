# Full-Stack Developer — Home Assignment

**Time:** ~60 minutes
**Tools:** Use anything — AI, docs, Google. We care about your judgment, not your memory.
**Important:** `DECISIONS.txt` matters as much as the code. Explain your thinking.

---

## Getting Started

1. Click **"Use this template"** on GitHub to create your own private copy
2. Clone your new repo locally
3. Follow the setup below

**Requires Node.js 18+**

---

## Setup

```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev

# Frontend (pick one — open a second terminal)
cd frontend/react    # or frontend/vue or frontend/svelte
npm install
npm run dev
```

Backend runs on `http://localhost:3001`
Frontend runs on `http://localhost:5173`

> The dev server proxies `/policies` and `/health` to the backend. If you add new API routes, add them to `vite.config.ts`.

---

## The Data

The database contains ~20 insurance policies. Each policy has:

| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment ID |
| policyNumber | String | Unique policy identifier |
| holderName | String | Client's full name |
| insurerName | String | Insurance company name |
| type | String | life / health / pension / savings |
| status | String | active / expired / cancelled |
| premium | Float | Monthly payment amount |
| startDate | DateTime | Policy start date |
| endDate | DateTime | Policy end date |
| agentId | String | Assigned agent ID |

---

## Task 1 — Review & Refactor (~25 min)

Open `backend/src/routes/policies.ts`. This file contains the policies API. It works — all existing functionality is correct.

**But the code has problems.**

Your job:

1. Review the code and identify what's wrong
2. Pick the **2–3 most important issues** and fix them
3. In `DECISIONS.txt` → Task 1 section: list what you found, what you fixed, what you left, and **why you prioritized the way you did**

Don't try to fix everything. We want to see how you prioritize.

---

## Task 2 — Build a Feature (~35 min)

**Business context:**

> An insurance agent manages ~200 clients. They need a page to view their clients' policies and quickly identify policies that need attention — specifically, policies expiring within 30 days.

Your job:

1. Add the API endpoint(s) you think are needed
2. Build the frontend page in your chosen framework
3. In `DECISIONS.txt` → Task 2 section: document your assumptions, design choices, and what you'd do differently with more time

We intentionally don't specify the exact API contract, fields to display, or UI layout. Make your own decisions — that's part of the exercise.

---

## Commits

Make at least one commit per task. This helps us see how you organize your work.

```bash
# After Task 1
git add -A && git commit -m "Task 1: review and refactor"

# After Task 2
git add -A && git commit -m "Task 2: agent policies page"
```

---

## Submission

1. Push your work
2. Add `VOVA7ALTERMAN` as a collaborator: **Settings → Collaborators → Add people**
3. Share the repo URL with us

---

## What We're Looking For

- **Judgment** — Can you identify what matters most and act on it?
- **Decision-making** — Can you make reasonable choices with incomplete requirements?
- **Code quality** — Clean TypeScript, sensible structure, proper error handling
- **Communication** — Can you explain your thinking clearly in DECISIONS.txt?

We're not looking for perfection. We're looking for how you think.
