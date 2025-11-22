"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LucideDownload, LucidePrinter, LucideShare2, LucideChevronLeft, LucideLoader2 } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import CTViewer from "@/components/ct-viewer"
import DiagnosisResults from "@/components/diagnosis-results"
import PatientInfoCard from "@/components/patient-info-card"
import { useLanguage } from "@/lib/language-context"

export default function CasePage({ params }: { params: { id: string } }) {
  const { t, language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("3d-view")
  const [caseData, setCaseData] = useState<any>(null)

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const response = await fetch(`/api/cases/${params.id}?lang=${language}`)
        const data = await response.json()
        setCaseData(data.case)
      } catch (error) {
        console.error("Error fetching case data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaseData()
  }, [params.id, language])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LucideLoader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">{t.loadingCase}</h2>
          <p className="text-gray-500 mt-2">{t.preparing3d}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-2">
                <LucideChevronLeft className="mr-2 h-4 w-4" />
                {t.backToDashboard}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {t.caseNumber} #{params.id}
              </h1>
              <Badge className="bg-amber-500">{t.pendingReview}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <LucideDownload className="mr-2 h-4 w-4" />
              {t.export}
            </Button>
            <Button variant="outline" size="sm">
              <LucidePrinter className="mr-2 h-4 w-4" />
              {t.print}
            </Button>
            <Button variant="outline" size="sm">
              <LucideShare2 className="mr-2 h-4 w-4" />
              {t.share}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>{t.ct3dTitle}</CardTitle>
                <CardDescription>{t.ct3dDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="3d-view" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="3d-view">{t.view3d}</TabsTrigger>
                    <TabsTrigger value="axial">{t.viewAxial}</TabsTrigger>
                    <TabsTrigger value="coronal">{t.viewCoronal}</TabsTrigger>
                    <TabsTrigger value="sagittal">{t.viewSagittal}</TabsTrigger>
                    <TabsTrigger value="original">{t.originalXray}</TabsTrigger>
                  </TabsList>

                  <div className="aspect-[4/3] w-full bg-black rounded-lg overflow-hidden">
                    <TabsContent value="3d-view" className="h-full">
                      <CTViewer viewMode="3d" locations={caseData?.locations} />
                    </TabsContent>
                    <TabsContent value="axial" className="h-full">
                      <CTViewer viewMode="axial" locations={caseData?.locations} />
                    </TabsContent>
                    <TabsContent value="coronal" className="h-full">
                      <CTViewer viewMode="coronal" locations={caseData?.locations} />
                    </TabsContent>
                    <TabsContent value="sagittal" className="h-full">
                      <CTViewer viewMode="sagittal" locations={caseData?.locations} />
                    </TabsContent>
                    <TabsContent value="original" className="h-full">
                      <div className="grid grid-cols-2 gap-4 h-full p-4">
                        <div className="bg-gray-900 rounded flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=400&width=400"
                            alt={t.frontalXray}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="bg-gray-900 rounded flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=400&width=400"
                            alt={t.lateralXray}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {activeTab === "3d-view" && t.controlHint3d}
                      {(activeTab === "axial" || activeTab === "coronal" || activeTab === "sagittal") &&
                        t.controlHintSlice}
                      {activeTab === "original" && t.controlHintOriginal}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        {t.resetView}
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.aiDiagnosisTitle}</CardTitle>
                <CardDescription>{t.aiDiagnosisDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <DiagnosisResults
                  classification={caseData?.classification}
                  confidence={caseData?.confidence}
                  locations={caseData?.locations}
                  modelVersions={caseData?.modelVersions}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <PatientInfoCard />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t.processingInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.processingDate}</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString(
                        language === "th" ? "th-TH" : language === "ko" ? "ko-KR" : "en-US",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.processingTime}</span>
                    <span className="font-medium">
                      2 {language === "th" ? "นาที" : language === "ko" ? "분" : "min"} 34{" "}
                      {language === "th" ? "วินาที" : language === "ko" ? "초" : "sec"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.modelVersion}</span>
                    <span className="font-medium">LungScan v2.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.confidenceScore}</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.status}</span>
                    <span className="font-medium text-amber-500">{t.pendingReview}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-2">{t.actions}</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      {t.requestSecondOpinion}
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      {t.markReviewed}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      {t.markFollowUp}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
