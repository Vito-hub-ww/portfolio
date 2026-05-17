import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '@/data/projects';

const CURVE_STRENGTH = 0.3;
const CURVE_FREQUENCY = 1.0;
const CARD_COUNT = projects.length;
const GAP = 4;
const CAMERA_Z = 5;

// Vertex shader for curved cards
const vertexShader = `
  uniform float uCurveStrength;
  uniform float uCurveFrequency;
  uniform float uScrollSpeed;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Apply curve based on world position
    float worldX = (modelMatrix * vec4(position, 1.0)).x;
    float worldZ = (modelMatrix * vec4(position, 1.0)).z;

    // Curve displacement
    float curve = sin(worldZ * uCurveFrequency) * uCurveStrength;
    pos.x += curve;

    // Slight vertical wave from scroll
    pos.y += sin(worldX * 2.0 + uScrollSpeed * 0.5) * 0.02;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader for textured cards
const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = texColor;
  }
`;

interface CardMeshProps {
  index: number;
  imageUrl: string;
  scrollProgressRef: React.MutableRefObject<number>;
  activeIndexRef: React.MutableRefObject<number>;
}

function CardMesh({ index, imageUrl, scrollProgressRef, activeIndexRef }: CardMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uCurveStrength: { value: CURVE_STRENGTH },
      uCurveFrequency: { value: CURVE_FREQUENCY },
      uScrollSpeed: { value: 0 },
    }),
    [texture]
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const totalLength = CARD_COUNT * GAP;
    const baseZ = -index * GAP;
    const scrolledZ = baseZ + scrollProgressRef.current * totalLength;

    // Wrap around
    const wrappedZ = ((scrolledZ % totalLength) + totalLength) % totalLength - totalLength / 2;

    meshRef.current.position.z = wrappedZ;

    // Check if this card is closest to center (camera at z=CAMERA_Z)
    const distToCenter = Math.abs(CAMERA_Z - wrappedZ);
    if (distToCenter < GAP / 2) {
      activeIndexRef.current = index;
    }

    // Scale up the center card
    const isCenter = distToCenter < 1.5;
    const targetScale = isCenter ? 1.3 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -index * GAP]}>
      <planeGeometry args={[1.8, 3.2, 16, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smooth mouse follow
    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.05;

    camera.position.x = smoothMouse.current.x * 0.5;
    camera.position.y = smoothMouse.current.y * 0.3;
    camera.lookAt(0, 0, 0);
  });

  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}

interface CardScrollGalleryProps {
  onActiveChange: (index: number) => void;
}

export function CardScrollGallery({ onActiveChange }: CardScrollGalleryProps) {
  const scrollProgressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const prevActiveRef = useRef(0);

  useFrame(() => {
    // Notify parent when active card changes
    if (activeIndexRef.current !== prevActiveRef.current) {
      prevActiveRef.current = activeIndexRef.current;
      onActiveChange(activeIndexRef.current);
    }
  });

  // Handle wheel for scroll progress
  useMemo(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollProgressRef.current += e.deltaY * 0.0005;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrollProgressRef.current));
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <CameraController />
      <ambientLight intensity={1} />
      {projects.map((project, index) => (
        <CardMesh
          key={project.id}
          index={index}
          imageUrl={project.image}
          scrollProgressRef={scrollProgressRef}
          activeIndexRef={activeIndexRef}
        />
      ))}
    </>
  );
}

// Wrapper component for the Canvas
export function CardScrollGalleryWrapper({
  onActiveChange,
}: {
  onActiveChange: (index: number) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: 50 }}
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <CardScrollGallery onActiveChange={onActiveChange} />
    </Canvas>
  );
}
