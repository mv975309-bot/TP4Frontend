import { useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import TarjetaLibro from '../componentes/TarjetaLibro'
import Cargando from '../componentes/Cargando'
import { useGeneros } from '../hooks/useGeneros'
import { useLibros } from '../hooks/useLibros'

function PaginaGeneros() {
  const { generos, cargando: cargandoGeneros } = useGeneros()
  const { libros, cargando: cargandoLibros } = useLibros()
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null)

  const librosFiltrados = generoSeleccionado
    ? libros.filter(l => l.GeneroId === generoSeleccionado)
    : libros

  if (cargandoGeneros || cargandoLibros) return <Cargando />

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Géneros</h2>
      <Row>
        <Col md={3}>
          <ListGroup>
            {generos.map(genero => (
              <ListGroup.Item
                key={genero.id}
                action
                active={generoSeleccionado === genero.id}
                onClick={() => setGeneroSeleccionado(genero.id)}
              >
                {genero.nombre}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          <Row className="g-4">
            {librosFiltrados.map(libro => (
              <Col key={libro.id} xs={12} sm={6} md={4}>
                <TarjetaLibro libro={libro} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default PaginaGeneros