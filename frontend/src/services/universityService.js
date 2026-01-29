import api from './api'

export const getUniversities = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await api.get(`/universities?${params}`)
  return response.data
}

export const getUniversityById = async (id) => {
  const response = await api.get(`/universities/${id}`)
  return response.data
}

export const getMatchedUniversities = async () => {
  const response = await api.get('/universities/matched')
  return response.data
}

export const getShortlist = async () => {
  const response = await api.get('/shortlist')
  return response.data
}

export const addToShortlist = async (universityId, category) => {
  const response = await api.post('/shortlist', { 
    university_id: universityId, 
    category 
  })
  return response.data
}

export const lockUniversity = async (shortlistId) => {
  const response = await api.post(`/shortlist/${shortlistId}/lock`)
  return response.data
}

export const unlockUniversity = async (shortlistId) => {
  const response = await api.post(`/shortlist/${shortlistId}/unlock`)
  return response.data
}

export const removeFromShortlist = async (shortlistId) => {
  const response = await api.delete(`/shortlist/${shortlistId}`)
  return response.data
}