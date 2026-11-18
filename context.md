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
  - Active: Google Fonts via `next/font/google`: `Syne` (display variable), `Inter` (body), `JetBrains_Mono` (mono variable `--font-mono`)
  - Local font files in `app/fonts/`: deleted (Geist fonts removed)
- **Tooling & Linting:** TypeScript `^5`, ESLint `^8`, `eslint-config-next` `14.2.35`, Prettier `^3.3.3`

## Folder Structure
```
Project_Shivansh/
├── app/
│   ├── favicon.ico
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
│   ├── journey.ts (active - educationHistory exported)
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
  - Card surfaces: `rgba(255, 255, 255, 0.02)` (`--color-surface-card` / `surface.card`)
  - Card hover surfaces: `rgba(255, 255, 255, 0.04)` (`--color-surface-card-hover` / `surface['card-hover']`)
  - Backdrop blur eliminated from all scene cards and active lists; retained strictly on modal overlay (`ProjectDetailOverlay.tsx`) and mobile dock (`Nav.tsx`). `.glass-panel` removed.
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
- Code / Mono: `JetBrains Mono` via `next/font/google` (`--font-mono`, `fontFamily.mono`)
- *Note: Geist fonts deleted from `app/fonts/`.*
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
5. **Chunk 5 (Done):** About section with personal photo (`public/images/shivansh.jpg`) + consolidated education content into `content/journey.ts`.
6. **Chunk 6 (Done):** Polish: photo hygiene (real JPEG 1000x1000, 181 KB), card surfaces (`surface.card` & `surface['card-hover']`), removed backdrop-blur from all active scene cards, JetBrains Mono font integration, projects list hover dimming (lg+), CursorSpotlight constants extracted.
6b. **Chunk 6b (Done):** Layout fixes: Name container query clamp `clamp(2rem, 10.5cqw, 4.5rem)` in left column; Skills section re-layout (stacked header, wrapping filter pills, full-width compact stats row, responsive category grid with unbreakable tags/pills, quote card relocated below grid).
7. **Chunk 7:** Cleanup: delete R3F canvas/scene files, orphans, /style-guide, uninstall three and @react-three/*, decide on GSAP/Lenis.
8. **Chunk 8:** Mobile polish, responsive tuning, performance audit, and production deployment check (merge to main via a Vercel preview).

## Old journey.ts (replaced)
```ts
export interface Milestone {
  year: string
  title: string
  description: string
}

export const milestones: Milestone[] = [
  {
    year: '2024',
    title: 'Started Engineering at DTU',
    description:
      'Joined Delhi Technological University in Mechanical Engineering (Automobile). This marked the beginning of my engineering journey and sparked my interest in software development beyond the classroom.',
  },
  {
    year: '2024',
    title: 'Entered the World of Programming',
    description:
      'Started learning programming from scratch, exploring web development, Python, Java, and problem-solving while discovering my passion for software engineering.',
  },
  {
    year: '2025',
    title: 'Built My First AI Applications',
    description:
      'Developed AI-powered assistants focused on intelligent conversations, automation, and productivity. This helped me understand how AI can solve practical problems.',
  },
  {
    year: '2025',
    title: 'Started Building Real Products',
    description:
      'Shifted from learning concepts to creating complete software projects including AI assistants, automation tools, and full-stack applications with real-world use cases.',
  },
  {
    year: '2026',
    title: 'Expanding Into Full-Stack & AI Engineering',
    description:
      'Focused on developing scalable applications, improving software engineering skills, strengthening DSA, and building products that combine artificial intelligence with modern web technologies.',
  },
  {
    year: 'Future',
    title: 'The Vision',
    description:
      'Build innovative AI products that impact millions of users while growing into a software engineer capable of creating world-class digital experiences.',
  },
]
```

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
- **Chunk 5: Personal Photo in About & Education Consolidation (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Assets:** Photo available at `public/images/shivansh.jpg` (1254x1254 px, 2.21 MB). Note: `public/resume.pdf` is missing on disk.
  - **About Photo:** Added personal portrait to `components/scenes/JourneyScene.tsx` using `next/image` (`width={400}`, `height={500}`, portrait 4:5, `object-cover`, sizes configured). Treated with `rounded-xl`, 1px border `rgba(245,184,0,0.3)`, and an offset gold outline frame behind it (offset 12px via `translate-x-3 translate-y-3`, shifts to 8px on hover with `duration-300`). Sits in a sub-column (~1/3 width at `lg`) beside the quote card; collapses above quote card with `max-w-xs` below `lg`.
  - **Education Data Consolidation:** Preserved old `content/journey.ts` milestone data in `context.md`. Rewrote `content/journey.ts` to export typed `educationHistory` (`EducationItem[]`) matching the displayed education cards verbatim. `JourneyScene.tsx` now renders education cards dynamically.
  - **Roadmap Adjustment:** Fonts decision moved to Chunk 6.
- **Chunk 6: Polish, Card Surfaces, JetBrains Mono & Photo Hygiene (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Photo Hygiene:** `public/images/shivansh.jpg` was originally PNG data with `.jpg` extension (2.21 MB). Re-encoded via .NET System.Drawing into a genuine baseline JPEG at 1000x1000, 82 quality (magic bytes `FF D8 FF E0`, 181,825 bytes / ~178 KB). Deleted redundant `.png` duplicate.
  - **Card Surfaces & Token Integration:** Defined `--color-surface-card: rgba(255, 255, 255, 0.02)` and `--color-surface-card-hover: rgba(255, 255, 255, 0.04)` in `globals.css` and `tailwind.config.ts`. Replaced all heavy backdrop blurs (`backdrop-blur-xl`, `backdrop-blur-md`, `backdrop-blur-2xl`) and hardcoded dark hex backgrounds across `JourneyScene`, `SkillsScene`, `ContactScene`, `ProjectsList`, and `MainShell` with flat `bg-surface-card` and `border border-white/10`. Deleted obsolete `.glass-panel` class. Preserved backdrop-blur strictly on modal (`ProjectDetailOverlay.tsx`) and mobile dock (`Nav.tsx`).
  - **Typography (Mono):** Added `JetBrains_Mono` from `next/font/google` (`--font-mono`), exported from `app/fonts.ts`, mapped to `<html>` class in `app/layout.tsx`, and bound in `tailwind.config.ts`. Deleted unused legacy `GeistVF.woff` and `GeistMonoVF.woff`. All 60+ `font-mono` labels now render with JetBrains Mono.
  - **Projects List Hover Interaction:** Added hover dimming at `lg:` in `ProjectsList.tsx`. Non-hovered project cards dim to 60% opacity while the actively hovered card retains 100% opacity.
  - **Cursor Spotlight Constants:** Extracted inline numbers (`SPOTLIGHT_RADIUS = 600`, `SPOTLIGHT_ALPHA_CENTER = 0.07`, `SPOTLIGHT_ALPHA_MID = 0.035`, `SPOTLIGHT_LERP = 0.12`, `SPOTLIGHT_IDLE_THRESHOLD = 0.2`) to documented named constants at the top of `CursorSpotlight.tsx`.
  - **Build Verification:** Production build verified with `npm run build` — 0 errors, 0 warnings. First Load JS remains lean at 154 kB.
- **Chunk 6b: Layout Bug Fixes (Name Sizing & Skills Re-layout) (2026-11-18):**
  - **Branch:** `redesign-gold-minimal`.
  - **Left Column Name Overflow:** Set `container-inline` (`container-type: inline-size`) on identity container and `min-w-0` on `<header>` and right column in `components/providers/MainShell.tsx`. Set name headline font-size to `text-[clamp(2rem,10.5cqw,4.5rem)]` with `leading-[0.9]` and `whitespace-nowrap` per line (`SHIVANSH` / `RAJ`). Value `10.5cqw` was chosen as Syne black letterforms fill ~89% of the track width, maintaining ~11% side margin across all viewports from 375px through 1920px.
  - **Skills Section Re-layout:** In `components/scenes/SkillsScene.tsx`:
    - Header (badge, title, subtitle) stacks at full width.
    - Category filter pills form a wrapping row directly under header (`flex flex-wrap gap-2`).
    - Overview card converted to a compact, full-width responsive 3-stat bar with 1px white border divider.
    - Category cards arranged in `grid grid-cols-1 xl:grid-cols-2 gap-4`, each card `min-w-0`.
    - Card headers contain icon + wrapping title + `shrink-0` mono count tag (replacing the protruding superscript).
    - Skill pills given `max-w-full flex flex-wrap items-center justify-between gap-x-2 gap-y-1`, skill names `min-w-0 break-words`, and level tags `shrink-0`, guaranteeing zero card boundary overflow.
    - Quote card moved below category grid at full width.
  - **Verification vs Reasoning:**
    - *Verified via Real Headless Chrome (CDP)* at 375, 768, 1024, 1280, 1440, and 1920px:
      - `document.documentElement.scrollWidth <= window.innerWidth`: Passed (0px horizontal overflow at all viewports).
      - `SHIVANSH` line fits column: Verified (375px: 327px/327px, 768px: 657px/657px, 1024px: 374px/374px, 1280px: 488.9px/488.9px, 1440px+: 495.7px/495.7px).
      - Skills pills & tags overflow: 0 overflows across all 6 cards and 22 pills at every viewport.
      - Screenshots captured to temp directory: `C:\Users\HP victos\AppData\Local\Temp\screenshots\viewport-{width}.png`.
    - *Reasoned:* CSS clamp behaviors outside tested discrete breakpoints.

## Known Layout Risks (Step 3 Audit)
- **`JourneyScene.tsx` (Photo offset frame at 375px):** The offset gold outline frame behind the portrait photo uses absolute positioning with `translate-x-3 translate-y-3` (+12px). At 375px with 24px side padding (`px-6` = 48px), the container width is 327px. While `max-w-xs` is 320px, 320px + 12px = 332px, which risks slight right-side clipping if outer padding is tighter than 12px.
- **`ContactScene.tsx` (Direct email address on narrow mobile):** `shivanshrajoo@gmail.com` is rendered as an unbroken 23-character string with font size `text-lg sm:text-xl font-bold`. Inside a `p-5` card (40px horizontal padding) at 375px viewport (327px track), the email link takes ~280px out of 287px available. If viewport drops below 360px without word break, it risks pushing card bounds.
- **`Loader.tsx` (100% counter box at 375px):** The main percentage display box inside `Loader.tsx` uses `px-10 py-4` (80px horizontal padding) and `text-7xl` font size. On screens narrower than 360px, the bracketed box width approaches the screen margin before the 800ms dismissal.
