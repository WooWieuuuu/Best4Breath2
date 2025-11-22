import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { ctImageUrl } = await request.json()

    if (!ctImageUrl) {
      return NextResponse.json({ error: "ต้องการ URL ของภาพ CT" }, { status: 400 })
    }

    // จำลองการประมวลผลโมเดล AI จำแนกประเภท
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // จำลองผลลัพธ์การจำแนก
    const classifications = [
      { type: "cancer", confidence: 0.78, label: "มะเร็ง" },
      { type: "tumor", confidence: 0.15, label: "เนื้องอกไม่อันตราย" },
      { type: "normal", confidence: 0.07, label: "ปกติ" },
    ]

    const primaryResult = classifications[0]

    return NextResponse.json({
      success: true,
      classification: primaryResult.type,
      confidence: primaryResult.confidence,
      label: primaryResult.label,
      allResults: classifications,
      modelVersion: "ClassifyLung v3.0",
    })
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการจำแนกประเภท" }, { status: 500 })
  }
}
