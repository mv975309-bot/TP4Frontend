import { createContext, useState, useContext } from 'react'

const ContextoAuth = createContext()

export function ProveedorAuth({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario')
    return guardado ? JSON.parse(guardado) : null
  })
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const iniciarSesion = (datos, jwt) => {
    setUsuario(datos)
    setToken(jwt)
    localStorage.setItem('token', jwt)
    localStorage.setItem('usuario', JSON.stringify(datos))
  }

  const cerrarSesion = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return (
    <ContextoAuth.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  )
}

export const useAuth = () => useContext(ContextoAuth)