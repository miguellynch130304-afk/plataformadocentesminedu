'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, CheckCircle2, Circle, FileText, Link2, Download } from 'lucide-react'
import { Course, Week, Lesson, Material } from '@/types'

// Datos simulados
const COURSES_MAP: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Matemáticas — Escala Docente 2025',
    description: 'Preparación completa para el examen de escala docente.',
    weeks: [
      {
        id: 'w1',
        title: 'Semana 1: Álgebra y funciones',
        order: 1,
        courseId: '1',
        lessons: [
          {
            id: 'l1',
            title: 'Ecuaciones lineales',
            content: 'Resolución de ecuaciones de primer grado',
            order: 1,
            weekId: 'w1',
            materials: [
              {
                id: 'm1',
                name: 'Guía de ecuaciones',
                fileUrl: 'uploads/guia-ecuaciones.pdf',
                type: 'PDF',
                lessonId: 'l1'
              }
            ]
          },
          {
            id: 'l2',
            title: 'Sistemas de ecuaciones',
            content: 'Métodos: sustitución, eliminación, matriz',
            order: 2,
            weekId: 'w1',
            materials: []
          }
        ]
      },
      {
        id: 'w2',
        title: 'Semana 2: Geometría',
        order: 2,
        courseId: '1',
        lessons: [
          {
            id: 'l3',
            title: 'Triángulos y áreas',
            content: 'Propiedades, clasificación, cálculo de áreas',
            order: 1,
            weekId: 'w2',
            materials: []
          }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Lenguaje y Literatura',
    description: 'Estrategias didácticas para comunicación',
    weeks: []
  },
  '3': {
    id: '3',
    title: 'Ciencias Sociales',
    description: 'Historia y geografía',
    weeks: []
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CoursePage({ params }: PageProps) {
  const { id } = use(params)
  const course = COURSES_MAP[id]
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['w1']))
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Curso no encontrado</p>
      </div>
    )
  }

  const toggleWeek = (weekId: string) => {
    const newExpanded = new Set(expandedWeeks)
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId)
    } else {
      newExpanded.add(weekId)
    }
    setExpandedWeeks(newExpanded)
  }

  const toggleLessonCompletion = (lessonId: string) => {
    const newCompleted = new Set(completedLessons)
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId)
    } else {
      newCompleted.add(lessonId)
    }
    setCompletedLessons(newCompleted)
  }

  const totalLessons = course.weeks.reduce((acc, w) => acc + (w.lessons?.length || 0), 0)
  const completedCount = completedLessons.size

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header con botón atrás */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/courses"
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            {course.description && (
              <p className="text-gray-600 mt-1">{course.description}</p>
            )}
          </div>
        </div>

        {/* Progreso */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tu Progreso</h2>
            <span className="text-2xl font-bold text-blue-600">
              {totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedCount} de {totalLessons} lecciones completadas
          </p>
        </div>

        {/* Semanas */}
        <div className="space-y-4">
          {course.weeks.map((week) => (
            <div
              key={week.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleWeek(week.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {week.order}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {week.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedWeeks.has(week.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Lecciones */}
              {expandedWeeks.has(week.id) && (
                <div className="px-6 py-4 bg-gray-50 border-t space-y-3">
                  {week.lessons?.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <button
                            onClick={() => toggleLessonCompletion(lesson.id)}
                            className="flex items-start gap-3 w-full text-left"
                          >
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5 hover:text-gray-400" />
                            )}
                            <div>
                              <h4 className={`font-semibold ${
                                completedLessons.has(lesson.id)
                                  ? 'text-gray-500 line-through'
                                  : 'text-gray-900'
                              }`}>
                                {lesson.title}
                              </h4>
                              {lesson.content && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {lesson.content}
                                </p>
                              )}
                            </div>
                          </button>

                          {/* Materiales */}
                          {lesson.materials && lesson.materials.length > 0 && (
                            <div className="mt-3 ml-9 space-y-2">
                              {lesson.materials.map((material) => (
                                <div
                                  key={material.id}
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                                >
                                  {material.type === 'PDF' ? (
                                    <>
                                      <FileText className="w-4 h-4" />
                                      <span>{material.name}</span>
                                      <Download className="w-4 h-4" />
                                    </>
                                  ) : (
                                    <>
                                      <Link2 className="w-4 h-4" />
                                      <span>{material.name}</span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!week.lessons || week.lessons.length === 0) && (
                    <p className="text-gray-500 text-center py-4">
                      Sin lecciones en esta semana
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {course.weeks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">Este curso aún no tiene contenido</p>
          </div>
        )}
      </div>
    </div>
  )
}
