import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

export function CallToActionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Upgrade to Pro Analyst
        </CardTitle>
        <CardDescription>
          Unlock advanced insights like keyword optimization, ATS compatibility
          checks, and personalized improvement tips to make your resume stand
          out even more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          className={buttonVariants({
            variant: 'default',
            size: 'lg'
          })}
          to="/pricing"
        >
          Upgrade Now
        </Link>
      </CardContent>
    </Card>
  )
}
