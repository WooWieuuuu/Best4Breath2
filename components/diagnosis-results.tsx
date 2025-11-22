"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideAlertCircle, LucideInfo } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface DiagnosisResultsProps {
  classification?: string
  confidence?: number
  locations?: Array<{
    id: number
    position: [number, number, number]
    size: number
    confidence: number
    type: string
    location: string
    description: string
  }>
  modelVersions?: {
    ctGen: string
    classify: string
    localize?: string
  }
}

export default function DiagnosisResults({
  classification = "cancer",
  confidence = 0.78,
  locations = [],
  modelVersions,
}: DiagnosisResultsProps) {
  const { t, language } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)

  const getClassificationText = () => {
    if (classification === "cancer") return t.cancerDetected
    if (classification === "tumor") return t.tumorDetected
    return t.normalResult
  }

  const getClassificationBadge = () => {
    if (classification === "cancer") return language === "th" ? "มะเร็ง" : language === "ko" ? "암" : "Cancer"
    if (classification === "tumor") return language === "th" ? "เนื้องอก" : language === "ko" ? "종양" : "Tumor"
    return language === "th" ? "ปกติ" : language === "ko" ? "정상" : "Normal"
  }

  return (
    <div>
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <LucideAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">{t.aiAnalysisTitle}</h3>
          <p className="text-sm text-amber-700 mt-1">{t.aiAnalysisWarning}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">{t.mainFindings}</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    classification === "cancer"
                      ? "bg-red-500"
                      : classification === "tumor"
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }
                >
                  {getClassificationBadge()}
                </Badge>
                <h4 className="font-medium">{getClassificationText()}</h4>
              </div>
              <Badge variant="outline" className="text-gray-500">
                {t.confidenceLabel} {Math.round(confidence * 100)}%
              </Badge>
            </div>

            {locations.map((location) => (
              <div key={location.id} className="mt-3 p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">
                  {location.type} - {location.location}
                </p>
                <p className="text-sm text-gray-600">{location.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{t.confidenceLabel}:</span>
                  <span className="font-medium">{Math.round(location.confidence * 100)}%</span>
                </div>
                <Progress
                  value={location.confidence * 100}
                  className="h-2 bg-gray-100 mt-1"
                  indicatorClassName={classification === "cancer" ? "bg-red-500" : "bg-amber-500"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="details">
          <AccordionTrigger>{t.additionalFindings}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">
                      {language === "th" ? "ปกติ" : language === "ko" ? "정상" : "Normal"}
                    </Badge>
                    <h4 className="font-medium">{t.lymphNodes}</h4>
                  </div>
                  <Badge variant="outline" className="text-gray-500">
                    {t.confidenceLabel} 96%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{t.lymphNodesNormal}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">
                      {language === "th" ? "ปกติ" : language === "ko" ? "정상" : "Normal"}
                    </Badge>
                    <h4 className="font-medium">{t.lungParenchyma}</h4>
                  </div>
                  <Badge variant="outline" className="text-gray-500">
                    {t.confidenceLabel} 94%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{t.lungParenchymaNormal}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">{t.recommendations}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <LucideInfo className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{t.biopsyRecommendation}</span> {t.biopsyDetails}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <LucideInfo className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{t.petCtRecommendation}</span> {t.petCtDetails}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <LucideInfo className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{t.consultationRecommendation}</span> {t.consultationDetails}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">{t.technicalDetails}</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? t.hideDetails : t.showDetails}
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">{t.aiModel}</span> LungScan v2.3
            </p>
            <p>
              <span className="font-medium">{t.processingTimeLabel}</span> 2{" "}
              {language === "th" ? "นาที" : language === "ko" ? "분" : "min"} 34{" "}
              {language === "th" ? "วินาที" : language === "ko" ? "초" : "sec"}
            </p>
            <p>
              <span className="font-medium">{t.imageResolution}</span> 512x512px
            </p>
            <p>
              <span className="font-medium">{t.sliceThickness}</span> 1.5 {t.mm}
            </p>
            <p>
              <span className="font-medium">{t.algorithm}</span> {t.algorithmDetails}
            </p>
            <p>
              <span className="font-medium">{t.trainingDataset}</span> {t.trainingDatasetDetails}
            </p>
            <p>
              <span className="font-medium">{t.validationAccuracy}</span> {t.validationAccuracyDetails}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
