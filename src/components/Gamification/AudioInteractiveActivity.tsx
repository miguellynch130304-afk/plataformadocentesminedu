'use client'

import { useState, useRef, useCallback } from 'react'
import { CheckCircle2, XCircle, Play, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface AudioOption {
  id: string
  label: string
  text: string
}

interface AudioInteractiveActivityProps {
  number: number
  audioUrl: string
  question: string
  options: AudioOption[]
  correctAnswer: string
  explanation: string
  baseXP?: number
}

export default function AudioInteractiveActivity({
  number,
  audioUrl,
  question,
  options,
  correctAnswer,
  explanation,
  baseXP = 25
}: AudioInteractiveActivityProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [playCount, setPlayCount] = useState(0)

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const handlePlayAudio = () => {
    audioRef.current?.play()
    setPlayCount(prev => prev + 1)
  }

  const checkAnswer = useCallback(() => {
    if (!selected) {
      alert('Por favor selecciona una opción')
      return
    }

    const correct = selected === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const multiplier = getMultiplier()
      const playPenalty = playCount > 3 ? 0.8 : 1
      const finalXP = Math.floor(baseXP * multiplier * playPenalty)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'exercise',
        amount: baseXP,
        message: `¡Correcto! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [selected, correctAnswer, baseXP, playCount, currentStreak, addXP, getMultiplier])

  const handleReset = () => {
    setSelected(null)
    setShowResult(false)
    setPlayCount(0)
  }

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Escuchaste bien!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-md p-6 mb-6 border-2 border-green-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Actividad {number}: Comprensión Auditiva
            </h3>
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

        {/* Audio Player */}
        <div className="bg-white rounded-lg p-6 mb-6 border-2 border-green-200">
          <audio ref={audioRef} src={audioUrl} className="w-full mb-4" />
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              <Play className="w-5 h-5" />
              Reproducir Audio
            </button>
            <p className="text-sm text-gray-600">Veces reproducido: {playCount}</p>
          </div>
          <p className="text-sm text-gray-600">
            💡 Puedes reproducir el audio varias veces. Bonus si lo haces en menos de 3 reproducciones.
          </p>
        </div>

        {/* Question */}
        <p className="text-gray-800 font-semibold mb-6 text-base">{question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map(option => (
            <label
              key={option.id}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-green-500 bg-green-50'
                  : showResult && option.id === correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : showResult && selected === option.id && !isCorrect
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <input
                type="radio"
                name={`audio-${number}`}
                value={option.id}
                checked={selected === option.id}
                onChange={() => {
                  setSelected(option.id)
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

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Verificar
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
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect ? '✓ Excelente comprensión' : '✗ Respuesta incorrecta'}
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
