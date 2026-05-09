import { useState, useCallback } from 'react'

interface XPEvent {
  type: 'quiz_correct' | 'checkpoint' | 'exercise' | 'bonus' | 'streak' | 'laboratory' | 'reading'
  amount: number
  message: string
  streak?: number
}

interface UseXPSystemReturn {
  totalXP: number
  currentStreak: number
  addXP: (event: XPEvent) => void
  resetStreak: () => void
  getMultiplier: () => number
}

/**
 * Hook para gestionar el sistema de XP y rachas
 * 
 * Características:
 * - Acumula XP totales
 * - Gestiona rachas (streaks)
 * - Calcula multipliers según racha
 * - Resetea racha cuando sea necesario
 */
export function useXPSystem(): UseXPSystemReturn {
  const [totalXP, setTotalXP] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  /**
   * Calcula el multiplicador basado en la racha actual
   * 1-2: x1.0 (sin bonus)
   * 3+: x1.5 (25% bonus)
   * 5+: x2.0 (100% bonus)
   */
  const getMultiplier = useCallback((): number => {
    if (currentStreak >= 5) return 2
    if (currentStreak >= 3) return 1.5
    return 1
  }, [currentStreak])

  /**
   * Añade XP al sistema con multiplicador de racha
   * Incrementa la racha visible
   */
  const addXP = useCallback((event: XPEvent) => {
    const multiplier = getMultiplier()
    const finalXP = Math.floor(event.amount * multiplier)

    setTotalXP((prev) => prev + finalXP)

    if (event.type !== 'bonus') {
      setCurrentStreak((prev) => prev + 1)
    }
  }, [getMultiplier])

  /**
   * Resetea la racha actual (cuando hay error)
   */
  const resetStreak = useCallback(() => {
    setCurrentStreak(0)
  }, [])

  return {
    totalXP,
    currentStreak,
    addXP,
    resetStreak,
    getMultiplier
  }
}
