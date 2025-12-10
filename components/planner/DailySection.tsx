"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface DailySectionProps {
  language: string
}

export function DailySection({ language }: DailySectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    date: new Date().toISOString().split("T")[0],
    ayah: "",
    priority1: "",
    priority2: "",
    priority3: "",
    mood: "",
    energy: 5,
    task1: "",
    task2: "",
    task3: "",
    task1Done: false,
    task2Done: false,
    task3Done: false,
    evening: "",
  })
  const [mealStatus, setMealStatus] = useState<Record<string, boolean>>({})

  const moods = [
    { id: "grateful", label: t.daily_mood_grateful },
    { id: "peaceful", label: t.daily_mood_peaceful },
    { id: "energized", label: t.daily_mood_energized },
    { id: "low", label: t.daily_mood_low },
    { id: "anxious", label: t.daily_mood_anxious },
  ]

  const meals = [
    { id: "breakfast", label: t.daily_meal_bf },
    { id: "lunch", label: t.daily_meal_lunch },
    { id: "dinner", label: t.daily_meal_dinner },
    { id: "water", label: t.daily_meal_water },
  ]

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-daily")
    if (saved) setData(JSON.parse(saved))

    const savedMeals = localStorage.getItem("barrkeh-meals")
    if (savedMeals) setMealStatus(JSON.parse(savedMeals))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-daily", JSON.stringify(data))
    localStorage.setItem("barrkeh-meals", JSON.stringify(mealStatus))
  }

  const toggleMeal = (mealId: string) => {
    const today = new Date().toISOString().split("T")[0]
    const key = `${today}-${mealId}`
    const updated = { ...mealStatus, [key]: !mealStatus[key] }
    setMealStatus(updated)
    localStorage.setItem("barrkeh-meals", JSON.stringify(updated))
  }

  const isMealDone = (mealId: string) => {
    const today = new Date().toISOString().split("T")[0]
    return mealStatus[`${today}-${mealId}`] || false
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.daily_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_date}</h3>
      <input
        type="date"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_ayah}</h3>
      <textarea
        value={data.ayah}
        onChange={(e) => setData({ ...data, ayah: e.target.value })}
        onBlur={saveData}
        placeholder={t.daily_ayah_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_top3}</h3>
      <input
        value={data.priority1}
        onChange={(e) => setData({ ...data, priority1: e.target.value })}
        onBlur={saveData}
        placeholder={t.daily_p1_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.priority2}
        onChange={(e) => setData({ ...data, priority2: e.target.value })}
        onBlur={saveData}
        placeholder={t.daily_p2_ph}
        className="w-full p-3 my-1.5 planner-input"
      />
      <input
        value={data.priority3}
        onChange={(e) => setData({ ...data, priority3: e.target.value })}
        onBlur={saveData}
        placeholder={t.daily_p3_ph}
        className="w-full p-3 my-1.5 planner-input"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_mood}</h3>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {moods.map((mood) => (
          <div
            key={mood.id}
            onClick={() => setData({ ...data, mood: mood.id })}
            className={`p-2.5 rounded-[14px] border text-sm text-center min-h-[60px] flex flex-col items-center justify-center cursor-pointer shadow-[inset_0_0_18px_rgba(255,255,255,0.04)] transition-all ${
              data.mood === mood.id ? "card-active" : "border-border/20 bg-muted planner-text hover:bg-muted/80"
            }`}
          >
            {mood.label}
          </div>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_energy}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={data.energy}
        onChange={(e) => setData({ ...data, energy: Number.parseInt(e.target.value) })}
        onMouseUp={saveData}
        onTouchEnd={saveData}
        className="w-full mt-1.5 accent-[#D4AF37]"
      />
      <div className="flex justify-between text-[11px] planner-label mt-0.5">
        <span>{t.daily_energy_low}</span>
        <span>{t.daily_energy_mid}</span>
        <span>{t.daily_energy_high}</span>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_meals}</h3>
      <div className="flex flex-col gap-2 my-2">
        {meals.map((meal) => (
          <label
            key={meal.id}
            className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted"
          >
            <input
              type="checkbox"
              checked={isMealDone(meal.id)}
              onChange={() => toggleMeal(meal.id)}
              className="w-[18px] h-[18px] accent-[#D4AF37]"
            />
            <span className="planner-text text-sm">{meal.label}</span>
          </label>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_tasks}</h3>
      <div className="flex flex-col gap-2 my-2">
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.task1Done}
            onChange={(e) => setData({ ...data, task1Done: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <input
            value={data.task1}
            onChange={(e) => setData({ ...data, task1: e.target.value })}
            onBlur={saveData}
            placeholder={t.daily_task1_ph}
            className="flex-1 p-1.5 bg-transparent border-none planner-text text-sm focus:outline-none"
          />
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.task2Done}
            onChange={(e) => setData({ ...data, task2Done: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <input
            value={data.task2}
            onChange={(e) => setData({ ...data, task2: e.target.value })}
            onBlur={saveData}
            placeholder={t.daily_task2_ph}
            className="flex-1 p-1.5 bg-transparent border-none planner-text text-sm focus:outline-none"
          />
        </label>
        <label className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.task3Done}
            onChange={(e) => setData({ ...data, task3Done: e.target.checked })}
            className="w-[18px] h-[18px] accent-[#D4AF37]"
          />
          <input
            value={data.task3}
            onChange={(e) => setData({ ...data, task3: e.target.value })}
            onBlur={saveData}
            placeholder={t.daily_task3_ph}
            className="flex-1 p-1.5 bg-transparent border-none planner-text text-sm focus:outline-none"
          />
        </label>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.daily_evening}</h3>
      <textarea
        value={data.evening}
        onChange={(e) => setData({ ...data, evening: e.target.value })}
        onBlur={saveData}
        placeholder={t.daily_evening_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>

      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <svg width="80" height="100" viewBox="0 0 80 100" className="text-primary">
          <ellipse cx="40" cy="30" rx="15" ry="20" fill="currentColor" />
          <rect x="25" y="45" width="30" height="50" rx="5" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
