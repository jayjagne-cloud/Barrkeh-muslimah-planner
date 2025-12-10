"use client"

import { useState } from "react"

const STICKERS = [
  "🌙",
  "⭐",
  "🕌",
  "📿",
  "🤲",
  "💫",
  "✨",
  "🌸",
  "🌺",
  "🌷",
  "🌹",
  "💐",
  "🦋",
  "🕊️",
  "💝",
  "💖",
  "🎀",
  "📖",
  "🧕",
  "☕",
  "🍵",
  "🌿",
  "🍃",
  "🌱",
  "🌻",
  "🌼",
  "❤️",
  "💜",
  "💛",
  "🩷",
]

interface StickerPanelProps {
  onSelectSticker: (sticker: string) => void
}

export function StickerPanel({ onSelectSticker }: StickerPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-full border border-[rgba(212,175,55,0.4)] bg-[#141414] text-[#E5E7EB] text-xs hover:bg-[#1a1a1a] transition-colors"
      >
        Add Sticker 🌙
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-[#1a1a1a] border border-[rgba(212,175,55,0.3)] rounded-xl shadow-lg z-50 w-[200px]">
          <div className="grid grid-cols-6 gap-1">
            {STICKERS.map((sticker, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectSticker(sticker)
                  setIsOpen(false)
                }}
                className="w-7 h-7 flex items-center justify-center hover:bg-[#252525] rounded transition-colors text-lg"
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
