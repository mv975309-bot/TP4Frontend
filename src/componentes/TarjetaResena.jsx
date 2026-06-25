import { Card, Button } from 'react-bootstrap'
import { StarFill } from 'react-bootstrap-icons'

function TarjetaResena({ resena, onEliminar }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <strong>{resena.Usuario?.nombre || 'Usuario'}</strong>
          <div className="d-flex align-items-center gap-2">
            <span className="d-flex gap-1">
              {Array.from({ length: resena.puntaje }).map((_, i) => (
                <StarFill key={i} color="gold" />
              ))}
            </span>
            {onEliminar && (
              <Button size="sm" variant="danger" onClick={() => onEliminar(resena.id)}>
                Eliminar
              </Button>
            )}
          </div>
        </div>
        <Card.Text className="mt-2">{resena.comentario}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaResena