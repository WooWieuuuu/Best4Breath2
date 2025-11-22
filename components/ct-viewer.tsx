"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Grid, Center, Text } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { LucideZoomIn, LucideZoomOut, LucideRotateCcw } from "lucide-react"

// Mock component for 3D lung model with proper error handling
function LungModel() {
  // ใช้ geometry พื้นฐานแทนการโหลดไฟล์ GLB
  return (
    <group>
      {/* จำลองปอดซ้าย */}
      <mesh position={[-1.2, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#666" transparent opacity={0.8} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* จำลองปอดขวา */}
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#666" transparent opacity={0.8} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* เพิ่มรายละเอียดเส้นโครงสร้าง */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      {/* กิ่งก้านปอด */}
      <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <mesh position={[-0.6, -0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <mesh position={[0.6, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </group>
  )
}

// Loading fallback component
function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>กำลังโหลดโมเดล 3D...</p>
      </div>
    </Html>
  )
}

// Mock component for slice views (axial, coronal, sagittal)
function SliceView({ sliceType }: { sliceType: string }) {
  return (
    <group>
      <Center>
        <Text color="white" fontSize={0.5} position={[0, 3, 0]} anchorX="center">
          {sliceType === "axial" && "มุมมองแนวขวาง"}
          {sliceType === "coronal" && "มุมมองแนวหน้าหลัง"}
          {sliceType === "sagittal" && "มุมมองแนวซ้ายขวา"}
        </Text>

        {/* Placeholder for CT slice */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#111" />
        </mesh>

        {/* Placeholder CT image */}
        <mesh position={[0, 0, 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial transparent opacity={0.9}>
            <canvasTexture attach="map" image={createMockCTImage(sliceType)} />
          </meshBasicMaterial>
        </mesh>

        <Grid
          position={[0, 0, 0]}
          args={[10, 10]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#444"
          sectionSize={3}
          sectionThickness={1}
          sectionColor="#888"
          fadeDistance={30}
        />
      </Center>
    </group>
  )
}

// Helper function to create a mock CT image
function createMockCTImage(sliceType: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")

  if (ctx) {
    // Fill with black background
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw a simple lung-like shape
    ctx.fillStyle = "#333"
    ctx.beginPath()

    if (sliceType === "axial") {
      // Draw circular shapes for axial view
      ctx.ellipse(200, 256, 100, 150, 0, 0, Math.PI * 2)
      ctx.ellipse(312, 256, 100, 150, 0, 0, Math.PI * 2)
    } else if (sliceType === "coronal") {
      // Draw shapes for coronal view
      ctx.ellipse(256, 200, 200, 80, 0, 0, Math.PI * 2)
      ctx.ellipse(256, 320, 150, 60, 0, 0, Math.PI * 2)
    } else {
      // Draw shapes for sagittal view
      ctx.ellipse(256, 220, 120, 150, 0, 0, Math.PI * 2)
    }

    ctx.fill()

    // Add some "nodules" or features
    ctx.fillStyle = "#555"
    ctx.beginPath()
    ctx.arc(220, 240, 15, 0, Math.PI * 2)
    ctx.fill()

    // Add grid lines
    ctx.strokeStyle = "#222"
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Add some text
    ctx.fillStyle = "#aaa"
    ctx.font = "14px monospace"
    ctx.fillText(`${sliceType.toUpperCase()} - ข้อมูลจำลอง`, 20, 30)
    ctx.fillText("ผู้ป่วย: #123456", 20, 50)
    ctx.fillText(`ชั้น: 24/48`, 20, 70)
  }

  return canvas
}

// Controls overlay for the viewer
function ViewerControls() {
  return (
    <Html position={[0, -4, 0]} center>
      <div className="bg-black/70 text-white p-3 rounded-lg flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <LucideZoomOut className="h-4 w-4" />
        </Button>

        <Slider defaultValue={[50]} max={100} step={1} className="w-32" />

        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <LucideZoomIn className="h-4 w-4" />
        </Button>

        <div className="h-8 w-px bg-white/20 mx-2"></div>

        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <LucideRotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </Html>
  )
}

// Nodule marker for the 3D view - ลบข้อความออก
function NoduleMarker({
  position = [1, 0.5, 0.5],
  size = 0.15,
  type = "nodule",
  confidence = 0.8,
  description = "ก้อนที่น่าสงสัย",
}: { position?: [number, number, number]; size?: number; type?: string; confidence?: number; description?: string }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color="red" transparent opacity={0.6} />
      </mesh>
      {/* ลบ Html component ที่แสดงข้อความออก */}
    </group>
  )
}

interface CTViewerProps {
  viewMode: "3d" | "axial" | "coronal" | "sagittal"
  locations?: Array<{
    id: number
    position: [number, number, number]
    size: number
    confidence: number
    type: string
    location: string
    description: string
  }>
}

export default function CTViewer({ viewMode, locations }: CTViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#000000"]} />

        <Suspense fallback={<LoadingFallback />}>
          {viewMode === "3d" ? (
            <>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <LungModel />
              {locations?.map((location) => (
                <NoduleMarker
                  key={location.id}
                  position={location.position}
                  size={location.size}
                  type={location.type}
                  confidence={location.confidence}
                  description={location.description}
                />
              ))}
              <Environment preset="studio" />
              <ViewerControls />
            </>
          ) : (
            <SliceView sliceType={viewMode} />
          )}
          {/* เปิดใช้งาน rotation สำหรับทุก viewMode */}
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={10} minDistance={2} />
        </Suspense>
      </Canvas>
    </div>
  )
}
