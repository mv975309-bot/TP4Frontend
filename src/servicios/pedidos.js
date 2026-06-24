import api from './api'

export const getPedidos = () => api.get('/pedidos')
export const crearPedido = (data) => api.post('/pedidos', data)