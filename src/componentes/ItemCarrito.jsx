import { ListGroup, Button } from 'react-bootstrap'
import { useCarrito } from '../contextos/ContextoCarrito'

function ItemCarrito({ item }) {
  const { quitarDelCarrito } = useCarrito()

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{item.titulo}</strong>
        <div>Cantidad: {item.cantidad}</div>
        <div>Subtotal: ${item.precio * item.cantidad}</div>
      </div>
      <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(item.id)}>
        Quitar
      </Button>
    </ListGroup.Item>
  )
}

export default ItemCarrito