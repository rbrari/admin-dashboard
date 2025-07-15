import type { LiveChartDataPoint, MonthlyData, RecentActivity } from '@/types'
import { LIVE_DATA_CONFIG, MONTH_NAMES, SPREADSHEET_DATA } from './constants'
import { generateMonthRange, generateTimeSeriesData, randomInRange } from './utils'

export function generateMonthlyData(): MonthlyData[] {
  const monthRange = generateMonthRange(12)

  return monthRange.map(({ month, year, monthIndex }) => {
    const spreadsheetEntry = SPREADSHEET_DATA[monthIndex]

    return {
      month,
      year,
      ...spreadsheetEntry,
    }
  })
}

export function generateLiveChartData(): LiveChartDataPoint[] {
  return generateTimeSeriesData(
    LIVE_DATA_CONFIG.CHART.DATA_POINTS,
    LIVE_DATA_CONFIG.CHART.BASE_VALUE,
    LIVE_DATA_CONFIG.CHART.AMPLITUDE,
    LIVE_DATA_CONFIG.CHART.NOISE,
  )
}

export function generateRecentActivities(): RecentActivity[] {
  const baseActivities = [
    {
      user: 'john.doe@example.com',
      action: 'Page View',
      page: '/dashboard',
      status: 'success' as const,
    },
    {
      user: 'sarah.smith@example.com',
      action: 'Login',
      page: '/auth/login',
      status: 'success' as const,
    },
    {
      user: 'mike.johnson@example.com',
      action: 'Card Created',
      page: '/cards/new',
      status: 'success' as const,
    },
    {
      user: 'anna.wilson@example.com',
      action: 'Export Data',
      page: '/reports',
      status: 'error' as const,
    },
    {
      user: 'david.brown@example.com',
      action: 'Card Created',
      page: '/cards/new',
      status: 'success' as const,
    },
  ]

  return baseActivities.slice(0, LIVE_DATA_CONFIG.ACTIVITIES.COUNT).map((activity, index) => ({
    id: index + 1,
    time: new Date(
      Date.now() - (index + 1) * LIVE_DATA_CONFIG.ACTIVITIES.TIME_INTERVAL_MS,
    ).toISOString(),
    ...activity,
  }))
}

export function generateLiveUsers(): number {
  return randomInRange(LIVE_DATA_CONFIG.RANGES.liveUsers.min, LIVE_DATA_CONFIG.RANGES.liveUsers.max)
}

export function generateDailyActiveUsers(): number {
  return randomInRange(
    LIVE_DATA_CONFIG.RANGES.dailyActiveUsers.min,
    LIVE_DATA_CONFIG.RANGES.dailyActiveUsers.max,
  )
}

export function generateCardsCreated(): number {
  return randomInRange(
    LIVE_DATA_CONFIG.RANGES.cardsCreated.min,
    LIVE_DATA_CONFIG.RANGES.cardsCreated.max,
  )
}

export function generateMonthOptions(): Array<{ value: string; label: string }> {
  const monthRange = generateMonthRange(12)

  return monthRange.reverse().map(({ year, monthIndex }) => {
    const fullMonthName = MONTH_NAMES[monthIndex]
    const value = `${fullMonthName} ${year}`
    const label = `${fullMonthName} ${year}`

    return { value, label }
  })
}
