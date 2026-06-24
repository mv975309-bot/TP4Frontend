import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function FormularioLibro({ libroInicial, onGuardar }) {
  const [datos, setDatos] = useState(libroInicial || {
    titulo: '', precio: '', stock: '', fechaPublicacion: '', portada: ''
  })

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    onGuardar(datos)
  }

  return (
    <Form onSubmit={manejarEnvio}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control name="titulo" value={datos.titulo} onChange={manejarCambio} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control name="precio" type="number" value={datos.precio} onChange={manejarCambio} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control name="stock" type="number" value={datos.stock} onChange={manejarCambio} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fecha de publicación</Form.Label>
        <Form.Control name="fechaPublicacion" type="date" value={datos.fechaPublicacion} onChange={manejarCambio} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL de portada</Form.Label>
        <Form.Control name="portada" value={datos.portada} onChange={manejarCambio} />
      </Form.Group>
      <Button type="submit" variant="primary">Guardar</Button>
    </Form>
  )
}

export default FormularioLibro