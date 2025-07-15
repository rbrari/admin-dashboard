<template>
  <div class="w-full">
    <slot name="header" />
    <div class="overflow-x-auto rounded-lg">
      <table class="w-full min-w-max">
        <thead>
          <tr class="border-b border-border bg-card">
            <th
              v-for="column in columns"
              :key="column.key"
              class="h-12 px-3 text-left align-middle text-xs font-medium whitespace-nowrap text-muted-foreground md:px-4 md:text-sm"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr v-for="row in rows" :key="row.id" class="hover:bg-muted/50">
            <template v-for="column in columns" :key="column.key">
              <td v-if="column.renderFunction" class="h-14 px-3 align-middle md:h-16 md:px-4">
                <component
                  :is="column.renderFunction"
                  :value="row[column.key]"
                  :row="row"
                  :column="column"
                />
              </td>
              <td v-else class="h-14 px-3 align-middle md:h-16 md:px-4">
                <span class="text-xs text-foreground md:text-sm">
                  {{ row[column.key] }}
                </span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TableColumn, type TableRow } from '@/components/ui/BaseTable/types'

interface Props {
  columns: TableColumn[]
  rows: TableRow[]
}

defineProps<Props>()
</script>
