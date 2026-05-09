interface ListeningPageProps {
  params: Promise<{ weekNumber: string }>
}

export default async function ListeningPage({ params }: ListeningPageProps) {
  const { weekNumber } = await params
  const weekNum = parseInt(weekNumber)

  if (weekNum !== 16) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Audición no disponible</h2>
          <p className="text-slate-600">Los materiales de audición para esta semana estarán disponibles próximamente.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Instructions */}
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

      {/* Listening Resource */}
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

      {/* Learning Objectives */}
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

      {/* Practice Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">Consejos para la Práctica de Audición</h3>
        <ol className="space-y-2 text-yellow-800 text-sm list-decimal list-inside">
          <li>Escucha el audio completo una primera vez sin pausar</li>
          <li>Intenta contestar las preguntas sin volver a escuchar</li>
          <li>Escucha nuevamente, ahora prestando atención a frases con condicionales</li>
          <li>Revisa tus respuestas y aprende de los errores</li>
          <li>Realiza este ejercicio 2-3 veces para reforzar comprensión</li>
        </ol>
      </div>

      {/* Connection to Semana 16 */}
      <div className="bg-slate-100 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Conexión con los Mixed Conditionals</h3>
        <p className="text-slate-700 text-sm mb-3">
          Aunque este test se enfoca en Second Conditionals (If I were a millionaire), los Mixed Conditionals 
          funcionan de manera similar en la audición. Busca frases donde la condición sea de una época y 
          el resultado de otra.
        </p>
        <p className="text-slate-700 text-sm font-semibold">
          Ejemplo que podrías escuchar: "If I had been born a millionaire, I would be a different person today."
        </p>
      </div>
    </div>
  )
}
