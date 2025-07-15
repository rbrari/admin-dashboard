<template>
  <p class="text-xs font-medium text-foreground md:text-sm">{{ row.user }}</p>
</template>

<script setup lang="ts">
defineProps<{
  value: string
  row: Record<string, unknown>
}>()
</script>
