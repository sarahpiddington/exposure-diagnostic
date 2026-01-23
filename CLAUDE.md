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
```

## Architecture Overview

This is **The Calm Exposure Snapshot** - a questionnaire-based diagnostic tool for UK small/medium businesses to assess their wellbeing and health & safety exposure. Built with Vite, React, TypeScript, and shadcn/ui.

### Application Flow

The app is a single-page wizard with four screens managed by state in `src/pages/Index.tsx`:

1. **StartScreen** - Welcome and begin
2. **QuestionScreen** - 11 questions across 3 sections (people strain, operational clarity, growth readiness)
3. **TransitionScreen** - Loading/transition before results
4. **SnapshotScreen** - Personalized results narrative

### Core Data Logic

- **`src/lib/questions.ts`** - Question definitions with sections and options. Each question has 4 answer options (positive → neutral → concerning → unsure)
- **`src/lib/snapshots.ts`** - Three snapshot types ("informal", "stretched", "growth-ready") with narrative content. The `determineSnapshot()` function maps answer patterns to snapshots based on counts of positive/concerning/unsure answers

### Styling System

- **Typography**: Three fonts via `font-heading` (Sansita), `font-body` (Barlow), `font-caption` (Arsenal)
- **Custom components**: `.calm-card`, `.answer-option`, `.calm-card-hover` defined in `src/index.css`
- **Animations**: `animate-fade-in`, `animate-slide-up` for page transitions
- **Colors**: HSL-based design tokens in CSS variables (teal/gold palette)

### Path Alias

Use `@/` to import from `src/` (e.g., `@/components/ui/button`).
