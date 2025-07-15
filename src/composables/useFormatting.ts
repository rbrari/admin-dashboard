export function useFormatting() {
  const formatValue = (
    value: number,
    format: 'currency' | 'percentage' | 'number' = 'number',
  ): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
      case 'percentage':
        return `${Math.abs(value).toFixed(1)}%`
      case 'number':
        return new Intl.NumberFormat('en-US').format(value)
      default:
        return value.toString()
    }
  }

  const getFormatTypeFromColumn = (columnKey: string): 'currency' | 'percentage' | 'number' => {
    if (columnKey.includes('Conversion') || columnKey.toLowerCase().includes('conversion')) {
      return 'percentage'
    }
    if (
      columnKey.includes('MRR') ||
      columnKey.includes('ARR') ||
      columnKey.toLowerCase().includes('mrr') ||
      columnKey.toLowerCase().includes('arr')
    ) {
      return 'currency'
    }
    return 'number'
  }

  const getBenchmarkStatus = (
    value: number,
    benchmark: { target: number; unit: string },
  ): 'success' | 'warning' | 'error' => {
    if (value >= benchmark.target) return 'success'
    if (value >= benchmark.target * 0.8) return 'warning'
    return 'error'
  }

  const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-success'
    if (change < 0) return 'text-destructive'
    return 'text-muted-foreground'
  }

  return {
    formatValue,
    getFormatTypeFromColumn,
    getBenchmarkStatus,
    getChangeColor,
  }
}
