"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface AuditSectionProps {
  language: string
}

export function AuditSection({ language }: AuditSectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    month: "",
    spiritualReflection: "",
    spiritualRating: 7,
    wellbeingRating: 7,
    wins: "",
    challenges: "",
    releasing: "",
    callingIn: "",
    legacy: "",
    finalDua: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-audit")
    if (saved) setData(JSON.parse(saved))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-audit", JSON.stringify(data))
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.audit_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_month}</h3>
      <input
        type="month"
        value={data.month}
        onChange={(e) => setData({ ...data, month: e.target.value })}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_spiritual}</h3>
      <textarea
        value={data.spiritualReflection}
        onChange={(e) => setData({ ...data, spiritualReflection: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_spiritual_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_rate_spiritual}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={data.spiritualRating}
        onChange={(e) => setData({ ...data, spiritualRating: Number.parseInt(e.target.value) })}
        onMouseUp={saveData}
        onTouchEnd={saveData}
        className="w-full mt-1.5 accent-[#D4AF37]"
      />
      <div className="flex justify-between text-[11px] planner-label mt-0.5">
        <span>{t.audit_spiritual_low}</span>
        <span>{t.audit_spiritual_high}</span>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_rate_wellbeing}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={data.wellbeingRating}
        onChange={(e) => setData({ ...data, wellbeingRating: Number.parseInt(e.target.value) })}
        onMouseUp={saveData}
        onTouchEnd={saveData}
        className="w-full mt-1.5 accent-[#D4AF37]"
      />
      <div className="flex justify-between text-[11px] planner-label mt-0.5">
        <span>{t.audit_well_low}</span>
        <span>{t.audit_well_high}</span>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_wins}</h3>
      <textarea
        value={data.wins}
        onChange={(e) => setData({ ...data, wins: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_wins_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_challenges}</h3>
      <textarea
        value={data.challenges}
        onChange={(e) => setData({ ...data, challenges: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_challenges_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_releasing}</h3>
      <textarea
        value={data.releasing}
        onChange={(e) => setData({ ...data, releasing: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_releasing_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_calling}</h3>
      <textarea
        value={data.callingIn}
        onChange={(e) => setData({ ...data, callingIn: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_calling_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_legacy}</h3>
      <textarea
        value={data.legacy}
        onChange={(e) => setData({ ...data, legacy: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_legacy_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.audit_dua}</h3>
      <textarea
        value={data.finalDua}
        onChange={(e) => setData({ ...data, finalDua: e.target.value })}
        onBlur={saveData}
        placeholder={t.audit_dua_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>
    </section>
  )
}
