'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface BlankOption {
  id: string
  text: string
}

interface FillInTheBlanksProps {
  number: number
  instructions: string
  sentence: string // Sentence with {blank} placeholders
  blanks: BlankOption[] // All options to choose from
  answers: Record<string, string> // { blank_id: correct_answer }
  explanation: string
  baseXP?: number
}

export default function FillInTheBlanks({
  number,
  instructions,
  sentence,
  blanks,
  answers,
  explanation,
  baseXP = 25
}: FillInTheBlanksProps) {
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  const { currentStreak, addXP, getMultiplier } = useXPSystem()
  
  const blankIds = Object.keys(answers)
  const shuffledBlanks = blanks.sort(() => Math.random() - 0.5)

  const checkAnswers = useCallback(() => {
    let correctCount = 0
    blankIds.forEach(blankId => {
      if (selected[blankId] === answers[blankId]) {
        correctCount++
      }
    })

    const allCorrect = correctCount === blankIds.length
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
        message: `¡Todos los espacios correctos! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [selected, answers, blankIds, baseXP, currentStreak, addXP, getMultiplier])

  const handleReset = () => {
    setSelected({})
    setShowResult(false)
  }

  // Build sentence with selectible blanks
  const parts = sentence.split(/(\{blank_\d+\})/)

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Perfecto!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg shadow-md p-6 mb-6 border-2 border-yellow-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Actividad {number}: Completar Espacios
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
              <span className="text-sm font-semibold">{isCorrect ? '¡Correcto!' : 'Revisa los espacios'}</span>
            </div>
          )}
        </div>

        {/* Sentence with Blanks */}
        <div className="bg-white rounded-lg p-6 mb-6 border-2 border-yellow-200">
          <p className="text-lg text-gray-800 leading-relaxed">
            {parts.map((part, index) => {
              if (part.startsWith('{blank_')) {
                const blankId = part.match(/\d+/)?.[0] || ''
                return (
                  <select
                    key={index}
                    value={selected[`blank_${blankId}`] || ''}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        [`blank_${blankId}`]: e.target.value
                      })
                    }
                    className={`inline-block mx-1 px-3 py-1 rounded border-2 font-semibold transition ${
                      showResult && selected[`blank_${blankId}`] === answers[`blank_${blankId}`]
                        ? 'border-green-400 bg-green-50 text-gray-800'
                        : showResult && selected[`blank_${blankId}`] && selected[`blank_${blankId}`] !== answers[`blank_${blankId}`]
                        ? 'border-red-400 bg-red-50 text-gray-800'
                        : 'border-yellow-300 bg-yellow-50 text-gray-800 hover:border-yellow-500'
                    }`}
                  >
                    <option value="">Selecciona...</option>
                    {shuffledBlanks.map(blank => (
                      <option key={blank.id} value={blank.text}>
                        {blank.text}
                      </option>
                    ))}
                  </select>
                )
              }
              return part
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition"
          >
            Verificar
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
              {isCorrect ? '✓ ¡Todos los espacios son correctos!' : '✗ Revisa algunos espacios'}
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
