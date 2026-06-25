import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contextos/ContextoAuth'
import api from '../servicios/api'

function FormularioResena({ libroId, onResenaAgregada }) {
  const { token } = useAuth()
  const [puntaje, setPuntaje] = useState(5)
  const [comentario, setComentario] = useState('')
  const [error, setError] = useState(null)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    try {
      await api.post('/resena', { libroId, puntaje, comentario }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComentario('')
      setPuntaje(5)
      onResenaAgregada()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la reseña')
    }
  }

  return (
    <Form onSubmit={manejarEnvio} className="mt-3">
      <h5>Dejá tu reseña</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Puntaje</Form.Label>
        <Form.Select value={puntaje} onChange={e => setPuntaje(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Comentario</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">Enviar reseña</Button>
    </Form>
  )
}

export default FormularioResena
