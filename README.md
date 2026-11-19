# Shivansh Raj — Portfolio

Personal portfolio site for Shivansh Raj, Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University (B.Tech AE, 2024–2028).

**Live URL:** https://shivanshraj-portfolio.vercel.app

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Styling | Tailwind CSS 3 + PostCSS |
| Animation | GSAP 3 + @gsap/react |
| Smooth scroll | Lenis 1 |
| State | Zustand 4 |
| Fonts | Syne (display), Inter (body), JetBrains Mono (mono) — all via `next/font/google` |
| Language | TypeScript 5 |
| Linting | ESLint + Prettier |

No WebGL or Three.js — the 3D canvas layer was removed in the redesign. All sections are plain HTML/CSS.

---

## Sections

The site is a single page with a fixed left identity column and a scrolling right column:

| Section | File |
|---|---|
| Left column (name, nav, socials, CTAs) | `components/providers/MainShell.tsx` |
| About | `components/scenes/JourneyScene.tsx` |
| Projects | `components/sections/ProjectsList.tsx` |
| Skills | `components/scenes/SkillsScene.tsx` |
| Contact | `components/scenes/ContactScene.tsx` |

Content lives in `content/`: `identity.ts`, `contact.ts`, `projects.ts`, `skills.ts`, `journey.ts`.

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

---

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for the contact form. If not set, the form falls back to a `mailto:` link. |

Create a `.env.local` file at the project root with the above variable to enable the contact form backend.

---

## Assets

- `public/images/shivansh.jpg` — Profile photo (JPEG, 1000×1000)
- `public/resume.pdf` — Resume PDF linked from the left column and the About section
- `public/videos/` — Project demo videos referenced from project data (`content/projects.ts`)

---

## Deployment

Deployed on Vercel. Push to `main` and Vercel picks it up automatically. The canonical URL (`SITE_URL`) is set in `app/layout.tsx` — update it there if the domain changes.
