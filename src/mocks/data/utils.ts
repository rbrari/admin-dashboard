import type { MonthlyData } from '@/types'
import { FilterRange, LIVE_DATA_CONFIG, MONTHS } from './constants'

/**
 * Get short month name from full month name
 */
export function getShortMonth(fullMonth: string): string | undefined {
  return MONTHS.find((m) => m.full === fullMonth)?.short
}

/**
 * Get full month name from short month name
 */
export function getFullMonth(shortMonth: string): string | undefined {
  return MONTHS.find((m) => m.short === shortMonth)?.full
}

/**
 * Filter monthly data by specific month and year
 */
export function filterDataByMonthYear(
  data: MonthlyData[],
  monthName: string,
  year: number,
): MonthlyData[] {
  const shortMonth = getShortMonth(monthName)
  if (!shortMonth) return []
  return data.filter((item) => item.month === shortMonth && item.year === year)
}

/**
 * Filter data based on filter range
 */
export function filterDataByRange(data: MonthlyData[], filter: string): MonthlyData[] {
  switch (filter) {
    case FilterRange.Last6Months:
      return data.slice(-6)
    case FilterRange.Last3Months:
      return data.slice(-3)
    case FilterRange.Last12Months:
      return data
    default:
      if (filter.includes(' ')) {
        const parts = filter.split(' ')
        if (parts.length === 2) {
          const monthName = parts[0]
          const year = parseInt(parts[1])
          return filterDataByMonthYear(data, monthName, year)
        }
      }
      return data
  }
}

/**
 * Generate month range relative to current date
 */
export function generateMonthRange(
  monthsBack: number = 12,
): Array<{ month: string; year: number; monthIndex: number }> {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const months = []

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1)
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    months.push({
      month: MONTHS[monthIndex].short,
      year,
      monthIndex,
    })
  }

  return months
}

/**
 * Generate random value within range
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate realistic time series data points for live analytics
 * Uses sine wave with noise for natural-looking data progression
 */
export function generateTimeSeriesData(
  pointCount: number,
  baseValue: number,
  amplitude: number,
  noiseLevel: number,
): Array<{ time: string; value: number }> {
  const now = new Date()
  const data = []

  for (let i = pointCount - 1; i >= 0; i--) {
    const timeOffset = i * LIVE_DATA_CONFIG.CHART.TIME_INTERVAL_MS
    const time = new Date(now.getTime() - timeOffset)

    const timePhase = (pointCount - 1 - i) * 0.15
    const primaryWave = Math.sin(timePhase) * amplitude
    const secondaryWave = Math.sin(timePhase * 2.3) * (amplitude * 0.3)
    const noise = (Math.random() - 0.5) * noiseLevel
    const value = Math.max(5, Math.round(baseValue + primaryWave + secondaryWave + noise))

    data.push({
      time: time.toISOString(),
      value,
    })
  }

  return data
}

/**
 * Validate filter parameter
 */
export function isValidFilter(filter: string): boolean {
  if (Object.values(FilterRange).includes(filter as FilterRange)) {
    return true
  }
  if (filter.includes(' ')) {
    const parts = filter.split(' ')
    if (parts.length === 2) {
      const monthName = parts[0]
      const year = parseInt(parts[1])
      return MONTHS.some((m) => m.full === monthName) && !isNaN(year) && year > 1900 && year < 3000
    }
  }

  return false
}
