import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../contextos/ContextoCarrito'

function TarjetaLibro({ libro }) {
  const { agregarAlCarrito } = useCarrito()
  const navegar = useNavigate()

  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img
        variant="top"
        src={libro.portada || 'https://via.placeholder.com/150'}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{libro.titulo}</Card.Title>
        <Card.Subtitle className="mb-2">{libro.Autor?.nombre}</Card.Subtitle>
        <Card.Text>${libro.precio}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => navegar(`/libros/${libro.id}`)}>
            Ver detalle
          </Button>
          <Button variant="primary" size="sm" onClick={() => agregarAlCarrito(libro)}>
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TarjetaLibro