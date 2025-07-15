<template>
  <div :class="['h-2 w-2 rounded-full', statusClasses, { 'animate-pulse': animated }]" :title />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  title?: string
}

const { size = 'md', animated = false, status } = defineProps<Props>()

const statusClasses = computed(() => {
  const baseClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  }

  const statusColors = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
  }

  return [baseClasses[size], statusColors[status]].join(' ')
})
</script>
