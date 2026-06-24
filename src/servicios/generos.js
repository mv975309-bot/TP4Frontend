import api from './api'

export const getGeneros = () => api.get('/generos')
export const crearGenero = (data) => api.post('/generos', data)
export const editarGenero = (id, data) => api.put(`/generos/${id}`, data)
export const eliminarGenero = (id) => api.delete(`/generos/${id}`)