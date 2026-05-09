interface TheorypageProps {
  params: Promise<{ weekNumber: string }>
}

export default async function TheoryPage({ params }: TheorypageProps) {
  const { weekNumber } = await params
  const weekNum = parseInt(weekNumber)

  // Contenido específico para semana 16
  if (weekNum === 16) {
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

  // Contenido genérico para otras semanas
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Contenido en Construcción</h2>
        <p className="text-slate-600">La teoría para esta semana estará disponible próximamente.</p>
      </div>
    </div>
  )
}
