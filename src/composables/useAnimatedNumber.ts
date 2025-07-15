import { computed, ref, watch } from 'vue'

/**
 * Animates a number from its previous value to a new value over a given duration.
 * @param target A function returning the target number to animate to
 * @param duration Animation duration in ms (default: 900)
 * @returns A ref with the animated number
 */
export function useAnimatedNumber(target: () => number, duration = 900) {
  const animated = ref(target())
  let animationFrame: number | null = null
  let startTime: number | null = null
  let startValue = animated.value
  let endValue = target()

  const targetValue = computed(target)

  function animate(now: number) {
    startTime ??= now
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    animated.value = Math.round(startValue + (endValue - startValue) * progress)
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      animated.value = endValue
      animationFrame = null
      startTime = null
    }
  }

  watch(targetValue, (newVal, oldVal) => {
    if (newVal === oldVal) return
    if (animationFrame) cancelAnimationFrame(animationFrame)
    startValue = animated.value
    endValue = newVal
    startTime = null
    animationFrame = requestAnimationFrame(animate)
  })

  return animated
}
