"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface JournalSectionProps {
  language: string
}

export function JournalSection({ language }: JournalSectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    date: new Date().toISOString().split("T")[0],
    freeWrite: "",
    gratitude: "",
    heart: "",
    letter: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-journal")
    if (saved) setData(JSON.parse(saved))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-journal", JSON.stringify(data))
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.journal_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.journal_date}</h3>
      <input
        type="date"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.journal_free}</h3>
      <textarea
        value={data.freeWrite}
        onChange={(e) => setData({ ...data, freeWrite: e.target.value })}
        onBlur={saveData}
        placeholder={t.journal_free_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[150px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.journal_gratitude}</h3>
      <textarea
        value={data.gratitude}
        onChange={(e) => setData({ ...data, gratitude: e.target.value })}
        onBlur={saveData}
        placeholder={t.journal_gratitude_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.journal_heart}</h3>
      <textarea
        value={data.heart}
        onChange={(e) => setData({ ...data, heart: e.target.value })}
        onBlur={saveData}
        placeholder={t.journal_heart_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.journal_letter}</h3>
      <textarea
        value={data.letter}
        onChange={(e) => setData({ ...data, letter: e.target.value })}
        onBlur={saveData}
        placeholder={t.journal_letter_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[120px] resize-vertical lined-textarea"
      />

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>

      <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100" className="text-primary">
          <path
            d="M50 85 C20 60, 10 40, 10 25 C10 10, 20 5, 30 10 C40 15, 45 25, 50 30 C55 25, 60 15, 70 10 C80 5, 90 10, 90 25 C90 40, 80 60, 50 85 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
