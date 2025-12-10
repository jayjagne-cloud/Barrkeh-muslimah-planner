"use client"

import { Calendar } from "@/components/planner/Calendar"
import { useTranslation } from "@/lib/useTranslation"

interface WelcomeSectionProps {
  language: string
}

export function WelcomeSection({ language }: WelcomeSectionProps) {
  const t = useTranslation(language)

  return (
    <section className="relative animate-fade-in planner-section">
      {/* Section Illustration */}
      <div className="absolute top-5 right-5 w-20 h-20 opacity-20 pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-full h-full text-[#D4AF37]">
          <path
            d="M44 6c-11 2.5-20 12.9-20 26s9 23.5 20 26c-8.5-4.5-14-14-14-26S35.5 10.5 44 6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M46 20a10 10 0 0 0-10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.home_title}</h2>

      <p className="text-sm leading-relaxed planner-text mt-1.5">{t.home_intro_1}</p>
      <p className="text-sm leading-relaxed planner-text mt-1.5">{t.home_intro_2}</p>

      <Calendar language={language} />

      <p className="text-xs planner-text-muted mt-2">
        Need exact timings? Open your calendar here:{" "}
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted hover:text-[#D4AF37]"
        >
          Google Calendar
        </a>
      </p>

      <button className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5">
        {t.save_button}
      </button>
    </section>
  )
}
