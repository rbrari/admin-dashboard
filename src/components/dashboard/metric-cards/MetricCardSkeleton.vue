<template>
  <div class="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
    <Skeleton width="50%" height="16px" />
    <Skeleton width="70%" height="16px" />
    <Skeleton width="100%" height="186px" />
  </div>
</template>

<script setup lang="ts">
import Skeleton from '@/components/ui/BaseSkeleton.vue'
</script>
