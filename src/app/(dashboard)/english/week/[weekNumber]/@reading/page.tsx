interface ReadingPageProps {
  params: Promise<{ weekNumber: string }>
}

export default async function ReadingPage({ params }: ReadingPageProps) {
  const { weekNumber } = await params
  const weekNum = parseInt(weekNumber)

  if (weekNum !== 16) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Lectura no disponible</h2>
          <p className="text-slate-600">Los materiales de lectura para esta semana estarán disponibles próximamente.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Reading Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Instrucciones de Lectura</h2>
        <p className="text-blue-800 text-sm">
          Lee el siguiente texto atentamente. Identifica todas las oraciones condicionales y clasifícalas. 
          Presta especial atención a los Mixed Conditionals donde la condición y el resultado pertenecen a diferentes épocas.
        </p>
      </div>

      {/* Reading Text */}
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

      {/* Analysis Tasks */}
      <div className="mt-8 bg-slate-100 rounded-lg p=6">
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
