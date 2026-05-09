'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Lightbulb, Headphones, FileText } from 'lucide-react'
import ExerciseCard from '@/components/ExerciseCard'

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
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Laboratorio de Casuística Crítica</h2>
        <p className="text-slate-600">
          Resuelve los 8 ejercicios de Mixed Conditionals. Selecciona la opción correcta y verifica tu respuesta.
          Cada ejercicio incluye justificación técnica y estrategia de descarte.
        </p>
      </div>

      <div className="space-y-4">
        <ExerciseCard
          number={1}
          question="If schools had promoted exercise earlier, students _____ healthier now."
          options={[
            { id: 'A', label: 'A', text: 'would have been' },
            { id: 'B', label: 'B', text: 'would be' },
            { id: 'C', label: 'C', text: 'are' }
          ]}
          correctAnswer="B"
          hint='"now" indica resultado presente. Pasado → Presente'
          explanation='Forma correcta: would be. La causa estó en el pasado (had promoted) y el resultado es presente (now). No uses "would have been" que sería pasado.'
        />
        <ExerciseCard
          number={2}
          question="If nutrition labels had been clearer, people _____ better choices today."
          options={[
            { id: 'A', label: 'A', text: 'would make' },
            { id: 'B', label: 'B', text: 'would have made' },
            { id: 'C', label: 'C', text: 'made' }
          ]}
          correctAnswer="A"
          hint='"today" = presente. Observa que es un Mixed Conditional, no Third Conditional.'
          explanation='Forma correcta: would make. Aunque la condición es pasada (had been), el resultado es presente (today). El verbo en el resultado debe ser would + base.'
        />
        <ExerciseCard
          number={3}
          question="If prevention campaigns had started earlier, obesity rates _____ lower now."
          options={[
            { id: 'A', label: 'A', text: 'would have been' },
            { id: 'B', label: 'B', text: 'would have' },
            { id: 'C', label: 'C', text: 'would be' }
          ]}
          correctAnswer="C"
          hint='Busca la palabra "now" - es resultado presente.'
          explanation='Forma correcta: would be. Este es un patrón típico: Pasado → Presente = If + Past Perfect, would + base verb.'
        />
        <ExerciseCard
          number={4}
          question="If parents had received guidance earlier, they _____ more confident today."
          options={[
            { id: 'A', label: 'A', text: 'would be' },
            { id: 'B', label: 'B', text: 'would have been' },
            { id: 'C', label: 'C', text: 'are' }
          ]}
          correctAnswer="A"
          hint='"today" = resultado presente.'
          explanation='Forma correcta: would be. Pasado (had received) afecta presente (today). Esta es la estructura clave del Mixed Conditional.'
        />
        <ExerciseCard
          number={5}
          question="If adults were more active, they _____ many health problems years ago."
          options={[
            { id: 'A', label: 'A', text: 'would be' },
            { id: 'B', label: 'B', text: 'would have avoided' },
            { id: 'C', label: 'C', text: 'will avoid' }
          ]}
          correctAnswer="B"
          hint='"years ago" = pasado. La condición es presente irreal (Si fueran = hoy).'
          explanation='Forma correcta: would have avoided. Este es Presente → Pasado: If + Past Simple, would have + past participle. Si fueran (ahora) habrían evitado (antes).'
        />
        <ExerciseCard
          number={6}
          question="If people were more informed now, they _____ better diets in the past."
          options={[
            { id: 'A', label: 'A', text: 'would choose' },
            { id: 'B', label: 'B', text: 'would have chosen' },
            { id: 'C', label: 'C', text: 'choose' }
          ]}
          correctAnswer="B"
          hint='Observa: "now" (presente) + "in the past" (pasado) = es Presente → Pasado'
          explanation='Forma correcta: would have chosen. Las palabras clave te indican la estructura: Si estuvieran (hoy) habrían elegido (ayer).'
        />
        <ExerciseCard
          number={7}
          question="If the community were better educated today, it _____ prevention earlier."
          options={[
            { id: 'A', label: 'A', text: 'would have supported' },
            { id: 'B', label: 'B', text: 'would support' },
            { id: 'C', label: 'C', text: 'will support' }
          ]}
          correctAnswer="A"
          hint='"today" + "earlier" = Presente → Pasado. Resultado en el pasado.'
          explanation='Forma correcta: would have supported. Si (presente) → resultado (pasado). Structure: If + Past Simple, would have + past participle.'
        />
        <ExerciseCard
          number={8}
          question="If the food industry had promoted healthier products earlier, obesity rates _____ lower today."
          options={[
            { id: 'A', label: 'A', text: 'would be' },
            { id: 'B', label: 'B', text: 'would have been' },
            { id: 'C', label: 'C', text: 'were' }
          ]}
          correctAnswer="A"
          hint='"today" = presente. Aunque la condición sea pasada, el resultado es presente.'
          explanation='Forma correcta: would be. Este es el patrón Pasado → Presente más típico que verás en el examen sobre problemas sociales.'
        />
      </div>

      <div className="mt-8 bg-slate-100 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Resumen de Estrategia</h3>
        <ul className="text-slate-700 space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">•</span>
            <span>Busca palabras clave temporales primero</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">•</span>
            <span>Determina si el resultado es presente o pasado</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">•</span>
            <span>Aplica la estructura correspondiente</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-blue-600">•</span>
            <span>Evita confundir con Third Conditional (todo en pasado)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Reading16() {
  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Instrucciones de Lectura</h2>
        <p className="text-blue-800 text-sm">
          Lee el siguiente texto atentamente. Identifica todas las oraciones condicionales y clasifícalas. 
          Presta especial atención a los Mixed Conditionals donde la condición y el resultado pertenecen a diferentes épocas.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">The Story of Sarah</h2>

        <div className="prose prose-blue max-w-none text-slate-700 leading-relaxed space-y-4">
          <p>
            Once upon a time, there was a young girl named Sarah. She was an avid reader and loved nothing more 
            than getting lost in the pages of a book. She dreamed of becoming a writer one day, but she didn't think 
            it was possible. She often thought to herself, <span className="italic">"If only I had the time to write a book, 
            then I could become a writer."</span>
          </p>

          <p>
            But one day, Sarah's teacher assigned a writing project for the class and it was then when she realized 
            that if she set aside a little bit of time every day to work on her writing, she could turn her dream into reality. 
            So she began to write every day after school for a short period of time. She wrote about her adventures, her friends, 
            and her family.
          </p>

          <p>
            And as she wrote, her stories started to take shape, and before she knew it, she had written an entire novel. 
            She showed it to her teacher, who was impressed with her work and encouraged her to submit it to a publisher. 
            <span className="font-semibold text-blue-600">If she hadn't had that teacher that gave her an assignment, 
            she would have never started writing.</span>
          </p>

          <p>
            After a few rejections, one publisher finally accepted her book, and soon it was being read by people all over 
            the world. Sarah realized that the key to achieving her dreams was persistence and dedication. 
            <span className="font-semibold text-blue-600">If she had given up after the first rejection, she would have never 
            become a published author.</span> But because she kept going, she was able to make her dream a reality.
          </p>

          <p>
            From that day on she wrote many books, and became a well-known author, who now has her own readers and fans. 
            <span className="font-semibold text-blue-600">If she had not believed in herself and her work, she would never 
            have reached that level of success.</span>
          </p>

          <p>
            But also, <span className="font-semibold text-blue-600">if she hadn't spent her free time reading, she wouldn't 
            have developed the passion for writing.</span> And <span className="font-semibold text-blue-600">if the publisher 
            had not taken a chance on an unknown author like her, her book would have never been published.</span>
          </p>

          <p>
            Now, if she is invited to participate in a book fair, she will certainly go. When she receives a good review, 
            she will be very happy. If she sells out all her books, she will consider writing a new one. And if she wins 
            an award, she will be over the moon!
          </p>

          <p className="text-center text-2xl font-bold text-slate-600 mt-8">THE END</p>
        </div>
      </div>

      <div className="mt-8 bg-slate-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Tareas de Análisis</h3>
        <div className="space-y-4">
          <div className="bg-white rounded p-4 border-l-4 border-blue-600">
            <p className="font-semibold text-slate-900 mb-2">Tarea 1: Identificar Mixed Conditionals</p>
            <p className="text-slate-700 text-sm">
              Encontrarás varias oraciones resaltadas en azul. Estas son Mixed Conditionals. 
              Analiza cada una e identifica si es Pasado → Presente o Presente → Pasado.
            </p>
          </div>
          <div className="bg-white rounded p-4 border-l-4 border-blue-600">
            <p className="font-semibold text-slate-900 mb-2">Tarea 2: Estructura Verbal</p>
            <p className="text-slate-700 text-sm">
              Para cada Mixed Conditional, identifica: (a) la forma en el if-clause, (b) la forma en el resultado, 
              (c) si es Pasado → Presente o Presente → Pasado.
            </p>
          </div>
          <div className="bg-white rounded p-4 border-l-4 border-blue-600">
            <p className="font-semibold text-slate-900 mb-2">Tarea 3: Reescritura</p>
            <p className="text-slate-700 text-sm">
              Reescribe dos de los Mixed Conditionals del texto con palabras diferentes, manteniendo 
              la misma estructura y lógica temporal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Listening16() {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-green-900 mb-2">Actividad de Audición</h2>    
        <p className="text-green-800 text-sm mb-3">
          Accede al test de audición del sitio Test English. Este test se enfoca en el Second Conditional, 
          pero es excelente práctica para entender cómo se usan los condicionales en inglés hablado.
        </p>
        <p className="text-green-800 text-sm font-semibold mb-3">
          Tema: "If I Were a Millionaire" - A2 Level English Listening Test
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Recurso de Audición Oficial</h3>
        
        <div className="bg-slate-50 rounded-lg p-6 mb-6">
          <p className="text-slate-700 mb-3 font-semibold">Test English - A2 Listening</p>
          <p className="text-slate-600 text-sm mb-4">
            El siguiente enlace te lleva a Test English, una plataforma oficial con pruebas de audición auténticas.
          </p>
          
          <a
            href="https://test-english.com/listening/a2/if-i-were-a-millionaire-second-conditional-a2-english-listening-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Acceder al Test de Audición
          </a>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-semibold mb-1">Nota:</p>
          <p>
            Este test es a nivel A2, pero contiene estructuras de condicionales que son fundamentales. 
            Aunque el enfoque es Second Conditional, verás la aplicación en contexto real de habla inglesa.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Objetivos de la Audición</h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full text-center text-xs font-bold flex-shrink-0 flex items-center justify-center">✓</span>
            <span className="text-slate-700">Reconocer condicionales en el habla natural inglesa</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full text-center text-xs font-bold flex-shrink-0 flex items-center justify-center">✓</span>
            <span className="text-slate-700">Diferenciar entre Second y Mixed Conditionals en contexto</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full text-center text-xs font-bold flex-shrink-0 flex items-center justify-center">✓</span>
            <span className="text-slate-700">Mejorar la comprensión auditiva con velocidad natural</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full text-center text-xs font-bold flex-shrink-0 flex items-center justify-center">✓</span>
            <span className="text-slate-700">Practicar la identificación de respuestas correctas en pruebas auditivas</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
