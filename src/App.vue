<template>
  <div id="app">
    <PageHeader :items="Object.values(NAV_ITEMS)" />
    <PageLayout>
      <RouterView />
    </PageLayout>
    <Toaster position="bottom-left" richColors />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { NAV_ITEMS } from '@/router'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>
