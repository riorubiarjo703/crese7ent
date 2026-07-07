/** [latitude, longitude] — shared by globe markers and country orbit labels */
export const EUROPE_COUNTRY_COORDS: Record<string, [number, number]> = {
  ES: [40.4168, -3.7038],
  PT: [38.7223, -9.1393],
  FR: [48.8566, 2.3522],
  GB: [51.5074, -0.1278],
  IE: [53.3498, -6.2603],
  DE: [50.1109, 8.6821],
  IT: [41.9028, 12.4964],
  NL: [52.3676, 4.9041],
  BE: [50.8503, 4.3517],
  CH: [46.948, 7.4474],
  AT: [48.2082, 16.3738],
  PL: [52.2297, 21.0122],
  SE: [59.3293, 18.0686],
  NO: [59.9139, 10.7522],
  DK: [55.6761, 12.5683],
  FI: [60.1699, 24.9384],
}

/** Map ISO code to an orbit angle (degrees) aligned with the globe projection */
export function getCountryOrbitAngle(code: string, fallbackIndex = 0, total = 1): number {
  const coords = EUROPE_COUNTRY_COORDS[code.toUpperCase()]
  if (!coords) return (fallbackIndex / total) * 360

  const [lat, lon] = coords
  const europeCenterLat = 50
  const europeCenterLon = 8
  const radians = Math.atan2(lon - europeCenterLon, europeCenterLat - lat)
  return (radians * 180) / Math.PI + 90
}

/** Shorter rim labels to reduce overlap on the globe arc */
export const COUNTRY_LABEL_SHORT_NAMES: Record<string, string> = {
  GB: 'UK',
  DE: 'Germany',
  CH: 'Switzerland',
  NL: 'Netherlands',
  PT: 'Portugal',
  PL: 'Poland',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  AT: 'Austria',
  IE: 'Ireland',
}

export function getCountryLabelName(code: string, name: string): string {
  const upper = code.toUpperCase()
  return COUNTRY_LABEL_SHORT_NAMES[upper] ?? name
}

/**
 * Spread country labels along the visible upper arc with minimum angular gap
 * so dense Western European markets do not stack on top of each other.
 */
export function spreadCountryLabelAngles(
  countries: Array<{ code?: string | null }>,
  options?: { arcStart?: number; arcEnd?: number; minGap?: number },
): Map<string, number> {
  const arcStart = options?.arcStart ?? 218
  const arcEnd = options?.arcEnd ?? 342
  const minGap = options?.minGap ?? 14

  const items = countries
    .map((country, index) => {
      const code = country.code?.toUpperCase() ?? ''
      if (!code) return null
      return {
        code,
        raw: getCountryOrbitAngle(code, index, countries.length),
      }
    })
    .filter((item): item is { code: string; raw: number } => item !== null)
    .filter(({ raw }) => raw >= arcStart - 20 && raw <= arcEnd + 20)
    .sort((a, b) => a.raw - b.raw)

  if (!items.length) return new Map()

  const arcSpan = arcEnd - arcStart
  const minRequired = (items.length - 1) * minGap

  if (minRequired >= arcSpan) {
    const step = items.length > 1 ? arcSpan / (items.length - 1) : 0
    return new Map(items.map((item, index) => [item.code, arcStart + index * step]))
  }

  const positions: number[] = []
  positions[0] = Math.max(arcStart, Math.min(arcEnd, items[0].raw))

  for (let i = 1; i < items.length; i++) {
    const geo = items[i].raw
    const minPos = positions[i - 1] + minGap
    positions.push(Math.min(arcEnd, Math.max(geo, minPos)))
  }

  if (positions[positions.length - 1] > arcEnd) {
    const start = positions[0]
    const end = positions[positions.length - 1]
    const range = end - start || 1
    for (let i = 0; i < positions.length; i++) {
      positions[i] = arcStart + ((positions[i] - start) / range) * arcSpan
    }
  }

  return new Map(items.map((item, index) => [item.code, positions[index]]))
}
