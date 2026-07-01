"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HeroScene — a living particle field. Cursor-reactive, depth-layered, drifting.
 * Not a video, not an image: an environment. (Design Bible §XII "the living hero")
 *
 * Perf contract (§IX): DPR capped, no antialias on the particle pass, additive
 * blending, dynamic-imported + ssr:false so it never blocks first paint or LCP.
 */

const COUNT = 2600;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  attribute float aScale;
  attribute vec3 aRandom;
  attribute float aSpeed;
  attribute float aDepth;
  varying float vDepth;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;

    // Autonomous organic drift
    float t = uTime * aSpeed;
    pos.x += sin(t + aRandom.x * 6.2831) * 0.28 * aRandom.y;
    pos.y += cos(t * 0.8 + aRandom.y * 6.2831) * 0.28 * aRandom.z;
    pos.z += sin(t * 0.6 + aRandom.z * 6.2831) * 0.18 * aRandom.x;

    // Cursor repulsion — nearer particles react more
    vec2 mouseWorld = uMouse * 10.0;
    float d = distance(pos.xy, mouseWorld);
    float repel = smoothstep(3.2, 0.0, d) * uMouseStrength;
    pos.xy += normalize(pos.xy - mouseWorld + 0.0001) * repel * 1.4;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float camDist = -mv.z;
    gl_PointSize = aScale * (4.2 / camDist) * (1.0 + repel * 2.2);
    gl_PointSize = clamp(gl_PointSize, 0.5, 7.0);

    vDepth = aDepth;
    vTwinkle = 0.6 + 0.4 * sin(uTime * 1.5 * aSpeed + aRandom.x * 10.0);
  }
`;

const fragment = /* glsl */ `
  varying float vDepth;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.06, dist) * 0.6 * vTwinkle;

    // Depth colour: near = violet, far = indigo/blue
    vec3 near = vec3(0.58, 0.36, 0.96);
    vec3 far  = vec3(0.36, 0.45, 0.96);
    vec3 color = mix(far, near, vDepth);

    gl_FragColor = vec4(color, alpha);
  }
`;

function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  const [positions, scales, randoms, speeds, depths] = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const depths = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.7) * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;

      scales[i] = 0.3 + Math.random() * 0.8;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
      speeds[i] = 0.12 + Math.random() * 0.28;
      depths[i] = Math.random();
    }
    return [positions, scales, randoms, speeds, depths];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: reduced ? 0 : 1 },
    }),
    [reduced]
  );

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.ShaderMaterial;
    if (!reduced) {
      mat.uniforms.uTime.value = clock.elapsedTime;
      targetMouse.current.lerp(pointer, 0.06);
      mat.uniforms.uMouse.value.copy(targetMouse.current);
      ref.current.rotation.y += delta * 0.014;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.06) * 0.04;
    } else {
      mat.uniforms.uTime.value = 4.0; // frozen, but composed
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 3]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aDepth" args={[depths, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 56, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      frameloop={reduced ? "demand" : "always"}
      style={{ background: "transparent" }}
    >
      <ParticleField reduced={reduced} />
    </Canvas>
  );
}
