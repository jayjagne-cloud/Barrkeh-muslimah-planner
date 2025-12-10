"use client"

import { Home, Calendar, BookOpen, Heart, Target, Sparkles } from "lucide-react"

type Section = "home" | "daily" | "quran" | "gratitude" | "goals" | "habits"

interface NavigationProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

const navItems = [
  { id: "home" as Section, label: "Home", icon: Home },
  { id: "daily" as Section, label: "Daily", icon: Calendar },
  { id: "quran" as Section, label: "Quran", icon: BookOpen },
  { id: "gratitude" as Section, label: "Gratitude", icon: Heart },
  { id: "goals" as Section, label: "Goals", icon: Target },
  { id: "habits" as Section, label: "Habits", icon: Sparkles },
]

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-sage text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
