import api from './api'

export const getPedidos = (token) => api.get('/pedidos', {
  headers: { Authorization: `Bearer ${token}` }
})

export const crearPedido = (data, token) => api.post('/pedidos', data, {
  headers: { Authorization: `Bearer ${token}` }
})