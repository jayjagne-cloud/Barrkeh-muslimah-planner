"use client"

interface LogoSectionProps {
  username: string
  language: string
  onLanguageChange: (lang: string) => void
}

export function LogoSection({ username, language, onLanguageChange }: LogoSectionProps) {
  return (
    <div className="text-center p-6 rounded-[22px] logo-section-container mb-5 relative overflow-hidden">
      <div className="flex flex-col items-center gap-3 relative z-10">
        {/* Logo Mark */}
        <div className="w-[90px] h-[90px] rounded-full gold-conic flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
          <span className="font-serif text-[44px] font-bold tracking-tight text-[#111827]">BD</span>
        </div>

        {/* Logo Wordmark */}
        <div>
          <div className="text-[22px] tracking-[4px] uppercase logo-title font-semibold">BARRKEH</div>
          <div className="text-[12px] tracking-[3px] uppercase text-[#D4AF37]">DIGIPRODUCTS</div>
        </div>

        {/* Tagline */}
        <div className="mt-1 text-[11px] tracking-[1.5px] uppercase logo-tagline opacity-90">
          Digital Tools for Life & Work
        </div>

        {/* Divider */}
        <div className="w-[110px] h-[2px] mt-2 bg-gradient-to-r from-transparent via-[#FDE7B0] via-[#D4AF37] to-transparent rounded-full"></div>

        {/* Header Bar */}
        <div className="mt-3 flex items-center justify-between gap-2 text-[13px] logo-greeting w-full font-bold">
          <div>
            As-salāmu ʿalayki, <span className="text-[#D4AF37] font-bold">{username}</span>
          </div>
          <div>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="px-2 py-1 rounded-full border border-[rgba(212,175,55,0.4)] lang-select text-sm"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="nl">NL</option>
              <option value="it">IT</option>
              <option value="es">ES</option>
              <option value="sv">SE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
