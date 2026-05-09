import { BarChart3, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Mi Progreso - Plataforma Docente'
}

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8" />
            Mi Progreso
          </h1>
          <p className="text-gray-600">
            Visualiza tu desempeño en todos los cursos
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Cursos totales</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lecciones completadas</p>
                <p className="text-3xl font-bold text-green-600 mt-1">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Progreso promedio</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">55%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Progreso por curso</h2>

          <div className="space-y-6">
            {[
              { title: 'Matemáticas — Escala Docente 2025', progress: 75 },
              { title: 'Lenguaje y Literatura', progress: 45 },
              { title: 'Ciencias Sociales', progress: 35 }
            ].map((course, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <span className="text-sm font-bold text-gray-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <p className="text-gray-700">
            <span className="font-semibold">📊 Próximamente:</span> Reportes detallados, análisis de rendimiento y recomendaciones personalizadas.
          </p>
        </div>
      </div>
    </div>
  )
}
