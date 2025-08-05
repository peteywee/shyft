import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/Auth'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
