import api from './api'

export const chatWithAI = async (payload) => {
  return await api.post('/ai/chat', payload)
}


export const getProfileAnalysis = async () => {
  const response = await api.get('/ai/analyze')
  return response.data
}

export const getAIRecommendations = async () => {
  const response = await api.get('/ai/recommendations')
  return response.data
}