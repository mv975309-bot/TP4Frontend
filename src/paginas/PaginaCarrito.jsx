import { Container, ListGroup, Button, Alert } from 'react-bootstrap'
import { useCarrito } from '../contextos/ContextoCarrito'
import { useAuth } from '../contextos/ContextoAuth'
import { useNavigate } from 'react-router-dom'
import { crearPedido } from '../servicios/pedidos'
import ItemCarrito from '../componentes/ItemCarrito'

function PaginaCarrito() {
  const { items, total, vaciarCarrito } = useCarrito()
  const { token } = useAuth()
  const navegar = useNavigate()

  const confirmarPedido = async () => {
    try {
      await crearPedido({ items, total }, token)
      vaciarCarrito()
      navegar('/')
    } catch {
      alert('Error al confirmar el pedido')
    }
  }

  if (items.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">El carrito está vacío.</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Carrito</h2>
      <ListGroup className="mb-3">
        {items.map(item => (
          <ItemCarrito key={item.id} item={item} />
        ))}
      </ListGroup>
      <h4>Total: ${total}</h4>
      <Button variant="success" onClick={confirmarPedido} disabled={!token}>
        Confirmar pedido
      </Button>
      {!token && <p className="text-danger mt-2">Tenés que iniciar sesión para confirmar el pedido.</p>}
    </Container>
  )
}

export default PaginaCarrito