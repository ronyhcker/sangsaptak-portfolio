import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import profileImg from '../../src/assets/profile.jpg';

interface HologramAvatarCanvasProps {
  className?: string;
}

function HologramAvatarMesh() {
  const meshGroup = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const auraRef = useRef<THREE.Mesh>(null!);

  const texture = useLoader(THREE.TextureLoader, profileImg);
  
  const circleGeometry = useMemo(() => new THREE.CircleGeometry(1.35, 64), []);
  const outerRingGeo = useMemo(() => new THREE.RingGeometry(1.45, 1.52, 64), []);
  const secondaryRingGeo = useMemo(() => new THREE.RingGeometry(1.62, 1.66, 64), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshGroup.current) {
      meshGroup.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      meshGroup.current.position.y = Math.sin(t * 1.2) * 0.08;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.4;
      ringRef1.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.6;
      ringRef2.current.rotation.y = Math.cos(t * 0.4) * 0.2;
    }
    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
    }
  });

  return (
    <group ref={meshGroup}>
      <mesh ref={ringRef1} geometry={outerRingGeo} position={[0, 0, -0.05]}>
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.75} />
      </mesh>

      <mesh ref={ringRef2} geometry={secondaryRingGeo} position={[0, 0, -0.08]}>
        <meshBasicMaterial color="#0066ff" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>

      <mesh geometry={circleGeometry}>
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={auraRef} geometry={circleGeometry} position={[0, 0, -0.02]}>
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.25} />
      </mesh>

      <pointLight position={[0, 0, 1.2]} intensity={2.5} color="#00e1ff" distance={4} />
      <pointLight position={[0, 0, -1.5]} intensity={3} color="#0055ff" distance={5} />
    </group>
  );
}

export function HologramAvatarCanvas({ className = "w-full h-full min-h-[320px]" }: HologramAvatarCanvasProps) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', minHeight: '320px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <HologramAvatarMesh />
        </Float>

        <Sparkles 
          count={60} 
          scale={4} 
          size={3} 
          speed={0.4} 
          opacity={0.8} 
          color="#00f0ff" 
        />
        <Sparkles 
          count={40} 
          scale={5} 
          size={4} 
          speed={0.6} 
          opacity={0.6} 
          color="#0066ff" 
        />
      </Canvas>
    </div>
  );
}

export default HologramAvatarCanvas;
