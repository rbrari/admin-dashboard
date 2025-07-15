<template>
  <div class="space-y-10">
    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-chart-1/10 p-3 text-chart-1 shadow-sm">
          <UserCheck class="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-foreground md:text-xl">Trial Metrics</h3>
          <p class="text-xs text-muted-foreground md:text-sm">
            User acquisition and trial conversion
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCard
          v-else
          v-for="(metric, index) in trialMetrics"
          :key="metric.label"
          v-bind="metric"
          :color-index="index + 1"
          class="w-full flex-1"
        />
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-chart-2/10 p-3 text-chart-2 shadow-sm">
          <CreditCard class="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-foreground md:text-xl">Paid Metrics</h3>
          <p class="text-xs text-muted-foreground md:text-sm">Subscription conversion and growth</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCard
          v-else
          v-for="(metric, index) in paidMetrics"
          :key="metric.label"
          v-bind="metric"
          :color-index="index + 2"
          class="w-full flex-1"
        />
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-chart-3/10 p-3 text-chart-3 shadow-sm">
          <DollarSign class="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-foreground md:text-xl">Revenue Metrics</h3>
          <p class="text-xs text-muted-foreground md:text-sm">
            Monthly and annual recurring revenue
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCardSkeleton v-if="isLoading" class="flex-1" />
        <MetricCard
          v-else
          v-for="(metric, index) in revenueMetrics"
          :key="metric.label"
          v-bind="metric"
          :color-index="(index % 4) + 1"
          class="w-full flex-1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MetricCard from '@/components/dashboard/metric-cards/MetricCard.vue'
import MetricCardSkeleton from '@/components/dashboard/metric-cards/MetricCardSkeleton.vue'
import type { DashboardMetric } from '@/types'
import { CreditCard, DollarSign, UserCheck } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  metrics: DashboardMetric[]
  isLoading?: boolean
}

const { metrics } = defineProps<Props>()

const trialMetrics = computed(() => {
  return metrics.filter((metric) => metric.label.includes('Trial'))
})

const paidMetrics = computed(() => {
  return metrics.filter((metric) => metric.label.includes('Paid'))
})

const revenueMetrics = computed(() => {
  return metrics.filter((metric) => metric.label.includes('MRR') || metric.label.includes('ARR'))
})
</script>
