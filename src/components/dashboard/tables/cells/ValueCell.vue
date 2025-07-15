<template>
  <span class="font-mono text-xs text-foreground md:text-sm">
    {{ formattedValue }}
  </span>
</template>

<script setup lang="ts">
import { useFormatting } from '@/composables/useFormatting'
import { computed } from 'vue'

const { formatValue, getFormatTypeFromColumn } = useFormatting()

const props = defineProps<{
  value: number | string
  row: Record<string, unknown>
  column?: { key: string }
}>()

const formattedValue = computed(() => {
  const numericValue = typeof props.value === 'string' ? parseFloat(props.value) || 0 : props.value
  const formatType = getFormatTypeFromColumn(props.column?.key || '')
  return formatValue(numericValue, formatType)
})
</script>
