import type { ComponentType } from 'react'

export type TestimonialLoader = () => Promise<{ default: ComponentType<any> }>

export const testimonialLoaders = {
  TESTIMONIAL1: () => import('@/blocks/Testimonial/testimonial1'),
  TESTIMONIAL2: () => import('@/blocks/Testimonial/testimonial2'),
  TESTIMONIAL3: () => import('@/blocks/Testimonial/testimonial3'),
  TESTIMONIAL4: () => import('@/blocks/Testimonial/testimonial4'),
  TESTIMONIAL6: () => import('@/blocks/Testimonial/testimonial6'),
  TESTIMONIAL7: () => import('@/blocks/Testimonial/testimonial7'),
  TESTIMONIAL8: () => import('@/blocks/Testimonial/testimonial8'),
  TESTIMONIAL9: () => import('@/blocks/Testimonial/testimonial9'),
  TESTIMONIAL10: () => import('@/blocks/Testimonial/testimonial10'),
  TESTIMONIAL11: () => import('@/blocks/Testimonial/testimonial11'),
  TESTIMONIAL12: () => import('@/blocks/Testimonial/testimonial12'),
  TESTIMONIAL13: () => import('@/blocks/Testimonial/testimonial13'),
  TESTIMONIAL14: () => import('@/blocks/Testimonial/testimonial14'),
  TESTIMONIAL15: () => import('@/blocks/Testimonial/testimonial15'),
  TESTIMONIAL16: () => import('@/blocks/Testimonial/testimonial16'),
  TESTIMONIAL17: () => import('@/blocks/Testimonial/testimonial17'),
  TESTIMONIAL18: () => import('@/blocks/Testimonial/testimonial18'),
  TESTIMONIAL19: () => import('@/blocks/Testimonial/testimonial19'),
} as const
