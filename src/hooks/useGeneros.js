import { useState, useEffect } from 'react'
import { getGeneros } from '../servicios/generos'

export function useGeneros() {
  const [generos, setGeneros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getGeneros()
      .then(res => setGeneros(res.data))
      .catch(err => setError(err))
      .finally(() => setCargando(false))
  }, [])

  return { generos, cargando, error }
}