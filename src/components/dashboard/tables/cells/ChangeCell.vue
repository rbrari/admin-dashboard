<template>
  <div
    v-if="value !== undefined && value !== null"
    :class="[
      'inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-xs font-medium md:px-2',
      getChangeColor(value),
    ]"
  >
    <TrendingUp v-if="value > 0" class="h-2.5 w-2.5 md:h-3 md:w-3" />
    <TrendingDown v-else-if="value < 0" class="h-2.5 w-2.5 md:h-3 md:w-3" />
    <Minus v-else class="h-2.5 w-2.5 md:h-3 md:w-3" />
    <span class="text-xs">{{ value !== 0 ? Math.abs(value).toFixed(1) + '%' : '0%' }}</span>
  </div>
  <span v-else class="text-xs text-muted-foreground md:text-sm">—</span>
</template>

<script setup lang="ts">
import { useFormatting } from '@/composables/useFormatting'
import { Minus, TrendingDown, TrendingUp } from 'lucide-vue-next'

const { getChangeColor } = useFormatting()

defineProps<{
  value: number | null | undefined
  row: Record<string, unknown>
}>()
</script>
