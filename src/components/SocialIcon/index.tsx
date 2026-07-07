import React from 'react'
import { createLucideIcon, type LucideProps } from 'lucide-react'

import { SocialIconType } from './config'

const Github = createLucideIcon('Github', [
  ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-.88 0-1.85.25-2.75 0 0-.8-.25-2.75 1a9.6 9.6 0 0 0-5 0C6.8 6.55 6 6.8 6 6.8c.25.9.25 1.87.25 2.75-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.5 18 8.5 18v4', key: 'mark' }],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: 'tail' }],
])

const Youtube = createLucideIcon('Youtube', [
  ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17', key: 'frame' }],
  ['path', { d: 'm10 15 5-3-5-3z', key: 'play' }],
])

const Facebook = createLucideIcon('Facebook', [
  ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: 'facebook' }],
])

const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'frame' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'lens' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'flash' }],
])

const Linkedin = createLucideIcon('Linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z', key: 'body' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9', key: 'stem' }],
  ['circle', { cx: '4', cy: '4', r: '2', key: 'dot' }],
])

const XIcon = createLucideIcon('X', [
  ['path', { d: 'M18 6 6 18', key: 'a' }],
  ['path', { d: 'm6 6 12 12', key: 'b' }],
])

const Discord = createLucideIcon('Discord', [
  [
    'path',
    {
      d: 'M9.5 12.5c.8 0 1.5-.7 1.5-1.5S10.3 9.5 9.5 9.5 8 10.2 8 11s.7 1.5 1.5 1.5Zm5 0c.8 0 1.5-.7 1.5-1.5S15.3 9.5 14.5 9.5 13 10.2 13 11s.7 1.5 1.5 1.5Z',
      key: 'eyes',
    },
  ],
  [
    'path',
    {
      d: 'M7.5 7.5C9.2 6.7 10.6 6.3 12 6.3s2.8.4 4.5 1.2c1.4.7 2.5 1.8 3.2 3.2.5 1 .8 2.1.8 3.2v2.1c0 .6-.5 1.1-1.1 1.1h-1.2c-.4 0-.8-.2-1-.5-.6-.8-1.4-1.4-2.4-1.8-1.2-.5-2.5-.8-3.8-.8s-2.6.3-3.8.8c-1 .4-1.8 1-2.4 1.8-.2.3-.6.5-1 .5H4.1c-.6 0-1.1-.5-1.1-1.1v-2.1c0-1.1.3-2.2.8-3.2.7-1.4 1.8-2.5 3.2-3.2Z',
      key: 'mask',
    },
  ],
])

const Reddit = createLucideIcon('Reddit', [
  ['circle', { cx: '12', cy: '12', r: '10', key: 'ring' }],
  ['circle', { cx: '9', cy: '13', r: '1', key: 'eye-l' }],
  ['circle', { cx: '15', cy: '13', r: '1', key: 'eye-r' }],
  ['path', { d: 'M8.5 17c1.2 1 2.7 1.5 4.5 1.5s3.3-.5 4.5-1.5', key: 'smile' }],
])

const Telegram = createLucideIcon('Telegram', [
  ['path', { d: 'm22 2-7 20-4-9-9-4Z', key: 'plane' }],
  ['path', { d: 'M22 2 11 13', key: 'tail' }],
])

const TikTok = createLucideIcon('TikTok', [
  ['path', { d: 'M9 6v10a3 3 0 1 0 3-3', key: 'note' }],
  ['path', { d: 'M15 8.5V6h3a4 4 0 0 0 4 4', key: 'hook' }],
])

const Apple = createLucideIcon('Apple', [
  ['path', { d: 'M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 5.5-2.5 5.5-6.2 0-4.2-3.4-7.1-6.8-7.1-1.2 0-2.3.4-3.2 1.1-.6.5-1.1 1.1-1.6 1.1s-1-.6-1.6-1.1A4.9 4.9 0 0 0 7.3 8.7C3.9 8.7.5 11.6.5 15.8.5 19.5 3 22 6 22c1.25 0 2.5-1.06 4-1.06Z', key: 'fruit' }],
  ['path', { d: 'M12 7.5c1.7 0 3-1.3 3.2-3.1C14 3.4 12.8 2 11 2S8 3.4 7.8 4.4C8 6.2 9.3 7.5 12 7.5Z', key: 'leaf' }],
])

const Android = createLucideIcon('Android', [
  ['path', { d: 'M8 14h8', key: 'mouth' }],
  ['path', { d: 'M7 10h.01', key: 'eye-l' }],
  ['path', { d: 'M17 10h.01', key: 'eye-r' }],
  ['path', { d: 'M6 18h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1l1.5-3', key: 'head' }],
  ['path', { d: 'M7 7 5.5 4', key: 'ant-l' }],
  ['path', { d: 'M17 7 18.5 4', key: 'ant-r' }],
])

const GooglePlay = createLucideIcon('GooglePlay', [
  ['path', { d: 'm6 4 12 8-12 8Z', key: 'play' }],
  ['path', { d: 'M6 4v16', key: 'edge' }],
])

const iconMap: Record<SocialIconType, React.FC<LucideProps>> = {
  facebook: Facebook,
  twitter: XIcon,
  instagram: Instagram,
  linkedin: Linkedin,
  discord: Discord,
  reddit: Reddit,
  telegram: Telegram,
  github: Github,
  youtube: Youtube,
  tiktok: TikTok,
  apple: Apple,
  android: Android,
  googleplay: GooglePlay,
}

export interface SocialIconProps {
  type: SocialIconType
  className?: string
}

/** Monochrome Lucide-style social icons — use `text-black` on light surfaces. */
export const SocialIcon: React.FC<SocialIconProps> = ({ type, className = 'size-6' }) => {
  const IconComponent = iconMap[type]
  if (!IconComponent) return null

  return <IconComponent className={className} strokeWidth={1.75} aria-hidden />
}
