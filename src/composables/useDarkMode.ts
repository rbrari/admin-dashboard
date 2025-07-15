import { readonly, ref } from 'vue'

const isDark = ref(false)
const STORAGE_KEY = 'theme-mode'

export function useDarkMode() {
  const getSystemPreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const applyTheme = (dark: boolean) => {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  const initializeDarkMode = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const prefersDark = stored ? stored === 'true' : getSystemPreference()
    applyTheme(prefersDark)
  }

  const onSystemPreferenceChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches)
    }
  }

  const toggle = () => {
    const newValue = !isDark.value
    applyTheme(newValue)
    localStorage.setItem(STORAGE_KEY, String(newValue))
  }

  return {
    isDark: readonly(isDark),
    toggle,
    initializeDarkMode,
    onSystemPreferenceChange,
  }
}
