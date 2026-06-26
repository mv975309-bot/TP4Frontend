import { Button } from 'react-bootstrap'
import { StarFill } from 'react-bootstrap-icons'

function TarjetaResena({ resena, onEliminar }) {
  return (
    <div className="svm-resena">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <strong>{resena.Usuario?.nombre || 'Usuario'}</strong>
          <div className="d-flex gap-1 my-1">
            {Array.from({ length: resena.puntaje }).map((_, i) => (
              <StarFill key={i} color="#C05A3A" size={14} />
            ))}
          </div>
        </div>
        {onEliminar && (
          <Button size="sm" variant="danger" onClick={() => onEliminar(resena.id)}>
            Eliminar
          </Button>
        )}
      </div>
      <p className="mb-0 mt-1" style={{ fontSize: '0.9rem' }}>{resena.comentario}</p>
    </div>
  )
}

export default TarjetaResena
