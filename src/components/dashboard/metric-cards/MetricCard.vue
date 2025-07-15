<template>
  <div
    class="group space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"
    :class="className"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="flex-1 text-base leading-none font-bold text-card-foreground md:text-lg">
        <span v-if="value === null" class="text-muted-foreground">{{ label }}</span>
        <span v-else>{{ formatValue(value!, format) }} {{ label }}</span>
      </div>

      <div v-if="change !== null && change !== undefined" class="flex items-center gap-1 text-xs">
        <div :class="getChangeColor(change)" class="flex gap-1">
          <TrendingUp v-if="change >= 0" class="h-3 w-3 md:h-3.5 md:w-3.5" />
          <TrendingDown v-else class="h-3 w-3 md:h-3.5 md:w-3.5" />
          <span>{{ formatValue(change, 'percentage') }}</span>
        </div>
        <span class="hidden text-xs font-medium text-muted-foreground sm:inline">
          vs previous month
        </span>
      </div>

      <div
        v-if="benchmark && benchmarkData && value !== null"
        class="flex items-center gap-2 rounded-full px-2 py-1 text-xs"
        :class="benchmarkData.class"
        :title="`Target: ${formatValue(benchmark.target, format)}`"
      >
        <StatusDot :status="benchmarkData.status" size="sm" />
        <span class="hidden sm:inline">{{ benchmarkData.text }}</span>
      </div>
    </div>

    <div
      v-if="chartData && chartData.length > 1"
      class="h-[140px] rounded-xl border border-border/10 p-2 shadow-inner md:h-[180px]"
    >
      <LineChart
        :data="chartData"
        :color-index="colorIndex"
        :show-grid="false"
        fill
        show-points
        :enable-animation="true"
        :animation-duration="600"
        :animation-delay="(context) => context.dataIndex * 8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '@/components/ui/BaseChart.vue'
import StatusDot from '@/components/ui/StatusDot.vue'
import { useFormatting } from '@/composables/useFormatting'
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import { computed } from 'vue'

const { formatValue, getBenchmarkStatus, getChangeColor } = useFormatting()

interface Props {
  label: string
  value: number | null
  change?: number | null
  format?: 'currency' | 'percentage' | 'number'
  chartData?: { month: string; value: number }[]
  benchmark?: { target: number; unit: string }
  className?: string
  colorIndex?: number
}

const { value, benchmark, className = '', colorIndex = 1 } = defineProps<Props>()

const benchmarkData = computed(() => {
  if (!benchmark || value === null || value === undefined) return undefined

  const status = getBenchmarkStatus(value, benchmark)

  if (status === 'success') {
    return {
      status,
      text: 'Above Target',
      class: 'border border-success text-success',
    }
  }

  if (status === 'warning') {
    return {
      status,
      text: 'Slightly Below Target',
      class: 'border border-warning text-warning',
    }
  }

  return {
    status,
    text: 'Below Target',
    class: 'border border-destructive text-destructive',
  }
})
</script>
