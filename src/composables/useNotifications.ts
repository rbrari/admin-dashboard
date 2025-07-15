import { toast } from 'vue-sonner'

export function useNotifications() {
  const notifyError = (message: string) => {
    toast.error(message)
  }

  const success = (message: string) => {
    toast.success(message)
  }

  return {
    notifyError,
    success,
  }
}
