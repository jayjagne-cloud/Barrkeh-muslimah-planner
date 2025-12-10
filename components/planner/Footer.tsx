"use client"

import { useTranslation } from "@/lib/useTranslation"

interface FooterProps {
  language: string
}

export function Footer({ language }: FooterProps) {
  const t = useTranslation(language)

  return (
    <div className="mt-2.5 text-center p-4 rounded-[18px] footer-container text-xs">
      <div>{t.footer_text}</div>
      <div>{t.footer_text2}</div>
      <div className="w-[90px] h-[2px] mx-auto mt-2 bg-gradient-to-r from-transparent via-[#FDE7B0] via-[#D4AF37] to-transparent rounded-full"></div>
    </div>
  )
}
