import { useState, useEffect } from 'react'
import { Container, Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap'
import FormularioLibro from '../componentes/FormularioLibro'
import Cargando from '../componentes/Cargando'
import { getLibros, crearLibro, editarLibro, eliminarLibro } from '../servicios/libros'
import { getAutores, crearAutor, editarAutor, eliminarAutor } from '../servicios/autores'
import { getGeneros, crearGenero, editarGenero, eliminarGenero } from '../servicios/generos'
import { getEditoriales, crearEditorial, editarEditorial, eliminarEditorial } from '../servicios/editoriales'
import { getUsuarios, eliminarUsuario } from '../servicios/usuarios'
import { StarFill } from 'react-bootstrap-icons'
import { useAuth } from '../contextos/ContextoAuth'
import api from '../servicios/api'

function PaginaAdmin() {
  const { token } = useAuth()
  const [libros, setLibros] = useState([])
  const [autores, setAutores] = useState([])
  const [generos, setGeneros] = useState([])
  const [editoriales, setEditoriales] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [resenas, setResenas] = useState([])
  const [cargando, setCargando] = useState(true)

  const [mostrarModal, setMostrarModal] = useState(false)
  const [tipoModal, setTipoModal] = useState(null)
  const [itemEditando, setItemEditando] = useState(null)
  const [datosForm, setDatosForm] = useState({})

  const cargarDatos = (inicial = false) => {
    if (inicial) setCargando(true)
    Promise.all([
      getLibros().then(res => setLibros(res.data)),
      getAutores().then(res => setAutores(res.data)),
      getGeneros().then(res => setGeneros(res.data)),
      getEditoriales().then(res => setEditoriales(res.data)),
      getUsuarios(token).then(res => setUsuarios(res.data)),
      api.get('/resena', { headers: { Authorization: `Bearer ${token}` } }).then(res => setResenas(res.data))
    ]).finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarDatos(true)
  }, [])

  const abrirModal = (tipo, item = null) => {
    setTipoModal(tipo)
    setItemEditando(item)
    setDatosForm(item || {})
    setMostrarModal(true)
  }

  const manejarGuardarLibro = async (datos) => {
    if (itemEditando) {
      await editarLibro(itemEditando.id, datos)
    } else {
      await crearLibro(datos)
    }
    setMostrarModal(false)
    cargarDatos()
  }

  const manejarGuardar = async () => {
    if (tipoModal === 'autor') {
      itemEditando ? await editarAutor(itemEditando.id, datosForm) : await crearAutor(datosForm)
    } else if (tipoModal === 'genero') {
      itemEditando ? await editarGenero(itemEditando.id, datosForm) : await crearGenero(datosForm)
    } else if (tipoModal === 'editorial') {
      itemEditando ? await editarEditorial(itemEditando.id, datosForm) : await crearEditorial(datosForm)
    }
    setMostrarModal(false)
    cargarDatos()
  }

  const manejarEliminar = async (tipo, id) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return
    if (tipo === 'libro') await eliminarLibro(id)
    else if (tipo === 'autor') await eliminarAutor(id)
    else if (tipo === 'genero') await eliminarGenero(id)
    else if (tipo === 'editorial') await eliminarEditorial(id)
    else if (tipo === 'usuario') await eliminarUsuario(id, token)
    else if (tipo === 'resena') await api.delete(`/resena/admin/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    cargarDatos()
  }

  const cambiarRol = async (id, rolActual) => {
    const nuevoRol = rolActual === 'admin' ? 'cliente' : 'admin'
    await api.put(`/usuarios/${id}`, { rol: nuevoRol }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    cargarDatos()
  }

  if (cargando) return <Cargando />

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Panel de administración</h2>
      <Tabs defaultActiveKey="libros">

        <Tab eventKey="libros" title="Libros">
          <div className="mt-3">
            <Button variant="primary" className="mb-3" onClick={() => abrirModal('libro')}>
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
                      <Button size="sm" variant="warning" onClick={() => abrirModal('libro', libro)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('libro', libro.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="autores" title="Autores">
          <div className="mt-3">
            <Button variant="primary" className="mb-3" onClick={() => abrirModal('autor')}>
              Nuevo autor
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Bio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autores.map(autor => (
                  <tr key={autor.id}>
                    <td>{autor.nombre}</td>
                    <td>{autor.bio}</td>
                    <td className="d-flex gap-2">
                      <Button size="sm" variant="warning" onClick={() => abrirModal('autor', autor)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('autor', autor.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="editoriales" title="Editoriales">
          <div className="mt-3">
            <Button variant="primary" className="mb-3" onClick={() => abrirModal('editorial')}>
              Nueva editorial
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {editoriales.map(editorial => (
                  <tr key={editorial.id}>
                    <td>{editorial.nombre}</td>
                    <td>{editorial.pais}</td>
                    <td className="d-flex gap-2">
                      <Button size="sm" variant="warning" onClick={() => abrirModal('editorial', editorial)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('editorial', editorial.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="generos" title="Géneros">
          <div className="mt-3">
            <Button variant="primary" className="mb-3" onClick={() => abrirModal('genero')}>
              Nuevo género
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generos.map(genero => (
                  <tr key={genero.id}>
                    <td>{genero.nombre}</td>
                    <td className="d-flex gap-2">
                      <Button size="sm" variant="warning" onClick={() => abrirModal('genero', genero)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('genero', genero.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="usuarios" title="Usuarios">
          <div className="mt-3">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant={usuario.rol === 'admin' ? 'warning' : 'success'}
                        onClick={() => cambiarRol(usuario.id, usuario.rol)}
                      >
                        {usuario.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('usuario', usuario.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="resenas" title="Reseñas">
          <div className="mt-3">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Libro</th>
                  <th>Usuario</th>
                  <th>Puntaje</th>
                  <th>Comentario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resenas.map(resena => (
                  <tr key={resena.id}>
                    <td>{resena.Libro?.titulo}</td>
                    <td>{resena.Usuario?.nombre}</td>
                    <td className="d-flex gap-1">
                      {Array.from({ length: resena.puntaje }).map((_, i) => (
                        <StarFill key={i} color="gold" />
                      ))}
                    </td>
                    <td>{resena.comentario}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => manejarEliminar('resena', resena.id)}>
                        Eliminar
                      </Button>
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
          <Modal.Title>{itemEditando ? 'Editar' : 'Nuevo'} {tipoModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tipoModal === 'libro' ? (
            <FormularioLibro libroInicial={itemEditando} onGuardar={manejarGuardarLibro} />
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={datosForm.nombre || ''}
                  onChange={e => setDatosForm({ ...datosForm, nombre: e.target.value })}
                />
              </Form.Group>
              {tipoModal === 'autor' && (
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={datosForm.bio || ''}
                    onChange={e => setDatosForm({ ...datosForm, bio: e.target.value })}
                  />
                </Form.Group>
              )}
              {tipoModal === 'editorial' && (
                <Form.Group className="mb-3">
                  <Form.Label>País</Form.Label>
                  <Form.Control
                    value={datosForm.pais || ''}
                    onChange={e => setDatosForm({ ...datosForm, pais: e.target.value })}
                  />
                </Form.Group>
              )}
              <Button variant="primary" onClick={manejarGuardar}>Guardar</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PaginaAdmin