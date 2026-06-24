import { createContext, useState, useContext } from 'react'

const ContextoAuth = createContext()

export function ProveedorAuth({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const iniciarSesion = (datos, jwt) => {
    setUsuario(datos)
    setToken(jwt)
    localStorage.setItem('token', jwt)
  }

  const cerrarSesion = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <ContextoAuth.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  )
}

export const useAuth = () => useContext(ContextoAuth)