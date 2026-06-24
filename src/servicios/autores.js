import api from './api'

export const getAutores = () => api.get('/autores')
export const getAutor = (id) => api.get(`/autores/${id}`)
export const crearAutor = (data) => api.post('/autores', data)
export const editarAutor = (id, data) => api.put(`/autores/${id}`, data)
export const eliminarAutor = (id) => api.delete(`/autores/${id}`)