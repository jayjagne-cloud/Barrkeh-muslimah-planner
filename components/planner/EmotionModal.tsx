"use client"

interface EmotionModalProps {
  title: string
  body: string
  dua: {
    ar: string
    translit: string
    trans: string
  }
  onClose: () => void
}

export function EmotionModal({ title, body, dua, onClose }: EmotionModalProps) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-[998]">
      <div className="max-w-[450px] w-[90%] rounded-[20px] bg-gradient-to-br from-[#242424] to-[#333333] border border-[rgba(212,175,55,0.5)] p-5 shadow-[0_0_40px_rgba(212,175,55,0.45)]">
        <h3 className="text-lg text-[#FDE7B0] mt-0">{title}</h3>
        <p className="text-sm text-[#D1D5DB] mb-3">{body}</p>

        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] p-2.5 bg-[#181818] mb-2">
          <div
            className="font-['Amiri','Traditional_Arabic',serif] text-xl mb-1.5 text-right text-[#FDE7B0] leading-relaxed"
            dir="rtl"
          >
            {dua.ar}
          </div>
          <div className="text-xs text-[#E5E7EB] mb-1 italic">{dua.translit}</div>
          <div className="text-sm text-[#D1D5DB]">{dua.trans}</div>
        </div>

        <button
          onClick={onClose}
          className="w-auto px-4 py-2 mt-2.5 rounded-full border-none cursor-pointer gold-gradient text-[#111] text-sm font-bold uppercase tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.55)] btn-glow transition-all hover:-translate-y-0.5"
        >
          Close
        </button>
      </div>
    </div>
  )
}
