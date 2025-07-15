<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <template v-if="isLoading && !monthOptions.length">
      <Skeleton width="140px" height="40px" className="rounded-lg" />
      <Skeleton width="175px" height="40px" className="rounded-lg" />
    </template>
    <template v-else>
      <BaseSelect :options="monthOptions" v-model="selectedMonth" />
      <BaseToggle :options="viewModeOptions" v-model="viewMode" />
    </template>
  </div>

  <div class="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm md:p-6 lg:p-8">
    <Skeleton v-if="isLoading" height="32px" width="150px" className="rounded-lg" />
    <div v-else class="text-xl font-bold text-card-foreground md:text-2xl">
      {{ uniqueUsersHeadline }}
    </div>
    <template v-if="isRelativeTimeframe">
      <Skeleton v-if="isLoading" height="24px" width="300px" className="rounded-lg" />
      <div v-else class="text-sm text-muted-foreground md:text-base">
        Track user engagement over time
      </div>
      <div class="h-64 w-full md:h-80">
        <Skeleton v-if="isLoading" height="100%" className="rounded-lg" />
        <LineChart
          v-else
          :data="chartData"
          :color-index="1"
          size="large"
          :enable-animation="chartData.length <= 12"
          :animation-duration="800"
          :animation-delay="chartData.length > 12 ? 5 : (context) => context.dataIndex * 30"
        />
      </div>
    </template>
  </div>

  <MetricsCards v-if="viewMode === 'cards'" :metrics="allMetrics" :is-loading="isLoading" />

  <DataTable v-else :data="dashboardData" :is-loading :dashboard-config />
</template>

<script setup lang="ts">
import MetricsCards from '@/components/dashboard/metric-cards/MetricCards.vue'
import DataTable from '@/components/dashboard/tables/DataTable.vue'
import LineChart from '@/components/ui/BaseChart.vue'
import { BaseSelect, type Option } from '@/components/ui/BaseSelect'
import Skeleton from '@/components/ui/BaseSkeleton.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import { useNotifications } from '@/composables/useNotifications'
import {
  fetchChartData,
  fetchDashboardConfig,
  fetchDashboardData,
  fetchDashboardMetrics,
  fetchMonthOptions,
} from '@/services/dashboardService'
import type { ChartDataPoint, DashboardConfig, DashboardMetric, MonthlyData } from '@/types'
import { Grid3X3, Table } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'

const viewModeOptions = [
  { value: 'cards', label: 'Cards', icon: Grid3X3 },
  { value: 'table', label: 'Table', icon: Table },
]

const { notifyError } = useNotifications()

const selectedMonth = ref('Last 12 Months')
const viewMode = ref<'cards' | 'table'>('cards')
const monthOptions = ref<Option[]>([])
const dashboardData = ref<MonthlyData[]>([])
const allMetrics = ref<DashboardMetric[]>([])
const chartData = ref<ChartDataPoint[]>([])
const dashboardConfig = ref<DashboardConfig | null>(null)
const isLoading = ref(true)

const isRelativeTimeframe = computed(() => {
  return ['Last 12 Months', 'Last 6 Months', 'Last 3 Months'].includes(selectedMonth.value)
})

const uniqueUsersHeadline = computed(() => {
  if (!isRelativeTimeframe.value && chartData.value.length > 0) {
    return `${chartData.value[0].value} Unique Users`
  }
  return 'Unique Users'
})

const loadDashboardData = async () => {
  try {
    const [data, metrics, chart, config] = await Promise.all([
      fetchDashboardData(selectedMonth.value),
      fetchDashboardMetrics(selectedMonth.value),
      fetchChartData(selectedMonth.value),
      fetchDashboardConfig(),
    ])

    dashboardData.value = data
    allMetrics.value = metrics
    chartData.value = chart
    dashboardConfig.value = config
  } catch {
    notifyError('Error loading dashboard data')
  }
}

const loadMonthOptions = async () => {
  try {
    monthOptions.value = await fetchMonthOptions()
  } catch {
    notifyError('Error loading month options')
    monthOptions.value = [
      { value: 'Last 12 Months', label: 'Last 12 Months' },
      { value: 'Last 6 Months', label: 'Last 6 Months' },
      { value: 'Last 3 Months', label: 'Last 3 Months' },
    ]
  }
}

watch(selectedMonth, async () => {
  isLoading.value = true
  await loadDashboardData()
  isLoading.value = false
})

onMounted(async () => {
  isLoading.value = true
  await Promise.all([loadDashboardData(), loadMonthOptions()])
  isLoading.value = false
})
</script>
