"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function WelcomeBack() {
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState("")
  const [dua, setDua] = useState("")

  useEffect(() => {
    const savedName = localStorage.getItem("bd-username")
    const firstVisit = sessionStorage.getItem("bd-first-visit")

    if (savedName) setUsername(savedName)

    const hour = new Date().getHours()

    if (hour < 12) {
      setDua("May Allah fill your morning with Barakah and clarity ✨")
    } else if (hour < 16) {
      setDua("May this afternoon bring you ease, focus and gentle guidance ✨")
    } else if (hour < 20) {
      setDua("May your evening be full of peace and quiet victories ✨")
    } else {
      setDua("May Allah wrap your night in tranquility and protection ✨")
    }

    if (!firstVisit) {
      sessionStorage.setItem("bd-first-visit", "true")
      return
    }

    setShow(true)
    const timer = setTimeout(() => setShow(false), 3200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.94 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="welcome-back-toast"
        >
          <div className="toast-line-1">🌙 Welcome back, {username}</div>
          <div className="toast-line-2">{dua}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
