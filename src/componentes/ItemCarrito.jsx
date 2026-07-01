import { Button } from 'react-bootstrap'
import { useCarrito } from '../contextos/ContextoCarrito'

function ItemCarrito({ item }) {
  const { quitarDelCarrito, modificarCantidad } = useCarrito()

  return (
    <div className="d-flex justify-content-between align-items-center p-3 mb-2"
      style={{ background: '#fff', border: '1px solid var(--svm-border)', borderRadius: '8px' }}>
      <div>
        <strong>{item.titulo}</strong>
        <div style={{ fontSize: '0.85rem', color: 'var(--svm-muted)' }}>${item.precio} c/u</div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button size="sm" variant="outline-primary" onClick={() => modificarCantidad(item.id, -1)}>−</Button>
        <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>{item.cantidad}</span>
        <Button size="sm" variant="outline-primary" onClick={() => modificarCantidad(item.id, 1)} disabled={item.cantidad >= item.stock}>+</Button>
        <span style={{ minWidth: '4rem', textAlign: 'right', color: 'var(--svm-rust)', fontWeight: 700 }}>
          ${item.precio * item.cantidad}
        </span>
        <Button size="sm" variant="danger" onClick={() => quitarDelCarrito(item.id)}>✕</Button>
      </div>
    </div>
  )
}

export default ItemCarrito
