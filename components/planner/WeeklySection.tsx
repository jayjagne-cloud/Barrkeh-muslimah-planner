"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface WeeklySectionProps {
  language: string
}

export function WeeklySection({ language }: WeeklySectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    weekOf: "",
    priority1: "",
    priority2: "",
    priority3: "",
    reflection: "",
  })
  const [habitDays, setHabitDays] = useState<string[]>([])

  const days = [
    { id: "mon", label: t.day_mon },
    { id: "tue", label: t.day_tue },
    { id: "wed", label: t.day_wed },
    { id: "thu", label: t.day_thu },
    { id: "fri", label: t.day_fri },
    { id: "sat", label: t.day_sat },
    { id: "sun", label: t.day_sun },
  ]

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-weekly")
    if (saved) setData(JSON.parse(saved))

    const savedHabits = localStorage.getItem("barrkeh-weekly-habits")
    if (savedHabits) setHabitDays(JSON.parse(savedHabits))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-weekly", JSON.stringify(data))
    localStorage.setItem("barrkeh-weekly-habits", JSON.stringify(habitDays))
  }

  const toggleDay = (dayId: string) => {
    if (habitDays.includes(dayId)) {
      setHabitDays(habitDays.filter((d) => d !== dayId))
    } else {
      setHabitDays([...habitDays, dayId])
    }
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.weekly_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.weekly_of}</h3>
      <input
        type="date"
        value={data.weekOf}
        onChange={(e) => setData({ ...data, weekOf: e.target.value })}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.weekly_top3}</h3>
      <input
        value={data.priority1}
        onChange={(e) => setData({ ...data, priority1: e.target.value })}
        onBlur={saveData}
        placeholder={t.weekly_p1_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.priority2}
        onChange={(e) => setData({ ...data, priority2: e.target.value })}
        onBlur={saveData}
        placeholder={t.weekly_p2_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.priority3}
        onChange={(e) => setData({ ...data, priority3: e.target.value })}
        onBlur={saveData}
        placeholder={t.weekly_p3_ph}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.weekly_habit}</h3>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mt-1">
        {days.map((day) => (
          <div
            key={day.id}
            onClick={() => toggleDay(day.id)}
            className={`p-2.5 rounded-[14px] border text-sm text-center min-h-[60px] flex flex-col items-center justify-center cursor-pointer shadow-[inset_0_0_18px_rgba(255,255,255,0.04)] transition-all ${
              habitDays.includes(day.id) ? "card-active" : "border-border/20 bg-muted planner-text hover:bg-muted/80"
            }`}
          >
            {day.label}
          </div>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.weekly_reflection}</h3>
      <textarea
        value={data.reflection}
        onChange={(e) => setData({ ...data, reflection: e.target.value })}
        onBlur={saveData}
        placeholder={t.weekly_reflection_ph}
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
