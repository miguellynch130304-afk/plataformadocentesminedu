'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Lightbulb, Headphones, FileText } from 'lucide-react'
import ExerciseCard from '@/components/ExerciseCard'
import InteractiveDragDrop from '@/components/Gamification/InteractiveDragDrop'
import SentenceBuilder from '@/components/Gamification/SentenceBuilder'
import MatchingGame from '@/components/Gamification/MatchingGame'
import FillInTheBlanks from '@/components/Gamification/FillInTheBlanks'
import AudioInteractiveActivity from '@/components/Gamification/AudioInteractiveActivity'
import InteractiveReading from '@/components/Gamification/InteractiveReading'
import CaseAnalysisLaboratory from '@/components/Gamification/CaseAnalysisLaboratory'

const WEEK_TITLES: Record<number, string> = {
  1: 'State vs. Action Verbs',
  2: 'Present Perfect Simple vs. Continuous',
  3: 'Narrative Tenses I',
  4: 'Narrative Tenses II',
  5: 'Used to / Would / Get used to',
  6: 'Future Forms I',
  7: 'Future Forms II',
  8: 'Review & Integration',
  9: 'Modal Verbs of Ability & Permission',
  10: 'Modals of Deduction (Present)',
  11: 'Modals of Deduction (Past)',
  12: 'The Passive Voice I',
  13: 'The Passive Voice II',
  14: 'Conditionals Zero & First',
  15: 'Second & Third Conditionals',
  16: 'Mixed Conditionals',
  17: 'Reported Speech I',
  18: 'Reported Speech II',
  19: 'Relative Clauses',
  20: 'Gerunds vs. Infinitives I',
  21: 'Gerunds vs. Infinitives II',
  22: 'Inversion for Emphasis',
  23: 'Cleft Sentences',
  24: 'Discourse Markers & Cohesion'
}

interface PageProps {
  params: Promise<{ weekNumber: string }>
}

export default function WeekPage({ params }: PageProps) {
  const { weekNumber } = use(params)
  const weekNum = parseInt(weekNumber)
  const title = WEEK_TITLES[weekNum] || 'Semana'
  const [activeTab, setActiveTab] = useState('theory')

  const tabs = [
    { id: 'theory', label: 'Teoría', icon: BookOpen },
    { id: 'practice', label: 'Laboratorio', icon: Lightbulb },
    ...(weekNum === 16 ? [
      { id: 'reading', label: 'Lectura', icon: FileText },
      { id: 'listening', label: 'Audición', icon: Headphones }
    ] : [])
  ]

  const renderContent = () => {
    if (activeTab === 'theory') {
      if (weekNum === 16) return <Theory16 />
      return <Placeholder type="Teoría" />
    }
    if (activeTab === 'practice') {
      if (weekNum === 16) return <Practice16 />
      return <Placeholder type="Laboratorio" />
    }
    if (activeTab === 'reading' && weekNum === 16) return <Reading16 />
    if (activeTab === 'listening' && weekNum === 16) return <Listening16 />
    return <Placeholder type="Contenido" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/english"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al índice
          </Link>
          
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">Semana {String(weekNum).padStart(2, '0')}</p>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200 -mb-px flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  )
}

function Placeholder({ type }: { type: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center py-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{type} en Construcción</h2>
      <p className="text-slate-600">El contenido para esta semana estará disponible próximamente.</p>
    </div>
  )
}

function Theory16() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Concepto Fundamental</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Los <strong>Mixed Conditionals</strong> conectan una condición de una época con un resultado de otra. 
          A diferencia del Third Conditional que ocurre netamente en el pasado, aquí imaginamos una conexión temporal distinta 
          entre la premisa y la consecuencia.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
          <p className="text-blue-900 font-semibold mb-2">Nota clave:</p>
          <p className="text-blue-800">
            La idea es que la causa y el resultado no están en el mismo tiempo. Una ocurrió en el pasado 
            y afecta el presente, o viceversa.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Estructura Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Pasado → Presente</h3>
            <p className="text-green-800 font-mono text-sm mb-3">If + Past Perfect, would + base verb</p>
            <p className="text-green-700 text-sm">
              La condición ocurrió en el pasado, pero el resultado sigue siendo visible en el presente.
            </p>
            <p className="text-green-700 text-sm mt-3 italic">
              Si hubiera (ayer) → sería (hoy)
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Presente → Pasado</h3>
            <p className="text-orange-800 font-mono text-sm mb-3">If + Past Simple, would have + past participle</p>
            <p className="text-orange-700 text-sm">
              La condición es una situación actual irreal, pero el resultado mira al pasado.
            </p>
            <p className="text-orange-700 text-sm mt-3 italic">
              Si fuera (hoy) → habría sido (ayer)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ejemplos Detallados</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-slate-300 pl-4 py-2">
            <p className="text-slate-700 mb-2 font-semibold">Pasado → Presente</p>
            <p className="text-slate-600 italic mb-2">
              "If the food industry had promoted healthier products earlier, obesity rates would be lower today."
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">If-clause:</span> Past Perfect (had promoted) = condición pasada<br/>
              <span className="font-semibold">Main clause:</span> would be = resultado presente ("today")<br/>
              <span className="font-semibold">Lógica:</span> Si hubieran (ayer) → serían (ahora)
            </p>
          </div>

          <div className="border-l-4 border-slate-300 pl-4 py-2">
            <p className="text-slate-700 mb-2 font-semibold">Presente → Pasado</p>
            <p className="text-slate-600 italic mb-2">
              "If people were more informed now, they would have made better decisions years ago."
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">If-clause:</span> Past Simple (were) = condición irreal presente<br/>
              <span className="font-semibold">Main clause:</span> would have made = resultado pasado ("years ago")<br/>
              <span className="font-semibold">Lógica:</span> Si fueran (ahora) → habrían sido (antes)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Estrategia de Identificación</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">1</span>
            <span className="text-slate-700">Busca palabras clave: <strong>today, now, currently</strong> indica resultado presente</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">2</span>
            <span className="text-slate-700">Busca palabras clave: <strong>years ago, in the past, earlier</strong> indica resultado pasado</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">3</span>
            <span className="text-slate-700">Observa el tiempo del resultado, no de la condición</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">4</span>
            <span className="text-slate-700">Si es presente: usa <strong>would + verbo</strong>. Si es pasado: usa <strong>would have + participio</strong></span>
          </li>
        </ul>
      </section>

      <div className="bg-slate-100 rounded-lg p-6 mt-8">
        <p className="text-slate-700 text-sm">
          <span className="font-semibold">Consejo:</span> Domina estos Mixed Conditionals porque son frecuentes en textos 
          sobre problemas sociales y análisis de causas y efectos que el MINEDU utiliza en sus evaluaciones.
        </p>
      </div>
    </div>
  )
}

function Practice16() {
  const [laboratorySectionIndex, setLaboratorySectionIndex] = useState(0)

  const sections = [
    {
      id: 'warm-up',
      title: 'FASE 1: Diagnóstico Inicial',
      description: 'Identifica si cada oración es Pasado→Presente o Presente→Pasado'
    },
    {
      id: 'comprehension',
      title: 'FASE 2: Comprensión Profunda',
      description: 'Construye y analiza oraciones condicionales'
    },
    {
      id: 'application',
      title: 'FASE 3: Laboratorio Crítico',
      description: 'Analiza casos complejos de casuística'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">🧪 Laboratorio Interactivo de Mixed Conditionals</h2>
        <p className="text-purple-100">
          Experimenta con actividades dinámicas: arrastra, construye, empareja y analiza. ¡Como un verdadero lingüista!
        </p>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-2 border-b-2 border-gray-300 flex-wrap">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setLaboratorySectionIndex(idx)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 transition ${
              laboratorySectionIndex === idx
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {laboratorySectionIndex === 0 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Fase 1: Ordenar y Diagnosticar</h2>
            <p className="text-slate-600">Completa actividades interactivas para dominar los Mixed Conditionals</p>
          </div>

          {/* Actividad 1: Drag & Drop */}
          <InteractiveDragDrop
            number={1}
            instructions="Ordena las palabras para formar la oración correcta sobre Mixed Conditionals"
            items={[
              { id: 'if', text: 'If', correctPosition: 0 },
              { id: 'schools', text: 'schools', correctPosition: 1 },
              { id: 'had', text: 'had', correctPosition: 2 },
              { id: 'promoted', text: 'promoted', correctPosition: 3 },
              { id: 'exercise', text: 'exercise', correctPosition: 4 },
              { id: 'earlier', text: 'earlier,', correctPosition: 5 },
              { id: 'students', text: 'students', correctPosition: 6 },
              { id: 'would', text: 'would', correctPosition: 7 },
              { id: 'be', text: 'be', correctPosition: 8 },
              { id: 'healthier', text: 'healthier', correctPosition: 9 },
              { id: 'now', text: 'now.', correctPosition: 10 }
            ]}
            explanation="Esta es una estructura Pasado→Presente. La condición (had promoted) afecta el resultado presente (would be...now)."
            baseXP={30}
          />

          {/* Actividad 2: Matching Game */}
          <MatchingGame
            number={2}
            instructions="Empareja cada tipo de Mixed Conditional con su estructura correcta"
            pairs={[
              { id: 'pair1', left: 'Pasado → Presente', right: 'If + Past Perfect, would + verb' },
              { id: 'pair2', left: 'Presente → Pasado', right: 'If + Past Simple, would have + past participle' },
              { id: 'pair3', left: 'Palabra clave: "today"', right: 'Indica resultado presente' },
              { id: 'pair4', left: 'Palabra clave: "years ago"', right: 'Indica resultado pasado' }
            ]}
            explanation="Dominar estas estructuras es clave para identificar Mixed Conditionals en segundos."
            baseXP={30}
          />

          {/* Actividad 3: Sentence Builder */}
          <SentenceBuilder
            number={3}
            instructions="Construye la oración con Mixed Conditional correcta"
            words={['If', 'people', 'were', 'more', 'informed', 'now,', 'they', 'would', 'have', 'made', 'better', 'decisions', 'years', 'ago.']}
            correctSentence="If people were more informed now, they would have made better decisions years ago."
            explanation="Presente→Pasado: Si (hoy fueran más informados) → habrían hecho (ayer mejores decisiones). Nota el time shift."
            hint="La oración comienza con 'If people' y termina con 'ago.'"
            baseXP={35}
          />
        </div>
      )}

      {laboratorySectionIndex === 1 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Fase 2: Aplicación y Construcción</h2>
            <p className="text-slate-600">Completa espacios y construye tu comprensión</p>
          </div>

          {/* Actividad 4: Fill in the Blanks */}
          <FillInTheBlanks
            number={4}
            instructions="Completa los espacios con las opciones correctas"
            sentence="If nutrition labels {blank_1} clearer from the start, people {blank_2} better food choices {blank_3}."
            blanks={[
              { id: 'opt1', text: 'had been' },
              { id: 'opt2', text: 'were' },
              { id: 'opt3', text: 'would make' },
              { id: 'opt4', text: 'have made' },
              { id: 'opt5', text: 'today' },
              { id: 'opt6', text: 'yesterday' }
            ]}
            answers={{
              'blank_1': 'had been',
              'blank_2': 'would make',
              'blank_3': 'today'
            }}
            explanation="Pasado→Presente: Si (hubieran sido claras) → harían (hoy).  Base: Past Perfect → would + verb"
            baseXP={25}
          />

          {/* Actividad 5: Fill in the Blanks 2 */}
          <FillInTheBlanks
            number={5}
            instructions="Completa los espacios en este Mixed Conditional Presente→Pasado"
            sentence="If parents {blank_1} more guidance right now, they {blank_2} better parenting decisions {blank_3}."
            blanks={[
              { id: 'opt1', text: 'were receiving' },
              { id: 'opt2', text: 'would have received' },
              { id: 'opt3', text: 'would have made' },
              { id: 'opt4', text: 'will make' },
              { id: 'opt5', text: 'in the past' },
              { id: 'opt6', text: 'last year' }
            ]}
            answers={{
              'blank_1': 'were receiving',
              'blank_2': 'would have made',
              'blank_3': 'in the past'
            }}
            explanation="Presente→Pasado: Si (recibieran hoy) → habrían hecho (ayer). Base: Past Simple → would have + past participle"
            baseXP={25}
          />

          {/* Actividad 6: Sentence Builder 2 */}
          <SentenceBuilder
            number={6}
            instructions="Construye otra oración con Mixed Conditional sobre salud pública"
            words={['If', 'prevention', 'campaigns', 'had', 'started', 'earlier,', 'obesity', 'rates', 'would', 'be', 'lower', 'today.']}
            correctSentence="If prevention campaigns had started earlier, obesity rates would be lower today."
            explanation="Pasado→Presente: Si (hubieran comenzado antes) → serían (hoy más bajas). Estructura: If + Past Perfect, would + verb"
            hint="Comienza con 'If prevention' y termina con 'today.'"
            baseXP={35}
          />
        </div>
      )}

      {laboratorySectionIndex === 2 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Fase 3: Laboratorio de Casuística Crítica</h2>
            <p className="text-slate-600">Analiza casos complejos del mundo real como lo haría un experto</p>
          </div>

          <CaseAnalysisLaboratory
            number={7}
            caseTitle="Caso: Política de Salud Pública"
            caseDescription="En 2015, un país sudamericano tuvo la oportunidad de implementar campañas de prevención sobre nutrición. Los responsables decidieron no invertir en ello. Hoy (2026), las tasas de obesidad han aumentado en un 45%. Analiza cómo un Mixed Conditional describe esta situación."
            analyses={[
              {
                id: 'case1',
                question: '1. Escribe un Mixed Conditional que describa cómo habría sido diferente si hubieran invertido en 2015.',
                correctAnswer: 'If the government had invested in prevention campaigns in 2015, obesity rates would be lower today.',
                explanation: 'Esta es una estructura Pasado→Presente perfecta. La decisión pasada (no invertir / haber invertido) afecta la realidad presente (tasas altas / tasas bajas).'
              },
              {
                id: 'case2',
                question: '2. Identifica si esta oración es Presente→Pasado o Pasado→Presente: "If citizens were more informed today, they would have made better food choices years ago."',
                correctAnswer: 'Presente→Pasado',
                explanation: 'Correctamente identificado. La condición es presente (if citizens were today) pero el resultado es pasado (would have made...ago). Este patrón es menos común pero importante.'
              },
              {
                id: 'case3',
                question: '3. ¿Cuál es la principal diferencia entre Third Conditional y Mixed Conditional?',
                correctAnswer: 'Third Conditional: ambas (if-clause y resultado) en el pasado. Mixed: una en un tiempo y otra en otro.',
                explanation: 'Excelente comprensión. Third Conditional: "If they had invested, it would have worked." (todo pasado). Mixed: "If they had invested, it would work now." (pasado→presente).'
              }
            ]}
            labContextExplanation="Resuelve los 3 casos analíticos sobre Mixed Conditionals. Proporciona análisis detallado. Cada respuesta correcta suma 50 XP."
            baseXP={50}
          />
        </div>
      )}
    </div>
  )
}

function Reading16() {
  return (
    <div className="space-y-8">
      <InteractiveReading
        number={1}
        title="The Story of Sarah (Interactive)"
        text="Once upon a time, there was a young girl named Sarah. She was an avid {vocab_reader} and loved nothing more than getting lost in the pages of a book. She dreamed of becoming a {vocab_writer} one day. If she had given up after the first rejection, she would have never become a published {vocab_author}. But because she kept going, she was able to make her dream a {vocab_reality}."
        segments={[
          { id: 'reader', word: 'reader', translation: 'lector/a', definition: 'Persona que lee libros' },
          { id: 'writer', word: 'writer', translation: 'escritor/a', definition: 'Persona que escribe obras' },
          { id: 'author', word: 'author', translation: 'autor/a', definition: 'Escritor de libros publicados' },
          { id: 'reality', word: 'reality', translation: 'realidad', definition: 'Lo que existe o sucede' }
        ]}
        comprehensionQuestion="¿En qué tiempo verbal está el resultado de la oración condicional 'If she had given up, she would have never become...'?"
        comprehensionOptions={[
          { id: 'opt1', text: 'Pasado (would have become)' },
          { id: 'opt2', text: 'Presente (would be)' },
          { id: 'opt3', text: 'Futuro (will become)' }
        ]}
        comprehensionAnswer="opt1"
        baseXP={20}
      />

      <InteractiveReading
        number={2}
        title="Success Factors (Interactive)"
        text="Sarah realized that the key to achieving her dreams was {vocab_persistence} and {{vocab_dedication}}. If she had not believed in herself and her work, she would never have reached that level of {vocab_success}}. From that day on she wrote many books, and became a well-known {vocab_author}}, who now has her own {vocab_readers}} and {{vocab_fans}}."
        segments={[
          { id: 'persistence', word: 'persistence', translation: 'persistencia', definition: 'Continuidad y constancia' },
          { id: 'dedication', word: 'dedication', translation: 'dedicación', definition: 'Entrega completa a algo' },
          { id: 'success', word: 'success', translation: 'éxito', definition: 'Resultado favorable' },
          { id: 'author', word: 'author', translation: 'autor/a', definition: 'Creador de obras' },
          { id: 'readers', word: 'readers', translation: 'lectores', definition: 'Personas que leen' },
          { id: 'fans', word: 'fans', translation: 'admiradores', definition: 'Seguidores apasionados' }
        ]}
        comprehensionQuestion="¿Cuáles fueron los dos factores clave para el éxito de Sarah?"
        comprehensionOptions={[
          { id: 'opt1', text: 'Suerte y dinero' },
          { id: 'opt2', text: 'Persistencia y dedicación' },
          { id: 'opt3', text: 'Talento natural y fama' }
        ]}
        comprehensionAnswer="opt2"
        baseXP={20}
      />
    </div>
  )
}

function Listening16() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">🎧 Comprensión Auditiva Interactiva</h2>
        <p className="text-green-100">
          Escucha los audios y responde preguntas sobre Mixed Conditionals en contexto. 
          ¡Reproduce varias veces si es necesario!
        </p>
      </div>

      {/* Audio Activity 1 */}
      <AudioInteractiveActivity
        number={1}
        audioUrl="/audio/conditional-1.mp3"
        question="What does the speaker say about the past decision?"
        options={[
          { id: 'A', label: 'A', text: 'If they had invested earlier, the results would be better today' },
          { id: 'B', label: 'B', text: 'If they invest now, the results will be better in the future' },
          { id: 'C', label: 'C', text: 'They invested but the results are still bad' }
        ]}
        correctAnswer="A"
        explanation="El audio usa Pasado→Presente: 'Si hubieran invertido antes, los resultados serían mejores hoy'. Identifica cómo una decisión pasada conecta con la realidad presente."
        baseXP={25}
      />

      {/* Audio Activity 2 */}
      <AudioInteractiveActivity
        number={2}
        audioUrl="/audio/conditional-2.mp3"
        question="Which Mixed Conditional structure is used?"
        options={[
          { id: 'A', label: 'A', text: 'Pasado→Presente (If + Past Perfect, would + verb)' },
          { id: 'B', label: 'B', text: 'Presente→Pasado (If + Past Simple, would have + past participle)' },
          { id: 'C', label: 'C', text: 'Third Conditional (todo en pasado)' }
        ]}
        correctAnswer="B"
        explanation="El audio usa Presente→Pasado: 'Si tu fueras más informado ahora, habrías tomado mejores decisiones ayer'. La condición es presente (irreali) pero el resultado es pasado."
        baseXP={25}
      />

      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-green-900 mb-2">💡 Consejos de Audición</h3>
        <ul className="text-green-800 space-y-2 text-sm">
          <li>• Escucha 1-2 veces sin presión</li>
          <li>• Identifica palabras clave (today, now, ago, years ago)</li>
          <li>• Nota el patrón de tiempos verbales</li>
          <li>• Reproduce nuevamente si no estás seguro</li>
          <li>• Bonus: Obtén más XP si acierta sin reproducir más de 2 veces</li>
        </ul>
      </div>
    </div>
  )
}
