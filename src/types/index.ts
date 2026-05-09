export type Role = 'ADMIN' | 'TEACHER'

export interface User {
  id: string
  name: string | null
  email: string
  role: Role
  createdAt: Date
}

export interface Course {
  id: string
  title: string
  description: string | null
  weeks: Week[]
}

export interface Week {
  id: string
  title: string
  order: number
  courseId: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content: string | null
  order: number
  weekId: string
  materials: Material[]
}

export interface Material {
  id: string
  name: string
  fileUrl: string
  type: 'PDF' | 'LINK'
  lessonId: string
}

export interface Session {
  user: {
    id: string
    name: string | null
    email: string
    role: Role
  }
}
