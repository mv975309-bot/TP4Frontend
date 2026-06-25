import api from './api'

export const getUsuarios = (token) => api.get('/usuarios', {
  headers: { Authorization: `Bearer ${token}` }
})

export const eliminarUsuario = (id, token) => api.delete(`/usuarios/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
})