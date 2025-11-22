import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Thai, Inter, Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-thai",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-korean",
})

export const metadata: Metadata = {
  title: "Best4Breath - Advanced Lung Cancer Diagnosis Platform",
  description: "Transform 2D X-rays into 3D CT scans for lung cancer diagnosis using AI technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansThai.variable} ${inter.variable} ${notoSansKR.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
