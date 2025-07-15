<template>
  <div :class="['animate-pulse rounded-md bg-primary/10', className]" :style="{ width, height }" />
</template>

<script setup lang="ts">
interface Props {
  className?: string
  width?: string
  height?: string
}

const { className = '', width = '100%', height = '1rem' } = defineProps<Props>()
</script>
