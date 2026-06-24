import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TarjetaLibro from '../componentes/TarjetaLibro'
import BarraBusqueda from '../componentes/BarraBusqueda'
import FiltroGenero from '../componentes/FiltroGenero'
import Cargando from '../componentes/Cargando'
import { useLibros } from '../hooks/useLibros'
import { useGeneros } from '../hooks/useGeneros'

function PaginaInicio() {
  const [busqueda, setBusqueda] = useState('')
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null)
  const { libros, cargando } = useLibros({ titulo: busqueda })
  const { generos } = useGeneros()

  const librosFiltrados = generoSeleccionado
    ? libros.filter(l => l.GeneroId === generoSeleccionado)
    : libros

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Catálogo</h2>
      <BarraBusqueda onBuscar={setBusqueda} />
      <div className="my-3">
        <FiltroGenero generos={generos} seleccionado={generoSeleccionado} onSeleccionar={setGeneroSeleccionado} />
      </div>
      {cargando ? <Cargando /> : (
        <Row className="g-4">
          {librosFiltrados.map(libro => (
            <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>
              <TarjetaLibro libro={libro} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default PaginaInicio