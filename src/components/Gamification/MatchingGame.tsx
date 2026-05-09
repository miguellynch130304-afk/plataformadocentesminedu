'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface MatchPair {
  id: string
  left: string
  right: string
}

interface MatchingGameProps {
  number: number
  instructions: string
  pairs: MatchPair[]
  explanation: string
  baseXP?: number
}

export default function MatchingGame({
  number,
  instructions,
  pairs,
  explanation,
  baseXP = 30
}: MatchingGameProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [shuffledRight, setShuffledRight] = useState(
    pairs.map(p => p.right).sort(() => Math.random() - 0.5)
  )

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const handleRightClick = (rightValue: string) => {
    if (!selectedLeft) return

    const newMatches = { ...matches, [selectedLeft]: rightValue }
    setMatches(newMatches)
    setSelectedLeft(null)
  }

  const handleLeftClick = (pairId: string) => {
    if (matches[pairId]) {
      const newMatches = { ...matches }
      delete newMatches[pairId]
      setMatches(newMatches)
    } else {
      setSelectedLeft(selectedLeft === pairId ? null : pairId)
    }
  }

  const checkMatches = useCallback(() => {
    let correctCount = 0
    pairs.forEach(pair => {
      if (matches[pair.id] === pair.right) {
        correctCount++
      }
    })

    const allCorrect = correctCount === pairs.length
    setIsCorrect(allCorrect)
    setShowResult(true)

    if (allCorrect) {
      const multiplier = getMultiplier()
      const finalXP = Math.floor(baseXP * multiplier)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'exercise',
        amount: baseXP,
        message: `¡Perfectas todas! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [matches, pairs, baseXP, currentStreak, addXP, getMultiplier])

  const handleReset = () => {
    setMatches({})
    setSelectedLeft(null)
    setShowResult(false)
    setShuffledRight(pairs.map(p => p.right).sort(() => Math.random() - 0.5))
  }

  const usedRight = Object.values(matches)

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Emparejamientos perfectos!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg shadow-md p-6 mb-6 border-2 border-cyan-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Actividad {number}: Emparejar
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

        {/* Matching Area */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Left Column */}
          <div className="space-y-2">
            {pairs.map(pair => (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                className={`w-full p-3 rounded-lg border-2 text-left font-semibold transition ${
                  selectedLeft === pair.id
                    ? 'border-blue-500 bg-blue-100 text-blue-900'
                    : matches[pair.id]
                    ? 'border-green-400 bg-green-50 text-gray-800'
                    : 'border-gray-300 bg-white hover:border-blue-400 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{pair.left}</span>
                  {matches[pair.id] && <span className="text-green-600">✓</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {shuffledRight.map((rightValue) => {
              const isUsed = usedRight.includes(rightValue)
              const matchedPair = pairs.find(p => matches[p.id] === rightValue)
              return (
                <button
                  key={rightValue}
                  onClick={() => handleRightClick(rightValue)}
                  disabled={isUsed}
                  className={`w-full p-3 rounded-lg border-2 font-semibold transition ${
                    isUsed
                      ? 'border-green-400 bg-green-50 text-gray-500 opacity-60 cursor-not-allowed'
                      : selectedLeft
                      ? 'border-blue-400 bg-blue-50 hover:bg-blue-100 text-gray-800 cursor-pointer'
                      : 'border-gray-300 bg-white text-gray-800'
                  }`}
                >
                  {rightValue}
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 bg-white rounded-lg p-3 text-sm font-semibold text-gray-700">
          Emparejados: {Object.keys(matches).length} / {pairs.length}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkMatches}
            disabled={Object.keys(matches).length < pairs.length}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            Verificar Todo
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>

        {/* Result */}
        {showResult && (
          <div
            className={`rounded-lg p-4 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect ? '✓ ¡Todos los emparejamientos son correctos!' : '✗ Algunos emparejamientos son incorrectos'}
            </p>
            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
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
