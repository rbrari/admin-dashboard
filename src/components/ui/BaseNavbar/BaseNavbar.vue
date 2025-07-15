<template>
  <div :class="`z-50 mb-6 pt-6 ${className}`">
    <div
      class="flex items-center justify-between gap-3 rounded-full border border-border bg-card/10 px-1 py-1 shadow-lg backdrop-blur-lg"
    >
      <slot name="BEFORE_ITEMS" />
      <div class="flex items-center gap-2">
        <router-link
          v-for="item in items"
          :key="item.name"
          :to="item.url"
          :class="`relative cursor-pointer rounded-full px-6 py-2 text-sm font-semibold text-foreground/80 hover:bg-background/40 hover:text-primary ${
            item.active ? '!bg-muted text-primary' : ''
          }`"
        >
          <span class="hidden md:inline">{{ item.name }}</span>
          <component class="md:hidden" :is="item.icon" :size="18" :stroke-width="2.5" />
          <div v-if="item.active" class="absolute inset-0 -z-10 w-full rounded-full bg-primary/5">
            <div
              class="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary"
            >
              <div class="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
              <div class="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
              <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
            </div>
          </div>
        </router-link>
      </div>
      <slot name="AFTER_ITEMS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavBarProps } from '@/components/ui/BaseNavbar/types'

const { className = '' } = defineProps<NavBarProps>()
</script>
