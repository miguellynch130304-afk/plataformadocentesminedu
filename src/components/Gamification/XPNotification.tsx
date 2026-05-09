'use client'

import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'

interface XPNotificationProps {
  amount: number
  message?: string
  isBonus?: boolean
  streak?: number
}

/**
 * Componente de notificación de XP
 * 
 * Se anima cuando aparece:
 * - Toast flotante arriba a la derecha
 * - Desaparece después de 2 segundos
 * - Color varía según cantidad XP
 * - Muestra emoji de racha si hay
 * 
 * Ejemplos:
 * <XPNotification amount={25} message="Respuesta correcta" streak={3} />
 * <XPNotification amount={50} isBonus={true} />
 */
export default function XPNotification({
  amount,
  message,
  isBonus = false,
  streak = 1
}: XPNotificationProps) {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  /**
   * Color basado en cantidad XP
   */
  const getColor = () => {
    if (amount >= 100) return 'text-yellow-500 border-yellow-500'
    if (amount >= 50) return 'text-orange-500 border-orange-500'
    if (amount >= 25) return 'text-green-500 border-green-500'
    return 'text-blue-500 border-blue-500'
  }

  /**
   * Emoji motivacional
   */
  const getEmoji = () => {
    if (streak >= 5) return '🔥'
    if (streak >= 3) return '🔥'
    if (isBonus) return '⭐'
    return '✨'
  }

  return (
    <div
      className={`fixed top-20 right-4 z-50 translate-y-0 transition-all duration-300 ${
        animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-96'
      }`}
    >
      <div className={`flex items-center gap-3 bg-white rounded-lg shadow-xl p-4 border-l-4 border-solid ${getColor()}`}>
        <div className={animate ? 'animate-bounce' : ''}>
          <Zap className={`w-6 h-6 ${getColor().split(' ')[0]}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold leading-none mb-1">
            <span className={getColor().split(' ')[0]}>+{amount} XP</span>
          </p>
          {message && <p className="text-xs text-gray-600">{message}</p>}
          {streak >= 3 && (
            <p className="text-xs font-semibold text-red-500 mt-1">
              {getEmoji()} ¡{streak} en racha!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
