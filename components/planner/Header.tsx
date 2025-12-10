"use client"

import { Moon, Sun, Settings } from "lucide-react"
import { useTheme } from "@/components/theme/ThemeProvider"
import Link from "next/link"

interface HeaderProps {
  username: string
}

export function Header({ username }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-lg">{username.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Noor Planner</h1>
          <p className="text-sm text-muted-foreground">Assalamu Alaikum, {username}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-sage" />}
        </button>
        <Link href="/settings" className="p-2 rounded-full hover:bg-muted transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Link>
      </div>
    </header>
  )
}
