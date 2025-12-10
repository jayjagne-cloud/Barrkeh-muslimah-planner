"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"

interface CalendarProps {
  language: string
}

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Ula",
  "Jumada al-Akhirah",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
]

// Basic Hijri conversion (approximation for display)
function gregorianToHijri(date: Date) {
  const gYear = date.getFullYear()
  const gMonth = date.getMonth()
  const gDay = date.getDate()

  // Hijri epoch (July 16, 622 CE)
  const islamicEpoch = 1948440
  const gregorianEpoch = 1721426

  // Convert Gregorian to Julian Day Number
  const a = Math.floor((14 - (gMonth + 1)) / 12)
  const y = gYear + 4800 - a
  const m = gMonth + 1 + 12 * a - 3
  const jdn =
    gDay +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045

  // Convert to Islamic calendar
  const l = jdn - islamicEpoch + 1
  const n = Math.floor((l - 1) / 10631)
  const l1 = l - 10631 * n + 354
  const j =
    Math.floor((10985 - l1) / 5316) * Math.floor((50 * l1) / 17719) +
    Math.floor(l1 / 5670) * Math.floor((43 * l1) / 15238)
  const l2 =
    l1 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29
  const hMonth = Math.floor((24 * l2) / 709)
  const hDay = l2 - Math.floor((709 * hMonth) / 24)
  const hYear = 30 * n + j - 30

  return { year: hYear, month: hMonth - 1, day: hDay }
}

export function Calendar({ language }: CalendarProps) {
  const t = useTranslation(language)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isHijri, setIsHijri] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [tasks, setTasks] = useState("")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = [t.day_sun, t.day_mon, t.day_tue, t.day_wed, t.day_thu, t.day_fri, t.day_sat]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      })
    }

    const remainingDays = 35 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      })
    }

    return days
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isSelectedDate = (day: number, isCurrentMonth: boolean) => {
    if (!selectedDate || !isCurrentMonth) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  useEffect(() => {
    if (selectedDate) {
      const key = `calendar-tasks-${selectedDate.toISOString().split("T")[0]}`
      const saved = localStorage.getItem(key)
      if (saved) setTasks(saved)
      else setTasks("")
    }
  }, [selectedDate])

  const saveTasks = () => {
    if (selectedDate) {
      const key = `calendar-tasks-${selectedDate.toISOString().split("T")[0]}`
      localStorage.setItem(key, tasks)
    }
  }

  const getDisplayMonthYear = () => {
    if (isHijri) {
      const hijriDate = gregorianToHijri(currentDate)
      return `${HIJRI_MONTHS[hijriDate.month]} ${hijriDate.year}`
    }
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }

  return (
    <div className="flex flex-col md:flex-row gap-2.5 mt-4">
      <div className="flex-1 mt-4 rounded-[18px] border border-[rgba(212,175,55,0.3)] p-3 planner-section">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm font-semibold planner-subheading">{getDisplayMonthYear()}</div>
            <small className="text-xs planner-text-muted">
              {isHijri ? t.calendar_mode_hijri : t.calendar_mode_greg}
            </small>
          </div>
          <div className="flex gap-1">
            <button
              onClick={prevMonth}
              className="px-2 py-1 rounded-full planner-input text-[11px] cursor-pointer hover:opacity-80"
            >
              &lt;
            </button>
            <button
              onClick={nextMonth}
              className="px-2 py-1 rounded-full planner-input text-[11px] cursor-pointer hover:opacity-80"
            >
              &gt;
            </button>
            <button
              onClick={() => setIsHijri(!isHijri)}
              className="px-2 py-1 rounded-full planner-input text-[11px] cursor-pointer hover:opacity-80"
            >
              {isHijri ? t.calendar_mode_greg : t.calendar_hijri_toggle}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-[10px] planner-text-muted mb-0.5 text-center">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-[11px] mt-1.5">
          {generateCalendarDays().map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(item.day, item.isCurrentMonth)}
              className={`h-[26px] rounded-lg border flex items-center justify-center cursor-pointer relative ${
                !item.isCurrentMonth
                  ? "opacity-35 border-border planner-card-item planner-text"
                  : isSelectedDate(item.day, item.isCurrentMonth)
                    ? "gold-gradient text-[#111] font-semibold border-primary"
                    : "border-border planner-card-item planner-text hover:opacity-80"
              }`}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-4">
        <h3 className="mt-5 mb-1.5 text-base planner-subheading">{t.calendar_tasks_title}</h3>
        {selectedDate && (
          <p className="text-xs planner-text-muted mt-0.5">
            {selectedDate.toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        )}
        <textarea
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          onBlur={saveTasks}
          placeholder={t.calendar_tasks_placeholder}
          className="w-full planner-input min-h-[80px] resize-vertical focus:outline-none input-glow lined-textarea"
        />
      </div>
    </div>
  )
}
