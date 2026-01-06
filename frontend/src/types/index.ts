export interface AnalysisResult {
  success: boolean
  filename: string
  detected_raw: string[]
  analysis: {
    llm_analysis: string | LLMAnalysis
    rule_based_risks: string[]
    rule_based_risk_level: string
    rule_based_caption: string
  }
}

export interface LLMAnalysis {
  scene_description?: string
  identified_hazards?: string[]
  safety_recommendations?: string[]
  risk_assessment?: string
  risks?: string[]
  recommendations?: string[]
}
