import { type NextRequest, NextResponse } from "next/server"

const getCaseData = (id: string, language = "th") => {
  const locationData = {
    th: {
      type: "มะเร็ง",
      location: "กลีบบนขวา",
      description: "ก้อนขนาด 1.8 ซม. ขอบไม่สม่ำเสมอ",
    },
    en: {
      type: "Cancer",
      location: "Right Upper Lobe",
      description: "1.8 cm nodule with irregular margins",
    },
    ko: {
      type: "암",
      location: "우상엽",
      description: "불규칙한 가장자리를 가진 1.8cm 결절",
    },
  }

  const loc = locationData[language as keyof typeof locationData] || locationData.th

  return {
    id,
    patientName: language === "th" ? "สมชาย ใจดี" : language === "ko" ? "김철수" : "John Smith",
    patientId: "P78901",
    age: 67,
    gender: "male",
    date: "2024-01-15",
    status: "completed",
    classification: "cancer",
    confidence: 0.78,
    locations: [
      {
        id: 1,
        position: [1.2, 0.8, 0.5] as [number, number, number],
        size: 1.8,
        confidence: 0.92,
        type: loc.type,
        location: loc.location,
        description: loc.description,
      },
    ],
    ctImageUrl: "/generated-ct/123.nii",
    notes:
      language === "th"
        ? "ผู้ป่วยมีอาการไอต่อเนื่องเป็นเวลา 3 เดือน บางครั้งมีเลือดปนในเสมหะ"
        : language === "ko"
          ? "환자는 3개월 동안 지속적인 기침, 가끔 객혈이 있습니다"
          : "Patient has persistent cough for 3 months, occasional hemoptysis",
    processingTime: "2m 34s",
    modelVersions: {
      ctGen: "CTGen v2.1",
      classify: "ClassifyLung v3.0",
      localize: "LocalizeLung v2.5",
    },
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("lang") || "th"

  const caseData = getCaseData(params.id, language)

  if (!caseData) {
    const errorMsg =
      language === "th" ? "ไม่พบข้อมูลเคส" : language === "ko" ? "케이스 데이터를 찾을 수 없습니다" : "Case not found"
    return NextResponse.json({ error: errorMsg }, { status: 404 })
  }

  return NextResponse.json({ case: caseData })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("lang") || "th"

    const caseData = getCaseData(params.id, language)

    if (caseData) {
      const updatedCase = { ...caseData, ...updates }
      return NextResponse.json({ success: true, case: updatedCase })
    }

    const errorMsg =
      language === "th" ? "ไม่พบข้อมูลเคส" : language === "ko" ? "케이스 데이터를 찾을 수 없습니다" : "Case not found"
    return NextResponse.json({ error: errorMsg }, { status: 404 })
  } catch (error) {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("lang") || "th"
    const errorMsg =
      language === "th"
        ? "เกิดข้อผิดพลาดในการอัปเดตข้อมูล"
        : language === "ko"
          ? "데이터 업데이트 중 오류 발생"
          : "Error updating data"
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
