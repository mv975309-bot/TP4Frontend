import { useState } from 'react'
import { Navbar, Nav, Container, Badge, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCarrito } from '../contextos/ContextoCarrito'
import { useAuth } from '../contextos/ContextoAuth'
import { Cart } from 'react-bootstrap-icons'

function BarraNavegacion() {
  const { items } = useCarrito()
  const { usuario, cerrarSesion } = useAuth()
  const cantidadItems = items.reduce((acc, i) => acc + i.cantidad, 0)
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">SVM Books</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/generos">Géneros</Nav.Link>
              {usuario?.rol === 'admin' && (
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              )}
            </Nav>
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/carrito">
                <Cart size={20} /><Badge bg="danger">{cantidadItems}</Badge>
              </Nav.Link>
              {usuario ? (
                <>
                  <span className="navbar-text me-2" style={{ fontSize: '0.85rem', color: 'var(--svm-muted)' }}>
                    {usuario.nombre}
                  </span>
                  <Nav.Link onClick={() => setMostrarModal(true)}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: '1px solid var(--svm-border)' }}>
          <Modal.Title style={{ fontFamily: 'Georgia, serif', color: 'var(--svm-rust)', fontWeight: 700 }}>
            Cerrar sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'var(--svm-text)' }}>
          ¿Estás seguro que querés cerrar sesión, <strong>{usuario?.nombre}</strong>?
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid var(--svm-border)' }}>
          <Button variant="outline-secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => { cerrarSesion(); setMostrarModal(false) }}
            style={{ background: 'var(--svm-rust)', border: 'none' }}
          >
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BarraNavegacion