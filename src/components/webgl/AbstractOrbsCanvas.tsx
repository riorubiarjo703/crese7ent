'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { cn } from '@/utilities'

const RED = 0xeb001b
const ORANGE = 0xf79e1b

interface AbstractOrbsCanvasProps {
  className?: string
  animate?: boolean
  scrollProgress?: number
}

export type { AbstractOrbsCanvasProps }

function createDiscMaterial(color: number, opacity: number) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.15,
    metalness: 0.35,
    roughness: 0.4,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
}

function createRingMaterial(color: number) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.25,
    metalness: 0.7,
    roughness: 0.2,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
}

function buildScene() {
  const group = new THREE.Group()

  const redDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    createDiscMaterial(RED, 0.72),
  )
  redDisc.position.set(-0.42, 0.05, 0)

  const orangeDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    createDiscMaterial(ORANGE, 0.72),
  )
  orangeDisc.position.set(0.42, -0.05, -0.08)

  const overlapGlow = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 48),
    new THREE.MeshBasicMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }),
  )
  overlapGlow.position.set(0, 0, 0.05)

  const ringConfigs: Array<{
    radius: number
    tube: number
    position: [number, number, number]
    rotation: [number, number, number]
    color: number
  }> = [
    { radius: 1.85, tube: 0.025, position: [0, 0, -0.35], rotation: [1.1, 0.3, 0.5], color: RED },
    { radius: 2.1, tube: 0.018, position: [0.2, 0.15, -0.55], rotation: [0.6, 1.2, -0.4], color: ORANGE },
    { radius: 1.55, tube: 0.022, position: [-0.25, -0.2, -0.25], rotation: [-0.8, 0.5, 1.1], color: RED },
    { radius: 2.35, tube: 0.014, position: [0, -0.1, -0.75], rotation: [0.2, -0.6, 0.9], color: ORANGE },
    { radius: 0.95, tube: 0.03, position: [0.65, 0.45, 0.15], rotation: [1.4, 0.8, 0], color: RED },
    { radius: 0.85, tube: 0.028, position: [-0.7, -0.35, 0.1], rotation: [-0.5, 1.5, 0.3], color: ORANGE },
  ]

  ringConfigs.forEach((config) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(config.radius, config.tube, 16, 96),
      createRingMaterial(config.color),
    )
    ring.position.set(...config.position)
    ring.rotation.set(...config.rotation)
    group.add(ring)
  })

  group.add(redDisc, orangeDisc, overlapGlow)

  const arcGroup = new THREE.Group()
  for (let index = 0; index < 3; index += 1) {
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(1.6 + index * 0.35, 0.012, 8, 64, Math.PI * 1.15),
      createRingMaterial(index % 2 === 0 ? RED : ORANGE),
    )
    arc.rotation.set(0.4 + index * 0.35, index * 0.8, 0.2)
    arcGroup.add(arc)
  }
  group.add(arcGroup)

  return group
}

export function AbstractOrbsCanvas({
  className,
  animate = true,
  scrollProgress = 0,
}: AbstractOrbsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animateRef = useRef(animate)
  const scrollRef = useRef(scrollProgress)
  const pointerRef = useRef({ x: 0, y: 0 })

  animateRef.current = animate
  scrollRef.current = scrollProgress

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const root = node

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    root.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    const keyLight = new THREE.PointLight(0xff6b4a, 1.2, 20)
    keyLight.position.set(2, 3, 4)
    const fillLight = new THREE.PointLight(0xeb001b, 0.8, 16)
    fillLight.position.set(-3, -1, 2)
    scene.add(ambient, keyLight, fillLight)

    const orbs = buildScene()
    scene.add(orbs)

    function resize() {
      const width = root.clientWidth
      const height = root.clientHeight
      if (width === 0 || height === 0) return

      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)

    function onPointerMove(event: PointerEvent) {
      const rect = root.getBoundingClientRect()
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }

    root.addEventListener('pointermove', onPointerMove, { passive: true })

    const startTime = performance.now()
    let frameId = 0

    function renderFrame(now: number) {
      frameId = requestAnimationFrame(renderFrame)

      const elapsed = (now - startTime) / 1000
      const scroll = scrollRef.current
      const pointer = pointerRef.current
      const isAnimating = animateRef.current

      orbs.rotation.y = scroll * Math.PI * 1.4 + (isAnimating ? elapsed * 0.12 : 0)
      orbs.rotation.x = scroll * 0.35 + pointer.y * 0.08 + (isAnimating ? Math.sin(elapsed * 0.25) * 0.06 : 0)
      orbs.rotation.z = pointer.x * 0.05

      orbs.position.x = pointer.x * 0.25 - scroll * 0.4
      orbs.position.y = -pointer.y * 0.18 + scroll * 0.15
      orbs.scale.setScalar(0.85 + scroll * 0.25)

      camera.position.x = pointer.x * 0.35
      camera.position.y = -pointer.y * 0.2
      camera.position.z = 5.5 - scroll * 1.2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    frameId = requestAnimationFrame(renderFrame)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      root.removeEventListener('pointermove', onPointerMove)
      orbs.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      renderer.dispose()
      root.removeChild(renderer.domElement)
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
