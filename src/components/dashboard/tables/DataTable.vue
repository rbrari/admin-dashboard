<template>
  <div class="rounded-xl border border-border bg-card shadow-sm">
    <BaseTableSkeleton v-if="isLoading" :columns="tableColumns.map((col) => col.label)" />
    <BaseTable v-else :columns="tableColumns" :rows="tableRows" />
  </div>
</template>

<script setup lang="ts">
import {
  BenchmarkCell,
  ChangeCell,
  MonthCell,
  ValueCell,
} from '@/components/dashboard/tables/cells'
import BaseTable from '@/components/ui/BaseTable/BaseTable.vue'
import BaseTableSkeleton from '@/components/ui/BaseTable/BaseTableSkeleton.vue'
import type { TableColumn, TableRow } from '@/components/ui/BaseTable/types'
import { calculateChange } from '@/mocks/business/metricsCalculator'
import type { DashboardConfig, MonthlyData } from '@/types'
import { computed } from 'vue'

interface TableColumnConfig {
  key: string
  label: string
  showChange?: boolean
  type?: 'month' | 'value' | 'change' | 'benchmark'
  benchmark?: { target: number; unit: string }
}

interface Props {
  data: MonthlyData[]
  isLoading: boolean
  dashboardConfig?: DashboardConfig | null
}

const { dashboardConfig, data } = defineProps<Props>()

const dashboardColumns = computed((): TableColumnConfig[] => [
  { key: 'label', label: 'Month', type: 'month' as const },
  {
    key: 'uniqueUsers',
    label: 'Unique Users',
    type: 'value' as const,
    showChange: true,
  },
  { key: 'trialSignups', label: 'Trial Signups', type: 'value' as const },
  {
    key: 'trialSignupConversion',
    label: 'Trial Conversion',
    type: 'benchmark' as const,
    benchmark: dashboardConfig?.benchmarks?.trialConversion,
  },
  { key: 'paidSubscriptions', label: 'Paid Subs', type: 'value' as const },
  {
    key: 'paidSubscriptionConversion',
    label: 'Paid Conversion',
    type: 'benchmark' as const,
    benchmark: dashboardConfig?.benchmarks?.paidConversion,
  },
  {
    key: 'newMrr',
    label: 'New MRR',
    type: 'value' as const,
  },
  {
    key: 'currentTotalMrr',
    label: 'Total MRR',
    type: 'value' as const,
    showChange: true,
  },
  {
    key: 'currentTotalArr',
    label: 'Total ARR',
    type: 'value' as const,
  },
])

const tableColumns = computed((): TableColumn[] => {
  return dashboardColumns.value.flatMap((column) => {
    let renderFunction = ValueCell

    if (column.type === 'month') {
      renderFunction = MonthCell
    } else if (column.type === 'benchmark') {
      renderFunction = BenchmarkCell
    }

    const mainColumn: TableColumn = {
      key: column.key,
      label: column.label,
      renderFunction,
      ...(column.benchmark && { benchmark: column.benchmark }),
    }

    const changeColumn: TableColumn = {
      key: `${column.key}Change`,
      label: `${column.label.split(' ')[0]} Change`,
      renderFunction: ChangeCell,
    }

    return column.showChange && (column.type === 'value' || column.type === 'benchmark')
      ? [mainColumn, changeColumn]
      : [mainColumn]
  })
})

const tableRows = computed((): TableRow[] =>
  data.map((monthData, index) => {
    const previousMonth = index < data.length - 1 ? data[index + 1] : undefined

    const baseRow = {
      id: `month-${index}`,
      label: `${monthData.month} ${monthData.year}`,
      ...monthData,
    }

    const changeValues = dashboardColumns.value
      .filter((col) => col.showChange && col.key in monthData)
      .reduce(
        (acc, col) => {
          const current = monthData[col.key as keyof MonthlyData] as number
          const previous = previousMonth?.[col.key as keyof MonthlyData] as number
          acc[`${col.key}Change`] = calculateChange(current, previous)
          return acc
        },
        {} as Record<string, number | null>,
      )

    return { ...baseRow, ...changeValues }
  }),
)
</script>
