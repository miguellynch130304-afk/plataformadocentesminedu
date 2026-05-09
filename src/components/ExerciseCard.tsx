'use client'

import { useState } from 'react'
import { CheckCircle2, Lightbulb } from 'lucide-react'
import { useXPSystem } from '@/hooks/useXPSystem'
import XPNotification from '@/components/Gamification/XPNotification'

interface ExerciseOption {
  id: string
  label: string
  text: string
}

interface ExerciseCardProps {
  number: number
  question: string
  options: ExerciseOption[]
  correctAnswer: string
  hint: string
  explanation: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export default function ExerciseCard({
  number,
  question,
  options,
  correctAnswer,
  hint,
  explanation,
  difficulty = 'medium'
}: ExerciseCardProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  // Sistema XP gamificado
  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  /**
   * Calcula XP base según dificultad
   */
  const getBaseXP = (): number => {
    switch (difficulty) {
      case 'easy': return 15
      case 'medium': return 25
      case 'hard': return 35
    }
  }

  /**
   * Retorna color visual por dificultad
   */
  const getDifficultyColor = (): string => {
    switch (difficulty) {
      case 'easy': return 'border-green-500 from-green-50 to-green-100'
      case 'medium': return 'border-blue-500 from-blue-50 to-blue-100'
      case 'hard': return 'border-red-500 from-red-50 to-red-100'
    }
  }

  /**
   * Retorna label visual por dificultad
   */
  const getDifficultyLabel = (): string => {
    switch (difficulty) {
      case 'easy': return '🟢 FÁCIL'
      case 'medium': return '🔵 MEDIO'
      case 'hard': return '🔴 DIFÍCIL'
    }
  }

  const handleVerify = () => {
    if (!selected) {
      alert('Por favor selecciona una opción')
      return
    }

    const correct = selected === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      // Calcular XP con multiplicadores
      const baseXP = getBaseXP()
      const multiplier = getMultiplier()
      const finalXP = Math.floor(baseXP * multiplier)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      // Añadir XP al sistema
      addXP({
        type: 'exercise',
        amount: baseXP,
        message: `+${finalXP} XP`,
        streak: currentStreak + 1
      })

      // Ocultar notificación después de 2 segundos
      setTimeout(() => setShowXPNotification(false), 2000)
    } else {
      // En respuesta incorrecta, resetear racha (opcional)
      // resetStreak()
    }
  }

  return (
    <>
      {/* Notificación XP gamificada */}
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Respuesta correcta!"
          streak={currentStreak + 1}
        />
      )}

      <div className={`bg-gradient-to-br ${getDifficultyColor()} rounded-lg shadow-md p-6 mb-6 border-l-4 border-solid`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Ejercicio {number}
            </h3>
            <span className="text-xs font-semibold text-gray-600">
              {getDifficultyLabel()} • Base XP: {getBaseXP()}
            </span>
          </div>
          {showResult && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isCorrect
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {isCorrect ? 'Correcto' : 'Incorrecto'}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-800 font-semibold mb-6 text-base">{question}</p>

        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : showResult && option.id === correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : showResult && selected === option.id && !isCorrect
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`exercise-${number}`}
                value={option.id}
                checked={selected === option.id}
                onChange={(e) => {
                  setSelected(e.target.value)
                  setShowResult(false)
                }}
                className="w-4 h-4"
              />
              <span className="ml-3 text-gray-700">
                <span className="font-semibold">{option.label})</span> {option.text}
              </span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Ver pista
            </button>
          )}

          <button
            onClick={handleVerify}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Verificar
          </button>
        </div>

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">💡 Pista:</span> {hint}
            </p>
          </div>
        )}

        {showResult && (
          <div
            className={`rounded-lg p-4 ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect ? '✓ Respuesta correcta' : '✗ Respuesta incorrecta'}
            </p>
            <p
              className={`text-sm ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}
            >
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
