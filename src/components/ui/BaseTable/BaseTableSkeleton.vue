<template>
  <table class="w-full overflow-hidden">
    <thead>
      <tr class="border-b border-border bg-muted/50">
        <th
          v-for="column in columns"
          :key="column"
          class="h-12 px-4 text-left align-middle text-sm font-medium text-muted-foreground"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-border">
      <tr v-for="i in totalRows" :key="i" class="hover:bg-muted/50">
        <td v-for="c in columns.length" :key="c" class="h-16 px-4 align-middle">
          <Skeleton width="100px" height="16px" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Skeleton from '@/components/ui/BaseSkeleton.vue'

interface Props {
  columns: string[]
  totalRows?: number
}

const { totalRows = 8 } = defineProps<Props>()
</script>
