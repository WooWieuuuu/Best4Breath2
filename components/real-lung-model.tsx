"use client"

import { useGLTF } from "@react-three/drei"
import { Html } from "@react-three/drei"

// คอมโพเนนต์สำหรับโหลดไฟล์ GLB จริง
export function RealLungModel() {
  const { scene } = useGLTF("/models/lung_model.glb")
  try {
    return <primitive object={scene} scale={1} position={[0, 0, 0]} />
  } catch (error) {
    console.error("Error loading real lung model:", error)
    return (
      <Html center>
        <div className="text-red-400 text-center">
          <p>ไม่สามารถโหลดโมเดล 3D ได้</p>
          <p className="text-xs">กรุณาตรวจสอบไฟล์ในโฟลเดอร์ public/models/</p>
        </div>
      </Html>
    )
  }
}

// Preload the model
useGLTF.preload("/models/lung_model.glb")
