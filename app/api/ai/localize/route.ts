import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { ctImageUrl, classification } = await request.json()

    if (!ctImageUrl || !classification) {
      return NextResponse.json({ error: "ต้องการ URL ของภาพ CT และผลการจำแนก" }, { status: 400 })
    }

    // ทำงานเฉพาะเมื่อเป็นมะเร็งหรือเนื้องอก
    if (classification !== "cancer" && classification !== "tumor") {
      return NextResponse.json({
        success: true,
        locations: [],
        message: "ไม่พบความผิดปกติที่ต้องระบุตำแหน่ง",
      })
    }

    // จำลองการประมวลผลโมเดล AI ระบุตำแหน่ง
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // จำลองตำแหน่งที่ตรวจพบ
    const locations = [
      {
        id: 1,
        position: [1.2, 0.8, 0.5],
        size: 1.8,
        confidence: 0.92,
        type: classification === "cancer" ? "มะเร็ง" : "เนื้องอก",
        location: "กลีบบนขวา",
        description: "ก้อนขนาด 1.8 ซม. ขอบไม่สม่ำเสมอ",
      },
    ]

    if (classification === "cancer") {
      locations.push({
        id: 2,
        position: [-0.8, 0.3, -0.2],
        size: 0.9,
        confidence: 0.67,
        type: "ก้อนรอง",
        location: "กลีบล่างซ้าย",
        description: "ก้อนขนาดเล็ก 0.9 ซม.",
      })
    }

    return NextResponse.json({
      success: true,
      locations,
      totalFound: locations.length,
      modelVersion: "LocalizeLung v2.5",
    })
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการระบุตำแหน่ง" }, { status: 500 })
  }
}
