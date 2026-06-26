import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import TarjetaLibro from '../componentes/TarjetaLibro'
import BarraBusqueda from '../componentes/BarraBusqueda'
import FiltroGenero from '../componentes/FiltroGenero'
import Cargando from '../componentes/Cargando'
import { useLibros } from '../hooks/useLibros'
import { useGeneros } from '../hooks/useGeneros'

function PaginaInicio() {
  const [busqueda, setBusqueda] = useState('')
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null)
  const [verCatalogo, setVerCatalogo] = useState(false)
  const { libros, cargando } = useLibros({ titulo: busqueda })
  const { generos } = useGeneros()
  const navegar = useNavigate()

  const librosFiltrados = generoSeleccionado
    ? libros.filter(l => l.generoId === generoSeleccionado)
    : libros

  const mostrandoCatalogo = verCatalogo || busqueda || generoSeleccionado

  return (
    <Container className="mt-4">

      {/* Hero */}
      {!mostrandoCatalogo && (
        <div className="svm-hero">
          <div className="svm-hero-texto">
            <h1>Bienvenido a SVM Books</h1>
            <p>Encontrá tu próxima lectura favorita</p>
            <div>
              <Button className="btn-hero-principal" onClick={() => setVerCatalogo(true)}>
                Ver catálogo →
              </Button>
              <Button className="btn-hero-secundario" onClick={() => navegar('/generos')}>
                Explorar géneros
              </Button>
            </div>
          </div>
          <div className="svm-hero-imagen">📚</div>
        </div>
      )}

      {/* Búsqueda y filtros */}
      <BarraBusqueda onBuscar={setBusqueda} />
      <div className="my-3">
        <FiltroGenero generos={generos} seleccionado={generoSeleccionado} onSeleccionar={setGeneroSeleccionado} />
      </div>

      {cargando ? <Cargando /> : (
        <>
          {/* Destacados (solo en inicio) */}
          {!mostrandoCatalogo && (
            <div className="mt-4">
              <div className="svm-seccion-titulo">
                <span>Destacados</span>
                <a style={{ cursor: 'pointer' }} onClick={() => setVerCatalogo(true)}>Ver todos →</a>
              </div>
              <Row className="g-4">
                {libros.slice(0, 4).map(libro => (
                  <Col key={libro.id} xs={12} sm={6} md={3}>
                    <TarjetaLibro libro={libro} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Catálogo completo o filtrado */}
          {mostrandoCatalogo && (
            <div className="mt-2">
              <div className="svm-seccion-titulo">
                <span>Catálogo</span>
              </div>
              <Row className="g-4">
                {librosFiltrados.map(libro => (
                  <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>
                    <TarjetaLibro libro={libro} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Géneros (solo en inicio) */}
          {!mostrandoCatalogo && generos.length > 0 && (
            <div className="mt-5">
              <div className="svm-seccion-titulo">
                <span>Explorá por Género</span>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {generos.map(genero => (
                  <span
                    key={genero.id}
                    className="svm-chip"
                    onClick={() => setGeneroSeleccionado(genero.id)}
                  >
                    {genero.nombre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="svm-footer">SVM Books © 2026 — UTN FRSFCO</div>
    </Container>
  )
}

export default PaginaInicio
