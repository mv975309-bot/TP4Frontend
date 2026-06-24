import api from './api'

export const getEditoriales = () => api.get('/editoriales')
export const crearEditorial = (data) => api.post('/editoriales', data)
export const editarEditorial = (id, data) => api.put(`/editoriales/${id}`, data)
export const eliminarEditorial = (id) => api.delete(`/editoriales/${id}`)