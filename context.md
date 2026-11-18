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
│   └── style-guide/
│       └── page.tsx
├── components/
│   ├── canvas/
│   │   ├── CameraRig.tsx
│   │   ├── ContactAtmosphere.tsx (orphan)
│   │   ├── HeroShaderBackground.tsx (orphan)
│   │   ├── Journey3DObjects.tsx (orphan)
│   │   ├── ProjectCard3D.tsx
│   │   ├── ProjectCarousel3D.tsx
│   │   ├── Scene.tsx
│   │   ├── ScenePostProcessing.tsx
│   │   └── Skills3DConstellation.tsx (orphan)
├── providers/
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
- **Pending Replacement (Cyan & Violet):**
  - Cyan (`#00d9ff`, `--color-accent-cyan`, `accent-cyan`, `--color-border-glow`, `--color-accent-glow`)
  - Violet (`#8b5cf6`, `--color-accent-violet`, `accent-violet`)
  - *To be replaced in Chunk 2.*
- **Surface & Backgrounds:**
  - Base pitch black: `#000000` (`--color-bg-base: 0 0 0`)
  - Deep dark surfaces: `#08090d` (`--color-bg-surface: 8 9 13`), `#0e1018` (`--color-bg-surface-elevated: 14 16 24`)
  - Component glass cards: `#0d0d10`, `#121215`, `#16140e`, `#1a1710`, `#0c0c0e` with backdrop blur (16px–24px)
- **Borders:**
  - Subtle: `rgba(255, 255, 255, 0.06)` (`--color-border-subtle`)
  - Glow: `rgba(0, 217, 255, 0.3)` (`--color-border-glow`)
  - Amber border accents: `#F5B800/30`, `#F5B800/40`, `#F5B800/60`
- **Text:**
  - Primary: `#f8fafc` (`--color-text-primary`)
  - Secondary: `#94a3b8` (`--color-text-secondary`)
  - Muted: `#475569` (`--color-text-muted`)

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
2. **Chunk 2:** Palette swap — systematically replace cyan and violet tokens with gold and neutral monochrome.
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
  - **Files Changed:**
    - `app/layout.tsx`: removed `ScrollVideoBackground` import and JSX mount.
    - `components/canvas/Scene.tsx`: cleaned up file header comment to remove scroll video references.
    - `components/ui/Loader.tsx`: decoupled preloader progress from frame count; now gates solely on project video preloading (`videosRatio * 100`).
    - `lib/scrollStore.ts`: removed `framesLoaded`, `totalFramesToPreload`, `setFramesLoaded`, `videoStatus`, `videoDuration`, `setVideoStatus`, and `VideoStatus` type. Kept `videosLoadedCount` and its setter.
    - `app/globals.css`: registered `--color-accent-gold: #F5B800;` in `:root`. Verified solid black base `--color-bg-base: 0 0 0;` on `html` and `body`.
    - `tailwind.config.ts`: registered `accent.gold: 'var(--color-accent-gold)'`.
    - `context.md`: updated documentation, tokens, roadmap, and chunk log.
  - **Files Deleted:**
    - `components/canvas/ScrollVideoBackground.tsx`
    - `public/frames/` (directory containing 300 JPG frames, freeing ~7.23 MB).
  - **Decisions Made:**
    - Verified that `Loader.tsx` preloads the 4 project videos (`PROJECT_VIDEOS`) for Three.js video textures; kept that gate intact while dropping the frame counter.
    - Verified zero remaining references to `ScrollVideoBackground`, `framesLoaded`, `/frames/`, or `ezgif-frame` in the repository.
    - Verified build passes with 0 errors and 0 warnings.
