import { CheckCircle2, FileText, Sparkles, TrendingUp } from 'lucide-react'

export const featureData = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze every aspect of your resume'
  },
  {
    icon: FileText,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes applicant tracking systems'
  },
  {
    icon: TrendingUp,
    title: 'Instant Feedback',
    description: 'Get real-time recommendations within seconds'
  },
  {
    icon: CheckCircle2,
    title: 'Actionable Tips',
    description: 'Receive specific suggestions to enhance your resume'
  }
] as const
