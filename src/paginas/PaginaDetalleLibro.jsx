import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDetalleLibro } from '../hooks/useDetalleLibro'
import { useCarrito } from '../contextos/ContextoCarrito'
import { useAuth } from '../contextos/ContextoAuth'
import TarjetaResena from '../componentes/TarjetaResena'
import FormularioResena from '../componentes/FormularioResena'
import Cargando from '../componentes/Cargando'
import api from '../servicios/api'

function PaginaDetalleLibro() {
  const { id } = useParams()
  const { libro, cargando } = useDetalleLibro(id)
  const { agregarAlCarrito } = useCarrito()
  const { token, usuario } = useAuth()

  const eliminarResenaAdmin = async (resenaId) => {
    if (!confirm('¿Estás seguro de eliminar esta reseña?')) return
    await api.delete(`/resena/admin/${resenaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
  }

  const eliminarResenaPropia = async (resenaId) => {
    if (!confirm('¿Estás seguro de eliminar tu reseña?')) return
    await api.delete(`/resena/${resenaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
  }

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
        <div className="mb-4">
          {libro.Resenas.map(resena => (
            <TarjetaResena
              key={resena.id}
              resena={resena}
              onEliminar={
                usuario?.rol === 'admin'
                  ? eliminarResenaAdmin
                  : resena.usuarioId === usuario?.id
                    ? eliminarResenaPropia
                    : null
              }
            />
          ))}
        </div>
      ) : (
        <p>No hay reseñas todavía.</p>
      )}
      {token
        ? <FormularioResena libroId={id} onResenaAgregada={() => window.location.reload()} />
        : <p className="text-muted">Iniciá sesión para dejar una reseña.</p>
      }
    </Container>
  )
}

export default PaginaDetalleLibro