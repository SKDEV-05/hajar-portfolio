'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MathUtils } from 'three';
import { useTheme } from 'next-themes';
import { AdaptiveDpr } from '@react-three/drei';
function Form() {
  const mesh = useRef<Mesh>(null);
  const { resolvedTheme } = useTheme();
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = MathUtils.damp(
      mesh.current.rotation.y,
      state.pointer.x * 0.35 + state.clock.elapsedTime * 0.1,
      3,
      delta,
    );
    mesh.current.rotation.x = MathUtils.damp(
      mesh.current.rotation.x,
      0.4 + state.pointer.y * 0.2,
      3,
      delta,
    );
  });
  return (
    <mesh ref={mesh} rotation={[0.4, 0, -0.35]}>
      <torusKnotGeometry args={[1.45, 0.3, 160, 24, 2, 3]} />
      <meshStandardMaterial
        color={resolvedTheme === 'light' ? '#398e88' : '#70d2c5'}
        metalness={0.72}
        roughness={0.2}
      />
    </mesh>
  );
}
export default function Scene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 8.4], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={5} />
      <pointLight position={[-4, -2, 2]} color="#adfff0" intensity={18} />
      <Form />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
