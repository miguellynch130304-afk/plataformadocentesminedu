import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 p-6 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {course.weeks?.length || 0} semanas
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description || 'Sin descripción'}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {course.weeks?.reduce((acc, week) => acc + (week.lessons?.length || 0), 0) || 0} lecciones
          </div>
          <div className="text-blue-600 group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </Link>
  )
}
