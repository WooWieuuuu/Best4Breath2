"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LucideAlertCircle, LucideCheckCircle, LucideChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Mock data for recent cases
const recentCases = [
  {
    id: "123",
    patientName: { th: "สมชาย ใจดี", en: "John Smith", ko: "김철수" },
    patientId: "P78901",
    date: "2023-04-16",
    status: "review",
    findings: {
      th: "ตรวจพบก้อนที่น่าสงสัย",
      en: "Suspicious nodule detected",
      ko: "의심스러운 결절 발견",
    },
  },
  {
    id: "122",
    patientName: { th: "สมหญิง รักดี", en: "Jane Doe", ko: "이영희" },
    patientId: "P78902",
    date: "2023-04-15",
    status: "complete",
    findings: {
      th: "ไม่พบความผิดปกติที่สำคัญ",
      en: "No significant abnormalities detected",
      ko: "중요한 이상 없음",
    },
  },
  {
    id: "121",
    patientName: { th: "วิชัย สุขใจ", en: "Michael Johnson", ko: "박민수" },
    patientId: "P78903",
    date: "2023-04-14",
    status: "review",
    findings: {
      th: "ตรวจพบก้อนหลายก้อน",
      en: "Multiple nodules detected",
      ko: "여러 결절 발견",
    },
  },
  {
    id: "120",
    patientName: { th: "นภา ดวงดี", en: "Sarah Williams", ko: "최지은" },
    patientId: "P78904",
    date: "2023-04-13",
    status: "complete",
    findings: {
      th: "ไม่พบความผิดปกติที่สำคัญ",
      en: "No significant abnormalities detected",
      ko: "중요한 이상 없음",
    },
  },
  {
    id: "119",
    patientName: { th: "สมศักดิ์ มั่นคง", en: "David Brown", ko: "강민호" },
    patientId: "P78905",
    date: "2023-04-12",
    status: "complete",
    findings: {
      th: "พบก้อนเล็ก น่าจะเป็นก้อนเนื้อไม่อันตราย",
      en: "Small nodule detected, likely benign",
      ko: "작은 결절 발견, 양성으로 추정",
    },
  },
]

export default function RecentCasesList() {
  const { language, t } = useLanguage()

  return (
    <div className="divide-y divide-gray-200">
      {recentCases.map((caseItem) => (
        <Link
          key={caseItem.id}
          href={`/dashboard/case/${caseItem.id}`}
          className="block hover:bg-gray-50 transition-colors"
        >
          <div className="py-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate">{caseItem.patientName[language]}</p>
                <p className="text-xs text-gray-500">{caseItem.patientId}</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  {new Date(caseItem.date).toLocaleDateString(
                    language === "th" ? "th-TH" : language === "ko" ? "ko-KR" : "en-US",
                  )}
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    caseItem.status === "review"
                      ? "text-amber-500 border-amber-200 bg-amber-50"
                      : "text-green-500 border-green-200 bg-green-50"
                  }`}
                >
                  {caseItem.status === "review" ? (
                    <LucideAlertCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <LucideCheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {caseItem.status === "review" ? t.statusReview : t.statusComplete}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-gray-600 truncate">{caseItem.findings[language]}</p>
            </div>
            <div className="ml-4">
              <LucideChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
