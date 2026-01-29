import api from './api'

export const chatWithAI = async (message) => {
  const response = await api.post('/ai/chat', { message })
  return response.data
}

export const getProfileAnalysis = async () => {
  const response = await api.get('/ai/analyze')
  return response.data
}

export const getAIRecommendations = async () => {
  const response = await api.get('/ai/recommendations')
  return response.data
}