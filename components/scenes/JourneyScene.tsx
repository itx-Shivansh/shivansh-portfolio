'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { sound } from '@/lib/sound'
import { educationHistory } from '@/content/journey'

export default function JourneyScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full select-none space-y-8 scroll-mt-20"
    >
      <div className="w-full space-y-8 z-10 relative pointer-events-auto select-none">
        {/* ── Top Header Row: Chapter Badge & Download Resume Button ──── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="rounded-full border border-[#F5B800]/30 bg-surface-card px-4 py-1.5 flex items-center gap-2.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">
              About
            </span>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="rounded-full border border-white/20 bg-surface-card hover:bg-surface-card-hover px-5 py-2 text-xs font-mono font-medium text-white transition-all duration-200 hover:border-white/40 flex items-center gap-2 shadow-lg hover:scale-105"
          >
            <span>DOWNLOAD RESUME</span>
            <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* ── Hero Title & Quote Row ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 items-start">
          {/* Left Column: Heading, Subtitle & Bio */}
          <div className="space-y-5">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-white">About </span>
              <span className="text-[#F5B800]">Me</span>
            </h2>

            <div className="flex items-center gap-3 text-neutral-300 text-sm md:text-base font-normal tracking-wide">
              <span className="w-6 h-[2px] bg-[#F5B800] rounded-full inline-block" />
              <p>Engineering student. Problem solver. Builder. Lifelong learner.</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-2xl">
              <p>
                I&apos;m an engineering student at Delhi Technological University, passionate about building intelligent software, AI-powered applications, and immersive digital experiences that solve real-world problems.
              </p>
              <p>
                I love turning ideas into impactful products and constantly exploring new technologies to grow as a developer and create meaningful impact.
              </p>
            </div>

            {/* 4-Item Quick Info Grid Bar */}
            <div className="pt-2">
              <div className="rounded-2xl border border-white/10 bg-surface-card p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 md:divide-x divide-white/10 shadow-2xl">
                {/* Item 1 */}
                <div className="flex flex-col items-start space-y-1.5 pr-2 pt-2 md:pt-0">
                  <div className="text-[#F5B800]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">
                    Delhi Technological University (DTU)
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium">College</span>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-start space-y-1.5 md:pl-4 pr-2 pt-2 md:pt-0">
                  <div className="text-[#F5B800]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">B.Tech AE</span>
                  <span className="text-[11px] text-neutral-400 font-medium">Mechanical Engineering (Automotive)</span>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-start space-y-1.5 md:pl-4 pr-2 pt-2 md:pt-0">
                  <div className="text-[#F5B800]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">Problem Solver</span>
                  <span className="text-[11px] text-neutral-400 font-medium">By Mindset</span>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col items-start space-y-1.5 md:pl-4 pr-2 pt-2 md:pt-0">
                  <div className="text-[#F5B800]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">Builder</span>
                  <span className="text-[11px] text-neutral-400 font-medium">By Passion</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Photo & Quote Card Row ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            {/* Left Photo Sub-Column (~1/3 at lg, max-w-xs on mobile) */}
            <div className="w-full max-w-xs lg:max-w-none mx-auto lg:mx-0 lg:col-span-5 p-2 sm:p-3 flex items-center justify-center">
              <div className="group relative w-full aspect-[4/5] rounded-xl">
                {/* Offset Gold Outline Frame Behind Photo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-[#F5B800]/20 pointer-events-none transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                />

                {/* Photo Image Card */}
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F5B800]/30 bg-[#0d0d10] shadow-xl">
                  <Image
                    src="/images/shivansh.jpg"
                    alt="Shivansh Raj"
                    width={400}
                    height={500}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 320px, 260px"
                  />
                </div>
              </div>
            </div>

            {/* Right Quote Card (~2/3 at lg) */}
            <div className="w-full lg:col-span-7 flex">
              <div className="w-full rounded-2xl border border-white/10 bg-surface-card hover:bg-surface-card-hover transition-colors p-7 shadow-2xl space-y-4 flex flex-col justify-between">
                <div className="text-[#F5B800] font-serif text-4xl leading-none">&ldquo;</div>
                <p className="text-neutral-200 text-sm italic font-normal leading-relaxed">
                  Code is not just what I write, it&apos;s how I solve problems, create impact and make ideas real.
                </p>
                <div className="font-mono text-xs font-bold text-[#F5B800] pt-2">
                  &mdash; Shivansh Raj
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Lower Section: What I Do Grid & Education Timeline ─────── */}
        <div className="grid grid-cols-1 gap-8 items-start pt-4">
          {/* Left Column: What I Do (6 Cards Grid) */}
          <div className="w-full rounded-2xl border border-white/10 bg-surface-card p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a1710] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F5B800]">What I Do</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Build Intelligent Solutions</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I build web and mobile applications that are fast, scalable, and solve real-world problems.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Turn Ideas Into Impact</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I ideate, design, and ship products that create value and make a difference.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">AI-Powered Experiences</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I integrate AI to create smart, conversational, and automation-driven applications.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Automate &amp; Optimize</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I love automation &mdash; building tools and workflows that save time and boost productivity.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Full-Stack Development</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I enjoy building end-to-end products &mdash; from clean UIs to robust backends and databases.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex items-start gap-3.5 p-2 transition-colors hover:bg-surface-card-hover rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Continuous Learner</h4>
                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                    I&apos;m always exploring new technologies and leveling up every single day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Education Timeline */}
          <div className="w-full rounded-2xl border border-white/10 bg-surface-card p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a1710] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F5B800]">Education</h3>
            </div>

            {/* Vertical Timeline List */}
            <div className="relative pl-6 space-y-7 border-l border-[#F5B800]/30 ml-2">
              {educationHistory.map((item) => (
                <div key={item.id} className="relative space-y-1">
                  <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#F5B800] shadow-[0_0_8px_#F5B800]" />
                  <h4 className="text-xs font-bold text-white">{item.institution}</h4>
                  <p className="text-[11px] text-neutral-300 font-medium">{item.degree}</p>
                  {item.specialization && (
                    <p className="text-[11px] text-neutral-400 font-normal">{item.specialization}</p>
                  )}
                  <div className="pt-1">
                    <span className="inline-block rounded-full border border-[#F5B800]/40 bg-[#1b1912] px-3 py-0.5 font-mono text-[10px] font-bold text-[#F5B800]">
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
