# Project Context & Architecture

## Project Overview
- **Name:** Shivansh Raj Portfolio (`shivansh-portfolio`)
- **Subject:** Shivansh Raj — Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University (DTU, B.Tech AE 2024–2028).
- **Architecture:** Next.js 14 App Router single-page portfolio. Undergoing a multi-chunk redesign towards a minimal, dark gold-and-black aesthetic with a fixed left column and scrolling right column.
- **Current State:** Functional, builds cleanly (`next build` succeeds with 0 errors/warnings). Branch: `redesign-gold-minimal`.

## Tech Stack
- **Framework:** Next.js `14.2.35` (App Router)
- **UI & Runtime:** React `^18`, React DOM `^18`, Node `v24.11.1` (no node version pinned in package.json)
- **Package Manager:** `npm` (via `package-lock.json`)
- **3D & Graphics:** 
  - `three`: `^0.167.0`
  - `@react-three/fiber`: `^8.17.10`
  - `@react-three/drei`: `^9.112.0`
  - `@react-three/postprocessing`: `^2.16.3`
- **Animation & Scrolling:**
  - `gsap`: `^3.12.5`
  - `@gsap/react`: `^2.1.1`
  - `lenis`: `^1.1.14`
- **State Management:** `zustand`: `^4.5.4`
- **Styling:**
  - `tailwindcss`: `^3.4.1`
  - `postcss`: `^8`
  - `clsx`: `^2.1.1`
- **Typography:**
  - Active: Google Fonts via `next/font/google`: `Syne` (display variable), `Inter` (body)
  - Unused local font files in `app/fonts/`: `GeistVF.woff`, `GeistMonoVF.woff`
- **Tooling & Linting:** TypeScript `^5`, ESLint `^8`, `eslint-config-next` `14.2.35`, Prettier `^3.3.3`

## Folder Structure
```
Project_Shivansh/
├── app/
│   ├── favicon.ico
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── style-guide/ (candidate for deletion in future chunk)
│       └── page.tsx
├── components/
│   ├── canvas/
│   │   ├── CameraRig.tsx
│   │   ├── ContactAtmosphere.tsx (orphan - to delete in Chunk 7)
│   │   ├── HeroShaderBackground.tsx (orphan - to delete in Chunk 7)
│   │   ├── Journey3DObjects.tsx (orphan - to delete in Chunk 7)
│   │   ├── ProjectCard3D.tsx
│   │   ├── ProjectCarousel3D.tsx
│   │   ├── Scene.tsx
│   │   ├── ScenePostProcessing.tsx
│   │   └── Skills3DConstellation.tsx (orphan - to delete in Chunk 7)
│   ├── providers/
│   │   ├── MainShell.tsx
│   │   ├── SmoothScrollProvider.tsx
│   │   └── TabTitleController.tsx
│   ├── scenes/
│   │   ├── ContactScene.tsx
│   │   ├── HeroScene.tsx (unmounted - to delete in Chunk 7)
│   │   ├── JourneyScene.tsx
│   │   ├── ProjectDetailOverlay.tsx
│   │   ├── ProjectsScene.tsx (unmounted - to delete in Chunk 7)
│   │   └── SkillsScene.tsx
│   ├── sections/
│   │   └── ProjectsList.tsx
│   └── ui/
│       ├── Cursor.tsx
│       ├── CursorSpotlight.tsx
│       ├── DebugHUD.tsx
│       ├── Loader.tsx
│       └── Nav.tsx
├── content/
│   ├── contact.ts
│   ├── identity.ts
│   ├── journey.ts (orphan - data not imported by JourneyScene)
│   ├── projects.ts
│   └── skills.ts
├── docs/
│   └── transitions.md
├── lib/
│   ├── motion/
│   │   ├── index.ts
│   │   └── tokens.ts
│   ├── constants.ts
│   ├── scrollStore.ts
│   ├── sound.ts
│   └── soundStore.ts
├── public/
│   └── videos/ (4 MP4 files: aria_vid.mp4, ind_sig.mp4, obsidian_vid.mp4, shivantra_vid.mp4, 2.96 MB)
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .vercelignore
├── active-theory-example.mp4 (15.4 MB - root dev asset)
├── content-brief.md
├── indiasignal_image.png (604 KB - root dev asset)
├── obsidian_image.png (336 KB - root dev asset)
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Design Tokens

### Color Palette
- **Primary Brand Amber / Gold:** `#F5B800`
  - Defined in `globals.css`: `--color-accent-gold: #F5B800;`
  - Defined in `tailwind.config.ts`: `accent.gold: 'var(--color-accent-gold)'`
  - Consistently used across scene cards, loader accents, nav highlights, and interactive borders.
- **Secondary Accent (Dim Gold):** `#A67C00`
  - Defined in `globals.css`: `--color-accent-gold-dim: #A67C00;`
  - Defined in `tailwind.config.ts`: `accent['gold-dim']: 'var(--color-accent-gold-dim)'`
  - Used in gradients, second light channels, and secondary interactive states where dual accents were formerly used.
- **Surface & Backgrounds:**
  - Base pitch black: `#000000` (`--color-bg-base: 0 0 0`)
  - Deep dark surfaces: `#08090d` (`--color-bg-surface: 8 9 13`), `#0e1018` (`--color-bg-surface-elevated: 14 16 24`)
  - Component glass cards: `#0d0d10`, `#121215`, `#16140e`, `#1a1710`, `#0c0c0e` with backdrop blur (16px–24px)
- **Borders & Glows:**
  - Subtle: `rgba(255, 255, 255, 0.06)` (`--color-border-subtle`)
  - Glow: `rgba(245, 184, 0, 0.3)` (`--color-border-glow`)
  - Accent glow: `rgba(245, 184, 0, 0.15)` (`--color-accent-glow`)
  - Utilities: `.glow-gold` (`box-shadow: 0 0 35px -5px rgba(245, 184, 0, 0.3)`), `.glow-gold-dim` (`box-shadow: 0 0 35px -5px rgba(166, 124, 0, 0.3)`)
  - Amber border accents: `#F5B800/30`, `#F5B800/40`, `#F5B800/60`
- **Selection:** `rgba(245, 184, 0, 0.25)`
- **Text:**
  - Primary: `#f8fafc` (`--color-text-primary`)
  - Secondary: `#94a3b8` (`--color-text-secondary`)
  - Muted: `#475569` (`--color-text-muted`)
- **Cyan & Violet Status:** Fully eliminated from active UI, layout, store, and Tailwind configuration. Three orphan unmounted components (`HeroShaderBackground.tsx`, `Journey3DObjects.tsx`, `Skills3DConstellation.tsx`) intentionally retain legacy values until deletion in Chunk 7.

### Typography Tokens
- Display font: `Syne` (variable font, `--font-display`)
- Body font: `Inter` (variable font, `--font-body`)
- Code / Mono: `var(--font-mono, monospace)`
- *Note: Space Grotesk and JetBrains Mono are not loaded.*
- Fluid Clamp Scales (`globals.css`):
  - `display-xxl`: `clamp(2.75rem, 7.5vw, 7.5rem)`
  - `display-xl`: `clamp(2.2rem, 5.5vw, 5.5rem)`
  - `display-lg`: `clamp(1.75rem, 3.2vw, 3.25rem)`
  - `heading-md`: `clamp(1.3rem, 2vw, 2.2rem)`
  - `watermark`: `clamp(4.5rem, 12vw, 14rem)`
  - `body-lg`: `clamp(1.05rem, 0.9vw, 1.3rem)`
  - `body-md`: `clamp(0.95rem, 0.5vw, 1.05rem)`
  - `body-sm`: `clamp(0.8rem, 0.3vw, 0.9rem)`
  - `caption`: `clamp(0.68rem, 0.25vw, 0.75rem)`

### Motion Tokens (`lib/motion/tokens.ts`)
- **Easings:**
  - `cinematic`: GSAP `'power4.inOut'` / CSS `cubic-bezier(0.76, 0, 0.24, 1)`
  - `snap`: GSAP `'expo.out'` / CSS `cubic-bezier(0.16, 1, 0.3, 1)`
  - `enter`: GSAP `'power2.out'` / CSS `cubic-bezier(0.33, 1, 0.68, 1)`
  - `exit`: GSAP `'power2.in'` / CSS `cubic-bezier(0.32, 0, 0.67, 0)`
  - `spring`: GSAP `'back.out(1.4)'` / CSS `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Durations:**
  - `fast`: `0.15s` (`150ms`), `base`: `0.4s` (`400ms`), `slow`: `0.8s` (`800ms`), `cinematic`: `1.4s` (`1400ms`), `epic`: `2.4s` (`2400ms`)

## Tentative Redesign Roadmap
1. **Chunk 1 (Done):** Safety branch, remove scroll-scrubbed frame background, delete 300 JPG frames, decouple preloader and store, establish solid black base `#000000`, register `--color-accent-gold: #F5B800`.
2. **Chunk 2 (Done):** Palette swap to gold and black — defined gold (`#F5B800`) and dim gold (`#A67C00`), removed cyan and violet tokens, updated selection, cursor, HUD, CameraRig lighting, and contact button.
3. **Chunk 3 (Done):** Gold cursor spotlight (desktop-only interactive glow at `z-[1]`, 600px radial gradient, lerp 0.12, rAF with idle cutoff, zero mousemove React re-renders) + orange gradient clearance (`#E65100`, `#FFB300`).
4. **Chunk 4 (Done):** Two-column shell — fixed left column (hero/identity/nav) + scrolling right column (normal document flow: About, HTML ProjectsList, Skills, Contact). Unmounted WebGL Scene, unmounted HeroScene and ProjectsScene, decoupled Loader to fixed 800ms sequence, updated SECTION_IDS to 4 canonical sections, replaced ScrollTriggers with IntersectionObserver.
5. **Chunk 5:** About with photo + consolidate journey content + font decision.
6. **Chunk 6:** Polish: solid card surfaces, remove backdrop-blur, hover states, spotlight tuning.
7. **Chunk 7:** Cleanup: delete R3F canvas/scene files, orphans, /style-guide, uninstall three and @react-three/*, decide on GSAP/Lenis.
8. **Chunk 8:** Mobile polish, responsive tuning, performance audit, and production deployment check (merge to main via a Vercel preview).

## Chunk 4 Implementation Plan
- **SECTION_IDS & SECTION_ORDER (`lib/constants.ts` & `lib/scrollStore.ts`):**
  - Drop `HERO: 'hero'`. The 4 canonical sections are: `JOURNEY: 'journey'` (About), `PROJECTS: 'projects'`, `SKILLS: 'skills'`, `CONTACT: 'contact'`.
  - `SECTION_ORDER`: `['journey', 'projects', 'skills', 'contact']`.
  - In `scrollStore.ts`, initial `activeSection` is `SECTION_IDS.JOURNEY`. `chapterProgress` typed as `Record<string, number>` to avoid type friction with orphan files, initialized with 4 keys.
- **Scroll & Active Section Detection (`SmoothScrollProvider.tsx`):**
  - Grep audit revealed `chapterProgress` is only consumed by unmounted 3D canvas files (`HeroShaderBackground`, `Journey3DObjects`, `ProjectCarousel3D`) and `DebugHUD`. Whole-page `scrollProgress` is set by `lenis.on('scroll')` and is retained.
  - Removed the per-section GSAP `ScrollTrigger` instances in `SmoothScrollProvider` that previously tracked section scrub and active toggle.
  - Implemented an `IntersectionObserver` across the right-column section elements (`#journey`, `#projects`, `#skills`, `#contact`) with a `-20% 0px -40% 0px` rootMargin to write `activeSection` into `useScrollStore`.
  - Kept Lenis smooth scroll engine, ticker, and `scrollerProxy` fully active.
- **Unmounted Components & WebGL Teardown:**
  - Unmounted `<Scene />` from `app/layout.tsx`.
  - Unmounted `<HeroScene />` and `<ProjectsScene />` from `app/page.tsx`.
  - Created `components/sections/ProjectsList.tsx` for HTML-based project cards with `ProjectDetailOverlay` modal.
  - Simplified `Loader.tsx`: eliminated 4-video preloading gate; replaced with fixed ~800ms progress sequence that preserves the cyberpunk diagnostic aesthetic.
- **Legacy Files to Remove in Chunk 7:**
  - `components/canvas/Scene.tsx`
  - `components/canvas/CameraRig.tsx`
  - `components/canvas/ProjectCard3D.tsx`
  - `components/canvas/ProjectCarousel3D.tsx`
  - `components/canvas/ScenePostProcessing.tsx`
  - `components/canvas/ContactAtmosphere.tsx` (orphan)
  - `components/canvas/HeroShaderBackground.tsx` (orphan)
  - `components/canvas/Journey3DObjects.tsx` (orphan)
  - `components/canvas/Skills3DConstellation.tsx` (orphan)
  - `components/scenes/HeroScene.tsx`
  - `components/scenes/ProjectsScene.tsx`

## Chunk Log
- **Pre-Chunk Initial Inspection (2026-11-18):** Completed full baseline audit of codebase, architecture, background canvas engine, 3D WebGL scene, state management, routes, content data, and build status. `context.md` established.
- **Chunk 1: Remove Frame Background & Decouple Loader (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Commit:** `569de4d` ("chunk 1: remove frame background, flat base").
  - Removed frame sequence canvas engine and 300 JPEG frames. Decoupled loader progress calculation.
- **Chunk 2: Palette Swap to Gold and Black (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Commit:** `6bab6b1` ("chunk 2: gold and black palette swap").
  - Defined gold (`#F5B800`) and dim gold (`#A67C00`), removed cyan and violet tokens, updated selection, cursor, HUD, CameraRig lighting, and contact button.
- **Chunk 3: Gold Cursor Spotlight & Orange Clearance (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Commit:** `afd881b` ("chunk 3: gold cursor spotlight and orange clearance").
  - Cleared remaining orange gradients (`#E65100`, `#FFB300`) from `ProjectDetailOverlay.tsx` and `Loader.tsx`.
  - Created `components/ui/CursorSpotlight.tsx` mounted at `z-[1]` in `app/layout.tsx` (600px radial, lerp 0.12, rAF idle cutoff, `pointer-events: none`).
- **Chunk 4: Two-Column Shell & WebGL Unmount (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Two-Column Shell:** Built in `components/providers/MainShell.tsx`. At `lg:`, left column is sticky (`lg:sticky lg:top-0 lg:h-dvh`, 44% width), right column scrolls (54% width). Below `lg`, single column with left content on top. Container max-width 1280px with generous padding (`px-6 sm:px-12 lg:px-16`). Transparent backgrounds ensure cursor spotlight shows through.
  - **Left Column Content:** "SHIVANSH RAJ" headline with HeroScene display treatment, role line, tagline & short bio from `content/identity.ts`, resume download button, contact CTA, social links from `content/contact.ts`.
  - **Nav Rail:** Built in `components/ui/Nav.tsx`. 4 items: About, Projects, Skills, Contact. Active item displays gold text with line expanding from 32px to 64px (`w-16 bg-[#F5B800]`); inactive items display muted text with line expanding on hover. Mobile bottom dock retained with 4 items.
  - **Active Section Detection:** Removed per-section ScrollTriggers in `SmoothScrollProvider.tsx`; added `IntersectionObserver` observing right-column sections with `-20% 0px -40% 0px` rootMargin and top-of-page scroll check writing `activeSection` to store.
  - **Sections Flow:** `app/page.tsx` renders in normal document flow: About (`JourneyScene`, de-pinned), Projects (`ProjectsList`, simple HTML cards linking to `ProjectDetailOverlay`), Skills (`SkillsScene`, de-pinned), Contact (`ContactScene`, de-pinned).
  - **Constants & Store:** Removed `HERO` from `SECTION_IDS` and `SECTION_ORDER`. Default active section is `SECTION_IDS.JOURNEY`.
  - **WebGL Teardown:** Unmounted `<Scene />` from `app/layout.tsx`, `<HeroScene />` and `<ProjectsScene />` from `app/page.tsx`.
  - **Loader Decoupling:** Replaced 4-video preloading gate in `Loader.tsx` with a fixed ~800ms progress sequence preserving all diagnostic visuals. First Load JS dropped from 218 kB to 148 kB.
