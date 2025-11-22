"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  LucideStethoscope,
  LucideArrowLeft,
  LucideBlinds as LucideLungs,
  LucideBrain,
  LucideZap,
  LucideShield,
  LucideBarChart,
  LucideFileText,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Features() {
  const { language } = useLanguage()

  const content = {
    th: {
      title: "คุณสมบัติทั้งหมด",
      subtitle: "สำรวจความสามารถที่ครบครันของ Best4Breath",
      feature1Title: "การสร้างภาพ CT 3D",
      feature1Desc: "แปลงภาพเอกซเรย์ 2 มิติเป็นภาพ CT 3 มิติอย่างอัตโนมัติด้วย AI",
      feature2Title: "การวินิจฉัยด้วย AI",
      feature2Desc: "ตรวจจับและจำแนกโรคปอดด้วยความแม่นยำสูงกว่า 95%",
      feature3Title: "ประมวลผลรวดเร็ว",
      feature3Desc: "ผลลัพธ์ภายในไม่กี่นาที ช่วยประหยัดเวลาอันมีค่า",
      feature4Title: "ความปลอดภัยระดับสูง",
      feature4Desc: "ข้อมูลเข้ารหัสและปฏิบัติตามมาตรฐาน HIPAA",
      feature5Title: "การวิเคราะห์ข้อมูล",
      feature5Desc: "รายงานและการวิเคราะห์แนวโน้มสำหรับการตัดสินใจที่ดีขึ้น",
      feature6Title: "รายงานอัตโนมัติ",
      feature6Desc: "สร้างรายงานการวินิจฉัยอัตโนมัติในรูปแบบ PDF",
      backToHome: "กลับสู่หน้าหลัก",
    },
    en: {
      title: "All Features",
      subtitle: "Explore the complete capabilities of Best4Breath",
      feature1Title: "3D CT Generation",
      feature1Desc: "Automatically convert 2D X-rays to 3D CT scans using AI",
      feature2Title: "AI Diagnosis",
      feature2Desc: "Detect and classify lung diseases with over 95% accuracy",
      feature3Title: "Fast Processing",
      feature3Desc: "Results in minutes, saving valuable time",
      feature4Title: "High Security",
      feature4Desc: "Encrypted data and HIPAA compliant",
      feature5Title: "Data Analytics",
      feature5Desc: "Reports and trend analysis for better decision making",
      feature6Title: "Auto Reports",
      feature6Desc: "Automatically generate diagnostic reports in PDF format",
      backToHome: "Back to Home",
    },
    ko: {
      title: "모든 기능",
      subtitle: "Best4Breath의 완전한 기능을 탐색하세요",
      feature1Title: "3D CT 생성",
      feature1Desc: "AI를 사용하여 2D X-레이를 3D CT 스캔으로 자동 변환",
      feature2Title: "AI 진단",
      feature2Desc: "95% 이상의 정확도로 폐질환 감지 및 분류",
      feature3Title: "빠른 처리",
      feature3Desc: "몇 분 안에 결과 제공, 귀중한 시간 절약",
      feature4Title: "높은 보안",
      feature4Desc: "암호화된 데이터 및 HIPAA 준수",
      feature5Title: "데이터 분석",
      feature5Desc: "더 나은 의사 결정을 위한 보고서 및 추세 분석",
      feature6Title: "자동 보고서",
      feature6Desc: "PDF 형식으로 진단 보고서 자동 생성",
      backToHome: "홈으로 돌아가기",
    },
  }

  const t = content[language]

  const features = [
    { icon: LucideLungs, title: t.feature1Title, desc: t.feature1Desc },
    { icon: LucideBrain, title: t.feature2Title, desc: t.feature2Desc },
    { icon: LucideZap, title: t.feature3Title, desc: t.feature3Desc },
    { icon: LucideShield, title: t.feature4Title, desc: t.feature4Desc },
    { icon: LucideBarChart, title: t.feature5Title, desc: t.feature5Desc },
    { icon: LucideFileText, title: t.feature6Title, desc: t.feature6Desc },
  ]

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
