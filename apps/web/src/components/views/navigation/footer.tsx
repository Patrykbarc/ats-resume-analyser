import { NavItems } from './components/nav-items'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              AI Resume Analyzer
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Analyze your resume with advanced AI technology. Get instant
              feedback, ATS optimization tips, and personalized recommendations
              to improve your job applications.
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <NavItems className="space-y-3 text-sm text-muted-foreground" />
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} AI Resume Analyzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
