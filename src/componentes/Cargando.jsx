import { Spinner } from 'react-bootstrap'

function Cargando() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default Cargando