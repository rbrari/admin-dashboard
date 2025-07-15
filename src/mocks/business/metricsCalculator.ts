import type { ChartDataPoint, DashboardMetric, MonthlyData } from '@/types'
import { MONTHS } from '../data/constants'

function getMonthNumber(shortMonth: string): number {
  const monthIndex = MONTHS.findIndex((m) => m.short === shortMonth)
  return monthIndex >= 0 ? monthIndex + 1 : 1
}

export function calculateChange(
  current: number,
  previous: number | undefined | null,
): number | null {
  if (previous === undefined || previous === null) return null
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export function calculateDashboardMetrics(
  filteredData: MonthlyData[],
  allData: MonthlyData[],
): DashboardMetric[] {
  if (!filteredData.length) {
    return getEmptyMetrics()
  }

  const isMultiMonthPeriod = filteredData.length > 1

  if (isMultiMonthPeriod) {
    return calculateAggregatedMetrics(filteredData)
  } else {
    return calculateSingleMonthMetrics(filteredData, allData)
  }
}

function calculateSingleMonthMetrics(
  filteredData: MonthlyData[],
  allData: MonthlyData[],
): DashboardMetric[] {
  const currentPeriod = filteredData[filteredData.length - 1]

  const currentDate = new Date(currentPeriod.year, getMonthNumber(currentPeriod.month) - 1)
  const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  const previousMonthName = MONTHS[previousDate.getMonth()].short
  const previousYear = previousDate.getFullYear()

  const previousPeriod =
    allData.find((item) => item.month === previousMonthName && item.year === previousYear) || null

  const usersChange = calculateChange(currentPeriod.uniqueUsers, previousPeriod?.uniqueUsers)
  const trialsChange = calculateChange(currentPeriod.trialSignups, previousPeriod?.trialSignups)
  const trialConversionChange = calculateChange(
    currentPeriod.trialSignupConversion,
    previousPeriod?.trialSignupConversion,
  )
  const paidChange = calculateChange(
    currentPeriod.paidSubscriptions,
    previousPeriod?.paidSubscriptions,
  )
  const paidConversionChange = calculateChange(
    currentPeriod.paidSubscriptionConversion,
    previousPeriod?.paidSubscriptionConversion,
  )
  const newMrrChange = calculateChange(currentPeriod.newMrr, previousPeriod?.newMrr)
  const totalMrrChange = calculateChange(
    currentPeriod.currentTotalMrr,
    previousPeriod?.currentTotalMrr,
  )
  const totalArrChange = calculateChange(
    currentPeriod.currentTotalArr,
    previousPeriod?.currentTotalArr,
  )

  return [
    {
      label: 'Unique Users',
      value: currentPeriod.uniqueUsers,
      change: usersChange,
      icon: 'users',
      trend: usersChange !== null && usersChange >= 0 ? ('up' as const) : ('down' as const),
      chartData: createChartData(filteredData, 'uniqueUsers'),
    },
    {
      label: 'Trial Signups',
      value: currentPeriod.trialSignups,
      change: trialsChange,
      icon: 'user-plus',
      trend: trialsChange !== null && trialsChange >= 0 ? ('up' as const) : ('down' as const),
      chartData: createChartData(filteredData, 'trialSignups'),
    },
    {
      label: 'Trial Conversion',
      value: currentPeriod.trialSignupConversion,
      change: trialConversionChange,
      icon: 'trending-up',
      trend:
        trialConversionChange !== null && trialConversionChange >= 0
          ? ('up' as const)
          : ('down' as const),
      benchmark: { target: 9.0, unit: '%' },
      format: 'percentage',
      chartData: createChartData(filteredData, 'trialSignupConversion'),
    },
    {
      label: 'Paid Subscriptions',
      value: currentPeriod.paidSubscriptions,
      change: paidChange,
      icon: 'credit-card',
      trend: paidChange !== null && paidChange >= 0 ? ('up' as const) : ('down' as const),
      chartData: createChartData(filteredData, 'paidSubscriptions'),
    },
    {
      label: 'Paid Conversion',
      value: currentPeriod.paidSubscriptionConversion,
      change: paidConversionChange,
      icon: 'target',
      trend:
        paidConversionChange !== null && paidConversionChange >= 0
          ? ('up' as const)
          : ('down' as const),
      benchmark: { target: 20.0, unit: '%' },
      format: 'percentage',
      chartData: createChartData(filteredData, 'paidSubscriptionConversion'),
    },
    {
      label: 'New MRR',
      value: currentPeriod.newMrr,
      change: newMrrChange,
      icon: 'dollar-sign',
      trend: newMrrChange !== null && newMrrChange >= 0 ? ('up' as const) : ('down' as const),
      format: 'currency',
      chartData: createChartData(filteredData, 'newMrr'),
    },
    {
      label: 'Total MRR',
      value: currentPeriod.currentTotalMrr,
      change: totalMrrChange,
      icon: 'trending-up',
      trend: totalMrrChange !== null && totalMrrChange >= 0 ? ('up' as const) : ('down' as const),
      format: 'currency',
      chartData: createChartData(filteredData, 'currentTotalMrr'),
    },
    {
      label: 'Total ARR',
      value: currentPeriod.currentTotalArr,
      change: totalArrChange,
      icon: 'bar-chart',
      trend: totalArrChange !== null && totalArrChange >= 0 ? ('up' as const) : ('down' as const),
      format: 'currency',
      chartData: createChartData(filteredData, 'currentTotalArr'),
    },
  ]
}

function calculateAggregatedMetrics(filteredData: MonthlyData[]): DashboardMetric[] {
  const totalUniqueUsers = filteredData.reduce((sum, month) => sum + month.uniqueUsers, 0)
  const totalTrialSignups = filteredData.reduce((sum, month) => sum + month.trialSignups, 0)
  const totalPaidSubscriptions = filteredData.reduce(
    (sum, month) => sum + month.paidSubscriptions,
    0,
  )

  const avgTrialConversion = totalUniqueUsers > 0 ? (totalTrialSignups / totalUniqueUsers) * 100 : 0
  const avgPaidConversion =
    totalTrialSignups > 0 ? (totalPaidSubscriptions / totalTrialSignups) * 100 : 0

  return [
    {
      label: 'Unique Users',
      value: totalUniqueUsers,
      change: null,
      icon: 'users',
      trend: 'up' as const,
      chartData: createChartData(filteredData, 'uniqueUsers'),
    },
    {
      label: 'Trial Signups',
      value: totalTrialSignups,
      change: null,
      icon: 'user-plus',
      trend: 'up' as const,
      chartData: createChartData(filteredData, 'trialSignups'),
    },
    {
      label: 'Trial Conversion',
      value: avgTrialConversion,
      change: null,
      icon: 'trending-up',
      trend: 'up' as const,
      benchmark: { target: 9.0, unit: '%' },
      format: 'percentage',
      chartData: createChartData(filteredData, 'trialSignupConversion'),
    },
    {
      label: 'Paid Subscriptions',
      value: totalPaidSubscriptions,
      change: null,
      icon: 'credit-card',
      trend: 'up' as const,
      chartData: createChartData(filteredData, 'paidSubscriptions'),
    },
    {
      label: 'Paid Conversion',
      value: avgPaidConversion,
      change: null,
      icon: 'target',
      trend: 'up' as const,
      benchmark: { target: 20.0, unit: '%' },
      format: 'percentage',
      chartData: createChartData(filteredData, 'paidSubscriptionConversion'),
    },
    {
      label: 'New MRR',
      value: null,
      change: null,
      icon: 'dollar-sign',
      trend: 'up' as const,
      format: 'currency',
      chartData: createChartData(filteredData, 'newMrr'),
    },
    {
      label: 'Total MRR',
      value: null,
      change: null,
      icon: 'trending-up',
      trend: 'up' as const,
      format: 'currency',
      chartData: createChartData(filteredData, 'currentTotalMrr'),
    },
    {
      label: 'Total ARR',
      value: null,
      change: null,
      icon: 'bar-chart',
      trend: 'up' as const,
      format: 'currency',
      chartData: createChartData(filteredData, 'currentTotalArr'),
    },
  ]
}

function createChartData(
  data: MonthlyData[],
  metric: keyof Omit<MonthlyData, 'month' | 'year'>,
): ChartDataPoint[] {
  return data.map((item) => ({
    month: `${item.month} ${item.year}`,
    value: item[metric],
  }))
}

function getEmptyMetrics(): DashboardMetric[] {
  return [
    {
      label: 'Unique Users',
      value: 0,
      change: 0,
      icon: 'users',
      trend: 'up' as const,
      chartData: [],
    },
    {
      label: 'Trial Signups',
      value: 0,
      change: 0,
      icon: 'user-plus',
      trend: 'up' as const,
      chartData: [],
    },
    {
      label: 'Trial Conversion',
      value: 0,
      change: 0,
      icon: 'trending-up',
      trend: 'up' as const,
      benchmark: { target: 9.0, unit: '%' },
      format: 'percentage',
      chartData: [],
    },
    {
      label: 'Paid Subscriptions',
      value: 0,
      change: 0,
      icon: 'credit-card',
      trend: 'up' as const,
      chartData: [],
    },
    {
      label: 'Paid Conversion',
      value: 0,
      change: 0,
      icon: 'target',
      trend: 'up' as const,
      benchmark: { target: 20.0, unit: '%' },
      format: 'percentage',
      chartData: [],
    },
    {
      label: 'New MRR',
      value: 0,
      change: 0,
      icon: 'dollar-sign',
      trend: 'up' as const,
      format: 'currency',
      chartData: [],
    },
    {
      label: 'Total MRR',
      value: 0,
      change: 0,
      icon: 'trending-up',
      trend: 'up' as const,
      format: 'currency',
      chartData: [],
    },
    {
      label: 'Total ARR',
      value: 0,
      change: 0,
      icon: 'bar-chart',
      trend: 'up' as const,
      format: 'currency',
      chartData: [],
    },
  ]
}
