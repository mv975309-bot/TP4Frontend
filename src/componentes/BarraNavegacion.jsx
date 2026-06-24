import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCarrito } from '../contextos/ContextoCarrito'
import { useAuth } from '../contextos/ContextoAuth'
import { Cart } from 'react-bootstrap-icons'

function BarraNavegacion() {
  const { items } = useCarrito()
  const { usuario, cerrarSesion } = useAuth()
  const cantidadItems = items.reduce((acc, i) => acc + i.cantidad, 0)

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Librería</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/generos">Géneros</Nav.Link>
            {usuario?.rol === 'admin' && (
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              <Cart size={20} /><Badge bg="danger">{cantidadItems}</Badge>
            </Nav.Link>
            {usuario ? (
              <Nav.Link onClick={cerrarSesion}>Cerrar sesión</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BarraNavegacion