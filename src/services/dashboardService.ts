import type { ChartDataPoint, MonthlyData, RecentActivity } from '@/types'

export async function fetchDashboardData(
  filter: string = 'Last 12 Months',
): Promise<MonthlyData[]> {
  const response = await fetch(`/api/dashboard/monthly-data?filter=${encodeURIComponent(filter)}`)
  const result = await response.json()
  return result.data
}

export async function fetchDashboardMetrics(filter: string = 'Last 12 Months') {
  const response = await fetch(`/api/dashboard/metrics?filter=${encodeURIComponent(filter)}`)
  const result = await response.json()
  return result.metrics
}

export async function fetchChartData(filter: string = 'Last 12 Months'): Promise<ChartDataPoint[]> {
  const response = await fetch(`/api/dashboard/chart-data?filter=${encodeURIComponent(filter)}`)
  const result = await response.json()
  return result.chartData
}

export async function fetchDashboardConfig() {
  const response = await fetch('/api/dashboard/config')
  const result = await response.json()
  return result
}

export async function fetchMonthOptions() {
  const response = await fetch('/api/dashboard/month-options')
  const result = await response.json()
  return result.options
}

export async function fetchLiveUsers(): Promise<{
  liveUsers: number
}> {
  const response = await fetch('/api/analytics/live-users')
  const result = await response.json()
  return result
}

export async function fetchDailyMetrics(): Promise<{
  dailyActiveUsers: number
  cardsCreated: number
}> {
  const response = await fetch('/api/analytics/daily-metrics')
  const result = await response.json()
  return result
}

export async function fetchLiveChartData(): Promise<{
  chartData: { time: string; value: number }[]
  recentActivities: RecentActivity[]
}> {
  const response = await fetch('/api/analytics/live-chart')
  const result = await response.json()
  return result
}
