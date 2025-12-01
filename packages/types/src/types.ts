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

type AuthType = { token: string; refresh_token: string }

type VerifyUserApiResponse = {
  message: string
}

export type { AiAnalysis, AiAnalysisError, AuthType, VerifyUserApiResponse }
