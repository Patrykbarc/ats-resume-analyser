import { Card, CardContent } from '@/components/ui/card'
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation
} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthPage
})

export default function AuthPage() {
  const location = useLocation()

  const isLoginPage = location.href === '/login'

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardContent>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Resume Analyzer
            </h1>
            <p className="text-muted-foreground">
              {isLoginPage ? (
                <Link to="/register">
                  Don&apos;t have an account? <strong>Register now</strong>
                </Link>
              ) : (
                <Link to="/login">
                  Already have an account? <strong>Sign In</strong>
                </Link>
              )}
            </p>
          </div>

          <Outlet />
        </CardContent>
      </Card>
    </div>
  )
}
