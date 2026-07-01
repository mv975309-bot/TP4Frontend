import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/ContextoAuth'

function RutaAdmin({ children }) {
  const { usuario } = useAuth()
  if (!usuario || usuario.rol !== 'admin') return <Navigate to="/" replace />
  return children
}

export default RutaAdmin
