import { FREE_REQUESTS_PER_DAY } from '@monorepo/constants'

export const faqData = [
  {
    question: 'How does the AI Resume Analyzer work?',
    answer:
      'Our AI analyzes your resume content, structure, and formatting to provide instant feedback on strengths, areas for improvement, and ATS optimization suggestions. It evaluates factors like keyword usage, formatting consistency, section organization, and industry best practices.'
  },
  {
    question: 'Is the resume analyzer free?',
    answer: `Yes! We offer a free plan with ${FREE_REQUESTS_PER_DAY} resume analyses per day. Upgrade to Pro for unlimited analyses and advanced features like detailed keyword analysis, comparison tools, and priority support.`
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support PDF file format for resume analysis.'
  },
  {
    question: 'How quickly will I receive my analysis?',
    answer:
      "Analysis is typically completed within 30-40 seconds after upload. You'll see your results instantly on the screen, including your overall score, strengths, areas for improvement, and specific recommendations."
  }
] as const
