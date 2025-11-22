"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideStethoscope, LucideArrowLeft, LucideCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Pricing() {
  const { language } = useLanguage()

  const content = {
    th: {
      title: "แผนราคา",
      subtitle: "เลือกแผนที่เหมาะสมกับความต้องการของคุณ",
      basicPlan: "แผนพื้นฐาน",
      proPlan: "แผนมืออาชีพ",
      enterprisePlan: "แผนองค์กร",
      perMonth: "/เดือน",
      scansPerMonth: "สแกนต่อเดือน",
      basicFeature1: "การสร้างภาพ CT 3D",
      basicFeature2: "การวินิจฉัยด้วย AI",
      basicFeature3: "รายงานพื้นฐาน",
      proFeature1: "ทุกอย่างในแผนพื้นฐาน",
      proFeature2: "การวิเคราะห์ขั้นสูง",
      proFeature3: "การสนับสนุนลำดับความสำคัญ",
      proFeature4: "API Access",
      enterpriseFeature1: "ทุกอย่างในแผนมืออาชีพ",
      enterpriseFeature2: "สแกนไม่จำกัด",
      enterpriseFeature3: "การปรับแต่งเฉพาะ",
      enterpriseFeature4: "การฝึกอบรม",
      chooseButton: "เลือกแผน",
      contactButton: "ติดต่อฝ่ายขาย",
      backToHome: "กลับสู่หน้าหลัก",
    },
    en: {
      title: "Pricing Plans",
      subtitle: "Choose the plan that fits your needs",
      basicPlan: "Basic Plan",
      proPlan: "Professional Plan",
      enterprisePlan: "Enterprise Plan",
      perMonth: "/month",
      scansPerMonth: "scans/month",
      basicFeature1: "3D CT Generation",
      basicFeature2: "AI Diagnosis",
      basicFeature3: "Basic Reports",
      proFeature1: "Everything in Basic",
      proFeature2: "Advanced Analytics",
      proFeature3: "Priority Support",
      proFeature4: "API Access",
      enterpriseFeature1: "Everything in Pro",
      enterpriseFeature2: "Unlimited Scans",
      enterpriseFeature3: "Custom Integration",
      enterpriseFeature4: "Training Sessions",
      chooseButton: "Choose Plan",
      contactButton: "Contact Sales",
      backToHome: "Back to Home",
    },
    ko: {
      title: "요금제",
      subtitle: "귀하의 필요에 맞는 플랜을 선택하세요",
      basicPlan: "기본 플랜",
      proPlan: "프로 플랜",
      enterprisePlan: "기업 플랜",
      perMonth: "/월",
      scansPerMonth: "스캔/월",
      basicFeature1: "3D CT 생성",
      basicFeature2: "AI 진단",
      basicFeature3: "기본 보고서",
      proFeature1: "기본 플랜의 모든 기능",
      proFeature2: "고급 분석",
      proFeature3: "우선 지원",
      proFeature4: "API 액세스",
      enterpriseFeature1: "프로 플랜의 모든 기능",
      enterpriseFeature2: "무제한 스캔",
      enterpriseFeature3: "맞춤형 통합",
      enterpriseFeature4: "교육 세션",
      chooseButton: "플랜 선택",
      contactButton: "영업팀 문의",
      backToHome: "홈으로 돌아가기",
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
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">{t.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.basicPlan}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-blue-900">$99</span>
                  <span className="text-gray-600">{t.perMonth}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">50 {t.scansPerMonth}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.basicFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.basicFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.basicFeature3}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">{t.chooseButton}</Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-blue-600">
              <CardHeader>
                <CardTitle>{t.proPlan}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-blue-900">$299</span>
                  <span className="text-gray-600">{t.perMonth}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">200 {t.scansPerMonth}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.proFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.proFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.proFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.proFeature4}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">{t.chooseButton}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.enterprisePlan}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-blue-900">Custom</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{t.enterpriseFeature2}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.enterpriseFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.enterpriseFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.enterpriseFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.enterpriseFeature4}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  {t.contactButton}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
