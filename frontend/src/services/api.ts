import axios from 'axios'
import type { AnalysisResult } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post<AnalysisResult>(
      `${API_BASE_URL}/analyze-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || 'Failed to analyze image'
      )
    }
    throw error
  }
}
