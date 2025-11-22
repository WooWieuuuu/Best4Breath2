"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideStethoscope, LucideArrowLeft, LucideTarget, LucideUsers, LucideAward } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function About() {
  const { language } = useLanguage()

  const content = {
    th: {
      title: "เกี่ยวกับเรา",
      subtitle: "ทีมงานที่ทุ่มเทเพื่อปฏิวัติการวินิจฉัยโรคปอด",
      missionTitle: "พันธกิจของเรา",
      missionText: "พัฒนาเทคโนโลยี AI ที่ช่วยให้แพทย์วินิจฉัยโรคปอดได้รวดเร็วและแม่นยำยิ่งขึ้น เพื่อช่วยชีวิตผู้ป่วยให้มากที่สุด",
      teamTitle: "ทีมของเรา",
      teamText: "ทีมผู้เชี่ยวชาญด้าน AI, แพทย์โรคปอด และวิศวกรซอฟต์แวร์ที่มีประสบการณ์มากกว่า 15 ปี",
      achievementsTitle: "ความสำเร็จ",
      achievementsText: "ได้รับการรับรองจากองค์กรด้านสุขภาพชั้นนำ และช่วยวินิจฉัยผู้ป่วยมากกว่า 10,000 ราย",
      backToHome: "กลับสู่หน้าหลัก",
    },
    en: {
      title: "About Us",
      subtitle: "A team dedicated to revolutionizing lung disease diagnosis",
      missionTitle: "Our Mission",
      missionText:
        "Develop AI technology that helps doctors diagnose lung diseases faster and more accurately to save as many patient lives as possible.",
      teamTitle: "Our Team",
      teamText: "A team of AI experts, pulmonologists, and software engineers with over 15 years of experience.",
      achievementsTitle: "Achievements",
      achievementsText: "Certified by leading health organizations and helped diagnose over 10,000 patients.",
      backToHome: "Back to Home",
    },
    ko: {
      title: "회사 소개",
      subtitle: "폐질환 진단 혁신에 전념하는 팀",
      missionTitle: "우리의 사명",
      missionText:
        "의사들이 폐질환을 더 빠르고 정확하게 진단할 수 있도록 돕는 AI 기술을 개발하여 가능한 한 많은 환자의 생명을 구하는 것입니다.",
      teamTitle: "우리 팀",
      teamText: "15년 이상의 경험을 가진 AI 전문가, 호흡기내과 전문의, 소프트웨어 엔지니어로 구성된 팀입니다.",
      achievementsTitle: "성과",
      achievementsText: "주요 보건 기관으로부터 인증을 받았으며 10,000명 이상의 환자 진단을 도왔습니다.",
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
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{t.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <LucideTarget className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.missionTitle}</h3>
                <p className="text-gray-600">{t.missionText}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <LucideUsers className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.teamTitle}</h3>
                <p className="text-gray-600">{t.teamText}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <LucideAward className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.achievementsTitle}</h3>
                <p className="text-gray-600">{t.achievementsText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
