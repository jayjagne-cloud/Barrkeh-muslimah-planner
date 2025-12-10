"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface OnboardingModalProps {
  onComplete: (name: string, language: string) => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [name, setName] = useState("")
  const [language, setLanguage] = useState("en")
  const t = useTranslation(language)

  const handleContinue = () => {
    if (name.trim()) {
      onComplete(name.trim(), language)
    }
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-[999]">
      <div className="max-w-[380px] w-[90%] rounded-[20px] bg-gradient-to-br from-[#111] to-[#1b1b1b] border border-[rgba(212,175,55,0.5)] p-5 shadow-[0_0_40px_rgba(212,175,55,0.45)]">
        <h2 className="text-2xl text-[#FDE7B0] border-none mb-1.5">{t.onboarding_title}</h2>
        <p className="text-sm text-[#D1D5DB]">{t.onboarding_text}</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.settings_your_name}
          className="w-full p-3 mt-2.5 rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[#131313] text-[#F5F5F5] text-sm shadow-[inset_0_0_18px_rgba(255,255,255,0.02)] focus:outline-none input-glow"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 mt-2.5 rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[#131313] text-[#F5F5F5] text-sm shadow-[inset_0_0_18px_rgba(255,255,255,0.02)] focus:outline-none input-glow"
        >
          <option value="en">English</option>
          <option value="fr">Francais</option>
          <option value="de">Deutsch</option>
          <option value="nl">Nederlands</option>
          <option value="it">Italiano</option>
          <option value="es">Espanol</option>
          <option value="sv">Svenska</option>
        </select>

        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full py-3 mt-3.5 rounded-full border-none cursor-pointer gold-gradient text-[#111] text-sm font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.onboarding_continue}
        </button>
      </div>
    </div>
  )
}
