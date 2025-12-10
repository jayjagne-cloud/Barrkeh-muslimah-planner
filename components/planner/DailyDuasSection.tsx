"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface Dua {
  ar: string
  translit: string
  trans: string
  category: string
  isCustom?: boolean
}

interface DailyDuasSectionProps {
  language: string
}

export function DailyDuasSection({ language }: DailyDuasSectionProps) {
  const t = useTranslation(language)

  const getDefaultDuas = (): Dua[] => [
    {
      ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
      translit: "Asbahna wa asbahal mulku lillah",
      trans: t.dua_morning_trans,
      category: "morning",
    },
    {
      ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
      translit: "Amsayna wa amsal mulku lillah",
      trans: t.dua_evening_trans,
      category: "evening",
    },
    {
      ar: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      translit: "Bismika Allahumma amutu wa ahya",
      trans: t.dua_sleep_trans,
      category: "sleep",
    },
    {
      ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
      translit: "Bismillahi tawakkaltu 'ala Allah",
      trans: t.dua_leaving_trans,
      category: "leaving",
    },
    {
      ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ",
      translit: "Allahumma inni as'aluka khayral mawlij",
      trans: t.dua_entering_trans,
      category: "entering",
    },
    {
      ar: "اللَّهُمَّ صَيِّبًا نَافِعًا",
      translit: "Allahumma sayyiban nafi'an",
      trans: t.dua_rain_trans,
      category: "rain",
    },
    {
      ar: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
      translit: "Subhanal ladhi sakhkhara lana hadha",
      trans: t.dua_travel_trans,
      category: "travel",
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState("morning")
  const [customDuas, setCustomDuas] = useState<Dua[]>([])
  const [newDua, setNewDua] = useState({ ar: "", translit: "", trans: "", category: "morning" })

  const categories = [
    { id: "morning", label: t.dua_cat_morning },
    { id: "evening", label: t.dua_cat_evening },
    { id: "sleep", label: t.dua_cat_sleep },
    { id: "leaving", label: t.dua_cat_leaving },
    { id: "entering", label: t.dua_cat_entering },
    { id: "rain", label: t.dua_cat_rain },
    { id: "travel", label: t.dua_cat_travel },
  ]

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-custom-duas")
    if (saved) setCustomDuas(JSON.parse(saved))
  }, [])

  const defaultDuas = getDefaultDuas()
  const allDuas = [...defaultDuas, ...customDuas]
  const filteredDuas = allDuas.filter((dua) => dua.category === selectedCategory)

  const addCustomDua = () => {
    if (!newDua.ar && !newDua.translit && !newDua.trans) return

    const updated = [...customDuas, { ...newDua, isCustom: true }]
    setCustomDuas(updated)
    localStorage.setItem("barrkeh-custom-duas", JSON.stringify(updated))
    setNewDua({ ar: "", translit: "", trans: "", category: selectedCategory })
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="planner-heading text-2xl pb-1.5 mb-2.5">{t.dua_title}</h2>
      <p className="text-sm leading-relaxed planner-text mt-1.5">{t.dua_intro}</p>

      <div className="flex flex-col md:flex-row gap-3.5 mt-2.5">
        <div className="flex-1 rounded-2xl planner-card-item p-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full planner-input mb-1.5"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredDuas.map((dua, index) => (
              <div key={index} className="rounded-xl planner-card-item p-2.5">
                <div
                  className="font-['Amiri','Traditional_Arabic',serif] text-xl mb-1.5 text-right planner-subheading leading-relaxed"
                  dir="rtl"
                >
                  {dua.ar}
                </div>
                <div className="text-xs planner-text mb-1 italic">{dua.translit}</div>
                <div className="text-sm planner-text">{dua.trans}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-2xl planner-card-item p-2.5">
          <h3 className="mt-0 mb-1.5 text-base planner-subheading">{t.dua_custom_title}</h3>
          <p className="text-xs planner-text-muted">{t.dua_custom_note}</p>

          <select
            value={newDua.category}
            onChange={(e) => setNewDua({ ...newDua, category: e.target.value })}
            className="w-full planner-input mb-1.5 mt-2"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <textarea
            value={newDua.ar}
            onChange={(e) => setNewDua({ ...newDua, ar: e.target.value })}
            placeholder={t.dua_custom_ar_ph}
            className="w-full planner-input min-h-[60px] resize-vertical focus:outline-none input-glow"
            dir="rtl"
          />
          <textarea
            value={newDua.translit}
            onChange={(e) => setNewDua({ ...newDua, translit: e.target.value })}
            placeholder={t.dua_custom_tr_ph}
            className="w-full planner-input min-h-[60px] resize-vertical focus:outline-none input-glow"
          />
          <textarea
            value={newDua.trans}
            onChange={(e) => setNewDua({ ...newDua, trans: e.target.value })}
            placeholder={t.dua_custom_trn_ph}
            className="w-full planner-input min-h-[60px] resize-vertical focus:outline-none input-glow"
          />

          <button
            onClick={addCustomDua}
            className="w-full py-3 mt-3.5 rounded-full border-none cursor-pointer gold-gradient text-[#111] text-sm font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
          >
            {t.dua_custom_add_btn}
          </button>
        </div>
      </div>

      <button className="absolute right-3.5 bottom-2.5 w-auto px-5 py-2 text-[11px] rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5">
        {t.save_button}
      </button>
    </section>
  )
}
