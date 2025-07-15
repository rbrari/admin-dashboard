import type { ChartDataPoint, DashboardMetric, MonthlyData } from '@/types'
import { getDashboardConfig, getFilterOptions } from '../business/configProvider'
import { calculateDashboardMetrics } from '../business/metricsCalculator'
import { FilterRange } from '../data/constants'
import { generateMonthlyData } from '../data/generators'
import { filterDataByRange, isValidFilter } from '../data/utils'

export class DashboardMockService {
  private readonly monthlyData: MonthlyData[]

  constructor() {
    this.monthlyData = generateMonthlyData()
  }

  getMonthlyData(filter: string = FilterRange.Last12Months): MonthlyData[] {
    if (!isValidFilter(filter)) {
      throw new Error(`Invalid filter: ${filter}`)
    }

    const filteredData = filterDataByRange(this.monthlyData, filter)

    return [...filteredData].reverse()
  }

  getDashboardMetrics(filter: string = FilterRange.Last12Months): DashboardMetric[] {
    if (!isValidFilter(filter)) {
      throw new Error(`Invalid filter: ${filter}`)
    }

    const filteredData = filterDataByRange(this.monthlyData, filter)
    return calculateDashboardMetrics(filteredData, this.monthlyData)
  }

  getChartData(filter: string = FilterRange.Last12Months): ChartDataPoint[] {
    if (!isValidFilter(filter)) {
      throw new Error(`Invalid filter: ${filter}`)
    }

    const filteredData = filterDataByRange(this.monthlyData, filter)

    return filteredData.map((item) => ({
      month: `${item.month} ${item.year}`,
      value: item.uniqueUsers,
    }))
  }

  getConfig() {
    return getDashboardConfig()
  }

  getFilterOptions() {
    return getFilterOptions()
  }
}
