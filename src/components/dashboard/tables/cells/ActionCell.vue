<template>
  <div>
    <p class="text-xs font-medium text-foreground md:text-sm">{{ row.action }}</p>
    <p class="text-xs text-muted-foreground">{{ row.page }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
  row: Record<string, unknown>
}>()
</script>
