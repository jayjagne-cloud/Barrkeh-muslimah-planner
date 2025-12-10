"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface MonthlySectionProps {
  language: string
}

export function MonthlySection({ language }: MonthlySectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    month: "",
    spiritual: "",
    personal: "",
    career: "",
    health: "",
    relationships: "",
    income: "",
    sadaqah: "",
    savings: "",
    expenses: "",
    quran: "",
    duaOfMonth: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-monthly")
    if (saved) setData(JSON.parse(saved))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-monthly", JSON.stringify(data))
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.monthly_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.monthly_month}</h3>
      <input
        type="month"
        value={data.month}
        onChange={(e) => setData({ ...data, month: e.target.value })}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.monthly_goals}</h3>
      <textarea
        value={data.spiritual}
        onChange={(e) => setData({ ...data, spiritual: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_spiritual_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />
      <textarea
        value={data.personal}
        onChange={(e) => setData({ ...data, personal: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_personal_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />
      <textarea
        value={data.career}
        onChange={(e) => setData({ ...data, career: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_career_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />
      <textarea
        value={data.health}
        onChange={(e) => setData({ ...data, health: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_health_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />
      <textarea
        value={data.relationships}
        onChange={(e) => setData({ ...data, relationships: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_rel_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.monthly_finance}</h3>
      <input
        type="number"
        value={data.income}
        onChange={(e) => setData({ ...data, income: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_income_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        type="number"
        value={data.sadaqah}
        onChange={(e) => setData({ ...data, sadaqah: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_sadaqah_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        type="number"
        value={data.savings}
        onChange={(e) => setData({ ...data, savings: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_savings_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        type="number"
        value={data.expenses}
        onChange={(e) => setData({ ...data, expenses: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_expenses_ph}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.monthly_quran}</h3>
      <textarea
        value={data.quran}
        onChange={(e) => setData({ ...data, quran: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_quran_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.monthly_dua_month}</h3>
      <textarea
        value={data.duaOfMonth}
        onChange={(e) => setData({ ...data, duaOfMonth: e.target.value })}
        onBlur={saveData}
        placeholder={t.monthly_dua_month_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[70px] resize-vertical lined-textarea"
      />

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>

      <div className="absolute bottom-4 left-4 opacity-10 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 100 100" className="text-primary">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M50 10 C50 50, 10 50, 50 50 C50 50, 50 10, 90 50 C50 50, 50 90, 50 50 C50 50, 90 50, 50 90"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
