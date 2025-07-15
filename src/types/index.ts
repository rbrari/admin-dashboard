export interface MonthlyData {
  month: string
  year: number
  uniqueUsers: number
  trialSignups: number
  trialSignupConversion: number
  paidSubscriptions: number
  paidSubscriptionConversion: number
  newMrr: number
  currentTotalMrr: number
  currentTotalArr: number
}

export interface ChartDataPoint {
  month: string
  value: number
}

export interface DashboardMetric {
  label: string
  value: number | null
  change: number | null
  icon: string
  trend: 'up' | 'down'
  benchmark?: {
    target: number
    unit: string
  }
  format?: 'currency' | 'percentage' | 'number'
  chartData?: ChartDataPoint[]
}

export interface LiveChartDataPoint {
  time: string
  value: number
}

export interface RecentActivity {
  id: number
  time: string
  user: string
  action: string
  page: string
  status: 'success' | 'error' | 'warning'
}

export interface DashboardConfig {
  currency: {
    code: string
    symbol: string
    locale: string
  }
  filters: {
    defaultRange: string
    availableRanges: string[]
    maxMonthsBack: number
  }
  benchmarks: Record<string, { target: number; unit: string }>
  success: boolean
}
