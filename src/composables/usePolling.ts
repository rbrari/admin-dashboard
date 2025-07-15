import { onUnmounted, ref, type Ref } from 'vue'

export interface UsePollingOptions<T> {
  fetchFn: () => Promise<T>
  interval: number
  autoStart?: boolean
  onError?: (error: Error) => void
  onSuccess?: (data: T) => void
}

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  start: () => void
  stop: () => void
}

export function usePolling<T>(options: UsePollingOptions<T>): UsePollingReturn<T> {
  const { fetchFn, interval, autoStart = false, onError, onSuccess } = options

  const data = ref<T | null>(null) as Ref<T | null>
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  let intervalId: number | null = null

  const fetchData = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      const result = await fetchFn()
      data.value = result
      onSuccess?.(result)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      error.value = errorObj
      onError?.(errorObj)
    } finally {
      isLoading.value = false
    }
  }

  const start = (): void => {
    if (intervalId !== null) return
    intervalId = setInterval(fetchData, interval)
  }

  const stop = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  if (autoStart) {
    fetchData().then(() => {
      start()
    })
  }

  onUnmounted(() => {
    stop()
  })

  return {
    data,
    isLoading,
    error,
    start,
    stop,
  }
}
