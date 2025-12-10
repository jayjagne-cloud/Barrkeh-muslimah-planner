"use client"

import { useState, useEffect } from "react"
import { Target, Check, Circle } from "lucide-react"

interface GoalsSectionProps {
  entries: Record<string, string>
  onSaveEntry: (field: string, value: string) => void
}

interface Goal {
  id: string
  text: string
  completed: boolean
}

export function GoalsSection({ entries, onSaveEntry }: GoalsSectionProps) {
  const [localEntries, setLocalEntries] = useState<Record<string, string>>({})
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState("")

  useEffect(() => {
    setLocalEntries(entries)
    if (entries.goals) {
      try {
        setGoals(JSON.parse(entries.goals))
      } catch {
        setGoals([])
      }
    }
  }, [entries])

  const handleChange = (field: string, value: string) => {
    setLocalEntries((prev) => ({ ...prev, [field]: value }))
    onSaveEntry(field, value)
  }

  const addGoal = () => {
    if (!newGoal.trim()) return
    const updated = [...goals, { id: Date.now().toString(), text: newGoal, completed: false }]
    setGoals(updated)
    onSaveEntry("goals", JSON.stringify(updated))
    setNewGoal("")
  }

  const toggleGoal = (id: string) => {
    const updated = goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    setGoals(updated)
    onSaveEntry("goals", JSON.stringify(updated))
  }

  const completedCount = goals.filter((g) => g.completed).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-sage/20 to-sage-light/30 rounded-2xl p-6 border border-sage/20">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-sage" />
          <h2 className="text-xl font-semibold text-foreground">Goals & Dreams</h2>
        </div>
        <p className="text-muted-foreground">
          "And whoever puts their trust in Allah, He will be enough for them." — Surah At-Talaq 65:3
        </p>
      </div>

      {/* Vision Statement */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">My Vision</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Describe the Muslimah you are becoming, for the sake of Allah
        </p>
        <textarea
          value={localEntries.vision || ""}
          onChange={(e) => handleChange("vision", e.target.value)}
          placeholder="In sha Allah, I see myself..."
          className="w-full min-h-[120px] p-4 bg-muted rounded-xl border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
        />
      </div>

      {/* Goals List */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Monthly Goals</h3>
          <span className="text-sm text-sage">
            {completedCount}/{goals.length} achieved
          </span>
        </div>

        <div className="space-y-3 mb-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                goal.completed ? "bg-sage/20" : "bg-muted hover:bg-sage/10"
              }`}
            >
              {goal.completed ? (
                <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
              <span className={`flex-1 ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {goal.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
            placeholder="Add a new goal..."
            className="flex-1 p-3 bg-muted rounded-xl border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50"
          />
          <button
            onClick={addGoal}
            className="px-4 py-3 bg-sage text-primary-foreground rounded-xl font-medium hover:bg-sage/90 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Word of the Month */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Word of the Month</h3>
        <p className="text-sm text-muted-foreground mb-3">One word to guide your focus this month</p>
        <input
          type="text"
          value={localEntries.monthWord || ""}
          onChange={(e) => handleChange("monthWord", e.target.value)}
          placeholder="e.g., Tawakkul, Sabr, Shukr..."
          className="w-full p-4 bg-muted rounded-xl border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50 text-center text-xl font-semibold"
        />
      </div>
    </div>
  )
}
