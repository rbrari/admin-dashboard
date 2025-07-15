<template>
  <div class="flex items-center gap-1 md:gap-2">
    <span class="font-mono text-xs text-foreground md:text-sm">
      {{ formattedValue }}
    </span>
    <StatusDot
      v-if="benchmarkTooltip"
      :status="benchmarkStatus"
      size="sm"
      :title="benchmarkTooltip"
    />
  </div>
</template>

<script setup lang="ts">
import StatusDot from '@/components/ui/StatusDot.vue'
import { useFormatting } from '@/composables/useFormatting'
import { computed } from 'vue'

const { formatValue, getFormatTypeFromColumn } = useFormatting()

interface Props {
  value: number | string
  row: Record<string, unknown>
  column?: { key: string; benchmark?: { target: number; unit: string } }
  benchmark?: { target: number; unit: string }
}

const props = defineProps<Props>()

const numericValue = computed(() => {
  return typeof props.value === 'string' ? parseFloat(props.value) || 0 : props.value
})

const formattedValue = computed(() => {
  const formatType = getFormatTypeFromColumn(props.column?.key || '')
  return formatValue(numericValue.value, formatType)
})

const benchmarkStatus = computed((): 'success' | 'warning' | 'error' => {
  const benchmark = props.benchmark || props.column?.benchmark
  if (!benchmark) return 'warning'

  const { target } = benchmark
  const value = numericValue.value

  const isPercentageMetric = props.column?.key?.toLowerCase().includes('conversion')

  if (isPercentageMetric) {
    if (value >= target) return 'success'
    if (value >= target * 0.8) return 'warning'
    return 'error'
  }

  if (value >= target) return 'success'
  if (value >= target * 0.8) return 'warning'
  return 'error'
})

const benchmarkTooltip = computed(() => {
  const benchmark = props.benchmark || props.column?.benchmark
  if (!benchmark) return ''

  const { target } = benchmark
  const formatType = getFormatTypeFromColumn(props.column?.key || '')
  const formattedTarget = formatValue(target, formatType)

  return `Benchmark: ${formattedTarget}`
})
</script>
