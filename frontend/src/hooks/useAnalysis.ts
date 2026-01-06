import { useState } from 'react'
import type { AnalysisResult, LLMAnalysis } from '@/types'
import { analyzeImage } from '@/services/api'

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const analyze = async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeImage(file)
      setResult(data)
      return data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const parseLLMAnalysis = (
    analysis: string | LLMAnalysis
  ): LLMAnalysis => {
    if (typeof analysis === 'string') {
      try {
        return JSON.parse(analysis)
      } catch {
        return {}
      }
    }
    return analysis
  }

  return {
    loading,
    error,
    result,
    analyze,
    parseLLMAnalysis,
  }
}
