"use client"

import { useState, useEffect } from "react"
import { BookOpen, Plus, Minus } from "lucide-react"

interface QuranSectionProps {
  entries: Record<string, string>
  onSaveEntry: (field: string, value: string) => void
}

export function QuranSection({ entries, onSaveEntry }: QuranSectionProps) {
  const [localEntries, setLocalEntries] = useState<Record<string, string>>({})

  useEffect(() => {
    setLocalEntries(entries)
  }, [entries])

  const handleChange = (field: string, value: string) => {
    setLocalEntries((prev) => ({ ...prev, [field]: value }))
    onSaveEntry(field, value)
  }

  const pagesRead = Number.parseInt(localEntries.quranPages || "0")

  const adjustPages = (amount: number) => {
    const newValue = Math.max(0, pagesRead + amount)
    handleChange("quranPages", newValue.toString())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-sage/20 to-gold-light/30 rounded-2xl p-6 border border-sage/20">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-sage" />
          <h2 className="text-xl font-semibold text-foreground">Quran Journey</h2>
        </div>
        <p className="text-muted-foreground">Track your daily Quran reading and reflection</p>
      </div>

      {/* Pages Counter */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Pages Read Today</h3>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => adjustPages(-1)}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-sage/20 transition-colors"
          >
            <Minus className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="text-center">
            <span className="text-5xl font-semibold text-sage">{pagesRead}</span>
            <p className="text-sm text-muted-foreground mt-1">pages</p>
          </div>
          <button
            onClick={() => adjustPages(1)}
            className="w-12 h-12 rounded-full bg-sage flex items-center justify-center hover:bg-sage/80 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Current Surah */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Current Surah</h3>
        <input
          type="text"
          value={localEntries.currentSurah || ""}
          onChange={(e) => handleChange("currentSurah", e.target.value)}
          placeholder="e.g., Surah Al-Baqarah"
          className="w-full p-4 bg-muted rounded-xl border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
        />
      </div>

      {/* Ayah of the Day */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Ayah to Remember</h3>
        <p className="text-sm text-muted-foreground mb-3">Write an ayah that touched your heart today</p>
        <textarea
          value={localEntries.ayahOfDay || ""}
          onChange={(e) => handleChange("ayahOfDay", e.target.value)}
          placeholder="Write the ayah here..."
          className="w-full min-h-[100px] p-4 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50 mb-3"
        />
        <input
          type="text"
          value={localEntries.ayahReference || ""}
          onChange={(e) => handleChange("ayahReference", e.target.value)}
          placeholder="Reference (e.g., 2:286)"
          className="w-full p-3 bg-muted rounded-xl border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
        />
      </div>

      {/* Reflection */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Reflection</h3>
        <p className="text-sm text-muted-foreground mb-3">What lessons or feelings arose from your reading?</p>
        <textarea
          value={localEntries.quranReflection || ""}
          onChange={(e) => handleChange("quranReflection", e.target.value)}
          placeholder="Today's reading made me feel..."
          className="w-full min-h-[150px] p-4 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
        />
      </div>
    </div>
  )
}
