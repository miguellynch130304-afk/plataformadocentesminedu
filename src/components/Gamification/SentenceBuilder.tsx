'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface SentenceBuilderProps {
  number: number
  instructions: string
  words: string[]
  correctSentence: string
  explanation: string
  hint: string
  baseXP?: number
}

export default function SentenceBuilder({
  number,
  instructions,
  words,
  correctSentence,
  explanation,
  hint,
  baseXP = 35
}: SentenceBuilderProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>(
    words.sort(() => Math.random() - 0.5)
  )
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const handleSelectWord = (word: string) => {
    setSelectedWords([...selectedWords, word])
    setAvailableWords(availableWords.filter(w => w !== word))
  }

  const handleRemoveWord = (index: number) => {
    const word = selectedWords[index]
    setAvailableWords([...availableWords, word])
    setSelectedWords(selectedWords.filter((_, i) => i !== index))
  }

  const checkSentence = useCallback(() => {
    const builtSentence = selectedWords.join(' ').toLowerCase()
    const correct = builtSentence === correctSentence.toLowerCase()

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const multiplier = getMultiplier()
      const finalXP = Math.floor(baseXP * multiplier)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'exercise',
        amount: baseXP,
        message: `¡Oración perfecta! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [selectedWords, correctSentence, baseXP, currentStreak, addXP, getMultiplier])

  const handleReset = () => {
    setSelectedWords([])
    setAvailableWords(words.sort(() => Math.random() - 0.5))
    setShowResult(false)
    setShowHint(false)
  }

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Perfecto!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md p-6 mb-6 border-2 border-indigo-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Actividad {number}: Construir Oración
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

        {/* Selected Sentence */}
        <div className="bg-white rounded-lg p-4 mb-6 min-h-20 border-2 border-indigo-200">
          {selectedWords.length === 0 ? (
            <p className="text-gray-400 italic">Toca las palabras para construir la oración...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveWord(index)}
                  className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition"
                >
                  {word} ×
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Available Words */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Palabras disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word) => (
              <button
                key={word}
                onClick={() => handleSelectWord(word)}
                className="px-4 py-2 bg-white text-indigo-600 border-2 border-indigo-300 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={checkSentence}
            disabled={selectedWords.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            Verificar Oración
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold rounded-lg transition"
            >
              💡 Pista
            </button>
          )}
        </div>

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Pista:</span> {hint}
            </p>
          </div>
        )}

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
              {isCorrect ? '✓ ¡Oración perfecta!' : '✗ Oración incorrecta'}
            </p>
            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              Oración correcta: <span className="font-semibold">{correctSentence}</span>
            </p>
            <p className={`text-sm mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
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
