<template>
  <div class="rounded-xl border border-border bg-card p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="text-foreground/80">
        <p class="text-sm font-medium">{{ title }}</p>
        <p v-if="subtitle" class="text-xs">{{ subtitle }}</p>
      </div>
      <div :class="['flex h-8 w-8 items-center justify-center rounded-lg', iconBackgroundClass]">
        <component :is="icon" class="h-4 w-4" />
      </div>
    </div>
    <div class="mt-4">
      <slot name="content">
        <Skeleton v-if="isLoading && !animatedValue" :width="valueWidth" height="36px" />
        <p v-else class="text-3xl font-bold text-foreground">
          {{ animatedValue }}
        </p>
        <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from '@/components/ui/BaseSkeleton.vue'
import { useAnimatedNumber } from '@/composables/useAnimatedNumber'
import type { Component } from 'vue'
import { computed } from 'vue'

interface Props {
  title: string
  subtitle?: string
  value?: string | number
  description?: string
  icon: Component
  iconBackgroundClass?: string
  isLoading?: boolean
  valueWidth?: string
  animated?: boolean
}

const {
  iconBackgroundClass = 'bg-primary/10 text-primary',
  isLoading = false,
  valueWidth = '60px',
  animated = false,
  value = 0,
} = defineProps<Props>()

const animatedValue = animated
  ? useAnimatedNumber(() => (typeof value === 'number' ? value : parseFloat(value as string) || 0))
  : computed(() => value)
</script>
