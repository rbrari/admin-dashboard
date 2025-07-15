import type { NavItem } from '@/components/ui/BaseNavbar'
import { LayoutDashboard, RefreshCcwDot } from 'lucide-vue-next'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
const DashboardView = () => import('@/views/DashboardView.vue')
const LiveAnalyticsView = () => import('@/views/LiveAnalyticsView.vue')

export const NAV_ITEMS: Record<string, NavItem> = {
  MONTHLY_OVERVIEW: {
    url: '/',
    name: 'Monthly Overview',
    icon: LayoutDashboard,
  },
  LIVE_ANALYTICS: {
    url: '/live-analytics',
    name: 'Live Analytics',
    icon: RefreshCcwDot,
  },
}

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: NAV_ITEMS.MONTHLY_OVERVIEW.url,
  },
  {
    path: NAV_ITEMS.MONTHLY_OVERVIEW.url,
    name: NAV_ITEMS.MONTHLY_OVERVIEW.name,
    component: DashboardView,
  },
  {
    path: NAV_ITEMS.LIVE_ANALYTICS.url,
    name: NAV_ITEMS.LIVE_ANALYTICS.name,
    component: LiveAnalyticsView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
