'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface DragItem {
  id: string
  text: string
  correctPosition: number
}

interface InteractiveDragDropProps {
  number: number
  instructions: string
  items: DragItem[]
  explanation: string
  baseXP?: number
}

export default function InteractiveDragDrop({
  number,
  instructions,
  items,
  explanation,
  baseXP = 30
}: InteractiveDragDropProps) {
  const [order, setOrder] = useState<string[]>(items.map(i => i.id).sort(() => Math.random() - 0.5))
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const checkAnswer = useCallback(() => {
    const isCurrentlyCorrect = order.every((id, index) => {
      const item = items.find(i => i.id === id)
      return item?.correctPosition === index
    })

    setIsCorrect(isCurrentlyCorrect)
    setShowResult(true)
    setAttempts(prev => prev + 1)

    if (isCurrentlyCorrect) {
      // Calcular XP con penalidad si hay intentos
      const multiplier = getMultiplier()
      const attemptPenalty = attempts > 0 ? 0.7 : 1
      const finalXP = Math.floor(baseXP * multiplier * attemptPenalty)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'exercise',
        amount: baseXP,
        message: `¡Orden correcto! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [order, items, baseXP, attempts, currentStreak, addXP, getMultiplier])

  const handleDragStart = (id: string) => {
    setDraggedItem(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = order.indexOf(draggedItem)
    const targetIndex = order.indexOf(targetId)

    const newOrder = [...order]
    ;[newOrder[draggedIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[draggedIndex]]

    setOrder(newOrder)
    setDraggedItem(null)
    setShowResult(false)
  }

  const handleReset = () => {
    setOrder(items.map(i => i.id).sort(() => Math.random() - 0.5))
    setShowResult(false)
    setAttempts(0)
    setDraggedItem(null)
  }

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Correcto!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 mb-6 border-2 border-purple-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Actividad {number}: Dragón & Drop
            </h3>
            <p className="text-sm text-gray-600 mt-1">{instructions}</p>
          </div>
          {showResult && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span className="text-sm font-semibold">{isCorrect ? '¡Correcto!' : 'Intenta de nuevo'}</span>
            </div>
          )}
        </div>

        {/* Drag & Drop Area */}
        <div className="space-y-3 mb-6">
          {order.map((id) => {
            const item = items.find(i => i.id === id)
            return (
              <div
                key={id}
                draggable
                onDragStart={() => handleDragStart(id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(id)}
                className={`p-4 rounded-lg border-2 cursor-move transition ${
                  draggedItem === id
                    ? 'opacity-50 border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-purple-400 hover:shadow-md'
                }`}
              >
                <p className="text-gray-700">{item?.text}</p>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Verificar Orden
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </button>
        </div>

        {/* Result */}
        {showResult && (
          <div
            className={`rounded-lg p-4 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-orange-50 border border-orange-200'
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-orange-800'
              }`}
            >
              {isCorrect ? '✓ Excelente orden' : '✗ Revisa el orden'}
            </p>
            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
              {explanation}
            </p>
            {isCorrect && (
              <p className="text-xs text-green-600 mt-2 font-semibold">
                +{earnedXP} XP • Racha: {currentStreak + 1}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
