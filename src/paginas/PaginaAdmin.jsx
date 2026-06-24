import { useState } from 'react'
import { Container, Tabs, Tab, Table, Button, Modal } from 'react-bootstrap'
import FormularioLibro from '../componentes/FormularioLibro'
import Cargando from '../componentes/Cargando'
import { useLibros } from '../hooks/useLibros'
import { crearLibro, editarLibro, eliminarLibro } from '../servicios/libros'

function PaginaAdmin() {
  const { libros, cargando } = useLibros()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [libroEditando, setLibroEditando] = useState(null)

  const abrirModalCrear = () => {
    setLibroEditando(null)
    setMostrarModal(true)
  }

  const abrirModalEditar = (libro) => {
    setLibroEditando(libro)
    setMostrarModal(true)
  }

  const manejarGuardar = async (datos) => {
    if (libroEditando) {
      await editarLibro(libroEditando.id, datos)
    } else {
      await crearLibro(datos)
    }
    setMostrarModal(false)
    window.location.reload()
  }

  const manejarEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      await eliminarLibro(id)
      window.location.reload()
    }
  }

  if (cargando) return <Cargando />

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Panel de administración</h2>
      <Tabs defaultActiveKey="libros">
        <Tab eventKey="libros" title="Libros">
          <div className="mt-3">
            <Button variant="primary" className="mb-3" onClick={abrirModalCrear}>
              Nuevo libro
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {libros.map(libro => (
                  <tr key={libro.id}>
                    <td>{libro.titulo}</td>
                    <td>${libro.precio}</td>
                    <td>{libro.stock}</td>
                    <td className="d-flex gap-2">
                      <Button size="sm" variant="warning" onClick={() => abrirModalEditar(libro)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar(libro.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{libroEditando ? 'Editar libro' : 'Nuevo libro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioLibro libroInicial={libroEditando} onGuardar={manejarGuardar} />
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PaginaAdmin