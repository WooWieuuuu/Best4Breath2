import { type NextRequest, NextResponse } from "next/server"

// จำลองฐานข้อมูล
const cases: any[] = [
  {
    id: "123",
    patientName: "สมชาย ใจดี",
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
        position: [1.2, 0.8, 0.5],
        size: 1.8,
        confidence: 0.92,
        type: "มะเร็ง",
        location: "กลีบบนขวา",
      },
    ],
    ctImageUrl: "/generated-ct/123.nii",
    notes: "ผู้ป่วยมีอาการไอต่อเนื่องเป็นเวลา 3 เดือน",
  },
]

export async function GET() {
  return NextResponse.json({ cases })
}

export async function POST(request: NextRequest) {
  try {
    const caseData = await request.json()

    const newCase = {
      id: Date.now().toString(),
      ...caseData,
      date: new Date().toISOString().split("T")[0],
      status: "processing",
    }

    cases.unshift(newCase)

    return NextResponse.json({ success: true, case: newCase })
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 })
  }
}
