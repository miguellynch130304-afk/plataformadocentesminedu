import ExerciseCard from '@/components/ExerciseCard'

interface PracticepageProps {
  params: Promise<{ weekNumber: string }>
}

export default async function PracticePage({ params }: PracticepageProps) {
  const { weekNumber } = await params
  const weekNum = parseInt(weekNumber)

  // Ejercicios específicos para semana 16
  if (weekNum === 16) {
    const EXERCISES = [
      {
        number: 1,
        question: 'If schools had promoted exercise earlier, students _____ healthier now.',
        options: [
          { id: 'A', label: 'A', text: 'would have been' },
          { id: 'B', label: 'B', text: 'would be' },
          { id: 'C', label: 'C', text: 'are' }
        ],
        correctAnswer: 'B',
        hint: '"now" indica resultado presente. Pasado → Presente',
        explanation: 'Forma correcta: would be. La causa estó en el pasado (had promoted) y el resultado es presente (now). No uses "would have been" que sería pasado.'
      },
      {
        number: 2,
        question: 'If nutrition labels had been clearer, people _____ better choices today.',
        options: [
          { id: 'A', label: 'A', text: 'would make' },
          { id: 'B', label: 'B', text: 'would have made' },
          { id: 'C', label: 'C', text: 'made' }
        ],
        correctAnswer: 'A',
        hint: '"today" = presente. Observa que es un Mixed Conditional, no Third Conditional.',
        explanation: 'Forma correcta: would make. Aunque la condición es pasada (had been), el resultado es presente (today). El verbo en el resultado debe ser would + base.'
      },
      {
        number: 3,
        question: 'If prevention campaigns had started earlier, obesity rates _____ lower now.',
        options: [
          { id: 'A', label: 'A', text: 'would have been' },
          { id: 'B', label: 'B', text: 'would have' },
          { id: 'C', label: 'C', text: 'would be' }
        ],
        correctAnswer: 'C',
        hint: 'Busca la palabra "now" - es resultado presente.',
        explanation: 'Forma correcta: would be. Este es un patrón típico: Pasado → Presente = If + Past Perfect, would + base verb.'
      },
      {
        number: 4,
        question: 'If parents had received guidance earlier, they _____ more confident today.',
        options: [
          { id: 'A', label: 'A', text: 'would be' },
          { id: 'B', label: 'B', text: 'would have been' },
          { id: 'C', label: 'C', text: 'are' }
        ],
        correctAnswer: 'A',
        hint: '"today" = resultado presente.',
        explanation: 'Forma correcta: would be. Pasado (had received) afecta presente (today). Esta es la estructura clave del Mixed Conditional.'
      },
      {
        number: 5,
        question: 'If adults were more active, they _____ many health problems years ago.',
        options: [
          { id: 'A', label: 'A', text: 'would be' },
          { id: 'B', label: 'B', text: 'would have avoided' },
          { id: 'C', label: 'C', text: 'will avoid' }
        ],
        correctAnswer: 'B',
        hint: '"years ago" = pasado. La condición es presente irreal (Si fueran = hoy).',
        explanation: 'Forma correcta: would have avoided. Este es Presente → Pasado: If + Past Simple, would have + past participle. Si fueran (ahora) habrían evitado (antes).'
      },
      {
        number: 6,
        question: 'If people were more informed now, they _____ better diets in the past.',
        options: [
          { id: 'A', label: 'A', text: 'would choose' },
          { id: 'B', label: 'B', text: 'would have chosen' },
          { id: 'C', label: 'C', text: 'choose' }
        ],
        correctAnswer: 'B',
        hint: 'Observa: "now" (presente) + "in the past" (pasado) = es Presente → Pasado',
        explanation: 'Forma correcta: would have chosen. Las palabras clave te indican la estructura: Si estuvieran (hoy) habrían elegido (ayer).'
      },
      {
        number: 7,
        question: 'If the community were better educated today, it _____ prevention earlier.',
        options: [
          { id: 'A', label: 'A', text: 'would have supported' },
          { id: 'B', label: 'B', text: 'would support' },
          { id: 'C', label: 'C', text: 'will support' }
        ],
        correctAnswer: 'A',
        hint: '"today" + "earlier" = Presente → Pasado. Resultado en el pasado.',
        explanation: 'Forma correcta: would have supported. Si (presente) → resultado (pasado). Structure: If + Past Simple, would have + past participle.'
      },
      {
        number: 8,
        question: 'If the food industry had promoted healthier products earlier, obesity rates _____ lower today.',
        options: [
          { id: 'A', label: 'A', text: 'would be' },
          { id: 'B', label: 'B', text: 'would have been' },
          { id: 'C', label: 'C', text: 'were' }
        ],
        correctAnswer: 'A',
        hint: '"today" = presente. Aunque la condición sea pasada, el resultado es presente.',
        explanation: 'Forma correcta: would be. Este es el patrón Pasado → Presente más típico que verás en el examen sobre problemas sociales.'
      }
    ]

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
          {EXERCISES.map((exercise) => (
            <ExerciseCard
              key={exercise.number}
              number={exercise.number}
              question={exercise.question}
              options={exercise.options}
              correctAnswer={exercise.correctAnswer}
              hint={exercise.hint}
              explanation={exercise.explanation}
            />
          ))}
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

  // Contenido genérico para otras semanas
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Laboratorio en Construcción</h2>
        <p className="text-slate-600">Los ejercicios para esta semana estarán disponibles próximamente.</p>
      </div>
    </div>
  )
}
