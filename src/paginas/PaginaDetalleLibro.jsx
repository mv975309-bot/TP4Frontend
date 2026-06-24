import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDetalleLibro } from '../hooks/useDetalleLibro'
import { useCarrito } from '../contextos/ContextoCarrito'
import TarjetaResena from '../componentes/TarjetaResena'
import Cargando from '../componentes/Cargando'

function PaginaDetalleLibro() {
  const { id } = useParams()
  const { libro, cargando } = useDetalleLibro(id)
  const { agregarAlCarrito } = useCarrito()

  if (cargando) return <Cargando />

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <img
            src={libro.portada || 'https://via.placeholder.com/300'}
            alt={libro.titulo}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h2>{libro.titulo}</h2>
          <p><strong>Autor:</strong> {libro.Autor?.nombre}</p>
          <p><strong>Editorial:</strong> {libro.Editorial?.nombre}</p>
          <p><strong>Género:</strong> {libro.Genero?.nombre}</p>
          <p><strong>Precio:</strong> ${libro.precio}</p>
          <p><strong>Stock:</strong> {libro.stock}</p>
          <Button variant="primary" onClick={() => agregarAlCarrito(libro)}>
            Agregar al carrito
          </Button>
        </Col>
      </Row>
      <h4 className="mt-5">Reseñas</h4>
      {libro.Resenas?.length > 0 ? (
        <ListGroup variant="flush">
          {libro.Resenas.map(resena => (
            <TarjetaResena key={resena.id} resena={resena} />
          ))}
        </ListGroup>
      ) : (
        <p>No hay reseñas todavía.</p>
      )}
    </Container>
  )
}

export default PaginaDetalleLibro