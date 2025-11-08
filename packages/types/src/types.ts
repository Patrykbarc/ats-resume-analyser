type AiAnalysis = {
  id: string
  title: string
  overall_score: {
    label: string
    range: string
    score: string
    weighting_justification: {
      'ATS Compatibility': string
      'Job Market Alignment': string
      'Competitive Differentiation': string
    }
    justification: string
  }
  sections: {
    strengths: string[]
    areas_for_improvement: string[]
    recommendations: string[]
  }
  parsed_file: string
}

type AiAnalysisError = { error: string }

export type { AiAnalysis, AiAnalysisError }
