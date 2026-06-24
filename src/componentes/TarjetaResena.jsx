import { Card } from 'react-bootstrap'
import { StarFill } from 'react-bootstrap-icons'

function TarjetaResena({ resena }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <strong>{resena.Usuario?.nombre || 'Usuario'}</strong>
            <span className="d-flex gap-1">
                {Array.from({ length: resena.puntaje }).map((_, i) => (
                <StarFill key={i} color="gold" />
                ))}
            </span>
        </div>
        <Card.Text>{resena.comentario}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaResena