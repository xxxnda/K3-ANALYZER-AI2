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

export interface ObjectInsight {
  object_name: string
  function: string
  safety_category: string
  risk_level: string
  potential_risks: string[]
  proper_usage: string
}

export interface PPECompliance {
  status: string
  present: string[]
  missing: string[]
  assessment: string
}

export interface SafetyRecommendation {
  priority: string
  recommendation: string
  reason: string
}

export interface LLMAnalysis {
  scene_description?: string
  object_insights?: ObjectInsight[]
  identified_hazards?: string[]
  ppe_compliance?: PPECompliance | string
  risk_level?: string
  safety_recommendations?: SafetyRecommendation[] | string[]
  additional_insights?: string
  risk_assessment?: string
  risks?: string[]
  recommendations?: string[]
}

