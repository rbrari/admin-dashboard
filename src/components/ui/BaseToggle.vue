<template>
  <div class="inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-1">
    <button
      v-for="option in options"
      :key="option.value"
      @click="$emit('update:modelValue', option.value)"
      :class="[
        'inline-flex items-center justify-center rounded-md px-2 py-2 text-xs font-medium',
        modelValue === option.value
          ? 'bg-card text-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-card/40 hover:text-foreground',
      ]"
      type="button"
    >
      <component :is="option.icon" class="h-4 w-4" v-if="option.icon" />
      <span class="ml-1 hidden sm:inline md:ml-2">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Component } from 'vue'

interface Option {
  value: string
  icon?: Component
  label: string
}

interface Props {
  options: Option[]
}

const modelValue = defineModel<string>({ required: true })

const { options } = defineProps<Props>()
</script>
