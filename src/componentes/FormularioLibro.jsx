import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getAutores } from '../servicios/autores'
import { getGeneros } from '../servicios/generos'
import { getEditoriales } from '../servicios/editoriales'

function FormularioLibro({ libroInicial, onGuardar }) {
  const [datos, setDatos] = useState(libroInicial || {
    titulo: '', precio: '', stock: '', fechaPublicacion: '', portada: '', autorId: '', generoId: '', editorialId: ''
  })
  const [autores, setAutores] = useState([])
  const [generos, setGeneros] = useState([])
  const [editoriales, setEditoriales] = useState([])

  useEffect(() => {
    getAutores().then(res => setAutores(res.data))
    getGeneros().then(res => setGeneros(res.data))
    getEditoriales().then(res => setEditoriales(res.data))
  }, [])

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
        <Form.Label>Autor</Form.Label>
        <Form.Select name="autorId" value={datos.autorId} onChange={manejarCambio} required>
          <option value="">Seleccioná un autor</option>
          {autores.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select name="generoId" value={datos.generoId} onChange={manejarCambio} required>
          <option value="">Seleccioná un género</option>
          {generos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Editorial</Form.Label>
        <Form.Select name="editorialId" value={datos.editorialId} onChange={manejarCambio} required>
          <option value="">Seleccioná una editorial</option>
          {editoriales.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
        </Form.Select>
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