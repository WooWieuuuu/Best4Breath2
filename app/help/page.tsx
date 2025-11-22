"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LucideArrowLeft, LucideSearch, LucideMessageCircle, LucideBook, LucideVideo } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/lib/language-context"

export default function HelpPage() {
  const { language } = useLanguage()

  const content = {
    th: {
      title: "ศูนย์ช่วยเหลือ",
      searchPlaceholder: "ค้นหาคำถาม...",
      faqTitle: "คำถามที่พบบ่อย",
      supportTitle: "ติดต่อฝ่ายสนับสนุน",
      supportDesc: "ต้องการความช่วยเหลือเพิ่มเติม?",
      contactSupport: "ติดต่อฝ่ายสนับสนุน",
      documentationTitle: "เอกสารประกอบ",
      documentationDesc: "คู่มือการใช้งานและเอกสารทางเทคนิค",
      viewDocs: "ดูเอกสาร",
      videoTitle: "วิดีโอสอนใช้งาน",
      videoDesc: "เรียนรู้วิธีใช้งานผ่านวิดีโอ",
      watchVideos: "ดูวิดีโอ",
    },
    en: {
      title: "Help Center",
      searchPlaceholder: "Search for questions...",
      faqTitle: "Frequently Asked Questions",
      supportTitle: "Contact Support",
      supportDesc: "Need additional help?",
      contactSupport: "Contact Support",
      documentationTitle: "Documentation",
      documentationDesc: "User guides and technical documentation",
      viewDocs: "View Documentation",
      videoTitle: "Tutorial Videos",
      videoDesc: "Learn how to use through videos",
      watchVideos: "Watch Videos",
    },
    ko: {
      title: "도움말 센터",
      searchPlaceholder: "질문 검색...",
      faqTitle: "자주 묻는 질문",
      supportTitle: "지원팀 문의",
      supportDesc: "추가 도움이 필요하신가요?",
      contactSupport: "지원팀 문의",
      documentationTitle: "문서",
      documentationDesc: "사용자 가이드 및 기술 문서",
      viewDocs: "문서 보기",
      videoTitle: "튜토리얼 비디오",
      videoDesc: "비디오를 통해 사용 방법 배우기",
      watchVideos: "비디오 보기",
    },
  }

  const t = content[language]

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
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>

        <div className="mb-8">
          <div className="relative">
            <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder={t.searchPlaceholder} className="pl-10 py-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <LucideMessageCircle className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">{t.supportTitle}</CardTitle>
              <CardDescription>{t.supportDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                {t.contactSupport}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <LucideBook className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">{t.documentationTitle}</CardTitle>
              <CardDescription>{t.documentationDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                {t.viewDocs}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <LucideVideo className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">{t.videoTitle}</CardTitle>
              <CardDescription>{t.videoDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                {t.watchVideos}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.faqTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {language === "th"
                    ? "ฉันจะอัปโหลดภาพเอกซเรย์ได้อย่างไร?"
                    : language === "ko"
                      ? "X-레이 이미지를 어떻게 업로드하나요?"
                      : "How do I upload an X-ray image?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === "th"
                    ? "ไปที่หน้า 'อัปโหลดเอกซเรย์' จากเมนูหลัก กรอกข้อมูลผู้ป่วย และลากไฟล์ภาพเอกซเรย์มาวางในพื้นที่ที่กำหนด"
                    : language === "ko"
                      ? "'X-레이 업로드' 페이지로 이동하여 환자 정보를 입력하고 지정된 영역에 X-레이 이미지 파일을 드래그 앤 드롭하세요"
                      : "Go to the 'Upload X-ray' page from the main menu, fill in patient information, and drag and drop the X-ray image file into the designated area"}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {language === "th"
                    ? "ระบบ AI ทำงานอย่างไร?"
                    : language === "ko"
                      ? "AI 시스템은 어떻게 작동하나요?"
                      : "How does the AI system work?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === "th"
                    ? "ระบบใช้โมเดล AI 3 ตัว: 1) แปลง X-ray เป็น CT scan 2) จำแนกประเภทมะเร็ง 3) ระบุตำแหน่งก้อนเนื้อ"
                    : language === "ko"
                      ? "시스템은 3가지 AI 모델을 사용합니다: 1) X-ray를 CT 스캔으로 변환 2) 암 유형 분류 3) 종양 위치 파악"
                      : "The system uses 3 AI models: 1) Convert X-ray to CT scan 2) Classify cancer type 3) Localize tumor location"}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  {language === "th"
                    ? "ข้อมูลผู้ป่วยปลอดภัยหรือไม่?"
                    : language === "ko"
                      ? "환자 데이터는 안전한가요?"
                      : "Is patient data secure?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === "th"
                    ? "ใช่ เราใช้การเข้ารหัส end-to-end และปฏิบัติตามมาตรฐานความปลอดภัยทางการแพทย์ทั้งหมด"
                    : language === "ko"
                      ? "네, 엔드 투 엔드 암호화를 사용하며 모든 의료 보안 표준을 준수합니다"
                      : "Yes, we use end-to-end encryption and comply with all medical security standards"}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  {language === "th"
                    ? "ฉันจะดูประวัติการตรวจได้อย่างไร?"
                    : language === "ko"
                      ? "검사 기록을 어떻게 볼 수 있나요?"
                      : "How can I view examination history?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === "th"
                    ? "คลิกที่เมนู 'ประวัติการตรวจ' คุณจะเห็นรายการเคสทั้งหมดพร้อมรายละเอียด"
                    : language === "ko"
                      ? "'기록' 메뉴를 클릭하면 모든 케이스 목록과 세부 정보를 볼 수 있습니다"
                      : "Click on the 'History' menu to see a list of all cases with details"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
