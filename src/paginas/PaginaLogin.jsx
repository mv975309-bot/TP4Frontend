import { useState } from 'react'
import { Container, Form, Button, Card, Alert, Tabs, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../servicios/auth'
import { useAuth } from '../contextos/ContextoAuth'

function PaginaLogin() {
  const [datosLogin, setDatosLogin] = useState({ email: '', password: '' })
  const [datosRegistro, setDatosRegistro] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const { iniciarSesion } = useAuth()
  const navegar = useNavigate()

  const manejarLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await login(datosLogin)
      iniciarSesion(res.data.usuario, res.data.token)
      navegar('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  const manejarRegistro = async (e) => {
    e.preventDefault()
    try {
      const res = await register(datosRegistro)
      iniciarSesion(res.data.usuario, res.data.token)
      navegar('/')
    } catch (err) {
      setError(err.response?.data?.error || JSON.stringify(err.response?.data?.errors) || 'Error al registrarse')
    }
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="Iniciar sesión">
              <Form onSubmit={manejarLogin} className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={datosLogin.email} onChange={e => setDatosLogin({ ...datosLogin, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={datosLogin.password} onChange={e => setDatosLogin({ ...datosLogin, password: e.target.value })} required />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">Ingresar</Button>
              </Form>
            </Tab>
            <Tab eventKey="registro" title="Registrarse">
              <Form onSubmit={manejarRegistro} className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control value={datosRegistro.nombre} onChange={e => setDatosRegistro({ ...datosRegistro, nombre: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={datosRegistro.email} onChange={e => setDatosRegistro({ ...datosRegistro, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={datosRegistro.password} onChange={e => setDatosRegistro({ ...datosRegistro, password: e.target.value })} required />
                </Form.Group>
                <Button type="submit" variant="success" className="w-100">Registrarse</Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PaginaLogin