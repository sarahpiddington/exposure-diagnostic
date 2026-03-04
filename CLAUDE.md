# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 8080)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build locally
```

## Architecture Overview

This is **The Calm Exposure Snapshot** - a questionnaire-based diagnostic tool for UK small/medium businesses to assess their wellbeing and health & safety exposure. Built with Vite, React, TypeScript, and shadcn/ui.

### Application Flow

The app is a single-page wizard with five screens managed by state in `src/pages/Index.tsx`:

1. **StartScreen** - Welcome and begin
2. **QuestionScreen** - 15 questions across 3 sections (people strain, operational clarity, growth readiness)
3. **CaptureScreen** - Contact info form (name, email, business, phone) collected before showing results
4. **TransitionScreen** - Loading/transition before results
5. **SnapshotScreen** - Personalized results narrative

After `CaptureScreen` is submitted, answers + contact data are sent to a GHL (Go High Level) webhook (`services.leadconnectorhq.com`) configured in `Index.tsx`.

### Core Data Logic

- **`src/lib/questions.ts`** - 15 question definitions across 3 sections. Questions 1 and 12 support multi-select; the rest are single-select with 4-5 options. Earlier options (index 0-1) are positive/healthy; later options (index 2-3) indicate exposure/risk.
- **`src/lib/snapshots.ts`** - Three snapshot types with narrative content and the `determineSnapshot()` function. Logic counts "stretched signals", "growth signals", and "visibility signals" across answers, then applies priority rules:
  - ≥4 stretched signals → **Stretched and Exposed**
  - ≥3 stretched + ≥2 visibility → **Stretched and Exposed**
  - ≥3 growth signals → **Growth-Ready but Under-Prepared**
  - Default → **Informal but Holding**

### Styling System

- **Typography**: Three fonts via `font-heading` (Sansita), `font-body` (Barlow), `font-caption` (Arsenal)
- **Custom components**: `.calm-card`, `.answer-option`, `.calm-card-hover` defined in `src/index.css`
- **Animations**: `animate-fade-in`, `animate-slide-up` for page transitions
- **Colors**: HSL-based design tokens in CSS variables (teal/gold palette)

### Path Alias

Use `@/` to import from `src/` (e.g., `@/components/ui/button`).

### State Shape (Index.tsx)

All answers are stored as `Record<number, number | number[]>` where the key is the question index. Single-select answers are `number`; multi-select (questions 1 and 12) are `number[]`.
