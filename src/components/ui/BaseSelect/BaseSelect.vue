<template>
  <SelectRoot v-model="selected">
    <SelectTrigger
      class="inline-flex h-10 w-full min-w-[12rem] items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-card/80 hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
    >
      <SelectValue placeholder="Select time period" />
      <SelectIcon>
        <ChevronDown class="h-4 w-4" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="relative z-500 !max-h-96 min-w-[12rem] overflow-auto rounded-lg border border-border bg-card text-card-foreground shadow-md"
        :side-offset="4"
        position="popper"
        :bodyLock="false"
      >
        <SelectScrollUpButton
          class="flex cursor-default items-center justify-center py-1 text-muted-foreground hover:bg-accent"
        >
          <ChevronUp class="h-4 w-4" />
        </SelectScrollUpButton>

        <SelectViewport class="p-1">
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            class="relative flex w-full cursor-default items-center rounded-md py-2 pr-8 pl-3 text-sm text-foreground select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <SelectItemIndicator
              class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"
            >
              <Check class="h-4 w-4" />
            </SelectItemIndicator>
            <SelectItemText>{{ option.label }}</SelectItemText>
          </SelectItem>
        </SelectViewport>

        <SelectScrollDownButton
          class="flex cursor-default items-center justify-center py-1 text-muted-foreground hover:bg-accent"
        >
          <ChevronDown class="h-4 w-4" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import type { Option } from '@/components/ui/BaseSelect/types'
import { Check, ChevronDown, ChevronUp } from 'lucide-vue-next'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

interface Props {
  options?: Option[]
}

const { options = [] } = defineProps<Props>()

const selected = defineModel<string>()
</script>
