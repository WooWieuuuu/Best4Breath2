"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LucideArrowLeft } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/lib/language-context"

export default function SettingsPage() {
  const { t, language } = useLanguage()

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
          <h1 className="text-3xl font-bold">{t.settings}</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.notifications}</CardTitle>
              <CardDescription>
                {language === "th"
                  ? "จัดการการแจ้งเตือนและการตั้งค่าอีเมล"
                  : language === "ko"
                    ? "알림 및 이메일 설정 관리"
                    : "Manage notification and email preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>
                    {language === "th"
                      ? "การแจ้งเตือนเคสใหม่"
                      : language === "ko"
                        ? "새 케이스 알림"
                        : "New Case Notifications"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "รับการแจ้งเตือนเมื่อมีเคสใหม่"
                      : language === "ko"
                        ? "새 케이스가 있을 때 알림 받기"
                        : "Receive notifications for new cases"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>
                    {language === "th"
                      ? "การแจ้งเตือนทางอีเมล"
                      : language === "ko"
                        ? "이메일 알림"
                        : "Email Notifications"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "รับการแจ้งเตือนผ่านอีเมล"
                      : language === "ko"
                        ? "이메일로 알림 받기"
                        : "Receive notifications via email"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>
                    {language === "th" ? "รายงานประจำสัปดาห์" : language === "ko" ? "주간 보고서" : "Weekly Reports"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "รับรายงานสรุปประจำสัปดาห์"
                      : language === "ko"
                        ? "주간 요약 보고서 받기"
                        : "Receive weekly summary reports"}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "th" ? "ความปลอดภัย" : language === "ko" ? "보안" : "Security"}</CardTitle>
              <CardDescription>
                {language === "th"
                  ? "จัดการความปลอดภัยบัญชีของคุณ"
                  : language === "ko"
                    ? "계정 보안 관리"
                    : "Manage your account security"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>
                    {language === "th"
                      ? "การยืนยันตัวตนแบบสองขั้นตอน"
                      : language === "ko"
                        ? "2단계 인증"
                        : "Two-Factor Authentication"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "เพิ่มความปลอดภัยให้กับบัญชีของคุณ"
                      : language === "ko"
                        ? "계정에 추가 보안 계층 추가"
                        : "Add an extra layer of security to your account"}
                  </p>
                </div>
                <Switch />
              </div>

              <div>
                <Button variant="outline">
                  {language === "th" ? "เปลี่ยนรหัสผ่าน" : language === "ko" ? "비밀번호 변경" : "Change Password"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "th" ? "การตั้งค่าการแสดงผล" : language === "ko" ? "디스플레이 설정" : "Display Settings"}
              </CardTitle>
              <CardDescription>
                {language === "th"
                  ? "ปรับแต่งประสบการณ์การใช้งานของคุณ"
                  : language === "ko"
                    ? "사용자 경험 맞춤 설정"
                    : "Customize your experience"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "โหมดมืด" : language === "ko" ? "다크 모드" : "Dark Mode"}</Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "เปลี่ยนเป็นธีมสีเข้ม"
                      : language === "ko"
                        ? "어두운 테마로 전환"
                        : "Switch to dark theme"}
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "มุมมองกะทัดรัด" : language === "ko" ? "컴팩트 뷰" : "Compact View"}</Label>
                  <p className="text-sm text-gray-500">
                    {language === "th"
                      ? "แสดงข้อมูลมากขึ้นในหน้าจอ"
                      : language === "ko"
                        ? "화면에 더 많은 정보 표시"
                        : "Show more information on screen"}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
