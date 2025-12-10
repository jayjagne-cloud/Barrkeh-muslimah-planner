"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface SpiritualSectionProps {
  language: string
  onEmotionClick: (emotion: string) => void
}

export function SpiritualSection({ language, onEmotionClick }: SpiritualSectionProps) {
  const t = useTranslation(language)
  const [salahStatus, setSalahStatus] = useState<Record<string, boolean>>({})
  const [dhikrStatus, setDhikrStatus] = useState<Record<string, boolean>>({})
  const [hijabConfidence, setHijabConfidence] = useState(7)
  const [intention, setIntention] = useState("")
  const [cycleDate, setCycleDate] = useState("")
  const [cycleFeelings, setCycleFeelings] = useState("")

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
  const emotions = [
    { id: "overwhelmed", label: t.sp_em_overwhelmed },
    { id: "uncertain", label: t.sp_em_uncertain },
    { id: "low", label: t.sp_em_low },
    { id: "grateful", label: t.sp_em_grateful },
    { id: "anxious", label: t.sp_em_anxious },
  ]
  const dhikrItems = [
    { id: "subhanallah", label: t.sp_dhikr_1 },
    { id: "alhamdulillah", label: t.sp_dhikr_2 },
    { id: "allahuakbar", label: t.sp_dhikr_3 },
    { id: "ayatulkursi", label: t.sp_dhikr_4 },
    { id: "morningadhkar", label: t.sp_dhikr_5 },
    { id: "eveningadhkar", label: t.sp_dhikr_6 },
  ]

  useEffect(() => {
    const savedSalah = localStorage.getItem("barrkeh-salah")
    if (savedSalah) setSalahStatus(JSON.parse(savedSalah))

    const savedDhikr = localStorage.getItem("barrkeh-dhikr")
    if (savedDhikr) setDhikrStatus(JSON.parse(savedDhikr))

    const savedIntention = localStorage.getItem("barrkeh-intention")
    if (savedIntention) setIntention(savedIntention)

    const savedHijab = localStorage.getItem("barrkeh-hijab")
    if (savedHijab) setHijabConfidence(Number.parseInt(savedHijab))

    const savedCycleDate = localStorage.getItem("barrkeh-cycle-date")
    if (savedCycleDate) setCycleDate(savedCycleDate)

    const savedCycleFeelings = localStorage.getItem("barrkeh-cycle-feelings")
    if (savedCycleFeelings) setCycleFeelings(savedCycleFeelings)
  }, [])

  const toggleSalah = (prayer: string) => {
    const today = new Date().toISOString().split("T")[0]
    const key = `${today}-${prayer}`
    const updated = { ...salahStatus, [key]: !salahStatus[key] }
    setSalahStatus(updated)
    localStorage.setItem("barrkeh-salah", JSON.stringify(updated))
  }

  const toggleDhikr = (itemId: string) => {
    const today = new Date().toISOString().split("T")[0]
    const key = `${today}-${itemId}`
    const updated = { ...dhikrStatus, [key]: !dhikrStatus[key] }
    setDhikrStatus(updated)
    localStorage.setItem("barrkeh-dhikr", JSON.stringify(updated))
  }

  const isSalahDone = (prayer: string) => {
    const today = new Date().toISOString().split("T")[0]
    return salahStatus[`${today}-${prayer}`] || false
  }

  const isDhikrDone = (itemId: string) => {
    const today = new Date().toISOString().split("T")[0]
    return dhikrStatus[`${today}-${itemId}`] || false
  }

  const saveData = () => {
    localStorage.setItem("barrkeh-intention", intention)
    localStorage.setItem("barrkeh-hijab", hijabConfidence.toString())
    localStorage.setItem("barrkeh-cycle-date", cycleDate)
    localStorage.setItem("barrkeh-cycle-feelings", cycleFeelings)
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.spiritual_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.spiritual_emotion_title}</h3>
      <div className="flex flex-wrap gap-2 mt-1">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onEmotionClick(emotion.id)}
            className="flex-1 min-w-[110px] px-2.5 py-2 rounded-full border border-border/30 bg-muted planner-text text-xs cursor-pointer flex items-center justify-center hover:bg-muted/80 transition-all"
          >
            {emotion.label}
          </button>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.sp_salah_title}</h3>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {prayers.map((prayer) => (
          <div
            key={prayer}
            onClick={() => toggleSalah(prayer)}
            className={`p-2.5 rounded-[14px] border text-sm text-center min-h-[60px] flex flex-col items-center justify-center cursor-pointer shadow-[inset_0_0_18px_rgba(255,255,255,0.04)] transition-all ${
              isSalahDone(prayer) ? "card-active" : "border-border/20 bg-muted planner-text hover:bg-muted/80"
            }`}
          >
            {prayer}
          </div>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.sp_intention_title}</h3>
      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        onBlur={saveData}
        placeholder={t.sp_intention_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.sp_dhikr_title}</h3>
      <div className="flex flex-col gap-2 my-2">
        {dhikrItems.map((item) => (
          <label
            key={item.id}
            className="p-2 rounded-xl bg-muted/50 border border-border/20 flex items-center gap-2 cursor-pointer hover:bg-muted"
          >
            <input
              type="checkbox"
              checked={isDhikrDone(item.id)}
              onChange={() => toggleDhikr(item.id)}
              className="w-[18px] h-[18px] accent-[#D4AF37]"
            />
            <span className="planner-text text-sm">{item.label}</span>
          </label>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.sp_hijab_title}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={hijabConfidence}
        onChange={(e) => setHijabConfidence(Number.parseInt(e.target.value))}
        onMouseUp={saveData}
        onTouchEnd={saveData}
        className="w-full mt-1.5 accent-[#D4AF37]"
      />
      <div className="flex justify-between text-[11px] planner-label mt-0.5">
        <span>{t.sp_hijab_low}</span>
        <span>{t.sp_hijab_mid}</span>
        <span>{t.sp_hijab_high}</span>
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.sp_cycle_title}</h3>
      <input
        type="date"
        value={cycleDate}
        onChange={(e) => setCycleDate(e.target.value)}
        onBlur={saveData}
        className="w-full p-3 my-1.5 planner-input"
      />
      <textarea
        value={cycleFeelings}
        onChange={(e) => setCycleFeelings(e.target.value)}
        onBlur={saveData}
        placeholder={t.sp_cycle_ph}
        className="w-full p-3 my-1.5 planner-input min-h-[90px] resize-vertical lined-textarea"
      />

      <button
        onClick={saveData}
        className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.save_button}
      </button>

      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
          <path fill="currentColor" d="M50 10 L60 40 L90 40 L67 60 L77 90 L50 70 L23 90 L33 60 L10 40 L40 40 Z" />
        </svg>
      </div>
    </section>
  )
}
