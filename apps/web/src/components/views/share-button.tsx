import { getEnv } from '@/lib/getEnv'
import { Check, Copy, Share } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const TITLE = 'Stop letting ATS systems reject your resume!'
const TEXT =
  'I used this amazing tool to check my CV and maximize my chances of getting noticed. Try it now!'

export function ShareButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  const env = getEnv()
  const url = `${env.FRONTEND_URL}/analyse/${id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Copied to clipboard')
    } catch (err) {
      console.error(err)
      toast.error('Failed to copy')
    }
  }

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '𝕏',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(TEXT)}&url=${encodeURIComponent(url)}`
        window.open(twitterUrl, '_blank')
      }
    },
    {
      name: 'Email',
      icon: '✉',
      action: () => {
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(TITLE)}&body=${encodeURIComponent(`${TEXT}\n\n${url}`)}`
        window.location.href = mailtoUrl
      }
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <Share className="size-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            Share on
          </p>
        </div>

        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={option.action}
            className="cursor-pointer"
          >
            <span className="text-base flex justify-center size-6 aspect-square">
              {option.icon}
            </span>
            <span>{option.name}</span>
          </DropdownMenuItem>
        ))}

        <div className="my-1 border-t border-border" />

        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              <span>Copy link</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
