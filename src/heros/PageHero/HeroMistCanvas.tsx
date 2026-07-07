'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/utilities'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** 2D simplex noise + FBM — fully GPU, no blocky canvas texture */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
      -0.577350269189626,
      0.024390243902439
    );
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 2.4;
    float scroll = uScroll;

    vec2 flow = vec2(t * 0.32 + scroll * 0.14, t * 0.22 - scroll * 0.1);
    vec2 drift = vec2(sin(t * 0.41) * 0.35, cos(t * 0.33) * 0.28);
    vec2 p1 = uv * vec2(2.4, 1.8) + flow + drift;
    vec2 p2 = uv * vec2(1.6, 1.3) - flow * 0.65 + vec2(4.2, 1.8) - drift * 0.5;
    vec2 p3 = uv * vec2(3.1, 2.2) + vec2(-flow.y * 0.55, flow.x * 0.65) + drift * 0.35;

    float n1 = fbm(p1);
    float n2 = fbm(p2);
    float n3 = fbm(p3);
    float noise = n1 * 0.45 + n2 * 0.35 + n3 * 0.2;
    noise = noise * 0.5 + 0.5;

    float heightMask = smoothstep(1.08, 0.02, uv.y + scroll * 0.22);
    float centerLift = 1.0 - smoothstep(0.2, 0.95, uv.y) * 0.25;
    float mist = noise * heightMask * centerLift;

    float alpha = smoothstep(0.28, 0.82, mist);
    alpha *= smoothstep(1.0, 0.18, uv.y);
    alpha *= 0.93;

    gl_FragColor = vec4(vec3(0.99, 0.99, 1.0), alpha);
  }
`

export interface HeroMistCanvasProps {
  className?: string
  animate?: boolean
  scrollProgress?: number
}

function resizeRenderer(
  container: HTMLDivElement,
  renderer: import('three').WebGLRenderer,
  camera: import('three').OrthographicCamera,
) {
  const width = container.clientWidth
  const height = container.clientHeight
  if (width === 0 || height === 0) return

  renderer.setSize(width, height, false)

  const aspect = width / height
  const frustumHeight = 2
  camera.left = (-frustumHeight * aspect) / 2
  camera.right = (frustumHeight * aspect) / 2
  camera.top = frustumHeight / 2
  camera.bottom = -frustumHeight / 2
  camera.updateProjectionMatrix()
}

export function HeroMistCanvas({
  className,
  animate = true,
  scrollProgress = 0,
}: HeroMistCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animateRef = useRef(animate)
  const scrollRef = useRef(scrollProgress)

  animateRef.current = animate
  scrollRef.current = scrollProgress

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let frameId = 0
    let teardown: (() => void) | undefined

    void import('three').then((THREE) => {
      if (disposed || !containerRef.current) return

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1

      const uniforms = {
        uTime: { value: 0 },
        uScroll: { value: scrollRef.current },
      }

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      })

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
      scene.add(mesh)

      resizeRenderer(container, renderer, camera)

      const resizeObserver = new ResizeObserver(() => {
        resizeRenderer(container, renderer, camera)
      })
      resizeObserver.observe(container)

      const startTime = performance.now()

      function renderFrame(now: number) {
        frameId = requestAnimationFrame(renderFrame)

        const elapsed = (now - startTime) / 1000
        uniforms.uTime.value = animateRef.current ? elapsed : 0
        uniforms.uScroll.value = scrollRef.current

        renderer.render(scene, camera)
      }

      frameId = requestAnimationFrame(renderFrame)

      teardown = () => {
        cancelAnimationFrame(frameId)
        resizeObserver.disconnect()
        material.dispose()
        mesh.geometry.dispose()
        renderer.dispose()
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      teardown?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0', className)}
      aria-hidden="true"
    />
  )
}
