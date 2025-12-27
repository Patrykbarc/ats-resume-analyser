export const buildPageTitle = (pageTitle?: string) => {
  if (!pageTitle) {
    return 'ATS Resume Analyzer'
  }

  return `${pageTitle} | ATS Resume Analyzer`
}
