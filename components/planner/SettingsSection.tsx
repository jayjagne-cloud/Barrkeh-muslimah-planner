"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface SettingsSectionProps {
  username: string
  language: string
  theme: "light" | "dark"
  onThemeChange: (theme: "light" | "dark") => void
  onUsernameChange: (name: string) => void
  onLanguageChange: (lang: string) => void
}

export function SettingsSection({
  username,
  language,
  theme,
  onThemeChange,
  onUsernameChange,
  onLanguageChange,
}: SettingsSectionProps) {
  const t = useTranslation(language)
  const [name, setName] = useState(username)
  const [selectedLang, setSelectedLang] = useState(language)

  const handleSave = () => {
    onUsernameChange(name)
    onLanguageChange(selectedLang)
    localStorage.setItem("barrkeh-username", name)
    localStorage.setItem("barrkeh-language", selectedLang)
  }

  const handleThemeSwitch = (newTheme: "light" | "dark") => {
    onThemeChange(newTheme)
    localStorage.setItem("barrkeh-theme", newTheme)
  }

  return (
    <section className="relative animate-fade-in planner-section">
      <h2 className="text-2xl planner-heading pb-1.5 mb-2.5">{t.settings_title}</h2>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.settings_profile}</h3>
      <label className="planner-label block mt-1.5">{t.settings_your_name}</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t.settings_your_name}
        className="w-full max-w-[260px] planner-input my-1.5"
      />

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.settings_language}</h3>
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="w-full max-w-[260px] planner-input my-1.5"
      >
        <option value="en">English</option>
        <option value="fr">Francais</option>
        <option value="de">Deutsch</option>
        <option value="nl">Nederlands</option>
        <option value="it">Italiano</option>
        <option value="es">Espanol</option>
        <option value="sv">Svenska</option>
      </select>

      <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.settings_appearance}</h3>
      <p className="text-xs planner-label">{t.settings_appearance_desc}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border cursor-pointer transition-all ${
            theme === "dark"
              ? "border-[#D4AF37] bg-[#D4AF37] text-[#111]"
              : "border-[rgba(212,175,55,0.5)] theme-toggle-btn"
          }`}
        >
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={() => handleThemeSwitch("dark")}
            className="sr-only"
          />
          <span className="text-sm font-medium">{t.settings_dark_mode}</span>
        </label>
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border cursor-pointer transition-all ${
            theme === "light"
              ? "border-[#D4AF37] bg-[#D4AF37] text-[#111]"
              : "border-[rgba(212,175,55,0.5)] theme-toggle-btn"
          }`}
        >
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={() => handleThemeSwitch("light")}
            className="sr-only"
          />
          <span className="text-sm font-medium">{t.settings_light_mode}</span>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-auto px-5 py-2.5 text-sm rounded-full border-none cursor-pointer gold-gradient text-[#111] font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
      >
        {t.settings_save}
      </button>
    </section>
  )
}
