"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideLoader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function LogoutPage() {
  const router = useRouter()
  const { language } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {language === "th" ? "กำลังออกจากระบบ..." : language === "ko" ? "로그아웃 중..." : "Logging out..."}
          </CardTitle>
          <CardDescription className="text-center">
            {language === "th"
              ? "กำลังนำคุณกลับไปยังหน้าเข้าสู่ระบบ"
              : language === "ko"
                ? "로그인 페이지로 리디렉션 중"
                : "Redirecting you to the login page"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <LucideLoader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    </div>
  )
}
