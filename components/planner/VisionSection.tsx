"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface VisionSectionProps {
  language: string
}

export function VisionSection({ language }: VisionSectionProps) {
  const t = useTranslation(language)
  const [data, setData] = useState({
    becoming: "",
    identity: "",
    purpose: "",
    success: "",
  })
  const [values, setValues] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-vision")
    if (saved) setData(JSON.parse(saved))

    const savedValues = localStorage.getItem("barrkeh-vision-values")
    if (savedValues) setValues(JSON.parse(savedValues))
  }, [])

  const saveData = () => {
    localStorage.setItem("barrkeh-vision", JSON.stringify(data))
    localStorage.setItem("barrkeh-vision-values", JSON.stringify(values))
  }

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      setValues(values.filter((v) => v !== value))
    } else {
      setValues([...values, value])
    }
  }

  const coreValues = [
    { id: "faith", label: t.vision_val_faith },
    { id: "family", label: t.vision_val_family },
    { id: "knowledge", label: t.vision_val_knowledge },
    { id: "service", label: t.vision_val_service },
    { id: "balance", label: t.vision_val_balance },
    { id: "beauty", label: t.vision_val_beauty },
  ]

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.vision_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.vision_becoming}</h3>
      <textarea
        value={data.becoming}
        onChange={(e) => setData({ ...data, becoming: e.target.value })}
        onBlur={saveData}
        placeholder={t.vision_becoming_ph}
        className="w-full planner-input my-1.5 min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.vision_identity}</h3>
      <textarea
        value={data.identity}
        onChange={(e) => setData({ ...data, identity: e.target.value })}
        onBlur={saveData}
        placeholder={t.vision_identity_ph}
        className="w-full planner-input my-1.5 min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.vision_purpose}</h3>
      <textarea
        value={data.purpose}
        onChange={(e) => setData({ ...data, purpose: e.target.value })}
        onBlur={saveData}
        placeholder={t.vision_purpose_ph}
        className="w-full planner-input my-1.5 min-h-[90px] resize-vertical lined-textarea"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.vision_values}</h3>
      <div className="flex flex-wrap gap-2 mt-1">
        {coreValues.map((value) => (
          <button
            key={value.id}
            onClick={() => toggleValue(value.id)}
            className={`flex-1 min-w-[110px] px-2.5 py-2 rounded-full border text-xs cursor-pointer flex items-center justify-center transition-all ${
              values.includes(value.id)
                ? "gold-gradient text-[#111] border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.7)]"
                : "planner-card-item planner-text hover:opacity-80"
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.vision_success}</h3>
      <textarea
        value={data.success}
        onChange={(e) => setData({ ...data, success: e.target.value })}
        onBlur={saveData}
        placeholder={t.vision_success_ph}
        className="w-full planner-input my-1.5 min-h-[90px] resize-vertical lined-textarea"
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
