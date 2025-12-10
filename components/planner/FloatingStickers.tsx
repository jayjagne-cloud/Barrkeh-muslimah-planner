"use client"

import type React from "react"

import { useState, useEffect } from "react"

const ISLAMIC_STICKERS = [
  { emoji: "🕌", label: "Mosque" },
  { emoji: "🌙", label: "Crescent" },
  { emoji: "⭐", label: "Star" },
  { emoji: "📿", label: "Tasbih" },
  { emoji: "🤲", label: "Dua Hands" },
  { emoji: "📖", label: "Quran" },
  { emoji: "🕋", label: "Kaaba" },
  { emoji: "☪️", label: "Star & Crescent" },
  { emoji: "🧕", label: "Hijab" },
  { emoji: "🕊️", label: "Peace Dove" },
  { emoji: "💚", label: "Green Heart" },
  { emoji: "✨", label: "Sparkle" },
  { emoji: "💫", label: "Stars" },
  { emoji: "🌸", label: "Flower" },
  { emoji: "🌺", label: "Hibiscus" },
  { emoji: "🌷", label: "Tulip" },
  { emoji: "🌹", label: "Rose" },
  { emoji: "💐", label: "Bouquet" },
  { emoji: "🦋", label: "Butterfly" },
  { emoji: "🌿", label: "Herb" },
  { emoji: "🍃", label: "Leaves" },
  { emoji: "🌱", label: "Seedling" },
  { emoji: "🌻", label: "Sunflower" },
  { emoji: "🌼", label: "Blossom" },
  { emoji: "💝", label: "Heart Gift" },
  { emoji: "💖", label: "Sparkling Heart" },
  { emoji: "💜", label: "Purple Heart" },
  { emoji: "💛", label: "Yellow Heart" },
  { emoji: "🩷", label: "Pink Heart" },
  { emoji: "🎀", label: "Ribbon" },
  { emoji: "☕", label: "Coffee" },
  { emoji: "🍵", label: "Tea" },
]

interface PlacedSticker {
  id: string
  emoji: string
  x: number
  y: number
}

export default function FloatingStickers() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([])
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Load placed stickers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("barrkeh-placed-stickers")
    if (saved) {
      setPlacedStickers(JSON.parse(saved))
    }
  }, [])

  // Save placed stickers to localStorage
  const savePlacedStickers = (stickers: PlacedSticker[]) => {
    localStorage.setItem("barrkeh-placed-stickers", JSON.stringify(stickers))
    setPlacedStickers(stickers)
  }

  // Place a new sticker on screen
  const handleStickerClick = (emoji: string) => {
    const newSticker: PlacedSticker = {
      id: `sticker-${Date.now()}-${Math.random()}`,
      emoji,
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 50,
    }
    savePlacedStickers([...placedStickers, newSticker])
  }

  // Start dragging a placed sticker
  const handleStickerMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const sticker = placedStickers.find((s) => s.id === id)
    if (!sticker) return

    setDraggedSticker(id)
    setDragOffset({
      x: e.clientX - sticker.x,
      y: e.clientY - sticker.y,
    })
  }

  // Move dragged sticker
  useEffect(() => {
    if (!draggedSticker) return

    const handleMouseMove = (e: MouseEvent) => {
      const updated = placedStickers.map((s) =>
        s.id === draggedSticker
          ? {
              ...s,
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            }
          : s,
      )
      setPlacedStickers(updated)
    }

    const handleMouseUp = () => {
      if (draggedSticker) {
        localStorage.setItem("barrkeh-placed-stickers", JSON.stringify(placedStickers))
        setDraggedSticker(null)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggedSticker, dragOffset, placedStickers])

  // Double-click to remove sticker
  const handleStickerDoubleClick = (id: string) => {
    const updated = placedStickers.filter((s) => s.id !== id)
    savePlacedStickers(updated)
  }

  return (
    <>
      {/* Floating Panel Toggle Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] shadow-[0_8px_24px_rgba(212,175,55,0.5)] flex items-center justify-center text-2xl cursor-pointer transition-all hover:scale-110 hover:shadow-[0_12px_32px_rgba(212,175,55,0.7)] active:scale-95"
        aria-label="Toggle sticker panel"
      >
        🌙
      </button>

      {/* Floating Sticker Panel */}
      {isPanelOpen && (
        <div className="fixed bottom-24 right-6 z-[998] w-[320px] max-h-[400px] overflow-y-auto bg-background/95 backdrop-blur-md border-2 border-[rgba(212,175,55,0.4)] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Stickers</h3>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Click a sticker to place it. Drag to move. Double-click to remove.
          </p>
          <div className="grid grid-cols-6 gap-2">
            {ISLAMIC_STICKERS.map((sticker, index) => (
              <button
                key={index}
                onClick={() => handleStickerClick(sticker.emoji)}
                className="w-full aspect-square flex items-center justify-center text-2xl bg-card hover:bg-accent rounded-lg transition-all hover:scale-110 active:scale-95 cursor-pointer border border-border"
                title={sticker.label}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Placed Stickers */}
      {placedStickers.map((sticker) => (
        <div
          key={sticker.id}
          onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
          onDoubleClick={() => handleStickerDoubleClick(sticker.id)}
          style={{
            position: "fixed",
            left: `${sticker.x}px`,
            top: `${sticker.y}px`,
            cursor: draggedSticker === sticker.id ? "grabbing" : "grab",
            zIndex: draggedSticker === sticker.id ? 997 : 100,
            transition: draggedSticker === sticker.id ? "none" : "transform 0.2s ease",
          }}
          className="select-none"
        >
          <div className="text-4xl md:text-5xl drop-shadow-lg hover:scale-110 transition-transform pointer-events-auto">
            {sticker.emoji}
          </div>
        </div>
      ))}
    </>
  )
}
