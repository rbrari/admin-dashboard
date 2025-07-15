import { delay, http, HttpResponse } from 'msw'
import { AnalyticsMockService } from './services/AnalyticsMockService'
import { DashboardMockService } from './services/DashboardMockService'

export { FilterRange } from './data/constants'

const dashboardService = new DashboardMockService()
const analyticsService = new AnalyticsMockService()

function getFilterParam(request: Request): string {
  const url = new URL(request.url)
  return url.searchParams.get('filter') || 'Last 12 Months'
}

export const handlers = [
  http.get('/api/dashboard/monthly-data', async ({ request }) => {
    await delay(800)
    const filter = getFilterParam(request)
    const data = dashboardService.getMonthlyData(filter)

    return HttpResponse.json({
      data,
      success: true,
    })
  }),

  http.get('/api/dashboard/metrics', async ({ request }) => {
    await delay(600)
    const filter = getFilterParam(request)
    const metrics = dashboardService.getDashboardMetrics(filter)

    return HttpResponse.json({
      metrics,
      success: true,
    })
  }),

  http.get('/api/dashboard/chart-data', async ({ request }) => {
    await delay(700)
    const filter = getFilterParam(request)
    const chartData = dashboardService.getChartData(filter)

    return HttpResponse.json({
      chartData,
      success: true,
    })
  }),

  http.get('/api/dashboard/config', async () => {
    await delay(300)
    return HttpResponse.json(dashboardService.getConfig())
  }),

  http.get('/api/dashboard/month-options', async () => {
    await delay(200)
    const options = dashboardService.getFilterOptions()

    return HttpResponse.json({
      options,
      success: true,
    })
  }),

  http.get('/api/analytics/live-users', async () => {
    await delay(400)
    return HttpResponse.json(analyticsService.getLiveUsers())
  }),

  http.get('/api/analytics/daily-metrics', async () => {
    await delay(500)
    return HttpResponse.json(analyticsService.getDailyMetrics())
  }),

  http.get('/api/analytics/live-chart', async () => {
    await delay(600)
    return HttpResponse.json(analyticsService.getLiveChartData())
  }),

  http.get('/api/analytics/recent-activities', async () => {
    await delay(450)
    return HttpResponse.json(analyticsService.getRecentActivities())
  }),
]
