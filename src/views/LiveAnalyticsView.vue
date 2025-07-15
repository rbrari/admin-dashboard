<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <BaseMetricCard
      title="Active Users"
      subtitle="Last 5 seconds"
      :value="liveUsers"
      description="Online now"
      :icon="Users"
      icon-background-class="bg-primary/10 text-primary"
      :animated="true"
      :is-loading="isLoadingLiveUsers"
      value-width="60px"
    />

    <BaseMetricCard
      title="Active Users"
      subtitle="Last 24 hours"
      :value="dailyActiveUsers"
      description="Daily total"
      :icon="Users"
      icon-background-class="bg-primary/10 text-primary"
      :animated="true"
      :is-loading="isLoadingDailyMetrics"
      value-width="80px"
    />

    <BaseMetricCard
      title="Cards Created"
      subtitle="Last 24 hours"
      :value="cardsCreated"
      description="New cards today"
      :icon="CreditCard"
      icon-background-class="bg-primary/10 text-primary"
      :animated="true"
      :is-loading="isLoadingDailyMetrics"
      value-width="90px"
    />
  </div>

  <div class="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
    <div class="mb-4 md:mb-6">
      <h2 class="text-lg font-semibold text-card-foreground md:text-xl">Live User Activity</h2>
      <p class="text-xs text-muted-foreground md:text-sm">
        Real-time user activity over the last hour
      </p>
    </div>
    <div class="h-64 w-full md:h-80">
      <Skeleton v-if="isLoadingChart" height="100%" className="rounded-lg" />
      <LineChart
        v-else
        :data="liveChartData"
        :color-index="1"
        size="large"
        :enable-animation="true"
        :animation-duration="500"
        :animation-delay="3"
      />
    </div>
  </div>

  <RecentActivityTable :activities="recentActivities" :is-loading="isLoadingChart" />
</template>

<script setup lang="ts">
import RecentActivityTable from '@/components/dashboard/tables/RecentActivityTable.vue'
import BaseMetricCard from '@/components/ui/BaseCard.vue'
import LineChart from '@/components/ui/BaseChart.vue'
import Skeleton from '@/components/ui/BaseSkeleton.vue'
import { useNotifications } from '@/composables/useNotifications'
import { usePolling } from '@/composables/usePolling'
import { fetchDailyMetrics, fetchLiveChartData, fetchLiveUsers } from '@/services/dashboardService'
import type { ChartDataPoint, RecentActivity } from '@/types'
import { CreditCard, Users } from 'lucide-vue-next'
import { computed, watch } from 'vue'

interface LiveUsersData {
  liveUsers: number
}

interface DailyMetricsData {
  dailyActiveUsers: number
  cardsCreated: number
}

interface ChartData {
  chartData: { time: string; value: number }[]
  recentActivities: RecentActivity[]
}

const { notifyError } = useNotifications()

const transformChartData = (data: { time: string; value: number }[]): ChartDataPoint[] => {
  return data.map((item) => ({
    month: new Date(item.time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    value: item.value,
  }))
}

const liveUsersPolling = usePolling<LiveUsersData>({
  fetchFn: fetchLiveUsers,
  interval: 5_000,
  autoStart: true,
  onError: () => notifyError('Failed to load live users data'),
})

const dailyMetricsPolling = usePolling<DailyMetricsData>({
  fetchFn: fetchDailyMetrics,
  interval: 30_000,
  autoStart: true,
  onError: () => notifyError('Failed to load daily metrics data'),
})

const chartDataPolling = usePolling<ChartData>({
  fetchFn: fetchLiveChartData,
  interval: 180_000,
  autoStart: true,
  onError: () => notifyError('Failed to load chart data'),
})

const liveUsers = computed(() => liveUsersPolling.data.value?.liveUsers ?? 0)
const dailyActiveUsers = computed(() => dailyMetricsPolling.data.value?.dailyActiveUsers ?? 0)
const cardsCreated = computed(() => dailyMetricsPolling.data.value?.cardsCreated ?? 0)

const liveChartData = computed(() => {
  const rawData = chartDataPolling.data.value?.chartData
  return rawData ? transformChartData(rawData) : []
})

const recentActivities = computed(() => chartDataPolling.data.value?.recentActivities ?? [])

const isLoadingLiveUsers = computed(() => liveUsersPolling.isLoading.value)
const isLoadingDailyMetrics = computed(() => dailyMetricsPolling.isLoading.value)
const isLoadingChart = computed(() => chartDataPolling.isLoading.value)

const error = computed(() => {
  return (
    liveUsersPolling.error.value?.message ||
    dailyMetricsPolling.error.value?.message ||
    chartDataPolling.error.value?.message ||
    null
  )
})

watch(error, (newError) => {
  if (newError) {
    notifyError('Live data connection issue - retrying...')
  }
})
</script>
