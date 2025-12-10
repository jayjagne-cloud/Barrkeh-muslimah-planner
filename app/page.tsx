"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme/ThemeProvider"
import { LogoSection } from "@/components/planner/LogoSection"
import { NavigationTabs } from "@/components/planner/NavigationTabs"
import { WelcomeSection } from "@/components/planner/WelcomeSection"
import { VisionSection } from "@/components/planner/VisionSection"
import { SpiritualSection } from "@/components/planner/SpiritualSection"
import { DailyDuasSection } from "@/components/planner/DailyDuasSection"
import { MonthlySection } from "@/components/planner/MonthlySection"
import { WeeklySection } from "@/components/planner/WeeklySection"
import { DailySection } from "@/components/planner/DailySection"
import { CareerSection } from "@/components/planner/CareerSection"
import { RelationshipsSection } from "@/components/planner/RelationshipsSection"
import { JournalSection } from "@/components/planner/JournalSection"
import { AuditSection } from "@/components/planner/AuditSection"
import { SettingsSection } from "@/components/planner/SettingsSection"
import { Footer } from "@/components/planner/Footer"
import { OnboardingModal } from "@/components/planner/OnboardingModal"
import { EmotionModal } from "@/components/planner/EmotionModal"
import FloatingStickers from "@/components/planner/FloatingStickers"
import { useTranslation } from "@/lib/useTranslation"

type Section =
  | "welcome"
  | "vision"
  | "spiritual"
  | "dailyDuas"
  | "monthly"
  | "weekly"
  | "daily"
  | "career"
  | "relationships"
  | "journal"
  | "audit"
  | "settings"

export default function PlannerPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [username, setUsername] = useState("Beautiful Soul")
  const [language, setLanguage] = useState("en")
  const [activeSection, setActiveSection] = useState<Section>("welcome")
  const [emotionModal, setEmotionModal] = useState<{
    show: boolean
    emotion: string
    title: string
    body: string
    dua: { ar: string; translit: string; trans: string }
  }>({
    show: false,
    emotion: "",
    title: "",
    body: "",
    dua: { ar: "", translit: "", trans: "" },
  })

  const t = useTranslation(language)

  useEffect(() => {
    setMounted(true)
    const savedUsername = localStorage.getItem("barrkeh-username")
    const savedLanguage = localStorage.getItem("barrkeh-language")

    if (!savedUsername) {
      setShowOnboarding(true)
    } else {
      setUsername(savedUsername)
      if (savedLanguage) setLanguage(savedLanguage)
    }
  }, [])

  const handleOnboardingComplete = (name: string, lang: string) => {
    setUsername(name)
    setLanguage(lang)
    localStorage.setItem("barrkeh-username", name)
    localStorage.setItem("barrkeh-language", lang)
    setShowOnboarding(false)
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("barrkeh-language", lang)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section as Section)
  }

  const handleEmotionClick = (emotion: string) => {
    const emotionData = getEmotionData(emotion)
    setEmotionModal({
      show: true,
      emotion,
      ...emotionData,
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("barrkeh-theme", newTheme)
  }

  const getEmotionData = (emotion: string) => {
    const data: Record<string, { title: string; body: string; dua: { ar: string; translit: string; trans: string } }> =
      {
        overwhelmed: {
          title: t.sp_em_overwhelmed_title,
          body: t.sp_em_overwhelmed_body,
          dua: {
            ar: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزَنَ إِذَا شِئْتَ سَهْلًا",
            translit: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'al al-hazna idha shi'ta sahla",
            trans: t.dua_morning_trans,
          },
        },
        uncertain: {
          title: t.sp_em_uncertain_title,
          body: t.sp_em_uncertain_body,
          dua: {
            ar: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ",
            translit: "Allahumma ihdini fiman hadayt",
            trans: t.dua_leaving_trans,
          },
        },
        low: {
          title: t.sp_em_low_title,
          body: t.sp_em_low_body,
          dua: {
            ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
            translit: "Rabbi ishrah li sadri wa yassir li amri",
            trans: t.dua_entering_trans,
          },
        },
        grateful: {
          title: t.sp_em_grateful_title,
          body: t.sp_em_grateful_body,
          dua: {
            ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            translit: "Alhamdulillahi Rabbil 'alamin",
            trans: t.dua_travel_trans,
          },
        },
        anxious: {
          title: t.sp_em_anxious_title,
          body: t.sp_em_anxious_body,
          dua: {
            ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            translit: "Hasbunallahu wa ni'mal wakeel",
            trans: t.dua_rain_trans,
          },
        },
      }
    return data[emotion] || data.grateful
  }

  if (!mounted) {
    return null
  }

  const renderSection = () => {
    switch (activeSection) {
      case "welcome":
        return <WelcomeSection language={language} />
      case "vision":
        return <VisionSection language={language} />
      case "spiritual":
        return <SpiritualSection language={language} onEmotionClick={handleEmotionClick} />
      case "dailyDuas":
        return <DailyDuasSection language={language} />
      case "monthly":
        return <MonthlySection language={language} />
      case "weekly":
        return <WeeklySection language={language} />
      case "daily":
        return <DailySection language={language} />
      case "career":
        return <CareerSection language={language} />
      case "relationships":
        return <RelationshipsSection language={language} />
      case "journal":
        return <JournalSection language={language} />
      case "audit":
        return <AuditSection language={language} />
      case "settings":
        return (
          <SettingsSection
            username={username}
            language={language}
            theme={theme}
            onThemeChange={handleThemeChange}
            onUsernameChange={setUsername}
            onLanguageChange={handleLanguageChange}
          />
        )
      default:
        return <WelcomeSection language={language} />
    }
  }

  return (
    <>
      <div className="planner-container min-h-screen py-5 px-0 overflow-x-hidden dot-pattern">
        <div className="max-w-[1100px] mx-auto px-4 rounded-[22px] planner-main-card min-h-[90vh]">
          <LogoSection username={username} language={language} onLanguageChange={handleLanguageChange} />

          <NavigationTabs activeSection={activeSection} onSectionChange={handleSectionChange} language={language} />

          {renderSection()}

          <Footer language={language} />
        </div>
      </div>

      {activeSection !== "settings" && <FloatingStickers />}

      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} language={language} />}

      {emotionModal.show && (
        <EmotionModal
          title={emotionModal.title}
          body={emotionModal.body}
          dua={emotionModal.dua}
          onClose={() => setEmotionModal({ ...emotionModal, show: false })}
        />
      )}
    </>
  )
}
