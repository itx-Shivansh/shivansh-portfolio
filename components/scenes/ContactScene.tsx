'use client'

import { useState, useEffect } from 'react'
import { contact } from '@/content/contact'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'

export default function ContactScene() {
  const { activeSection } = useScrollStore()
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false)
  const [showTerminalEasterEgg, setShowTerminalEasterEgg] = useState<boolean>(false)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const directEmail = 'shivanshrajoo@gmail.com'

  useEffect(() => {
    if (activeSection === 'contact') {
      console.log(
        '%c🚀 Shivansh Raj — Portfolio System',
        'color: #F5B800; font-size: 16px; font-weight: bold; background: #07090f; padding: 6px 12px; border-radius: 6px;'
      )
      console.log(
        '%cMechanical Engineering @ DTU · AI Developer & Full-Stack Engineer',
        'color: #F5B800; font-size: 12px;'
      )
      console.log(`Direct Email: ${directEmail}`)
    }
  }, [activeSection, directEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setErrorMessage(null)

    const rawFormId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    const cleanFormId = rawFormId
      ? rawFormId.trim().replace(/^https?:\/\/formspree\.io\/f\//, '')
      : ''

    // Helper to open mailto as seamless fallback
    const triggerMailtoFallback = () => {
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`
    }

    if (!cleanFormId) {
      // Formspree Form ID not set in .env yet — use mailto & show success
      triggerMailtoFallback()
      sound.playSuccess()
      setFormSubmitted(true)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${cleanFormId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        sound.playSuccess()
        setFormSubmitted(true)
      } else {
        // If Formspree ID returns 404 or fails, fallback seamlessly
        triggerMailtoFallback()
        sound.playSuccess()
        setFormSubmitted(true)
      }
    } catch (err) {
      console.error('Formspree submission error:', err)
      triggerMailtoFallback()
      sound.playSuccess()
      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyEmailToClipboard = () => {
    sound.playClick()
    navigator.clipboard.writeText(directEmail)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <section
      id="contact"
      className="relative w-full select-none py-16 sm:py-20 px-4 sm:px-12 md:px-20 lg:pl-32 lg:pr-16"
    >
      <div className="w-full max-w-7xl mx-auto space-y-10 z-10 relative pointer-events-auto select-none">
        {/* ── Top Header Row: Chapter Badge & Terminal Easter Egg Trigger ──── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="rounded-full border border-[#F5B800]/30 bg-[#121215]/80 px-4 py-1.5 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">
              CHAPTER 05 // LET&apos;S CONNECT
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick()
              setShowTerminalEasterEgg((prev) => !prev)
            }}
            onMouseEnter={() => sound.playHover()}
            className="font-mono text-xs font-semibold text-[#F5B800] hover:underline flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>[ SYSTEM : TERMINAL_READY ]</span>
          </button>
        </div>

        {/* Easter Egg Terminal Drawer */}
        {showTerminalEasterEgg && (
          <div className="rounded-2xl border border-[#F5B800]/40 bg-[#0c0c0e]/95 p-6 backdrop-blur-2xl shadow-2xl font-mono text-xs text-[#F5B800] space-y-1 animate-in fade-in duration-200">
            <p className="font-bold text-white">$ shivansh --status</p>
            <p className="text-neutral-300">
              Shivansh Raj (DTU Engineering Edition) &mdash; {contact.availability}
            </p>
            <p className="text-neutral-400">Direct Email: {directEmail}</p>
          </div>
        )}

        {/* ── Main Content Grid: Left Details + Right Form Card ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading, Direct Email & Social Buttons */}
          <div className="lg:col-span-7 space-y-7">
            {/* Dual-Color Big Headline */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              <span className="block text-white">Let&apos;s Build</span>
              <span className="block text-[#F5B800]">Something</span>
              <span className="block text-white">Extraordinary.</span>
            </h2>

            {/* Subtitle */}
            <div className="flex items-center gap-3 text-neutral-300 text-sm md:text-base font-normal tracking-wide">
              <span className="w-6 h-[2px] bg-[#F5B800] rounded-full inline-block" />
              <p>Open to Software Development, AI, and Full-Stack Internship Opportunities.</p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-2xl border border-[#F5B800]/40 bg-[#0d0d10]/80 backdrop-blur-xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1c180e] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] font-bold text-[#F5B800] tracking-widest uppercase">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={`mailto:${directEmail}`}
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="block font-display text-lg sm:text-xl font-bold text-white hover:text-[#F5B800] transition-colors"
                  >
                    {directEmail}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmailToClipboard}
                onMouseEnter={() => sound.playHover()}
                className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-mono font-medium text-white transition-all hover:border-white/40 flex items-center gap-2 self-start sm:self-center"
              >
                <span>{copiedEmail ? '✓ COPIED' : 'COPY EMAIL'}</span>
                <svg className="w-3.5 h-3.5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Connect & Network Buttons */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] font-bold text-[#F5B800] tracking-widest uppercase block">
                CONNECT &amp; NETWORK
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/shivansh-raj-429733229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="rounded-xl border border-white/10 bg-[#0d0d10]/80 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-[#F5B800]/60 hover:text-[#F5B800] flex items-center gap-3 shadow-lg"
                >
                  <svg className="w-4 h-4 fill-current text-[#F5B800]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                  <span className="text-[#F5B800] font-bold">↗</span>
                </a>

                <a
                  href="https://www.instagram.com/only.shivanshhh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="rounded-xl border border-white/10 bg-[#0d0d10]/80 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-[#F5B800]/60 hover:text-[#F5B800] flex items-center gap-3 shadow-lg"
                >
                  <svg className="w-4 h-4 stroke-current text-[#F5B800] fill-none" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                  <span className="text-[#F5B800] font-bold">↗</span>
                </a>

                <a
                  href="https://github.com/itx-Shivansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="rounded-xl border border-white/10 bg-[#0d0d10]/80 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-[#F5B800]/60 hover:text-[#F5B800] flex items-center gap-3 shadow-lg"
                >
                  <svg className="w-4 h-4 fill-current text-[#F5B800]" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                  <span className="text-[#F5B800] font-bold">↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Transmission Interface Form Card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="w-full rounded-3xl border border-[#F5B800]/30 bg-[#0d0d10]/85 backdrop-blur-xl p-7 sm:p-8 shadow-2xl space-y-6">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#1c180e] border border-[#F5B800] flex items-center justify-center text-[#F5B800] text-2xl shadow-[0_0_20px_#F5B800]">
                    ✓
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Message Transmitted!
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-xs leading-relaxed">
                    Thank you for reaching out. I&apos;ll get back to you directly at{' '}
                    <span className="text-[#F5B800] font-bold">{formData.email}</span> soon.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({ name: '', email: '', message: '' })
                    }}
                    className="font-mono text-xs text-[#F5B800] underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1c180e] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800] shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        Transmission Interface
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Send a message directly to Shivansh Raj
                      </p>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400 font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] font-bold text-[#F5B800] tracking-widest uppercase block">
                      YOUR NAME
                    </label>
                    <div className="relative flex items-center">
                      <svg className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full rounded-xl border border-white/10 bg-[#121215] pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#F5B800] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] font-bold text-[#F5B800] tracking-widest uppercase block">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative flex items-center">
                      <svg className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full rounded-xl border border-white/10 bg-[#121215] pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#F5B800] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-mono text-[10px] font-bold text-[#F5B800] tracking-widest uppercase block">
                      MESSAGE
                    </label>
                    <div className="relative">
                      <svg className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project, idea, or opportunity..."
                        className="w-full rounded-xl border border-white/10 bg-[#121215] pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#F5B800] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#F5B800] to-[#E65100] hover:brightness-110 disabled:opacity-50 py-3.5 px-6 font-mono text-xs font-extrabold text-black tracking-wider shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


