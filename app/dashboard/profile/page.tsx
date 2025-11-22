"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LucideArrowLeft, LucideUser, LucideCamera } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/lib/language-context"

export default function ProfilePage() {
  const { t, language } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              {language === "th" ? "กลับไปแดชบอร์ด" : language === "ko" ? "대시보드로 돌아가기" : "Back to Dashboard"}
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{t.profile}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === "th" ? "ข้อมูลโปรไฟล์" : language === "ko" ? "프로필 정보" : "Profile Information"}
            </CardTitle>
            <CardDescription>
              {language === "th"
                ? "จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ"
                : language === "ko"
                  ? "개인 정보 및 계정 설정을 관리하세요"
                  : "Manage your personal information and account settings"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <LucideUser className="h-12 w-12 text-blue-600" />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-transparent"
                >
                  <LucideCamera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t.doctorName}</h3>
                <p className="text-gray-500">{t.doctorTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {language === "th" ? "ชื่อจริง" : language === "ko" ? "이름" : "First Name"}
                </Label>
                <Input
                  id="firstName"
                  defaultValue={language === "th" ? "สมศรี" : language === "ko" ? "지은" : "Sarah"}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {language === "th" ? "นามสกุล" : language === "ko" ? "성" : "Last Name"}
                </Label>
                <Input
                  id="lastName"
                  defaultValue={language === "th" ? "จริงใจ" : language === "ko" ? "김" : "Johnson"}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" defaultValue="doctor@best4breath.com" disabled={!isEditing} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === "th" ? "เบอร์โทรศัพท์" : language === "ko" ? "전화번호" : "Phone Number"}
              </Label>
              <Input id="phone" type="tel" defaultValue="+66 2 123 4567" disabled={!isEditing} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">
                {language === "th" ? "ความเชี่ยวชาญ" : language === "ko" ? "전문 분야" : "Specialty"}
              </Label>
              <Input id="specialty" defaultValue={t.doctorTitle} disabled={!isEditing} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{language === "th" ? "ประวัติส่วนตัว" : language === "ko" ? "약력" : "Bio"}</Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue={
                  language === "th"
                    ? "แพทย์ผู้เชี่ยวชาญด้านโรคระบบทางเดินหายใจและมะเร็งปอด มีประสบการณ์มากกว่า 15 ปี"
                    : language === "ko"
                      ? "호흡기 질환 및 폐암 전문의로 15년 이상의 경험을 보유하고 있습니다"
                      : "Specialist in respiratory diseases and lung cancer with over 15 years of experience"
                }
                disabled={!isEditing}
              />
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  {language === "th" ? "แก้ไขโปรไฟล์" : language === "ko" ? "프로필 수정" : "Edit Profile"}
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(false)}>
                    {language === "th" ? "บันทึก" : language === "ko" ? "저장" : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {language === "th" ? "ยกเลิก" : language === "ko" ? "취소" : "Cancel"}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
