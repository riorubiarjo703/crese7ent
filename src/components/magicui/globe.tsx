'use client'

import createGlobe, { type COBEOptions } from 'cobe'
import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cn } from '@/utilities/index'

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0.9,
  theta: 0.25,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.12, 0.12, 0.14],
  glowColor: [1, 1, 1],
  markerElevation: 0,
  markers: [],
}

interface GlobeProps {
  className?: string
  config?: COBEOptions
  autoRotate?: boolean
  getMarkers?: () => COBEOptions['markers']
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  autoRotate = true,
  getMarkers,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(config.phi ?? 0.9)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  function updatePointerInteraction(value: number | null) {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
    }
  }

  function updateMovement(clientX: number) {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    function onResize() {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: phiRef.current,
      markers: getMarkers?.() ?? config.markers,
    })

    let frame = 0

    function tick() {
      if (autoRotate && pointerInteracting.current === null) {
        phiRef.current += 0.003
      }

      globe.update({
        phi: phiRef.current + rs.get(),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        markers: getMarkers?.() ?? config.markers,
      })

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    const canvas = canvasRef.current
    const showTimer = window.setTimeout(() => {
      canvas.style.opacity = '1'
    }, 0)

    return () => {
      window.clearTimeout(showTimer)
      window.cancelAnimationFrame(frame)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [autoRotate, config, getMarkers, rs])

  return (
    <div
      className={cn('absolute inset-0 mx-auto aspect-square w-full max-w-[600px]', className)}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(event) => {
          pointerInteracting.current = event.clientX
          updatePointerInteraction(event.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => event.touches[0] && updateMovement(event.touches[0].clientX)}
      />
    </div>
  )
}
