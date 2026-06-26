function FiltroGenero({ generos, seleccionado, onSeleccionar }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      <span
        className={`svm-chip${seleccionado === null ? ' activo' : ''}`}
        onClick={() => onSeleccionar(null)}
      >
        Todos
      </span>
      {generos.map(genero => (
        <span
          key={genero.id}
          className={`svm-chip${seleccionado === genero.id ? ' activo' : ''}`}
          onClick={() => onSeleccionar(genero.id)}
        >
          {genero.nombre}
        </span>
      ))}
    </div>
  )
}

export default FiltroGenero
