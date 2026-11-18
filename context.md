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
│   │   ├── HeroScene.tsx
│   │   ├── JourneyScene.tsx
│   │   ├── ProjectDetailOverlay.tsx
│   │   ├── ProjectsScene.tsx
│   │   └── SkillsScene.tsx
│   └── ui/
│       ├── Cursor.tsx
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
3. **Chunk 3:** Gold cursor spotlight (desktop-only interactive glow).
4. **Chunk 4:** Two-column shell — fixed left column (hero/identity/nav) + scrolling right column (experience, projects, skills, contact).
5. **Chunk 5:** Dedicated About section with personal photo.
6. **Chunk 6:** Clean HTML project cards with video/media previews to replace the WebGL 3D carousel.
7. **Chunk 7:** Remove R3F canvas, Lenis, GSAP pinned viewport layout hacks, and unused orphan 3D components.
8. **Chunk 8:** Mobile polish, responsive tuning, performance audit, and production deployment check.

## Chunk Log
- **Pre-Chunk Initial Inspection (2026-11-18):** Completed full baseline audit of codebase, architecture, background canvas engine, 3D WebGL scene, state management, routes, content data, and build status. `context.md` established.
- **Chunk 1: Remove Frame Background & Decouple Loader (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Commit:** `569de4d` ("chunk 1: remove frame background, flat base").
  - Removed frame sequence canvas engine and 300 JPEG frames. Decoupled loader progress calculation.
- **Chunk 2: Palette Swap to Gold and Black (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Files Changed:**
    - `app/globals.css`: defined `--color-accent-gold: #F5B800;`, `--color-accent-gold-dim: #A67C00;`, `--color-border-glow: rgba(245, 184, 0, 0.3);`, `--color-accent-glow: rgba(245, 184, 0, 0.15);`. Removed `--color-accent-cyan` and `--color-accent-violet`. Renamed `.glow-cyan`/`.glow-violet` to `.glow-gold`/`.glow-gold-dim`. Replaced gradient utility with gold-to-dim-gold. Set selection to `rgba(245, 184, 0, 0.25)`.
    - `tailwind.config.ts`: replaced `cyan` and `violet` with `gold` and `'gold-dim'`.
    - `app/layout.tsx`: changed selection class from `selection:bg-accent-cyan/20` to `selection:bg-accent-gold/20`.
    - `components/ui/Cursor.tsx`: mapped cyan to gold and violet to gold-dim across dot and trailing ring.
    - `components/ui/DebugHUD.tsx`: mapped text and progress bar gradient from cyan/violet to gold/gold-dim.
    - `components/canvas/CameraRig.tsx`: mapped THREE.Color and directional lights to `#F5B800` and `#A67C00`. Replaced secondary amber `#f59e0b` with `#F5B800`.
    - `components/scenes/ContactScene.tsx`: replaced gold-to-orange gradient submit button with solid `#F5B800` button with high-contrast black text (`11.7:1` contrast ratio).
    - `app/style-guide/page.tsx`: mechanically mapped all tokens to gold/gold-dim and updated displayed color palette. *(Note: `/style-guide` route is marked as a candidate for deletion in a future chunk).*
    - `docs/transitions.md`: updated color descriptions to gold and dim gold.
    - `context.md`: updated tokens, chunk log, and roadmap.
  - **Orphan Files Note:** Three unmounted canvas files (`HeroShaderBackground.tsx`, `Journey3DObjects.tsx`, `Skills3DConstellation.tsx`) intentionally retain legacy cyan/violet references until deleted in Chunk 7.
