"use client"

import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"

interface GratitudeSectionProps {
  entries: Record<string, string>
  onSaveEntry: (field: string, value: string) => void
}

export function GratitudeSection({ entries, onSaveEntry }: GratitudeSectionProps) {
  const [localEntries, setLocalEntries] = useState<Record<string, string>>({})

  useEffect(() => {
    setLocalEntries(entries)
  }, [entries])

  const handleChange = (field: string, value: string) => {
    setLocalEntries((prev) => ({ ...prev, [field]: value }))
    onSaveEntry(field, value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gold-light/40 to-cream-dark/50 rounded-2xl p-6 border border-gold/20">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-foreground">Gratitude Journal</h2>
        </div>
        <p className="text-muted-foreground">
          "If you are grateful, I will surely increase your favor upon you" — Surah Ibrahim 14:7
        </p>
      </div>

      {/* 3 Things Grateful For */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Three Blessings Today</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <textarea
                value={localEntries[`blessing${num}`] || ""}
                onChange={(e) => handleChange(`blessing${num}`, e.target.value)}
                placeholder={`Blessing ${num}...`}
                className="flex-1 p-3 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Someone to Thank */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Someone to Thank</h3>
        <p className="text-sm text-muted-foreground mb-3">Who made a difference in your life today?</p>
        <input
          type="text"
          value={localEntries.thankPerson || ""}
          onChange={(e) => handleChange("thankPerson", e.target.value)}
          placeholder="Name..."
          className="w-full p-4 bg-muted rounded-xl border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 mb-3"
        />
        <textarea
          value={localEntries.thankReason || ""}
          onChange={(e) => handleChange("thankReason", e.target.value)}
          placeholder="Why are you grateful for them?"
          className="w-full min-h-[100px] p-4 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      {/* Dua of Gratitude */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Dua of Gratitude</h3>
        <p className="text-sm text-muted-foreground mb-3">Pour out your heart to Allah in thanks</p>
        <textarea
          value={localEntries.gratitudeDua || ""}
          onChange={(e) => handleChange("gratitudeDua", e.target.value)}
          placeholder="Ya Allah, I thank You for..."
          className="w-full min-h-[150px] p-4 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>
    </div>
  )
}
