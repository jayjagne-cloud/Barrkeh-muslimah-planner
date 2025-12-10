"use client"

import { useTheme } from "./ThemeProvider"
import { SunIcon, MoonIcon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: "1px solid rgba(217,183,122,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme === "dark"
          ? "rgba(32,28,26,0.85)"
          : "rgba(255,255,255,0.9)",
        boxShadow: theme === "dark"
          ? "0 4px 14px rgba(0,0,0,0.5)"
          : "0 4px 14px rgba(180,140,80,0.25)",
        transition: "0.3s ease",
        position: "fixed",
        bottom: "110px",
        right: "20px",
        zIndex: 1500,
        backdropFilter: "blur(6px)",
      }}
    >
      {theme === "dark" ? (
        <SunIcon size={20} color="#D9B77A" />
      ) : (
        <MoonIcon size={20} color="#C6A563" />
      )}
    </button>
  )
}
