import { Badge } from 'react-bootstrap'

function FiltroGenero({ generos, seleccionado, onSeleccionar }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      <Badge
        bg={seleccionado === null ? 'primary' : 'secondary'}
        style={{ cursor: 'pointer' }}
        onClick={() => onSeleccionar(null)}
      >
        Todos
      </Badge>
      {generos.map(genero => (
        <Badge
          key={genero.id}
          bg={seleccionado === genero.id ? 'primary' : 'secondary'}
          style={{ cursor: 'pointer' }}
          onClick={() => onSeleccionar(genero.id)}
        >
          {genero.nombre}
        </Badge>
      ))}
    </div>
  )
}

export default FiltroGenero