import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Inglés - Ascenso de Escala y Nombramiento'
}

const PHASES = [
  {
    phase: 1,
    title: 'Foundations & Narrative Tenses',
    duration: 'Meses 1-2',
    weeks: [
      { number: 1, title: 'State vs. Action Verbs' },
      { number: 2, title: 'Present Perfect Simple vs. Continuous' },
      { number: 3, title: 'Narrative Tenses I' },
      { number: 4, title: 'Narrative Tenses II' },
      { number: 5, title: 'Used to / Would / Get used to' },
      { number: 6, title: 'Future Forms I' },
      { number: 7, title: 'Future Forms II' },
      { number: 8, title: 'Review & Integration' }
    ]
  },
  {
    phase: 2,
    title: 'Complex Structures & Modality',
    duration: 'Meses 3-4',
    weeks: [
      { number: 9, title: 'Modal Verbs of Ability & Permission' },
      { number: 10, title: 'Modals of Deduction (Present)' },
      { number: 11, title: 'Modals of Deduction (Past)' },
      { number: 12, title: 'The Passive Voice I' },
      { number: 13, title: 'The Passive Voice II' },
      { number: 14, title: 'Conditionals Zero & First' },
      { number: 15, title: 'Second & Third Conditionals' },
      { number: 16, title: 'Mixed Conditionals' }
    ]
  },
  {
    phase: 3,
    title: 'Advanced Syntax & Discourse',
    duration: 'Meses 5-6',
    weeks: [
      { number: 17, title: 'Reported Speech I' },
      { number: 18, title: 'Reported Speech II' },
      { number: 19, title: 'Relative Clauses' },
      { number: 20, title: 'Gerunds vs. Infinitives I' },
      { number: 21, title: 'Gerunds vs. Infinitives II' },
      { number: 22, title: 'Inversion for Emphasis' },
      { number: 23, title: 'Cleft Sentences' },
      { number: 24, title: 'Discourse Markers & Cohesion' }
    ]
  }
]

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Programa Independiente de Especialización</h1>
          <p className="text-xl text-slate-300">Ascenso de Escala y Nombramiento Docente - Inglés</p>
          <p className="text-sm text-slate-400 mt-4">Estructura diseñada para dominar el examen a tu propio ritmo</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Inmersión Disciplinar</h3>
            <p className="text-slate-600 text-sm">Análisis experto de gramática avanzada (C1) con documentos técnicos estructurados.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Laboratorio de Casuística</h3>
            <p className="text-slate-600 text-sm">Ejercicios reales del examen con justificación técnica de cada respuesta.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Autoevaluación</h3>
            <p className="text-slate-600 text-sm">Tests cronometrados para medir velocidad y precisión antes del examen.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-8">Selecciona una Semana para Comenzar</h2>

        {/* Phases Grid */}
        <div className="space-y-8">
          {PHASES.map((phase) => (
            <div key={phase.phase} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Phase Header */}
              <div className="bg-slate-100 px-6 py-4 border-l-4 border-blue-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Fase {phase.phase}: {phase.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{phase.duration}</p>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {phase.weeks.length} semanas
                  </span>
                </div>
              </div>

              {/* Weeks Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {phase.weeks.map((week) => (
                    <Link
                      key={week.number}
                      href={`/english/week/${week.number}`}
                      className="group"
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-4 border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl font-bold text-blue-600">{String(week.number).padStart(2, '0')}</span>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition">
                          {week.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Cómo proceder</h3>
          <ul className="text-slate-700 space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>Selecciona una semana del calendario anterior</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>Accede a la teoría y domina los conceptos clave</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>Realiza los ejercicios del laboratorio de casuística</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>Completa la autoevaluación antes de pasar a la siguiente semana</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
