import api from './api'

export const getProfile = async () => {
  const response = await api.get('/profile')
  return response.data
}

export const completeOnboarding = async (profileData) => {
  const response = await api.post('/profile/onboarding/complete', profileData)
  return response.data
}

export const updateProfile = async (profileData) => {
  const response = await api.put('/profile', profileData)
  return response.data
}

export const getTodos = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await api.get(`/todos?${params}`)
  return response.data
}

export const createTodo = async (todoData) => {
  const response = await api.post('/todos', todoData)
  return response.data
}

export const toggleTodo = async (todoId) => {
  const response = await api.patch(`/todos/${todoId}/toggle`)
  return response.data
}

export const deleteTodo = async (todoId) => {
  const response = await api.delete(`/todos/${todoId}`)
  return response.data
}