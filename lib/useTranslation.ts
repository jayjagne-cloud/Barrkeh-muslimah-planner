"use client"

import { translations, type Language, type Translation } from "./translations"

export function useTranslation(language: string): Translation {
  const lang = (language as Language) || "en"
  return translations[lang] || translations.en
}
