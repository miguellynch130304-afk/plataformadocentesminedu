import LoginForm from '@/components/LoginForm'

export const metadata = {
  title: 'Inicio de sesión - Plataforma Docente'
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}
