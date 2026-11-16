"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, MeshDistortMaterial } from "@react-three/drei";

export default function Viewer3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh>
        <Box args={[1.5, 1.5, 1.5]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={2}
        />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}
