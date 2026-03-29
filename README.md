# The Vulnerability Check

A questionnaire-based tool for UK small/medium businesses to assess their wellbeing and health & safety vulnerability. Built by Safe and Well Together (SAWT).

## What it does

Users complete 15 questions across 3 sections (People Strain, Operational Clarity, Growth Readiness) and receive one of three personalised narrative results:

- **Informal but Holding** — coping now, relying on goodwill
- **Stretched and Vulnerable** — pressure already showing
- **Growth-Ready but Under-Prepared** — ambition ahead, foundations missing

After completing the questionnaire, contact details are captured and sent to GHL (Go High Level) via webhook. Sarah receives an email notification and the contact + answers are stored in GHL.

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- Deployed on Render.com

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (port 8080)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
npm run test      # Run tests
```

## Key files

| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main state container, screen router, GHL webhook |
| `src/lib/questions.ts` | 15 question definitions (Q1 and Q12 are multi-select) |
| `src/lib/snapshots.ts` | 3 snapshot types + `determineSnapshot()` logic |
| `src/index.css` | Global styles, design tokens, custom component classes |

## Integrations

- **GHL webhook**: Fires on CaptureScreen submit. Sends name, email, phone, business, snapshot type, all answers, and timestamp. Configured in `Index.tsx`.
- **GHL workflow** ("Inbound Diagnostic"): Creates/updates contact, adds answers as a note, emails sarah@safeandwelltogether.com.
