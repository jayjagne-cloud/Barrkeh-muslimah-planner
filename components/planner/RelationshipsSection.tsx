"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface RelationshipsSectionProps {
  language: string
}

export function RelationshipsSection({ language }: RelationshipsSectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    focus: "",
    goals: "",
    future: "",
    kindness: "",
  })
  const [checklist, setChecklist] = useState({
    kindWord: false,
    smile: false,
    dua: false,
    gift: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-relationships")
    if (saved) setData(JSON.parse(saved))

    const savedChecklist = localStorage.getItem("barrkeh-relationships-checklist")
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-relationships", JSON.stringify(data))
    localStorage.setItem("barrkeh-relationships-checklist", JSON.stringify(checklist))
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.relationships_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.rel_focus}</h3>
      <textarea
        value={data.focus}
        onChange={(e) => setData({ ...data, focus: e.target.value })}
        onBlur={saveData}
        placeholder={t.rel_focus_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.rel_goals}</h3>
      <textarea
        value={data.goals}
        onChange={(e) => setData({ ...data, goals: e.target.value })}
        onBlur={saveData}
        placeholder={t.rel_goals_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.rel_family}</h3>
      <div className="flex flex-col gap-2 my-2">
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.kindWord}
            onChange={(e) => setChecklist({ ...checklist, kindWord: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.rel_chk_kindness}</span>
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.smile}
            onChange={(e) => setChecklist({ ...checklist, smile: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.rel_chk_smile}</span>
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.dua}
            onChange={(e) => setChecklist({ ...checklist, dua: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.rel_chk_dua}</span>
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.gift}
            onChange={(e) => setChecklist({ ...checklist, gift: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.rel_chk_gift}</span>
        </label>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.rel_future}</h3>
      <textarea
        value={data.future}
        onChange={(e) => setData({ ...data, future: e.target.value })}
        onBlur={saveData}
        placeholder={t.rel_future_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.rel_kindness}</h3>
      <textarea
        value={data.kindness}
        onChange={(e) => setData({ ...data, kindness: e.target.value })}
        onBlur={saveData}
        placeholder={t.rel_kindness_ph}
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
