import type { DashboardConfig } from '@/types'
import { FilterRange } from '../data/constants'
import { generateMonthOptions } from '../data/generators'

/**
 * Get dashboard configuration
 */
export function getDashboardConfig(): DashboardConfig {
  return {
    currency: {
      code: 'GBP',
      symbol: '£',
      locale: 'en-GB',
    },
    filters: {
      defaultRange: FilterRange.Last12Months,
      availableRanges: [FilterRange.Last12Months, FilterRange.Last6Months, FilterRange.Last3Months],
      maxMonthsBack: 12,
    },
    benchmarks: {
      trialConversion: { target: 9.0, unit: '%' },
      paidConversion: { target: 20.0, unit: '%' },
    },
    success: true,
  }
}

/**
 * Get filter options including standard ranges and individual months
 * Returns relative paths first, then months starting from current month
 */
export function getFilterOptions(): Array<{ value: string; label: string }> {
  const standardOptions = [
    { value: FilterRange.Last12Months, label: FilterRange.Last12Months },
    { value: FilterRange.Last6Months, label: FilterRange.Last6Months },
    { value: FilterRange.Last3Months, label: FilterRange.Last3Months },
  ]

  const monthOptions = generateMonthOptions()

  return [...standardOptions, ...monthOptions]
}
