import { useState, useEffect } from 'react'
import { getLibro } from '../servicios/libros'

export function useDetalleLibro(id) {
  const [libro, setLibro] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getLibro(id)
      .then(res => setLibro(res.data))
      .catch(err => setError(err))
      .finally(() => setCargando(false))
  }, [id])

  return { libro, cargando, error }
}