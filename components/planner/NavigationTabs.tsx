"use client"

import { useTranslation } from "@/lib/useTranslation"

interface NavigationTabsProps {
  activeSection: string
  onSectionChange: (section: string) => void
  language: string
}

export function NavigationTabs({ activeSection, onSectionChange, language }: NavigationTabsProps) {
  const t = useTranslation(language)

  const tabs = [
    { id: "welcome", label: t.nav_home },
    { id: "vision", label: t.nav_vision },
    { id: "spiritual", label: t.nav_spiritual },
    { id: "dailyDuas", label: t.nav_dailyDuas },
    { id: "monthly", label: t.nav_monthly },
    { id: "weekly", label: t.nav_weekly },
    { id: "daily", label: t.nav_daily },
    { id: "career", label: t.nav_career },
    { id: "relationships", label: t.nav_relationships },
    { id: "journal", label: t.nav_journal },
    { id: "audit", label: t.nav_audit },
    { id: "settings", label: t.nav_settings },
  ]

  return (
    <div className="flex flex-wrap gap-2 my-5 nav-tabs-container p-2.5 rounded-[20px] border border-[rgba(212,175,55,0.35)] overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSectionChange(tab.id)}
          className={`px-3.5 py-2 rounded-full border text-[11px] font-semibold tracking-wide whitespace-nowrap flex-shrink-0 min-h-[38px] flex items-center justify-center transition-all duration-200 ${
            activeSection === tab.id ? "nav-tab-active border-transparent" : "nav-tab-inactive"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
