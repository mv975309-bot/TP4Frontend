import { useState, useEffect } from 'react'
import { getLibros } from '../servicios/libros'

export function useLibros(parametros) {
  const [libros, setLibros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    getLibros(parametros)
      .then(res => setLibros(res.data))
      .catch(err => setError(err))
      .finally(() => setCargando(false))
  }, [JSON.stringify(parametros)])

  return { libros, cargando, error }
}