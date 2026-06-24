import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

function BarraBusqueda({ onBuscar }) {
  const [texto, setTexto] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()
    onBuscar(texto)
  }

  return (
    <Form onSubmit={manejarEnvio}>
      <InputGroup>
        <Form.Control
          placeholder="Buscar por título o autor..."
          value={texto}
          onChange={e => setTexto(e.target.value)}
        />
        <Button type="submit" variant="primary">Buscar</Button>
      </InputGroup>
    </Form>
  )
}

export default BarraBusqueda