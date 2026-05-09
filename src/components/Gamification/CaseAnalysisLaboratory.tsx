'use client'

import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react'
import XPNotification from './XPNotification'
import { useXPSystem } from '@/hooks/useXPSystem'

interface CaseAnalysis {
  id: string
  question: string
  correctAnswer: string
  explanation: string
}

interface CaseAnalysisLaboratoryProps {
  number: number
  caseTitle: string
  caseDescription: string
  analyses: CaseAnalysis[]
  labContextExplanation: string
  baseXP?: number
}

export default function CaseAnalysisLaboratory({
  number,
  caseTitle,
  caseDescription,
  analyses,
  labContextExplanation,
  baseXP = 50
}: CaseAnalysisLaboratoryProps) {
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showXPNotification, setShowXPNotification] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [completedAnalyses, setCompletedAnalyses] = useState(new Set<string>())

  const { currentStreak, addXP, getMultiplier } = useXPSystem()

  const currentAnalysis = analyses[currentAnalysisIndex]
  const progress = completedAnalyses.size / analyses.length

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentAnalysis.id]: answer
    })
  }

  const checkAnalysis = useCallback(() => {
    const response = answers[currentAnalysis.id]
    if (!response) {
      alert('Por favor proporciona una respuesta')
      return
    }

    // Simple check - in real scenario would need more sophisticated comparison
    const isCurrentlyCorrect =
      response.toLowerCase().includes(currentAnalysis.correctAnswer.toLowerCase()) ||
      currentAnalysis.correctAnswer.toLowerCase().includes(response.toLowerCase())

    setIsCorrect(isCurrentlyCorrect)
    setShowResult(true)

    if (isCurrentlyCorrect) {
      const newCompleted = new Set(completedAnalyses)
      newCompleted.add(currentAnalysis.id)
      setCompletedAnalyses(newCompleted)

      const multiplier = getMultiplier()
      const progressBonus = newCompleted.size === analyses.length ? 25 : 0
      const finalXP = Math.floor((baseXP + progressBonus) * multiplier)

      setEarnedXP(finalXP)
      setShowXPNotification(true)

      addXP({
        type: 'laboratory',
        amount: baseXP + progressBonus,
        message: `¡Análisis correcto! +${finalXP} XP`,
        streak: currentStreak + 1
      })

      setTimeout(() => setShowXPNotification(false), 2000)

      // Auto-advance after delay
      if (newCompleted.size < analyses.length) {
        setTimeout(() => {
          setCurrentAnalysisIndex(prev => prev + 1)
          setShowResult(false)
        }, 2000)
      }
    }
  }, [answers, currentAnalysis, completedAnalyses, analyses.length, baseXP, currentStreak, addXP, getMultiplier])

  const handleNextAnalysis = () => {
    if (currentAnalysisIndex < analyses.length - 1) {
      setCurrentAnalysisIndex(prev => prev + 1)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentAnalysisIndex(0)
    setAnswers({})
    setShowResult(false)
    setCompletedAnalyses(new Set())
  }

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message="¡Análisis excelente!"
          streak={currentStreak + 1}
        />
      )}

      <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-lg shadow-md p-6 mb-6 border-2 border-red-300">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Actividad {number}: Laboratorio de Casuística Crítica
          </h3>
          <p className="text-sm text-gray-600">{labContextExplanation}</p>
        </div>

        {/* Case Context */}
        <div className="bg-white rounded-lg p-6 mb-6 border-2 border-red-200">
          <h4 className="font-semibold text-gray-900 mb-2">{caseTitle}</h4>
          <p className="text-gray-700 leading-relaxed">{caseDescription}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">Progreso del Laboratorio</p>
            <p className="text-sm font-bold text-red-600">{completedAnalyses.size} / {analyses.length}</p>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-red-300">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Analysis */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 mb-6 border-2 border-orange-200">
          <p className="text-sm font-bold text-orange-700 mb-2">
            Pregunta {currentAnalysisIndex + 1} de {analyses.length}
          </p>
          <h5 className="text-base font-semibold text-gray-900 mb-4">{currentAnalysis.question}</h5>

          {/* Answer Textarea */}
          <textarea
            value={answers[currentAnalysis.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Escribe tu análisis aquí..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg resize-none focus:outline-none focus:border-orange-500 mb-4 min-h-32"
          />

          {/* Check Button */}
          {!showResult && (
            <button
              onClick={checkAnalysis}
              className="w-full px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              Verificar Análisis
            </button>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div
            className={`rounded-lg p-6 mb-6 ${
              isCorrect
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-red-50 border-2 border-red-300'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-800">¡Análisis correcto!</p>
                    <p className="text-green-700 text-sm mt-1">{currentAnalysis.explanation}</p>
                    <p className="text-xs text-green-600 font-semibold mt-2">
                      +{earnedXP} XP • Racha: {currentStreak + 1}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-red-800">Análisis incompleto</p>
                    <p className="text-red-700 text-sm mt-1">{currentAnalysis.explanation}</p>
                    <p className="text-red-600 text-xs font-semibold mt-2">
                      Respuesta esperada: {currentAnalysis.correctAnswer}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-4">
              {currentAnalysisIndex < analyses.length - 1 && (
                <button
                  onClick={handleNextAnalysis}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Siguiente Caso →
                </button>
              )}
              {currentAnalysisIndex === analyses.length - 1 && (
                <div className="w-full">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white text-center">
                    <p className="font-bold">🎉 ¡LABORATORIO COMPLETADO!</p>
                    <p className="text-sm mt-1">Excelente trabajo en el análisis de todos los casos.</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar Lab
              </button>
            </div>
          </div>
        )}

        {/* All Cases List */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">Estado de Casos:</p>
          <div className="space-y-2">
            {analyses.map((analysis, idx) => (
              <div
                key={analysis.id}
                className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
                  completedAnalyses.has(analysis.id)
                    ? 'border-green-400 bg-green-50'
                    : idx === currentAnalysisIndex
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {completedAnalyses.has(analysis.id) ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : idx === currentAnalysisIndex ? (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700 font-medium">Caso {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
