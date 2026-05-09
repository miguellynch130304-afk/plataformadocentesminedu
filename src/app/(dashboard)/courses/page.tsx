import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Mis Cursos - Plataforma Docente'
}

const SPECIALTIES_ORGANIZED = [
  {
    category: 'EBR Inicial',
    items: [
      { id: 'ebr-inicial', name: 'EBR Inicial' }
    ]
  },
  {
    category: 'EBR Primaria',
    items: [
      { id: 'ebr-primary', name: 'EBR Primaria' },
      { id: 'ebr-primary-pef', name: 'EBR Primaria Educación Física' },
      { id: 'ebr-primary-aip', name: 'EBR Primaria Aula de Innovación Pedagógica' }
    ]
  },
  {
    category: 'EBR Secundaria',
    items: [
      { id: 'ebr-sec-comunicacion', name: 'Comunicación' },
      { id: 'ebr-sec-arte', name: 'Arte y Cultura' },
      { id: 'ebr-sec-ingles', name: 'Inglés como Lengua Extranjera', active: true },
      { id: 'ebr-sec-ciencia', name: 'Ciencia y Tecnología' },
      { id: 'ebr-sec-pef', name: 'Educación Física' },
      { id: 'ebr-sec-aip', name: 'Aula de Innovación Pedagógica' },
      { id: 'ebr-sec-matematica', name: 'Matemática' },
      { id: 'ebr-sec-trabajo', name: 'Educación para el Trabajo' },
      { id: 'ebr-sec-religiones', name: 'Educación Religiosa' },
      { id: 'ebr-sec-dpcc', name: 'Desarrollo Personal, Ciudadanía y Cívica' },
      { id: 'ebr-sec-sociales', name: 'Ciencias Sociales' }
    ]
  },
  {
    category: 'EBA Inicial',
    items: [
      { id: 'eba-inicial', name: 'EBA Inicial - Intermedio' }
    ]
  },
  {
    category: 'EBA Avanzado',
    items: [
      { id: 'eba-adv-comunicacion', name: 'Comunicación' },
      { id: 'eba-adv-arte', name: 'Arte y Cultura' },
      { id: 'eba-adv-ingles', name: 'Inglés' },
      { id: 'eba-adv-ciencia', name: 'Ciencia, Tecnología y Salud' },
      { id: 'eba-adv-pef', name: 'Educación Física' },
      { id: 'eba-adv-personal', name: 'Desarrollo Personal y Ciudadano' },
      { id: 'eba-adv-matematica', name: 'Matemática' },
      { id: 'eba-adv-trabajo', name: 'Educación para el Trabajo' },
      { id: 'eba-adv-religiones', name: 'Educación Religiosa' }
    ]
  },
  {
    category: 'EBE',
    items: [
      { id: 'ebe-especial', name: 'Educación Básica Especial Inicial/Primaria' }
    ]
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Mis Cursos</h1>
          <p className="text-slate-600 text-lg">Selecciona una especialidad para comenzar a estudiar o revisar tu progreso</p>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {SPECIALTIES_ORGANIZED.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3">
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map((specialty) => (
                  <Link
                    key={specialty.id}
                    href={specialty.active ? '/english' : '#'}
                    className={`group flex items-center gap-3 p-4 rounded-lg transition-all ${
                      specialty.active
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 cursor-pointer shadow-sm hover:shadow-md'
                        : 'bg-slate-100 hover:bg-slate-100 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <BookOpen className={`w-5 h-5 flex-shrink-0 ${
                      specialty.active ? 'text-blue-600' : 'text-slate-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate ${
                        specialty.active ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {specialty.name}
                      </h3>
                      {specialty.active && (
                        <p className="text-xs text-blue-600 mt-1">16 semanas - Disponible</p>
                      )}
                      {!specialty.active && (
                        <p className="text-xs text-slate-500 mt-1">Próximamente</p>
                      )}
                    </div>
                    {specialty.active && (
                      <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Información importante
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
              <span>Actualmente disponible: <strong>EBR Secundaria Inglés como Lengua Extranjera</strong> con 16 semanas de contenido especializado</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
              <span>Las demás especialidades se añadirán próximamente de acuerdo con el calendario de actualizaciones</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
              <span>Cada especialidad incluirá teoría, ejercicios prácticos, lecturas y evaluaciones</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
