"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideUser, LucideCalendar, LucideClipboard } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function PatientInfoCard() {
  const { t, language } = useLanguage()

  const patientData = {
    name: language === "th" ? "สมชาย ใจดี" : language === "ko" ? "김철수" : "John Smith",
    id: "P78901",
    age: 67,
    gender: language === "th" ? "ชาย" : language === "ko" ? "남성" : "Male",
    height: 175,
    weight: 78,
    referringDoctor: language === "th" ? "นพ. สมบัติ รักษาดี" : language === "ko" ? "박진우 박사" : "Dr. Michael Chen",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.patientInfoTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <LucideUser className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">{patientData.name}</h3>
              <p className="text-sm text-gray-500">
                {t.patientIdLabel} {patientData.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">{t.ageLabel}</p>
              <p className="font-medium">
                {patientData.age} {t.years}
              </p>
            </div>
            <div>
              <p className="text-gray-500">{t.genderLabel}</p>
              <p className="font-medium">{patientData.gender}</p>
            </div>
            <div>
              <p className="text-gray-500">{t.heightLabel}</p>
              <p className="font-medium">
                {patientData.height} {t.cm}
              </p>
            </div>
            <div>
              <p className="text-gray-500">{t.weightLabel}</p>
              <p className="font-medium">
                {patientData.weight} {t.kg}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <LucideCalendar className="h-4 w-4 text-gray-500" />
              {t.scanInfoTitle}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t.scanDate}</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString(language === "th" ? "th-TH" : language === "ko" ? "ko-KR" : "en-US")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t.scanType}</span>
                <span className="font-medium">{t.scanTypeValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t.referringDoctor}</span>
                <span className="font-medium">{patientData.referringDoctor}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <LucideClipboard className="h-4 w-4 text-gray-500" />
              {t.clinicalHistoryTitle}
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">{t.clinicalHistoryText}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-gray-100">
                  {t.symptomCough}
                </Badge>
                <Badge variant="outline" className="bg-gray-100">
                  {t.symptomHemoptysis}
                </Badge>
                <Badge variant="outline" className="bg-gray-100">
                  {t.symptomWeightLoss}
                </Badge>
                <Badge variant="outline" className="bg-gray-100">
                  {t.symptomSmoker}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
