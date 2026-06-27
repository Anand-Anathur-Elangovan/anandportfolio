'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/lib/hooks/useMousePosition';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/* -------------------------------------------------------
   ParticleSphere
   A sphere of ~1200 dots distributed evenly via Fibonacci
   golden-angle algorithm. Rotates slowly; mouse causes a
   gentle camera tilt (parallax).
------------------------------------------------------- */
function ParticleSphere() {
  const meshRef = useRef<THREE.Points>(null!);
  const { normalizedX, normalizedY } = useMousePosition();
  const prefersReduced = useReducedMotion();
  const { camera } = useThree();

  const SPHERE_COUNT = 1200;
  const SPHERE_RADIUS = 2.8;
  const AMBIENT_COUNT = 280;

  // Build sphere positions using Fibonacci / golden-angle distribution
  const positions = useMemo(() => {
    const pos = new Float32Array((SPHERE_COUNT + AMBIENT_COUNT) * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));

    // Sphere surface particles
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const y = 1 - (i / (SPHERE_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pos[i * 3]     = Math.cos(theta) * radius * SPHERE_RADIUS;
      pos[i * 3 + 1] = y * SPHERE_RADIUS;
      pos[i * 3 + 2] = Math.sin(theta) * radius * SPHERE_RADIUS;
    }

    // Ambient floating particles (wider field)
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const idx = SPHERE_COUNT + i;
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[idx * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[idx * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Per-particle sizes — sphere particles slightly larger
  const sizes = useMemo(() => {
    const s = new Float32Array(SPHERE_COUNT + AMBIENT_COUNT);
    for (let i = 0; i < SPHERE_COUNT; i++) s[i] = 0.025 + Math.random() * 0.02;
    for (let i = 0; i < AMBIENT_COUNT; i++) s[SPHERE_COUNT + i] = 0.015 + Math.random() * 0.025;
    return s;
  }, []);

  // Per-particle opacities
  const opacities = useMemo(() => {
    const o = new Float32Array(SPHERE_COUNT + AMBIENT_COUNT);
    for (let i = 0; i < SPHERE_COUNT; i++) o[i] = 0.35 + Math.random() * 0.5;
    for (let i = 0; i < AMBIENT_COUNT; i++) o[SPHERE_COUNT + i] = 0.08 + Math.random() * 0.18;
    return o;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
    g.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    return g;
  }, [positions, sizes, opacities]);

  // Simple point material — white dots
  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#94A3B8'),
    size: 0.035,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  }), []);

  useFrame((_, delta) => {
    if (prefersReduced) return;

    // Slow auto-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
      meshRef.current.rotation.x += delta * 0.012;
    }

    // Gentle camera parallax from mouse
    camera.position.x += (normalizedX * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (normalizedY * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return <points ref={meshRef} geometry={geo} material={mat} />;
}

/* -------------------------------------------------------
   Inner glow orb — a soft, dim sphere in the centre
------------------------------------------------------- */
function CentreGlow() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshBasicMaterial
        color={new THREE.Color('#BFDBFE')}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------
   Export
------------------------------------------------------- */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 50 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      aria-hidden="true"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.1} />
      <ParticleSphere />
      <CentreGlow />
    </Canvas>
  );
}
