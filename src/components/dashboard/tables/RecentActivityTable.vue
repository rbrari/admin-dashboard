<template>
  <div class="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
    <div class="mb-4 md:mb-6">
      <h2 class="text-lg font-semibold text-card-foreground md:text-xl">Recent Activity</h2>
      <p class="text-xs text-muted-foreground md:text-sm">Latest user actions and events</p>
    </div>
    <BaseTableSkeleton
      v-if="isLoading"
      :columns="activityColumns.map((col) => col.label)"
      :total-rows="5"
    />
    <BaseTable v-else :columns="activityColumns" :rows="activityRows" />
  </div>
</template>

<script setup lang="ts">
import { ActionCell, TimeCell, UserCell } from '@/components/dashboard/tables/cells'
import BaseTable from '@/components/ui/BaseTable/BaseTable.vue'
import BaseTableSkeleton from '@/components/ui/BaseTable/BaseTableSkeleton.vue'
import type { RecentActivity } from '@/types'
import { computed } from 'vue'

interface Props {
  activities: RecentActivity[]
  isLoading: boolean
}

const { activities } = defineProps<Props>()

const activityColumns = [
  { key: 'user', label: 'User', renderFunction: UserCell },
  { key: 'action', label: 'Action', renderFunction: ActionCell },
  { key: 'time', label: 'Time', renderFunction: TimeCell },
]

const activityRows = computed(() =>
  activities.map((activity) => ({
    id: activity.id.toString(),
    status: activity.status,
    user: activity.user,
    action: activity.action,
    page: activity.page,
    time: activity.time,
  })),
)
</script>
