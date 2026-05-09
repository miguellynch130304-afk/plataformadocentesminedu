'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface TextSegment {
  id: string
  word: string
  translation: string
  definition: string
}

interface InteractiveReadingProps {
  number: number
  title: string
  text: string // Marked with {vocab_id} for interactive words
  segments: TextSegment[]
  comprehensionQuestion: string
  comprehensionOptions: Array<{ id: string; text: string }>
  comprehensionAnswer: string
  baseXP?: number
}

export default function InteractiveReading({
  number,
  title,
  text,
  segments,
  comprehensionQuestion,
  comprehensionOptions,
  comprehensionAnswer,
  baseXP = 20
}: InteractiveReadingProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set())
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)
  const [showComprehension, setShowComprehension] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const handleWordClick = (wordId: string) => {
    const newSelected = new Set(selectedWords)
    if (newSelected.has(wordId)) {
      newSelected.delete(wordId)
    } else {
      newSelected.add(wordId)
    }
    setSelectedWords(newSelected)
  }

  const checkComprehension = useCallback(() => {
    if (!selectedAnswer) {
      alert('Por favor selecciona una opción')
      return
    }

    const correct = selectedAnswer === comprehensionAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const vocabBonus = selectedWords.size * 2
      const multiplier = getMultiplier()
      const finalXP = Math.floor((baseXP + vocabBonus) * multiplier)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'reading',
        amount: baseXP + vocabBonus,
        message: `¡Lectura completa! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)
    }
  }, [selectedAnswer, comprehensionAnswer, selectedWords.size, baseXP, currentStreak, addXP, getMultiplier])

  const getWordSegment = (id: string) => segments.find(s => s.id === id)

  // Parse text to find vocab markers
  const parts = text.split(/(\{vocab_\w+\})/)

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Lectura exitosa!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-lg shadow-md p-6 mb-6 border-2 border-purple-300">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Actividad {number}: {title}
          </h3>
        </div>

        {/* Reading Section */}
        {!showComprehension ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border-2 border-purple-200 leading-relaxed text-gray-800">
              {parts.map((part, index) => {
                if (part.startsWith('{vocab_')) {
                  const wordId = part.match(/vocab_(\w+)/)?.[1] || ''
                  const segment = getWordSegment(wordId)
                  if (!segment) return part

                  return (
                    <button
                      key={index}
                      onClick={() => handleWordClick(wordId)}
                      onMouseEnter={() => setHoveredWord(wordId)}
                      onMouseLeave={() => setHoveredWord(null)}
                      className={`relative inline cursor-pointer font-semibold ${
                        selectedWords.has(wordId)
                          ? 'bg-yellow-300 px-1 rounded'
                          : hoveredWord === wordId
                          ? 'bg-purple-200 px-1 rounded'
                          : 'text-purple-600 hover:bg-purple-100 px-1 rounded transition'
                      }`}
                    >
                      {segment.word}
                      {hoveredWord === wordId && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded p-2 whitespace-nowrap z-50">
                          <p className="font-semibold">{segment.translation}</p>
                          <p className="text-gray-300 text-xs mt-1">{segment.definition}</p>
                        </div>
                      )}
                    </button>
                  )
                }
                return part
              })}
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-800 mb-2">
                <span className="font-semibold">Vocabulario marcado:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedWords).map(id => {
                  const segment = getWordSegment(id)
                  return (
                    <div
                      key={id}
                      className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {segment?.word} ({segment?.translation})
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setShowComprehension(true)}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Pasar a Comprensión →
            </button>
          </div>
        ) : (
          /* Comprehension Section */
          <div className="space-y-6">
            <p className="text-gray-800 font-semibold text-base">{comprehensionQuestion}</p>

            <div className="space-y-3">
              {comprehensionOptions.map(option => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedAnswer === option.id
                      ? 'border-purple-500 bg-purple-50'
                      : showResult && option.id === comprehensionAnswer
                      ? 'border-green-500 bg-green-50'
                      : showResult && selectedAnswer === option.id && !isCorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`comprehension-${number}`}
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => {
                      setSelectedAnswer(option.id)
                      setShowResult(false)
                    }}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 text-gray-700">{option.text}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={checkComprehension}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Verificar
              </button>
              <button
                onClick={() => {
                  setShowComprehension(false)
                  setSelectedAnswer(null)
                  setShowResult(false)
                }}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
              >
                Volver a Lectura
              </button>
            </div>

            {showResult && (
              <div
                className={`rounded-lg p-4 ${
                  isCorrect
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <p
                  className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> ¡Comprensión perfecta!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> Revisional comprensión
                    </>
                  )}
                </p>
                {isCorrect && (
                  <p className="text-xs text-green-600 mt-2 font-semibold">
                    +{earnedXP} XP • Vocabulario: {selectedWords.size} palabras
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
