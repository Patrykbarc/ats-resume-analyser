import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type PricingCardProps = {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  onSelect?: () => void
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false
}: PricingCardProps) {
  return (
    <div
      key={name}
      className={cn(
        'relative rounded-lg bg-card border transition-all duration-200 overflow-hidden',
        highlighted
          ? 'border-primary ring-accent md:scale-105'
          : 'border-border '
      )}
    >
      {/* Recommended Badge */}
      {highlighted && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-background">
          Recommended
        </div>
      )}

      <div className="flex flex-col px-6 py-8 h-full">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Price */}
        <div className="my-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">${price}</span>
          <span className="text-sm text-muted-foreground">/{period}</span>
        </div>

        {/* CTA Button */}
        <Button
          className={cn(
            'mb-8 w-full font-semibold',
            highlighted
              ? buttonVariants()
              : buttonVariants({ variant: 'secondary' })
          )}
        >
          {cta}
        </Button>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex gap-3">
              <Check className="size-5 shrink-0 text-accent" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
