import { getEnvs } from '@/lib/getEnv'
import { CSSProperties, useEffect, useRef } from 'react'

type AdSenseProps = {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle'
  fullWidthResponsive?: boolean
  style?: CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export const AdSense = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = ''
}: AdSenseProps) => {
  const { VITE_ADSENSE_CLIENT_ID } = getEnvs()
  const adRef = useRef<HTMLModElement>(null)
  const isAdPushed = useRef(false)

  useEffect(() => {
    if (isAdPushed.current) {
      return
    }

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        isAdPushed.current = true
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  useEffect(() => {
    isAdPushed.current = false
  }, [adSlot])

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        ...style
      }}
      data-ad-client={VITE_ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}
