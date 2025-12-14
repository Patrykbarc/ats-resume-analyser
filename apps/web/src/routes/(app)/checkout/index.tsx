import { Spinner } from '@/components/ui/spinner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/checkout/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="p-4 gap-3 flex justify-center items-center mx-auto">
      <Spinner /> <p>Verifying payment...</p>
    </div>
  )
}
