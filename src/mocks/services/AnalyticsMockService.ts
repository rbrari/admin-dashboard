import type { LiveChartDataPoint, RecentActivity } from '@/types'
import {
  generateCardsCreated,
  generateDailyActiveUsers,
  generateLiveChartData,
  generateLiveUsers,
  generateRecentActivities,
} from '../data/generators'

export class AnalyticsMockService {
  getLiveUsers(): { liveUsers: number; success: boolean } {
    return {
      liveUsers: generateLiveUsers(),
      success: true,
    }
  }

  getDailyMetrics(): {
    dailyActiveUsers: number
    cardsCreated: number
    success: boolean
  } {
    return {
      dailyActiveUsers: generateDailyActiveUsers(),
      cardsCreated: generateCardsCreated(),
      success: true,
    }
  }

  getLiveChartData(): {
    chartData: LiveChartDataPoint[]
    recentActivities: RecentActivity[]
    success: boolean
  } {
    return {
      chartData: generateLiveChartData(),
      recentActivities: generateRecentActivities(),
      success: true,
    }
  }

  getRecentActivities(): {
    activities: RecentActivity[]
    success: boolean
  } {
    return {
      activities: generateRecentActivities(),
      success: true,
    }
  }
}
