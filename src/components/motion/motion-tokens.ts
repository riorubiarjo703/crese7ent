export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },
  stagger: 0.1,
  viewport: { once: true, margin: '-10%' as const },
} as const
