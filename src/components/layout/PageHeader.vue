<template>
  <BaseNavbar :items :className>
    <template #BEFORE_ITEMS>
      <div class="hidden cursor-default items-center gap-2 px-2 text-foreground/80 md:flex">
        <SquareKanban class="size-6" />
        <span class="text-sm font-semibold">Admin Dashboard</span>
      </div>
    </template>
    <template #AFTER_ITEMS>
      <button
        @click="toggle"
        class="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground/80 hover:bg-background/40 hover:text-primary"
      >
        <Sun v-if="isDark" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
        <span class="sr-only">Toggle theme</span>
      </button>
    </template>
  </BaseNavbar>
</template>

<script setup lang="ts">
import type { NavBarProps } from '@/components/ui/BaseNavbar'
import BaseNavbar from '@/components/ui/BaseNavbar/BaseNavbar.vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { Moon, SquareKanban, Sun } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const {
  className = 'fixed bottom-0 md:top-0 md:bottom-auto left-1/2 -translate-x-1/2  md:w-[700px]',
  items: navItems,
} = defineProps<NavBarProps>()

const route = useRoute()
const { isDark, toggle } = useDarkMode()

const items = computed(() => {
  return navItems.map((item) => ({
    ...item,
    active: item.url === route.path,
  }))
})
</script>
