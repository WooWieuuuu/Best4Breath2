"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideStethoscope, LucideLoader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Register() {
  const router = useRouter()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const content = {
    th: {
      title: "ลงทะเบียนบัญชีแพทย์",
      subtitle: "สร้างบัญชีเพื่อเข้าถึงแพลตฟอร์มการวินิจฉัย",
      nameLabel: "ชื่อ-นามสกุล",
      emailLabel: "อีเมล",
      passwordLabel: "รหัสผ่าน",
      confirmPasswordLabel: "ยืนยันรหัสผ่าน",
      registerButton: "ลงทะเบียน",
      registering: "กำลังลงทะเบียน...",
      haveAccount: "มีบัญชีอยู่แล้ว?",
      login: "เข้าสู่ระบบ",
    },
    en: {
      title: "Doctor Registration",
      subtitle: "Create an account to access the diagnostic platform",
      nameLabel: "Full Name",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      registerButton: "Register",
      registering: "Registering...",
      haveAccount: "Already have an account?",
      login: "Login",
    },
    ko: {
      title: "의사 등록",
      subtitle: "진단 플랫폼에 액세스하려면 계정을 만드세요",
      nameLabel: "전체 이름",
      emailLabel: "이메일",
      passwordLabel: "비밀번호",
      confirmPasswordLabel: "비밀번호 확인",
      registerButton: "등록",
      registering: "등록 중...",
      haveAccount: "이미 계정이 있으신가요?",
      login: "로그인",
    },
  }

  const t = content[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <LucideStethoscope className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">Best4Breath</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t.title}</CardTitle>
            <CardDescription className="text-center">{t.subtitle}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.nameLabel}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.passwordLabel}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPasswordLabel}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.registering}
                  </>
                ) : (
                  t.registerButton
                )}
              </Button>
              <p className="text-sm text-center text-gray-500">
                {t.haveAccount}{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  {t.login}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
