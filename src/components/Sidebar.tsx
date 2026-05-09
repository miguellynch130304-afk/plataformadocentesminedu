'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { BookOpen, LogOut, BarChart3, Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const navItems = [
    { href: '/courses', label: 'Mis Cursos', icon: BookOpen },
    { href: '/english', label: 'Inglés - Lecciones', icon: BookOpen },
    { href: '/progress', label: 'Progreso', icon: BarChart3 },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden z-50 p-2 hover:bg-gray-100 rounded-lg"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <BookOpen className="w-8 h-8" />
            Docentes
          </h1>
          <p className="text-blue-100 text-sm">MINEDU 2025</p>
        </div>

        <nav className="space-y-1 px-4 mt-8">
          {navItems.map((item) => {
            let Icon = item.icon
            if (item.href === '/english') {
              Icon = Globe
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-blue-700 font-semibold'
                    : 'hover:bg-blue-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-700 rounded-lg transition text-left"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}
    </>
  )
}
