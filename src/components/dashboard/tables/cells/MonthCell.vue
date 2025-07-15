<template>
  <span class="text-xs font-medium text-foreground md:text-sm">{{ value }}</span>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
  row: Record<string, unknown>
  column?: { key: string }
}>()
</script>
