import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/ThemeProvider"

export const metadata = {
  title: "Barrkeh DigiProducts | Muslimah Daily Planner",
  description:
    "Premium Muslimah Interactive Digital Planner - A sacred space designed to help you live intentionally, grow spiritually, and create a life filled with barakah.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-serif">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
