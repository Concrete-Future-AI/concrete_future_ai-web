# Repository Guidelines

## Project Structure & Module Organization
`外贸电商AI转型服务 - 完整页面设计文档.md` at the repo root is the canonical blueprint—treat it as the product spec and never edit it without design sign-off. Code that realizes the spec belongs in a `src/` tree you create if it does not yet exist: group large UI chunks inside `src/sections/` (hero, curriculum, testimonials), reusable pieces in `src/components/`, and shared tokens in `src/styles/tokens.css`. Place raw assets under `public/assets/<section>` so that imports stay human-readable (`/assets/hero/dashboard.png`). Keep experiments in `playground/` and purge them before opening a PR.

## Build, Test, and Development Commands
- `npm install` — install/update the Vite + PostCSS toolchain; run after every dependency change. If the repo was just cloned and lacks a `package.json`, bootstrap it with `npm create vite@latest .` before installing.
- `npm run dev` — start the Vite dev server with hot reload; use `--host` when sharing a LAN preview.
- `npm run build` — emit the production-ready bundle under `dist/`; this must succeed before you request review.
- `npm run preview` — sanity-check the optimized build locally.
- `npm run lint` — run Prettier/Stylelint (configure via `package.json` scripts) so the generated HTML and CSS stay consistent with the design tokens.

## Coding Style & Naming Conventions
Use 2-space indentation for HTML/JS and stick to the CSS custom properties defined in the design doc; declare them once in `src/styles/tokens.css` and reference via `var(--token-name)` instead of hard-coded hex values. Component filenames should be PascalCase (`AIHero.tsx`), section-level files kebab-case (`ai-hero.html`), and data mocks camelCase (`curriculumBlocks.ts`). Keep CSS modules scoped per section (`hero.module.css`) and reserve utility classes for layout primitives only.

## Testing Guidelines
Snapshot fidelity matters more than unit coverage. Add Playwright (or an equivalent) tests under `tests/visual/` and name them `<section>.spec.ts`; each test should load the section route and compare screenshots at desktop, tablet, and mobile breakpoints drawn from the spec (1440px, 1024px, 768px). If interactive JS is added, cover it with Vitest files colocated with the module (`module.spec.ts`). Block merges when visual diffs exceed a 0.1% threshold or when Lighthouse performance drops below 90.

## Commit & Pull Request Guidelines
Follow Conventional Commits so the changelog stays parseable (`feat: implement pricing timeline`, `fix: correct CTA padding`). Squash noisy WIP commits locally. Every PR must: (1) describe which portion of the design doc it implements, (2) link to the tracking issue, (3) attach before/after screenshots or GIFs for UI changes, and (4) paste the outputs of `npm run lint` and any tests. Request design review whenever you touch typography, color tokens, or spacing scales.
