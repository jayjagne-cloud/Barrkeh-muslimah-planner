"use client"

import { useState, useEffect } from "react"
import { Sparkles, Plus, Trash2 } from "lucide-react"

interface HabitsSectionProps {
  entries: Record<string, string>
  onSaveEntry: (field: string, value: string) => void
}

interface Habit {
  id: string
  name: string
  days: boolean[]
}

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

export function HabitsSection({ entries, onSaveEntry }: HabitsSectionProps) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabit, setNewHabit] = useState("")

  useEffect(() => {
    if (entries.habits) {
      try {
        setHabits(JSON.parse(entries.habits))
      } catch {
        setHabits([])
      }
    }
  }, [entries])

  const saveHabits = (updated: Habit[]) => {
    setHabits(updated)
    onSaveEntry("habits", JSON.stringify(updated))
  }

  const addHabit = () => {
    if (!newHabit.trim()) return
    const updated = [
      ...habits,
      {
        id: Date.now().toString(),
        name: newHabit,
        days: Array(7).fill(false),
      },
    ]
    saveHabits(updated)
    setNewHabit("")
  }

  const toggleDay = (habitId: string, dayIndex: number) => {
    const updated = habits.map((h) => {
      if (h.id === habitId) {
        const newDays = [...h.days]
        newDays[dayIndex] = !newDays[dayIndex]
        return { ...h, days: newDays }
      }
      return h
    })
    saveHabits(updated)
  }

  const removeHabit = (habitId: string) => {
    const updated = habits.filter((h) => h.id !== habitId)
    saveHabits(updated)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gold-light/40 to-sage-light/30 rounded-2xl p-6 border border-gold/20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-foreground">Habit Tracker</h2>
        </div>
        <p className="text-muted-foreground">Small consistent steps lead to beautiful transformations</p>
      </div>

      {/* Add New Habit */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Add a Habit</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
            placeholder="e.g., Morning adhkar, 10 min Quran..."
            className="flex-1 p-3 bg-muted rounded-xl border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
          />
          <button
            onClick={addHabit}
            className="p-3 bg-sage text-primary-foreground rounded-xl hover:bg-sage/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 border border-border text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No habits yet. Start by adding one above!</p>
          </div>
        ) : (
          habits.map((habit) => {
            const completedDays = habit.days.filter(Boolean).length

            return (
              <div key={habit.id} className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{habit.name}</h4>
                    <p className="text-sm text-sage">{completedDays}/7 days</p>
                  </div>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {dayLabels.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => toggleDay(habit.id, index)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        habit.days[index]
                          ? "bg-sage text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-sage/20"
                      }`}
                    >
                      <span className="text-xs font-medium">{day}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          habit.days[index] ? "bg-primary-foreground border-primary-foreground" : "border-current"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Suggested Habits */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Suggested Habits</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Morning adhkar",
            "Evening adhkar",
            "1 page Quran",
            "Tahajjud",
            "Charity",
            "Exercise",
            "Drink water",
            "Early sleep",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setNewHabit(suggestion)
              }}
              className="px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-sage/20 hover:text-sage transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
