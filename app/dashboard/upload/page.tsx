"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideUpload, LucideX, LucideImage, LucideLoader2, LucideCheck, LucideAlertCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { useLanguage } from "@/lib/language-context"

export default function UploadPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([])
  const [patientInfo, setPatientInfo] = useState({
    patientId: "",
    patientName: "",
    age: "",
    gender: "male",
    notes: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setFilePreviewUrls([...filePreviewUrls, ...newPreviewUrls])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles([...files, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setFilePreviewUrls([...filePreviewUrls, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    const newPreviewUrls = [...filePreviewUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index])

    newFiles.splice(index, 1)
    newPreviewUrls.splice(index, 1)

    setFiles(newFiles)
    setFilePreviewUrls(newPreviewUrls)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPatientInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      alert(t.uploadError)
      return
    }

    setUploadStatus("uploading")

    try {
      // ขั้นตอนที่ 1: อัปโหลดไฟล์และสร้างภาพ CT
      const formData = new FormData()
      formData.append("frontal", files[0])
      if (files[1]) formData.append("lateral", files[1])

      const ctResponse = await fetch("/api/ai/generate-ct", {
        method: "POST",
        body: formData,
      })
      const ctResult = await ctResponse.json()

      if (!ctResult.success) {
        throw new Error(ctResult.error)
      }

      setUploadStatus("success")
      setIsProcessing(true)

      // ขั้นตอนที่ 2: จำแนกประเภท
      const classifyResponse = await fetch("/api/ai/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ctImageUrl: ctResult.ctImageUrl }),
      })
      const classifyResult = await classifyResponse.json()

      // ขั้นตอนที่ 3: ระบุตำแหน่ง (ถ้าจำเป็น)
      let localizationResult = null
      if (classifyResult.classification === "cancer" || classifyResult.classification === "tumor") {
        const localizeResponse = await fetch("/api/ai/localize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ctImageUrl: ctResult.ctImageUrl,
            classification: classifyResult.classification,
          }),
        })
        localizationResult = await localizeResponse.json()
      }

      // ขั้นตอนที่ 4: บันทึกข้อมูลเคส
      const caseData = {
        ...patientInfo,
        classification: classifyResult.classification,
        confidence: classifyResult.confidence,
        locations: localizationResult?.locations || [],
        ctImageUrl: ctResult.ctImageUrl,
        processingTime: ctResult.processingTime,
        modelVersions: {
          ctGen: ctResult.modelVersion,
          classify: classifyResult.modelVersion,
          localize: localizationResult?.modelVersion,
        },
      }

      const saveResponse = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      })
      const saveResult = await saveResponse.json()

      setIsProcessing(false)
      router.push(`/dashboard/case/${saveResult.case.id}`)
    } catch (error) {
      console.error("Error processing:", error)
      setUploadStatus("error")
      setIsProcessing(false)
      alert(t.processingError)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">{t.uploadPageTitle}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.uploadXrayTitle}</CardTitle>
                <CardDescription>{t.uploadXrayDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upload">{t.uploadFile}</TabsTrigger>
                    <TabsTrigger value="dicom">{t.importDicom}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        files.length > 0 ? "border-gray-300" : "border-blue-300 bg-blue-50"
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                        multiple
                      />

                      {files.length === 0 ? (
                        <div className="flex flex-col items-center cursor-pointer">
                          <LucideUpload className="h-12 w-12 text-blue-500 mb-4" />
                          <h3 className="text-lg font-medium mb-2">{t.dragDrop}</h3>
                          <p className="text-gray-500 mb-4">{t.clickSelect}</p>
                          <p className="text-sm text-gray-400">{t.supportedFormats}</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {filePreviewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                                <img
                                  src={url || "/placeholder.svg"}
                                  alt={`X-ray ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFile(index)
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <LucideX className="h-4 w-4" />
                              </button>
                              <p className="mt-1 text-sm truncate">{files[index].name}</p>
                            </div>
                          ))}
                          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
                            <div className="text-center">
                              <LucideImage className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">{t.addMore}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4 text-sm text-gray-500 flex items-center">
                        <LucideAlertCircle className="h-4 w-4 mr-2 text-blue-500" />
                        <p>{t.uploadNote}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="dicom">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <LucideUpload className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">{t.importDicomTitle}</h3>
                        <p className="text-gray-500 mb-4">{t.importDicomDesc}</p>
                        <Button variant="outline" className="mb-4 bg-transparent">
                          {t.connectPacs}
                        </Button>
                        <p className="text-sm text-gray-400">{t.pacsNote}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t.patientInfo}</CardTitle>
                <CardDescription>{t.patientInfoDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientId">{t.patientId}</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      value={patientInfo.patientId}
                      onChange={handleInputChange}
                      placeholder={t.patientIdPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientName">{t.patientName}</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={patientInfo.patientName}
                      onChange={handleInputChange}
                      placeholder={t.patientNamePlaceholder}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">{t.age}</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={patientInfo.age}
                        onChange={handleInputChange}
                        placeholder={t.agePlaceholder}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">{t.gender}</Label>
                      <select
                        id="gender"
                        name="gender"
                        value={patientInfo.gender}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="male">{t.male}</option>
                        <option value="female">{t.female}</option>
                        <option value="other">{t.other}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{t.clinicalNotes}</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={patientInfo.notes}
                      onChange={handleInputChange}
                      placeholder={t.clinicalNotesPlaceholder}
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={files.length === 0 || uploadStatus === "uploading" || isProcessing}
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.uploading}
                    </>
                  ) : isProcessing ? (
                    <>
                      <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.processing}
                    </>
                  ) : uploadStatus === "success" ? (
                    <>
                      <LucideCheck className="mr-2 h-4 w-4" />
                      {t.uploaded}
                    </>
                  ) : (
                    t.processXray
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
