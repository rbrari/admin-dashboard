<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

type AnimationEasing =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'

interface Props {
  data: { month: string; value: number }[]
  colorIndex?: number
  showGrid?: boolean
  showPoints?: boolean
  fill?: boolean
  size?: 'small' | 'medium' | 'large'
  enableAnimation?: boolean
  animationDuration?: number
  animationEasing?: AnimationEasing
  animationDelay?: number | ((context: { dataIndex: number }) => number)
}

const {
  colorIndex = 1,
  showGrid = false,
  showPoints = true,
  fill = true,
  data,
  enableAnimation = true,
  animationDuration = 1000,
  animationEasing = 'easeInOutQuart',
  animationDelay = (context) => context.dataIndex * 10,
} = defineProps<Props>()

const { isDark } = useDarkMode()

const getChartColor = (index: number = 1): string => {
  const validIndex = Math.max(1, Math.min(4, index))
  const root = document.documentElement
  const style = getComputedStyle(root)
  return style.getPropertyValue(`--chart-${validIndex}`).trim()
}

const getChartColorRgba = (index: number = 1, alpha: number = 0.1): string => {
  const color = getChartColor(index)
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return color
}

const chartColor = computed(() => getChartColorRgba(colorIndex, 1))

const chartData = computed<ChartData<'line'>>(() => {
  if (!data || data.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }

  const validData = data.filter((item) => {
    const isValid =
      item &&
      typeof item.month === 'string' &&
      typeof item.value === 'number' &&
      !isNaN(item.value) &&
      isFinite(item.value)

    return isValid
  })

  if (validData.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }
  const createGradient = () => {
    if (!fill) return 'transparent'

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, getChartColorRgba(colorIndex, 0.15))
        gradient.addColorStop(1, getChartColorRgba(colorIndex, 0.01))
        return gradient
      }
    } catch (error) {
      console.warn('Failed to create chart gradient:', error)
    }

    return getChartColorRgba(colorIndex, 0.1)
  }

  return {
    labels: validData.map((d) => d.month),
    datasets: [
      {
        label: 'Chart Data',
        data: validData.map((d) => d.value),
        borderColor: chartColor.value,
        backgroundColor: createGradient(),
        fill: fill,
        tension: 0.4,
        pointRadius: showPoints ? 4 : 0,
        pointHoverRadius: showPoints ? 8 : 0,
        pointBackgroundColor: chartColor.value,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: chartColor.value,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        borderWidth: 3,
        borderCapStyle: 'round' as const,
        borderJoinStyle: 'round' as const,
        pointStyle: 'circle',
        showLine: true,
        spanGaps: false,
      },
    ],
  }
})

const chartOptions = computed<ChartOptions<'line'>>(() => {
  const textColor = isDark.value ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.75)'

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: enableAnimation
      ? {
          duration: animationDuration,
          easing: animationEasing,
          delay: animationDelay,
        }
      : false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        axis: 'x',
        backgroundColor: isDark.value ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark.value ? '#ffffff' : '#000000',
        bodyColor: isDark.value ? '#e5e7eb' : '#374151',
        borderColor: chartColor.value || '#a855f7',
        borderWidth: 2,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
          weight: 'normal' as const,
        },
        displayColors: false,
        caretPadding: 8,
        filter: (tooltipItem) => {
          return tooltipItem.parsed.y !== null && tooltipItem.parsed.y !== undefined
        },
        callbacks: {
          title: (context) => {
            return context[0]?.label || 'Data Point'
          },
          label: (context) => {
            const value = context.parsed.y
            return `Value: ${typeof value === 'number' ? value.toLocaleString() : value}`
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
        },
        ticks: {
          color: textColor,
          font: {
            size: 13,
            weight: 'normal' as const,
          },
          padding: 8,
        },
        border: {
          display: true,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: showGrid,
        },
        ticks: {
          color: textColor,
          font: {
            size: 13,
            weight: 'normal' as const,
          },
          padding: 12,
          callback: (value) => {
            if (typeof value === 'number') {
              return value.toLocaleString()
            }
            return value
          },
        },
        border: {
          display: true,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
      axis: 'x',
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
      point: {
        radius: showPoints ? 4 : 0,
        hoverRadius: 8,
        hitRadius: 15,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
    onHover: (event, activeElements) => {
      if (event.native?.target) {
        ;(event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? 'pointer' : 'default'
      }
    },
  }
})
</script>
