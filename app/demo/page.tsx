"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideStethoscope, LucideArrowLeft, LucidePlay } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Demo() {
  const { language } = useLanguage()

  const content = {
    th: {
      title: "ดูตัวอย่างการทำงาน",
      subtitle: "ดูวิธีการทำงานของ Best4Breath ในการแปลงภาพเอกซเรย์เป็นภาพ CT 3 มิติ",
      videoTitle: "วิดีโอสาธิต",
      videoDesc: "ชมการสาธิตการทำงานของระบบ AI ในการวิเคราะห์ภาพปอด",
      featureTitle: "คุณสมบัติหลัก",
      feature1: "อัปโหลดภาพเอกซเรย์ของผู้ป่วย",
      feature2: "ระบบ AI วิเคราะห์และสร้างภาพ CT 3 มิติ",
      feature3: "ตรวจจับและระบุตำแหน่งก้อนเนื้อที่น่าสงสัย",
      feature4: "รับรายงานการวินิจฉัยอย่างละเอียด",
      backToHome: "กลับสู่หน้าหลัก",
      tryNow: "ลองใช้งานเลย",
    },
    en: {
      title: "See It In Action",
      subtitle: "Watch how Best4Breath transforms X-rays into 3D CT scans",
      videoTitle: "Demo Video",
      videoDesc: "Watch a demonstration of our AI system analyzing lung images",
      featureTitle: "Key Features",
      feature1: "Upload patient X-ray images",
      feature2: "AI system analyzes and generates 3D CT scans",
      feature3: "Detect and identify suspicious nodule locations",
      feature4: "Receive detailed diagnostic reports",
      backToHome: "Back to Home",
      tryNow: "Try It Now",
    },
    ko: {
      title: "실제 작동 보기",
      subtitle: "Best4Breath가 X-레이를 3D CT 스캔으로 변환하는 방법을 확인하세요",
      videoTitle: "데모 비디오",
      videoDesc: "폐 이미지를 분석하는 AI 시스템의 시연을 시청하세요",
      featureTitle: "주요 기능",
      feature1: "환자 X-레이 이미지 업로드",
      feature2: "AI 시스템이 3D CT 스캔을 분석하고 생성",
      feature3: "의심스러운 결절 위치 감지 및 식별",
      feature4: "상세한 진단 보고서 받기",
      backToHome: "홈으로 돌아가기",
      tryNow: "지금 사용해보기",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <LucideStethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-800">Best4Breath</span>
          </Link>
          <LanguageSwitcher />
        </nav>
      </header>

      <main className="container mx-auto py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{t.subtitle}</p>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t.videoTitle}</CardTitle>
              <CardDescription>{t.videoDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <LucidePlay className="mr-2 h-5 w-5" />
                  Play Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-blue-900 mb-6">{t.featureTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                    1
                  </div>
                  <p className="text-gray-700">{t.feature1}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                    2
                  </div>
                  <p className="text-gray-700">{t.feature2}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                    3
                  </div>
                  <p className="text-gray-700">{t.feature3}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                    4
                  </div>
                  <p className="text-gray-700">{t.feature4}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {t.tryNow}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
