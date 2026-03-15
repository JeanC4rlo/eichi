import { Fira_Code, Funnel_Display, Inter } from "next/font/google"

export const funnel = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel"
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira"
})
