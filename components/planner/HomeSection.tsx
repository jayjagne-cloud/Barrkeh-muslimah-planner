"use client"

import { Sunrise, MoonIcon, Sun, Sunset, Star } from "lucide-react"

interface HomeSectionProps {
  username: string
  prayerStatus: Record<string, boolean>
  onPrayerToggle: (prayer: string) => void
}

const prayers = [
  { id: "fajr", name: "Fajr", icon: Sunrise },
  { id: "dhuhr", name: "Dhuhr", icon: Sun },
  { id: "asr", name: "Asr", icon: Sunset },
  { id: "maghrib", name: "Maghrib", icon: MoonIcon },
  { id: "isha", name: "Isha", icon: Star },
]

export function HomeSection({ username, prayerStatus, onPrayerToggle }: HomeSectionProps) {
  const hour = new Date().getHours()
  let greeting = "Good morning"
  let dua = "May Allah fill your morning with barakah and clarity"

  if (hour >= 12 && hour < 16) {
    greeting = "Good afternoon"
    dua = "May this afternoon bring you ease and gentle guidance"
  } else if (hour >= 16 && hour < 20) {
    greeting = "Good evening"
    dua = "May your evening be full of peace and quiet victories"
  } else if (hour >= 20 || hour < 5) {
    greeting = "Good night"
    dua = "May Allah wrap your night in tranquility and protection"
  }

  const completedPrayers = Object.values(prayerStatus).filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-sage/20 to-gold-light/30 rounded-2xl p-6 border border-sage/20">
        <p className="text-sm text-sage font-medium uppercase tracking-wider mb-1">{greeting}</p>
        <h2 className="text-2xl font-semibold text-foreground mb-2">{username}</h2>
        <p className="text-muted-foreground italic">{dua}</p>
      </div>

      {/* Today's Date */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Today</h3>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Daily Verse */}
        <div className="bg-cream-dark/50 dark:bg-muted rounded-xl p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-2">Daily Reminder</p>
          <p className="text-foreground italic leading-relaxed">"Verily, with hardship comes ease."</p>
          <p className="text-sm text-sage mt-2">— Surah Ash-Sharh 94:6</p>
        </div>
      </div>

      {/* Prayer Tracker */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Prayer Tracker</h3>
          <span className="text-sm text-sage font-medium">{completedPrayers}/5 completed</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {prayers.map((prayer) => {
            const Icon = prayer.icon
            const isCompleted = prayerStatus[prayer.id]

            return (
              <button
                key={prayer.id}
                onClick={() => onPrayerToggle(prayer.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  isCompleted ? "bg-sage text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-sage/20"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{prayer.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Quran Pages</p>
          <p className="text-2xl font-semibold text-sage">0</p>
          <p className="text-xs text-muted-foreground">this week</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Gratitude Entries</p>
          <p className="text-2xl font-semibold text-gold">0</p>
          <p className="text-xs text-muted-foreground">this week</p>
        </div>
      </div>
    </div>
  )
}
