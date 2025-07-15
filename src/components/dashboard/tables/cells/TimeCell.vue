<template>
  <p class="text-xs text-muted-foreground">{{ formattedTime }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
  row: Record<string, unknown>
}>()

const formattedTime = computed(() => {
  const date = new Date(props.value)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
})
</script>
