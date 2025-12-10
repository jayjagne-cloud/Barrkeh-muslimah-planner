"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface CareerSectionProps {
  language: string
}

export function CareerSection({ language }: CareerSectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    status: "",
    goals: "",
    skill1: "",
    skill2: "",
    skill3: "",
    barakah: "",
  })
  const [checklist, setChecklist] = useState({
    cv: false,
    mentor: false,
    course: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-career")
    if (saved) setData(JSON.parse(saved))

    const savedChecklist = localStorage.getItem("barrkeh-career-checklist")
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-career", JSON.stringify(data))
    localStorage.setItem("barrkeh-career-checklist", JSON.stringify(checklist))
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.career_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.career_status}</h3>
      <textarea
        value={data.status}
        onChange={(e) => setData({ ...data, status: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_status_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.career_goals}</h3>
      <textarea
        value={data.goals}
        onChange={(e) => setData({ ...data, goals: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_goals_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.career_skills}</h3>
      <input
        value={data.skill1}
        onChange={(e) => setData({ ...data, skill1: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_skill1_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.skill2}
        onChange={(e) => setData({ ...data, skill2: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_skill2_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.skill3}
        onChange={(e) => setData({ ...data, skill3: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_skill3_ph}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.career_barakah}</h3>
      <textarea
        value={data.barakah}
        onChange={(e) => setData({ ...data, barakah: e.target.value })}
        onBlur={saveData}
        placeholder={t.career_barakah_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.career_checklist}</h3>
      <div className="flex flex-col gap-2 my-2">
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.cv}
            onChange={(e) => setChecklist({ ...checklist, cv: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.career_chk_cv}</span>
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.mentor}
            onChange={(e) => setChecklist({ ...checklist, mentor: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.career_chk_mentor}</span>
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted">
          <input
            type="checkbox"
            checked={checklist.course}
            onChange={(e) => setChecklist({ ...checklist, course: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <span className="planner-text text-sm">{t.career_chk_course}</span>
        </label>
      </div>

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>
    </section>
  )
}
