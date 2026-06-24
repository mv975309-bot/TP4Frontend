import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProveedorAuth } from './contextos/ContextoAuth'
import { ProveedorCarrito } from './contextos/ContextoCarrito'
import BarraNavegacion from './componentes/BarraNavegacion'
import PaginaInicio from './paginas/PaginaInicio'
import PaginaDetalleLibro from './paginas/PaginaDetalleLibro'
import PaginaGeneros from './paginas/PaginaGeneros'
import PaginaCarrito from './paginas/PaginaCarrito'
import PaginaAdmin from './paginas/PaginaAdmin'
import PaginaLogin from './paginas/PaginaLogin'

function App() {
  return (
    <ProveedorAuth>
      <ProveedorCarrito>
        <BrowserRouter>
          <BarraNavegacion />
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/libros/:id" element={<PaginaDetalleLibro />} />
            <Route path="/generos" element={<PaginaGeneros />} />
            <Route path="/carrito" element={<PaginaCarrito />} />
            <Route path="/admin" element={<PaginaAdmin />} />
            <Route path="/login" element={<PaginaLogin />} />
          </Routes>
        </BrowserRouter>
      </ProveedorCarrito>
    </ProveedorAuth>
  )
}

export default App