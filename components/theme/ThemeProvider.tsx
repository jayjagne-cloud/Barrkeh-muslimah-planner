"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextProps {
  theme: Theme
  setTheme: (value: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-theme") as Theme | null

    if (saved) {
      setThemeState(saved)
      applyTheme(saved)
    } else {
      setThemeState("dark")
      applyTheme("dark")
    }

    setMounted(true)
  }, [])

  const applyTheme = (mode: Theme) => {
    if (typeof document === "undefined") return

    if (mode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const setTheme = (value: Theme) => {
    setThemeState(value)
    localStorage.setItem("barrkeh-theme", value)
    applyTheme(value)
  }

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {!mounted ? <div style={{ opacity: 0, pointerEvents: "none" }}>{children}</div> : children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
