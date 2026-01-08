import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle
} from '@/components/ui/item'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type NoteProps = {
  title: string
  description: string
} & ComponentProps<typeof Item>

export function Note({ title, description, className, ...props }: NoteProps) {
  return (
    <Item className={cn('w-fit', className)} {...props} asChild>
      <div>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="line-clamp-none">
            {description}
          </ItemDescription>
        </ItemContent>
      </div>
    </Item>
  )
}
